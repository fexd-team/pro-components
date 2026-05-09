import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

const mockOptions = [
  { label: '项目A', value: 'a' },
  { label: '项目B', value: 'b' },
]

describe('type="modalSelect" 编辑模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('正确渲染 Select 组件', async () => {
    const { container } = render(<ProField type="modalSelect" name="project" options={mockOptions} />)

    await waitFor(
      () => {
        const select = container.querySelector('.ant-select')
        expect(select).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('下拉菜单被隐藏（dropdown 不可见）', async () => {
    const { container } = render(<ProField type="modalSelect" name="project" options={mockOptions} />)

    await waitFor(
      () => {
        const select = container.querySelector('.ant-select')
        expect(select).toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    fireEvent.click(container.querySelector('.ant-select-selector')!)

    await delay(200)
    const dropdown = container.querySelector('.ant-select-dropdown')
    expect(dropdown).toBeNull()
  })

  it('渲染全屏图标后缀', async () => {
    const { container } = render(<ProField type="modalSelect" name="project" options={mockOptions} />)

    await waitFor(
      () => {
        const icon =
          container.querySelector('[aria-label="fullscreen"]') || container.querySelector('.anticon-fullscreen')
        expect(icon).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('initialValue 正确显示已选项', async () => {
    const { container } = render(<ProField type="modalSelect" name="project" options={mockOptions} initialValue="a" />)

    await waitFor(
      () => {
        expect(container.textContent).toContain('项目A')
      },
      { timeout: 3000 },
    )
  })
})

describe('type="modalSelect" 只读模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('view 模式显示选中值的 label', async () => {
    const { container } = render(
      <ProField type="modalSelect" name="project" mode="view" options={mockOptions} initialValue="a" />,
    )

    await waitFor(
      () => {
        expect(container.textContent).toContain('项目A')
      },
      { timeout: 3000 },
    )
  })
})

describe('type="modalMultipleSelect" 编辑模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('正确渲染多选 Select 组件', async () => {
    const { container } = render(<ProField type="modalMultipleSelect" name="projects" options={mockOptions} />)

    await waitFor(
      () => {
        const select = container.querySelector('.ant-select')
        expect(select).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('渲染全屏图标后缀', async () => {
    const { container } = render(<ProField type="modalMultipleSelect" name="projects" options={mockOptions} />)

    await waitFor(
      () => {
        const icon =
          container.querySelector('[aria-label="fullscreen"]') || container.querySelector('.anticon-fullscreen')
        expect(icon).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('initialValue 正确显示已选多项', async () => {
    const { container } = render(
      <ProField type="modalMultipleSelect" name="projects" options={mockOptions} initialValue={['a', 'b']} />,
    )

    await waitFor(
      () => {
        expect(container.textContent).toContain('项目A')
        expect(container.textContent).toContain('项目B')
      },
      { timeout: 3000 },
    )
  })
})

describe('type="modalMultipleSelect" 只读模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('view 模式显示多个已选项文本', async () => {
    const { container } = render(
      <ProField
        type="modalMultipleSelect"
        name="projects"
        mode="view"
        options={mockOptions}
        initialValue={['a', 'b']}
      />,
    )

    await waitFor(
      () => {
        expect(container.textContent).toContain('项目A')
        expect(container.textContent).toContain('项目B')
      },
      { timeout: 3000 },
    )
  })
})
