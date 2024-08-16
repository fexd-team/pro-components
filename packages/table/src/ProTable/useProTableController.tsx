import React from 'react'
import { run } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'

import { ProTableBuiltInPlugins } from '../types'
import useProTableRef from './useProTableRef'

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
  const showModal = useMemoizedFn<ProTableBuiltInPlugins['modal']['showModal']>((...args) =>
    run(proTableRef?.current?.modal?.showModal, undefined, ...args),
  )
  const showDrawer = useMemoizedFn<ProTableBuiltInPlugins['modal']['showDrawer']>((...args) =>
    run(proTableRef?.current?.modal?.showDrawer, undefined, ...args),
  )
  const confirmPromise = useMemoizedFn<ProTableBuiltInPlugins['modal']['confirmPromise']>((...args) =>
    run(proTableRef?.current?.modal?.confirmPromise, undefined, ...args),
  )
  // ------------------------ modal -----------------------------------

  // ------------------------ editField -------------------------------
  const showAddModal = useMemoizedFn<ProTableBuiltInPlugins['editField']['showAddModal']>((...args) =>
    run(proTableRef?.current?.editField?.showAddModal, undefined, ...args),
  )
  const showEditModal = useMemoizedFn<ProTableBuiltInPlugins['editField']['showEditModal']>((...args) =>
    run(proTableRef?.current?.editField?.showEditModal, undefined, ...args),
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

export default useProTableController
