import { compactObject } from '@fexd/tools'

export default function filterObjectEmptyValue(obj: Record<string, any>): Record<string, any> {
  if (!obj) return {}
  return compactObject(obj)
}
