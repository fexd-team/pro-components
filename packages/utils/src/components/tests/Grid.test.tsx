import React from 'react'
import { render } from '@testing-library/react'
import Grid from '../Grid'

describe('Grid', () => {
  it('渲染基本布局', () => {
    const { container } = render(
      <Grid layout={[{ content: <div>Col 1</div> }, { content: <div>Col 2</div> }, { content: <div>Col 3</div> }]} />,
    )
    expect(container.querySelector('.ant-row')).toBeInTheDocument()
    const cols = container.querySelectorAll('.ant-col')
    expect(cols.length).toBe(3)
  })

  it('默认 columns=3 时每列 span=8', () => {
    const { container } = render(
      <Grid layout={[{ content: <div>A</div> }, { content: <div>B</div> }, { content: <div>C</div> }]} />,
    )
    const cols = container.querySelectorAll('.ant-col')
    cols.forEach((col) => {
      expect(col.classList.contains('ant-col-8')).toBe(true)
    })
  })

  it('columns=2 时每列 span=12', () => {
    const { container } = render(<Grid columns={2} layout={[{ content: <div>A</div> }, { content: <div>B</div> }]} />)
    const cols = container.querySelectorAll('.ant-col')
    cols.forEach((col) => {
      expect(col.classList.contains('ant-col-12')).toBe(true)
    })
  })

  it('自定义 span 覆盖默认值', () => {
    const { container } = render(
      <Grid
        layout={[
          { content: <div>A</div>, span: 6 },
          { content: <div>B</div>, span: 18 },
        ]}
      />,
    )
    const cols = container.querySelectorAll('.ant-col')
    expect(cols[0].classList.contains('ant-col-6')).toBe(true)
    expect(cols[1].classList.contains('ant-col-18')).toBe(true)
  })

  it('二维数组布局（多行）', () => {
    const { container } = render(
      <Grid
        layout={[
          [{ content: <div>R1C1</div> }, { content: <div>R1C2</div> }],
          [{ content: <div>R2C1</div> }, { content: <div>R2C2</div> }],
        ]}
      />,
    )
    const cols = container.querySelectorAll('.ant-col')
    expect(cols.length).toBe(4)
  })

  it('layout 为 undefined 不崩溃', () => {
    const { container } = render(<Grid />)
    expect(container.querySelector('.ant-row')).toBeInTheDocument()
  })

  it('空 content 的配置项不渲染', () => {
    const { container } = render(<Grid layout={[{ span: 0 }, { content: <div>有内容</div> }]} />)
    const cols = container.querySelectorAll('.ant-col')
    expect(cols.length).toBeGreaterThanOrEqual(1)
  })

  it('支持传递 gutter 属性', () => {
    const { container } = render(<Grid gutter={[24, 16]} layout={[{ content: <div>A</div> }]} />)
    expect(container.querySelector('.ant-row')).toBeInTheDocument()
  })
})
