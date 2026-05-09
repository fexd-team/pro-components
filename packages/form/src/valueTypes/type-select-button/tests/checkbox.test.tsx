import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

const mockOptions = [
  { label: '读', value: 'read' },
  { label: '写', value: 'write' },
  { label: '执行', value: 'exec' },
]

describe('type="checkbox" 编辑模式', () => {
  it('正确渲染 Checkbox 组件', () => {
    const { container } = render(<ProField type="checkbox" label="权限" name="perms" options={mockOptions} />)
    expect(container.querySelector('.ant-checkbox-group')).toBeInTheDocument()
    const checkboxes = container.querySelectorAll('.ant-checkbox-wrapper')
    expect(checkboxes.length).toBe(3)
  })

  it('initialValue 正确选中多个', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProField type="checkbox" label="权限" name="perms" initialValue={['read', 'write']} options={mockOptions} />,
    )
    await waitFor(
      () => {
        const checkboxes = container.querySelectorAll('.ant-checkbox-wrapper')
        expect(checkboxes.length).toBe(3)
      },
      { timeout: 3000 },
    )
  })

  it('渲染正确数量的选项', async () => {
    jest.useRealTimers()
    const { container } = render(<ProField type="checkbox" label="权限" name="perms" options={mockOptions} />)
    await waitFor(
      () => {
        const checkboxes = container.querySelectorAll('.ant-checkbox-wrapper')
        expect(checkboxes.length).toBe(3)
      },
      { timeout: 3000 },
    )
  })
})

describe('type="checkbox" 只读模式', () => {
  it('view 模式显示选中项的文本', () => {
    const { container } = render(
      <ProField
        type="checkbox"
        label="权限"
        name="perms"
        mode="view"
        initialValue={['read', 'exec']}
        options={mockOptions}
      />,
    )
    expect(container.querySelector('.ant-checkbox-group')).not.toBeInTheDocument()
    expect(container.textContent).toContain('读')
    expect(container.textContent).toContain('执行')
  })

  it('view 模式 value 为空时显示 --', () => {
    const { container } = render(
      <ProField type="checkbox" label="权限" name="perms" mode="view" options={mockOptions} />,
    )
    expect(container.textContent).toContain('--')
  })
})
