// 差集方法
export default function difference(arr1: any[], arr2: any[]) {
  return arr1.filter((item) => !arr2.includes(item))
}
