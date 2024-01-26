import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'
import Popconfirm from '../Popconfirm'
import Button from '../Button'

describe('Popconfirm', () => {
  test('onConfirm 正常工作', async () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const node = render(
      <Popconfirm overlayClassName="test-Popconfirm-node-1" title="confirm" onConfirm={fn2}>
        <Button onClick={fn1} />
      </Popconfirm>,
    )
    expect(document.querySelector('.test-Popconfirm-node-1')).not.toBeInTheDocument()
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })

    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(0)
    expect(document.querySelector('.test-Popconfirm-node-1')).toBeInTheDocument()
    act(() => {
      fireEvent.click(document.querySelector('.test-Popconfirm-node-1 .ant-btn-primary')!)
    })
    expect(fn2).toBeCalledTimes(1)
    await delay(200)
    expect(document.querySelector('.test-Popconfirm-node-1')).toHaveClass('ant-popover-hidden')

    node.unmount()
  })

  test('onConfirm 支持异步自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Popconfirm
        title="confirm"
        overlayClassName="test-Popconfirm-node-2"
        debouncedAutoLoading={false}
        onConfirm={async () => {
          fn1()
          await delay(500)
          fn1()
        }}
      >
        <Button />
      </Popconfirm>,
    )

    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })
    await delay(120)
    const buttonNode = document.querySelector('.test-Popconfirm-node-2 .ant-btn-primary')!
    act(() => {
      fireEvent.click(buttonNode)
    })
    expect(fn1).toBeCalledTimes(1)
    expect(buttonNode).toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).toBeInTheDocument()
    await delay(500)
    expect(fn1).toBeCalledTimes(2)
    expect(buttonNode).not.toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).not.toBeInTheDocument()
    node.unmount()
  })

  // test('传入 loading 时覆盖内部自动 loading', async () => {
  //   const fn1 = jest.fn()

  //   const node = render(
  //     <Popconfirm title="confirm">
  //       <Button
  //         loading
  //         debouncedAutoLoading={false}
  //         onClick={async () => {
  //           fn1()
  //           await delay(500)
  //           fn1()
  //         }}
  //       />
  //     </Popconfirm>,
  //   )

  //   const buttonNode = node.container.querySelector('.ant-btn')!
  //   expect(buttonNode).toHaveClass('ant-btn-loading')
  //   act(() => {
  //     fireEvent.click(buttonNode)
  //   })
  //   await delay(120)
  //   expect(fn1).toBeCalledTimes(0)
  //   expect(buttonNode).toHaveClass('ant-btn-loading')
  //   expect(buttonNode.querySelector('.ant-btn-loading-icon')).toBeInTheDocument()
  //   await delay(500)
  //   expect(fn1).toBeCalledTimes(0)
  //   expect(buttonNode).toHaveClass('ant-btn-loading')
  //   expect(buttonNode.querySelector('.ant-btn-loading-icon')).toBeInTheDocument()
  //   node.unmount()
  // })
})
