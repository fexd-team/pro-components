import { renderHook, act } from '@testing-library/react-hooks'
import usePreferredDark from '../usePreferredDark'

describe('usePreferredDark', () => {
  let matchMediaListeners: Array<(e: any) => void> = []
  let mockMatches = false

  beforeEach(() => {
    matchMediaListeners = []
    mockMatches = false

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: mockMatches,
        media: query,
        addEventListener: (_event: string, handler: (e: any) => void) => {
          matchMediaListeners.push(handler)
        },
        removeEventListener: (_event: string, handler: (e: any) => void) => {
          matchMediaListeners = matchMediaListeners.filter((h) => h !== handler)
        },
      })),
    })
  })

  it('初始状态为 false（默认非暗色模式）', () => {
    const { result } = renderHook(() => usePreferredDark())
    expect(result.current).toBe(false)
  })

  it('当系统为暗色模式时返回 true', () => {
    mockMatches = true
    const { result } = renderHook(() => usePreferredDark())
    expect(result.current).toBe(true)
  })

  it('监听系统主题变化并更新状态', () => {
    const { result } = renderHook(() => usePreferredDark())
    expect(result.current).toBe(false)

    act(() => {
      matchMediaListeners.forEach((listener) => listener({ matches: true }))
    })
    expect(result.current).toBe(true)

    act(() => {
      matchMediaListeners.forEach((listener) => listener({ matches: false }))
    })
    expect(result.current).toBe(false)
  })

  it('卸载时移除事件监听', () => {
    const { unmount } = renderHook(() => usePreferredDark())
    expect(matchMediaListeners.length).toBe(1)

    unmount()
    expect(matchMediaListeners.length).toBe(0)
  })

  it('使用正确的 media query', () => {
    renderHook(() => usePreferredDark())
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
  })
})
