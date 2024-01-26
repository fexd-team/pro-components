import React from 'react'
import { ConfigProvider, ProTable } from '@fexd/pro-components'
import { delay } from '@fexd/tools'
import { UploadOutlined } from '@ant-design/icons'
import { getMockData } from './data'

const mockData = Array(260).fill('').map(getMockData)

export default () => {
  return (
    <ConfigProvider localeKey="zh-CN">
      <ProTable
        title="表格标题"
        bordered
        iconActions={['refresh', 'table-size', 'fullscreen']}
        actions={['add', { content: '导出', icon: <UploadOutlined /> }]}
        columnActions={['view', 'edit', 'delete']}
        batchActions={['delete', { content: '导出选中数据', icon: <UploadOutlined /> }]}
        selectable
        onQuery={async (params, extraParams) => {
          const { page, pageSize } = params
          await delay(1000)

          const data = mockData.slice((page - 1) * pageSize, page * pageSize)

          return {
            success: true,
            data,
            total: mockData?.length,
          }
        }}
        queryFields={[
          { label: '文本框', name: 'text', type: 'text' },
          { label: '选择框', name: 'select', type: 'select', options: ['选项 1', '选项 2'] },
          { label: '日期', name: 'date', type: 'date' },
          { label: '日期范围', name: 'dateRange', type: 'dateRange' },
          { label: '价格', name: 'money', type: 'money', unit: '￥' },
          { label: '多选框', name: 'multipleSelect', type: 'multipleSelect', options: ['选项 1', '选项 2'] },
          { label: '时间', name: 'time', type: 'time' },
          { label: '时间范围', name: 'timeRange', type: 'timeRange' },
        ]}
        columns={[
          { title: '名称', dataIndex: 'name', editField: true },
          { title: '数字', dataIndex: 'number', valueType: 'number', editField: true },
          {
            title: '百分比',
            dataIndex: 'percent',
            valueType: 'percent',
            editField: true,
            numberLocale: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
          },
          { title: '金额', dataIndex: 'price', valueType: 'money', unit: '￥', editField: true },
          { title: '日期', dataIndex: 'dayjs1_timestamp', valueType: 'date', editField: true },
          { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
        ]}
        defaultPageSize={5}
      />
    </ConfigProvider>
  )
}
