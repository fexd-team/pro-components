import formdata2obj from '../formdata2obj'

describe('formdata2obj', () => {
  it('将 FormData 转换为普通对象', () => {
    const fd = new FormData()
    fd.append('name', 'test')
    fd.append('age', '25')
    const result = formdata2obj(fd)
    expect(result).toEqual({ name: 'test', age: '25' })
  })

  it('空 FormData 返回空对象', () => {
    const fd = new FormData()
    const result = formdata2obj(fd)
    expect(result).toEqual({})
  })

  it('多值字段处理', () => {
    const fd = new FormData()
    fd.append('tags', 'a')
    fd.append('tags', 'b')
    const result = formdata2obj(fd)
    expect(result.tags).toBeDefined()
  })

  it('支持 File 类型的值', () => {
    const fd = new FormData()
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    fd.append('file', file)
    const result = formdata2obj(fd)
    expect(result.file).toBeInstanceOf(File)
  })

  it('保持字符串类型的值', () => {
    const fd = new FormData()
    fd.append('id', '123')
    fd.append('flag', 'true')
    const result = formdata2obj(fd)
    expect(result.id).toBe('123')
    expect(result.flag).toBe('true')
  })
})
