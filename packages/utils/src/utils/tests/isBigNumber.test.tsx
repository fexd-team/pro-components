// import React from 'react'
// import { render, screen, act, fireEvent } from '@testing-library/react'
// import { delay } from '@fexd/tools'

import isBigNumber, { isNumberString } from '../isBigNumber'

describe('isBigNumber', () => {
  test('isNumberString 正常工作', () => {
    // 字符串测试
    expect(isNumberString('1000')).toBe(true)
    expect(isNumberString('0.01')).toBe(true)
    expect(isNumberString('1000.01')).toBe(true)
    expect(isNumberString('1,000')).toBe(false)
    expect(isNumberString('1000.')).toBe(false)
    expect(isNumberString('0..01')).toBe(false)
    expect(isNumberString('1000..01')).toBe(false)
    expect(isNumberString('.01')).toBe(false)
    expect(isNumberString('1,000.01')).toBe(false)
    // 其他类型测试
    expect(isNumberString(1000)).toBe(false)
    expect(isNumberString(true)).toBe(false)
    expect(isNumberString([])).toBe(false)
    expect(isNumberString({})).toBe(false)
  })

  test('isBigNumber 正常工作', () => {
    // 字符串测试
    expect(isBigNumber('12345678987654321')).toBe(true)
    expect(isBigNumber('9007199254740995')).toBe(true)
    expect(isBigNumber('9007199254740994')).toBe(false)
    expect(isBigNumber('9007199254740993')).toBe(true)
    expect(isBigNumber('9007199254740992')).toBe(false)
    expect(isBigNumber('9007199254740991')).toBe(false)

    expect(isBigNumber('1000')).toBe(false)
    expect(isBigNumber('0.01')).toBe(false)
    expect(isBigNumber('1000.01')).toBe(false)
    expect(isBigNumber('1,000')).toBe(false)
    expect(isBigNumber('1000.')).toBe(false)
    expect(isBigNumber('0..01')).toBe(false)
    expect(isBigNumber('1000..01')).toBe(false)
    expect(isBigNumber('.01')).toBe(false)
    expect(isBigNumber('1,000.01')).toBe(false)
    // 其他类型测试
    expect(isBigNumber(1000)).toBe(false)
    expect(isBigNumber(true)).toBe(false)
    expect(isBigNumber([])).toBe(false)
    expect(isBigNumber({})).toBe(false)
  })
})
