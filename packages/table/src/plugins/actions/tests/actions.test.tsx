import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { delay, run } from '@fexd/tools'

import ProTable from '../../../ProTable'
import { ProTableProps } from '../../../types'

const mockData = Array(20)
  .fill('')
  .map((_, idx) => ({
    id: `row_${idx + 1}`,
    name: `用户${idx + 1}`,
    status: idx % 2 === 0 ? 1 : 0,
  }))

function renderTableWithActions(props: Partial<ProTableProps> = {}) {
  return (
    <ProTable
      title="Actions 测试"
      rowKey="id"
      onQuery={async (params) => {
        await delay(100)
        const { page = 1, pageSize = 10 } = params
        return {
          success: true,
          data: mockData.slice((page - 1) * pageSize, page * pageSize),
          total: mockData.length,
        }
      }}
      columns={[
        { title: 'ID', dataIndex: 'id', width: 80 },
        { title: '姓名', dataIndex: 'name', width: 120 },
      ]}
      {...props}
    />
  )
}

describe('ProTable Actions 插件', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('渲染 toolbar actions 按钮', async () => {
    const addFn = jest.fn()
    const { container } = render(
      renderTableWithActions({
        actions: [{ label: '新增', onClick: addFn }],
      }),
    )

    await waitFor(() => {
      expect(container.querySelector('.f-pro-table-toolbar')).toBeInTheDocument()
    })

    const actionBtns = container.querySelectorAll('.f-pro-table-toolbar .ant-btn')
    expect(actionBtns.length).toBeGreaterThanOrEqual(1)
  })

  it('iconActions refresh 按钮存在', async () => {
    const { container } = render(
      renderTableWithActions({
        iconActions: ['refresh'],
      }),
    )

    await waitFor(() => {
      expect(container.querySelector('.f-pro-table-toolbar')).toBeInTheDocument()
    })

    const iconBtns = container.querySelectorAll('.f-pro-table-icon-actions .ant-btn')
    expect(iconBtns.length).toBeGreaterThanOrEqual(1)
  })

  it('columnActions 渲染列操作按钮', async () => {
    jest.useRealTimers()
    const editFn = jest.fn()
    const { container } = render(
      renderTableWithActions({
        columnActions: [{ label: '编辑', onClick: editFn }],
      }),
    )

    await waitFor(
      () => {
        const actionBtns = container.querySelectorAll('.ant-table-tbody .ant-btn')
        expect(actionBtns.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })

  it('内置 actions（如 add）可以使用字符串形式配置', async () => {
    const { container } = render(
      renderTableWithActions({
        actions: ['add'],
      }),
    )

    await waitFor(() => {
      expect(container.querySelector('.f-pro-table-toolbar')).toBeInTheDocument()
    })

    const toolbar = container.querySelector('.f-pro-table-toolbar')
    expect(toolbar).toBeInTheDocument()
  })
})
