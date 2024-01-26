/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { run, I18n } from '@fexd/tools'
import { reactI18nshell, globalI18n } from '@fexd/pro-utils'
import { useProContext } from '@fexd/pro-provider'

import { useProps } from '../../utils'
import zh_CN from '../../locales/zh_CN'
import en_US from '../../locales/en_US'
import id_ID from '../../locales/id_ID'
import ms_MY from '../../locales/ms_MY'
import th_TH from '../../locales/th_TH'

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

const scopeFallbackI18n = new I18n({
  types: {
    default: {
      resources: builtInLocaleMap,
    },
  },
})

scopeFallbackI18n.applyLanguage('en_US')
scopeFallbackI18n.applyLanguage = () => Promise.resolve()

globalI18n.applyConfig({
  types: {
    default: {
      resources: builtInLocaleMap,
    },
    jsx: {
      resources: builtInLocaleMap,
    },
  },
})

export default function useLocales() {
  const { localeKey, locale } = useProps()
  const proContext = useProContext()
  const providerLocale = proContext?.locale?.table ?? {}

  const { scopeI18n, withI18n, useI18n, FormattedMessage, useTranslation } = useMemo(() => {
    const scopeI18n = new I18n({
      fallback: [scopeFallbackI18n, globalI18n],
      types: {
        default: { resources: builtInLocaleMap },
      },
    })

    return {
      scopeI18n,
      ...reactI18nshell(scopeI18n),
    }
  }, [])

  const { t: i18nT } = useTranslation()

  useEffect(() => {
    if (localeKey) {
      scopeI18n.applyLanguage(localeKey)
    }
  }, [localeKey])

  const getTranslatedText = useCallback(
    (text: string, ...args: any[]) => {
      if (text === 'actions.multipleDeleteConfirm' || text === 'table.selectionTips') {
        args[0] = args[0]?.count
      }
      if (text === 'table.totalDataCount') {
        args[0] = args[0]?.total
      }

      return run<string>(locale, text, ...args) ?? run<string>(providerLocale, text, ...args)
    },
    [localeKey, locale, proContext?.locale?.table, providerLocale],
  )

  const t = useMemoizedFn((text: string = '', ...args: any[]) => {
    return getTranslatedText(text, ...args) ?? i18nT(text, ...args)
  })

  return {
    getTranslatedText,
    t,
    localeKey,
    scopeI18n,
    i18nT,
    withI18n,
    useI18n,
    FormattedMessage,
    useTranslation,
  }
}
