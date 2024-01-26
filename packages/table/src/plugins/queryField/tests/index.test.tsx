/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'

import ProTable from '../../../ProTable'
import { ProTableProps } from '../../../types'

const mockOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 },
]

const mockData = getMockData()

describe('ProTable 单独定义 queryFields', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  function toggleOpen(container: ReturnType<typeof render>['container']): void {
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!)
    act(() => {
      jest.runAllTimers()
    })
  }

  it('基础查询功能正常工作', async () => {
    jest.useFakeTimers()
    const fn1 = jest.fn()
    // @ts-ignore
    let currentParams: any = {}
    const node = render(
      renderTable1({
        setCurrentParams: (params: any) => (currentParams = { ...params }),
        fn: fn1,
      }),
    )
    expect(node.getByText('文本')).toBeInTheDocument()
    expect(node.getByText('单选框')).toBeInTheDocument()
    await waitFor(() => expect(fn1).toHaveBeenCalled())
    expect(fn1).toBeCalledTimes(1)
    jest.advanceTimersByTime(600)
    jest.useRealTimers()
    await delay(100)
    expect(fn1).toBeCalledTimes(2)
    jest.useFakeTimers()
  })

  it('输入框查询正常工作', async () => {
    jest.useFakeTimers()
    const fn1 = jest.fn()
    // @ts-ignore
    let currentParams: any = {}
    const ref = ProTable.createRef()
    const node = render(
      renderTable1({
        setCurrentParams: (params: any) => (currentParams = { ...params }),
        fn: fn1,
        props: {
          manualQuery: true,
          ref,
        },
      }),
    )

    // 在文本框中输入内容，触发查询
    const input = node.getByPlaceholderText('请输入文本')
    fireEvent.change(input, { target: { value: mockData?.[0]?.value1 } })
    // 点击查询按钮
    fireEvent.click(document.querySelector('.f-pro-table-query-form-actions .ant-btn-primary')!)
    await waitFor(() => expect(fn1).toBeCalledTimes(1))
    jest.advanceTimersByTime(600)
    jest.useRealTimers()
    await delay(100)
    expect(fn1).toBeCalledTimes(2)
    await delay(500)
    // 希望表格中出现搜索的结果
    const nodes = node.getAllByText(mockData?.[0]?.value1)
    const dataSource = ref?.current?.queryField?.dataSource
    // 希望表格中出现搜索的结果
    expect(nodes?.length).toBe(dataSource?.length)
    // 希望表格中不出现搜索的结果
    expect(node.queryByText(mockData?.[1]?.value1)).not.toBeInTheDocument()
  })

  it('搜索框查询功能正常工作', async () => {
    jest.useFakeTimers()
    const fn1 = jest.fn()
    // @ts-ignore
    let currentParams: any = {}
    const node = render(
      renderTable1({
        setCurrentParams: (params: any) => (currentParams = { ...params }),
        fn: fn1,
        props: {
          manualQuery: true,
        },
      }),
    )

    // 在单选框中选择内容，触发查询
    // const select = node.getByPlaceholderText('请选择内容')
    toggleOpen(node.container.querySelector('.f-pro-table-query')!)
    // fireEvent.click(select)
    // await delay(300)
    await waitFor(() => expect(screen.getByText('选项1')).toBeInTheDocument())
    // expect(screen.getByText('选项1')).toBeInTheDocument()
    fireEvent.click(node.getByText('选项1'))

    jest.useFakeTimers()
    // 点击查询按钮
    fireEvent.click(document.querySelector('.f-pro-table-query-form-actions .ant-btn-primary')!)
    await waitFor(() => expect(fn1).toBeCalledTimes(1))
    // 当前参数选项是选项1
    expect(currentParams?.select).toBe(1)
    jest.advanceTimersByTime(600)
    jest.useRealTimers()
    await delay(100)
    expect(fn1).toBeCalledTimes(2)

    await delay(500)

    // 希望表格中出现至少 1 个选项搜索的结果
    expect(node.getAllByText('选项1')?.length).toBeGreaterThan(1)
    // 希望表格中不出现选项搜索的结果
    expect(node.queryByText('选项2', { selector: '.f-pro-table-table' })).not.toBeInTheDocument()
  })
})

describe('ProTable 从 columns 中继承 queryField', () => {
  // beforeEach(() => {
  //   jest.useFakeTimers()
  // })

  afterEach(() => {
    jest.useRealTimers()
  })

  function toggleOpen(container: ReturnType<typeof render>['container']): void {
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!)
    act(() => {
      jest.runAllTimers()
    })
  }

  it('基础查询功能正常工作', async () => {
    jest.useFakeTimers()
    const fn1 = jest.fn()
    // @ts-ignore
    let currentParams: any = {}
    const node = render(
      renderTable2({
        setCurrentParams: (params: any) => (currentParams = { ...params }),
        fn: fn1,
      }),
    )
    // jest.useRealTimers()
    // await delay(600)
    expect(node.queryAllByText('项目 1')?.length).toBe(2)
    expect(node.queryAllByText('项目 2')?.length).toBe(2)
    await waitFor(() => expect(fn1).toHaveBeenCalled())
    expect(fn1).toBeCalledTimes(1)
    jest.advanceTimersByTime(600)
    jest.useRealTimers()
    await delay(100)
    expect(fn1).toBeCalledTimes(2)
    // jest.useFakeTimers()
  })

  it('输入框查询正常工作', async () => {
    // jest.useFakeTimers()
    jest.useRealTimers()
    const fn1 = jest.fn()
    // @ts-ignore
    let currentParams: any = {}
    const ref = ProTable.createRef()
    const node = render(
      renderTable2({
        setCurrentParams: (params: any) => (currentParams = { ...params }),
        fn: fn1,
        props: {
          manualQuery: true,
          ref,
        },
      }),
    )

    await delay(300)
    // 在文本框中输入内容，触发查询
    const input = node.getByPlaceholderText('请输入')
    fireEvent.change(input, { target: { value: mockData?.[0]?.value1 } })

    jest.useFakeTimers()
    // 点击查询按钮
    fireEvent.click(document.querySelector('.f-pro-table-query-form-actions .ant-btn-primary')!)
    await waitFor(() => expect(fn1).toBeCalledTimes(1))
    jest.advanceTimersByTime(600)
    jest.useRealTimers()
    await delay(100)
    expect(fn1).toBeCalledTimes(2)
    await delay(500)
    const nodes = node.getAllByText(mockData?.[0]?.value1)
    const dataSource = ref?.current?.queryField?.dataSource
    // 希望表格中出现搜索的结果
    expect(nodes?.length).toBe(dataSource?.length)
    // 希望表格中不出现搜索的结果
    expect(node.queryByText(mockData?.[1]?.value1)).not.toBeInTheDocument()
  })

  it('搜索框查询功能正常工作', async () => {
    jest.useFakeTimers()
    const fn1 = jest.fn()
    // @ts-ignore
    let currentParams: any = {}
    const node = render(
      renderTable2({
        setCurrentParams: (params: any) => (currentParams = { ...params }),
        fn: fn1,
        props: {
          manualQuery: true,
        },
      }),
    )

    // 在单选框中选择内容，触发查询
    // const select = node.getByPlaceholderText('请选择内容')
    toggleOpen(node.container.querySelector('.f-pro-table-query')!)
    // fireEvent.click(select)
    // await delay(300)
    await waitFor(() => expect(screen.getByText('选项1')).toBeInTheDocument())
    // expect(screen.getByText('选项1')).toBeInTheDocument()
    fireEvent.click(node.getByText('选项1'))

    jest.useFakeTimers()
    // 点击查询按钮
    fireEvent.click(document.querySelector('.f-pro-table-query-form-actions .ant-btn-primary')!)
    await waitFor(() => expect(fn1).toBeCalledTimes(1))
    // 当前参数选项是选项1
    expect(currentParams?.value2).toBe(1)
    jest.advanceTimersByTime(600)
    jest.useRealTimers()
    await delay(100)
    expect(fn1).toBeCalledTimes(2)

    await delay(500)

    // 希望表格中出现至少 1 个选项搜索的结果
    expect(node.getAllByText('选项1')?.length).toBeGreaterThan(1)
    // 希望表格中不出现选项搜索的结果
    expect(node.queryByText('选项2', { selector: '.f-pro-table-table' })).not.toBeInTheDocument()
  })
})

function getMockData() {
  return Array(200)
    .fill('')
    .map((_, idx) => ({
      id: `key_${idx + 1}`,
      ...Object.assign(
        {},
        ...Array(2)
          .fill('')
          .map((_, idx) => ({
            [`value${idx + 1}`]: run(() => {
              const valueType = getMockDataType(idx + 1)

              const dataMap = {
                select: sample<any>(mockOptions)?.value,
                text: Random.name(),
              }

              // // 随机数据破缺
              // if (random(0, 10) > 8) {
              //   return undefined
              // }

              if (valueType in dataMap) {
                return dataMap[valueType]
              }

              return Random.name()
            }),
          })),
      ),
    }))
}

function getMockDataType(idx: number) {
  if (idx % 2 === 0) {
    return 'select'
  }

  return 'text'
}

function renderTable1({
  setCurrentParams = () => null,
  fn = () => null,
  props = {},
}: {
  setCurrentParams?: any
  fn?: any
  props?: ProTableProps<any>
}) {
  return (
    <ProTable
      title="表格"
      iconActions={['refresh']}
      queryFields={[
        { label: '文本', name: 'text', type: 'text', placeholder: '请输入文本' },
        // { label: '文本2', name: 'text2', hook: () => false },
        {
          label: '单选框',
          name: 'select',
          type: 'select',
          placeholder: '请选择内容',
          options: mockOptions,
          props: {},
        },
      ]}
      onQuery={async (params: any) => {
        run(setCurrentParams, undefined, { ...params })
        // currentParams = { ...params }
        fn()
        await delay(500) // 模拟查询接口延时
        fn()

        const { page, pageSize } = params
        const queryData = mockData.filter(
          (item) =>
            (!params?.text || item?.value1?.includes(params?.text ?? '')) && // 模拟文本筛选
            (!params?.select || params?.select === item?.value2), // 模拟单选筛选
        )

        const data = queryData.slice((page - 1) * pageSize, page * pageSize)

        return {
          success: true,
          data: data.map((item) => ({
            ...item,
          })),
          total: queryData?.length,
        }
      }}
      columns={[
        {
          title: '项目 1',
          dataIndex: 'value1',
          width: 120,
        },
        {
          title: '项目 2',
          dataIndex: 'value2',
          width: 120,
          valueType: 'select',
          valueEnum: mockOptions,
        },
      ]}
      {...props}
    />
  )
}

function renderTable2({
  setCurrentParams = () => null,
  fn = () => null,
  props = {},
}: {
  setCurrentParams?: any
  fn?: any
  props?: ProTableProps<any>
}) {
  return (
    <ProTable
      localeKey="zh-CN"
      title="表格"
      onQuery={async (params: any) => {
        run(setCurrentParams, undefined, { ...params })
        // currentParams = { ...params }
        fn()
        await delay(500) // 模拟查询接口延时
        fn()

        const { page, pageSize } = params
        const queryData = mockData.filter(
          (item) =>
            (!params?.value1 || item?.value1?.includes(params?.value1 ?? '')) && // 模拟文本筛选
            (!params?.value2 || params?.value2 === item?.value2), // 模拟单选筛选
        )

        const data = queryData.slice((page - 1) * pageSize, page * pageSize)

        return {
          success: true,
          data: data.map((item) => ({
            ...item,
          })),
          total: queryData?.length,
        }
      }}
      columns={[
        {
          title: '项目 1',
          dataIndex: 'value1',
          width: 120,
          queryField: true,
        },
        {
          title: '项目 2',
          dataIndex: 'value2',
          width: 120,
          valueType: 'select',
          valueEnum: mockOptions,
          queryField: true,
        },
      ]}
      {...props}
    />
  )
}
