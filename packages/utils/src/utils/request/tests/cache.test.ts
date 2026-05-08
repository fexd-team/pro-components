import axios from 'axios'
import { setupCache, AxiosCacheInstance } from 'axios-cache-interceptor'
import { defaultCacheOptions, getCacheRequestInterceptor } from '../cache'

describe('defaultCacheOptions', () => {
  test('默认 ttl 为 -1（不缓存）', () => {
    expect(defaultCacheOptions.ttl).toBe(-1)
  })

  test('不解析缓存响应头', () => {
    expect(defaultCacheOptions.interpretHeader).toBe(false)
  })

  test('支持 get/post/head 方法缓存', () => {
    expect(defaultCacheOptions.methods).toEqual(['get', 'post', 'head'])
  })
})

describe('getCacheRequestInterceptor', () => {
  function createTestInstance() {
    const raw = axios.create()
    return setupCache(raw, defaultCacheOptions)
  }

  test('返回 onFulfilled 和 apply 方法', () => {
    const instance = createTestInstance()
    const interceptor = getCacheRequestInterceptor(instance)
    expect(interceptor.onFulfilled).toBeInstanceOf(Function)
    expect(interceptor.apply).toBeInstanceOf(Function)
  })
})

describe('cache 功能集成测试', () => {
  let instance: AxiosCacheInstance
  let adapterCallCount: number

  beforeEach(() => {
    adapterCallCount = 0
    const raw = axios.create()
    // @ts-ignore
    raw.defaults.adapter = async (config) => {
      adapterCallCount++
      return { data: { ok: true }, status: 200, statusText: 'OK', headers: {}, config }
    }
    instance = setupCache(raw, {
      requestInterceptor: getCacheRequestInterceptor(raw as AxiosCacheInstance),
      ...defaultCacheOptions,
    })
  })

  test('默认 ttl=-1，不缓存，每次都发请求', async () => {
    await instance.get('/test')
    await instance.get('/test')
    expect(adapterCallCount).toBe(2)
  })

  test('设置正向 ttl 后，第二次命中缓存', async () => {
    await instance.get('/test', { cache: { ttl: 5000 } })
    const res2 = await instance.get('/test', { cache: { ttl: 5000 } })
    expect(adapterCallCount).toBe(1)
    expect(res2.cached).toBe(true)
  })

  test('不同 URL 不共享缓存', async () => {
    await instance.get('/a', { cache: { ttl: 5000 } })
    await instance.get('/b', { cache: { ttl: 5000 } })
    expect(adapterCallCount).toBe(2)
  })

  test('POST 也支持缓存（在 methods 配置中）', async () => {
    await instance.post('/test', {}, { cache: { ttl: 5000 } })
    const res2 = await instance.post('/test', {}, { cache: { ttl: 5000 } })
    expect(adapterCallCount).toBe(1)
    expect(res2.cached).toBe(true)
  })
})
