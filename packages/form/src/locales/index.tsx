/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect, useCallback, useState } from 'react'
import { useProContext } from '@fexd/pro-provider'
import { I18n } from '@fexd/tools'
import { globalI18n, reactI18nshell, createSharedHook } from '@fexd/pro-utils'

import zh_CN from './zh_CN'
import en_US from './en_US'
import id_ID from './id_ID'
import ms_MY from './ms_MY'
import th_TH from './th_TH'

// const zh_CN = provider_zh_CN?.table ?? {}
// const en_US = provider_en_US?.table ?? {}
// const id_ID = provider_id_ID?.table ?? {}

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

// window.I18n = I18n

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

const useLocales = createSharedHook(function useLocales() {
  const proContext = useProContext()
  const ctxLocaleKey = proContext?.localeKey ?? 'en_US'
  const [scopedLocaleKey, setScopedLocaleKey] = useState(ctxLocaleKey)
  const localeKey = scopedLocaleKey ?? ctxLocaleKey ?? 'en_US'

  const { scopeI18n, withI18n, useI18n, FormattedMessage, useTranslation } = useMemo(() => {
    const scopeI18n = new I18n({
      fallback: [scopeFallbackI18n, globalI18n],
      types: {
        default: { resources: builtInLocaleMap },
      },
    })

    scopeI18n.eventBus.on('change', (localeKey: string) => {
      setScopedLocaleKey(localeKey)
    })

    return {
      scopeI18n,
      ...reactI18nshell(scopeI18n),
    }
  }, [])

  const { t } = useTranslation()

  useEffect(() => {
    // console.log(proContext, localeKey)
    // Object.assign(window, { scopeI18n, globalI18n })
    if (ctxLocaleKey) {
      scopeI18n.applyLanguage(ctxLocaleKey)
    }
  }, [ctxLocaleKey])

  return {
    t,
    localeKey,
    scopeI18n,
    withI18n,
    useI18n,
    FormattedMessage,
    useTranslation,
  }
})

export default useLocales
