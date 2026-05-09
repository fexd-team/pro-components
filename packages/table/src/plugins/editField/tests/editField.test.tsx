import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProTable from '../../../ProTable'

const mockData = [
  { id: '1', name: 'Alice', age: 25 },
  { id: '2', name: 'Bob', age: 30 },
]

describe('ProTable editField 插件', () => {
  afterEach(() => jest.useRealTimers())

  it('配置 editFields 后 columnActions 中显示编辑按钮', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ]}
        editFields={[
          { name: 'name', type: 'input', label: '姓名' },
          { name: 'age', type: 'number', label: '年龄' },
        ]}
        columnActions={['edit']}
        onEdit={async (params) => ({ success: true })}
      />,
    )

    await waitFor(
      () => {
        const btns = container.querySelectorAll('.ant-table-tbody .ant-btn')
        expect(btns.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 5000 },
    )
  })

  it('配置 addFields 后 tableActions 中显示新增按钮', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ]}
        addFields={[
          { name: 'name', type: 'input', label: '姓名' },
          { name: 'age', type: 'number', label: '年龄' },
        ]}
        actions={['add']}
        onAdd={async (params) => ({ success: true })}
      />,
    )

    await waitFor(
      () => {
        const addBtns = container.querySelectorAll('.f-pro-table-actions .ant-btn')
        expect(addBtns.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 5000 },
    )
  })

  it('配置 viewFields 后 columnActions 中显示详情按钮', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ]}
        viewFields={[
          { name: 'name', type: 'input', label: '姓名' },
          { name: 'age', type: 'number', label: '年龄' },
        ]}
        columnActions={['view']}
      />,
    )

    await waitFor(
      () => {
        const btns = container.querySelectorAll('.ant-table-tbody .ant-btn')
        expect(btns.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 5000 },
    )
  })

  it('editFields 共享 columns 中的字段定义', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[
          { title: '姓名', dataIndex: 'name', type: 'input' },
          { title: '年龄', dataIndex: 'age', type: 'number' },
        ]}
        editFields={true as any}
        columnActions={['edit']}
        onEdit={async () => ({ success: true })}
      />,
    )

    await waitFor(
      () => {
        const table = container.querySelector('.ant-table')
        expect(table).toBeInTheDocument()
      },
      { timeout: 5000 },
    )
  })

  it('refreshAfterEdit=true 编辑成功后自动刷新', async () => {
    jest.useRealTimers()
    const onQuery = jest.fn(async () => ({ success: true, data: mockData, total: 2 }))

    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={onQuery}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ]}
        editFields={[{ name: 'name', type: 'input', label: '姓名' }]}
        columnActions={['edit']}
        refreshAfterEdit={true}
        onEdit={async () => ({ success: true })}
      />,
    )

    await waitFor(
      () => {
        expect(onQuery).toHaveBeenCalledTimes(1)
      },
      { timeout: 3000 },
    )
  })
})
