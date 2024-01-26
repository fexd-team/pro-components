/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useMemo } from 'react'
import { Space, Alert, Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import { run, isObject } from '@fexd/tools'
import { Action } from '@fexd/pro-utils'
import { useMemoizedFn } from 'ahooks'

import { ProTableProps } from '../../types'
import { useProps } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import useActionsPlugin from '../actions'
import useConfigPlugin, { I18nText } from '../config'

export default function useSelectable(expandableConfig: ProTableProps['expandable']) {
  const { rowKey, selectable, dataSource: propDataSource, rowSelection, columns, noBatchToolbar } = useProps()
  const { size } = useConfigPlugin(({ size }) => [size])

  const queryField = useQueryFieldPlugin(({ paginationParams, selectedItems, dataSource }) => [
    paginationParams,
    selectedItems,
    dataSource,
  ])

  const { paginationParams, selectedItems, setSelectedItems, dataSource: tableDataSource } = queryField
  const { builtInActions, renderBatchActions } = useActionsPlugin(({ builtInActions }) => [builtInActions])

  const dataSource = propDataSource ?? tableDataSource

  const getItemKeys = useMemoizedFn((items) => items.map((item: any) => item?.[run<string>(rowKey, undefined, item)]))
  const updateSelectedItemsAndTriggerHandler = useMemoizedFn((items: any[]) => {
    queryField.setSelectedItems(items)
    run(rowSelection, 'onChange', getItemKeys(items), items)
    run(rowSelection, 'onSelect', getItemKeys(items), items)
  })

  const onRowClick = useMemoizedFn((item) => {
    // 行点击展开的优先级更高
    if (expandableConfig?.expandRowByClick) {
      return
    }

    if (!rowSelection?.toggleRowSelectionByClick) {
      return
    }

    const { disabled = false } = run<any>(rowSelection, 'getCheckboxProps', item) ?? {}
    if (disabled) {
      return
    }

    if (rowSelection?.type === 'radio') {
      updateSelectedItemsAndTriggerHandler([item])
      return
    }

    if (selectedItems.includes(item)) {
      updateSelectedItemsAndTriggerHandler(queryField.getSelectedItems().filter((target) => target !== item))
      return
    }

    updateSelectedItemsAndTriggerHandler([...new Set([...queryField.getSelectedItems(), item])])
  })

  const customeizedSelectionColumn = useMemo(() => columns.includes(Table.SELECTION_COLUMN), [columns])

  const onChange = useMemoizedFn((selectedRowKeys: React.Key[], selectedItems: any[]) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedItems: ', selectedItems)
    setSelectedItems(selectedItems)
    run(rowSelection, 'onChange', selectedRowKeys, selectedItems)
    run(rowSelection, 'onSelect', selectedRowKeys, selectedItems)
  })

  const rowSelectionConfig = useMemo<TableRowSelection<any> | undefined>(
    () =>
      selectable && dataSource?.length > 0
        ? {
            fixed: !customeizedSelectionColumn,
            selectedRowKeys: selectedItems.map((item: any) => item?.[run<string>(rowKey, undefined, item)]),
            ...(isObject(rowSelection) ? rowSelection : {}),
            onChange,
          }
        : rowSelection,
    [rowSelection, selectedItems, selectable, dataSource?.length, rowKey, customeizedSelectionColumn],
  )

  return {
    toggleRowSelectionByClick: !!rowSelection?.toggleRowSelectionByClick,
    handleRowSelectionByClick: onRowClick,
    renderBatchToolbar: () =>
      noBatchToolbar !== true && selectable && rowSelection?.type !== 'radio' && selectedItems?.length > 0 ? (
        <Alert
          className="f-pro-table-alert f-pro-table-batch-toolbar"
          message={
            <div className="f-pro-table-alert-content">
              <Space size={size !== 'small' ? 'large' : 'middle'}>
                <span className="f-pro-table-alert-content-tips">
                  <I18nText
                    text="table.selectionTips"
                    config={{
                      count: selectedItems?.length,
                    }}
                  />
                </span>
                <Space size={size !== 'small' ? 2 : 1}>
                  <Action
                    type="link"
                    size="small"
                    onClick={() => {
                      updateSelectedItemsAndTriggerHandler([])
                    }}
                  >
                    <I18nText text="table.deselect" />
                  </Action>
                  <Action
                    type="link"
                    size="small"
                    onClick={() => {
                      const { page = 1, pageSize = 10 } = paginationParams

                      const currentDataSource =
                        dataSource?.length <= pageSize
                          ? dataSource
                          : dataSource.slice((page - 1) * pageSize, page * pageSize)

                      const selectedItemsKeys = selectedItems.map(
                        (item: any) => item?.[run<string>(rowKey, undefined, item)],
                      )

                      updateSelectedItemsAndTriggerHandler(
                        currentDataSource
                          // 过滤不可选的项
                          .filter((item: any) => {
                            const { disabled = false } = (run(rowSelection, 'getCheckboxProps', item) as any) ?? {}

                            return !disabled
                          })
                          .filter(
                            (item: any) =>
                              !selectedItems.includes(item) ||
                              !selectedItemsKeys.includes(item?.[run<string>(rowKey, undefined, item)]),
                          ),
                      )
                    }}
                  >
                    <I18nText text="table.inverse" />
                  </Action>
                </Space>
              </Space>
              {builtInActions?.batchActionConfigs?.length > 0 && (
                <div className="f-pro-table-batch-actions">{renderBatchActions()}</div>
              )}
            </div>
          }
        />
      ) : null,
    rowSelection: rowSelectionConfig,
  }
}
