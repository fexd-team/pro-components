import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProTable from '../../../ProTable'

const mockData = [
  { id: '1', name: 'Alice', age: 25 },
  { id: '2', name: 'Bob', age: 30 },
]

describe('ProTable 可调列宽', () => {
  afterEach(() => jest.useRealTimers())

  it('resizableHeader=true 时渲染 resizable handle', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        resizableHeader
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[
          { title: 'Name', dataIndex: 'name', width: 150 },
          { title: 'Age', dataIndex: 'age', width: 100 },
        ]}
      />,
    )

    await waitFor(
      () => {
        const handles = container.querySelectorAll('.f-pro-table-resizable-handle')
        expect(handles.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })

  it('resizableHeader=false 时不渲染 resizable handle', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[
          { title: 'Name', dataIndex: 'name', width: 150 },
          { title: 'Age', dataIndex: 'age', width: 100 },
        ]}
      />,
    )

    await waitFor(
      () => {
        const table = container.querySelector('.ant-table')
        expect(table).toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    const handles = container.querySelectorAll('.f-pro-table-resizable-handle')
    expect(handles.length).toBe(0)
  })

  it('resizableHeader 渲染的 handle 可以交互（mousedown）', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        rowKey="id"
        resizableHeader
        onQuery={async () => ({ success: true, data: mockData, total: 2 })}
        columns={[
          { title: 'Name', dataIndex: 'name', width: 200 },
          { title: 'Age', dataIndex: 'age', width: 100 },
        ]}
      />,
    )

    await waitFor(
      () => {
        const handles = container.querySelectorAll('.f-pro-table-resizable-handle')
        expect(handles.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )

    const handle = container.querySelector('.f-pro-table-resizable-handle')!
    fireEvent.mouseDown(handle, { clientX: 200 })
    fireEvent.mouseMove(handle, { clientX: 250 })
    fireEvent.mouseUp(handle)

    const table = container.querySelector('.ant-table')
    expect(table).toBeInTheDocument()
  })
})
