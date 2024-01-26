/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import React, { isValidElement, useMemo } from 'react'
import {
  ProTable,
  ProTableColumnType,
  DefinedProTableColumns,
  DefinedProTableFields,
  ProTableEditFieldType,
} from '@fexd/pro-table'
import { SAS, get, isArray, isObject, memoize, run, isFunction } from '@fexd/tools'
import { Optional } from 'utility-types'
import 'ahooks/lib/useRequest/src/types'

import { DefinedApi, request, ServerResponse, ServerRequest, deepMerge, deepMapItem } from '@fexd/pro-utils'

// export type UseRequestResult<TData, TParams> = Result<TData, TParams>

const defaultConfigRequest = (request) => request
function useRequestInstance(onConfigRequest: (request: ServerRequest) => void = defaultConfigRequest) {
  const rawRequest = request
  const clonedRequest = useMemo<typeof rawRequest>(() => {
    const request = run(rawRequest, 'clone')
    run(onConfigRequest, undefined, request)
    return request
  }, [rawRequest, onConfigRequest])

  return clonedRequest
}

export function createConfigurable<T extends (...args: any) => any>(useConfig: T) {
  return (props: ConfigurableProps<T>) => {
    const request = useRequestInstance(props?.onConfigRequest)
    const defaultConfig = run(useConfig, undefined, props)
    const configurable = run(props?.configurable, undefined, defaultConfig)

    const mergedConfig = deepMapItem(deepMerge(defaultConfig, configurable ?? {}, filterItem), {
      handleItem,
      filterItem,
    })

    run(defaultConfig?.__setConfig, undefined, mergedConfig)

    function filterItem(item) {
      if (isArray(item)) {
        return false
      }

      if (item?.$$typeof) {
        return false
      }

      if (item?.run && item?.runAsync) {
        return false
      }

      return isObject(item) && !isValidElement(item)
    }

    function handleItem(item, key, keyPath) {
      const rawItem = get(defaultConfig, keyPath)

      if (rawItem?.__isDefinedApi) {
        return (rawItem as DefinedApi).override(item)
      }

      if (item?.__isProTableColumns) {
        const mergedValue = deepMapItem(deepMerge(item?.getRawConfig(), get(configurable, keyPath, {}), filterItem), {
          handleItem,
          filterItem,
        })
        item.getConfigs = () => ProTable.defineColumns(mergedValue).getConfigs()
        return item
      }

      if (item?.__isProTableFields) {
        const mergedValue = deepMapItem(deepMerge(item?.getRawConfig(), get(configurable, keyPath, {}), filterItem), {
          handleItem,
          filterItem,
        })
        item.getConfigs = () => ProTable.defineFields(mergedValue).getConfigs()
        return item
      }

      return item
    }

    mergedConfig.request = request

    return mergedConfig as ReturnType<T> & {
      request: typeof request
    }
  }
}

export type DeepConfigurableOptional<T> = {
  [K in keyof T]?: T[K] extends DefinedProTableFields // defineFields start ----------------
    ? {
        [key: string]: ProTableEditFieldType
      } & DeepConfigurableOptional<Omit<T[K], OmitProTableFieldTypes>>
    : T[K] extends ProTableEditFieldType
      ? DeepConfigurableOptional<T[K]> & ProTableEditFieldType
      : // defineFields end ----------------
        // defineColumns start ----------------
        T[K] extends DefinedProTableColumns
        ? {
            [key: string]: ProTableColumnType
          } & DeepConfigurableOptional<Omit<T[K], OmitProTableColumnTypes>>
        : T[K] extends ProTableColumnType
          ? DeepConfigurableOptional<T[K]> & ProTableColumnType
          : // defineColumns end ----------------

            // T[K] extends UseRequestResult
            // ? T[K]
            // :
            T[K] extends DefinedApi
            ?
                | ((
                    ...params: T[K] extends { handleParams: (...args: any) => any }
                      ? Parameters<T[K]['handleParams']>
                      : any[]
                  ) => T[K] extends { handleResponse: (...args: any) => any }
                    ?
                        | (void | DeepConfigurableOptional<ReturnType<T[K]['handleResponse']>>)
                        | Promise<void | DeepConfigurableOptional<ReturnType<T[K]['handleResponse']>>>
                    : (void | Optional<ServerResponse<any>>) | Promise<void | Optional<ServerResponse<any>>>)
                | DeepConfigurableOptional<T[K]>
            : T[K] extends (...args: any) => any
              ? T[K]
              : T[K] extends object
                ? DeepConfigurableOptional<T[K]>
                : T[K]
}

export type ConfigurableProps<T extends (...args: any) => any> = {
  configurable?:
    | Omit<DeepConfigurableOptional<ReturnType<T>>, 'request'>
    | ((rawConfig?: Omit<ReturnType<T>, 'request'>) => Omit<DeepConfigurableOptional<ReturnType<T>>, 'request'>)
  /** 定制这个组件的请求器，可单独配置每个接口的拦截器，调整入参出参 */
  onConfigRequest?: (requestInstance: typeof request) => void
}

type OmitProTableColumnTypes =
  | 'getConfigs'
  | 'getRawConfig'
  | 'getViewFieldKeys'
  | 'getQueryFieldKeys'
  | 'getAddFieldKeys'
  | 'getEditFieldKeys'
  | 'getExpandViewFieldKeys'
  | 'getViewFields'
  | 'getQueryFields'
  | 'getAddFields'
  | 'getEditFields'
  | 'getExpandViewFields'
  | '__isProTableColumns'

type OmitProTableFieldTypes = 'getConfigs' | 'getRawConfig' | '__isProTableFields'
