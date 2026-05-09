import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '../ErrorBoundary'

const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('test error')
  }
  return <div>正常内容</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('无错误时正常渲染子组件', () => {
    render(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('子组件抛出错误时展示错误 fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )
    expect(screen.queryByText('正常内容')).not.toBeInTheDocument()
  })

  it('触发 onError 回调', () => {
    const onError = jest.fn()
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>,
    )
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(expect.any(Error))
  })

  it('自定义 fallback 函数接收 error 和 retry', () => {
    const fallbackFn = jest.fn((error: Error, retry: () => void) => (
      <div>
        <span>错误: {error.message}</span>
        <button onClick={retry}>重试</button>
      </div>
    ))

    render(
      <ErrorBoundary fallback={fallbackFn}>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(fallbackFn).toHaveBeenCalled()
    expect(screen.getByText('错误: test error')).toBeInTheDocument()
    expect(screen.getByText('重试')).toBeInTheDocument()
  })

  it('点击重试后清除错误状态', () => {
    let shouldThrow = true
    const TestComponent = () => {
      if (shouldThrow) throw new Error('retry test')
      return <div>恢复正常</div>
    }

    const fallback = (_error: Error, retry: () => void) => (
      <button
        onClick={() => {
          shouldThrow = false
          retry()
        }}
      >
        重试
      </button>
    )

    render(
      <ErrorBoundary fallback={fallback}>
        <TestComponent />
      </ErrorBoundary>,
    )

    fireEvent.click(screen.getByText('重试'))
    expect(screen.getByText('恢复正常')).toBeInTheDocument()
  })

  it('page 模式下渲染 Result 组件', () => {
    const { container } = render(
      <ErrorBoundary mode="page">
        <ThrowError />
      </ErrorBoundary>,
    )
    expect(container.querySelector('.f-pro-utils-error-boundary-result')).toBeInTheDocument()
  })

  it('自定义 fallback 为 ReactNode 时直接渲染', () => {
    render(
      <ErrorBoundary fallback={<div>静态错误提示</div>}>
        <ThrowError />
      </ErrorBoundary>,
    )
    expect(screen.getByText('静态错误提示')).toBeInTheDocument()
  })
})
