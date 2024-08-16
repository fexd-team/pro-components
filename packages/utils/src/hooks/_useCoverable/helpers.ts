import { isArray, isObject, run } from '@fexd/tools'
import React, { isValidElement, useCallback, useMemo, useRef, useState } from 'react'
import lodashCloneDeepWith from 'lodash/cloneDeepWith'
// import lodashCloneDeep from 'lodash/cloneDeep'

export function deepItemFilter(item) {
  if (isArray(item)) {
    return true
  }

  if (item?.$$typeof) {
    return false
  }

  if (item?.__isCoverableValue) {
    return false
  }

  return isObject(item) && !isValidElement(item)
}

export function deepMap<T>(
  input: T,
  handleItem: (item: any, key: string | number, keyPath: (string | number)[], currentResult: T) => [boolean, any] = (
    item,
  ) => [true, item],
  keyPath: (string | number)[] = [],
): T {
  if (!deepItemFilter(input)) {
    return input
  }

  if (Array.isArray(input)) {
    const newArray: any[] = []
    for (let i = 0; i < input.length; i++) {
      const item = input[i]
      const [continueDeep, newItem] = handleItem(item, i, keyPath.concat([i]), input as T) ?? [true, item]
      if (continueDeep && (Array.isArray(newItem) || typeof newItem === 'object')) {
        newArray.push(deepMap(newItem, handleItem, keyPath.concat([i])))
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
          newObject[key] = deepMap(newItem, handleItem, keyPath.concat([key]))
        } else {
          newObject[key] = newItem
        }
      }
    }
    return newObject as T
  } else {
    // If input is neither an array nor an object, return it directly
    return input
  }
}

export function deepMerge(target: any, source: any, filter: (value: any, key: string) => boolean = () => true): any {
  if ((!isObject(target) && !isArray(target)) || !isObject(source)) {
    return source ?? target
  }

  target = cloneDeep(target)

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key]

    if ((isObject(sourceValue) || isArray(sourceValue)) && run(filter, undefined, sourceValue, key) !== false) {
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
