import React from 'react'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { useDebounce, useSafeState, useMemoizedFn } from 'ahooks'
import { run, isPromiseLike, isFunction, isUndefined } from '@fexd/tools'

import { DraggableModalProps } from './DraggableModal'

import catchPromise from '../../utils/catchPromise'
import { useTranslation } from '../../i18n'
import Action, { ActionProps, ButtonActionType } from '../Action'

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
  const [actionLoading, setActionLoading] = useSafeState(false)
  const [loadingActionIdx, setLoadingActionIdx] = useSafeState<any>(undefined)
  const debouncedCancelLoading = useDebounce(cancelLoading, {
    wait: 100,
  })
  const debouncedActionLoading = useDebounce(actionLoading, {
    wait: 160,
  })

  // const closable = propClosable || maskClosable

  const builtInAction: ActionProps[] = [
    // (!closable || isFunction(onOk)) &&
    {
      type: 'primary',
      content: okText,
      onClick: onOk,
      ...(props?.okButtonProps ?? {}),
    },
    isFunction(onCancel) && { content: cancelText, onClick: onCancel, ...(props?.cancelButtonProps ?? {}) },
  ].filter(Boolean)
  // console.log('builtInAction', builtInAction)
  const actions = (!isUndefined(propActions) ? propActions : builtInAction) as ActionProps[]

  return {
    closeIcon: closeIcon ?? (debouncedCancelLoading ? <LoadingOutlined /> : <CloseOutlined />),
    actionNodes:
      (actions?.length ?? 0) === 0 ? undefined : (
        <Space style={wrapperStyle}>
          {run<ActionProps[]>([...actions], reverse ? 'reverse' : undefined)?.map(
            (actionProps: ActionProps, idx: number) => (
              <Action
                key={idx}
                {...actionProps}
                disabled={debouncedActionLoading && loadingActionIdx !== idx ? true : actionProps?.disabled}
                onClick={async (...args: any[]) => {
                  setLoadingActionIdx(idx)
                  setActionLoading(true)
                  const [error, canClose] = await catchPromise(run(actionProps, 'onClick', ...args))
                  setActionLoading(false)
                  setLoadingActionIdx(undefined)

                  if (error) {
                    return Promise.reject(error)
                  }

                  if (canClose !== false) {
                    run(closeModal)
                  }
                }}
              />
            ),
          )}
        </Space>
      ),
    handleCancel: useMemoizedFn(() => {
      if (actionLoading || cancelLoading) {
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
        setActionLoading(true)
        setCancelLoading(true)
        const [error, canClose] = await catchPromise(actionResult)
        setActionLoading(false)
        setCancelLoading(false)

        if (error) {
          return Promise.reject(error)
        }

        if (canClose !== false) {
          run(closeModal)
        }
      })
    }),
  }
}
