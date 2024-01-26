import React, { useState, forwardRef } from 'react'
import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd'
import { useDebounce } from 'ahooks'
import { run } from '@fexd/tools'
import hoistStatics from 'hoist-non-react-statics'

import useAutoLoading from '../hooks/useAutoLoading'

export interface SwitchProps extends AntdSwitchProps {
  debouncedAutoLoading?: boolean
}

const Switch: React.FC<SwitchProps> = hoistStatics(
  forwardRef(function Switch({ debouncedAutoLoading, ...props }, ref: any) {
    const {
      onAction,
      loading: debouncedLoading,
      realTimeLoading,
    } = useAutoLoading({
      loading: props?.loading,
      action: props?.onChange,
    })

    const loading = debouncedAutoLoading ? debouncedLoading : realTimeLoading

    return <AntdSwitch ref={ref} {...props} loading={loading} onChange={onAction} />
  }),
  AntdSwitch,
)

Switch.defaultProps = {
  debouncedAutoLoading: true,
}

export default Switch
