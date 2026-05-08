/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { isObject, isFunction, run } from '@fexd/tools'
import { Optional } from 'utility-types'
// import { useCoverable, CoverableValue } from 'react-coverable'
import { useCoverable, CoverableValue } from '../../hooks/useCoverable'
import { DeepPartialObject } from '../type-tools'
import catchPromise from '../catchPromise'
import deepMerge from '../deepMerge'
import { builtInRequestConfig } from './builtInConfig'
import type { ServerResponse, DefineApiConfig, DefinedApi, ServerRequest } from './types'

type DefinedApiConfig<T extends DefinedApi> =
  | ((
      ...params: T extends { handleParams: (...args: any) => any } ? Parameters<T['handleParams']> : any[]
    ) => T extends { handleResponse: (...args: any) => any }
      ?
          | (void | DeepPartialObject<ReturnType<T['handleResponse']>>)
          | Promise<void | DeepPartialObject<ReturnType<T['handleResponse']>>>
      : (void | Optional<ServerResponse<any>>) | Promise<void | Optional<ServerResponse<any>>>)
  | DeepPartialObject<T>

async function runApi(apiConfig: any, ...restArgs: any[]) {
  const {
    url = '',
    method = 'get',
    handleParams = (value) => value,
    handleResponse = (value) => value,
    overrideConfig: genOverrideConfig = () => ({}),
    // TODO: 增加自动取消重复请求的功能
    // signal:
    requestInstance: request,
    // cancelToken,
    ...restConfig
  } = {
    ...(apiConfig?.__rawConfig ?? {}),
    ...apiConfig,
  } as ReturnType<typeof defineApi>

  const isGetMethod = method === 'get'
  const params = handleParams?.(...restArgs)

  const overrideConfig = run(
    genOverrideConfig,
    undefined,
    {
      url,
      method,
      ...restConfig,
    },
    params,
  )
  const requestConfig = {
    url,
    ...restConfig,
    ...(isObject(overrideConfig) ? overrideConfig : {}),
  }
  const rawResponse = await request!?.[method as 'post']?.(
    requestConfig?.url ?? url,
    isGetMethod
      ? {
          ...(isObject(params?.params) ? params : { params }),
          ...requestConfig,
        }
      : params,
    !isGetMethod ? requestConfig : undefined,
  )
  const response = handleResponse?.(rawResponse)

  if (!isObject(response)) {
    return response as typeof rawResponse
  }
  return Object.assign({}, rawResponse, response) as typeof rawResponse
}

function overrideApi(paramRawConfig: DefinedApi, paramOverrideConfig: DefineApiConfig): DefinedApi {
  const rawConfig = paramRawConfig as any
  let overrideConfig = paramOverrideConfig as any

  if (isFunction(overrideConfig)) {
    const runApi = overrideConfig
    overrideConfig = {
      ...rawConfig,
      runApi: async (...args: any) => {
        const [error, response] = (await catchPromise(runApi(...args))) as any

        if (error) {
          return {
            ...(builtInRequestConfig?.responseInterceptors?.onRejected?.(error) ?? {}),
            ...response,
          }
        }

        if (!isObject(response)) {
          return response
        }

        const interceptorResponse =
          builtInRequestConfig?.responseInterceptors?.onFulfilled?.(response?.response ?? response) ?? {}

        if (!isObject(interceptorResponse)) {
          return interceptorResponse
        }

        return {
          ...interceptorResponse,
          ...response,
        }
      },
    }
  } else {
    const rawConfigObject = {
      ...rawConfig,
    }
    overrideConfig = deepMerge(rawConfigObject, overrideConfig)
    overrideConfig.runApi = runApi.bind(null, overrideConfig)
  }
  const tempConfig = { ...overrideConfig }
  tempConfig.override = overrideApi.bind(null, tempConfig as any)
  tempConfig.runWithConfig = async (config, ...rest) => {
    const overridedApi = tempConfig.override(config)
    return run(overridedApi, undefined, ...rest)
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  tempConfig.requestInstance = request
  overrideConfig = tempConfig.runApi as any
  tempConfig.__rawConfig = tempConfig

  return Object.assign(overrideConfig, tempConfig) as DefinedApi
}

export function defineApi<T extends DefineApiConfig>({ ...config }: T) {
  const rawConfig = config as DefinedApi<ServerResponse, T>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  rawConfig.requestInstance = rawConfig.requestInstance ?? request
  // @ts-ignore
  rawConfig.__isDefinedApi = true
  // @ts-ignore
  rawConfig.runApi = runApi.bind(null, rawConfig)
  // @ts-ignore
  rawConfig.override = overrideApi.bind(null, rawConfig as any)
  rawConfig.runWithConfig = async (config, ...rest) => {
    const overridedApi = rawConfig.override(config)
    return run(overridedApi, undefined, ...rest)
  }
  config = rawConfig.runApi as any

  // @ts-ignore
  config.__rawConfig = rawConfig

  Object.assign(config, rawConfig)
  return config as DefinedApi<ServerResponse, T>
}

// @ts-ignore
export function coverable<T extends DefinedApi<ServerResponse, any> | DefineApiConfig>(
  apiConfig: T | DefineApiConfig,
): T extends DefinedApi<ServerResponse, any>
  ? CoverableValue<T, DefinedApiConfig<T>>
  : T extends DefineApiConfig
    ? // @ts-ignore
      CoverableValue<DefinedApi<ServerResponse, T>, DefinedApiConfig<DefinedApi<ServerResponse, T>>>
    : never {
  const api = isFunction(apiConfig) ? apiConfig : defineApi(apiConfig)

  return useCoverable.value({
    default: api,
    config: {},
    onCovered: (current: any, next) => {
      return current.override(next as any)
    },
  }) as any
}

export type CoverableFn = typeof coverable

// eslint-disable-next-line @typescript-eslint/no-var-requires
let request: any
export function _setRequestInstance(req: any) {
  request = req
}
