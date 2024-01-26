/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'

import { createPlugin } from '../../utils'
import useLocales from './useLocales'
import useSizeControl from './useSizeControl'

export const useConfigPlugin = createPlugin(() => {
  const [size, setSize] = useSizeControl()
  const locales = useLocales()

  return useMemo(
    () => ({
      ...locales,
      setSize,
      size,
    }),
    [size, ...Object.values(locales)],
  )
}, 'config')

export default useConfigPlugin

export function I18nText({ text, args = [], config }: { text: string; args?: any[]; config?: any }) {
  const { t } = useConfigPlugin(({ getTranslatedText, i18nT }) => [getTranslatedText, i18nT])
  return <span>{t(text, config, ...args)}</span>
}
