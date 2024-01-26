import { useMemo, useCallback } from 'react'
import { run } from '@fexd/tools'
import { useProps, flattenChildren } from '../../utils'
import { getFieldFromColumn, getAllFieldFromColumn } from '../valueType'
import { ProTableEditFieldsConfig, ProTableEditFieldMode, ProTableEditFieldType } from '../../types'
import { isUndefined } from 'lodash'

function useColumnFields(propKey: string): ProTableEditFieldType[] {
  const { columns } = useProps()
  const columnFields = useMemo<ProTableEditFieldType[]>(
    () =>
      flattenChildren(columns ?? [])
        .map((col: any) => {
          if (col?.[propKey] === false) {
            return undefined
          }

          if (isUndefined(col?.[propKey])) {
            const editField = getFieldFromColumn(col, 'editField')
            if (editField) {
              return editField
            }
          }

          if (['editField', 'viewField'].includes(propKey)) {
            return getFieldFromColumn(col, propKey)
          }

          const allField = getAllFieldFromColumn(col)

          if (propKey === 'addField') {
            return allField?.addField ?? allField?.editField
          }

          return undefined
        })
        .filter(Boolean),
    [columns, propKey],
  )

  return columnFields
}

function useSingleFieldsConfig({ propKey, columnKey }: { propKey: string; columnKey: string }) {
  const props = useProps()
  const columnFields = useColumnFields(columnKey)
  const source = !(props as any)?.[propKey] ? 'column' : 'props'
  const getFields = (props as any)?.[propKey] ?? columnFields

  // console.log({ props, propKey })

  const getSingleFieldsConfig = useCallback(
    (item, ...args: any[]) => {
      const fields = run<any>(getFields, undefined, item, ...args)

      const isAvailable = fields?.length > 0

      if (!isAvailable) {
        return undefined
      }

      return {
        isAvailable,
        fields,
        source,
      } as ProTableEditFieldsConfig
    },
    [getFields],
  )

  return getSingleFieldsConfig
}

export default function useAllFieldsConfig() {
  const getEditFieldsConfig = useSingleFieldsConfig({
    propKey: 'editFields',
    columnKey: 'editField',
  })

  const justGetViewFieldsConfig = useSingleFieldsConfig({
    propKey: 'viewFields',
    columnKey: 'viewField',
  })

  const justGetAddFieldsConfig = useSingleFieldsConfig({
    propKey: 'addFields',
    columnKey: 'addField',
  })

  const getAddFieldsConfig = useCallback(() => {
    const addFields = run(justGetAddFieldsConfig, undefined, undefined, 'add')
    const editFields = run(getEditFieldsConfig, undefined, undefined, 'add')

    return addFields ?? editFields
  }, [getEditFieldsConfig, justGetAddFieldsConfig])

  const getViewFieldsConfig = useCallback(
    (item) => {
      const viewFields = run(justGetViewFieldsConfig, undefined, item, 'view')
      const editFields = run(getEditFieldsConfig, undefined, item, 'view')

      return viewFields ?? editFields
    },
    [getEditFieldsConfig, justGetViewFieldsConfig],
  )

  const getFieldsConfig = useCallback(
    (item, mode: ProTableEditFieldMode) =>
      run<ProTableEditFieldsConfig>(
        {
          view: getViewFieldsConfig,
          add: getAddFieldsConfig,
          edit: getEditFieldsConfig,
        },
        mode,
        item,
        mode,
      ) ?? { fields: [], isAvailable: false },
    [getViewFieldsConfig, getAddFieldsConfig, getEditFieldsConfig],
  )

  return getFieldsConfig
}
