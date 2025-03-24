import difference from './difference'

// // 根据初始数组和当前数组，分别计算出新增和减少的数组
export default function diffArray<T = any>(init: T[], current: T[]) {
  const add = difference(current, init) as T[]
  const remove = difference(init, current) as T[]
  const diff = [...add, ...remove]

  return {
    add,
    remove,
    diff,
  }
}
