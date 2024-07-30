/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useMemo } from 'react'
import { message } from 'antd'
import { classnames, run, isNumber, delay, isArray, isObject, intersection, isExist, isFunction } from '@fexd/tools'

import { useGetState, useMemoizedFn, useLatest, useSafeState } from 'ahooks'
import { Result } from 'ahooks/es/useRequest/src/types'
import 'ahooks/es/useRequest/src/types'

import { catchPromise, useProState, Hook, useRequest } from '@fexd/pro-utils'
import { ProFieldValueTypes, ProForm } from '@fexd/pro-form'

import useValueTypePlugin from '../valueType'
import { createPlugin } from '../../utils'
import { ProTableProps } from '../../types'
import useQueryFieldsConfig from './useFieldsConfig'
import QueryFieldForm from './QueryField'
import usePersistForm from './usePersistForm'
import usePaginationParams from './usePaginationParams'
import handleAsyncActionResponse from '../actions/handleAsyncActionResponse'
import useMockDataSource from './useMockDataSource'

export const useQueryFieldPlugin = createPlugin((props: ProTableProps) => {
  const { types } = useValueTypePlugin(() => [])
  const {
    pure,
    queryWrapperStyle = pure ? { padding: 0 } : {},
    queryFieldFilterEmptyParam,
    queryFieldTriggerOnEnter,
    onQuery,
    pagination,
    defaultPaginationParams,
    initialPaginationParams,
    queryFieldLayout,
    defaultPageSize,
    queryFieldServiceOptions,
    manualQuery,
    normalizeFieldValue,
    rowSelection,
    rowKey,
    dataSource: propDataSource,
    mockDataSource: needMockDataSource,
  } = props
  const [form] = ProForm.useForm()
  const persistFormProState = usePersistForm(form)
  const [selectedItems, setSelectedItems, getSelectedItems] = useGetState<any[]>([])
  const {
    state: paginationParams,
    setState: setPaginationParams,
    getState: getPaginationParams,
  } = usePaginationParams()

  const extraParamsProState = useProState<{ filters?: any; sorters?: any; [key: string]: any }>({
    filters: {},
    sorters: {},
  })

  const { state: extraParams, setState: setExtraParams, getState: getExtraParams } = extraParamsProState

  const { queryFields } = useQueryFieldsConfig()
  const hasQueryFields = queryFields?.length > 0

  const queryingParamsRef = useRef<Record<string, any>>({})
  const getQueryingParams = useMemoizedFn(() => ({ ...queryingParamsRef.current }))
  const queryingExtraParamsRef = useRef<Record<string, any>>({})
  const getQueryingExtraParams = useMemoizedFn(() => ({ ...queryingExtraParamsRef.current }))
  const proFormRef = ProForm.useRef()
  const normalizeFormValues = useMemoizedFn((formValues: any) => {
    const fieldsMapRef = proFormRef?.current?.fieldsMapRef

    return !normalizeFieldValue
      ? { ...formValues }
      : Object.fromEntries(
          Object.entries(formValues).map(([key, value]) => [
            key,
            run(types?.[fieldsMapRef?.current?.[key]?.current?.type as ProFieldValueTypes], 'normalizeValue', value) ??
              value,
          ]),
        )
  })
  const getQueryParams = useMemoizedFn((params = {}, extra = {}) => {
    const currentParams = Object.fromEntries(
      Object.entries({
        ...normalizeFormValues({
          ...(form.getFieldsValue() ?? {}),
          ...params,
        }),
        ...(getPaginationParams() ?? paginationParams),
      }).filter(([, value]) => {
        if (queryFieldFilterEmptyParam) {
          return isExist(value) && value !== ''
        }

        return true
      }),
    )
    const currentExtraParams = {
      ...(getExtraParams() ?? extraParams),
      ...extra,
    }

    return {
      params: currentParams,
      extraParams: currentExtraParams,
    }
  })
  const { mockDataSource, updateMockDataSource, createMockDataSource } = useMockDataSource()
  const innerService = useRequest(
    async (params = {}, extra = {}) => {
      const { params: currentParams, extraParams: currentExtraParams } = getQueryParams(params, extra)

      if (!isFunction(onQuery) && needMockDataSource !== false) {
        queryingParamsRef.current = { ...currentParams }
        queryingExtraParamsRef.current = { ...currentExtraParams }

        const { page, pageSize } = currentParams as any

        const mockDataSource = updateMockDataSource()

        return {
          success: true,
          data: [page, pageSize].every(isNumber)
            ? mockDataSource.slice((page - 1) * pageSize, page * pageSize)
            : mockDataSource,
          total: mockDataSource?.length,
        }
      }

      const response = await run<any>(onQuery, undefined, currentParams, currentExtraParams)

      const success = response?.success ?? true

      handleAsyncActionResponse(response)

      if (success) {
        queryingParamsRef.current = { ...currentParams }
        queryingExtraParamsRef.current = { ...currentExtraParams }
      }

      // if (!success && isString(response?.message)) {
      //   message.error(response?.message)
      // }

      return {
        success,
        data: isArray(response?.data) ? response?.data : [],
        total: response?.total,
      }
    },
    {
      manual: true,
      throttleWait: 500,
      debounceWait: 32,
      debounceMaxWait: 1000,
      // loadingDelay: 300,
      // refreshOnWindowFocus: true, // 离屏重新请求
      ...queryFieldServiceOptions,
    },
  )

  const onQueryIsService = useMemo(() => {
    if (!isObject(onQuery)) {
      return false
    }
    const serviceKeys = Object.keys(innerService)
    if (serviceKeys?.length === 0) {
      return false
    }
    // 取 keys 交集
    const matchKeys = intersection(serviceKeys, Object.keys(onQuery as any))

    // 判断 keys 重合度大于 50%，认为传入的是 service
    return matchKeys?.length / serviceKeys?.length >= 0.5
  }, [])

  const queryService: Result<any, any> = onQueryIsService ? onQuery : (innerService as any)
  const [isSearched, setIsSearched] = useSafeState(false)

  const search = useMemoizedFn(async (params: any = {}) => {
    const [error] = await catchPromise(form.validateFields())

    setSelectedItems([])
    if (error) {
      setIsSearched(false)
      queryingParamsRef.current = {}
      queryingExtraParamsRef.current = {}
      queryService.mutate({
        success: false,
        data: [],
        total: 0,
      })
      return
    }
    const formValues = form.getFieldsValue() ?? {}
    const rawParams = {
      ...formValues,
      ...(run(getPaginationParams) ?? paginationParams),
      ...params,
    }
    const { params: currentParams, extraParams: currentExtraParams } = getQueryParams(rawParams)
    persistFormProState.setState(currentParams)
    const response = await queryService.runAsync(currentParams, currentExtraParams)
    setIsSearched(true)
    return response
  })

  const dataSource = propDataSource ?? queryService?.data?.data ?? []
  const getDataSource = useMemoizedFn(() => dataSource)

  const refresh = useMemoizedFn(async (params: any = {}) => {
    const refreshParams = {
      ...(form.getFieldsValue() ?? {}),
      ...paginationParams,
      ...params,
    }
    await search(refreshParams)
    if (paginationParams?.page === 1) {
      return
    }
    // 如果当前页数大于 1，刷新后无数据，则回到第一页
    await delay(100)
    const dataSource = getDataSource()
    const hasData = dataSource?.length > 0
    if (!hasData) {
      setPaginationParams({ page: 1 })
      await delay(100)
      await search({
        ...refreshParams,
        page: 1,
      })
    }
  })

  const renderAutoQueryTrigger = useMemoizedFn(() => (
    <Hook>
      {() => {
        useEffect(() => {
          const applyDefaultSelectedRowKeys = () => {
            const defaultSelectedRowKeys = rowSelection!?.defaultSelectedRowKeys ?? []
            if (defaultSelectedRowKeys!?.length > 0) {
              const currentDataSource = getDataSource()
              setSelectedItems(
                currentDataSource.filter((item: any) => {
                  const key = item?.[String(run<string>(rowKey, undefined, item))]

                  return defaultSelectedRowKeys.includes(key)
                }),
              )
            }
          }
          if (!manualQuery) {
            setTimeout(() => refresh().then(applyDefaultSelectedRowKeys), 128)
          } else {
            setTimeout(applyDefaultSelectedRowKeys, 128)
          }
        }, [manualQuery])

        return null
      }}
    </Hook>
  ))

  const render = useMemoizedFn(() => (
    <div
      className={classnames('f-pro-table-query', {
        'f-pro-table-query-horizontal': queryFieldLayout === 'horizontal',
        'f-pro-table-query-bordered': !pure,
      })}
      style={queryWrapperStyle}
    >
      <QueryFieldForm
        form={form}
        proFormRef={proFormRef}
        // 聚焦状态下，回车键时刷新
        onEnterDown={async () => {
          if (!queryFieldTriggerOnEnter) {
            return
          }
          setPaginationParams({ page: 1 })
          await delay(100)
          refresh({
            page: 1,
          })
        }}
      />
    </div>
  ))
  const latestServiceRef = useLatest(queryService)
  const getService = useMemoizedFn(() => latestServiceRef.current)

  return useMemo(
    () => ({
      hasQueryFields,
      form,
      render,
      service: queryService,
      loading: queryService.loading,
      dataSource,
      mockDataSource,
      createMockDataSource,
      updateMockDataSource,
      paginationParams,
      setPaginationParams,
      getPaginationParams,
      selectedItems,
      setSelectedItems,
      getSelectedItems,
      getQueryingParams,
      getQueryingExtraParams,
      refresh,
      search,
      setExtraParams,
      renderAutoQueryTrigger,
      getService,
      isSearched,
      normalizeFormValues,
      getQueryParams,
      proFormRef,
    }),
    [
      hasQueryFields,
      form,
      render,
      queryService,
      queryService.loading,
      dataSource,
      mockDataSource,
      createMockDataSource,
      updateMockDataSource,
      paginationParams,
      setPaginationParams,
      getPaginationParams,
      selectedItems,
      setSelectedItems,
      getSelectedItems,
      getQueryingParams,
      getQueryingExtraParams,
      setExtraParams,
      renderAutoQueryTrigger,
      getService,
      isSearched,
      normalizeFormValues,
      getQueryParams,
    ],
  )
}, 'queryField')
export default useQueryFieldPlugin
