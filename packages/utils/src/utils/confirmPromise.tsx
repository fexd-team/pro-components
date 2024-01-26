import { isValidElement } from 'react'
import { Modal, ModalFuncProps } from 'antd'
import { isObject, run, isPromiseLike } from '@fexd/tools'

import { t } from '../i18n'
import catchPromise from './catchPromise'

Object.assign(window, {
  confirmPromise,
})
// window.confirmPromise = confirmPromise

export default function confirmPromise(
  contentConfig: ModalFuncProps['content'] | ModalFuncProps,
  restConfig: ModalFuncProps = {},
) {
  let content = contentConfig
  let config: any = restConfig
  if (!isValidElement(contentConfig) && isObject(contentConfig)) {
    config = contentConfig
    content = null
  }

  const props = {
    content,
    ...config,
    ...restConfig,
  }

  const { onOk, onCancel } = props

  return new Promise<boolean>((resolve) => {
    const controller = Modal.confirm({
      okText: t('utils.okText'),
      cancelText: t('utils.cancelText'),
      ...props,
      onOk() {
        const result = run(onOk)
        if (!isPromiseLike(result)) {
          resolve(true)
          return
        }

        return run(async () => {
          controller.update({
            cancelButtonProps: {
              ...(props?.cancelButtonProps ?? {}),
              disabled: true,
            },
          })
          const [error, value] = await catchPromise(result)
          controller.update({
            cancelButtonProps: {
              ...(props?.cancelButtonProps ?? {}),
              disabled: false,
            },
          })

          if (error) {
            return Promise.reject(error)
          }

          if (value === false) {
            return Promise.reject('confirm.onOk return false')
          }

          resolve(true)
        })
      },
      onCancel() {
        const result = run(onCancel)
        if (!isPromiseLike(result)) {
          resolve(false)
          return
        }

        return run(async () => {
          controller.update({
            okButtonProps: {
              ...(props?.okButtonProps ?? {}),
              disabled: true,
            },
          })
          const [error, value] = await catchPromise(result)
          controller.update({
            okButtonProps: {
              ...(props?.okButtonProps ?? {}),
              disabled: false,
            },
          })

          if (error) {
            return Promise.reject(error)
          }

          if (value === false) {
            return Promise.reject('confirm.onCancel return false')
          }

          resolve(false)
        })
      },
    })
  })
}
