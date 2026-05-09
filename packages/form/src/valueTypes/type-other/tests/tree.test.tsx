import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

const mockTreeOptions = [
  {
    label: '节点1',
    value: 'node1',
    children: [
      { label: '子节点1-1', value: 'node1-1' },
      { label: '子节点1-2', value: 'node1-2' },
    ],
  },
  {
    label: '节点2',
    value: 'node2',
    children: [{ label: '子节点2-1', value: 'node2-1' }],
  },
]

describe('type="singleTree" 编辑模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('正确渲染 Tree 组件', async () => {
    const { container } = render(<ProField type="singleTree" name="category" options={mockTreeOptions} />)

    await waitFor(
      () => {
        const tree = container.querySelector('.ant-tree')
        expect(tree).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('渲染树节点', async () => {
    const { container } = render(<ProField type="singleTree" name="category" options={mockTreeOptions} />)

    await waitFor(
      () => {
        const treeNodes = container.querySelectorAll('.ant-tree-treenode')
        expect(treeNodes.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })

  it('单选模式（selectable=true, checkable=false）', async () => {
    const { container } = render(<ProField type="singleTree" name="category" options={mockTreeOptions} />)

    await waitFor(
      () => {
        const checkboxes = container.querySelectorAll('.ant-tree-checkbox')
        expect(checkboxes.length).toBe(0)
      },
      { timeout: 3000 },
    )
  })

  it('支持远程选项', async () => {
    const remoteOptions = async () => mockTreeOptions

    const { container } = render(<ProField type="singleTree" name="category" options={remoteOptions} />)

    await waitFor(
      () => {
        const tree = container.querySelector('.ant-tree')
        expect(tree).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})

describe('type="singleTree" 只读模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('view 模式渲染只读 Tree', async () => {
    const { container } = render(
      <ProField type="singleTree" name="category" mode="view" options={mockTreeOptions} initialValue="node1-1" />,
    )

    await waitFor(
      () => {
        const tree = container.querySelector('.ant-tree')
        expect(tree).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})

describe('type="tree" 编辑模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('正确渲染 Tree 组件（多选可勾选）', async () => {
    const { container } = render(<ProField type="tree" name="permissions" options={mockTreeOptions} />)

    await waitFor(
      () => {
        const tree = container.querySelector('.ant-tree')
        expect(tree).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('渲染 checkbox 节点', async () => {
    const { container } = render(<ProField type="tree" name="permissions" options={mockTreeOptions} />)

    await waitFor(
      () => {
        const checkboxes = container.querySelectorAll('.ant-tree-checkbox')
        expect(checkboxes.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })

  it('initialValue 通过 Form 正确勾选节点', async () => {
    const Form = require('antd').Form

    const { container } = render(
      <Form initialValues={{ permissions: ['node1-1', 'node2-1'] }}>
        <ProField type="tree" name="permissions" options={mockTreeOptions} />
      </Form>,
    )

    await waitFor(
      () => {
        const checked = container.querySelectorAll('.ant-tree-checkbox-checked')
        expect(checked.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })

  it('支持远程选项', async () => {
    const remoteOptions = async () => mockTreeOptions

    const { container } = render(<ProField type="tree" name="permissions" options={remoteOptions} />)

    await waitFor(
      () => {
        const tree = container.querySelector('.ant-tree')
        expect(tree).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})

describe('type="tree" 只读模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('view 模式渲染只读 Tree', async () => {
    const { container } = render(
      <ProField type="tree" name="permissions" mode="view" options={mockTreeOptions} initialValue={['node1-1']} />,
    )

    await waitFor(
      () => {
        const tree = container.querySelector('.ant-tree')
        expect(tree).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
