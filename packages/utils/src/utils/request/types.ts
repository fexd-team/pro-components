/* eslint-disable @typescript-eslint/method-signature-style */
import axios, { AxiosRequestConfig as RawAxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import {
  AxiosCacheInstance as AxiosInstance,
  CacheAxiosResponse as AxiosResponse,
  CacheRequestConfig,
} from 'axios-cache-interceptor'
import type { CloneAxiosInstanceOptions } from './index'
import type { CoverableFn } from './defineApi'

export type AxiosRequestConfig<T = any> = RawAxiosRequestConfig<T> &
  CacheRequestConfig<T> & {
    /** 是否处理大数字（转为字符串） */
    bigIntJSONParsing?: boolean
    /** 自定义数字解析器，默认使用 isBigNumber 判断 */
    bigIntNumberParser?: (key: string | number | undefined, str: string) => any
  }

export type ServerResponse<T = any> = {
  success: boolean
  data: T
  message: string
  code: string | number
  error?: Error
  response?: AxiosResponse<T>
}

export type BuiltInServerResponse<T, R> =
  T extends ServerResponse<any> ? T : R extends ServerResponse<any> ? ServerResponse<T> : T

export type ServerRequest<R extends Record<string, any> = ServerResponse> = {
  clone<NR extends Record<string, any> = R>(config?: CloneAxiosInstanceOptions): ServerRequest<NR>
  create<NR extends Record<string, any> = R>(...args: Parameters<typeof axios.create>): ServerRequest<NR>
  define<T extends DefineApiConfig<R>>(config: T): DefinedApi<R, T>
  coverable: CoverableFn
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
    runWithConfig: (apiConfig: DefineApiConfig, ...restArgs: any[]) => Promise<R>
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
