import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProTable from '../../../ProTable'

const mockData = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

describe('ProTable Toolbar', () => {
  afterEach(() => jest.useRealTimers())

  it('title 属性渲染标题', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        title="我的表格"
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await delay(300)
    expect(container.textContent).toContain('我的表格')
  })

  it('iconActions=[refresh] 渲染刷新按钮', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        title="刷新测试"
        iconActions={['refresh']}
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await delay(300)
    const iconBtns = container.querySelectorAll('.f-pro-table-icon-actions .ant-btn')
    expect(iconBtns.length).toBeGreaterThanOrEqual(1)
  })

  it('iconActions=[table-size] 渲染尺寸控制按钮', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        title="尺寸控制"
        iconActions={['table-size']}
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await delay(300)
    const iconBtns = container.querySelectorAll('.f-pro-table-icon-actions .ant-btn')
    expect(iconBtns.length).toBeGreaterThanOrEqual(1)
  })

  it('无 title 时不渲染标题区域', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await delay(300)
    const title = container.querySelector('.f-pro-table-title')
    expect(title).toBeNull()
  })

  it('pure 模式简化表格', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        pure
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await delay(300)
    const table = container.querySelector('.ant-table')
    expect(table).toBeInTheDocument()
  })
})
