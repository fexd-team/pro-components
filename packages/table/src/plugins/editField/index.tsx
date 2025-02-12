import React, { useRef, createRef, useMemo } from 'react'
import { PlusOutlined, EditOutlined, ZoomInOutlined } from '@ant-design/icons'
import { run, delay } from '@fexd/tools'
import { useMount, useMemoizedFn } from 'ahooks'
import { ModalControllerType } from '@fexd/pro-utils'
import { ProFormInternalParams } from '@fexd/pro-form'

import { createPlugin, useProps } from '../../utils'
import useActionsPlugin from '../actions'
import useModalPlugin from '../modal'
import useConfigPlugin, { I18nText } from '../config'
import EditField from './EditField'

export const useEditFieldPlugin = createPlugin(() => {
  const { onView, editFieldModalProps, addFieldModalProps, viewFieldModalProps } = useProps()

  const { setTableActions, setColumnActions } = useActionsPlugin(() => [])
  const { showModal, showDrawer } = useModalPlugin(() => [])

  const { t } = useConfigPlugin(() => [])

  const showingModal = useRef(false)
  const modalController = useRef<ModalControllerType>(null)
  const editFieldRef = useRef<{
    submit: () => Promise<any>
    cancel: () => void
    proFormRef: { current: ProFormInternalParams }
    form: ProFormInternalParams['form']
  }>(null)

  const showAddModal = useMemoizedFn(async () => {
    if (showingModal.current) {
      return
    }
    showingModal.current = true
    // const ref = createRef()
    const modalProps = run<any>(addFieldModalProps, undefined, undefined, 'add')
    const show = modalProps?.drawer ? showDrawer : showModal

    // @ts-ignore
    modalController.current = show({
      title: t('editField.add'),
      maskClosable: false,
      okText: t('modal.confirm'),
      content: <EditField ref={editFieldRef} mode="add" />,
      onOk: () => run(editFieldRef.current, 'submit'),
      onCancel: () => run(editFieldRef.current, 'cancel'),
      destroyOnClose: true,
      ...modalProps,
    })

    await modalController.current?.promise
    showingModal.current = false
  })

  // view 与 edit 暂时共用此函数
  const showEditModal = useMemoizedFn(async (item: any, customizedModalConfig: any = {}) => {
    const readonly = customizedModalConfig?.readonly ?? false
    const mode = readonly ? 'view' : 'edit'

    if (showingModal.current) {
      return
    }

    await delay(100)
    const { success = true, data: details = item } = ((await run(onView, undefined, item, mode)) as any) ?? {
      data: item,
      success: true,
    }

    if (!success) {
      console.warn('editField plugin onView failed')
      return
    }
    showingModal.current = true
    // const ref = createRef()
    const modalProps = run<any>(readonly ? viewFieldModalProps : editFieldModalProps, undefined, details ?? item, mode)
    const show = modalProps?.drawer ? showDrawer : showModal

    // @ts-ignore
    modalController.current = show({
      title: readonly ? t('editField.details') : t('editField.edit'),
      maskClosable: readonly,
      okText: readonly ? t('modal.okText') : t('modal.confirm'),
      content: (
        <EditField ref={editFieldRef} initialValues={details ?? item ?? {}} item={details ?? item} mode={mode} />
      ),
      onOk: () => run(editFieldRef.current, 'submit'),
      onCancel: () => run(editFieldRef.current, 'cancel'),
      cancelButtonProps: readonly ? { style: { display: 'none' } } : undefined,
      destroyOnClose: true,
      ...modalProps,
    })

    await modalController.current?.promise
    showingModal.current = false
  })

  useMount(() => {
    setTableActions({
      add: {
        key: 'table-add',
        type: 'primary',
        icon: <PlusOutlined />,
        content: <I18nText text="editField.add" />,
        async onClick() {
          await showAddModal()
        },
      },
    })

    setColumnActions({
      view: (record: any) => ({
        key: 'column-view',
        icon: <ZoomInOutlined />,
        content: <I18nText text="editField.details" />,
        async onClick() {
          await showEditModal(record, {
            readonly: true,
          })
        },
      }),
      edit: (record: any) => ({
        key: 'column-edit',
        icon: <EditOutlined />,
        content: <I18nText text="editField.edit" />,
        async onClick() {
          await showEditModal(record)
        },
      }),
      'view-icon': {
        key: 'column-view-icon',
        builtIn: 'view',
        tooltip: <I18nText text="editField.details" />,
        content: null,
      },
      'edit-icon': {
        key: 'column-edit-icon',
        builtIn: 'edit',
        tooltip: <I18nText text="editField.edit" />,
        content: null,
      },
    })
  })

  return useMemo(
    () => ({
      showAddModal,
      showEditModal,
      modalController,
      editFieldRef,
    }),
    [showAddModal, showEditModal],
  )
}, 'editField')
export default useEditFieldPlugin
