describe('工具函数再导出存在性', () => {
  it('enhancePromise 可导入且为函数', () => {
    const enhancePromise = require('../enhancePromise').default
    expect(typeof enhancePromise).toBe('function')
  })

  it('catchPromise 可导入且为函数', () => {
    const catchPromise = require('../catchPromise').default
    expect(typeof catchPromise).toBe('function')
  })

  it('obj2formdata 可导入且为函数', () => {
    const obj2formdata = require('../obj2formdata').default
    expect(typeof obj2formdata).toBe('function')
  })

  it('formdata2obj 可导入且为函数', () => {
    const formdata2obj = require('../formdata2obj').default
    expect(typeof formdata2obj).toBe('function')
  })

  it('enhancePromise 基本行为 — 返回带 resolve/reject 的 promise', () => {
    const enhancePromise = require('../enhancePromise').default
    const ep = enhancePromise()
    expect(ep).toHaveProperty('then')
    expect(ep).toHaveProperty('resolve')
    expect(ep).toHaveProperty('reject')
  })

  it('catchPromise 基本行为 — 捕获异常返回 [error, undefined]', async () => {
    const catchPromise = require('../catchPromise').default
    const result = await catchPromise(Promise.reject(new Error('test')))
    expect(result[0]).toBeInstanceOf(Error)
    expect(result[0].message).toBe('test')
  })

  it('catchPromise 成功时返回 [undefined, data]', async () => {
    const catchPromise = require('../catchPromise').default
    const result = await catchPromise(Promise.resolve('data'))
    expect(result[0]).toBeUndefined()
    expect(result[1]).toBe('data')
  })
})
