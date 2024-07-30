import { isValidElement } from 'react'
import { run, isObject, isFunction, pickBy, isUndefined } from '@fexd/tools'

import { ProTableColumnType, ProTableEditFieldType, ProTableQueryFieldType } from '../../types'

export function getFieldFromColumn(column: ProTableColumnType, propKey: string) {
  if (propKey !== 'viewField' && !(column as any)?.[propKey]) {
    return
  }

  let propConfig = (column as any)?.[propKey]

  if (propConfig === false) {
    return null
  }

  if (propConfig === true) {
    propConfig = {}
  }

  const extendConfigs: any = pickBy(
    {
      label: column?.label ?? column?.title,
      name: column?.name ?? column?.dataIndex,
      type: column?.type ?? column?.valueType,
      options: column?.options ?? column?.valueEnum,
      tooltip: column?.tooltip,
      format: column?.format,
      unit: column?.unit,
      digits: column?.digits,
      fromNowTooltip: column?.fromNowTooltip,
      numberLocale: column?.numberLocale,
      currencyLocale: column?.currencyLocale,
      builtInRule: column?.builtInRule,
      copyable: column?.copyable,
      lazyRender: column?.lazyRender,
    },
    (value) => !isUndefined(value),
  )

  if (isFunction(propConfig)) {
    const getterName = String(extendConfigs?.name)

    return {
      ...extendConfigs,
      shouldUpdate: true,
      hook: (...args: any[]) => {
        let customizedField = run<any>(propConfig, undefined, ...args)

        if (customizedField === true) {
          customizedField = {}
        }

        if (isObject(customizedField) && !isValidElement(customizedField)) {
          return {
            ...extendConfigs,
            ...customizedField,
            name: getterName,
          }
        }

        return customizedField
      },
    }
  }

  return {
    ...extendConfigs,
    ...propConfig,
  }
}

export function getAllFieldFromColumn(column: ProTableColumnType) {
  const queryField = getFieldFromColumn(column, 'queryField') as ProTableQueryFieldType
  const viewField = getFieldFromColumn(column, 'viewField') as ProTableEditFieldType
  const editField = getFieldFromColumn(column, 'editField') as ProTableEditFieldType
  const addField = getFieldFromColumn(column, 'addField') as ProTableEditFieldType
  const expandViewField = getFieldFromColumn(column, 'expandViewField') as ProTableEditFieldType

  return {
    queryField,
    editField,
    viewField,
    addField,
    expandViewField,
    column,
  }
}
