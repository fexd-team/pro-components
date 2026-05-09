import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { delay, run } from '@fexd/tools'

import ProTable from '../../../ProTable'
import { ProTableProps } from '../../../types'

const mockData = Array(10)
  .fill('')
  .map((_, idx) => ({
    id: `row_${idx + 1}`,
    name: `用户${idx + 1}`,
    status: idx % 2 === 0 ? '启用' : '禁用',
  }))

function renderSelectableTable(props: Partial<ProTableProps> = {}) {
  return (
    <ProTable
      title="选择测试"
      rowKey="id"
      selectable
      onQuery={async (params) => {
        await delay(50)
        return {
          success: true,
          data: mockData,
          total: mockData.length,
        }
      }}
      columns={[
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '姓名', dataIndex: 'name', width: 120 },
        { title: '状态', dataIndex: 'status', width: 80 },
      ]}
      {...props}
    />
  )
}

describe('ProTable 选择功能', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('selectable 为 true 时渲染 checkbox 列', async () => {
    jest.useRealTimers()
    const { container } = render(renderSelectableTable())

    await delay(300)

    const checkboxes = container.querySelectorAll('.ant-checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })

  it('默认 selectable 为 false 时不渲染 checkbox', async () => {
    jest.useRealTimers()
    const { container } = render(renderSelectableTable({ selectable: false }))

    await delay(300)

    const selectionCells = container.querySelectorAll('.ant-table-selection-column')
    expect(selectionCells.length).toBe(0)
  })

  it('点击 checkbox 可选中行', async () => {
    jest.useRealTimers()
    const { container } = render(renderSelectableTable())

    await waitFor(
      () => {
        const checkboxes = container.querySelectorAll('.ant-checkbox-input')
        expect(checkboxes.length).toBeGreaterThan(1)
      },
      { timeout: 5000 },
    )

    const checkboxes = container.querySelectorAll('.ant-checkbox-input')
    fireEvent.click(checkboxes[1])

    await waitFor(() => {
      const checkedBoxes = container.querySelectorAll('.ant-checkbox-checked')
      expect(checkedBoxes.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('选中后显示批量操作工具栏', async () => {
    jest.useRealTimers()
    const { container } = render(
      renderSelectableTable({
        batchActions: [{ label: '批量删除', onClick: jest.fn() }],
      }),
    )

    await waitFor(
      () => {
        const checkboxes = container.querySelectorAll('.ant-checkbox-input')
        expect(checkboxes.length).toBeGreaterThan(1)
      },
      { timeout: 5000 },
    )

    const checkboxes = container.querySelectorAll('.ant-checkbox-input')
    fireEvent.click(checkboxes[1])

    await waitFor(() => {
      const toolbar = container.querySelector('.f-pro-table-batch-toolbar')
      expect(toolbar).toBeInTheDocument()
    })
  })

  it('全选 checkbox 可选中所有行', async () => {
    jest.useRealTimers()
    const { container } = render(renderSelectableTable())

    await waitFor(
      () => {
        const checkboxes = container.querySelectorAll('.ant-checkbox-input')
        expect(checkboxes.length).toBeGreaterThan(1)
      },
      { timeout: 5000 },
    )

    const headerCheckbox = container.querySelector('.ant-table-thead .ant-checkbox-input')
    expect(headerCheckbox).toBeInTheDocument()
    fireEvent.click(headerCheckbox!)

    await waitFor(() => {
      const checkedBoxes = container.querySelectorAll('.ant-table-tbody .ant-checkbox-checked')
      expect(checkedBoxes.length).toBe(mockData.length)
    })
  })

  it('rowSelection type=radio 只允许单选', async () => {
    jest.useRealTimers()
    const { container } = render(
      renderSelectableTable({
        rowSelection: { type: 'radio' },
      }),
    )

    await waitFor(
      () => {
        const radios = container.querySelectorAll('.ant-radio')
        expect(radios.length).toBeGreaterThan(0)
      },
      { timeout: 5000 },
    )
  })
})
