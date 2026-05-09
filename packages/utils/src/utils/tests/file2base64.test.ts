import file2base64 from '../file2base64'

describe('file2base64', () => {
  it('将 File 对象转换为 base64 字符串', async () => {
    const content = 'Hello, World!'
    const file = new File([content], 'test.txt', { type: 'text/plain' })
    const result = await file2base64(file)
    expect(result).toContain('data:text/plain;base64,')
  })

  it('将 Blob 转换为 base64 字符串', async () => {
    const blob = new Blob(['test content'], { type: 'text/plain' })
    const result = await file2base64(blob)
    expect(result).toContain('data:text/plain;base64,')
  })

  it('空文件返回空的 base64', async () => {
    const file = new File([], 'empty.txt', { type: 'text/plain' })
    const result = await file2base64(file)
    expect(result).toBe('data:text/plain;base64,')
  })

  it('不同 MIME 类型的文件正确编码', async () => {
    const jsonFile = new File(['{"key":"value"}'], 'data.json', { type: 'application/json' })
    const result = await file2base64(jsonFile)
    expect(result).toContain('data:application/json;base64,')
  })

  it('读取失败时 reject', async () => {
    const badObj = {
      slice: () => new Blob([]),
    }
    await expect(file2base64(badObj)).rejects.toBeDefined()
  })
})
