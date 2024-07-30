import React, { useMemo } from 'react'
import { Radio, RadioGroupProps } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { run } from '@fexd/tools'

import useLocales from '../../locales'
import useRemoteOptions from '../type-select-box/useRemoteOptions'

export default function RemoteRadio(props: RadioGroupProps) {
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

  // console.log(props)

  // const RadioNode = (props as any)?.isButton ? Radio.Button : Radio

  return (
    <Radio.Group {...props} options={options!}>
      {/* {(options ?? []).map((option: any) => (
        <RadioNode key={option?.value} value={option?.value}>
          {option?.label}
        </RadioNode>
      ))} */}
    </Radio.Group>
  )
}
