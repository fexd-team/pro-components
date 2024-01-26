import { isArray, isObject, run } from '@fexd/tools'

export default function deepMapItem(
  object: any,
  options?: {
    handleItem?: (item: any, key: any, keyPath: any[]) => any
    filterItem?: (item: any, key: any, keyPath: any[]) => boolean
    prefixKeys?: any[]
  },
) {
  const { handleItem = (value) => value, filterItem = () => true, prefixKeys = [] } = options ?? {}
  if (isArray(object)) {
    return object.map((item, index) => {
      const nextPrefixKeys = [...prefixKeys, index]
      if (run(filterItem, undefined, item, index, nextPrefixKeys) === false) {
        return item
      }
      const nextItem = deepMapItem(item, {
        handleItem,
        filterItem,
        prefixKeys: nextPrefixKeys,
      })
      // return nextItem
      return run(handleItem, undefined, nextItem, index, nextPrefixKeys)
    })
  }

  if (isObject(object)) {
    for (const key in object) {
      const value = object?.[key]
      const nextPrefixKeys = [...prefixKeys, key]
      try {
        if (run(filterItem, undefined, value, key, nextPrefixKeys) === false) {
          object[key] = value
          continue
        }
        const nextValue = deepMapItem(value, { handleItem, filterItem, prefixKeys: nextPrefixKeys })
        object[key] = run(handleItem, undefined, nextValue, key, nextPrefixKeys)
      } catch {}
    }
  }

  return run(handleItem, undefined, object, undefined, prefixKeys)
}
