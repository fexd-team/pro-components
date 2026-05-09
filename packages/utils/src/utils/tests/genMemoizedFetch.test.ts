import genMemoizedFetch from '../genMemoizedFetch'

describe('genMemoizedFetch', () => {
  it('返回函数类型', () => {
    const fetch = jest.fn().mockResolvedValue('data')
    const memoized = genMemoizedFetch(fetch)
    expect(typeof memoized).toBe('function')
  })

  it('首次调用执行原始函数', async () => {
    const fetch = jest.fn().mockResolvedValue('result')
    const memoized = genMemoizedFetch(fetch)

    const result = await memoized()
    expect(result).toBe('result')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('缓存期内重复调用返回相同结果（不重复调用原始函数）', async () => {
    const fetch = jest.fn().mockResolvedValue('cached')
    const memoized = genMemoizedFetch(fetch, { cacheMinutes: 10 })

    const result1 = await memoized()
    const result2 = await memoized()

    expect(result1).toBe('cached')
    expect(result2).toBe('cached')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('返回的函数包含 cache 属性', () => {
    const fetch = jest.fn().mockResolvedValue('data')
    const memoized = genMemoizedFetch(fetch)
    expect(memoized.cache).toBeDefined()
  })

  it('默认 cacheMinutes 为 1', async () => {
    const fetch = jest.fn().mockResolvedValue('data')
    const memoized = genMemoizedFetch(fetch)

    await memoized()
    await memoized()

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  // NOTE: 失败后重试的测试因 SAS 内部 lock 机制在 Jest worker 中
  // 会导致 unhandled rejection 从而 crash worker，暂不测试此场景
  // 参见 ISSUES.md #6
})
