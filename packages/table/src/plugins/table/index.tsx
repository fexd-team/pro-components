/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, forwardRef, useImperativeHandle, useRef, useMemo } from 'react'
import { Table as AntdTable, TableProps, Empty } from 'antd'
import { run, classnames, isObject, isArray } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'

import { useProps, createPlugin } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import useModalPlugin from '../modal'
import useConfigPlugin from '../config'

import useStickyScrollBar from './useStickyScrollBar'
import useResizableColumns, { ResizableTitle } from './useResizableColumns'
import useToolbar from './useToolbar'
import usePagination from './usePagination'
import useColumns from './useColumns'
import useSelectable from './useSelectable'
import useExpandable from './useExpandable'
import useItem from './useItem'

const TdCell = memo(function TdCell(props: any) {
  // https://juejin.cn/post/7063332320339099678
  // onMouseEnter, onMouseLeave在数据量多的时候，会严重阻塞表格单元格渲染，严重影响性能
  const { onMouseEnter, onMouseLeave, children, style, ...restProps } = props

  const cell = useMemo(
    () => (
      <td {...restProps} style={style}>
        {children}
      </td>
    ),
    [children, style],
  )
  return cell
})

const PluginTable = memo(
  forwardRef(function PluginTable({}, ref) {
    const {
      pure,
      rowKey,
      dataSource: propDataSource,
      mainStyle,
      mainClassName,
      loading: propLoading,
      sticky,
      components: propComponents,
      resizableHeader,
      noTableHeaderEllipsis,
      __EXTRA_PROPS__,
      ...restProps
    } = useProps()
    const { size, t } = useConfigPlugin(({ size, t }) => [size, t])

    const queryField = useQueryFieldPlugin(({ loading, paginationParams, selectedItems, dataSource, isSearched }) => [
      loading,
      paginationParams,
      selectedItems,
      dataSource,
      isSearched,
    ])

    const { loading: queryFieldLoading, setExtraParams, dataSource: tableDataSource } = queryField
    const loading = queryFieldLoading || propLoading
    const dataSource = propDataSource ?? tableDataSource

    const tableWrapperDomRef = useRef<HTMLDivElement>(null)
    const tableContentDomRef = useRef<HTMLDivElement>(null)
    const tableToolbarDomRef = useRef<HTMLDivElement>(null)
    const antdTableRef = useRef<any>(null)

    useImperativeHandle(ref, () => ({
      tableWrapperDomRef,
      tableToolbarDomRef,
      tableContentDomRef,
      antdTableRef,
    }))

    const { renderStation } = useModalPlugin(() => [])
    const { hasToolbar, renderToolbar } = useToolbar({
      ref: tableToolbarDomRef,
    })
    const columns = useColumns()
    const expandableConfig = useExpandable()
    const { rowSelection, renderBatchToolbar, handleRowSelectionByClick, toggleRowSelectionByClick } =
      useSelectable(expandableConfig)

    const antdTablePaginationConfig = usePagination()
    const resizableColumns = useResizableColumns(columns)

    useStickyScrollBar(antdTableRef, antdTablePaginationConfig)

    return (
      <div
        className={classnames(
          'f-pro-table-main',
          {
            'f-pro-table-main-no-toolbar': !hasToolbar,
            'f-pro-table-main-bordered': !pure,
          },
          mainClassName,
        )}
        ref={tableWrapperDomRef}
        style={mainStyle}
      >
        {run(renderStation)}
        {run(renderToolbar)}
        {run(renderBatchToolbar)}
        <div
          className={classnames('f-pro-table-table', {
            'f-pro-table-table-sticky': sticky,
            // 'f-pro-table-table-no-bordered': !restProps?.bordered,
          })}
          ref={tableContentDomRef}
        >
          <AntdTable
            ref={antdTableRef}
            scroll={useMemo(() => ({ x: 'max-content' }), [])}
            size={size as any}
            onChange={useMemoizedFn(async (pagination, filters, sorters, extra) => {
              switch (extra?.action) {
                case 'paginate': {
                  // do nothing
                  break
                }
                default: {
                  setExtraParams({ filters, sorters })
                  queryField.search()
                }
              }
            })}
            {...(restProps as Omit<TableProps<any>, 'title'>)}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={!queryField?.isSearched ? t('table.notSearchedYet') : undefined}
                />
              ),
              ...(isObject(restProps?.locale) ? restProps?.locale : {}),
            }}
            onRow={useMemoizedFn((item, ...args: any[]) => {
              const customerConfig = run(restProps, 'onRow', item, ...args) ?? {}

              return {
                ...customerConfig,
                className: classnames(customerConfig?.className, {
                  'f-pro-table-row-clickable': toggleRowSelectionByClick || expandableConfig?.expandRowByClick,
                }),
                onClick(...args: any[]) {
                  handleRowSelectionByClick(item)
                  run(customerConfig, 'onClick', ...args)
                },
              }
            })}
            loading={loading}
            pagination={antdTablePaginationConfig}
            title={undefined}
            rowSelection={rowSelection}
            expandable={expandableConfig}
            components={useMemo(
              () => ({
                ...(propComponents ?? {}),
                header: {
                  ...(resizableHeader ? { cell: ResizableTitle } : {}),
                  ...(propComponents?.header ?? {}),
                },
                body: {
                  cell: TdCell,
                  ...(propComponents?.body ?? {}),
                },
              }),
              [propComponents, resizableHeader],
            )}
            className={classnames('f-pro-table-ant-table', restProps?.className, {
              'f-pro-table-header-no-ellipsis': noTableHeaderEllipsis,
            })}
            sticky={sticky as boolean}
            rowKey={rowKey}
            // dataSource={dataSource}
            dataSource={isArray(dataSource) ? dataSource : isObject(dataSource) ? Object.values(dataSource) : []}
            columns={resizableHeader ? resizableColumns : columns}
          />
        </div>
      </div>
    )
  }),
)

export const useTablePlugin = createPlugin(() => {
  const tableRef = useRef<any>(null)

  return {
    tableRef,
    render: () => <PluginTable ref={tableRef} />,
  }
}, 'table')
export default useTablePlugin
export { useItem }
