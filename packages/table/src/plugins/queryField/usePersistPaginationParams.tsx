/* eslint-disable react-hooks/exhaustive-deps */
import { TablePaginationConfig } from 'antd'
import { isObject } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'
import { useProState } from '@fexd/pro-utils'

import { useProps } from '../../utils'

export default function usePersistPaginationParams() {
  const {
    pagination,
    defaultPaginationParams,
    initialPaginationParams,
    defaultPageSize,
    queryFieldPersistKey,
    queryFieldPersistType,
    queryFieldPersistPaginationParamsKeyExcludes,
    queryFieldPersistPaginationParams,
  } = useProps()
  const excludePersistPaginationParamsKey = useMemoizedFn((params: any) => {
    if (!isObject(params)) {
      return params
    }

    return Object.fromEntries(
      Object.entries(params).filter(([key]) => !queryFieldPersistPaginationParamsKeyExcludes.includes(key)),
    )
  })
  const mergedInitialPaginationParams = {
    page: (pagination as TablePaginationConfig)?.defaultCurrent ?? 1,
    pageSize: (pagination as TablePaginationConfig)?.defaultPageSize ?? defaultPageSize,
    ...initialPaginationParams,
    ...defaultPaginationParams,
  }
  const paginationParamsProState = useProState<{ page?: number; pageSize?: number; [key: string]: any }>(
    mergedInitialPaginationParams,
    {
      key:
        queryFieldPersistPaginationParams && queryFieldPersistKey
          ? `qf@${queryFieldPersistKey}:paginationParams`
          : undefined,
      persist: queryFieldPersistType,
      sync: false,
      beforeStatePersist: excludePersistPaginationParamsKey,
      beforeStateRecovery: (state) => {
        const excludedState = excludePersistPaginationParamsKey(state)

        return {
          ...mergedInitialPaginationParams,
          ...excludedState,
        }
      },
    },
  )

  return paginationParamsProState
}
