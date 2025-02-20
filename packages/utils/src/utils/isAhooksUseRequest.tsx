import { isObject } from '@fexd/tools'

export default function isAhooksUseRequestResult(value: any): boolean {
  if (!isObject(value)) {
    return false
  }

  // 核心特征检查 - ahooks useRequest 的独特标识
  const coreFeatures = [
    'loading', // 加载状态
    'data', // 数据
    'run', // 手动触发
    'refresh', // 刷新
    'mutate', // 数据修改
  ]

  const hasCoreFeatures = coreFeatures.every((key) => key in value)
  if (!hasCoreFeatures) {
    return false
  }

  // 类型检查
  if (
    typeof (value as any).loading !== 'boolean' ||
    typeof (value as any).run !== 'function' ||
    typeof (value as any).refresh !== 'function'
  ) {
    return false
  }

  return true
}
