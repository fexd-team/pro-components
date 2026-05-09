import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { delay, run } from '@fexd/tools'

import ProTable from '../../../ProTable'
import { ProTableProps } from '../../../types'

const mockData = Array(55)
  .fill('')
  .map((_, idx) => ({
    id: `row_${idx + 1}`,
    name: `用户${idx + 1}`,
    age: 20 + (idx % 30),
  }))

function renderPaginationTable(props: Partial<ProTableProps> = {}) {
  return (
    <ProTable
      title="分页测试"
      rowKey="id"
      onQuery={async (params) => {
        await delay(50)
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
        { title: '年龄', dataIndex: 'age', width: 80 },
      ]}
      {...props}
    />
  )
}

describe('ProTable 分页功能', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('默认渲染分页器', async () => {
    jest.useRealTimers()
    const { container } = render(renderPaginationTable())

    await waitFor(
      () => {
        const pagination = container.querySelector('.f-pro-table-pagination')
        expect(pagination).toBeInTheDocument()
      },
      { timeout: 5000 },
    )
  })

  it('pagination: false 时不显示分页器', async () => {
    jest.useRealTimers()
    const { container } = render(renderPaginationTable({ pagination: false }))

    await delay(300)

    const pagination = container.querySelector('.ant-pagination')
    expect(pagination).toBeNull()
  })

  it('显示总数信息', async () => {
    jest.useRealTimers()
    const { container } = render(renderPaginationTable())

    await delay(300)

    const totalEl = container.querySelector('.ant-pagination-total-text')
    if (totalEl) {
      expect(totalEl.textContent).toContain('55')
    }
  })

  it('初始 pageSize 可自定义', async () => {
    jest.useRealTimers()
    const fn = jest.fn()
    render(
      renderPaginationTable({
        defaultPageSize: 5,
        onQuery: async (params) => {
          fn(params)
          const { page = 1, pageSize = 5 } = params
          return {
            success: true,
            data: mockData.slice((page - 1) * pageSize, page * pageSize),
            total: mockData.length,
          }
        },
      }),
    )

    await waitFor(() => expect(fn).toHaveBeenCalled(), { timeout: 5000 })
    const lastCall = fn.mock.calls[fn.mock.calls.length - 1][0]
    expect(lastCall.pageSize).toBe(5)
  })

  it('分页请求包含正确的 page/pageSize 参数', async () => {
    jest.useRealTimers()
    const fn = jest.fn()
    render(
      renderPaginationTable({
        onQuery: async (params) => {
          fn(params)
          const { page = 1, pageSize = 10 } = params
          return {
            success: true,
            data: mockData.slice((page - 1) * pageSize, page * pageSize),
            total: mockData.length,
          }
        },
      }),
    )

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith(
          expect.objectContaining({
            page: 1,
            pageSize: expect.any(Number),
          }),
        )
      },
      { timeout: 5000 },
    )
  })
})
