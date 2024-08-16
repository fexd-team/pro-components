import { get, isExist, memoize, run, isObject } from '@fexd/tools'
import { useRef, useMemo } from 'react'

import { cloneDeep, deepItemFilter, deepMap, isIterable, shallowMerge, useLatest, useMemoizedFn } from './helpers'
import { Coverable } from './types'

export default function useCoverable<T extends Record<string, any>, O = T>(
  config: T | ((options: { getConfig: () => Record<string, any> }) => T),
): Coverable<T, O> {
  const configRef = useLatest(config)
  const updateKeyPathMapRef = useRef<any>({})
  const getFinalConfigRef = useRef<any>({})
  const useConfig = run(configRef.current, undefined, {
    getConfig: () => run(getFinalConfigRef.current),
  }) as T
  useMemo(() => {
    deepMap(useConfig, (item, key, keyPath) => {
      if (key && item?.__isCoverableProps) {
        updateKeyPathMapRef.current[keyPath.join('.')] = [item, keyPath]
        const itemUpdateKeyPathMapRef = item?.__getUpdateKeyPathMapRef?.()?.current ?? {}
        Object.assign(updateKeyPathMapRef.current, itemUpdateKeyPathMapRef)

        return [false, item]
      }

      const canContinue = deepItemFilter(item)
      return [canContinue, item]
    })
  }, [])
  const getDefaultConfigRef = useRef<any>({})
  getDefaultConfigRef.current = useMemoizedFn(
    memoize(() => {
      const defaultConfig = cloneDeep(useConfig ?? {})
      return defaultConfig
    }) as any,
  )

  const overridedConfigRef = useRef<any>({})
  const override = (config) => (overridedConfigRef.current = config)
  getFinalConfigRef.current = memoize(() => {
    const defaultConfig = getDefaultConfigRef.current()

    if (defaultConfig?.__isCoverableValue) {
      const result = !override
        ? defaultConfig?.default
        : run(defaultConfig, 'onCovered', defaultConfig?.default, overridedConfigRef.current)
      return result
    }

    const handledCoverableMark = new Map()
    const mergedConfig = deepMap(defaultConfig, handleItem)

    function handleItem(item, key, keyPath, currentConfig): [boolean, any] {
      const override = get(overridedConfigRef.current, keyPath)

      // 过滤已处理的 coverableValue 项
      if (handledCoverableMark.has(item)) {
        return [false, item]
      }

      if (item?.__isCoverableValue) {
        const result = !override ? item?.default : run(item, 'onCovered', item?.default, override)
        handledCoverableMark.set(result, true)
        return [false, result]
      }

      const canMerge = deepItemFilter(item) && isIterable(item) && (isObject(override) || !isExist(override))
      const result = canMerge
        ? (shallowMerge as any)(...[item, override, deepMap(item, handleItem, keyPath)].filter(Boolean))
        : override ?? item

      return [canMerge, result]
    }

    handledCoverableMark.clear()

    return mergedConfig
  })

  const configReadedRef = useRef(false)
  const getConfig = useMemoizedFn(() => {
    configReadedRef.current = true
    return getFinalConfigRef.current() as T
  })

  return {
    getConfig,
    __getRawConfig: () => getDefaultConfigRef.current(),
    __isCoverableProps: () => true,
    __isConfigReaded: () => configReadedRef.current,
    __cover: override,
    __getUpdateKeyPathMapRef: () => updateKeyPathMapRef,
  } as any as Coverable<T, O>
}
