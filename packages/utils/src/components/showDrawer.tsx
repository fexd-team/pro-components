import React, { ReactNode, useContext, useRef } from 'react'
import { Drawer, DrawerProps as AntdDrawerProps, ModalProps, ConfigProvider } from 'antd'

import { useMount, useSetState, useSafeState } from 'ahooks'
import { run, delay, classnames, isUndefined } from '@fexd/tools'
import { Optional } from 'utility-types'

import { stationMap } from './showModal/ModalStation'
import { modalControllers, ModalControllerType } from './showModal/controller'
import useModalActions, { ActionModalProps } from './showModal/useModalActions'

export interface DrawerInternalControllerType {
  initialProps: DrawerProps
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  updateProps: React.Dispatch<React.SetStateAction<Optional<DrawerProps>>>
  state: Record<string, any>
  setState: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export interface DrawerProps extends AntdDrawerProps {}
export interface DrawerProps extends Omit<ActionModalProps, 'getContainer'> {
  footer?:
    | ActionModalProps['footer']
    | ((modalInternalController: DrawerInternalControllerType) => ActionModalProps['footer'])
  children?:
    | ActionModalProps['children']
    | ((modalInternalController: DrawerInternalControllerType) => ActionModalProps['children'])
}

export interface DrawerProps
  extends Pick<
    ModalProps,
    | 'onOk'
    | 'onCancel'
    | 'okText'
    | 'cancelText'
    // | 'okButtonProps'
    // | 'cancelButtonProps'
    | 'afterClose'
    | 'className'
    | 'children'
    | 'width'
  > {}

export interface ShowDrawerConfig extends DrawerProps {
  stationId?: string
  content:
    | ReactNode
    | ((controller: ModalControllerType<Optional<DrawerProps>> & DrawerInternalControllerType) => ReactNode)
  greyBody?: boolean
}

const VisibleDrawer = React.forwardRef(function VisibleDrawer(initialProps: DrawerProps, ref: any) {
  const initialPropsRef = useRef(initialProps)
  const [currentProps, updateProps] = useSetState<DrawerProps>(initialProps)
  const {
    footer: propFooter,
    content,
    children = content as any,
    placement = 'right',
    className,
    ...props
  } = currentProps
  const size = useContext(ConfigProvider.SizeContext)
  const [state, setState] = useSetState<Record<string, any>>({})
  const [visible, setVisible] = useSafeState(false)
  const { actionNodes, handleCancel, closeIcon } = useModalActions({
    props: currentProps,
    closeModal: () => setVisible(false),
    reverse: placement !== 'right',
    wrapperStyle: placement !== 'right' ? { width: '100%', justifyContent: 'right' } : {},
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

  useMount(async () => {
    await delay(60)
    setVisible(true)
  })

  React.useImperativeHandle(ref, () => modalProps)

  return (
    <Drawer
      destroyOnClose
      {...props}
      className={classnames(className, {
        'small-drawer': size === 'small',
      })}
      closable={placement === 'right'}
      closeIcon={closeIcon}
      extra={
        placement !== 'right' && (
          <button
            className="ant-drawer-close"
            style={{ position: 'relative', top: 2, margin: 0 }}
            onClick={handleCancel}
          >
            {closeIcon}
          </button>
        )
      }
      placement={placement}
      visible={visible}
      // okText={okText}
      // cancelText={cancelText}
      // onOk={handleOk}
      onClose={handleCancel}
      footer={run(!isUndefined(propFooter) ? propFooter : actionNodes ?? false, undefined, modalProps)}
    >
      {/*调用时可以content: updateProps => () 暂时问题*/}
      {run(children, undefined, modalProps)}
    </Drawer>
  )
})

export default function showDrawer({
  stationId = 'DEFAULT_STATION',
  afterClose = () => null,
  afterVisibleChange,
  content,
  className,
  greyBody,
  destroyOnClose = true,
  ...props
}: ShowDrawerConfig): ModalControllerType {
  const id = Math.random()
  const modalRef = React.createRef()
  let resolvPromise: any = () => null
  let promise = new Promise<void>((resolve) => {
    resolvPromise = resolve
  })

  // @ts-ignore
  delete props.drawer

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
    <VisibleDrawer
      width="60%"
      className={classnames('f-pro-utils-modal f-pro-utils-drawer', className, {
        'f-pro-utils-modal-grey-body': greyBody,
      })}
      {...props}
      destroyOnClose={destroyOnClose}
      ref={modalRef}
      afterVisibleChange={(visible: boolean) => {
        if (!visible) {
          run(afterVisibleChange, undefined, visible)
          afterClose()
          resolvPromise()
          if (destroyOnClose) {
            run(stationMap[stationId], 'remove', id)
            modalControllers.delete(controller)
          }
        }
      }}
      // afterClose={() => {
      //   afterClose()
      //   run(stationMap[stationId], 'remove', id)
      //   resolvPromise()
      //   modalControllers.delete(controller)
      // }}
    >
      {(modalController: any) =>
        run(content ?? '', undefined, {
          ...controller,
          ...modalController,
        })
      }
    </VisibleDrawer>
  ))

  modalControllers.add(controller)

  return controller
}
