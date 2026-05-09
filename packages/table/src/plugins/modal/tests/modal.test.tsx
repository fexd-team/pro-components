import React from 'react'
import { render, waitFor, fireEvent, act } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProTable from '../../../ProTable'

const mockData = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

describe('ProTable modal 插件', () => {
  afterEach(() => jest.useRealTimers())

  it('ProTable 内部渲染 ModalStation', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await waitFor(
      () => {
        const table = container.querySelector('.ant-table')
        expect(table).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('点击新增按钮弹出 Modal', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name', type: 'input' }]}
        addFields={[{ name: 'name', type: 'input', label: '姓名' }]}
        actions={['add']}
        onAdd={async () => ({ success: true })}
      />,
    )

    await waitFor(
      () => {
        const addBtn = container.querySelector('.f-pro-table-actions .ant-btn')
        expect(addBtn).toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    const addBtn = container.querySelector('.f-pro-table-actions .ant-btn')
    fireEvent.click(addBtn!)

    await waitFor(
      () => {
        const modal = document.querySelector('.ant-modal')
        expect(modal).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('Modal 包含 i18n 按钮文案', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        localeKey="zh-CN"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name', type: 'input' }]}
        addFields={[{ name: 'name', type: 'input', label: '姓名' }]}
        actions={['add']}
        onAdd={async () => ({ success: true })}
      />,
    )

    await waitFor(
      () => {
        const addBtn = container.querySelector('.f-pro-table-actions .ant-btn')
        expect(addBtn).toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    const addBtn = container.querySelector('.f-pro-table-actions .ant-btn')
    fireEvent.click(addBtn!)

    await waitFor(
      () => {
        const modal = document.querySelector('.ant-modal')
        expect(modal).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
