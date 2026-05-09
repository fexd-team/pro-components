import React, { useState } from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import createSharedHook, { createSharedContext } from '../createSharedHook'

describe('createSharedHook', () => {
  it('返回一个函数', () => {
    const useCounter = () => {
      const [count, setCount] = useState(0)
      return { count, setCount }
    }
    const useSharedCounter = createSharedHook(useCounter)
    expect(typeof useSharedCounter).toBe('function')
  })

  it('返回的 hook 有 Provider 属性', () => {
    const useCounter = () => useState(0)
    const useSharedCounter = createSharedHook(useCounter)
    expect(useSharedCounter.Provider).toBeDefined()
  })

  it('在 Provider 内可以获取共享状态', () => {
    const useCounter = () => {
      const [count, setCount] = useState(10)
      return { count, setCount }
    }
    const useSharedCounter = createSharedHook(useCounter)

    function Display() {
      const state = useSharedCounter()
      return <div data-testid="count">{state?.count ?? 'loading'}</div>
    }

    const Provider = useSharedCounter.Provider
    render(
      <Provider>
        <Display />
      </Provider>,
    )

    expect(screen.getByTestId('count')).toBeInTheDocument()
  })
})

describe('createSharedContext', () => {
  it('返回包含 register, hooks, Provider, Consumer, reactContext', () => {
    const ctx = createSharedContext()
    expect(typeof ctx.register).toBe('function')
    expect(ctx.hooks).toBeInstanceOf(Map)
    expect(ctx.Provider).toBeDefined()
    expect(ctx.Consumer).toBeDefined()
    expect(ctx.reactContext).toBeDefined()
  })

  it('register 添加 hook 到 hooks Map 中', () => {
    const ctx = createSharedContext()
    const mockHook = { id: 'test-hook', Executor: () => null, hook: () => {} }
    ctx.register(mockHook)
    expect(ctx.hooks.has('test-hook')).toBe(true)
  })

  it('多个 hook 可以注册到同一个 context', () => {
    const ctx = createSharedContext()
    ctx.register({ id: 'hook-1', Executor: () => null, hook: () => {} })
    ctx.register({ id: 'hook-2', Executor: () => null, hook: () => {} })
    expect(ctx.hooks.size).toBe(2)
  })
})
