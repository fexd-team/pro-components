import { renderHook, act } from '@testing-library/react-hooks'
import useRequest from '../useRequest'

describe('useRequest (增强版)', () => {
  it('返回标准 ahooks useRequest 结果', () => {
    const { result } = renderHook(() => useRequest(async () => 'data'))
    expect(result.current).toHaveProperty('loading')
    expect(result.current).toHaveProperty('data')
    expect(result.current).toHaveProperty('run')
    expect(result.current).toHaveProperty('refresh')
    expect(result.current).toHaveProperty('mutate')
  })

  it('包含 isUseRequest 标识', () => {
    const { result } = renderHook(() => useRequest(async () => 'data'))
    expect(result.current.isUseRequest).toBe(true)
  })

  it('包含 promiseRef', () => {
    const { result } = renderHook(() => useRequest(async () => 'data'))
    expect(result.current.promiseRef).toBeDefined()
    expect(result.current.promiseRef.current).toBeDefined()
    expect(typeof result.current.promiseRef.current.then).toBe('function')
  })

  it('promiseRef.current 包含 resolve/reject', () => {
    const { result } = renderHook(() => useRequest(async () => 'data', { manual: true }))
    const promise = result.current.promiseRef.current
    expect(typeof promise.resolve).toBe('function')
    expect(typeof promise.reject).toBe('function')
  })

  it('默认模式自动请求', async () => {
    const service = jest.fn().mockResolvedValue('auto-data')
    const { result, waitForNextUpdate } = renderHook(() => useRequest(service))

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe('auto-data')
    expect(service).toHaveBeenCalledTimes(1)
  })

  it('manual 模式不自动请求', () => {
    const service = jest.fn().mockResolvedValue('manual-data')
    const { result } = renderHook(() => useRequest(service, { manual: true }))

    expect(result.current.loading).toBe(false)
    expect(service).not.toHaveBeenCalled()
  })

  it('手动调用 run 触发请求', async () => {
    const service = jest.fn().mockResolvedValue('run-data')
    const { result, waitForNextUpdate } = renderHook(() => useRequest(service, { manual: true }))

    act(() => {
      result.current.run()
    })

    await waitForNextUpdate()

    expect(result.current.data).toBe('run-data')
  })

  it('promiseRef 在每次请求时更新', async () => {
    let callCount = 0
    const service = jest.fn().mockImplementation(async () => `data-${++callCount}`)
    const { result, waitForNextUpdate } = renderHook(() => useRequest(service, { manual: true }))

    const promise1 = result.current.promiseRef.current

    act(() => {
      result.current.run()
    })

    await waitForNextUpdate()

    const promise2 = result.current.promiseRef.current
    expect(promise1).not.toBe(promise2)
  })

  it('请求成功时 promiseRef resolve', async () => {
    const service = jest.fn().mockResolvedValue('resolved-data')
    const { result, waitForNextUpdate } = renderHook(() => useRequest(service))

    await waitForNextUpdate()

    const data = await result.current.promiseRef.current
    expect(data).toBe('resolved-data')
  })

  it('promiseRef 初始就有 resolve/reject 可用', () => {
    const service = jest.fn().mockResolvedValue('fresh')
    const { result } = renderHook(() => useRequest(service, { manual: true }))

    const promise = result.current.promiseRef.current
    expect(typeof promise.resolve).toBe('function')
    expect(typeof promise.reject).toBe('function')
    expect(typeof promise.then).toBe('function')
  })
})
