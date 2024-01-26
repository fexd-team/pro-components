import React from 'react'
import { Spin, Transfer, TransferProps as AntdTransferProps } from 'antd'

import useLocales from '../../locales'
import { ProFieldOptionType } from '../../types'
import useRemoteOptions from '../type-select-box/useRemoteOptions'

export interface TransferProps extends AntdTransferProps<any> {
  options?: ProFieldOptionType[]
}

export default function RemoteTransfer({ options: propOptions, ...props }: TransferProps) {
  const { loading, options } = useRemoteOptions(propOptions)
  const { t } = useLocales(({ t }) => [t])

  return (
    <Spin spinning={loading}>
      <Transfer
        showSearch
        render={(item: any) => item.label}
        targetKeys={(props as any)?.value}
        locale={{
          searchPlaceholder: t('form.searchHere'),
        }}
        {...props}
        dataSource={options.map((item: any) => ({
          ...item,
          key: item?.value,
          // title: item?.label,
          // description: item?.label,
        }))}
      />
    </Spin>
  )
}
