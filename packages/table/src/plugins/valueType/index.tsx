/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { isValidElement } from 'react'
import { run, isString, isObject, isFunction, pickBy, isUndefined } from '@fexd/tools'
import { ProField, valueTypes, ProFieldValueFieldType } from '@fexd/pro-form'

import { createPlugin } from '../../utils'
import { ProTableColumnType, ProTableEditFieldMode, ProTableEditFieldType, ProTableQueryFieldType } from '../../types'

import { getFieldFromColumn, getAllFieldFromColumn } from './helpers'

export { getFieldFromColumn, getAllFieldFromColumn }

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
