import { run } from '@fexd/tools'
import catchPromise from '../catchPromise'

describe('测试 catchPromise 函数', () => {
  test('当传入 Promise 成功完成时，返回一个包含 undefined 和结果值的数组', async () => {
    // 准备
    const promise = Promise.resolve('hello world')
    // 执行
    const result = await catchPromise(promise)
    // 断言
    expect(result[0]).toBe(undefined)
    expect(result[1]).toBe('hello world')
  })

  test('当传入 Promise 抛出错误时，返回一个包含错误对象和 undefined 的数组', async () => {
    // 准备
    const promise = Promise.reject(new Error('error message'))
    // 执行
    const result = await catchPromise(promise)
    // 断言
    expect(result[0]).toBeInstanceOf(Error)
    expect(result[0].message).toBe('error message')
    expect(result[1]).toBe(undefined)
  })
})
