import { get, isExist, memoize, run, isObject } from '@fexd/tools'
import { useRef } from 'react'

import { cloneDeep, deepItemFilter, deepMap, isIterable, shallowMerge, useLatest, useMemoizedFn } from './helpers'
import { Coverable } from './types'

export default function useCoverable<T extends Record<string, any>>(
  config: T | ((options: { getConfig: () => Record<string, any> }) => T),
) {
  const configRef = useLatest(config)
  const getFinalConfigRef = useRef<any>({})
  const useConfig = run(configRef.current, undefined, {
    getConfig: () => run(getFinalConfigRef.current),
  }) as T
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
  } as any as Coverable<T>
}
