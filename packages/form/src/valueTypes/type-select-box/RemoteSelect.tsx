/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, isValidElement } from 'react'
import { Select, SelectProps as AntdSelectProps, Input } from 'antd'
import { run } from '@fexd/tools'
import { FormattedMessage } from '@fexd/pro-utils'

import useRemoteOptions from './useRemoteOptions'
import useLocales from '../../locales'

export default function RemoteSelect(props: AntdSelectProps<any>) {
  const { loading, options: rawOptions } = useRemoteOptions(props?.options)
  const { t } = useLocales(({ t }) => [t])

  const options = useMemo(
    () =>
      rawOptions?.map((option: any) => ({
        ...option,
        label: run(option?.getLabel, undefined) ?? option?.label,
      })),
    [rawOptions, t],
  )

  return (
    <Select placeholder={t('form.pleaseSelect')} {...props} options={options!} loading={loading}>
      {(options ?? []).map((option: any) => (
        <Select.Option key={option?.value} value={option?.value}>
          {run(option?.getLabel, undefined) ?? option?.label}
        </Select.Option>
      ))}
    </Select>
  )
}
