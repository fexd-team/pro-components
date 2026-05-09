import React from 'react'
import { render, waitFor } from '@testing-library/react'
import PreviewImageGroup from '../PreviewImageGroup'

describe('PreviewImageGroup', () => {
  it('渲染图片列表', () => {
    const { container } = render(<PreviewImageGroup srcList={['img1.png', 'img2.png', 'img3.png']} />)
    const images = container.querySelectorAll('.ant-image')
    expect(images.length).toBe(3)
  })

  it('空列表时渲染空容器', () => {
    const { container } = render(<PreviewImageGroup srcList={[]} />)
    const wrapper = container.querySelector('.f-pro-utils-preview-image-group')
    expect(wrapper).toBeInTheDocument()
    const images = container.querySelectorAll('.ant-image')
    expect(images.length).toBe(0)
  })

  it('应用 previewGroupWrapperClassName', () => {
    const { container } = render(<PreviewImageGroup srcList={['a.png']} previewGroupWrapperClassName="custom-class" />)
    const wrapper = container.querySelector('.f-pro-utils-preview-image-group.custom-class')
    expect(wrapper).toBeInTheDocument()
  })

  it('应用 previewGroupWrapperStyle', () => {
    const { container } = render(
      <PreviewImageGroup srcList={['a.png']} previewGroupWrapperStyle={{ padding: '10px' }} />,
    )
    const wrapper = container.querySelector('.f-pro-utils-preview-image-group') as HTMLElement
    expect(wrapper.style.padding).toBe('10px')
  })

  it('无 srcList 时默认渲染空', () => {
    const { container } = render(<PreviewImageGroup />)
    const wrapper = container.querySelector('.f-pro-utils-preview-image-group')
    expect(wrapper).toBeInTheDocument()
  })

  it('imageProps 传递给 Image 组件', () => {
    const { container } = render(
      <PreviewImageGroup srcList={['test.png']} imageProps={{ width: 200, height: 200, alt: 'test-image' }} />,
    )
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('alt', 'test-image')
  })

  it('fileList 有 url 时直接使用', async () => {
    const onLoad = jest.fn()
    const { container } = render(
      <PreviewImageGroup fileList={[{ url: 'http://example.com/img.png' }]} onLoad={onLoad} />,
    )
    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled()
    })
  })

  it('onLoad 在 srcList 模式下直接触发', () => {
    const onLoad = jest.fn()
    render(<PreviewImageGroup srcList={['a.png']} onLoad={onLoad} />)
    expect(onLoad).toHaveBeenCalled()
  })

  it('点击事件被 stopPropagation', () => {
    const parentHandler = jest.fn()
    const { container } = render(
      <div onClick={parentHandler}>
        <PreviewImageGroup srcList={['a.png']} />
      </div>,
    )
    const wrapper = container.querySelector('.f-pro-utils-preview-image-group')!
    wrapper.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(parentHandler).not.toHaveBeenCalled()
  })
})
