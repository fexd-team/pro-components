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
      {
        label: '选项2-2',
        value: '2-2',
        key: '2-2',
      },
    ],
  },
]

describe('type="treeSelect" 编辑模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const { container } = render(<ProField className="test-field" type="treeSelect" label="Test Label" />)
    expect(container.querySelector('.test-field .ant-tree-select')).toBeInTheDocument()
    expect(container.querySelector('.test-field .ant-form-item-label > label')!.textContent).toBe('Test Label')
  })

  // 初始值能正确赋值
  it('初始值能正确赋值', async () => {
    const { container } = render(
      <ProField className="test-field" type="treeSelect" initialValue="1-1" options={mockOptions} />,
    )
    expect(container.querySelector('.test-field .ant-select-selection-item')!.textContent).toBe('选项1-1')
  })

  // 能够正确选择值
  it('能够正确选择值', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <ProField className="test-field" type="treeSelect" options={mockOptions} props={{ onChange, open: true }} />,
    )
    fireEvent.click(screen.getByText('选项1', { selector: '.ant-select-tree-title' }))
    // await delay(100)
    // fireEvent.click(screen.getByText('选项1-1', { selector: '.ant-select-tree-title' }))
    expect(onChange).toBeCalledWith('1', ['选项1'], { preValue: [], selected: true, triggerValue: '1' })
  })
})

describe('type="treeSelect" 浏览模式', () => {
  // 能够正确渲染
  it('能够正确渲染', async () => {
    const node = render(<ProField mode="view" type="treeSelect" label="Test Label" />)
    expect(node.getByText('--')).toBeInTheDocument()
    expect(node.getByText('Test Label')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('初始值能正确显示', async () => {
    const node = render(<ProField mode="view" type="treeSelect" initialValue="1-1" options={mockOptions} />)
    expect(node.getByText('选项1-1')).toBeInTheDocument()
  })

  // 初始值可以类型模糊
  it('初始值可以类型模糊', async () => {
    const node = render(<ProField mode="view" type="treeSelect" initialValue="1-1" options={mockOptions} />)
    expect(node.getByText('选项1-1')).toBeInTheDocument()
  })
})
