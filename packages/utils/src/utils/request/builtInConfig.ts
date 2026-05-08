/* eslint-disable @typescript-eslint/no-unused-expressions */
import { qs, isString, isObject, isArray, isBigNumber, expandScientificNumberString } from '@fexd/tools'
import { AxiosRequestHeaders, AxiosError } from 'axios'
import type { AxiosRequestTransformer } from 'axios'
import { parse as parseJSON } from 'json-custom-numbers'
import type { ServerRequest } from './types'

export const defaultBigIntNumberParser = (_key: string | number | undefined, str: string): string | number => {
  if (isBigNumber(str)) return expandScientificNumberString(str)
  return Number(str)
}

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
    }) as Parameters<ServerRequest['interceptors']['response']['use']>['0'],
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
    }) as Parameters<ServerRequest['interceptors']['response']['use']>['1'],
  },
  transformRequest: function transformRequest(params, headers = {} as AxiosRequestHeaders) {
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
  } as AxiosRequestTransformer,
  transformResponse: function transformResponse(data) {
    const self = this as any
    const transitional = self.transitional || {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    }
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing
    const JSONRequested = self.responseType === 'json'

    if (data && isString(data) && ((forcedJSONParsing && !self.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing
      const strictJSONParsing = !silentJSONParsing && JSONRequested

      try {
        if (self.bigIntJSONParsing) {
          const numberParser = self.bigIntNumberParser ?? defaultBigIntNumberParser
          return parseJSON(data, undefined, numberParser)
        }
        return JSON.parse(data)
      } catch (e: any) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, self, null, self.response)
          }
          throw e
        }
      }
    }

    return data
  },
}
