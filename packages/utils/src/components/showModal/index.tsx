import React, { ReactNode, useRef } from 'react'
import { useSetState, useSafeState } from 'ahooks'
import { run, classnames, isUndefined } from '@fexd/tools'
import { Optional } from 'utility-types'

import showDrawer, { ShowDrawerConfig, DrawerInternalControllerType, DrawerProps } from '../showDrawer'
import DraggableModal, { DraggableModalProps } from './DraggableModal'
import { modalControllers, ModalControllerType } from './controller'
import { stationMap } from './ModalStation'
import useModalActions, { ActionModalProps } from './useModalActions'

interface ModalInternalControllerType {
  initialProps: VisibleModalProps
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  updateProps: React.Dispatch<React.SetStateAction<Optional<VisibleModalProps>>>
  state: Record<string, any>
  setState: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

interface VisibleModalProps extends Omit<ActionModalProps, 'content'> {
  content?: any
  footer?:
    | ActionModalProps['footer']
    | ((modalInternalController: ModalInternalControllerType) => ActionModalProps['footer'])
  children?:
    | ActionModalProps['children']
    | ((modalInternalController: ModalInternalControllerType) => ActionModalProps['children'])
}

const VisibleModal = React.forwardRef(function VisibleModal(initialProps: VisibleModalProps, ref: any) {
  const initialPropsRef = useRef(initialProps)
  const [currentProps, updateProps] = useSetState(initialProps)
  const { footer: propFooter, content, children = content as any, ...props } = currentProps
  const [state, setState] = useSetState<Record<string, any>>({})
  const [visible, setVisible] = useSafeState(true)

  const { actionNodes, handleCancel, closeIcon } = useModalActions({
    props: currentProps,
    closeModal: () => setVisible(false),
    reverse: true,
  })

  const modalProps = {
    initialProps: initialPropsRef.current,
    visible,
    setVisible,
    updateProps: (props: any = {}) =>
      updateProps((currentProps) => ({
        ...currentProps,
        ...props,
        children: props?.children ?? props?.content ?? currentProps?.children ?? currentProps?.content,
      })),
    state,
    setState,
  }

  React.useImperativeHandle(ref, () => modalProps)

  return (
    <DraggableModal
      destroyOnClose
      {...(props as any)}
      visible={visible}
      closeIcon={closeIcon}
      onCancel={handleCancel}
      footer={run(!isUndefined(propFooter) ? propFooter : actionNodes ?? false, undefined, modalProps)}
    >
      {/*调用时可以content: updateProps => () 暂时问题*/}
      {run(children, undefined, modalProps)}
    </DraggableModal>
  )
})

export interface ShowModalConfig extends Omit<ShowDrawerConfig, 'footer' | 'children' | 'getContainer'> {}
export interface ShowModalConfig extends VisibleModalProps {
  stationId?: string
  greyBody?: boolean
  drawer?: boolean
  content:
    | ReactNode
    | ((
        controller: ModalControllerType<Optional<VisibleModalProps & DrawerProps>> &
          ModalInternalControllerType &
          DrawerInternalControllerType,
      ) => ReactNode)
}

export default function showModal(config: ShowModalConfig): ModalControllerType {
  if (config?.drawer === true) {
    return showDrawer(config)
  }

  const {
    stationId = 'DEFAULT_STATION',
    afterClose = () => null,
    content,
    className,
    greyBody,
    destroyOnClose = true,
    ...props
  } = config

  const id = Math.random()
  const modalRef = React.createRef()
  let resolvPromise: any = () => null
  let promise = new Promise<void>((resolve) => {
    resolvPromise = resolve
  })

  const controller = {
    open() {
      modalControllers.add(controller)
      promise = new Promise<void>((resolve) => {
        resolvPromise = resolve
      })
      controller.promise = promise
      run(modalRef, 'current.setVisible', true)
    },
    close() {
      run(modalRef, 'current.setVisible', false)
    },
    destroy() {
      run(modalRef, 'current.setVisible', false)
      run(stationMap[stationId], 'remove', id)
      modalControllers.delete(controller)
    },
    update(updateProps: Record<string, any> = {}) {
      run(modalRef, 'current.updateProps', updateProps)
    },
    promise,
  }
  run(stationMap[stationId], 'add', id, () => (
    <VisibleModal
      width="60%"
      className={classnames('f-pro-utils-modal', className, {
        'f-pro-utils-modal-grey-body': greyBody,
      })}
      {...props}
      destroyOnClose={destroyOnClose}
      ref={modalRef}
      afterClose={() => {
        afterClose()
        resolvPromise()
        if (destroyOnClose) {
          run(stationMap[stationId], 'remove', id)
          modalControllers.delete(controller)
        }
      }}
    >
      {(modalController: any) =>
        run(content ?? '', undefined, {
          ...controller,
          ...modalController,
        })
      }
    </VisibleModal>
  ))

  modalControllers.add(controller)

  return controller
}

export * from './controller'
export { default as ModalStation, stationMap } from './ModalStation'
