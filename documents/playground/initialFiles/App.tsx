import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { delay } from '@fexd/tools'
import { UploadOutlined } from '@ant-design/icons'

export default () => {
  const controller = ProTable.useController()

  return (
    <ProTable
      ref={controller.ref}
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

        const data = controller.createMockDataSource(pageSize)

        return {
          success: true,
          data,
          total: 260,
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
        { label: '名称', name: 'name', editField: true },
        { label: '数字', name: 'number', type: 'number', editField: true },
        {
          label: '百分比',
          name: 'percent',
          type: 'percent',
          editField: true,
          numberLocale: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
        },
        { label: '金额', name: 'price', type: 'money', unit: '￥', editField: true },
        { label: '日期', name: 'dayjs1_timestamp', type: 'date', editField: true },
        { label: '距今', name: 'dayjs1_timestamp', type: 'fromNow' },
        { label: '图片', name: 'image', type: 'image' },
      ]}
      defaultPageSize={5}
    />
  )
}
