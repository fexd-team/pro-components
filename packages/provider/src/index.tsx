import React, { createContext, useContext } from 'react'
import { ConfigProvider as AntdConfigProvider } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { ConfigProviderProps as AntdConfigProviderProps } from 'antd/es/config-provider'
import { pickBy, isExist, __ } from '@fexd/tools'

import zh_CN from './locales/zh_CN'
import en_US from './locales/en_US'
import id_ID from './locales/id_ID'
import ms_MY from './locales/ms_MY'
import th_TH from './locales/th_TH'

const builtInLocaleMap = {
  zh_CN,
  en_US,
  id_ID,
  ms_MY,
  th_TH,
  'zh-CN': zh_CN,
  'en-US': en_US,
  'id-ID': id_ID,
  'ms-MY': ms_MY,
  'th-TH': th_TH,
}

export const ProConfigContext = createContext<ProContextType>({})
export function useProContext() {
  return useContext(ProConfigContext)
}

export function useContextSize() {
  const antdContextSize = useContext(AntdConfigProvider.SizeContext)
  const proContext = useProContext()
  const contextSize = antdContextSize ?? proContext?.size

  return contextSize
}

const omitEmptyValue = __(pickBy)(__, isExist)

export function ConfigProvider({
  localeKey: propLocaleKey = 'en_US',
  locale: propLocale = {},
  size: propSize,
  numberLocale,
  currencyLocale,
  children,
  parentContextFirst = false,
}: ConfigProviderProps) {
  const contextSize = useContext(AntdConfigProvider.SizeContext)
  const parentProContext = useProContext() ?? {}
  const localeKey = (parentContextFirst ? parentProContext?.localeKey : undefined) ?? propLocaleKey
  const locale = (parentContextFirst ? parentProContext?.locale : undefined) ?? propLocale
  const size = (parentContextFirst ? parentProContext?.size : undefined) ?? propSize ?? contextSize

  const mergedLocale = {
    ...(builtInLocaleMap?.[localeKey as 'en_US'] ?? {}),
    ...locale,
  }

  const ctxValue = omitEmptyValue({
    size,
    locale: mergedLocale,
    localeKey,
    numberLocale,
    currencyLocale,
    ...omitEmptyValue(parentContextFirst ? parentProContext : {}),
  })

  return (
    <AntdConfigProvider componentSize={size} locale={mergedLocale?.antdLocale}>
      <ProConfigContext.Provider value={ctxValue}>{children}</ProConfigContext.Provider>
    </AntdConfigProvider>
  )
}

export default ConfigProvider

export type ProLocaleValue = string | React.ReactNode | ((...args: any[]) => string | React.ReactNode)

// https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
export type NumberLocaleValue = 'zh' | 'id' | 'en' | 'ms' | Omit<string, 'zh' | 'id' | 'en' | 'ms'>
export interface NumberLocaleConfig extends Intl.NumberFormatOptions {
  [key: string]: any
  toFixed?: number
  locale?: NumberLocaleValue
  style?: 'decimal' | 'currency' | 'percent' | 'unit' // Intl.NumberFormatOptions['style']
}

export interface ProContextType {
  size?: SizeType
  /** 参考文档：https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry */
  localeKey?:
    | 'zh-CN'
    | 'zh_CN'
    | 'en-US'
    | 'en_US'
    | 'id-ID'
    | 'id_ID'
    | 'ms_MY'
    | 'ms-MY'
    | 'th-TH'
    | 'th_TH'
    | Omit<string, 'zh-CN' | 'zh_CN' | 'en-US' | 'en_US' | 'id-ID' | 'id_ID' | 'ms-MY' | 'ms_MY' | 'th_TH' | 'th-TH'>
  locale?: {
    antdLocale?: AntdConfigProviderProps['locale']
    table?: {
      actions?: {
        multipleDeleteConfirm?: ProLocaleValue
        multipleDelete?: ProLocaleValue
        deleteConfirm?: ProLocaleValue
        delete?: ProLocaleValue
        refreshTip?: ProLocaleValue
      }
      editField?: {
        add?: ProLocaleValue
        details?: ProLocaleValue
        edit?: ProLocaleValue
        saveTips?: ProLocaleValue
      }
      queryField?: {
        query?: ProLocaleValue
        reset?: ProLocaleValue
        fold?: ProLocaleValue
        more?: ProLocaleValue
      }
      modal?: {
        confirm?: ProLocaleValue
        okText?: ProLocaleValue
        cancelText?: ProLocaleValue
      }
      table?: {
        selectionTips?: ProLocaleValue
        deselect?: ProLocaleValue
        inverse?: ProLocaleValue
        action?: ProLocaleValue
        totalDataCount?: ProLocaleValue
        edit?: ProLocaleValue
        save?: ProLocaleValue
        cancel?: ProLocaleValue
        cancelConfirm?: ProLocaleValue
        density?: ProLocaleValue
        densityLarger?: ProLocaleValue
        densityMiddle?: ProLocaleValue
        densitySmall?: ProLocaleValue
        index?: ProLocaleValue
      }
      valueType?: {
        inputPassword?: ProLocaleValue
        inputContent?: ProLocaleValue
        chooseContent?: ProLocaleValue
        startTime?: ProLocaleValue
        endTime?: ProLocaleValue
      }
    }
  }
  /** 参考文档：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat */
  numberLocale?: NumberLocaleValue | NumberLocaleConfig
  /** 参考文档：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat */
  currencyLocale?: NumberLocaleValue | NumberLocaleConfig
}

export interface ConfigProviderProps extends ProContextType {
  children?: React.ReactNode
  parentContextFirst?: boolean
}
