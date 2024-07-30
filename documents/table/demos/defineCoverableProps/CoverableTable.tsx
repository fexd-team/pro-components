import React from 'react'
import { ProTable, useCoverable } from '@fexd/pro-components'
import { delay } from '@fexd/tools'
import { UploadOutlined } from '@ant-design/icons'

import { getMockData } from './data'

const mockData = Array(260).fill('').map(getMockData)

const CoverableTable = useCoverable.component(() => {
  const proTableProps = ProTable.defineCoverableProps({
    title: '表格标题',
    bordered: true,
    addFieldColumns: 2,
    iconActions: {
      刷新: 'refresh',
      表格尺寸: 'table-size',
      全屏: 'fullscreen',
    },
    actions: {
      新增: 'add',
      导出: { content: '导出', icon: <UploadOutlined /> },
    },
    columnActions: ['view', 'edit', 'delete'],
    batchActions: {
      删除: 'delete',
      导出选中数据: { content: '导出选中数据', icon: <UploadOutlined /> },
    },
    selectable: true,
    queryFields: {
      文本框: { label: '文本框', name: 'text', type: 'text' },
      选择框: { label: '选择框', name: 'select', type: 'select', options: ['选项 1', '选项 2'] },
      日期: { label: '日期', name: 'date', type: 'date' },
      日期范围: { label: '日期范围', name: 'dateRange', type: 'dateRange' },
      价格: { label: '价格', name: 'money', type: 'money', unit: '￥' },
      多选框: {
        label: '多选框',
        name: 'multipleSelect',
        type: 'multipleSelect',
        options: ['选项 1', '选项 2'],
      },
      时间: { label: '时间', name: 'time', type: 'time' },
      时间范围: { label: '时间范围', name: 'timeRange', type: 'timeRange' },
    },
    onQuery: async (params, extraParams) => {
      const { page, pageSize } = params
      await delay(1000)

      const data = mockData.slice((page - 1) * pageSize, page * pageSize)

      return {
        success: true,
        data: data,
        total: mockData?.length,
      }
    },
    columns: {
      名称: { title: '名称', dataIndex: 'name', editField: true },
      数字: { title: '数字', dataIndex: 'number', valueType: 'number', editField: true },
      百分比: {
        title: '百分比',
        dataIndex: 'percent',
        valueType: 'percent',
        render: () => ({
          builtIn: 'text',
        }),
        editField: {
          dependencies: ['number'],
          hook: () => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { mode, item, form } = ProTable.useFieldParams()
            const depValue = form?.getFieldValue('number')

            return {
              key: depValue,
              initialValue: depValue,
            }
          },
        },
        numberLocale: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      },
      金额: { title: '金额', dataIndex: 'price', valueType: 'money', unit: '￥', editField: true },
      日期: { title: '日期', dataIndex: 'dayjs1_timestamp', valueType: 'date', editField: true },
      距今: { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
    },
    defaultPageSize: 5,
  })

  const config = useCoverable({
    proTableProps,
  })

  return useCoverable.props(config).render(() => (
    <>
      <ProTable {...config?.getConfig()?.proTableProps?.getProps()} />
    </>
  ))
})

export default CoverableTable
