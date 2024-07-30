import React, { useMemo } from 'react'
import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import { LoadingOutlined } from '@ant-design/icons'
import { run } from '@fexd/tools'

import useLocales from '../../locales'

import useRemoteOptions from '../type-select-box/useRemoteOptions'

export default function RemoteCheckbox(props: CheckboxGroupProps) {
  const { loading, options: rawOptions } = useRemoteOptions(props?.options)

  const { t } = useLocales(({ t }) => [t])

  const options = useMemo(
    () =>
      rawOptions
        ?.map((option: any) => ({
          ...option,
          label: run(option?.getLabel, undefined) ?? option?.label,
        }))
        .filter((option) => !option?.readonly),
    [rawOptions, t],
  )

  if (loading) {
    return <LoadingOutlined />
  }

  return (
    <Checkbox.Group {...props} options={options!}>
      {(options ?? []).map((option: any) => (
        <Checkbox key={option?.value} value={option?.value}>
          {option?.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  )
}
