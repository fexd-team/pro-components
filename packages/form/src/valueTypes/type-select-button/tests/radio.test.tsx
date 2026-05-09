import React from 'react'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

const mockOptions = [
  { label: '选项A', value: 'a' },
  { label: '选项B', value: 'b' },
  { label: '选项C', value: 'c' },
]

describe('type="radio" 编辑模式', () => {
  it('正确渲染 Radio 组件', () => {
    const { container } = render(<ProField type="radio" label="单选" name="radio" options={mockOptions} />)
    expect(container.querySelector('.ant-radio-group')).toBeInTheDocument()
    const radios = container.querySelectorAll('.ant-radio-wrapper')
    expect(radios.length).toBe(3)
  })

  it('initialValue 正确选中', () => {
    const { container } = render(
      <ProField type="radio" label="单选" name="radio" initialValue="b" options={mockOptions} />,
    )
    const checked = container.querySelector('.ant-radio-checked')
    expect(checked).toBeInTheDocument()
  })

  it('渲染正确数量的选项', async () => {
    jest.useRealTimers()
    const { container } = render(<ProField type="radio" label="单选" name="radio" options={mockOptions} />)
    await waitFor(
      () => {
        const wrappers = container.querySelectorAll('.ant-radio-wrapper')
        expect(wrappers.length).toBe(3)
      },
      { timeout: 3000 },
    )
  })
})

describe('type="radio" 只读模式', () => {
  it('view 模式显示选项文本', () => {
    const { container } = render(
      <ProField type="radio" label="单选" name="radio" mode="view" initialValue="b" options={mockOptions} />,
    )
    expect(container.querySelector('.ant-radio-group')).not.toBeInTheDocument()
    expect(container.textContent).toContain('选项B')
  })

  it('view 模式 value 为空时显示 --', () => {
    const { container } = render(<ProField type="radio" label="单选" name="radio" mode="view" options={mockOptions} />)
    expect(container.textContent).toContain('--')
  })
})

describe('type="radioButton" 编辑模式', () => {
  it('正确渲染按钮形式的 Radio', () => {
    const { container } = render(<ProField type="radioButton" label="按钮单选" name="radioBtn" options={mockOptions} />)
    expect(container.querySelector('.ant-radio-group')).toBeInTheDocument()
    const buttons = container.querySelectorAll('.ant-radio-button-wrapper')
    expect(buttons.length).toBe(3)
  })

  it('渲染正确数量的按钮选项', async () => {
    jest.useRealTimers()
    const { container } = render(<ProField type="radioButton" label="按钮单选" name="radioBtn" options={mockOptions} />)
    await waitFor(
      () => {
        const buttons = container.querySelectorAll('.ant-radio-button-wrapper')
        expect(buttons.length).toBe(3)
      },
      { timeout: 3000 },
    )
  })
})

describe('type="radioButton" 只读模式', () => {
  it('view 模式显示选项文本', () => {
    const { container } = render(
      <ProField
        type="radioButton"
        label="按钮单选"
        name="radioBtn"
        mode="view"
        initialValue="c"
        options={mockOptions}
      />,
    )
    expect(container.textContent).toContain('选项C')
  })
})
