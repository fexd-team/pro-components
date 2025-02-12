import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'
import Action from '../Action'

describe('Action', () => {
  test('Button onClick 正常工作', () => {
    const fn1 = jest.fn()
    const node = render(<Action onClick={fn1} />)
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })

    expect(fn1).toBeCalledTimes(1)

    node.unmount()
  })

  test('Button onClick 支持异步自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Action
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

  test('Button 传入 loading 时覆盖内部自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Action
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

  test('Button menu 功能正常工作', async () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const fn3 = jest.fn()
    const fn4 = jest.fn()
    const node = render(
      <Action
        menuProps={{
          className: 'test-Action-menu-container',
        }}
        dropdownProps={{
          // trigger: ['click'],
          transitionName: '',
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0,
        }}
        onClick={fn1}
        menu={[
          { className: 'test-Action-menu-node1', content: 'test1', onClick: fn2 },
          { className: 'test-Action-menu-node2', content: 'test2', onClick: fn3 },
          <Action className="test-Action-menu-node3" onClick={fn4} key="node3" />,
        ]}
      >
        Test
      </Action>,
    )
    expect(node.container.querySelector('.ant-dropdown-button')).toBeInTheDocument()
    expect(node.container.querySelector('.ant-dropdown-trigger')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-container')).not.toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node1')).not.toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node2')).not.toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node3')).not.toBeInTheDocument()
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })
    expect(fn1).toBeCalledTimes(1)
    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-dropdown-trigger')!)
    })
    await delay(120)
    expect(document.querySelector('.test-Action-menu-container')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node1')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node2')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node3')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.click(document.querySelector('.test-Action-menu-node1')!)
    })
    expect(fn2).toBeCalledTimes(1)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-dropdown-trigger')!)
    })
    await delay(120)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.click(document.querySelector('.test-Action-menu-node2')!)
    })
    expect(fn3).toBeCalledTimes(1)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-dropdown-trigger')!)
    })
    await delay(120)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.click(document.querySelector('.test-Action-menu-node3')!)
    })
    expect(fn4).toBeCalledTimes(1)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    node.unmount()
  })

  test('Button 无内容时 menu 功能正常工作', async () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const fn3 = jest.fn()
    const fn4 = jest.fn()
    const node = render(
      <Action
        menuProps={{
          className: 'test-Action-menu-container',
        }}
        dropdownProps={{
          transitionName: '',
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0,
        }}
        onClick={fn1}
        menu={[
          { className: 'test-Action-menu-node1', content: 'test1', onClick: fn2 },
          { className: 'test-Action-menu-node2', content: 'test2', onClick: fn3 },
          <Action className="test-Action-menu-node3" onClick={fn4} key="node3" />,
        ]}
      />,
    )
    expect(node.container.querySelector('.ant-dropdown-button')).not.toBeInTheDocument()
    expect(node.container.querySelector('.ant-dropdown-trigger')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-container')).not.toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node1')).not.toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node2')).not.toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node3')).not.toBeInTheDocument()
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })
    expect(fn1).toBeCalledTimes(1)
    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-dropdown-trigger')!)
    })
    await delay(120)
    expect(document.querySelector('.test-Action-menu-container')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node1')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node2')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-node3')).toBeInTheDocument()
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.click(document.querySelector('.test-Action-menu-node1')!)
    })
    expect(fn2).toBeCalledTimes(1)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-dropdown-trigger')!)
    })
    await delay(120)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.click(document.querySelector('.test-Action-menu-node2')!)
    })
    expect(fn3).toBeCalledTimes(1)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-dropdown-trigger')!)
    })
    await delay(120)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    act(() => {
      fireEvent.click(document.querySelector('.test-Action-menu-node3')!)
    })
    expect(fn4).toBeCalledTimes(1)
    expect(document.querySelector('.test-Action-menu-container')?.parentNode).not.toHaveClass('ant-dropdown-hidden')

    node.unmount()
  })

  test('confirm 属性正常工作', async () => {
    const fn1 = jest.fn()
    const node = render(<Action confirm="confirm" debouncedAutoLoading={false} onClick={fn1} />)
    expect(document.querySelector('.ant-popconfirm')).not.toBeInTheDocument()
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })

    expect(fn1).toBeCalledTimes(0)

    expect(document.querySelector('.ant-popconfirm')).toBeInTheDocument()
    act(() => {
      fireEvent.click(document.querySelector('.ant-popconfirm .ant-btn-primary')!)
    })
    expect(fn1).toBeCalledTimes(1)
    await delay(200)
    expect(document.querySelector('.ant-popconfirm')).not.toBeInTheDocument()

    node.unmount()
  })

  test('confirm 属性支持异步自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Action
        confirm={{
          title: 'confirm',
          overlayClassName: 'test-Popconfirm-node-2',
        }}
        debouncedAutoLoading={false}
        onClick={async () => {
          fn1()
          await delay(500)
          fn1()
        }}
      />,
    )

    const buttonNode = node.container.querySelector('.ant-btn')!
    act(() => {
      fireEvent.click(buttonNode)
    })
    await delay(120)
    const popButtonNode = document.querySelector('.test-Popconfirm-node-2 .ant-btn-primary')!
    act(() => {
      fireEvent.click(popButtonNode)
    })
    expect(fn1).toBeCalledTimes(1)
    expect(buttonNode).toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).toBeInTheDocument()
    await delay(600)
    expect(fn1).toBeCalledTimes(2)
    expect(buttonNode).not.toHaveClass('ant-btn-loading')
    expect(buttonNode.querySelector('.ant-btn-loading-icon')).not.toBeInTheDocument()
    node.unmount()
  })

  test('switch 类型下 onClick 正常工作', () => {
    const fn1 = jest.fn()
    const node = render(<Action actionType="switch" onClick={fn1} />)
    act(() => {
      fireEvent.click(node.container.querySelector('.ant-switch')!)
    })

    expect(fn1).toBeCalledTimes(1)

    node.unmount()
  })

  test('switch 类型下 onClick 支持异步自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Action
        actionType="switch"
        debouncedAutoLoading={false}
        onClick={async () => {
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

  test('switch 类型下传入 loading 时覆盖内部自动 loading', async () => {
    const fn1 = jest.fn()

    const node = render(
      <Action
        actionType="switch"
        loading
        debouncedAutoLoading={false}
        onClick={async () => {
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

  test('actionType 非法类型将渲染 null', () => {
    const node = render(
      <Action
        // @ts-ignore
        actionType="good-button"
      />,
    )

    expect(node.container).toBeEmptyDOMElement()
  })

  test('tooltip 字符串类型正常工作', async () => {
    const node = render(
      <Action
        tooltip="Test Tooltip"
        extraTooltipProps={{
          mouseEnterDelay: 0,
        }}
      >
        Test Trigger
      </Action>,
    )

    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-btn')!)
    })

    expect(screen.getByText('Test Tooltip')).toBeInTheDocument()

    node.unmount()
  })

  test('tooltip JSX 类型正常工作', async () => {
    const node = render(
      <Action
        tooltip={<div>Test Tooltip</div>}
        extraTooltipProps={{
          mouseEnterDelay: 0,
        }}
      >
        Test Trigger
      </Action>,
    )

    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-btn')!)
    })

    expect(screen.getByText('Test Tooltip')).toBeInTheDocument()

    node.unmount()
  })

  test('tooltip 对象类型正常工作', async () => {
    const node = render(
      <Action
        tooltip={{
          title: 'Test Tooltip',
          mouseEnterDelay: 0,
        }}
      >
        Test Trigger
      </Action>,
    )

    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-btn')!)
    })

    expect(screen.getByText('Test Tooltip')).toBeInTheDocument()

    node.unmount()
  })

  test('confirm 与 tooltip 同时配置时，点击 confirm 时 tooltip 消失', async () => {
    const fn1 = jest.fn()
    const node = render(
      <Action
        tooltip="Test Tooltip"
        confirm="Test Confirm"
        extraTooltipProps={{
          mouseEnterDelay: 0,
        }}
        onClick={fn1}
      >
        Test Trigger
      </Action>,
    )

    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()
    expect(document.querySelector('.ant-popconfirm')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.ant-btn')!)
    })

    expect(screen.getByText('Test Tooltip')).toBeInTheDocument()

    act(() => {
      fireEvent.click(node.container.querySelector('.ant-btn')!)
    })
    await delay(200)
    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    expect(fn1).toBeCalledTimes(0)

    expect(document.querySelector('.ant-popconfirm')).toBeInTheDocument()
    act(() => {
      fireEvent.click(document.querySelector('.ant-popconfirm .ant-btn-primary')!)
    })
    expect(fn1).toBeCalledTimes(1)
    await delay(200)
    expect(document.querySelector('.ant-popconfirm')).not.toBeInTheDocument()
    expect(screen.getByText('Test Tooltip')).toBeInTheDocument()

    node.unmount()
  })
})
