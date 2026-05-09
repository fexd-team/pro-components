import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Actions from '../Actions'

describe('Actions', () => {
  it('渲染按钮配置数组', () => {
    const { container } = render(<Actions configs={[{ children: 'Edit' }, { children: 'Del' }]} />)
    const buttons = container.querySelectorAll('.ant-btn')
    expect(buttons.length).toBe(2)
  })

  it('configs 为空数组时不渲染任何内容', () => {
    const { container } = render(<Actions configs={[]} />)
    expect(container.innerHTML).toBe('')
  })

  it('configs 为函数时调用并渲染', () => {
    const configsFn = () => [{ children: 'ActionA' }, { children: 'ActionB' }]
    const { container } = render(<Actions configs={configsFn} />)
    const buttons = container.querySelectorAll('.ant-btn')
    expect(buttons.length).toBe(2)
  })

  it('hidden 为 true 的配置不渲染', () => {
    const { container } = render(<Actions configs={[{ children: 'Visible' }, { children: 'Hidden', hidden: true }]} />)
    const buttons = container.querySelectorAll('.ant-btn')
    expect(buttons.length).toBe(1)
  })

  it('点击按钮触发 onClick', () => {
    const handleClick = jest.fn()
    const { container } = render(<Actions configs={[{ children: 'Click', onClick: handleClick }]} />)
    fireEvent.click(container.querySelector('.ant-btn')!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('noWrapper 模式不使用 Space 包裹', () => {
    const { container } = render(<Actions noWrapper configs={[{ children: 'A' }, { children: 'B' }]} />)
    expect(container.querySelector('.ant-space')).toBeNull()
  })

  it('builtIn 从 getBuiltInActions 中获取配置', () => {
    const builtInActions = () => ({
      view: { children: 'View Details', type: 'link' as const },
    })
    const { container } = render(<Actions configs={[{ builtIn: 'view' }]} getBuiltInActions={builtInActions} />)
    expect(container.querySelector('.ant-btn')).toBeInTheDocument()
  })

  it('shareAutoLoading 模式渲染多个按钮', () => {
    const { container } = render(
      <Actions
        shareAutoLoading
        configs={[
          { children: 'Slow', onClick: () => new Promise((r) => setTimeout(r, 1000)) },
          { children: 'Normal', onClick: () => {} },
        ]}
      />,
    )
    const buttons = container.querySelectorAll('.ant-btn')
    expect(buttons.length).toBe(2)
  })

  it('spaceSize 属性传递给 Space 组件', () => {
    const { container } = render(<Actions spaceSize="large" configs={[{ children: 'A' }, { children: 'B' }]} />)
    const space = container.querySelector('.ant-space')
    expect(space).toBeInTheDocument()
  })

  it('actionParams 传递给 configs 函数', () => {
    const configsFn = jest.fn((...args: any[]) => [{ children: args[0]?.name ?? 'fallback' }])
    const { container } = render(<Actions configs={configsFn} actionParams={() => [{ name: 'Test' }]} />)
    expect(configsFn).toHaveBeenCalled()
    const buttons = container.querySelectorAll('.ant-btn')
    expect(buttons.length).toBe(1)
  })

  it('renderAction 自定义渲染', () => {
    const customRender = (props: any) => <button data-testid="custom-action">{props.children}</button>
    render(<Actions configs={[{ children: 'Custom' }]} renderAction={customRender} />)
    expect(screen.getByTestId('custom-action')).toBeInTheDocument()
  })

  it('disabled 属性禁用所有按钮', () => {
    const { container } = render(<Actions disabled shareAutoLoading configs={[{ children: 'A' }, { children: 'B' }]} />)
    const buttons = container.querySelectorAll('.ant-btn')
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })
})
