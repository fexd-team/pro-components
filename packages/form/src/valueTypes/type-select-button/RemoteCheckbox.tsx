import React from 'react'
import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import { LoadingOutlined } from '@ant-design/icons'

import useRemoteOptions from '../type-select-box/useRemoteOptions'

export default function RemoteCheckbox(props: CheckboxGroupProps) {
  const { loading, options } = useRemoteOptions(props?.options)

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
