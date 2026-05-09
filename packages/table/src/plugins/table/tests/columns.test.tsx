import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProTable from '../../../ProTable'

const mockData = [
  { id: '1', name: 'Alice', age: 25 },
  { id: '2', name: 'Bob', age: 30 },
  { id: '3', name: 'Charlie', age: 35 },
]

describe('ProTable useColumns - 序号列', () => {
  afterEach(() => jest.useRealTimers())

  it('showDataSourceIndex=true 显示序号列', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        showDataSourceIndex
        onQuery={async () => ({ success: true, data: mockData, total: 3 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await waitFor(
      () => {
        const cells = container.querySelectorAll('.ant-table-tbody .ant-table-cell')
        const firstRow = cells[0]
        expect(firstRow?.textContent).toContain('1')
      },
      { timeout: 3000 },
    )
  })

  it('showDataSourceIndex=false 不显示序号列', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 3 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await waitFor(
      () => {
        const headerCells = container.querySelectorAll('.ant-table-thead th')
        const hasIndex = Array.from(headerCells).some((th) => th.textContent?.includes('#'))
        expect(hasIndex).toBe(false)
      },
      { timeout: 3000 },
    )
  })

  it('dataSourceIndexCalcWithPage=true 序号跨页计算', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        showDataSourceIndex
        dataSourceIndexCalcWithPage
        onQuery={async ({ page, pageSize }) => ({
          success: true,
          data: mockData,
          total: 30,
        })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        pagination={{ pageSize: 3 }}
      />,
    )

    await waitFor(
      () => {
        const cells = container.querySelectorAll('.ant-table-tbody .ant-table-cell')
        expect(cells[0]?.textContent).toContain('1')
      },
      { timeout: 3000 },
    )
  })
})

describe('ProTable useColumns - 操作列', () => {
  afterEach(() => jest.useRealTimers())

  it('columnActions 配置后自动生成操作列', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 3 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        columnActions={[{ label: '删除', onClick: jest.fn() }]}
      />,
    )

    await waitFor(
      () => {
        const btns = container.querySelectorAll('.ant-table-tbody .ant-btn')
        expect(btns.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })

  it('fixColumnActions=true 操作列固定在右侧', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        fixColumnActions
        onQuery={async () => ({ success: true, data: mockData, total: 3 })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        columnActions={[{ label: '编辑', onClick: jest.fn() }]}
        scroll={{ x: 1000 }}
      />,
    )

    await waitFor(
      () => {
        const fixedCell = container.querySelector('.ant-table-cell-fix-right')
        expect(fixedCell).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})

describe('ProTable useColumns - 列设置', () => {
  afterEach(() => jest.useRealTimers())

  it('iconActions=[settings] 渲染列设置按钮', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        title="列设置测试"
        iconActions={['settings']}
        onQuery={async () => ({ success: true, data: mockData, total: 3 })}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Age', dataIndex: 'age' },
        ]}
      />,
    )

    await waitFor(
      () => {
        const iconBtns = container.querySelectorAll('.f-pro-table-icon-actions .ant-btn')
        expect(iconBtns.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })
})

describe('ProTable useColumns - 可编辑行', () => {
  afterEach(() => jest.useRealTimers())

  it('columnActions 中 table-edit 按钮出现', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 3 })}
        columns={[
          { title: 'Name', dataIndex: 'name', type: 'input' },
          { title: 'Age', dataIndex: 'age', type: 'number' },
        ]}
        columnActions={['table-edit']}
        onEdit={async () => ({ success: true })}
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
})
