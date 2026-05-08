import request from '../index'
import { defineApi } from '../defineApi'

describe('defineApi', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('返回可调用的函数', () => {
    const api = defineApi({
      url: '/test',
      method: 'get',
    })
    expect(typeof api).toBe('function')
    expect(api.__isDefinedApi).toBe(true)
  })

  test('具备 runApi / override / runWithConfig 方法', () => {
    const api = defineApi({ url: '/test', method: 'get' })
    expect(api.runApi).toBeInstanceOf(Function)
    expect(api.override).toBeInstanceOf(Function)
    expect(api.runWithConfig).toBeInstanceOf(Function)
  })

  test('handleParams 正确传递参数', async () => {
    const spy = jest.spyOn(request, 'get').mockResolvedValue({ success: true, data: {} } as any)
    const api = defineApi({
      url: '/user',
      method: 'get',
      handleParams: (id: string) => ({ id }),
    })

    await api('123')
    expect(spy).toHaveBeenCalled()
    const [url, config] = spy.mock.calls[0]
    expect(url).toBe('/user')
    expect(config.params).toEqual({ id: '123' })
  })

  test('handleResponse 加工返回值', async () => {
    jest.spyOn(request, 'get').mockResolvedValue({ success: true, data: { name: 'test' } } as any)
    const api = defineApi({
      url: '/user',
      method: 'get',
      handleResponse: (res) => ({ ...res, extra: true }),
    })

    const result = await api()
    expect(result.extra).toBe(true)
  })

  test('POST 方法正确调用', async () => {
    const spy = jest.spyOn(request, 'post').mockResolvedValue({ success: true, data: {} } as any)
    const api = defineApi({
      url: '/create',
      method: 'post',
      handleParams: (name: string) => ({ name }),
    })

    await api('newItem')
    expect(spy).toHaveBeenCalledWith('/create', { name: 'newItem' }, expect.anything())
  })

  test('默认使用全局 request 实例', () => {
    const api = defineApi({ url: '/test', method: 'get' })
    expect(api.requestInstance).toBe(request)
  })

  test('可指定自定义 requestInstance', () => {
    const customInstance = {} as any
    const api = defineApi({ url: '/test', method: 'get', requestInstance: customInstance })
    expect(api.requestInstance).toBe(customInstance)
  })
})

describe('defineApi.override', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('override 覆盖 URL', async () => {
    const spy = jest.spyOn(request, 'get').mockResolvedValue({ success: true, data: {} } as any)
    const api = defineApi({ url: '/original', method: 'get' })
    const overrided = api.override({ url: '/changed' })

    await overrided()
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe('/changed')
  })

  test('override 返回新的 DefinedApi', () => {
    const api = defineApi({ url: '/test', method: 'get' })
    const overrided = api.override({ url: '/changed' })
    expect(overrided.__isDefinedApi).toBe(true)
    expect(overrided.override).toBeInstanceOf(Function)
  })

  test('override 链式调用', async () => {
    const spy = jest.spyOn(request, 'get').mockResolvedValue({ success: true, data: {} } as any)
    const api = defineApi({ url: '/v1', method: 'get' })
    const v2 = api.override({ url: '/v2' })
    const v3 = v2.override({ url: '/v3' })

    await v3()
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe('/v3')
  })

  test('runWithConfig 运行时覆盖', async () => {
    const spy = jest.spyOn(request, 'get').mockResolvedValue({ success: true, data: {} } as any)
    const api = defineApi({ url: '/original', method: 'get' })

    await api.runWithConfig({ url: '/runtime-override' })
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe('/runtime-override')
  })
})
