/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, forwardRef, useImperativeHandle } from 'react'
import { Space, Table } from 'antd'
import { classnames, run } from '@fexd/tools'

import { useProFormLocales } from '@fexd/pro-form'
import { useContextSize, ConfigProvider } from '@fexd/pro-provider'
import hoistStatics from 'hoist-non-react-statics'

import { TableWrapper, ChainableTablePlugins } from '../utils'
import useQueryFieldPlugin from '../plugins/queryField'
import useTablePlugin from '../plugins/table'
import { defaultProps } from '../useProps'
import { ProTableProps, ProTableBuiltInPlugins } from '../types'

import { builtInPluginList, builtInPlugins } from './builtInPlugins'
import proTableAddon from './addon'

const TableContent = memo(
  forwardRef(function TableContent(props: any, ref) {
    const queryField = useQueryFieldPlugin()
    const table = useTablePlugin()
    const ctxSize = useContextSize()
    const {
      mini = ctxSize === 'small' ?? false,
      pure = false,
      tableExtraRender,
      hideQueryFields,
      plugins = [],
      bodyClassName,
      bodyStyle = pure ? { padding: 0 } : {},
      render = ({ queryField, tableExtra, table }: any = {}) => (
        <Space
          className={classnames(
            'f-pro-table-body',
            {
              'f-pro-table-pure': pure,
              'f-pro-table-mini': mini,
            },
            bodyClassName,
          )}
          direction="vertical"
          size={mini ? 'small' : 'middle'}
          style={bodyStyle}
        >
          {queryField}
          {tableExtra}
          {table}
        </Space>
      ),
      tableRef,
    } = props

    const allPluginRef = Object.assign(
      {},
      ...plugins.map((plugin: any) => ({
        [plugin.name]: plugin(),
      })),
    )

    useImperativeHandle(ref, () => allPluginRef)
    useImperativeHandle(tableRef, () => allPluginRef)

    return (
      <ConfigProvider
        parentContextFirst
        localeKey={(props as any)?.localeKey ?? 'en_US'}
        numberLocale={{ toFixed: 2 }}
        size={mini ? 'small' : undefined}
      >
        <useProFormLocales.Provider>
          {run(render, undefined, {
            queryField: !hideQueryFields && queryField?.hasQueryFields ? run(queryField, 'render') : null,
            tableExtra: tableExtraRender ? <div className="f-pro-table-extra">{run(tableExtraRender)}</div> : null,
            table: run(table, 'render'),
          })}
          {run(queryField, 'renderAutoQueryTrigger')}
        </useProFormLocales.Provider>
      </ConfigProvider>
    )
  }),
)

// type TableType = typeof Table

declare const ForwardTable: <RecordType extends object = any>(
  props: ProTableProps<RecordType> & {
    children?: React.ReactNode
  } & {
    ref?: React.Ref<ProTableBuiltInPlugins> | undefined
  },
) => React.ReactElement

export type ProTableType = Omit<typeof Table, 'defaultProps'> &
  typeof ForwardTable &
  React.FC<ProTableProps> &
  typeof proTableAddon

// ProTable.defaultProps = {}

export function createProTable<T extends Record<string, any> = ProTableProps>(
  plugins: ChainableTablePlugins<T | ProTableProps> = builtInPlugins,
  targetDefaultProps: ProTableProps = defaultProps,
): ProTableType {
  const ProTable = hoistStatics(
    memo(
      // const ProTable: React.FC = memo(
      forwardRef(function ProTable(props: T, ref) {
        const allPlugins = [...builtInPluginList, ...plugins.get()]

        return (
          <TableWrapper plugins={allPlugins} {...props}>
            <TableContent {...props} ref={ref} plugins={allPlugins} />
          </TableWrapper>
        )
      }),
    ),
    Table,
  ) as any

  Object.assign(ProTable, {
    defaultProps: targetDefaultProps,
    ...proTableAddon,
  })

  return ProTable as ProTableType
}

export default createProTable
