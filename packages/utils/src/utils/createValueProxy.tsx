export default function createValueProxy(target: any, valueHandler: (value: any, prop: any) => any) {
  try {
    return new Proxy(target, {
      get: (obj, prop) => {
        if (prop in obj) {
          return valueHandler?.(obj?.[prop], prop) ?? obj?.[prop]
        }
        return undefined
      },
    })
  } catch {
    return target
  }
}
