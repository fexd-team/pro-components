/* eslint-disable @typescript-eslint/no-for-in-array */
import { isObject } from '@fexd/tools'

// 对比 deps 变化
export function compare(oldDeps: any[], newDeps: any[]) {
  if (oldDeps.length !== newDeps.length) {
    return true
  }
  for (const index in newDeps) {
    if (oldDeps[index] !== newDeps[index]) {
      return true
    }
  }
  return false
}

export function getObjectValues(obj: any): any[] {
  if (!isObject(obj)) {
    return []
  }

  return Object.values(obj)
}
