import React from 'react'
// @ts-ignore
import { useOutlet } from 'dumi'
import DemoProvider from 'dumi-theme-antd-style/dist/components/DemoProvider'

import '@fexd/pro-components/src/style.less'
import '@fexd/pro-form/src/style.less'
import '@fexd/pro-provider/src/style.less'
import '@fexd/pro-table/src/style.less'
import '@fexd/pro-utils/src/style.less'
import './customer.less'

export default () => {
  const outlet = useOutlet()

  return <DemoProvider>{outlet}</DemoProvider>
}
