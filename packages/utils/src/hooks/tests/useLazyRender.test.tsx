import React from 'react'
import { render, screen } from '@testing-library/react'
import useLazyRender from '../useLazyRender'

describe('useLazyRender', () => {
  it('should render content when visible is true', () => {
    function TestComponent() {
      const content = <div>Content</div>
      const placeholder = <div>Placeholder</div>
      const visible = true
      return <>{useLazyRender({ content, placeholder, forceVisible: visible })}</>
    }

    render(<TestComponent />)
    expect(screen.queryByText('Content')).toBeInTheDocument()
    expect(screen.queryByText('Placeholder')).not.toBeInTheDocument()
  })

  it('should render placeholder when visible is false', () => {
    function TestComponent() {
      const content = <div>Content</div>
      const placeholder = <div>Placeholder</div>
      const visible = false
      return <>{useLazyRender({ content, placeholder, forceVisible: visible })}</>
    }

    render(<TestComponent />)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(screen.queryByText('Placeholder')).toBeInTheDocument()
  })

  it('should render placeholder when forceVisible is false', () => {
    function TestComponent() {
      const content = <div>Content</div>
      const placeholder = <div>Placeholder</div>
      const visible = false
      return <>{useLazyRender({ content, placeholder, forceVisible: visible })}</>
    }

    render(<TestComponent />)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(screen.queryByText('Placeholder')).toBeInTheDocument()
  })

  it('should render content when forceVisible is true', () => {
    function TestComponent() {
      const content = <div>Content</div>
      const placeholder = <div>Placeholder</div>
      const visible = true
      return <>{useLazyRender({ content, placeholder, forceVisible: visible })}</>
    }

    render(<TestComponent />)
    expect(screen.queryByText('Content')).toBeInTheDocument()
    expect(screen.queryByText('Placeholder')).not.toBeInTheDocument()
  })
})
