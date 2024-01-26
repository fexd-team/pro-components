import React from 'react'
import { TreeSelect, TreeSelectProps as AntdTreeSelectProps } from 'antd'

import useLocales from '../../locales'
import { ProFieldOptionType } from '../../types'
import useRemoteOptions from './useRemoteOptions'

export interface TreeSelectProps extends AntdTreeSelectProps<any> {
  options?: ProFieldOptionType[]
}

const adaptTreeSelectItem = (options: any[]) =>
  options.map((item: any) => ({
    key: item?.value,
    id: item?.key ?? item?.value,
    title: item?.label,
    ...item,
    ...(item?.children
      ? {
          children: (adaptTreeSelectItem as any)(item.children),
        }
      : {}),
  }))

export default function RemoteTreeSelect({ options: propOptions, ...props }: TreeSelectProps) {
  const { loading, options } = useRemoteOptions(propOptions)
  const { t } = useLocales(({ t }) => [t])

  return (
    <TreeSelect
      placeholder={t('form.pleaseSelect')}
      loading={loading}
      showSearch
      showArrow
      allowClear
      treeData={adaptTreeSelectItem(options)}
      {...props}
    />
  )
}
