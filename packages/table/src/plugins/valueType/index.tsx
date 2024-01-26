/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { isValidElement } from 'react'
import { run, isString, isObject, isFunction, pickBy, isUndefined } from '@fexd/tools'
import { ProField, valueTypes, ProFieldValueFieldType } from '@fexd/pro-form'

import { createPlugin } from '../../utils'
import { ProTableColumnType, ProTableEditFieldMode, ProTableEditFieldType, ProTableQueryFieldType } from '../../types'

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

export const renderField = (
  field: ProFieldValueFieldType | ProTableEditFieldType | ProTableQueryFieldType,
  config: any = {},
) => {
  const { key, type: fieldTypeName } = field

  return (
    <ProField
      key={isString(key) ? `${key}:${fieldTypeName}` : key ?? fieldTypeName}
      ref={(field as any)?.ref ?? config?.ref}
      {...(field as any)}
    />
  )
}

function useValueType() {
  const types = { ...valueTypes }

  const renderColumn = (column: ProTableColumnType, { mode = 'view', ...restOptions }: any = {}) => {
    const allField = getAllFieldFromColumn(column)

    const field =
      {
        view: allField?.viewField,
        edit: allField?.editField,
        add: allField?.addField,
      }[mode as ProTableEditFieldMode] ?? allField?.viewField

    return renderField(field, { readonly: mode === 'view', ...restOptions })
  }

  return {
    types,
    renderField,
    renderColumn,
  }
}

export const useValueTypePlugin = createPlugin(useValueType, 'valueType')
export default useValueTypePlugin
