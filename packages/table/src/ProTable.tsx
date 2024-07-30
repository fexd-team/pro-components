/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, forwardRef, useImperativeHandle, useContext } from 'react'
import { Space, Table } from 'antd'
import { classnames, run, pickBy, isUndefined, isObject } from '@fexd/tools'
// import { Merge } from '@fexd/pro-utils'
import { useProFormLocales } from '@fexd/pro-form'
import { useContextSize, ConfigProvider } from '@fexd/pro-provider'
import hoistStatics from 'hoist-non-react-statics'
import { useMemoizedFn } from 'ahooks'

import { TableWrapper, ChainableTablePlugins } from './utils'
import {
  extendColumn,
  extendField,
  defineColumns,
  defineFields,
  defineColumn,
  defineField,
  defineCoverableProps,
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
    useController: useProTableController,
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
    defineCoverableProps,
  })

  return ProTable as ProTableType
}

export function useProTableRef<T extends Record<string, any> = {}>() {
  const ref = React.useRef<ProTableBuiltInPlugins & T>(null)

  return ref!
}

export function useProTableController() {
  const proTableRef = useProTableRef()

  // ------------------------ queryField -----------------------------------
  const setPaginationParams = useMemoizedFn<ProTableBuiltInPlugins['queryField']['setPaginationParams']>((...args) =>
    run(proTableRef?.current?.queryField?.setPaginationParams, undefined, ...args),
  )
  const getPaginationParams = useMemoizedFn<ProTableBuiltInPlugins['queryField']['getPaginationParams']>((...args) =>
    run(proTableRef?.current?.queryField?.getPaginationParams, undefined, ...args),
  )
  const setSelectedItems = useMemoizedFn<ProTableBuiltInPlugins['queryField']['setSelectedItems']>((...args) =>
    run(proTableRef?.current?.queryField?.setSelectedItems, undefined, ...args),
  )
  const getSelectedItems = useMemoizedFn<ProTableBuiltInPlugins['queryField']['getSelectedItems']>((...args) =>
    run(proTableRef?.current?.queryField?.getSelectedItems, undefined, ...args),
  )
  const getQueryingParams = useMemoizedFn<ProTableBuiltInPlugins['queryField']['getQueryingParams']>((...args) =>
    run(proTableRef?.current?.queryField?.getQueryingParams, undefined, ...args),
  )
  const getQueryingExtraParams = useMemoizedFn<ProTableBuiltInPlugins['queryField']['getQueryingExtraParams']>(
    (...args) => run(proTableRef?.current?.queryField?.getQueryingExtraParams, undefined, ...args),
  )
  const refresh = useMemoizedFn<ProTableBuiltInPlugins['queryField']['refresh']>((...args) =>
    run(proTableRef?.current?.queryField?.refresh, undefined, ...args),
  )
  const search = useMemoizedFn<ProTableBuiltInPlugins['queryField']['search']>((...args) =>
    run(proTableRef?.current?.queryField?.search, undefined, ...args),
  )
  const setExtraParams = useMemoizedFn<ProTableBuiltInPlugins['queryField']['setExtraParams']>((...args) =>
    run(proTableRef?.current?.queryField?.setExtraParams, undefined, ...args),
  )

  const createMockDataSource = useMemoizedFn<ProTableBuiltInPlugins['queryField']['createMockDataSource']>((...args) =>
    run(proTableRef?.current?.queryField?.createMockDataSource, undefined, ...args),
  )
  const updateMockDataSource = useMemoizedFn<ProTableBuiltInPlugins['queryField']['updateMockDataSource']>((...args) =>
    run(proTableRef?.current?.queryField?.updateMockDataSource, undefined, ...args),
  )
  // ------------------------ queryField -----------------------------------

  // ------------------------ modal -----------------------------------
  const showModal = useMemoizedFn<ProTableBuiltInPlugins['modal']['showModal']>(() =>
    run(proTableRef?.current?.modal?.showModal),
  )
  const showDrawer = useMemoizedFn<ProTableBuiltInPlugins['modal']['showDrawer']>(() =>
    run(proTableRef?.current?.modal?.showDrawer),
  )
  const confirmPromise = useMemoizedFn<ProTableBuiltInPlugins['modal']['confirmPromise']>(() =>
    run(proTableRef?.current?.modal?.confirmPromise),
  )
  // ------------------------ modal -----------------------------------

  // ------------------------ editField -------------------------------
  const showAddModal = useMemoizedFn<ProTableBuiltInPlugins['editField']['showAddModal']>(() =>
    run(proTableRef.current?.editField?.showAddModal),
  )
  const showEditModal = useMemoizedFn<ProTableBuiltInPlugins['editField']['showEditModal']>(() =>
    run(proTableRef.current?.editField?.showEditModal),
  )
  // ------------------------ editField -------------------------------

  const getDataSource = useMemoizedFn(() => proTableRef?.current?.queryField?.dataSource)

  const getMockDataSource = useMemoizedFn(() => proTableRef?.current?.queryField!?.mockDataSource)

  const controller = React.useMemo(
    () => ({
      ref: proTableRef,
      /** 获取内部数据集 */
      getDataSource,
      /** 设置分页参数 */
      setPaginationParams,
      /** 获取分页参数（穿透闭包） */
      getPaginationParams,
      /** 设置多选项 */
      setSelectedItems,
      /** 获取多选项（穿透闭包） */
      getSelectedItems,
      /** 获取当前使用中的查询参数 */
      getQueryingParams,
      /** 获取当前使用中的额外的查询参数，如表格的排序、筛选参数等 */
      getQueryingExtraParams,
      /** 刷新请求（携带当前参数） */
      refresh,
      /** 触发搜索，可指定参数 */
      search,
      /** 设置额外参数，如表格的排序、筛选参数等，好像也可以塞一些其他的数据 */
      setExtraParams,
      /** 命令式唤起弹窗，默认绑定了内部 station */
      showModal,
      /** 命令式唤起抽屉，默认绑定了内部 station */
      showDrawer,
      /** 命令式确认交互（返回 Promise 格式） */
      confirmPromise,
      /** 展示新增弹窗 */
      showAddModal,
      /** 展示编辑弹窗 */
      showEditModal,
      /** 获取模拟数据集 */
      getMockDataSource,
      /** 创建模拟数据集 */
      createMockDataSource,
      /** 更新模拟数据集 */
      updateMockDataSource,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return controller
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
    useController: typeof useProTableController
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
    defineCoverableProps: typeof defineCoverableProps
  }

export const ProTable: ProTableType = createProTable(builtInPlugins, defaultProps)
export default ProTable

// ProTable.defaultProps = {}
