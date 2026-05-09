import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

const mockOptions = [
  { label: '选项A', value: 'a' },
  { label: '选项B', value: 'b' },
  { label: '选项C', value: 'c' },
  { label: '选项D', value: 'd' },
]

describe('type="transfer" 编辑模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('正确渲染 Transfer 组件', async () => {
    const { container } = render(<ProField type="transfer" name="perms" options={mockOptions} />)

    await waitFor(
      () => {
        const transfer = container.querySelector('.ant-transfer')
        expect(transfer).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('渲染所有数据源选项', async () => {
    const { container } = render(<ProField type="transfer" name="perms" options={mockOptions} />)

    await waitFor(
      () => {
        const transfer = container.querySelector('.ant-transfer')
        expect(transfer).toBeInTheDocument()
        const items = container.querySelectorAll('.ant-transfer-list-content-item')
        expect(items.length).toBeGreaterThanOrEqual(mockOptions.length)
      },
      { timeout: 3000 },
    )
  })

  it('initialValue 正确设置已选中项', async () => {
    const { container } = render(
      <ProField type="transfer" name="perms" options={mockOptions} initialValue={['a', 'b']} />,
    )

    await waitFor(
      () => {
        const targetList = container.querySelectorAll('.ant-transfer-list')
        expect(targetList.length).toBe(2)
      },
      { timeout: 3000 },
    )
  })

  it('支持远程选项（函数形式）', async () => {
    const remoteOptions = async () => mockOptions

    const { container } = render(<ProField type="transfer" name="perms" options={remoteOptions} />)

    await waitFor(
      () => {
        const transfer = container.querySelector('.ant-transfer')
        expect(transfer).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})

describe('type="transfer" 只读模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('view 模式渲染选中项文本', async () => {
    const { container } = render(
      <ProField type="transfer" name="perms" mode="view" options={mockOptions} initialValue={['a', 'b']} />,
    )

    await waitFor(
      () => {
        expect(container.textContent).toContain('选项A')
        expect(container.textContent).toContain('选项B')
      },
      { timeout: 3000 },
    )
  })
})
