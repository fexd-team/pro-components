import { isObject, run } from '@fexd/tools'

export default function deepMerge(
  obj1: any,
  obj2: any,
  filter?: (value: any, key: string) => boolean,
  _seen?: WeakSet<object>,
) {
  const result: any = {}
  const seen = _seen ?? new WeakSet()

  ;[obj1, obj2].forEach((arg) => {
    if (isObject(arg)) {
      Object.entries(arg).forEach(([key, value]: [string, any]) => {
        if (isObject(value) && !seen.has(value) && run(filter, undefined, value, key) !== false) {
          seen.add(value)
          result[key] = deepMerge(result[key], value, filter, seen)
        } else {
          result[key] = value
        }
      })
    }
  })

  return result
}
