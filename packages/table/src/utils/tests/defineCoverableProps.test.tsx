import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { delay, isArray } from '@fexd/tools'

import ProTable from '../../ProTable'
import defineCoverableProps from '../defineCoverableProps'

const mockData = Array(5)
  .fill('')
  .map((_, idx) => ({
    id: `row_${idx + 1}`,
    name: `Item ${idx + 1}`,
  }))

describe('defineCoverableProps - getArrayLikeConfig 逻辑', () => {
  it('对象形式的 queryFields 通过 getProps() 转为数组', () => {
    const config = defineCoverableProps({
      queryFields: {
        keyword: { label: '关键词', name: 'keyword', type: 'text' },
        status: { label: '状态', name: 'status', type: 'select' },
      } as any,
    } as any)

    const props = config.default.getProps()
    expect(isArray(props.queryFields)).toBe(true)
    expect(props.queryFields).toHaveLength(2)
    expect(props.queryFields[0]).toHaveProperty('label', '关键词')
    expect(props.queryFields[1]).toHaveProperty('label', '状态')
  })

  it('数组形式的 queryFields 通过 getProps() 保持为数组', () => {
    const config = defineCoverableProps({
      queryFields: [
        { label: '关键词', name: 'keyword', type: 'text' },
        { label: '状态', name: 'status', type: 'select' },
      ],
    } as any)

    const props = config.default.getProps()
    expect(isArray(props.queryFields)).toBe(true)
    expect(props.queryFields).toHaveLength(2)
  })

  it('对象形式的 actions 通过 getProps() 转为数组', () => {
    const config = defineCoverableProps({
      actions: {
        add: { label: '新增', onClick: () => {} },
        export: { label: '导出', onClick: () => {} },
      } as any,
    } as any)

    const props = config.default.getProps()
    expect(isArray(props.actions)).toBe(true)
    expect(props.actions).toHaveLength(2)
  })

  it('对象形式的 columnActions 通过 getProps() 转为数组', () => {
    const config = defineCoverableProps({
      columnActions: {
        edit: { label: '编辑', onClick: () => {} },
        delete: { label: '删除', onClick: () => {} },
      } as any,
    } as any)

    const props = config.default.getProps()
    expect(isArray(props.columnActions)).toBe(true)
    expect(props.columnActions).toHaveLength(2)
  })

  it('对象形式的 batchActions 通过 getProps() 转为数组', () => {
    const config = defineCoverableProps({
      batchActions: {
        delete: { label: '批量删除', onClick: () => {} },
      } as any,
    } as any)

    const props = config.default.getProps()
    expect(isArray(props.batchActions)).toBe(true)
    expect(props.batchActions).toHaveLength(1)
  })

  it('对象形式的 editFields/addFields/viewFields 通过 getProps() 转为数组', () => {
    const config = defineCoverableProps({
      editFields: {
        name: { label: '姓名', name: 'name', required: true },
        age: { label: '年龄', name: 'age', type: 'digit' },
      } as any,
      addFields: {
        name: { label: '姓名', name: 'name' },
      } as any,
      viewFields: {
        name: { label: '姓名', name: 'name', mode: 'view' },
      } as any,
    } as any)

    const props = config.default.getProps()
    expect(isArray(props.editFields)).toBe(true)
    expect(props.editFields).toHaveLength(2)
    expect(isArray(props.addFields)).toBe(true)
    expect(props.addFields).toHaveLength(1)
    expect(isArray(props.viewFields)).toBe(true)
    expect(props.viewFields).toHaveLength(1)
  })

  it('undefined/null 字段不会被转换', () => {
    const config = defineCoverableProps({
      queryFields: undefined,
      actions: undefined,
    } as any)

    const props = config.default.getProps()
    expect(props.queryFields).toBeUndefined()
    expect(props.actions).toBeUndefined()
  })

  it('配置中的其他属性正常透传', () => {
    const onQuery = jest.fn()
    const config = defineCoverableProps({
      title: '测试表格',
      rowKey: 'id',
      onQuery,
      columns: [{ title: 'Name', dataIndex: 'name' }],
    } as any)

    const props = config.default.getProps()
    expect(props.title).toBe('测试表格')
    expect(props.rowKey).toBe('id')
    expect(props.onQuery).toBe(onQuery)
    expect(props.columns).toHaveLength(1)
  })
})

describe('ProTable 标准 props（数组形式）集成测试', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('queryFields 数组形式正常渲染', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProTable
        title="数组形式 queryFields"
        rowKey="id"
        onQuery={async () => {
          await delay(50)
          return { success: true, data: mockData, total: mockData.length }
        }}
        columns={[{ title: 'Name', dataIndex: 'name' }]}
        queryFields={[
          { label: '关键词', name: 'keyword', type: 'text' },
          { label: '状态', name: 'status', type: 'select', options: [{ label: 'A', value: 1 }] },
        ]}
      />,
    )

    await waitFor(
      () => {
        const formItems = container.querySelectorAll('.f-pro-table-query .ant-form-item')
        expect(formItems.length).toBeGreaterThanOrEqual(2)
      },
      { timeout: 3000 },
    )
  })
})
