import obj2formdata from '../obj2formdata'

describe('obj2formdata', () => {
  it('普通键值对转换为 FormData', () => {
    const result = obj2formdata({ name: 'test', age: '25' })
    expect(result).toBeInstanceOf(FormData)
    expect(result.get('name')).toBe('test')
    expect(result.get('age')).toBe('25')
  })

  it('数字值转换为字符串', () => {
    const result = obj2formdata({ count: 10 })
    expect(result.get('count')).toBe('10')
  })

  it('空对象返回空 FormData', () => {
    const result = obj2formdata({})
    expect(result).toBeInstanceOf(FormData)
    const entries = [...(result as any).entries()]
    expect(entries.length).toBe(0)
  })

  it('null/undefined 值处理', () => {
    const result = obj2formdata({ a: null, b: undefined })
    expect(result).toBeInstanceOf(FormData)
  })

  it('布尔值转换', () => {
    const result = obj2formdata({ active: true, deleted: false })
    expect(result.get('active')).toBe('true')
    expect(result.get('deleted')).toBe('false')
  })

  it('支持 File 对象', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const result = obj2formdata({ file })
    expect(result.get('file')).toBeInstanceOf(File)
  })
})
