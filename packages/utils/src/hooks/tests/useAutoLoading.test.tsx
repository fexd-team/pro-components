import { renderHook, act } from '@testing-library/react-hooks'
import useAutoLoading from '../useAutoLoading'

describe('useAutoLoading', () => {
  const testAction = async (value: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value)
      }, 500)
    })
  }

  // 测试默认情况下返回的值是否正确
  it('should return default values when no config is provided', () => {
    const { result } = renderHook(() => useAutoLoading())

    // 实时 loading 状态应该为 false
    expect(result.current.realTimeLoading).toBeFalsy()
    // debounced loading 状态应该为 false
    expect(result.current.loading).toBeFalsy()
    // onAction 函数应该存在且为函数类型
    expect(typeof result.current.onAction).toBe('function')
  })

  // 测试传入 loading 参数时返回的值是否正确
  it('should return correct values when config is provided', () => {
    const { result } = renderHook(() => useAutoLoading({ loading: true }))

    // 实时 loading 状态应该为 true
    expect(result.current.realTimeLoading).toBeTruthy()
    // debounced loading 状态应该为 true
    expect(result.current.loading).toBeTruthy()
    // onAction 函数应该存在且为函数类型
    expect(typeof result.current.onAction).toBe('function')
  })

  // 测试调用 onAction 函数时 loading 状态是否正确变化
  it('should execute the action function and set loading to true and then false', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAutoLoading({ action: testAction }))

    // 初始状态下，实时 loading 状态应该为 false
    expect(result.current.realTimeLoading).toBeFalsy()
    // 初始状态下，debounced loading 状态应该为 false
    expect(result.current.loading).toBeFalsy()

    act(() => {
      result.current.onAction('test value') // 调用 onAction 函数
    })

    // 调用 onAction 函数后，实时 loading 状态应该为 true
    expect(result.current.realTimeLoading).toBeTruthy()
    // 由于设置了 debounce 时间为 100ms，所以调用 onAction 函数后不应该立即改变 debounced loading 状态
    expect(result.current.loading).toBeFalsy()

    await waitForNextUpdate({ timeout: 160 }) // 等待 160ms，确保 debounce 时间已过

    // debounce 时间已过后，debounced loading 状态应该为 false
    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate({ timeout: 600 }) // 等待 600ms，确保 onAction 时间已结束

    expect(result.current.loading).toBeFalsy()
    // 最终实时 loading 状态应该为 false
    expect(result.current.realTimeLoading).toBeFalsy()
  })
})
