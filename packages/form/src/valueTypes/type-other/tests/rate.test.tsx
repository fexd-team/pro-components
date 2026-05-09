import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProField from '../../../components/ProField'

describe('type="rate" 编辑模式', () => {
  it('正确渲染 Rate 组件', () => {
    const { container } = render(<ProField type="rate" label="评分" name="score" />)
    expect(container.querySelector('.ant-rate')).toBeInTheDocument()
    const stars = container.querySelectorAll('.ant-rate-star')
    expect(stars.length).toBe(5)
  })

  it('initialValue 正确设置星数', () => {
    const { container } = render(<ProField type="rate" label="评分" name="score" initialValue={3} />)
    const fullStars = container.querySelectorAll('.ant-rate-star-full')
    expect(fullStars.length).toBe(3)
  })

  it('支持半星选择 (allowHalf)', () => {
    const { container } = render(<ProField type="rate" label="评分" name="score" initialValue={3.5} />)
    const halfStars = container.querySelectorAll('.ant-rate-star-half')
    const fullStars = container.querySelectorAll('.ant-rate-star-full')
    expect(fullStars.length).toBe(3)
    expect(halfStars.length).toBe(1)
  })
})

describe('type="rate" 只读模式', () => {
  it('view 模式渲染 disabled Rate', () => {
    const { container } = render(<ProField type="rate" label="评分" name="score" mode="view" initialValue={4} />)
    const rate = container.querySelector('.ant-rate')
    expect(rate).toBeInTheDocument()
    expect(rate?.classList.contains('ant-rate-disabled')).toBe(true)
    const fullStars = container.querySelectorAll('.ant-rate-star-full')
    expect(fullStars.length).toBe(4)
  })
})
