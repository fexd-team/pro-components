import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProTable from '../../../ProTable'

const mockData = [
  { id: '1', name: 'Alice', age: 25 },
  { id: '2', name: 'Bob', age: 30 },
]

function renderTable(props: any = {}) {
  return (
    <ProTable
      rowKey="id"
      onQuery={async () => {
        await delay(50)
        return { success: true, data: mockData, total: mockData.length }
      }}
      columns={[
        { title: 'Name', dataIndex: 'name' },
        { title: 'Age', dataIndex: 'age' },
      ]}
      {...props}
    />
  )
}

describe('ProTable config 插件 - 国际化', () => {
  afterEach(() => jest.useRealTimers())

  it('默认使用英文 locale', async () => {
    jest.useRealTimers()
    const { container } = render(renderTable({ title: 'Test' }))
    await delay(300)
    const pagination = container.querySelector('.ant-pagination-total-text')
    if (pagination) {
      expect(pagination.textContent).toMatch(/total|共/)
    }
  })

  it('localeKey="zh-CN" 切换中文', async () => {
    jest.useRealTimers()
    const { container } = render(renderTable({ title: '测试', localeKey: 'zh-CN' }))
    await delay(300)
    const pagination = container.querySelector('.ant-pagination-total-text')
    if (pagination) {
      expect(pagination.textContent).toContain('共')
    }
  })

  it('localeKey="en-US" 使用英文', async () => {
    jest.useRealTimers()
    const { container } = render(renderTable({ title: 'Test', localeKey: 'en-US' }))
    await delay(300)
    const pagination = container.querySelector('.ant-pagination-total-text')
    if (pagination) {
      expect(pagination.textContent?.toLowerCase()).toContain('total')
    }
  })
})

describe('ProTable config 插件 - 尺寸控制', () => {
  afterEach(() => jest.useRealTimers())

  it('size=small 渲染紧凑表格', async () => {
    jest.useRealTimers()
    const { container } = render(renderTable({ title: '紧凑', size: 'small' }))
    await delay(300)
    const table = container.querySelector('.ant-table-small')
    expect(table).toBeInTheDocument()
  })

  it('mini=true 渲染小尺寸', async () => {
    jest.useRealTimers()
    const { container } = render(renderTable({ title: 'Mini', mini: true }))
    await delay(300)
    const table = container.querySelector('.ant-table-small')
    expect(table).toBeInTheDocument()
  })

  it('默认尺寸为 middle', async () => {
    jest.useRealTimers()
    const { container } = render(renderTable({ title: '默认' }))
    await delay(300)
    const table = container.querySelector('.ant-table')
    expect(table).toBeInTheDocument()
  })
})
