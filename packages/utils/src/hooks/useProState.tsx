/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useEventListener, useMemoizedFn, useSafeState } from 'ahooks'
import { SetState as AhookSetState } from 'ahooks/es/useSetState'
import 'ahooks/es/useSetState'
import { run, storage, random, isObject, isString } from '@fexd/tools'

import useStateEnhance, { UseStateEnhanceOptions } from './useStateEnhance'

export type ProSetState<T extends Record<string, any>> = AhookSetState<T>
export interface UseProStateOptions<T> extends UseStateEnhanceOptions<T> {
  key?: string
  sync?: boolean
  syncDefaultValue?: boolean
  persist?: boolean | 'localStorage' | 'sessionStorage'
  autoMergeObject?: boolean
  beforeStatePersist?: (value: T) => any
  beforeStateRecovery?: (value: T) => any
}

const defaultHandler = (val: any) => val

export default function useProState<T>(defaultValue: T | (() => T), options: UseProStateOptions<T> = {}) {
  const hasKey = useMemo(() => isString(options?.key), [options?.key])
  const [randomPlaceholderKey] = useSafeState(() => `k${random(0, 999999, true)}`)
  const {
    key = randomPlaceholderKey,
    sync = true,
    persist = true,
    autoMergeObject = true,
    syncDefaultValue = false,
    beforeStatePersist = defaultHandler,
    beforeStateRecovery = defaultHandler,
    ...expandOptions
  } = options ?? {}
  const needSync = useMemo(() => hasKey && !!sync, [hasKey, sync])
  const needPersist = useMemo(() => hasKey && !!persist, [hasKey, persist])
  const persistType = useMemo(() => (persist === 'sessionStorage' ? 'sessionStorage' : 'localStorage'), [persist])
  const [persistedDefaultValue] = useState<any>(() => {
    if (!needPersist) {
      return undefined
    }

    return run(
      beforeStateRecovery,
      undefined,
      run(
        storage,
        {
          sessionStorage: 'getSession',
          localStorage: 'get',
        }[persistType],
        key,
      ),
    )
  })

  const syncEventName: string = `${key}::change`

  const [state, rawSetState] = useSafeState<T>(needPersist ? persistedDefaultValue ?? defaultValue! : defaultValue!)

  const calcNextState = (prevState: any, getNextValue: any) => {
    const nextState = run<T>(getNextValue, undefined, prevState)

    // 如果是对象就自动合并
    if (autoMergeObject && isObject(nextState) && isObject(prevState)) {
      // 值无任何改变，则不更新
      if (Object.entries(nextState as any).every(([key, value]) => prevState?.[key] === value)) {
        return prevState
      }

      return { ...prevState, ...nextState }
    }

    return nextState
  }

  const setState: T extends Record<string, any> ? ProSetState<T> : typeof rawSetState = useMemoizedFn((getNextState) =>
    rawSetState((prevState) => {
      const nextState = calcNextState(prevState, getNextState)

      // 作为变更源，广播同步消息
      if (needSync) {
        document.dispatchEvent(new CustomEvent(syncEventName, { detail: nextState }))
      }

      // 持久化缓存
      if (needPersist) {
        run(
          storage,
          {
            sessionStorage: 'setSession',
            localStorage: 'set',
          }[persistType],
          key,
          run(beforeStatePersist, undefined, nextState),
        )
      }

      return nextState
    }),
  ) as typeof rawSetState as any

  // 作为监听端，响应变更广播，对自身的值进行同步
  useEventListener(
    syncEventName as any,
    ({ detail: getNextState }: any = {}) => {
      if (!needSync) {
        return
      }
      rawSetState((prevState) => {
        const nextState = calcNextState(prevState, getNextState)

        return nextState
      })
    },
    { target: document },
  )

  useEffect(() => {
    if (!syncDefaultValue) {
      return
    }

    setState(defaultValue as any)
  }, [syncDefaultValue, defaultValue])

  const resetState = useMemoizedFn(() => setState(defaultValue as any))
  const stateEnhance = useStateEnhance(state, expandOptions)

  return {
    setState,
    resetState,
    state,
    ...stateEnhance,
  }
}
