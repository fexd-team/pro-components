/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/method-signature-style */
import axios, {
  // AxiosInstance,
  // AxiosResponse,
  AxiosRequestConfig as RawAxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosRequestTransformer,
  AxiosRequestHeaders,
  CreateAxiosDefaults,
} from 'axios'
import {
  setupCache,
  AxiosCacheInstance as AxiosInstance,
  CacheAxiosResponse as AxiosResponse,
  CacheRequestConfig,
  InternalCacheRequestConfig,
  CacheOptions,
  defaultRequestInterceptor,
  AxiosCacheInstance,
} from 'axios-cache-interceptor'
import { qs, isString, isObject, isArray, isExist, isFunction, run } from '@fexd/tools'
// import { useCoverable, CoverableValue } from 'react-coverable'
import { useCoverable, CoverableValue } from '../hooks/useCoverable'
import { DeepPartial, Optional, DeepRequired } from 'utility-types'

import catchPromise from './catchPromise'
import deepMerge from './deepMerge'
import { DeepPartialObject } from './type-tools'

type AxiosRequestConfig<T = any> = RawAxiosRequestConfig<T> & CacheRequestConfig<T>

export const builtInRequestConfig = {
  responseInterceptors: {
    onFulfilled: ((response: any) => {
      if (response?.data instanceof Blob) {
        return response?.data
      }

      const {
        data,
        success = true,
        errCode,
        errMsg,
        sysMsg,
        msg,
        message,
        code,
        status,
        sys_msg,
        tip_msg,
        err_msg,
      } = response?.data ?? {}

      return {
        success,
        data,
        code: errCode ?? code ?? status,
        message: msg ?? sysMsg ?? errMsg ?? message ?? sys_msg ?? tip_msg ?? err_msg,
        response,
      }
    }) as Parameters<typeof request.interceptors.response.use>['0'],
    onRejected: ((err) => {
      const code =
        err?.response?.data?.errCode ??
        err?.response?.data?.code ??
        err?.response?.data?.status ??
        err?.response?.status

      const message =
        err?.response?.data?.msg ??
        err?.response?.data?.sysMsg ??
        err?.response?.data?.errMsg ??
        err?.response?.data?.message ??
        err?.response?.statusText ??
        err?.response?.responseText ??
        err?.message ??
        'Unknow Error'

      return {
        success: false,
        data: err?.response?.data,
        code,
        message,
        error: err,
        response: err?.response,
      }
    }) as Parameters<typeof request.interceptors.response.use>['1'],
  },
  transformRequest: ((params, headers = {} as AxiosRequestHeaders) => {
    switch (headers?.['Content-Type']) {
      case 'application/x-www-form-urlencoded':
        return qs.stringify(params)
      case 'application/json':
        return isString(params) ? params : JSON.stringify(params)
      case 'multipart/form-data':
        return params
      default: {
        if (params instanceof FormData) {
          return params
        }

        if ((!headers!['Content-Type'] && isObject(params)) || isArray(params)) {
          headers!['Content-Type'] = 'application/json' // 自动补充 content-type
          return JSON.stringify(params)
        }

        return params
      }
    }
  }) as AxiosRequestTransformer,
}

const getCacheRequestInterceptor = (axios: AxiosCacheInstance) => {
  const defaultRequestInterceptorResult = defaultRequestInterceptor(axios)
  const onFulfilled = ((config, ...args) => {
    if (!isExist(config?.cache) || (config?.cache as any)?.ttl <= 0) {
      config.cache = false
    }

    return defaultRequestInterceptorResult.onFulfilled(config, ...args)
  }) as typeof defaultRequestInterceptorResult.onFulfilled
  const apply = (() => axios.interceptors.request.use(onFulfilled)) as typeof defaultRequestInterceptorResult.apply

  return {
    ...defaultRequestInterceptorResult,
    onFulfilled,
    apply,
  }
}

const rawRequest = axios.create({
  timeout: 60 * 1000,
  // @ts-ignore
  transformRequest: [(...args: any[]) => builtInRequestConfig?.transformRequest?.(...args)],
})

const defaultCacheOptions: CacheOptions = {
  ttl: -1,
  interpretHeader: false,
  methods: ['get', 'post', 'head'],
}

const request = setupCache(rawRequest, {
  requestInterceptor: getCacheRequestInterceptor(rawRequest as AxiosCacheInstance),
  ...defaultCacheOptions,
}) as ServerRequest

export default request

export const cloneAxiosInstance = <NR extends Record<string, any> = ServerResponse>(
  request: ServerRequest<NR>,
  {
    keepInterceptors = true,
    cloneOptions = {},
    cacheSetupOptions = defaultCacheOptions,
  }: { keepInterceptors?: boolean; cloneOptions?: CreateAxiosDefaults; cacheSetupOptions?: CacheOptions } = {},
) => {
  const rawClonedRequest = request.create(cloneOptions)
  // @ts-ignore
  rawClonedRequest.defaults.cache = undefined
  const clonedRequest = setupCache(rawClonedRequest, {
    requestInterceptor: getCacheRequestInterceptor(rawClonedRequest as AxiosCacheInstance),
    ...cacheSetupOptions,
  }) as ServerRequest<NR>

  if (keepInterceptors) {
    // @ts-ignore
    request.interceptors.request.handlers.forEach((handler) => {
      clonedRequest.interceptors.request.use(handler.fulfilled, handler.rejected)
    })

    // @ts-ignore
    request.interceptors.response.handlers.forEach((handler) => {
      clonedRequest.interceptors.response.use(handler.fulfilled, handler.rejected)
    })
  }

  clonedRequest.clone = cloneAxiosInstance.bind(null, clonedRequest) as any
  clonedRequest.define = defineApi as any
  return clonedRequest
}

request.clone = cloneAxiosInstance.bind(null, request) as any
request.define = defineApi as any
request.coverable = coverable as any
request.setConfig = (config: CreateAxiosDefaults<any>) => {
  Object.assign(request.defaults, config)
}

request.interceptors.response.use(
  (response, ...args) => builtInRequestConfig?.responseInterceptors?.onFulfilled!?.(response, ...args) ?? response,
  (err, ...args) => builtInRequestConfig?.responseInterceptors?.onRejected!?.(err, ...args) ?? Promise.reject(err),
)

export type ServerResponse<T = any> = {
  success: boolean
  data: T
  message: string
  code: string | number
  error?: Error
  response?: AxiosResponse<T>
}

export type BuiltInServerResponse<T, R> = T extends ServerResponse<any>
  ? T
  : R extends ServerResponse<any>
    ? ServerResponse<T>
    : T

export type ServerRequest<R extends Record<string, any> = ServerResponse> = {
  clone<NR extends Record<string, any> = R>(config?: Parameters<typeof cloneAxiosInstance>['1']): ServerRequest<NR>
  create<NR extends Record<string, any> = R>(...args: Parameters<typeof axios.create>): ServerRequest<NR>
  define<T extends DefineApiConfig<R>>(config: T): DefinedApi<R, T>
  coverable: typeof coverable
  setConfig(config: AxiosRequestConfig<any>): void
  <T = R>(config: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  <T = R>(url: string, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  request<T = R>(config: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  get<T = R>(url: string, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  delete<T = R>(url: string, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  head<T = R>(url: string, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  options<T = R>(url: string, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  post<T = R>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  put<T = R>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  patch<T = R>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  postForm<T = R>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  putForm<T = R>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
  patchForm<T = R>(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<BuiltInServerResponse<T, R>>
} & AxiosInstance

// const test: ServerRequest<{
//   msg?: string
// }> = {} as any

// const testApi = test.define({
//   url: '',
//   method: 'get',
//   handleParams: (value?: any) => value,
//   handleResponse: (value) => value,
// })

// testApi().then((res) => {})

export type DefineApiConfig<R extends Record<string, any> = ServerResponse> = Omit<AxiosRequestConfig, 'headers'> & {
  headers?: InternalAxiosRequestConfig['headers']
  handleParams?: (...args: any[]) => any
  handleResponse?: (response: R) => any
  overrideConfig?: (config: AxiosRequestConfig, params?: any) => AxiosRequestConfig | undefined
  requestInstance?: ServerRequest
}

type DeepOptional<T> = {
  [K in keyof T]?: T[K] extends object ? DeepOptional<T[K]> : T[K]
}

export type DefinedApi<
  R extends Record<string, any> = ServerResponse,
  T extends DefineApiConfig<any> = DefineApiConfig<R>,
> = ((
  ...params: T extends { handleParams: (...args: any) => any } ? Parameters<T['handleParams']> : any
) => T extends { handleResponse: (...args: any) => any }
  ? Promise<BuiltInServerResponse<R, R> & ReturnType<T['handleResponse']>>
  : Promise<BuiltInServerResponse<R, R>>) &
  Omit<DefineApiConfig, 'handleParams' | 'handleResponse'> & {
    handleParams: T extends { handleParams: (...args: any) => any }
      ? (...params: Parameters<T['handleParams']>) => DeepOptional<ReturnType<T['handleParams']>>
      : DefineApiConfig['handleParams']
    handleResponse: T extends { handleResponse: (...args: any) => any }
      ? T['handleResponse']
      : DefineApiConfig['handleResponse']
  } & {
    __isDefinedApi: true
    runApi: (
      ...params: T extends { handleParams: (...args: any) => any } ? Parameters<T['handleParams']> : any[]
    ) => T extends { handleResponse: (...args: any) => any }
      ? Promise<BuiltInServerResponse<R, R> & ReturnType<T['handleResponse']>>
      : Promise<BuiltInServerResponse<R, R>>
    override: <OT extends DefineApiConfig>(
      config: OT,
    ) => DefinedApi<
      R,
      Omit<OT & T, 'handleParams' | 'handleResponse'> & {
        handleParams: OT extends { handleParams: (...args: any) => any } ? OT['handleParams'] : T['handleParams']
        handleResponse: OT extends { handleResponse: (...args: any) => any }
          ? OT['handleResponse']
          : T['handleResponse']
      }
    >
  }

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
  tempConfig.requestInstance = request
  overrideConfig = tempConfig.runApi as any
  tempConfig.__rawConfig = tempConfig

  return Object.assign(overrideConfig, tempConfig) as DefinedApi
}

export function defineApi<T extends DefineApiConfig>({ ...config }: T) {
  const rawConfig = config as DefinedApi<ServerResponse, T>
  rawConfig.requestInstance = rawConfig.requestInstance ?? request
  // @ts-ignore
  rawConfig.__isDefinedApi = true
  // @ts-ignore
  rawConfig.runApi = runApi.bind(null, rawConfig)
  // @ts-ignore
  rawConfig.override = overrideApi.bind(null, rawConfig as any)
  config = rawConfig.runApi as any

  // @ts-ignore
  config.__rawConfig = rawConfig

  Object.assign(config, rawConfig)
  return config as DefinedApi<ServerResponse, T>
}

type DefinedApiConfig<T extends DefinedApi> =
  | ((
      ...params: T extends { handleParams: (...args: any) => any } ? Parameters<T['handleParams']> : any[]
    ) => T extends { handleResponse: (...args: any) => any }
      ?
          | (void | DeepPartialObject<ReturnType<T['handleResponse']>>)
          | Promise<void | DeepPartialObject<ReturnType<T['handleResponse']>>>
      : (void | Optional<ServerResponse<any>>) | Promise<void | Optional<ServerResponse<any>>>)
  | DeepPartialObject<T>

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

// type TT = {
//   url: <string></string>
//   method: string
//   handleParams: (params: any) => any
//   handleResponse: (
//     response: ServerResponse<any>,
//   ) => {
//     success: boolean
//     message: string
//     data: any
//     // code: string | number
//     // error?: Error | undefined
//     // response?: AxiosResponse<any> | undefined
//   }
// }

// type TTT = DefinedApi<TT>

// type FF = TT extends DefineApiConfig ? true : false
// type FFF = TTT extends DefinedApi ? true : false

// const getUserInfo = request.define({
//   url: '/user/info',
//   method: 'get',
//   handleParams(params: { id: any }) {},
//   handleResponse(resposne) {
//     return {
//       ...resposne,
//       test: 1,
//     }
//   },
// })
// const overrided = getUserInfo
//   .override({
//     url: '1',
//     // handleResponse(resposne) {
//     //   return {
//     //     aaa: 1,
//     //   }
//     // },
//   })({ id: 1 })
//   .then(res => {})
