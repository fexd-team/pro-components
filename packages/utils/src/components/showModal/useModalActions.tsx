import React from 'react'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { useDebounce, useSafeState, useMemoizedFn } from 'ahooks'
import { run, isPromiseLike, isFunction, isUndefined } from '@fexd/tools'

import { DraggableModalProps } from './DraggableModal'

import catchPromise from '../../utils/catchPromise'
import { useTranslation } from '../../i18n'
import { ActionProps, ButtonActionType } from '../Action'
import Actions from '../Actions'

export interface ActionModalProps
  extends Omit<DraggableModalProps, 'content' | 'okButtonProps' | 'cancelButtonProps' | 'actions'> {
  content?: any
  actions?: ActionProps[] | null
  okButtonProps?: ButtonActionType
  cancelButtonProps?: ButtonActionType
}

export default function useModalActions({ props = {}, closeModal, reverse = false, wrapperStyle }: any) {
  const { t } = useTranslation()
  const {
    onOk,
    onCancel,
    okText = t('utils.okText'),
    cancelText = t('utils.cancelText'),
    actions: propActions,
    closeIcon,
    // closable: propClosable = true,
    // maskClosable = true,
    // keyboard: keyboardClosable = true,
  } = props as ActionModalProps
  const [cancelLoading, setCancelLoading] = useSafeState(false)
  const debouncedCancelLoading = useDebounce(cancelLoading, {
    wait: 100,
  })

  const handleCancel = useMemoizedFn(() => {
    if (cancelLoading) {
      return false
    }
    const actionResult = run(onCancel)
    if (!isPromiseLike(actionResult)) {
      if (actionResult !== false) {
        run(closeModal)
      }
      return actionResult
    }

    return run(async () => {
      setCancelLoading(true)
      const [error, canClose] = await catchPromise(actionResult)
      setCancelLoading(false)

      if (error) {
        return Promise.reject(error)
      }

      if (canClose !== false) {
        run(closeModal)
      }
    })
  })

  // const closable = propClosable || maskClosable

  const builtInActions: ActionProps[] = [
    // (!closable || isFunction(onOk)) &&
    {
      type: 'primary',
      content: okText,
      onClick: onOk,
      ...(props?.okButtonProps ?? {}),
    },
    isFunction(onCancel) && { content: cancelText, onClick: handleCancel, ...(props?.cancelButtonProps ?? {}) },
  ].filter(Boolean)
  // console.log('builtInActions', builtInActions)
  const actions = (!isUndefined(propActions) ? propActions : builtInActions) as ActionProps[]

  return {
    closeIcon: closeIcon ?? (debouncedCancelLoading ? <LoadingOutlined /> : <CloseOutlined />),
    actionNodes:
      (actions?.length ?? 0) === 0 ? undefined : (
        <Actions
          disabled={cancelLoading}
          shareAutoLoading
          renderWrapper={(nodes) => <Space style={wrapperStyle}>{nodes}</Space>}
          configs={(reverse ? [...actions].reverse() : [...actions]).map((actionProps) => ({
            ...actionProps,
            onClick: async (...args: any[]) => {
              setCancelLoading(true)
              const [error, canClose] = await catchPromise(run(actionProps, 'onClick', ...args))
              setCancelLoading(false)

              if (error) {
                return Promise.reject(error)
              }

              if (canClose !== false) {
                run(closeModal)
              }
            },
          }))}
        />
      ),
    handleCancel,
  }
}
