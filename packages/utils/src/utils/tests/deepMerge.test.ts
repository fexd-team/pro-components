import deepMerge from '../deepMerge'

describe('deepMerge', () => {
  test('基本对象合并', () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  test('后者覆盖前者', () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
  })

  test('深层嵌套合并', () => {
    const result = deepMerge({ a: { x: 1, y: 2 } }, { a: { y: 3, z: 4 } })
    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 } })
  })

  test('非对象值直接覆盖', () => {
    expect(deepMerge({ a: { x: 1 } }, { a: 'string' })).toEqual({ a: 'string' })
    expect(deepMerge({ a: 'string' }, { a: { x: 1 } })).toEqual({ a: { x: 1 } })
  })

  test('null / undefined 输入不崩溃', () => {
    expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 })
    expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 })
    expect(deepMerge(undefined, undefined)).toEqual({})
  })

  test('数组视为叶子值，不递归合并', () => {
    expect(deepMerge({ a: [1, 2] }, { a: [3, 4] })).toEqual({ a: [3, 4] })
  })

  test('filter 可跳过指定字段的深层合并', () => {
    const result = deepMerge({ a: { x: 1 }, b: { y: 2 } }, { a: { x: 9 }, b: { y: 9 } }, (_value, key) => key !== 'b')
    expect(result.a).toEqual({ x: 9 })
    expect(result.b).toEqual({ y: 9 })
  })

  test('循环引用不会导致栈溢出', () => {
    const obj: any = { name: 'root', nested: { value: 1 } }
    obj.__self = obj

    let result: any
    expect(() => {
      result = deepMerge(obj, { extra: true })
    }).not.toThrow()

    expect(result.name).toBe('root')
    expect(result.extra).toBe(true)
    expect(result.__self).toBeDefined()
  })

  test('两层循环引用也安全', () => {
    const a: any = { id: 'a' }
    const b: any = { id: 'b' }
    a.ref = b
    b.ref = a

    let threw = false
    try {
      deepMerge(a, { extra: true })
    } catch {
      threw = true
    }
    expect(threw).toBe(false)
  })

  test('defineApi 风格的 __rawConfig 循环引用', () => {
    const config: any = {
      url: '/test',
      method: 'get',
      runApi: () => {},
      override: () => {},
    }
    config.__rawConfig = config

    const overrideConfig = { url: '/changed' }

    let result: any
    expect(() => {
      result = deepMerge(config, overrideConfig)
    }).not.toThrow()

    expect(result.url).toBe('/changed')
    expect(result.method).toBe('get')
  })
})
