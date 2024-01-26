import { useMemo } from 'react'
import { flatten } from '@fexd/tools'

import { getFieldFromColumn } from '../valueType'
import { useProps, flattenChildren } from '../../utils'
import { ProTableQueryFieldType } from '../../types'

export default function useFieldsConfig() {
  const { columns, queryFields: propsQueryFields } = useProps()
  const columnQueryFields = useMemo(
    () =>
      flattenChildren(columns)
        .map((col: any) => {
          if (!col?.queryField) {
            return undefined
          }

          return getFieldFromColumn(col, 'queryField')
        })
        .filter(Boolean),
    [columns],
  )

  const rawQueryFields = propsQueryFields ?? columnQueryFields

  const queryFields = flatten<ProTableQueryFieldType>(rawQueryFields)

  const queryFieldsMap = useMemo<Record<string, ProTableQueryFieldType>>(
    () =>
      Object.assign(
        {},
        ...queryFields.map((field: ProTableQueryFieldType) => {
          return {
            [String(field?.name)]: field,
          }
        }),
      ),
    [queryFields],
  )

  return { rawQueryFields, queryFields, queryFieldsMap }
}
