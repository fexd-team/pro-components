/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { isExist } from '@fexd/tools'

type AnyObject = {
  [key: string]: any
}

export default function filterObjectEmptyValue(obj: AnyObject): AnyObject {
  if (!obj) return {}

  return Object.keys(obj).reduce((prev: Record<string, any>, key: string) => {
    // 过滤空参数与空字符串
    if (isExist(obj[key]) && obj[key] !== '') {
      prev[key] = obj[key]
    }

    return prev
  }, {})
}
