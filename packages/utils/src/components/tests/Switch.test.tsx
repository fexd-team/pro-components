import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'
import Switch from '../Switch'

describe('Switch', () => {
  test('onChange 正常工作', () => {
    const fn1 = jest.fn()
    const node = render(<Switch onChange={fn1} />)
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-switch')!)
    })

    expect(fn1).toBeCalledTimes(1)

    node.unmount()
  })

  test('onChange 支持异步自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Switch
        debouncedAutoLoading={false}
        onChange={async () => {
          fn1()
          await delay(500)
          fn1()
        }}
      />,
    )

    const buttonNode = node.container.querySelector('.ant-switch')!
    expect(buttonNode).not.toHaveClass('ant-switch-loading')
    act(() => {
      fireEvent.click(buttonNode)
    })
    await delay(120)
    expect(fn1).toBeCalledTimes(1)
    expect(buttonNode).toHaveClass('ant-switch-loading')
    expect(buttonNode.querySelector('.ant-switch-loading-icon')).toBeInTheDocument()
    await delay(500)
    expect(fn1).toBeCalledTimes(2)
    expect(buttonNode).not.toHaveClass('ant-switch-loading')
    expect(buttonNode.querySelector('.ant-switch-loading-icon')).not.toBeInTheDocument()
    node.unmount()
  })

  test('传入 loading 时覆盖内部自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Switch
        loading
        debouncedAutoLoading={false}
        onChange={async () => {
          fn1()
          await delay(500)
          fn1()
        }}
      />,
    )

    const buttonNode = node.container.querySelector('.ant-switch')!
    expect(buttonNode).toHaveClass('ant-switch-loading')
    act(() => {
      fireEvent.click(buttonNode)
    })
    await delay(120)
    expect(fn1).toBeCalledTimes(0)
    expect(buttonNode).toHaveClass('ant-switch-loading')
    expect(buttonNode.querySelector('.ant-switch-loading-icon')).toBeInTheDocument()
    await delay(500)
    expect(fn1).toBeCalledTimes(0)
    expect(buttonNode).toHaveClass('ant-switch-loading')
    expect(buttonNode.querySelector('.ant-switch-loading-icon')).toBeInTheDocument()
    node.unmount()
  })
})
