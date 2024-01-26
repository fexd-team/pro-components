import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'
import DropdownButton from '../DropdownButton'

describe('DropdownButton', () => {
  test('onClick 正常工作', () => {
    const fn1 = jest.fn()
    const node = render(<DropdownButton overlay={<></>} onClick={fn1} />)
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })

    expect(fn1).toBeCalledTimes(1)

    node.unmount()
  })

  test('onClick 支持异步自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <DropdownButton
        overlay={<></>}
        debouncedAutoLoading={false}
        onClick={async () => {
          fn1()
          await delay(500)
          fn1()
        }}
      />,
    )

    const buttonNode = node.container.querySelector('.ant-btn')!
    expect(buttonNode).not.toHaveClass('ant-btn-loading')
    act(() => {
      fireEvent.click(buttonNode)
    })
    await delay(120)
    expect(fn1).toBeCalledTimes(1)
    expect(buttonNode).toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).toBeInTheDocument()
    await delay(500)
    expect(fn1).toBeCalledTimes(2)
    expect(buttonNode).not.toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).not.toBeInTheDocument()
    node.unmount()
  })

  test('传入 loading 时覆盖内部自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <DropdownButton
        overlay={<></>}
        loading
        debouncedAutoLoading={false}
        onClick={async () => {
          fn1()
          await delay(500)
          fn1()
        }}
      />,
    )

    const buttonNode = node.container.querySelector('.ant-btn')!
    expect(buttonNode).toHaveClass('ant-btn-loading')
    act(() => {
      fireEvent.click(buttonNode)
    })
    await delay(120)
    expect(fn1).toBeCalledTimes(0)
    expect(buttonNode).toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).toBeInTheDocument()
    await delay(500)
    expect(fn1).toBeCalledTimes(0)
    expect(buttonNode).toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).toBeInTheDocument()
    node.unmount()
  })
})
