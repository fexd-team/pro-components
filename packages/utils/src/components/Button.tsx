import React, { forwardRef, useMemo } from 'react'
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd'
import hoistStatics from 'hoist-non-react-statics'

import useAutoLoading from '../hooks/useAutoLoading'

export interface ButtonProps extends Omit<AntdButtonProps, 'content'> {
  debouncedAutoLoading?: boolean
}

const Button: React.FC<ButtonProps> = hoistStatics(
  forwardRef(function Button({ debouncedAutoLoading, ...props }: ButtonProps, ref: any) {
    const {
      onAction,
      loading: debouncedLoading,
      realTimeLoading,
    } = useAutoLoading({
      loading: props?.loading,
      action: props?.onClick,
    })

    const loading = debouncedAutoLoading ? debouncedLoading : realTimeLoading

    return (
      <AntdButton
        ref={ref}
        {...props}
        disabled={loading ? undefined : props?.disabled}
        loading={loading}
        onClick={onAction}
      />
    )
  }),
  AntdButton,
)

Button.defaultProps = {
  debouncedAutoLoading: true,
}

export default Button
