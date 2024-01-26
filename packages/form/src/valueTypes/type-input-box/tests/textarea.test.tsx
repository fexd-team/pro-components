/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

describe('type="textarea" 编辑模式', () => {
  // 能够正确渲染
  it('can render correctly', async () => {
    const { container } = render(<ProField className="test-field" type="textarea" label="Test TextArea" />)
    expect(container.querySelector('.test-field .ant-input')).toBeInTheDocument()
    expect((container.querySelector('.test-field .ant-input')! as any)?.value as any).toBe('')
    expect(container.querySelector('.test-field .ant-form-item-label > label')!.textContent).toBe('Test TextArea')
  })

  // 初始值能正确赋值
  it('initialValue can be set correctly', async () => {
    const value = 'test value'
    const { container } = render(<ProField className="test-field" initialValue={value} type="textarea" />)
    expect((container.querySelector('.test-field .ant-input')! as any)?.value).toBe(value)
  })

  // 能够正确输入值
  it('can input value correctly', async () => {
    const value = 'test value'
    const { container } = render(<ProField className="test-field" type="textarea" />)
    const input = container.querySelector('.test-field .ant-input')! as any
    fireEvent.change(input, { target: { value } })
    await delay(300)
    expect(input?.value as any).toBe(value)
  })

  // 能够通过上下文配置正确的语言
  it('can set locale correctly', async () => {
    const { container: container1 } = render(<ProField className="test-field1" type="textarea" />)
    expect(container1.querySelector('.test-field1 .ant-input')!.getAttribute('placeholder')).toBe('Please enter')

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-field2" type="textarea" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(container2.querySelector('.test-field2 .ant-input')!.getAttribute('placeholder')).toBe('请输入')
  })
})

describe('type="textarea" 浏览模式', () => {
  // 能够正确渲染
  it('can render correctly', async () => {
    const node = render(<ProField mode="view" type="textarea" label="Test TextArea" />)
    expect(node.getByText('--')).toBeInTheDocument()
    expect(node.getByText('Test TextArea')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('initialValue can be set correctly', async () => {
    const value = 'test value'
    const node = render(
      <div className="test-field">
        <ProField mode="view" initialValue={value} type="textarea" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(value)).toBeInTheDocument()
  })
})
