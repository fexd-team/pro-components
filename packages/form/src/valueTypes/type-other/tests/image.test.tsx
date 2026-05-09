import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

describe('type="image" 编辑模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('正确渲染图片上传组件（picture-card）', async () => {
    const { container } = render(<ProField type="image" name="avatar" />)

    await waitFor(
      () => {
        const upload = container.querySelector('.ant-upload-select')
        expect(upload).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('渲染 picture-card 样式', async () => {
    const { container } = render(<ProField type="image" name="avatar" />)

    await waitFor(
      () => {
        const pictureCard =
          container.querySelector('.ant-upload-list-picture-card') ||
          container.querySelector('[class*="picture-card"]') ||
          container.querySelector('.ant-upload')
        expect(pictureCard).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('已有图片通过 Form 正确显示', async () => {
    const Form = require('antd').Form
    const fileList = [{ uid: '1', name: 'photo.jpg', status: 'done', url: 'http://example.com/photo.jpg' }]

    const { container } = render(
      <Form initialValues={{ avatar: fileList }}>
        <ProField type="image" name="avatar" />
      </Form>,
    )

    await waitFor(
      () => {
        const items = container.querySelectorAll('.ant-upload-list-item')
        expect(items.length).toBeGreaterThanOrEqual(1)
      },
      { timeout: 3000 },
    )
  })

  it('accept 限制为图片类型', async () => {
    const { container } = render(<ProField type="image" name="avatar" />)

    await waitFor(
      () => {
        const input = container.querySelector('input[type="file"]')
        expect(input).toBeInTheDocument()
        expect(input?.getAttribute('accept')).toBe('image/*')
      },
      { timeout: 3000 },
    )
  })
})

describe('type="image" 只读模式', () => {
  beforeEach(() => jest.useRealTimers())

  it('view 模式字符串 URL 渲染图片预览', async () => {
    const { container } = render(
      <ProField type="image" name="avatar" mode="view" initialValue="http://example.com/photo.jpg" />,
    )

    await waitFor(
      () => {
        const img = container.querySelector('img')
        expect(img).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('view 模式字符串数组渲染多图预览', async () => {
    const { container } = render(
      <ProField
        type="image"
        name="photos"
        mode="view"
        initialValue={['http://example.com/a.jpg', 'http://example.com/b.jpg']}
      />,
    )

    await waitFor(
      () => {
        const imgs = container.querySelectorAll('img')
        expect(imgs.length).toBeGreaterThanOrEqual(2)
      },
      { timeout: 3000 },
    )
  })

  it('view 模式无值时显示占位符', async () => {
    const { container } = render(<ProField type="image" name="avatar" mode="view" />)

    await waitFor(
      () => {
        expect(container.textContent).toContain('--')
      },
      { timeout: 3000 },
    )
  })
})
