import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

describe('type="switch" 编辑模式', () => {
  it('正确渲染 Switch 组件', () => {
    const { container } = render(<ProField type="switch" label="开关" name="enabled" />)
    expect(container.querySelector('.ant-switch')).toBeInTheDocument()
  })

  it('Switch 使用 valuePropName=checked（通过 Form initialValues 设置）', () => {
    const { Form } = require('antd')
    const { container } = render(
      <Form initialValues={{ enabled: true }}>
        <ProField type="switch" label="开关" name="enabled" />
      </Form>,
    )
    const switchEl = container.querySelector('.ant-switch')
    expect(switchEl).toBeInTheDocument()
    expect(switchEl!.classList.contains('ant-switch-checked')).toBe(true)
  })

  it('initialValue=false 时默认未选中', () => {
    const { container } = render(<ProField type="switch" label="开关" name="enabled" initialValue={false} />)
    expect(container.querySelector('.ant-switch-checked')).not.toBeInTheDocument()
  })

  it('点击可切换状态', async () => {
    const { container } = render(<ProField type="switch" label="开关" name="enabled" />)
    const switchBtn = container.querySelector('.ant-switch')!
    fireEvent.click(switchBtn)
    await delay(100)
    expect(container.querySelector('.ant-switch-checked')).toBeInTheDocument()

    fireEvent.click(switchBtn)
    await delay(100)
    expect(container.querySelector('.ant-switch-checked')).not.toBeInTheDocument()
  })
})

describe('type="switch" 只读模式', () => {
  it('view 模式渲染 disabled Switch', () => {
    const { container } = render(<ProField type="switch" label="开关" name="enabled" mode="view" initialValue={true} />)
    const switchEl = container.querySelector('.ant-switch')
    expect(switchEl).toBeInTheDocument()
    expect(switchEl?.classList.contains('ant-switch-disabled')).toBe(true)
  })
})
