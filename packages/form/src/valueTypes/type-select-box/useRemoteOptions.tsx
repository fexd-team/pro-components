import { useMemo, isValidElement } from 'react'

import { useRequest } from 'ahooks'
import { Result } from 'ahooks/es/useRequest/src/types'
import { run, isArray, isString, isObject, intersection, isNumber, isExist, isBoolean } from '@fexd/tools'

const adaptOptions = (rawOptions: any[] = []): any[] => {
  let options = rawOptions
  // console.log('options', options)

  if (isObject(options)) {
    options = Object.entries(rawOptions).map(([key, value]) =>
      isObject(value) && !isValidElement(value)
        ? {
            ...value,
            value: key,
          }
        : {
            label: value,
            value: key,
          },
    )
  }

  return [
    ...new Set(
      isArray(options)
        ? options
            .map((opt: any) => {
              if ([isString, isNumber, isBoolean].some((is) => is(opt))) {
                return {
                  title: String(opt),
                  label: String(opt),
                  value: opt,
                }
              }

              if (isArray(opt?.children)) {
                return {
                  ...opt,
                  children: adaptOptions(opt?.children),
                }
              }

              return opt
            })
            .filter(isObject)
        : [],
    ),
  ]
}

const useRequestKeys = [
  'loading',
  'data',
  'error',
  'params',
  'cancel',
  'refresh',
  'refreshAsync',
  'run',
  'runAsync',
  'mutate',
]
export default function useRemoteOptions(optionConfigs: any) {
  const isService = useMemo(() => {
    if (!isObject(optionConfigs)) {
      return false
    }
    const serviceKeys = useRequestKeys // Object.keys(insideService)
    if (serviceKeys?.length === 0) {
      return false
    }
    // 取 keys 交集
    const matchKeys = intersection(serviceKeys, Object.keys(optionConfigs))

    // 判断 keys 重合度大于 50%，认为传入的是 service
    return matchKeys?.length / serviceKeys?.length >= 0.5
  }, [optionConfigs])

  const isRemote = !((isObject(optionConfigs) && !isService) || Array.isArray(optionConfigs))

  const insideService = useRequest<any, any>(
    async (...args: any[]) => {
      const response: any = await run(optionConfigs, undefined, ...args)

      if (Array.isArray(response)) {
        return response
      }

      const { success, data } = response ?? {}

      if (success) {
        return data
      }

      return []
    },
    {
      manual: !isRemote,
    },
  )

  const service: Result<any, any> = isService ? (optionConfigs as Result<any, any>) : insideService

  const options = useMemo(
    () => adaptOptions(!isRemote ? optionConfigs : service?.data ?? []),
    [isRemote, optionConfigs, service?.data],
  )

  return {
    service,
    options,
    loading: !isRemote ? false : service.loading,
    isRemote,
  }
}
