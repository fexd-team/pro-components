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
    label: '选项1',
    value: '1',
    key: '1',
    children: [
      {
        label: '选项1-1',
        value: '1-1',
        key: '1-1',
      },
      {
        label: '选项1-2',
        value: '1-2',
        key: '1-2',
      },
    ],
  },
  {
    label: '选项2',
    value: '2',
    key: '2',
    children: [
      {
        label: '选项2-1',
        value: '2-1',
        key: '2-1',
      },
    ],
  },
]

// 编辑模式
describe('type="multipleTreeSelect" 编辑模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const { container } = render(<ProField className="test-field" type="multipleTreeSelect" label="Test Label" />)
    expect(container.querySelector('.test-field .ant-select')).toBeInTheDocument()
    expect(container.querySelector('.test-field .ant-form-item-label > label')!.textContent).toBe('Test Label')
  })

  // 初始值能正确赋值
  it('初始值能正确赋值', async () => {
    const { container } = render(
      <ProField className="test-field" type="multipleTreeSelect" initialValue={[1, 2]} options={mockOptions} />,
    )
    expect(container.querySelectorAll('.test-field .ant-select-selection-item').length).toBe(2)
    expect(container.querySelectorAll('.test-field .ant-select-selection-item')!?.[0]?.textContent).toBe('选项1')
    expect(container.querySelectorAll('.test-field .ant-select-selection-item')!?.[1]?.textContent).toBe('选项2')
  })

  // 能够正确选择值
  it('能够正确选择值', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <ProField
        className="test-field"
        type="multipleTreeSelect"
        options={mockOptions}
        props={{ onChange, open: true }}
      />,
    )
    fireEvent.click(screen.getByText('选项2'))
    expect(onChange).toBeCalledWith(
      [2, '2-1'],
      [
        {
          label: '选项2',
          value: 2,
        },
        '选项2-1',
      ],
      { checked: true, preValue: [], triggerValue: '2' },
    )
  })
})

// 浏览模式
describe('type="multipleTreeSelect" 浏览模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const node = render(<ProField mode="view" type="multipleTreeSelect" label="Test Label" />)
    expect(node.getByText('--')).toBeInTheDocument()
    expect(node.getByText('Test Label')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('初始值能正确显示', async () => {
    const node = render(<ProField mode="view" type="multipleTreeSelect" initialValue={[1, 2]} options={mockOptions} />)
    expect(node.getByText('选项1')).toBeInTheDocument()
    expect(node.getByText('选项2')).toBeInTheDocument()
  })

  // 初始值可以类型模糊
  it('初始值可以类型模糊', async () => {
    const node = render(
      <ProField mode="view" type="multipleTreeSelect" initialValue={['1', '2']} options={mockOptions} />,
    )
    expect(node.getByText('选项1')).toBeInTheDocument()
    expect(node.getByText('选项2')).toBeInTheDocument()
  })
})
