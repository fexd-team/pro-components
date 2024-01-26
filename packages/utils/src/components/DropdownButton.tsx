import React, { forwardRef, cloneElement } from 'react'
import { pick, delay } from '@fexd/tools'
import { Dropdown } from 'antd'
import { DropdownButtonProps as AntdDropdownButtonProps } from 'antd/es/dropdown/dropdown-button'
import hoistStatics from 'hoist-non-react-statics'
import { ButtonProps } from './Button'
import useAutoLoading from '../hooks/useAutoLoading'

export interface DropdownButtonProps extends Omit<AntdDropdownButtonProps, 'onClick'> {
  menuIcon?: ButtonProps['icon']
}
export interface DropdownButtonProps extends ButtonProps {}

const DropdownButton: React.FC<DropdownButtonProps> = hoistStatics(
  forwardRef(function DropdownButton({ debouncedAutoLoading, ...props }: DropdownButtonProps, ref: any) {
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
      <Dropdown.Button
        // @ts-ignore
        ref={ref}
        {...props}
        icon={props?.menuIcon}
        loading={loading}
        onClick={onAction}
        buttonsRender={([buttonNode, dropdownNode]: any) => [
          cloneElement(buttonNode, {
            ...props,
            ...buttonNode?.props,
          }),
          cloneElement(dropdownNode, {
            ...dropdownNode?.props,
            ...pick(props, ['type', 'danger']),
          }),
        ]}
      />
    )
  }),
  Dropdown.Button,
)

DropdownButton.defaultProps = {
  debouncedAutoLoading: true,
  overlay: <></>,
}

export default DropdownButton
