/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useMemo } from 'react'
import { Select, Input } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { run, isObject, classnames, clamp, isNumber, isArray } from '@fexd/tools'
import hoistStatic from 'hoist-non-react-statics'
import { useMemoizedFn } from 'ahooks'

import { Button, Hook, useForceUpdate } from '@fexd/pro-utils'

import { useProps } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import useConfigPlugin, { I18nText } from '../config'
import { ProTableProps } from '../../types'

const SelectComponentClass = hoistStatic((props: any) => {
  const { size } = useConfigPlugin(({ size }) => [size])

  return (
    <Select
      {...props}
      placement="topRight"
      size={size === 'small' ? 'small' : 'middle'}
      // 尝试修复分页器展开抖动问题，原理未知
      getPopupContainer={(triggerNode) =>
        triggerNode?.parentNode?.parentNode ?? triggerNode?.parentNode ?? document.body
      }
    />
  )
}, Select)

// 默认分页器配置
function useDefaultPagination(): ProTableProps['pagination'] {
  const { queryAfterPaginationChange, pure } = useProps()
  const { size } = useConfigPlugin(({ size }) => [size])
  const queryField = useQueryFieldPlugin(({ loading, paginationParams, selectedItems, dataSource }) => [
    loading,
    paginationParams,
    selectedItems,
    dataSource,
  ])

  const handleChange = useMemoizedFn(async (page = 1, pageSize: number) => {
    const { page: prevPage, pageSize: prevPageSize } = queryField?.getPaginationParams() ?? {}
    if (`${prevPage}:${prevPageSize}` === `${page}:${pageSize}`) {
      return
    }
    queryField?.setPaginationParams((prevParams) => ({
      page: prevParams?.pageSize !== pageSize ? 1 : page,
      pageSize,
    }))
    if (queryAfterPaginationChange) {
      queryField.search()
    }
  })

  const showTotal = useMemoizedFn((total: any) => <I18nText text="table.totalDataCount" config={{ total }} />)

  return useMemo(
    () => ({
      size: size === 'small' ? 'small' : 'default',
      pageSizeOptions: [5, 10, 20, 50],
      showQuickJumper: true,
      showSizeChanger: true,
      current: queryField?.paginationParams?.page,
      pageSize: queryField?.paginationParams?.pageSize,
      hideOnSinglePage: pure ? true : false,
      selectComponentClass: SelectComponentClass,
      total: queryField?.service?.data?.total,
      showTotal,
      onChange: handleChange,
    }),
    [
      size,
      queryField?.paginationParams?.page,
      queryField?.paginationParams?.pageSize,
      queryField?.service?.data?.total,
    ],
  )
}

// 未知数据长度的分页器
function useUnknownLengthPagination() {
  const { dataSource: propDataSource, pagination, unknownDataLength: propUnknownDataLength } = useProps()

  const queryField = useQueryFieldPlugin(({ loading, paginationParams, selectedItems, dataSource }) => [
    loading,
    paginationParams,
    selectedItems,
    dataSource,
  ])
  const { paginationParams, setPaginationParams, dataSource: tableDataSource } = queryField
  const dataSource = propDataSource ?? tableDataSource
  const unknownDataLength = propUnknownDataLength && !isNumber((pagination as any)?.total)
  const maxPage = dataSource?.length < (paginationParams?.pageSize as any) ? paginationParams?.page : undefined
  const changePage = useMemoizedFn((page: number) => {
    setPaginationParams({
      page: clamp(page, 1, maxPage),
    })
    queryField.search()
  })

  const itemRender = useMemoizedFn((page: any, type: any, originalElement: any) => {
    // console.log(page, type)
    if (type === 'page') {
      return (
        <Hook>
          {() => {
            const { paginationParams } = useQueryFieldPlugin(({ paginationParams }) => [paginationParams])
            const ref = useRef<any>()
            const [forceUpdate, renderKey] = useForceUpdate() as any
            const { size } = useConfigPlugin(({ size }) => [size])

            return (
              <Input
                key={`${String(paginationParams?.page)}:${renderKey}`}
                ref={ref as any}
                size={size == 'small' ? 'small' : 'middle'}
                defaultValue={paginationParams?.page}
                onPressEnter={() => {
                  // console.log(ref.current)
                  changePage(Number((ref.current?.input?.value ?? '0').replace(/\D/g, '')))
                  run(ref.current?.input, 'blur')
                }}
                style={{ display: 'block', margin: size == 'small' ? '0 2px' : undefined }}
                onBlur={() => {
                  forceUpdate()
                }}
              />
            )
          }}
        </Hook>
      )
    }

    if (['next', 'prev'].includes(type)) {
      return (
        <Hook>
          {() => {
            const { size } = useConfigPlugin(({ size }) => [size])
            const { paginationParams, dataSource } = useQueryFieldPlugin(({ paginationParams, dataSource }) => [
              paginationParams,
              dataSource?.length,
            ])

            return (
              <Button
                // onMouseEnter={e => e.stopPropagation()}
                size={size === 'small' ? 'small' : 'middle'}
                type={size === 'small' ? 'text' : 'default'}
                className="f-pro-table-pagination-item-link"
                disabled={
                  {
                    prev: paginationParams?.page === 1,
                    next: isNumber(paginationParams?.pageSize)
                      ? dataSource?.length < paginationParams?.pageSize
                      : false,
                  }[type as 'prev'] ?? false
                }
                icon={
                  {
                    next: <RightOutlined />,
                    prev: <LeftOutlined />,
                  }[type as 'next']
                }
                onClick={(...args) => {
                  changePage(
                    (paginationParams?.page as number) +
                      ({
                        next: 1,
                        prev: -1,
                      }[type as 'next'] ?? 0),
                  )
                }}
              />
            )
          }}
        </Hook>
      )
    }

    return originalElement
  })

  return useMemo(
    () => ({
      unknownDataLength,
      overrideConfig: (unknownDataLength
        ? {
            total: 1,
            showTotal: false,
            showTitle: false,
            itemRender,
          }
        : {}) as typeof pagination,
    }),
    [unknownDataLength],
  )
}

export default function usePagination(): ProTableProps['pagination'] {
  const { dataSource: propDataSource, pagination: propPagination, sticky } = useProps()

  const queryField = useQueryFieldPlugin(({ loading, paginationParams, selectedItems, dataSource }) => [
    loading,
    paginationParams,
    selectedItems,
    dataSource,
  ])
  const { paginationParams, dataSource: tableDataSource } = queryField
  // const dataSource = propDataSource ?? tableDataSource
  const { unknownDataLength, overrideConfig: unknownLengthPaginationOverrideConfig } = useUnknownLengthPagination()
  const defaultConfig = useDefaultPagination()
  const serviceIsSuccess = isArray(propDataSource) ? true : queryField?.service?.data?.success

  const mergedPaginationConfig = useMemo(
    () => ({
      ...defaultConfig,
      // @ts-ignore
      ...(defaultConfig?.total === 0 && paginationParams?.page > 1
        ? {
            // @ts-ignore
            total: paginationParams?.page * paginationParams?.pageSize - 1,
            showTotal: undefined,
          }
        : {}),
      ...unknownLengthPaginationOverrideConfig,
      ...(isObject(propPagination) ? propPagination : {}),
      ...(unknownDataLength ? { hideOnSinglePage: false } : {}),
      ...(serviceIsSuccess === false
        ? {
            total: 1,
            showTotal: undefined,
          }
        : {}),
      style: {
        ...(isNumber((sticky as any)?.offsetBottom)
          ? {
              bottom: (sticky as any)?.offsetBottom,
            }
          : {}),
        ...((propPagination as any)?.style ?? {}),
      },
      className: classnames('f-pro-table-pagination', (propPagination as any)?.className, {
        'f-pro-table-no-total': unknownDataLength,
      }),
    }),
    [
      serviceIsSuccess,
      unknownLengthPaginationOverrideConfig,
      propPagination,
      unknownDataLength,
      defaultConfig,
      (sticky as any)?.offsetBottom,
    ],
  )

  if (propPagination === false) {
    return false
  }

  if (
    queryField?.service?.data?.success === true &&
    (propDataSource ?? queryField?.service?.data?.data)?.length === 0 &&
    queryField?.service?.data?.total === 0 &&
    paginationParams?.page === 1
  ) {
    return false
  }

  return mergedPaginationConfig
}
