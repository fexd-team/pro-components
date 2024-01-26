/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

const mockOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 },
]

describe('type="select" 编辑模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const { container } = render(<ProField className="test-field" type="select" label="Test Label" />)
    expect(container.querySelector('.test-field .ant-select')).toBeInTheDocument()
    expect(container.querySelector('.test-field .ant-form-item-label > label')!.textContent).toBe('Test Label')
  })

  // 初始值能正确赋值
  it('初始值能正确赋值', async () => {
    const { container } = render(
      <ProField className="test-field" type="select" initialValue={2} options={mockOptions} />,
    )
    expect(container.querySelector('.test-field .ant-select-selection-item')!.textContent).toBe('选项2')
  })

  // 能够正确选择值
  it('能够正确选择值', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <ProField
        className="test-field"
        type="select"
        options={mockOptions}
        props={{ onChange, transitionName: '', open: true }}
      />,
    )
    fireEvent.click(screen.getByText('选项2'))
    expect(onChange).toBeCalledWith(2, { label: '选项2', value: 2 })
  })

  // options 可以是异步函数
  it('options 可以是异步函数', async () => {
    const fn = jest.fn()
    const onChange = jest.fn()
    const { container } = render(
      <ProField
        className="test-field"
        type="select"
        options={async () => {
          fn()
          await delay(1000)
          fn()
          return mockOptions
        }}
        props={{ transitionName: '', open: true, onChange }}
      />,
    )
    expect(fn).toBeCalledTimes(1)
    fireEvent.click(screen.getByText('Please select'))
    expect(container.querySelector('.anticon-loading')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('选项1')).toBeInTheDocument()
    })
    expect(fn).toBeCalledTimes(2)
    fireEvent.click(screen.getByText('选项2'))
    expect(onChange).toBeCalledWith(2, { label: '选项2', value: 2 })
  })

  // options 可以是纯字符串数组
  it('options 可以是纯字符串数组', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <ProField
        className="test-field"
        type="select"
        options={['选项1', '选项2', '选项3', '选项4', '选项5']}
        props={{ transitionName: '', open: true, onChange }}
      />,
    )
    fireEvent.click(screen.getByText('Please select'))
    expect(screen.getByText('选项1', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('选项2', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('选项3', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('选项4', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('选项5', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()

    fireEvent.click(screen.getByText('选项2', { selector: '.ant-select-item-option-content' }))
    expect(onChange).toBeCalledWith('选项2', { title: '选项2', label: '选项2', value: '选项2' })
  })

  // options 可以是纯数字数组
  it('options 可以是纯数字数组', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <ProField
        className="test-field"
        type="select"
        options={[1, 2, 3, 4, 5]}
        props={{ transitionName: '', open: true, onChange }}
      />,
    )
    fireEvent.click(screen.getByText('Please select'))
    expect(screen.getByText('1', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('2', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('3', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('4', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()
    expect(screen.getByText('5', { selector: '.ant-select-item-option-content' })).toBeInTheDocument()

    fireEvent.click(screen.getByText('2', { selector: '.ant-select-item-option-content' }))
    expect(onChange).toBeCalledWith(2, { title: '2', label: '2', value: 2 })
  })

  // options 可以是对象
  it('options 可以是对象', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <ProField
        className="test-field"
        type="select"
        options={{
          1: '选项1',
          2: '选项2',
          3: '选项3',
          4: '选项4',
          5: '选项5',
        }}
        props={{ transitionName: '', open: true, onChange }}
      />,
    )
    fireEvent.click(screen.getByText('Please select'))
    expect(screen.getByText('选项1')).toBeInTheDocument()
    expect(screen.getByText('选项2')).toBeInTheDocument()
    expect(screen.getByText('选项3')).toBeInTheDocument()
    expect(screen.getByText('选项4')).toBeInTheDocument()
    expect(screen.getByText('选项5')).toBeInTheDocument()

    fireEvent.click(screen.getByText('选项2'))
    expect(onChange).toBeCalledWith('2', { label: '选项2', value: '2' })
  })

  // 可以搜索选项
  it('可以搜索选项', async () => {
    const { container } = render(
      <ProField
        className="test-field"
        type="select"
        options={mockOptions}
        props={{ transitionName: '', open: true }}
      />,
    )
    // 没搜索前，所有选项都存在
    expect(screen.getByText('选项1')).toBeInTheDocument()
    expect(screen.getByText('选项2')).toBeInTheDocument()
    expect(screen.getByText('选项3')).toBeInTheDocument()
    expect(screen.getByText('选项4')).toBeInTheDocument()
    expect(screen.getByText('选项5')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Please select'))
    fireEvent.change(container.querySelector('.test-field .ant-select-selection-search-input')!, {
      target: { value: '选项1' },
    })
    expect(screen.getByText('选项1')).toBeInTheDocument()
    expect(screen.queryByText('选项2')).not.toBeInTheDocument()
    expect(screen.queryByText('选项2')).not.toBeInTheDocument()
    expect(screen.queryByText('选项3')).not.toBeInTheDocument()
    expect(screen.queryByText('选项4')).not.toBeInTheDocument()
    expect(screen.queryByText('选项5')).not.toBeInTheDocument()
  })

  // 能够通过上下文配置正确的语言
  it('能够通过上下文配置正确的语言', async () => {
    const { container: container1 } = render(<ProField className="test-field1" type="select" />)
    expect(container1.querySelector('.test-field1 .ant-select-selection-placeholder')!?.innerHTML).toBe('Please select')

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-field2" type="select" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(container2.querySelector('.test-field2 .ant-select-selection-placeholder')!?.innerHTML).toBe('请选择')
  })
})

describe('type="select" 浏览模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const node = render(<ProField mode="view" type="select" label="Test Label" />)
    expect(node.getByText('--')).toBeInTheDocument()
    expect(node.getByText('Test Label')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('初始值能正确显示', async () => {
    const node = render(<ProField mode="view" type="select" initialValue={2} options={mockOptions} />)
    expect(node.getByText('选项2')).toBeInTheDocument()
  })

  // 初始值可以类型模糊
  it('初始值可以类型模糊', async () => {
    const node = render(<ProField mode="view" type="select" initialValue="2" options={mockOptions} />)
    expect(node.getByText('选项2')).toBeInTheDocument()
  })
})
