import React, { useEffect } from 'react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'
import Tooltip, { renderTooltip } from '../Tooltip'

describe('Tooltip', () => {
  test('可作为普通 AntdTooltip 正常工作', async () => {
    const node = render(
      <Tooltip title="Test Text" mouseEnterDelay={0}>
        <span>Trigger</span>
      </Tooltip>,
    )

    expect(screen.getByText('Trigger')).toBeInTheDocument()
    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(screen.getByText('Trigger')!)
    })

    expect(screen.getByText('Test Text')).toBeInTheDocument()

    node.unmount()
  })

  test('config 字符串类型正常工作', async () => {
    const node = render(<Tooltip config="Test Text" mouseEnterDelay={0} />)

    expect(node.container.querySelector('.anticon-info-circle')).toBeInTheDocument()
    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.anticon-info-circle')!)
    })

    expect(screen.getByText('Test Text')).toBeInTheDocument()

    node.unmount()
  })

  test('config JSX 类型正常工作', async () => {
    const node = render(<Tooltip config={<div>Test Text</div>} mouseEnterDelay={0} />)

    expect(node.container.querySelector('.anticon-info-circle')).toBeInTheDocument()
    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.anticon-info-circle')!)
    })

    expect(screen.getByText('Test Text')).toBeInTheDocument()

    node.unmount()
  })

  test('config 对象类型正常工作', async () => {
    const node = render(
      <Tooltip
        config={{
          title: 'Test Text',
        }}
        mouseEnterDelay={0}
      />,
    )

    expect(node.container.querySelector('.anticon-info-circle')).toBeInTheDocument()
    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(node.container.querySelector('.anticon-info-circle')!)
    })

    expect(screen.getByText('Test Text')).toBeInTheDocument()

    node.unmount()
  })

  test('config 不传递时正常工作', async () => {
    const node = render(
      <Tooltip>
        <span>Trigger</span>
      </Tooltip>,
    )

    expect(screen.getByText('Trigger')).toBeInTheDocument()
    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(screen.getByText('Trigger')!)
    })

    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    node.unmount()
  })

  test('config 非法时正常工作', async () => {
    const node = render(renderTooltip({ config: [], children: <span>Trigger</span> }))

    expect(screen.getByText('Trigger')).toBeInTheDocument()
    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    act(() => {
      fireEvent.mouseOver(screen.getByText('Trigger')!)
    })

    expect(document.querySelector('.ant-tooltip')).not.toBeInTheDocument()

    node.unmount()
  })
})
