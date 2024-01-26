/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'

import { useProps } from '../../../utils'
import { ProTableColumnType } from '../../../types'
import useQueryFieldPlugin from '../../queryField'
import { I18nText } from '../../config'

export default function useDataSourceIndexColumn({
  hasWidth = false,
}: {
  hasWidth: boolean
}): ProTableColumnType | undefined {
  const { showDataSourceIndex, dataSourceIndexColumnConfig, dataSourceIndexCalcWithPage } = useProps()

  const queryField = useQueryFieldPlugin(({ paginationParams, dataSource }) => [paginationParams, dataSource])
  const { paginationParams } = queryField

  const dataSourceIndexBase = useMemo(() => {
    const { page = 1, pageSize = 10 } = paginationParams
    return dataSourceIndexCalcWithPage ? (page - 1) * pageSize : 0
  }, [dataSourceIndexCalcWithPage, paginationParams])

  return useMemo<ProTableColumnType | undefined>(
    () =>
      showDataSourceIndex
        ? {
            title: <I18nText text="table.index" />,
            dataIndex: '_index',
            fixed: 'left',
            align: 'center',
            ...(hasWidth ? { width: 70 } : {}),
            render: (value: any, item: any, idx: number) => idx + 1 + dataSourceIndexBase,
            ...dataSourceIndexColumnConfig,
          }
        : undefined,
    [showDataSourceIndex, dataSourceIndexColumnConfig, dataSourceIndexBase, hasWidth],
  )
}
