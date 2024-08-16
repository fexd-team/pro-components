/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useMemo } from 'react'
import { message } from 'antd'
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { run, isBoolean, isExist, isObject } from '@fexd/tools'
import { catchPromise, Hook, useLazyRender } from '@fexd/pro-utils'
import { useMount, useMemoizedFn } from 'ahooks'

import { useProps } from '../../../utils'
import useQueryFieldPlugin from '../../queryField'
import useActionsPlugin from '../../actions'
import { I18nText } from '../../config'
import useEditableRow from './useEditableRow'
import { ProTableColumnType } from '../../../types'
import handleAsyncActionResponse from '../../actions/handleAsyncActionResponse'

export default function useActionsColumn({
  editableRowController,
  hasWidth = false,
}: {
  editableRowController: ReturnType<typeof useEditableRow>
  hasWidth: boolean
}): ProTableColumnType | undefined {
  const {
    rowKey,
    fixColumnActions,
    dataSource: propDataSource,
    columnActions,
    columnActionsConfig,
    onEdit: propOnEdit,
    refreshAfterEdit,
    lazyRenderCell: getLazyRenderCell,
  } = useProps()
  const onEdit = useMemoizedFn((...args) => run(propOnEdit, undefined, ...args))

  const queryField = useQueryFieldPlugin(({ loading, paginationParams, selectedItems, dataSource }) => [
    loading,
    paginationParams,
    selectedItems,
    dataSource,
  ])

  const { dataSource: tableDataSource } = queryField

  const {
    builtInActions,
    renderColumnsActions,
    setColumnActions,
    hasColumnsActions: checkHasColumnsActions,
    hasColumnActions: checkHasColumnActions,
  } = useActionsPlugin(({ builtInActions }) => [builtInActions])

  const dataSource = (propDataSource ?? tableDataSource) as any[]

  useMount(() => {
    setColumnActions({
      'table-edit': (record: any) => ({
        key: 'column-table-edit',
        icon: <EditOutlined />,
        content: <I18nText text="table.edit" />,
        async onClick() {
          const key = record?.[String(run<string>(rowKey, undefined, record))]
          editableRowController.setRowEditable(key, true)
        },
      }),
      'table-edit-save': (record: any) => ({
        key: 'column-table-edit-save',
        icon: <CheckOutlined />,
        content: <I18nText text="table.save" />,
        async onClick() {
          const key = record?.[String(run<string>(rowKey, undefined, record))]
          const form = editableRowController.getForm(key)
          const [errors, values]: any[] = await catchPromise(form.validateFields())

          if (errors) {
            // console.warn(errors)
            const firstErrorFileNamePath = errors?.errorFields?.[0]?.name
            form.scrollToField(firstErrorFileNamePath, { inline: 'center' }) // 横向滚动至居中
            return
          }

          let response = (await run(
            onEdit,
            undefined,
            editableRowController.normalizeValues(key, values),
            record,
          )) as any

          if (isBoolean(response)) {
            response = {
              success: response,
            }
          }

          handleAsyncActionResponse(response)

          const { success } = response ?? {
            success: true,
          }

          if (!success) {
            return false
          }

          setTimeout(() => {
            if (refreshAfterEdit) {
              queryField.refresh()
            }

            run(form, 'resetFields')
          }, 300)

          editableRowController.setRowEditable(key, false)
          return
        },
      }),
      'table-edit-cancel': (record: any) => ({
        key: 'column-table-edit-cancel',
        icon: <CloseOutlined />,
        content: <I18nText text="table.cancel" />,
        confirm: <I18nText text="table.cancelConfirm" />,
        async onClick() {
          const key = record?.[String(run<string>(rowKey, undefined, record))]
          const form = editableRowController.getForm(key)
          run(form, 'resetFields')
          editableRowController.setRowEditable(key, false)
        },
      }),
    })
  })

  const hasColumnsActions = useMemo(
    () => dataSource?.length > 0 && checkHasColumnsActions(dataSource),
    [dataSource, builtInActions?.columnActions, columnActions],
  )

  const renderActions = useMemoizedFn((_: any, record: any, recordIndex: number) => (
    <Hook>
      {() => {
        const key = record?.[String(run<string>(rowKey, undefined, record))]
        const editable = editableRowController.useEditable(key)
        // console.log('render actions', key)

        const lazyRenderCell = useMemo(
          () =>
            run(getLazyRenderCell, undefined, {
              dataSource, // any[];
              column: actionColumn, // ProTableColumnType<any>;
              item: record, // any;
              yIndex: recordIndex,
              isActionColumn: true,
            }),
          [getLazyRenderCell, dataSource, record, recordIndex],
        )

        const lazyContent = useLazyRender({
          ...(isObject(lazyRenderCell) ? (lazyRenderCell as any) : {}),
          forceVisible: !lazyRenderCell,
          placeholderWrapperClassName: 'f-pro-table-cell-placeholder',
          placeholder: <span className="f-pro-table-cell-placeholder-content"> -- </span>,
          content: useMemo(() => {
            const hasActions = checkHasColumnActions(record, recordIndex, dataSource)

            if (!hasActions) {
              return <div className="f-pro-table-column-action-placeholder">--</div>
            }
            return (
              <div className="f-pro-table-column-action-wrapper">
                {renderColumnsActions(
                  record,
                  recordIndex,
                  dataSource,
                  editable ? ['table-edit-save', 'table-edit-cancel'] : undefined,
                )}
              </div>
            )
          }, [record, recordIndex, dataSource, editable]),
          debugLog: false,
        })

        return lazyContent
      }}
    </Hook>
  ))

  const actionColumn = useMemo<ProTableColumnType>(
    () => ({
      title: <I18nText text="table.action" />,
      key: 'action',
      fixed: fixColumnActions ? 'right' : undefined,
      align: 'center',
      ...(hasWidth
        ? {
            width: '1%',
            onCell: () => ({
              style: {
                maxWidth: '1%',
              },
            }),
          }
        : {}),
      ...columnActionsConfig,
      render: renderActions,
    }),
    [hasWidth, fixColumnActions, columnActionsConfig],
  )

  return useMemo<ProTableColumnType | undefined>(
    () => (hasColumnsActions ? actionColumn : undefined),
    [hasColumnsActions, actionColumn],
  )
}
