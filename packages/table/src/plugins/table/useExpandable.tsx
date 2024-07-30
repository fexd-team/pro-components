/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useMemo } from 'react'
import { Space, Alert, Table } from 'antd'
import { run, isObject, flatten, isFunction } from '@fexd/tools'
import { ProForm, ProFieldValueFieldType } from '@fexd/pro-form'
import { Action, Hook } from '@fexd/pro-utils'
import { useMemoizedFn } from 'ahooks'

import { useProps } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import useFieldParams from '../editField/useFieldParams'
// import useActionsPlugin from '../actions'
import { getAllFieldFromColumn } from '../valueType'
// import useConfigPlugin, { I18nText } from '../config'
import { ProTableEditFieldType } from '../../types'
import useItem from './useItem'

const flattenChildren: <T extends any[] = any[]>(arr: T) => T = (arr) =>
  flatten(arr.map((item) => [item, flattenChildren(item?.children ?? [])])) as any

export default function useSelectable() {
  const {
    dataSource: propDataSource,
    expandable,
    columns,
    expandableDescriptionConfig,
    expandableProFormRender,
  } = useProps()
  const queryField = useQueryFieldPlugin(({ dataSource }) => [dataSource])
  const { dataSource: tableDataSource } = queryField
  const dataSource = propDataSource ?? tableDataSource

  const customeizedExpandColumn = useMemo(() => columns.includes(Table.EXPAND_COLUMN), [columns])

  const expandViewFields = useMemo<ProTableEditFieldType[]>(
    () =>
      flattenChildren(columns)
        .filter((column) => column?.expandView === true || !!column?.expandViewField)
        .map((column) => {
          const allField = getAllFieldFromColumn(column)

          return allField?.expandViewField ?? allField?.viewField
        })
        .filter(Boolean),
    [columns],
  )

  const expandedRowRender = useMemoizedFn((item: any = {}) => (
    <div className="f-pro-table-expanded-row">
      <Hook item={item}>
        {() => (
          <useItem.Provider value={item}>
            <useFieldParams.Provider
              value={useMemo(() => ({ mode: 'view', viewType: 'expand', form: undefined }) as any, [])}
            >
              <ProForm
                key={useMemo(() => Math.random(), [item])}
                mode="view"
                fields={
                  (expandViewFields ?? []).map((field) => ({
                    ...field,
                    ...(isFunction(field?.hook)
                      ? {
                          hook: ({ form }) => run(field?.hook, undefined, { form, item, mode: 'view', inTable: false }),
                        }
                      : {}),
                  })) as ProFieldValueFieldType[]
                }
                initialValues={{ ...item }}
                render={
                  expandableProFormRender ??
                  (({ renderDescriptions }) => renderDescriptions(expandableDescriptionConfig))
                }
              />
            </useFieldParams.Provider>
          </useItem.Provider>
        )}
      </Hook>
    </div>
  ))

  const expandableConfig = useMemo(
    () =>
      expandViewFields?.length > 0 && dataSource?.length > 0
        ? {
            // fixed: 'right',
            // expandedRowKeys,
            // onExpand
            expandRowByClick: true,
            expandedRowRender,
            ...(isObject(expandable) ? expandable : {}),
          }
        : expandable,
    [expandable, dataSource?.length, customeizedExpandColumn, expandViewFields],
  )

  return expandableConfig
}
