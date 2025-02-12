import React, { useMemo } from 'react'
import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import { LoadingOutlined } from '@ant-design/icons'
import { run } from '@fexd/tools'

import useLocales from '../../locales'

import useRemoteOptions from '../type-select-box/useRemoteOptions'

export interface RemoteCheckboxProps extends CheckboxGroupProps {
  renderOption?: (option: any, index: number) => React.ReactNode
}

export default function RemoteCheckbox({ renderOption, ...props }: RemoteCheckboxProps) {
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

  if (renderOption) {
    return (
      <Checkbox.Group {...props} options={undefined}>
        {(options ?? []).map((option: any, index: number) => renderOption(option, index))}
      </Checkbox.Group>
    )
  }

  return <Checkbox.Group {...props} options={options!} />
}
