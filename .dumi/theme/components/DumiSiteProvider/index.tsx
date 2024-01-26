import { App } from 'antd'
import { StyleProvider } from 'antd-style'
import React, { PropsWithChildren } from 'react'

import { ThemeProvider, ThemeProviderProps } from './ThemeProvider'

export default ({ children, ...props }: ThemeProviderProps) => {
  return (
    <StyleProvider speedy={process.env.NODE_ENV === 'production'} prefix={'site'}>
      <ThemeProvider {...props}>
        <App>{children}</App>
      </ThemeProvider>
    </StyleProvider>
  )
}

export * from './ThemeProvider'
