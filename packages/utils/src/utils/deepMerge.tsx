import { isObject, run } from '@fexd/tools'

export default function deepMerge(obj1: any, obj2: any, filter?: (value: any, key: string) => boolean) {
  const result: any = {}

  ;[obj1, obj2].forEach((arg) => {
    if (isObject(arg)) {
      Object.entries(arg).forEach(([key, value]) => {
        if (isObject(value) && run(filter, undefined, value, key) !== false) {
          result[key] = deepMerge(result[key], value, filter)
        } else {
          result[key] = value
        }
      })
    }
  })

  return result
}
