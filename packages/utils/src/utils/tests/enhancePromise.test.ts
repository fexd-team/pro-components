import enhancePromise from '../enhancePromise'

describe('enhancePromise', () => {
  it('返回一个 thenable 对象', () => {
    const ep = enhancePromise()
    expect(typeof ep.then).toBe('function')
  })

  it('包含 resolve 和 reject 方法', () => {
    const ep = enhancePromise()
    expect(typeof ep.resolve).toBe('function')
    expect(typeof ep.reject).toBe('function')
  })

  it('resolve 后可以 await 得到值', async () => {
    const ep = enhancePromise()
    setTimeout(() => ep.resolve('done'), 10)
    const result = await ep
    expect(result).toBe('done')
  })

  it('reject 后 await 抛出异常', async () => {
    const ep = enhancePromise()
    setTimeout(() => ep.reject(new Error('fail')), 10)
    await expect(ep).rejects.toThrow('fail')
  })

  it('同步 resolve 也能正确工作', async () => {
    const ep = enhancePromise()
    ep.resolve(42)
    const result = await ep
    expect(result).toBe(42)
  })

  it('支持泛型类型', async () => {
    const ep = enhancePromise<number>()
    ep.resolve(100)
    const result: number = await ep
    expect(result).toBe(100)
  })

  it('多次 resolve 只取第一次', async () => {
    const ep = enhancePromise()
    ep.resolve('first')
    ep.resolve('second')
    const result = await ep
    expect(result).toBe('first')
  })

  it('可以当作 Promise 使用 .then 链', async () => {
    const ep = enhancePromise<number>()
    ep.resolve(5)
    const result = await ep.then((v: number) => v * 2)
    expect(result).toBe(10)
  })
})
