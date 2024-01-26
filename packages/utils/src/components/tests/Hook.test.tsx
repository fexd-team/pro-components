import React, { useEffect } from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'
import Hook from '../Hook'

describe('Hook', () => {
  test('renderChildren 函数允许书写 react hooks', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Hook>
        {() => {
          const [count, setCount] = React.useState(0)

          React.useEffect(() => {
            fn1()
          }, [count])

          return (
            <>
              <div>count: {count}</div>
              <button
                className="test-Hook-node1"
                onClick={() => {
                  setCount((count) => count + 1)
                }}
              >
                add
              </button>
            </>
          )
        }}
      </Hook>,
    )
    expect(screen.getByText('count: 0')).toBeInTheDocument()
    expect(fn1).toBeCalledTimes(1)
    await act(async () => {
      fireEvent.click(document.querySelector('.test-Hook-node1')!)
    })
    expect(screen.getByText('count: 1')).toBeInTheDocument()
    expect(fn1).toBeCalledTimes(2)
    node.unmount()
  })

  test('renderHookProps 函数允许书写 react hooks', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Hook
        hook={() => {
          const [count, setCount] = React.useState(0)

          React.useEffect(() => {
            fn1()
          }, [count])

          return (
            <>
              <div>count: {count}</div>
              <button
                className="test-Hook-node1"
                onClick={() => {
                  setCount((count) => count + 1)
                }}
              >
                add
              </button>
            </>
          )
        }}
      />,
    )
    expect(screen.getByText('count: 0')).toBeInTheDocument()
    expect(fn1).toBeCalledTimes(1)
    await act(async () => {
      fireEvent.click(document.querySelector('.test-Hook-node1')!)
    })
    expect(screen.getByText('count: 1')).toBeInTheDocument()
    expect(fn1).toBeCalledTimes(2)
    node.unmount()
  })

  test('接收不合法内容时，渲染 null', async () => {
    const node1 = render(<Hook />)
    expect(node1.container).toBeEmptyDOMElement()
    node1.unmount()

    const node2 = render(<Hook>{() => ({})}</Hook>)
    expect(node2.container).toBeEmptyDOMElement()
    node2.unmount()
  })
})
