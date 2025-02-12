export default function createValueProxy(target, valueHandler) {
  try {
    return new Proxy(target, {
      get: (obj, prop) => {
        if (prop in obj) {
          return valueHandler?.(obj?.[prop]) ?? obj?.[prop]
        }
        return undefined
      },
    })
  } catch {
    return target
  }
}
