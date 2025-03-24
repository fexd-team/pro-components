/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, isValidElement } from 'react'
import { isAhooksUseRequestResult } from '@fexd/pro-utils'
import { useRequest } from 'ahooks'
import { Result } from 'ahooks/es/useRequest/src/types'
import { run, isArray, isString, isObject, isNumber, isBoolean } from '@fexd/tools'

const adaptOptions = (rawOptions: any[] = [], adapConfig: { keyMap?: Record<string, any> } = {}): any[] => {
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

  const mapKey = (obj) => ({
    ...obj,
    ...Object.fromEntries(
      Object.entries(adapConfig?.keyMap ?? {}).map(([key, value]) => {
        return [value, obj?.[key] ?? obj?.[value]]
      }),
    ),
  })

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
                  ...mapKey(opt),
                  children: adaptOptions(opt?.children, adapConfig),
                }
              }

              return mapKey(opt)
            })
            .filter(isObject)
        : [],
    ),
  ]
}

export default function useRemoteOptions(optionConfigs: any, adapConfig: { keyMap?: Record<string, any> } = {}) {
  const isService = useMemo(() => isAhooksUseRequestResult(optionConfigs), [optionConfigs])

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
    () => adaptOptions(!isRemote ? optionConfigs : service?.data ?? [], adapConfig),
    [isRemote, optionConfigs, service?.data],
  )

  return {
    service,
    options,
    loading: !isRemote ? false : service.loading,
    isRemote,
  }
}
