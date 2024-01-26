/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider, t } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

describe('type="money" 编辑模式', () => {
  // 能够正确渲染
  it('can render correctly', async () => {
    const { container } = render(<ProField className="test-field" type="money" label="Test Money" />)
    expect(container.querySelector('.test-field .ant-input-number-input')).toBeInTheDocument()
    expect(container.querySelector('.test-field .ant-input-number-input')!.getAttribute('value')).toBe('')
    expect(container.querySelector('.test-field .ant-form-item-label > label')!.textContent).toBe('Test Money')
  })

  // 初始值能正确赋值
  it('initialValue can be set correctly', async () => {
    const value = '123456789.1234'
    const { container } = render(<ProField className="test-field" initialValue={value} type="money" />)
    expect(container.querySelector('.test-field .ant-input-number-input')!.getAttribute('value')).toBe(
      t(`${value}@number`),
    )
  })

  // 能够正确输入值
  it('can input value correctly', async () => {
    const value = '123456789.1234'
    const { container } = render(<ProField className="test-field" type="money" />)
    const input = container.querySelector('.test-field .ant-input-number-input')! as any
    fireEvent.change(input, { target: { value } })
    await delay(300)
    expect(input?.value).toBe(t(`${value}@number`))
  })

  // 能够通过上下文配置正确的语言
  it('can set locale correctly', async () => {
    const { container: container1 } = render(<ProField className="test-field1" type="money" />)
    expect(container1.querySelector('.test-field1 .ant-input-number-input')!.getAttribute('placeholder')).toBe(
      'Please enter',
    )

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-field2" type="money" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(container2.querySelector('.test-field2 .ant-input-number-input')!.getAttribute('placeholder')).toBe('请输入')
  })

  // 传递 unit 属性时能够正确显示货币单位
  it('can set unit correctly', async () => {
    const { container } = render(<ProField className="test-field" type="money" unit="¥" />)
    expect(container.querySelector('.test-field .ant-input-number-input')!.getAttribute('placeholder')).toBe(
      'Please enter',
    )
    expect(container.querySelector('.test-field .ant-input-number-group-addon')!?.innerHTML).toBe('¥')
  })
})

describe('type="money" 浏览模式', () => {
  // 能够正确渲染
  it('can render correctly', async () => {
    const node = render(<ProField mode="view" type="money" label="Test Money" />)
    expect(node.getByText('--')).toBeInTheDocument()
    expect(node.getByText('Test Money')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('initialValue can be set correctly', async () => {
    const value = '123456789.1234'
    const node = render(
      <div className="test-field">
        <ProField mode="view" initialValue={value} type="money" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(t(`${value}@number`))).toBeInTheDocument()
  })

  // 传递 unit 属性时能够正确显示货币单位
  it('can set unit correctly', async () => {
    const value = '123456789.1234'
    const node = render(
      <div className="test-field">
        <ProField mode="view" initialValue={value} type="money" unit="¥" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(`¥ ${t(`${value}@number`)}`)).toBeInTheDocument()
  })
})
