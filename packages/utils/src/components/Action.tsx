/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { isValidElement, memo, useState, useMemo, ReactNode, useContext, Fragment } from 'react'
import { run, isString, isObject, isArray, isExist } from '@fexd/tools'
import { useControllableValue } from 'ahooks'
import { EllipsisOutlined } from '@ant-design/icons'
import { TooltipProps, Menu, MenuProps, Dropdown, MenuItemProps, ModalFuncProps } from 'antd'

import { confirmPromise } from '../utils'
import { useTranslation } from '../i18n'
import DropdownButton, { DropdownButtonProps } from './DropdownButton'
import Button, { ButtonProps } from './Button'
import Switch, { SwitchProps } from './Switch'
import Popconfirm, { PopconfirmProps } from './Popconfirm'
import Tooltip, { TooltipConfig } from './Tooltip'
import Hook from './Hook'
import useAutoLoading from '../hooks/useAutoLoading'

export type ConfirmConfig = string | PopconfirmProps

export interface ActionMenuItemProps extends Omit<MenuItemProps, 'content'> {
  key?: any
  label?: React.ReactNode
  content?: React.ReactNode
  tooltip?: TooltipConfig
  extraTooltipProps?: Omit<TooltipProps, 'title' | 'overlay'>
  confirm?: string | ModalFuncProps
  disabled?: boolean
}

export interface ButtonActionType extends Omit<ButtonProps, 'children' | 'content'> {
  actionType?: 'button'
  content?: ButtonProps['children']
  children?: ButtonProps['children']
  confirm?: ConfirmConfig
  tooltip?: TooltipConfig
  extraConfirmProps?: Omit<PopconfirmProps, 'title'>
  extraTooltipProps?: Omit<TooltipProps, 'title' | 'overlay'>
  menu?: ActionMenuItemProps[] | MenuProps['children']
  menuIcon?: ButtonProps['icon']
  menuProps?: MenuProps
  dropdownProps?: Omit<DropdownButtonProps, 'overlay'>
  onMenuClick?: MenuProps['onClick']
}
export interface SwitchActionType extends SwitchProps {
  actionType?: 'switch'
  content?: any
  children?: any
  confirm?: ConfirmConfig
  tooltip?: TooltipConfig
  extraConfirmProps?: Omit<PopconfirmProps, 'title'>
  extraTooltipProps?: Omit<TooltipProps, 'title' | 'overlay'>
}

export type ActionProps = ButtonActionType | SwitchActionType

const renderAction = ({ actionType = 'button', content: contentConfig, ...actionProps }: ActionProps = {}) => {
  let content = contentConfig
  if (actionType === 'switch') {
    const { onClick, onChange, ...restProps } = (actionProps ?? {}) as SwitchActionType
    delete actionProps.onClick
    delete actionProps.onChange

    const changeHandler = onClick ?? onChange

    return (
      <Switch
        {...restProps}
        onChange={
          changeHandler
            ? (...args: any[]) => run(changeHandler, undefined, ...args) as SwitchActionType['onChange']
            : undefined
        }
      />
    )
  }

  if (actionType === 'button') {
    delete (actionProps as any).checked
    const { menuProps = {}, dropdownProps, onMenuClick, menu, ...restActionProps } = actionProps as ButtonActionType

    if (isArray(menu) && menu?.filter(Boolean)?.length > 0) {
      const hasContent = !!content
      const Element = hasContent ? DropdownButton : Dropdown
      content = hasContent ? content : <Button icon={<EllipsisOutlined />} {...restActionProps} />

      return (
        <Element
          {...restActionProps}
          {...dropdownProps}
          {...(hasContent ? {} : { onClick: undefined })}
          overlay={
            <Menu {...menuProps} onClick={onMenuClick}>
              {menu
                .map((menuConfig: any, idx: number) => {
                  if (isValidElement(menuConfig)) {
                    return <Fragment key={idx}>{menuConfig}</Fragment>
                  }

                  if (isObject(menuConfig)) {
                    const {
                      label,
                      content = label,
                      onClick,
                      tooltip,
                      confirm,
                      // extraConfirmProps = {},
                      extraTooltipProps = {},
                      ...props
                    } = menuConfig as ActionMenuItemProps

                    // console.log('menuConfig', menuConfig)

                    let menuNode = (
                      <Menu.Item
                        key={(props as any)?.key ?? String(content)}
                        {...props}
                        onClick={async () => {
                          if (confirm) {
                            confirmPromise(confirm, {
                              onOk: onClick,
                            })

                            return
                          }
                          await run(onClick)
                        }}
                      >
                        {content}
                      </Menu.Item>
                    )

                    if (isExist(tooltip)) {
                      if (!!props?.disabled) {
                        menuNode = <span>{menuNode}</span>
                      }
                      return (
                        <Tooltip
                          key={(props as any)?.key ?? idx}
                          config={tooltip}
                          overlayStyle={{ pointerEvents: 'none' }}
                          {...extraTooltipProps}
                        >
                          {menuNode}
                        </Tooltip>
                      )
                    }

                    return menuNode
                  }

                  return null
                  // return menuConfig
                })
                .filter(Boolean)}
            </Menu>
          }
        >
          {content}
        </Element>
      )
    }

    return <Button {...restActionProps}>{content}</Button>
  }

  return null
}

export const Action: React.FC<ActionProps> = memo(function Action(props: ActionProps) {
  const {
    children,
    content = children,
    confirm,
    onClick,
    tooltip,
    extraConfirmProps,
    extraTooltipProps,
    ...actionProps
  } = props

  if (!!confirm) {
    return (
      <Hook>
        {() => {
          const { t } = useTranslation()
          // 用来解决 tooltip 和 popconfirm 同时显示的位置冲突问题
          const [showTooltip, setTooltipShow] = useState(true)
          const {
            onAction,
            loading: debouncedLoading,
            realTimeLoading,
          } = useAutoLoading({
            loading: props?.loading,
            action: onClick,
          })

          const loading = actionProps?.debouncedAutoLoading ? debouncedLoading : realTimeLoading

          // 内部 Switch checked 状态受控，主要用来控制 Switch + Popupconfirm 的场景
          const [checked, setChecked] = useControllableValue(actionProps, {
            valuePropName: 'checked',
            defaultValuePropName: 'defaultChecked',
            defaultValue: false,
            trigger: undefined,
          })

          const confirmProps = useMemo(() => {
            if (isString(confirm) || isValidElement(confirm)) {
              return { title: confirm }
            }

            return { ...confirm }
          }, [confirm])

          let actionNode = renderAction({ content, checked, loading, ...actionProps } as any)
          if (isExist(tooltip)) {
            actionNode = (
              <Tooltip config={tooltip} visible={showTooltip ? undefined : false} {...extraTooltipProps}>
                {actionNode}
              </Tooltip>
            )
          }

          return (
            <Popconfirm
              disabled={actionProps?.disabled}
              onVisibleChange={(visible) => setTooltipShow(!visible)}
              destroyTooltipOnHide
              okText={t('utils.okText')}
              cancelText={t('utils.cancelText')}
              {...extraConfirmProps}
              {...confirmProps}
              onConfirm={async () => {
                run(onAction)
                setChecked(!checked)
              }}
            >
              {actionNode}
            </Popconfirm>
          )
        }}
      </Hook>
    )
  }

  let actionNode = renderAction({ content, onClick, ...actionProps } as any)
  if (isExist(tooltip)) {
    actionNode = (
      <Tooltip config={tooltip} {...extraTooltipProps}>
        {actionNode}
      </Tooltip>
    )
  }

  return actionNode
})

Action.defaultProps = {
  debouncedAutoLoading: true,
  extraConfirmProps: {},
  extraTooltipProps: {},
}

export default Action
