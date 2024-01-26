import React from 'react'
import { ProTable, ProTableProps } from '@fexd/pro-components'
import { Random } from 'mockjs'

// import { BuiltInValueTypeKeys } from '@fexd/pro-form/es/valueTypes'

import { getMockData } from './RuleDemos'

interface MockTableProps extends ProTableProps {
  mock?: boolean
  mockDataLength?: number
}

// const type: BuiltInValueTypeKeys = 'aaaa'

export default ({ mock = true, mockDataLength = 5, ...props }: MockTableProps) => (
  <ProTable
    pure
    size="small"
    pagination={false}
    bordered
    dataSource={!props?.dataSource && mock ? Array(mockDataLength).fill('').map(getMockData) : undefined}
    {...props}
  />
)
