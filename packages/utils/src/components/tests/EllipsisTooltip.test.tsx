import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import EllipsisTooltip from '../EllipsisTooltip'

describe('EllipsisTooltip 组件', () => {
  it('能够正常渲染', () => {
    const { getByText } = render(<EllipsisTooltip>这是一段文本</EllipsisTooltip>)
    expect(getByText('这是一段文本')).toBeInTheDocument()
  })

  it('内容被折叠时能够显示提示信息', async () => {
    const { getByText, queryByTitle } = render(
      <div
        style={{
          width: '100px',
        }}
      >
        <EllipsisTooltip
          tooltipContent={<div className="test-node1">这是一段提示信息</div>}
          wrapperProps={{
            style: {
              display: 'block',
              flex: '1',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              wordBreak: 'keep-all',
            },
          }}
        >
          这是一段很长很长的文本
        </EllipsisTooltip>
      </div>,
    )
    fireEvent.mouseEnter(getByText('这是一段很长很长的文本'))
    // TODO: jest 无法模拟宽度变化，导致无法测试 tooltip 的显示
    // await delay(300)
    // expect(document.querySelector('.test-node1')).toBeInTheDocument()
  })

  it('内容未被折叠时不能显示提示信息', () => {
    const { getByText, queryByTitle } = render(
      <div style={{ width: '300px' }}>
        <EllipsisTooltip tooltipContent="这是一段提示信息">这是一段很长很长的文本</EllipsisTooltip>
      </div>,
    )
    const tooltip = queryByTitle('这是一段提示信息')
    fireEvent.mouseEnter(getByText('这是一段很长很长的文本'))
    expect(tooltip).not.toBeInTheDocument()
  })
})
