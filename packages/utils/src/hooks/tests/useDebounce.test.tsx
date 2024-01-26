import { renderHook, act } from '@testing-library/react-hooks'
import useDebounce from '../useDebounce'

describe('useDebounce', () => {
  it('应该返回初始值，因为 wait 为0，但应该触发更新', () => {
    const { result, rerender } = renderHook(({ value, options }) => useDebounce(value, options), {
      initialProps: {
        value: 'test',
        options: { wait: 0 },
      },
    })

    expect(result.current).toBe('test')
    act(() => {
      rerender({ value: 'hello', options: { wait: 0 } })
    })
    expect(result.current).toBe('hello')
  })

  it('应该在 100 毫秒后返回 debounce 后的值', async () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook(({ value, options }) => useDebounce(value, options), {
      initialProps: {
        value: 'test',
        options: { wait: 100 },
      },
    })

    expect(result.current).toBe('test')

    act(() => {
      rerender({ value: 'hello', options: { wait: 100 } })
    })

    expect(result.current).toBe('test')
    jest.advanceTimersByTime(50)
    expect(result.current).toBe('test')

    jest.advanceTimersByTime(50)
    expect(result.current).toBe('hello')
  })

  it('应该返回 debounced 的值，因为 wait 为默认值', () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook(({ value, options }: any) => useDebounce(value, options), {
      initialProps: {
        value: 'test',
      },
    })

    expect(result.current).toBe('test')
    act(() => {
      rerender({ value: 'hello' })
      jest.advanceTimersByTime(250)
    })
    expect(result.current).toBe('hello')
    jest.useRealTimers()
  })

  it('wait 为负数时应该同步更新', () => {
    const { result, rerender } = renderHook(({ value, wait }) => useDebounce(value, { wait }), {
      initialProps: {
        value: 'test',
        wait: -100,
      },
    })

    expect(result.current).toBe('test')

    act(() => {
      rerender({ value: 'hello' } as any)
    })

    expect(result.current).toBe('hello')
  })
})
