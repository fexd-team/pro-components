import { CustomTokenParams, extractStaticStyle, StyleProvider, ThemeProvider as Provider } from 'antd-style'
import React, { ReactNode, useCallback } from 'react'

import { useThemeStore } from 'dumi-theme-antd-style/dist/store/useThemeStore'
import { createCustomToken, getAntdTheme, getCustomStylish } from 'dumi-theme-antd-style/dist/styles'
import { SiteConfigToken } from 'dumi-theme-antd-style/dist/types'

export interface ThemeProviderProps {
  [key: string]: any
  token?: Partial<SiteConfigToken>
  children?: ReactNode
  ssrInline?: boolean
  cache?: typeof extractStaticStyle.cache
}

export const ThemeProvider = ({ children, token, ssrInline, cache, ...props }: ThemeProviderProps) => {
  const themeMode = useThemeStore((s) => s.themeMode)

  // console.log('themeMode', themeMode)

  React.useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [themeMode])

  const getCustomToken = useCallback(
    (params: CustomTokenParams) => {
      const base = createCustomToken(params)

      if (token) {
        return { ...base, ...token }
      } else {
        return base
      }
    },
    [token],
  )

  return (
    <StyleProvider speedy={process.env.NODE_ENV === 'production'} prefix={'site'} cache={cache} ssrInline={ssrInline}>
      <Provider
        prefixCls={'site'}
        themeMode={themeMode}
        theme={getAntdTheme}
        customStylish={getCustomStylish}
        customToken={(...args) => {
          // console.log('token', { ...getCustomToken(...args), ...props })
          return { ...getCustomToken(...args), ...props }
        }}
      >
        {children}
      </Provider>
    </StyleProvider>
  )
}
