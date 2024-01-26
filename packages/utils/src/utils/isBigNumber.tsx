// import BigNumber from 'bignumber.js'
import { isString } from '@fexd/tools'

export const isNumberString = (value: any): value is string => {
  // 判断传入的值是否为字符串类型，如果不是，则返回false
  if (!isString(value)) {
    return false
  }

  // 使用正则表达式判断字符串是否为数字字符串，如果是，则返回true，否则返回false
  return /^\d+(\.\d+)*$/.test(value)
}

const isBigNumber = (value: any): value is string => {
  // 判断传入的值是否为数字字符串，如果不是，则返回false
  if (!isNumberString(value)) {
    return false
  }

  // 将数字字符串转换为数字类型
  const number = Number(value)

  // 判断数字类型转换回字符串后是否与原字符串相等，如果不相等，则说明数字类型超出了字符串表示的范围，返回true
  return String(number) !== value
}

export default isBigNumber
