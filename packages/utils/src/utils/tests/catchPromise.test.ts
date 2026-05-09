import catchPromise from '../catchPromise'

describe('catchPromise', () => {
  it('成功时返回 [undefined, data]', async () => {
    const result = await catchPromise(Promise.resolve('hello'))
    expect(result[0]).toBeUndefined()
    expect(result[1]).toBe('hello')
  })

  it('失败时返回 [error, undefined]', async () => {
    const error = new Error('failed')
    const result = await catchPromise(Promise.reject(error))
    expect(result[0]).toBe(error)
    expect(result[1]).toBeUndefined()
  })

  it('支持各种类型的成功值', async () => {
    expect((await catchPromise(Promise.resolve(0)))[1]).toBe(0)
    expect((await catchPromise(Promise.resolve(null)))[1]).toBeNull()
    expect((await catchPromise(Promise.resolve({ a: 1 })))[1]).toEqual({ a: 1 })
    expect((await catchPromise(Promise.resolve([1, 2, 3])))[1]).toEqual([1, 2, 3])
  })

  it('支持各种类型的错误值', async () => {
    const strResult = await catchPromise(Promise.reject('string error'))
    expect(strResult[0]).toBe('string error')

    const numResult = await catchPromise(Promise.reject(42))
    expect(numResult[0]).toBe(42)
  })

  it('支持 async 函数返回的 Promise', async () => {
    const asyncFn = async () => 'async result'
    const result = await catchPromise(asyncFn())
    expect(result[0]).toBeUndefined()
    expect(result[1]).toBe('async result')
  })

  it('支持 async 函数抛出的异常', async () => {
    const asyncFn = async () => {
      throw new Error('async error')
    }
    const result = await catchPromise(asyncFn())
    expect(result[0]).toBeInstanceOf(Error)
    expect((result[0] as Error).message).toBe('async error')
  })
})
