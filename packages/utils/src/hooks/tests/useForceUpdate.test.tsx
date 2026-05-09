import { renderHook, act } from '@testing-library/react-hooks'
import useForceUpdate from '../useForceUpdate'

describe('useForceUpdate', () => {
  it('返回 [forceUpdate, renderKey] 元组', () => {
    const { result } = renderHook(() => useForceUpdate())
    expect(result.current).toHaveLength(2)
    expect(typeof result.current[0]).toBe('function')
    expect(typeof result.current[1]).toBe('string')
  })

  it('renderKey 以 "key_" 为前缀', () => {
    const { result } = renderHook(() => useForceUpdate())
    expect(result.current[1]).toMatch(/^key_\d+$/)
  })

  it('调用 forceUpdate 后 renderKey 变化', () => {
    const { result } = renderHook(() => useForceUpdate())
    const initialKey = result.current[1]

    act(() => {
      result.current[0]()
    })

    expect(result.current[1]).not.toBe(initialKey)
  })

  it('多次调用 forceUpdate 每次都生成不同的 key', () => {
    const { result } = renderHook(() => useForceUpdate())
    const keys = new Set<string>()

    keys.add(result.current[1])

    for (let i = 0; i < 5; i++) {
      act(() => {
        result.current[0]()
      })
      keys.add(result.current[1])
    }

    expect(keys.size).toBe(6)
  })

  it('forceUpdate 函数引用稳定（useMemoizedFn）', () => {
    const { result, rerender } = renderHook(() => useForceUpdate())
    const fn1 = result.current[0]

    rerender()
    const fn2 = result.current[0]

    expect(fn1).toBe(fn2)
  })
})
