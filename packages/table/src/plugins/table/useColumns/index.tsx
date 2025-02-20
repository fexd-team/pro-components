/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useMemo, isValidElement, useRef } from 'react'
import { Table, Space, Badge, Tag, Typography, Image, Progress, Avatar, Rate } from 'antd'

import { isExist, run, isObject, isArray, isFunction } from '@fexd/tools'
import { Tooltip, Hook, EllipsisTooltip, useTranslation, useLazyRender, Action, ErrorBoundary } from '@fexd/pro-utils'
import { ProFieldValueFieldType, ProFieldValueTypes, ProField, CopyButton, ReadonlyProField } from '@fexd/pro-form'

import { useProps } from '../../../utils'
import useQueryFieldPlugin from '../../queryField'
import useValueTypePlugin, { getAllFieldFromColumn } from '../../valueType'
import {
  ProTableEditFieldType,
  ProTableColumnType,
  ProTableColumnBuiltInRenderConfig,
  ProTableColumnBuiltInRenderType,
} from '../../../types'

import useEditableRow from './useEditableRow'
import useDataSourceIndexColumn from './useDataSourceIndexColumn'
import useActionsColumn from './useActionsColumn'
import useItem from '../useItem'
import useFieldParams from '../../editField/useFieldParams'
import useColumnConfig from '../useColumnConfig'
import useColumnSettings from './useColumnSettings'
import { useMemoizedFn } from 'ahooks'
// import useLazyRenderCell from './useLazyRenderCell'

const defaultEllipsisTypes = ['input', 'text', 'number', 'digit', 'money', 'percent']
const defaultAlignConfig = {
  money: 'right',
  number: 'right',
  digit: 'right',
  percent: 'right',
  select: 'center',
  image: 'center',
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
  const getSingleConfig = useMemoizedFn((column: ProTableColumnType<any>, arrIdx): ProTableColumnType<any> => {
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
    const columnSettingKey =
      column?.key ??
      (`${arrIdx}:${column?.dataIndex ?? column?.name}:${column?.type ?? column?.valueType ?? 'text'}` as any)

    return {
      showSorterTooltip: !!column?.tooltip ? false : true,
      // width: 80,
      align: defaultAlignConfig[valueType as 'money'] as any,
      key: columnSettingKey,
      ...column,
      columnSettingKey,
      render: (value: any, record: any, recordIndex: number, ...args) => (
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
                  props: {
                    ...({
                      image: {
                        imageProps: {
                          width: 50,
                          height: 50,
                        },
                      },
                      slider: {
                        style: {
                          width: 100,
                        },
                      },
                    }[viewField?.type as any] ?? {}),
                    ...viewField?.props,
                  },
                  label: undefined,
                },
              }
            }, [column])

            const key = record?.[String(run<string>(rowKey, undefined, record))]
            const rowEditable = editableRowController.useEditable(key)
            const editable = !!editField && rowEditable

            if (!editable && isFunction(column?.render)) {
              const columnRenderResult = run(column, 'render', value, record, recordIndex, ...args)

              if (isObject(columnRenderResult) && 'builtIn' in columnRenderResult) {
                const config = columnRenderResult as ProTableColumnBuiltInRenderConfig

                return (
                  <Hook key={column?.key ?? String(column?.dataIndex)} value={value}>
                    {() => {
                      const props: any = config?.props ?? {}
                      const content = props?.children ?? props?.content ?? value
                      return (
                        (
                          {
                            text: <Typography.Text {...props}>{content}</Typography.Text>,
                            link: <Typography.Link {...props}>{content}</Typography.Link>,
                            tag: <Tag {...props}>{value}</Tag>,
                            button: (
                              <Action size="small" {...props}>
                                {content}
                              </Action>
                            ),
                            avatar: <Avatar src={value} {...props} />,
                            badge: <Badge status="default" text={value} {...props} />,
                            image: <Image height={60} src={value} {...props} />,
                            progress: <Progress percent={value} showInfo={false} {...props} />,
                            rate: <Rate allowHalf disabled value={value} {...props} />,
                            field: <ProField mode="view" value={value} {...props} />,
                          } as Record<ProTableColumnBuiltInRenderType, any>
                        )[(config?.builtIn as ProTableColumnBuiltInRenderType) ?? 'text'] ?? <>{value}</>
                      )
                    }}
                  </Hook>
                )
              }

              return columnRenderResult
            }

            return (
              <Hook key={column?.key ?? String(column?.dataIndex)} value={value}>
                {() => {
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
                                  const dynamicField = run<ProTableEditFieldType | false>(
                                    fieldConfig?.hook,
                                    undefined,
                                    {
                                      item: record,
                                      form: editableRowController.getForm(key),
                                      mode: !editable ? 'view' : 'edit',
                                      inTable: true,
                                    },
                                  )

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

                  const lazyContent = useLazyRender(
                    fieldConfig?.lazyRender ?? {
                      forceVisible: !lazyRenderCell || editable,
                      ...(isObject(lazyRenderCell) ? (lazyRenderCell as any) : {}),
                      placeholderWrapperClassName: 'f-pro-table-cell-placeholder',
                      placeholder: (
                        <ErrorBoundary mode="inline">
                          <span className="f-pro-table-cell-placeholder-content">
                            {isValidElement(value) ? value : '--'}
                          </span>
                        </ErrorBoundary>
                      ),
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

                  if (!isExist(value) && !editable) {
                    return '--'
                  }

                  return <>{wrapperedContent}</>

                  // return '--'

                  // return editable ? content : lazyContent
                }}
              </Hook>
            )
          }}
        </Hook>
      ),
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
  })

  const allColumns: ProTableColumnType<any>[] = useMemo(
    () =>
      (propColumns ?? [])
        .filter(Boolean)
        .filter((column) => column?.hidden !== true)
        .map(getSingleConfig) as ProTableColumnType<any>[],
    [propColumns],
  )

  const applyColumnSettings = useColumnSettings({ allColumns })

  const columns: ProTableColumnType<any>[] = useMemo(
    () => applyColumnSettings(allColumns ?? []),
    [applyColumnSettings, allColumns],
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
