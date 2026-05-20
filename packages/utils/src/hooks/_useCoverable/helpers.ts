import { isArray, isObject, run } from '@fexd/tools'
import React, { isValidElement, useCallback, useMemo, useRef, useState } from 'react'
import lodashCloneDeepWith from 'lodash/cloneDeepWith'
// import lodashCloneDeep from 'lodash/cloneDeep'

const rawSet = new WeakSet()

/** 标记一个对象为"不可处理"，coverable 系统会跳过对它的 clone / traverse / merge */
export function markRaw<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    rawSet.add(value)
  }
  return value
}

export function isRaw(value: any): boolean {
  return typeof value === 'object' && value !== null && rawSet.has(value)
}

/**
 * 启发式检测 React ref（useRef / createRef 产物）
 * 仅当对象恰好只有 `current` 一个自有键时判定为 ref
 */
export function isReactRef(value: any): boolean {
  if (!isObject(value) || isArray(value) || isValidElement(value)) return false
  const keys = Object.keys(value)
  return keys.length === 1 && keys[0] === 'current'
}

/** 只有 plain object 才参与 coverable 的深度遍历 / 合并 */
export function isPlainObject(value: any): boolean {
  if (!isObject(value) || isArray(value) || isValidElement(value)) return false

  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/** 判断一个值是否应被 coverable 跳过（不深入遍历 / 不克隆） */
export function isOpaqueValue(value: any): boolean {
  return isRaw(value) || isReactRef(value) || (isObject(value) && !isArray(value) && !isPlainObject(value))
}

export function deepItemFilter(item) {
  if (isArray(item)) {
    return true
  }

  if (item?.__isCoverableValue) {
    return false
  }

  if (isOpaqueValue(item)) {
    return false
  }

  return isPlainObject(item)
}

export function deepMap<T>(
  input: T,
  handleItem: (item: any, key: string | number, keyPath: (string | number)[], currentResult: T) => [boolean, any] = (
    item,
  ) => [true, item],
  keyPath: (string | number)[] = [],
  _visited?: WeakSet<object>,
): T {
  if (!deepItemFilter(input)) {
    return input
  }

  const visited = _visited ?? new WeakSet()
  if (typeof input === 'object' && input !== null) {
    if (visited.has(input)) return input
    visited.add(input)
  }

  if (Array.isArray(input)) {
    const newArray: any[] = []
    for (let i = 0; i < input.length; i++) {
      const item = input[i]
      const [continueDeep, newItem] = handleItem(item, i, keyPath.concat([i]), input as T) ?? [true, item]
      if (continueDeep && (Array.isArray(newItem) || typeof newItem === 'object')) {
        newArray.push(deepMap(newItem, handleItem, keyPath.concat([i]), visited))
      } else {
        newArray.push(newItem)
      }
    }
    return newArray as T
  } else if (typeof input === 'object' && input !== null) {
    const newObject: Record<string, any> = {}
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const item = input[key]
        const [continueDeep, newItem] = handleItem(item, key, keyPath.concat([key]), input as T) ?? [true, item]
        if (continueDeep && (Array.isArray(newItem) || typeof newItem === 'object')) {
          newObject[key] = deepMap(newItem, handleItem, keyPath.concat([key]), visited)
        } else {
          newObject[key] = newItem
        }
      }
    }
    return newObject as T
  } else {
    return input
  }
}

export function deepMerge(target: any, source: any, filter: (value: any, key: string) => boolean = () => true): any {
  if (isOpaqueValue(source)) {
    return source
  }

  if (isOpaqueValue(target)) {
    return source ?? target
  }

  if ((!isObject(target) && !isArray(target)) || !isObject(source)) {
    return source ?? target
  }

  target = cloneDeep(target)

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key]

    if (isOpaqueValue(sourceValue)) {
      target[key] = sourceValue
    } else if ((isObject(sourceValue) || isArray(sourceValue)) && run(filter, undefined, sourceValue, key) !== false) {
      target[key] = deepMerge(target[key], sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

export const shallowMerge = (first: any, ...rest: any[]) =>
  rest.reduce((acc, val) => deepMerge(acc, val, () => false), first) as any

export const builtInMerge = (obj1: any, obj2: any, filter: (value: any, key: string) => boolean = deepItemFilter) =>
  deepMerge(obj1, obj2, filter)

export function cloneDeep<T>(value: T): T {
  return lodashCloneDeepWith(value, (value) => {
    if (React.isValidElement(value)) {
      return React.cloneElement(value) as T
    }
    if (isOpaqueValue(value)) {
      return value
    }
  }) as T
}

export const useUpdate = () => {
  const [, setState] = useState({})

  return useCallback(() => setState({}), [])
}

export function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value

  return ref
}

type NOOP = (this: any, ...args: any[]) => any

type PickFunction<T extends NOOP> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>

export function useMemoizedFn<T extends NOOP>(fn: T) {
  const fnRef = useRef<T>(fn)

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo<T>(() => fn, [fn])

  const memoizedFn = useRef<PickFunction<T>>()
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn.current as T
}

export function isIterable(value: any): boolean {
  return isObject(value) || isArray(value)
}
