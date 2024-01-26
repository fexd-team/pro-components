import React from 'react'
import ReactDOM from 'react-dom'
import { act } from '@testing-library/react'
import { delay } from '@fexd/tools'
import Portal from '../Portal'

describe('Portal', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null as any
  })

  it('renders children in a portal appended to document.body by default', () => {
    const child = <div className="test-node1">Test Content</div>
    act(() => {
      ReactDOM.render(<Portal>{child}</Portal>, container)
    })
    expect(document.body.querySelector('.test-node1')).toHaveTextContent('Test Content')
  })

  it('renders children in a portal appended to the specified node', () => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    act(() => {
      ReactDOM.render(
        <Portal to={node}>
          <div className="test-node1">Test Content</div>
        </Portal>,
        container,
      )
    })
    expect(node.querySelector('.test-node1')).toBeInTheDocument()
  })

  it('applies the specified class name to the portal container', () => {
    const ref = React.createRef()
    act(() => {
      ReactDOM.render(
        <Portal className="test-class" ref={ref}>
          Test Content
        </Portal>,
        container,
      )
    })
    expect(ref.current).toHaveClass('test-class')
  })

  it('removes the portal from the DOM when unmounting', async () => {
    act(() => {
      ReactDOM.render(<Portal>Test Content</Portal>, container)
    })
    expect(document.body.contains(container)).toBe(true)
    act(() => {
      ReactDOM.unmountComponentAtNode(container)
    })

    expect(document.body.contains(container)).toBe(true)
    await delay(1100)
    expect(document.body.contains(container)).toBe(true)
  })
})
