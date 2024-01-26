import React from 'react'
import { Radio, RadioGroupProps } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import useRemoteOptions from '../type-select-box/useRemoteOptions'

export default function RemoteRadio(props: RadioGroupProps) {
  const { loading, options } = useRemoteOptions(props?.options)

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
