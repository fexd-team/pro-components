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
  {
    value: '1',
    label: '选项1',
    children: [
      {
        value: '1-1',
        label: '选项1-1',
      },
      {
        value: '1-2',
        label: '选项1-2',
      },
    ],
  },
  {
    value: '2',
    label: '选项2',
    children: [
      {
        value: '2-1',
        label: '选项2-1',
      },
      {
        value: '2-2',
        label: '选项2-2',
      },
    ],
  },
]

describe('type="cascader" 编辑模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const { container } = render(<ProField className="test-field" type="cascader" label="Test Label" />)
    expect(container.querySelector('.test-field .ant-cascader')).toBeInTheDocument()
    expect(container.querySelector('.test-field .ant-form-item-label > label')!.textContent).toBe('Test Label')
  })

  // 初始值能正确赋值
  it('初始值能正确赋值', async () => {
    const { container } = render(
      <ProField className="test-field" type="cascader" initialValue={['1', '1-1']} options={mockOptions} />,
    )
    expect(container.querySelector('.test-field .ant-select-selection-item')!.textContent).toBe('选项1 / 选项1-1')
  })

  // 能够正确选择值
  it('能够正确选择值', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <ProField className="test-field" type="cascader" options={mockOptions} props={{ open: true, onChange }} />,
    )
    fireEvent.click(container.querySelector('.test-field .ant-cascader')!)
    fireEvent.click(screen.getByText('选项1', { selector: '.ant-cascader-menu-item-content' }))
    fireEvent.click(screen.getByText('选项1-1', { selector: '.ant-cascader-menu-item-content' }))
    expect(onChange).toBeCalledWith(['1', '1-1'], expect.anything())
  })

  // 能够通过上下文配置正确的语言
  it('能够通过上下文配置正确的语言', async () => {
    const { container: container1 } = render(<ProField className="test-field1" type="cascader" />)
    expect(container1.querySelector('.test-field1 .ant-select-selection-placeholder')!?.innerHTML).toBe('Please select')

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-field2" type="cascader" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(container2.querySelector('.test-field2 .ant-select-selection-placeholder')!?.innerHTML).toBe('请选择')
  })
})

describe('type="cascader" 浏览模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const node = render(<ProField mode="view" type="cascader" label="Test Label" />)
    await delay(100)
    expect(node.getByText('--')).toBeInTheDocument()
    expect(node.getByText('Test Label')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('初始值能正确显示', async () => {
    const node = render(<ProField mode="view" type="cascader" initialValue={['1', '1-1']} options={mockOptions} />)
    expect(node.getByText('选项1 / 选项1-1')).toBeInTheDocument()
  })

  // 初始值可以类型模糊
  it('初始值可以类型模糊', async () => {
    const node = render(<ProField mode="view" type="cascader" initialValue={['1', '1-1']} options={mockOptions} />)
    expect(node.getByText('选项1 / 选项1-1')).toBeInTheDocument()
  })
})
