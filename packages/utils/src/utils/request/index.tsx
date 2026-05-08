/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios, { CreateAxiosDefaults } from 'axios'
import { setupCache, AxiosCacheInstance, CacheOptions } from 'axios-cache-interceptor'

import { builtInRequestConfig } from './builtInConfig'
import { defaultCacheOptions, getCacheRequestInterceptor } from './cache'
import { defineApi, coverable, _setRequestInstance } from './defineApi'
import type { ServerResponse, ServerRequest } from './types'

export type CloneAxiosInstanceOptions = {
  keepInterceptors?: boolean
  cloneOptions?: CreateAxiosDefaults
  cacheSetupOptions?: CacheOptions
}

const rawRequest = axios.create({
  timeout: 60 * 1000,
  // @ts-ignore bigIntJSONParsing 是自定义配置项
  bigIntJSONParsing: true,
  transformRequest: [
    function transformRequest(...args: any[]) {
      // @ts-ignore
      return builtInRequestConfig?.transformRequest?.apply?.(this, args)
    },
  ],
  transformResponse: [
    function transformResponse(...args: any[]) {
      // @ts-ignore
      return builtInRequestConfig?.transformResponse?.apply?.(this, args)
    },
  ],
})

const request = setupCache(rawRequest, {
  requestInterceptor: getCacheRequestInterceptor(rawRequest as AxiosCacheInstance),
  ...defaultCacheOptions,
}) as ServerRequest

export default request

_setRequestInstance(request)

export const cloneAxiosInstance = <NR extends Record<string, any> = ServerResponse>(
  request: ServerRequest<NR>,
  {
    keepInterceptors = true,
    cloneOptions = {},
    cacheSetupOptions = defaultCacheOptions,
  }: CloneAxiosInstanceOptions = {},
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

export * from './types'
export * from './builtInConfig'
export * from './cache'
export { defineApi, coverable } from './defineApi'
