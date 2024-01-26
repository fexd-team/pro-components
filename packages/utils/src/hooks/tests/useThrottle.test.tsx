import { renderHook } from '@testing-library/react-hooks'
import useThrottle from '../useThrottle'

describe('useThrottle', () => {
  test('能够正确返回原始值', () => {
    const { result } = renderHook(() => useThrottle('hello', { wait: 1000 }))
    expect(result.current).toBe('hello')
  })

  test('能够正确限制异步更新的频率', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(({ value, wait }) => useThrottle(value, { wait }), {
      initialProps: { value: 'hello', wait: 1000 },
    })

    expect(result.current).toBe('hello')

    rerender({ value: 'world', wait: 1000 })
    expect(result.current).toBe('hello')

    await waitForNextUpdate()

    expect(result.current).toBe('world')
  })

  test('能够正确限制同步更新的频率', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(({ value, wait }) => useThrottle(value, { wait }), {
      initialProps: { value: 'hello', wait: 0 },
    })

    expect(result.current).toBe('hello')

    rerender({ value: 'world', wait: 0 })
    expect(result.current).toBe('world')
  })
})
