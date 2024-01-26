/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, forwardRef, useImperativeHandle, useContext } from 'react'
import { Space, Table } from 'antd'
import { classnames, run, pickBy, isUndefined } from '@fexd/tools'
// import { Merge } from '@fexd/pro-utils'
import { useProFormLocales } from '@fexd/pro-form'
import { useContextSize, ConfigProvider } from '@fexd/pro-provider'
import hoistStatics from 'hoist-non-react-statics'

import { TableWrapper, ChainableTablePlugins } from './utils'
import {
  extendColumn,
  extendField,
  defineColumns,
  defineFields,
  defineColumn,
  defineField,
} from './utils/enhanceConfigs'
import useQueryFieldPlugin from './plugins/queryField'
import useActionsPlugin from './plugins/actions'
import useTablePlugin from './plugins/table'
import useEditFieldPlugin from './plugins/editField'
import useValueTypePlugin from './plugins/valueType'
import useModalPlugin from './plugins/modal'
import useConfigPlugin from './plugins/config'
import { setDefaultProps, defaultProps } from './useProps'
import { ProTableProps, ProTableBuiltInPlugins, ProTableColumnType, ProTableEditFieldType } from './types'
import useFieldParams from './plugins/editField/useFieldParams'
import useItem from './plugins/table/useItem'
import useColumnConfig from './plugins/table/useColumnConfig'

const inBuiltPlugins = [
  useConfigPlugin,
  useValueTypePlugin,
  useQueryFieldPlugin,
  useActionsPlugin,
  useTablePlugin,
  useModalPlugin,
  useEditFieldPlugin,
]

// export type ProTableProps = MergeMultiple<
//   [
//     MergeMultiple<[typeof useConfigPlugin.props, typeof useValueTypePlugin.props, typeof useQueryFieldPlugin.props]>,

//     MergeMultiple<[typeof useActionsPlugin.props, typeof useTablePlugin.props, typeof useModalPlugin.props]>,

//     typeof useEditFieldPlugin.props,
//   ]
// >

export const pluginChain = new ChainableTablePlugins()
export const builtInPlugins = pluginChain
// .add(useConfigPlugin)
// .add(useValueTypePlugin)
// .add(useQueryFieldPlugin)
// .add(useActionsPlugin)
// .add(useTablePlugin)
// .add(useModalPlugin)
// .add(useEditFieldPlugin)

// const builtInPluginPropsType = builtInPlugins.getPropsType()

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
      bodyStyle = pure ? { padding: 0 } : {},
      render = ({ queryField, tableExtra, table }: any = {}) => (
        <Space
          className={classnames('f-pro-table-body', {
            'f-pro-table-pure': pure,
            'f-pro-table-mini': mini,
          })}
          direction="vertical"
          size={mini ? 'small' : 'middle'}
          style={bodyStyle}
        >
          {queryField}
          {tableExtra}
          {table}
        </Space>
      ),
    } = props

    const allPluginRef = Object.assign(
      {},
      ...plugins.map((plugin: any) => ({
        [plugin.name]: plugin(),
      })),
    )

    useImperativeHandle(ref, () => allPluginRef)

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

export function createProTable<T extends Record<string, any> = ProTableProps>(
  plugins: ChainableTablePlugins<T | ProTableProps> = builtInPlugins,
  targetDefaultProps: ProTableProps = defaultProps,
): ProTableType {
  const ProTable = hoistStatics(
    memo(
      // const ProTable: React.FC = memo(
      forwardRef(function ProTable(props: T, ref) {
        const allPlugins = [...inBuiltPlugins, ...plugins.get()]

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
    useRef: useProTableRef,
    createRef: createProTableRef,
    setDefaultProps,
    useQueryFieldPlugin,
    useActionsPlugin,
    useTablePlugin,
    useEditFieldPlugin,
    useValueTypePlugin,
    useModalPlugin,
    useConfigPlugin,
    extendColumn,
    extendField,
    defineColumns,
    defineFields,
    useItem,
    useFieldParams,
    useColumnConfig,
    defineColumn,
    defineField,
  })

  return ProTable as ProTableType
}

export function useProTableRef<T extends Record<string, any> = {}>() {
  const ref = React.useRef<ProTableBuiltInPlugins & T>(null)

  return ref!
}

export function createProTableRef<T extends Record<string, any> = {}>() {
  const ref = React.createRef<ProTableBuiltInPlugins & T>()

  return ref!
}

// type TableType = typeof Table

declare const ForwardTable: <RecordType extends object = any>(
  props: ProTableProps<RecordType> & {
    children?: React.ReactNode
  } & {
    ref?: React.Ref<ProTableBuiltInPlugins> | undefined
  },
) => React.ReactElement

type ProTableType = Omit<typeof Table, 'defaultProps'> &
  typeof ForwardTable &
  React.FC<ProTableProps> & {
    useRef: typeof useProTableRef
    createRef: typeof createProTableRef
    setDefaultProps: typeof setDefaultProps
    useQueryFieldPlugin: typeof useQueryFieldPlugin
    useActionsPlugin: typeof useActionsPlugin
    useTablePlugin: typeof useTablePlugin
    useEditFieldPlugin: typeof useEditFieldPlugin
    useValueTypePlugin: typeof useValueTypePlugin
    useModalPlugin: typeof useModalPlugin
    useConfigPlugin: typeof useConfigPlugin
    extendColumn: typeof extendColumn
    extendField: typeof extendField
    defineColumns: typeof defineColumns
    defineFields: typeof defineFields
    useItem: typeof useItem
    useFieldParams: typeof useFieldParams
    useColumnConfig: typeof useColumnConfig
    defineColumn: typeof defineColumn
    defineField: typeof defineField
  }

// export interface ProTableType<T> extends Omit<TableType, 'defaultProps'> {}
// export interface ProTableType<T = ProTableProps> extends React.FC<T & ProTableProps> {
//   ref?: React.Ref<ProTableBuiltInPlugins>
//   useRef: typeof useProTableRef
//   createRef: typeof createProTableRef
//   setDefaultProps: typeof setDefaultProps
//   useQueryFieldPlugin: typeof useQueryFieldPlugin
//   useActionsPlugin: typeof useActionsPlugin
//   useTablePlugin: typeof useTablePlugin
//   useEditFieldPlugin: typeof useEditFieldPlugin
//   useValueTypePlugin: typeof useValueTypePlugin
//   useModalPlugin: typeof useModalPlugin
//   useConfigPlugin: typeof useConfigPlugin
//   extendColumn: typeof extendColumn
//   extendField: typeof extendField
//   defineColumns: typeof defineColumns
//   defineFields: typeof defineFields
//   useItem: typeof useItem
//   useFieldParams: typeof useFieldParams
// }

export const ProTable: ProTableType = createProTable(builtInPlugins, defaultProps)
export default ProTable

// ProTable.defaultProps = {}
