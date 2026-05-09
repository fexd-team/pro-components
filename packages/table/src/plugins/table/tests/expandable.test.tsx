import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProTable from '../../../ProTable'

const mockData = [
  { id: '1', name: 'Alice', children: [{ id: '1-1', name: 'Sub Alice' }] },
  { id: '2', name: 'Bob', detail: '详细信息' },
  { id: '3', name: 'Carol' },
]

describe('ProTable 展开行', () => {
  afterEach(() => jest.useRealTimers())

  it('expandable 配置展开按钮', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: mockData.length })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        expandable={{
          expandedRowRender: (record: any) => <div className="expanded-content">{record.detail ?? record.name}</div>,
        }}
      />,
    )

    await waitFor(
      () => {
        const expandIcons = container.querySelectorAll('.ant-table-row-expand-icon')
        expect(expandIcons.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 5000 },
    )
  })

  it('点击展开按钮显示展开内容', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: mockData.length })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        expandable={{
          expandedRowRender: (record: any) => <div className="expanded-detail">{record.name} Detail</div>,
        }}
      />,
    )

    await delay(300)
    const expandIcon = container.querySelector('.ant-table-row-expand-icon')
    expect(expandIcon).toBeInTheDocument()

    fireEvent.click(expandIcon!)
    await delay(100)

    const expandedContent = container.querySelector('.expanded-detail')
    expect(expandedContent).toBeInTheDocument()
  })

  it('树形数据自动嵌套展开', async () => {
    jest.useRealTimers()
    const treeData = [
      {
        id: '1',
        name: 'Parent',
        children: [{ id: '1-1', name: 'Child' }],
      },
    ]

    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: treeData, total: treeData.length })}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
      />,
    )

    await delay(300)
    const expandIcon = container.querySelector('.ant-table-row-expand-icon')
    expect(expandIcon).toBeInTheDocument()
  })
})
