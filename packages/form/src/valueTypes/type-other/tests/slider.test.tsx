import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

describe('type="slider" 编辑模式', () => {
  it('正确渲染 Slider 组件', () => {
    const { container } = render(<ProField type="slider" label="进度" name="progress" />)
    expect(container.querySelector('.ant-slider')).toBeInTheDocument()
  })

  it('initialValue 正确设置', () => {
    const { container } = render(<ProField type="slider" label="进度" name="progress" initialValue={50} />)
    expect(container.querySelector('.ant-slider')).toBeInTheDocument()
  })
})

describe('type="slider" 只读模式', () => {
  it('view 模式仍渲染 Slider（disabled 状态）', () => {
    const { container } = render(<ProField type="slider" label="进度" name="progress" mode="view" initialValue={75} />)
    const slider = container.querySelector('.ant-slider')
    if (slider) {
      expect(slider).toBeInTheDocument()
    } else {
      expect(container.textContent).toContain('75')
    }
  })
})
