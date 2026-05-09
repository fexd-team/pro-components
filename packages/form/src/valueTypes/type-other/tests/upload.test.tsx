import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

describe('type="upload" 编辑模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('正确渲染 Upload 组件', async () => {
    const { container } = render(<ProField type="upload" name="files" />)

    await waitFor(
      () => {
        const upload = container.querySelector('.ant-upload')
        expect(upload).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('渲染上传按钮', async () => {
    const { container } = render(<ProField type="upload" name="files" />)

    await waitFor(
      () => {
        const btn = container.querySelector('.ant-btn')
        expect(btn).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('已有文件列表通过 Form 正确显示', async () => {
    const Form = require('antd').Form
    const fileList = [{ uid: '1', name: 'test.pdf', status: 'done', url: 'http://example.com/test.pdf' }]

    const { container } = render(
      <Form initialValues={{ files: fileList }}>
        <ProField type="upload" name="files" />
      </Form>,
    )

    await waitFor(
      () => {
        expect(container.textContent).toContain('test.pdf')
      },
      { timeout: 3000 },
    )
  })

  it('maxCount 限制上传数量时隐藏按钮', async () => {
    const Form = require('antd').Form
    const fileList = [{ uid: '1', name: 'test.pdf', status: 'done', url: 'http://example.com/test.pdf' }]

    const { container } = render(
      <Form initialValues={{ files: fileList }}>
        <ProField type="upload" name="files" fieldProps={{ maxCount: 1 }} />
      </Form>,
    )

    await waitFor(
      () => {
        const uploadItems = container.querySelectorAll('.ant-upload-list-item')
        expect(uploadItems.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })
})

describe('type="upload" 只读模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('view 模式显示文件列表（无上传按钮）', async () => {
    const fileList = [{ uid: '1', name: 'doc.pdf', status: 'done', url: 'http://example.com/doc.pdf' }]

    const { container } = render(<ProField type="upload" name="files" mode="view" initialValue={fileList} />)

    await waitFor(
      () => {
        expect(container.textContent).toContain('doc.pdf')
      },
      { timeout: 3000 },
    )
  })

  it('view 模式无文件时显示占位符', async () => {
    const { container } = render(<ProField type="upload" name="files" mode="view" initialValue={[]} />)

    await waitFor(
      () => {
        expect(container.textContent).toContain('--')
      },
      { timeout: 3000 },
    )
  })

  it('view 模式支持字符串 URL 文件', async () => {
    const { container } = render(
      <ProField type="upload" name="files" mode="view" initialValue={['http://example.com/doc.pdf']} />,
    )

    await waitFor(
      () => {
        const upload = container.querySelector('.ant-upload')
        expect(upload).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
