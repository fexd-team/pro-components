/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useMemo, isValidElement, useRef } from 'react'
import { Table, Space } from 'antd'
// import { useLatest, useMemoizedFn, useWhyDidYouUpdate } from 'ahooks'
import { isExist, run, isObject, isArray, isFunction, classnames } from '@fexd/tools'
import { Tooltip, Hook, EllipsisTooltip, useTranslation, useLazyRender } from '@fexd/pro-utils'
import { ProFieldValueFieldType, ProFieldValueTypes, ProField, CopyButton, ReadonlyProField } from '@fexd/pro-form'

import { useProps } from '../../../utils'
import useQueryFieldPlugin from '../../queryField'
import useValueTypePlugin, { getAllFieldFromColumn } from '../../valueType'
import { ProTableEditFieldType, ProTableColumnType } from '../../../types'

import useEditableRow from './useEditableRow'
import useDataSourceIndexColumn from './useDataSourceIndexColumn'
import useActionsColumn from './useActionsColumn'
import useItem from '../useItem'
import useFieldParams from '../../editField/useFieldParams'
import useColumnConfig from '../useColumnConfig'
// import useLazyRenderCell from './useLazyRenderCell'

const defaultEllipsisTypes = ['input', 'text', 'number', 'digit', 'money', 'percent']
const defaultAlignConfig = {
  money: 'right',
  number: 'right',
  digit: 'right',
  percent: 'right',
  select: 'center',
}

// let renderTimes = 0
// let globalRenderTime = 0

// Object.assign(window, {
//   getCellTime() {
//     return `平均时间：${(globalRenderTime / renderTimes).toFixed(2)}ms，总计渲染次数：${renderTimes}`
//   },
// })

export default function useColumns(): ProTableColumnType[] {
  const {
    columns: propColumns,
    rowKey,
    dataSource: propDataSource,
    hideColumnsWhenNoData,
    lazyRenderCell: getLazyRenderCell,
    lightweightRenderCell,
  } = useProps()
  const { types } = useValueTypePlugin(() => [])
  const queryField = useQueryFieldPlugin(({ dataSource }) => [dataSource])
  const { dataSource: tableDataSource } = queryField
  const dataSource = propDataSource ?? tableDataSource
  const editableRowController = useEditableRow()

  const columnIndexRef = useRef(0)
  columnIndexRef.current = 0
  const getSingleConfig = (column: ProTableColumnType<any>): ProTableColumnType<any> => {
    if ([Table.EXPAND_COLUMN, Table.SELECTION_COLUMN].some((builtInColumn) => builtInColumn === column)) {
      return column
    }

    if (isArray(column?.children)) {
      return {
        ...column,
        children: column?.children.map(getSingleConfig),
      }
    }

    const valueType = column?.valueType ?? column?.type
    const ellipsis = column?.ellipsis ?? (defaultEllipsisTypes.includes(valueType as any) || !valueType)
    const columnIndex = columnIndexRef.current++ - 1

    return {
      render: (value: any, record: any, recordIndex: number) => (
        <Hook key={column?.key ?? String(column?.dataIndex)} value={value}>
          {() => {
            const { editField, viewField } = useMemo(() => {
              const { editField, viewField } = getAllFieldFromColumn({
                ...column,
                viewField: !column?.viewField ? true : column?.viewField,
              })

              return {
                editField,
                viewField: {
                  ...viewField,
                  label: undefined,
                },
              }
            }, [column])

            const key = record?.[String(run<string>(rowKey, undefined, record))]
            const rowEditable = editableRowController.useEditable(key)
            const editable = !!editField && rowEditable
            const { t } = useTranslation()

            const fieldConfig = (editable ? editField : viewField) ?? viewField
            const needEllipsisTooltip =
              column?.ellipsis ??
              ((!editable && defaultEllipsisTypes.includes(valueType as any)) || (!valueType && isExist(value)))

            const lazyRenderCell = useMemo(
              () =>
                run(getLazyRenderCell, undefined, {
                  dataSource, // any[];
                  column, // ProTableColumnType<any>;
                  item: record, // any;
                  field: fieldConfig, // ProTableEditFieldType<any>;
                  xIndex: columnIndex,
                  yIndex: recordIndex,
                  isActionColumn: false,
                }),
              [getLazyRenderCell, dataSource, column, record, fieldConfig, columnIndex, recordIndex],
            )

            const content = useMemo(() => {
              function getFieldConfig(extendFieldConfig: ProFieldValueFieldType) {
                const fieldEditable = editable && extendFieldConfig?.mode !== 'view'
                const fieldTypeName: ProFieldValueTypes = extendFieldConfig?.type ?? 'text'
                const fieldType: any = types?.[fieldTypeName] ?? types.text
                const initialValue = run(fieldType, 'normalizeFieldValue', value) ?? value
                const fieldNamePath = fieldEditable ? extendFieldConfig?.name : undefined
                const form = fieldEditable ? editableRowController.getForm(key) : false

                const field: ProFieldValueFieldType = {
                  ...extendFieldConfig,
                  fromNowTooltip: extendFieldConfig?.fromNowTooltip ?? false,
                  copyable: false, // needEllipsisTooltip ? false : extendFieldConfig?.copyable,
                  form,
                  initialValue,
                  label: undefined,
                  style: { margin: 0 },
                  name: fieldNamePath,
                }

                editableRowController.setFieldConfig(key, column?.dataIndex, {
                  type: fieldTypeName,
                  name: fieldNamePath,
                })

                return field
              }

              const fieldProps: ProFieldValueFieldType = {
                preserve: false,
                mode: editable ? 'edit' : 'view',
                copyable: false,
                initialValue: value,
                label: undefined,
                ...getFieldConfig(fieldConfig as any),
              }

              const fieldNode =
                lightweightRenderCell && !editable ? (
                  <ReadonlyProField static {...fieldProps} />
                ) : (
                  <ProField
                    {...fieldProps}
                    // @ts-ignore
                    // static={!editable}
                    hook={
                      isFunction(fieldConfig?.hook)
                        ? () => {
                            const dynamicField = run<ProTableEditFieldType | false>(fieldConfig?.hook, undefined, {
                              item: record,
                              form: editableRowController.getForm(key),
                              mode: !editable ? 'view' : 'edit',
                              inTable: true,
                            })

                            if (dynamicField === false) {
                              return getFieldConfig({ mode: 'view', key: 'view', ...viewField } as any)
                            }

                            if (!isValidElement(dynamicField) && isObject(dynamicField)) {
                              dynamicField.label = undefined
                              delete dynamicField.name
                              delete dynamicField.hook
                              delete dynamicField.copyable // 单元格内已额外处理复制图标，此处不需处理
                            }

                            return dynamicField
                          }
                        : undefined
                    }
                  />
                )

              return fieldNode
            }, [key, value, record, editable, t, fieldConfig?.options, ellipsis, needEllipsisTooltip])

            // const copyButton = useLazyRender({
            //   forceVisible: !lazyRenderCell,
            //   ...(isObject(lazyRenderCell) ? (lazyRenderCell as any) : {}),
            //   placeholder: null,
            //   content: (
            //     <CopyButton text={String(value)} {...(isObject(fieldConfig?.copyable) ? fieldConfig?.copyable : {})} />
            //   ),
            // })

            const lazyContent = useLazyRender(
              fieldConfig?.lazyRender ?? {
                forceVisible: !lazyRenderCell,
                ...(isObject(lazyRenderCell) ? (lazyRenderCell as any) : {}),
                placeholderWrapperClassName: 'f-pro-table-cell-placeholder',
                placeholder: <span className="f-pro-table-cell-placeholder-content">{value}</span>,
                content,
              },
            )

            const fieldParamsContext = useMemo(
              () => ({ mode: 'view', viewType: 'table', form: editableRowController.getForm(key) }),
              [],
            )

            const wrapperedContent = (
              <useColumnConfig.Provider value={column}>
                <useItem.Provider value={record}>
                  <useFieldParams.Provider value={fieldParamsContext}>
                    <>{lazyContent}</>
                  </useFieldParams.Provider>
                </useItem.Provider>
              </useColumnConfig.Provider>
            )

            if (needEllipsisTooltip) {
              return (
                <div className="f-pro-table-ellipsis-cell">
                  {isExist(value) && fieldConfig?.copyable && (
                    <CopyButton
                      text={String(value)}
                      {...(isObject(fieldConfig?.copyable) ? fieldConfig?.copyable : {})}
                    />
                  )}
                  <EllipsisTooltip tooltipContent={content}>{wrapperedContent}</EllipsisTooltip>
                </div>
              )
            }

            // const startRenderTime = React.useRef(0)
            // useMemo(() => {
            //   startRenderTime.current = Date.now()
            // }, [Math.random()])
            // React.useEffect(() => {
            //   const currentTime = Date.now()
            //   const timeSpend = currentTime - startRenderTime.current

            //   globalRenderTime += timeSpend
            //   renderTimes++
            // }, [Math.random()])

            if (!isExist(value)) {
              return '--'
            }

            return <>{wrapperedContent}</>

            // return '--'

            // return editable ? content : lazyContent
          }}
        </Hook>
      ),
      showSorterTooltip: !!column?.tooltip ? false : true,
      // width: 80,
      align: defaultAlignConfig[valueType as 'money'] as any,
      ...column,
      dataIndex: column?.dataIndex ?? column?.name,
      ellipsis,
      onCell:
        column?.onCell ??
        // 内部处理 ellipsis 时单元格宽度未做限制导致属性无效的问题
        (ellipsis
          ? () => ({
              style: {
                maxWidth: column?.width ?? 300,
              },
            })
          : undefined),
      title: !column?.tooltip ? (
        column?.title ?? column?.label
      ) : (
        <Space size={6}>
          {column?.title ?? column?.label}
          <Tooltip config={column?.tooltip} />
        </Space>
      ),
    }
  }

  const columns: ProTableColumnType<any>[] = useMemo(
    () =>
      (propColumns ?? [])
        .filter(Boolean)
        .filter((column) => column?.hidden !== true)
        .map(getSingleConfig) as ProTableColumnType<any>[],
    [propColumns],
  )

  const hasWidth = useMemo(() => (columns ?? []).some((col) => isExist(col?.width)), [columns])

  const actionsColumn = useActionsColumn({
    editableRowController,
    hasWidth,
  })
  const dataSourceColumn = useDataSourceIndexColumn({ hasWidth })

  return useMemo<ProTableColumnType<any>[]>(
    () =>
      (hideColumnsWhenNoData && dataSource?.length === 0
        ? []
        : [dataSourceColumn, ...columns, actionsColumn].filter(Boolean)) as ProTableColumnType<any>[],
    [hideColumnsWhenNoData, dataSource?.length, dataSourceColumn, columns, actionsColumn],
  )
}