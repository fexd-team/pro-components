import isBigNumber, { isNumberString } from '../isBigNumber'

describe('isBigNumber', () => {
  it('普通数字不是 BigNumber', () => {
    expect(isBigNumber(42)).toBe(false)
    expect(isBigNumber(0)).toBe(false)
    expect(isBigNumber(-1)).toBe(false)
    expect(isBigNumber(3.14)).toBe(false)
  })

  it('超长数字字符串是 BigNumber', () => {
    expect(isBigNumber('99999999999999999999')).toBe(true)
    expect(isBigNumber('12345678901234567890')).toBe(true)
  })

  it('普通数字字符串不是 BigNumber', () => {
    expect(isBigNumber('123')).toBe(false)
    expect(isBigNumber('9007199254740991')).toBe(false)
  })

  it('JS number 值不会被判定为 BigNumber', () => {
    expect(isBigNumber(Number.MAX_SAFE_INTEGER)).toBe(false)
    expect(isBigNumber(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
  })

  it('非数字类型返回 false', () => {
    expect(isBigNumber(null)).toBe(false)
    expect(isBigNumber(undefined)).toBe(false)
    expect(isBigNumber({})).toBe(false)
  })

  it('NaN 和 Infinity 不是 BigNumber', () => {
    expect(isBigNumber(NaN)).toBe(false)
    expect(isBigNumber(Infinity)).toBe(false)
    expect(isBigNumber(-Infinity)).toBe(false)
  })

  it('非纯数字字符串不是 BigNumber', () => {
    expect(isBigNumber('abc')).toBe(false)
    expect(isBigNumber('12abc')).toBe(false)
  })
})

describe('isNumberString', () => {
  it('纯数字字符串返回 true', () => {
    expect(isNumberString('123')).toBe(true)
    expect(isNumberString('0')).toBe(true)
    expect(isNumberString('3.14')).toBe(true)
  })

  it('负数字符串返回 true', () => {
    expect(isNumberString('-42')).toBe(true)
    expect(isNumberString('-0.5')).toBe(true)
  })

  it('非数字字符串返回 false', () => {
    expect(isNumberString('abc')).toBe(false)
    expect(isNumberString('12abc')).toBe(false)
    expect(isNumberString('')).toBe(false)
  })

  it('空格字符串返回 false', () => {
    expect(isNumberString(' ')).toBe(false)
    expect(isNumberString('  123  ')).toBe(false)
  })

  it('非字符串输入返回 false', () => {
    expect(isNumberString(null as any)).toBe(false)
    expect(isNumberString(undefined as any)).toBe(false)
    expect(isNumberString(123 as any)).toBe(false)
  })
})
