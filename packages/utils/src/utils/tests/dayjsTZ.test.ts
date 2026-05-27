import dayjsTZ from '../dayjsTZ'

describe('dayjsTZ', () => {
  it('可作为函数调用，返回 dayjs 实例', () => {
    const result = dayjsTZ()
    expect(result).toBeDefined()
    expect(typeof result.format).toBe('function')
    expect(typeof result.year).toBe('function')
    expect(typeof result.month).toBe('function')
  })

  it('支持传入日期字符串解析', () => {
    const result = dayjsTZ('2024-06-15')
    expect(result.year()).toBe(2024)
    expect(result.month()).toBe(5) // 0-indexed
    expect(result.date()).toBe(15)
  })

  it('支持传入 Date 对象', () => {
    const date = new Date(2024, 0, 1)
    const result = dayjsTZ(date)
    expect(result.year()).toBe(2024)
    expect(result.month()).toBe(0)
    expect(result.date()).toBe(1)
  })

  it('支持传入时间戳', () => {
    const ts = new Date(2024, 5, 15).getTime()
    const result = dayjsTZ(ts)
    expect(result.year()).toBe(2024)
  })

  it('支持 format 方法', () => {
    const result = dayjsTZ('2024-01-15 10:30:00')
    expect(result.format('YYYY-MM-DD')).toBe('2024-01-15')
  })

  it('包含 tz 属性', () => {
    expect(dayjsTZ.tz).toBeDefined()
  })

  it('支持 setDefault 设置默认时区', () => {
    expect(typeof dayjsTZ.setDefault).toBe('function')
    dayjsTZ.setDefault('Asia/Shanghai')
    const now = dayjsTZ()
    expect(now).toBeDefined()
    dayjsTZ.setDefault()
  })

  it('支持 relativeTime 插件 (fromNow)', () => {
    const past = dayjsTZ('2020-01-01')
    expect(typeof past.fromNow).toBe('function')
    const fromNow = past.fromNow()
    expect(typeof fromNow).toBe('string')
  })

  it('支持 advancedFormat 插件', () => {
    const result = dayjsTZ('2024-01-15')
    const formatted = result.format('Do')
    expect(formatted).toBeDefined()
  })

  it('支持 weekOfYear 插件', () => {
    const result = dayjsTZ('2024-01-15')
    expect(typeof result.week).toBe('function')
    expect(result.week()).toBeGreaterThan(0)
  })

  it('customParseFormat 插件已注册（通过 rawDayjs 使用）', () => {
    const result = dayjsTZ('2024-01-15T10:30:00')
    expect(result.isValid()).toBe(true)
  })

  it('customParseFormat 两参数形式可直接使用', () => {
    const result = dayjsTZ('15/01/2024', 'DD/MM/YYYY')
    expect(result.isValid()).toBe(true)
    expect(result.year()).toBe(2024)
    expect(result.month()).toBe(0)
    expect(result.date()).toBe(15)
  })

  it('customParseFormat 不影响合法时区参数', () => {
    const result = dayjsTZ('2024-06-15', 'Asia/Shanghai')
    expect(result.isValid()).toBe(true)
    expect(result.year()).toBe(2024)
  })

  it('customParseFormat 三参数形式（格式 + 时区）', () => {
    const result = dayjsTZ('15/01/2024', 'DD/MM/YYYY', 'UTC')
    expect(result.isValid()).toBe(true)
    expect(result.year()).toBe(2024)
    expect(result.month()).toBe(0)
    expect(result.date()).toBe(15)
  })
})
