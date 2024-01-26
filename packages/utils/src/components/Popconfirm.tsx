import React, { forwardRef } from 'react'
import { Popconfirm as AntdPopconfirm, PopconfirmProps as AntdPopconfirmProps } from 'antd'
import hoistStatics from 'hoist-non-react-statics'

import useAutoLoading from '../hooks/useAutoLoading'

export interface PopconfirmProps extends AntdPopconfirmProps {
  debouncedAutoLoading?: boolean
}

const Popconfirm: React.FC<PopconfirmProps> = hoistStatics(
  forwardRef(function Popconfirm({ debouncedAutoLoading, ...props }: PopconfirmProps, ref: any) {
    const {
      onAction,
      loading: debouncedLoading,
      realTimeLoading,
    } = useAutoLoading({
      loading: props?.okButtonProps?.loading,
      action: props?.onConfirm,
    })

    const loading = debouncedAutoLoading ? debouncedLoading : realTimeLoading

    return (
      <AntdPopconfirm
        ref={ref}
        arrowPointAtCenter
        {...props}
        okButtonProps={{
          ...props?.okButtonProps,
          loading,
        }}
        onConfirm={onAction}
      />
    )
  }),
  AntdPopconfirm,
)

Popconfirm.defaultProps = {
  debouncedAutoLoading: true,
}

export default Popconfirm
