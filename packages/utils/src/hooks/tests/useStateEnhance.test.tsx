import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { delay } from '@fexd/tools'
import useStateEnhance, { UseStateEnhanceOptions } from '../useStateEnhance'

describe('useStateEnhance', () => {
  it('should return the correct state and previous state', () => {
    const initialState: any = { count: 0 }
    // @ts-ignore
    const { result, rerender } = renderHook((state: any, options: any) => useStateEnhance(state, options), {
      initialProps: initialState,
    })

    expect(result.current.prevState).toBeUndefined()
    expect(result.current.getState().count).toEqual(initialState.count)

    const newState = { count: 1 }
    rerender(newState)

    expect(result.current.prevState?.count).toEqual(initialState.count)
    expect(result.current.getState().count).toEqual(newState.count)
    expect(result.current.getPrevState()?.count).toEqual(initialState.count)
  })

  test('should return initial state and get latest values', () => {
    const initialState = { count: 0 }
    const { result } = renderHook(() => useStateEnhance(initialState))

    expect(result.current.prevState).toBeUndefined()
    expect(result.current.debouncedState).toEqual(initialState)
    expect(result.current.throttledState).toEqual(initialState)
    expect(result.current.prevDebouncedState).toBeUndefined()
    expect(result.current.prevThrottledState).toBeUndefined()
    expect(result.current.getState()).toEqual(initialState)
    expect(result.current.getPrevState()).toBeUndefined()
    expect(result.current.getDebouncedState()).toEqual(initialState)
    expect(result.current.getThrottledState()).toEqual(initialState)
    expect(result.current.getPrevDebouncedState()).toBeUndefined()
    expect(result.current.getPrevThrottledState()).toBeUndefined()
  })

  test('should debounce state update', async () => {
    const initialState = { count: 0 }
    const { result, waitForNextUpdate } = renderHook(() => useStateEnhance(initialState, { debounce: { wait: 100 } }))

    result.current.getState().count = 1
    expect(result.current.getState()).toEqual({ count: 1 })
    expect(result.current.debouncedState).toEqual(initialState)

    await delay(120)

    expect(result.current.getState()).toEqual({ count: 1 })
    expect(result.current.debouncedState).toEqual({ count: 1 })
  })

  test('should throttle state update', async () => {
    const initialState = { count: 0 }
    const { result, waitForNextUpdate } = renderHook(() => useStateEnhance(initialState, { throttle: { wait: 100 } }))

    result.current.getState().count = 1
    expect(result.current.getState()).toEqual({ count: 1 })
    expect(result.current.throttledState).toEqual(initialState)

    await delay(120)

    expect(result.current.getState()).toEqual({ count: 1 })
    expect(result.current.throttledState).toEqual({ count: 1 })
  })

  test('should update previous state when shouldPrevUpdate returns true', () => {
    const initialState = { count: 0 }
    const shouldPrevUpdate = (prev: any, next: any) => prev?.count !== next.count
    const { result, rerender } = renderHook((props) => useStateEnhance(props.state, { shouldPrevUpdate }), {
      initialProps: { state: initialState },
    })

    result.current.getState().count = 1
    expect(result.current.prevState).toBeUndefined()

    rerender({ state: { count: 1 } })
    expect(result.current.prevState).toBeUndefined()

    rerender({ state: { count: 2 } })
    expect(result.current.prevState).toEqual({ count: 1 })

    rerender({ state: { count: 2 } })
    expect(result.current.prevState).toEqual({ count: 1 })

    rerender({ state: { count: 3 } })
    expect(result.current.prevState).toEqual({ count: 2 })
  })

  test('should return previous state for string type', () => {
    const { result, rerender } = renderHook((initialState) => useStateEnhance(initialState), { initialProps: 'hello' })

    expect(result.current.prevState).toBeUndefined()

    rerender('world')
    expect(result.current.prevState).toEqual('hello')

    rerender('goodbye')
    expect(result.current.prevState).toEqual('world')
  })

  test('should return previous state for number type', () => {
    const { result, rerender } = renderHook((initialState) => useStateEnhance(initialState), { initialProps: 0 })

    expect(result.current.prevState).toBeUndefined()

    rerender(1)
    expect(result.current.prevState).toEqual(0)

    rerender(2)
    expect(result.current.prevState).toEqual(1)
  })

  test('should return previous state and debounced state for array type', async () => {
    const { result, rerender } = renderHook(
      (initialState) => useStateEnhance(initialState, { debounce: { wait: 100 } }),
      { initialProps: [1, 2, 3] },
    )

    expect(result.current.prevState).toBeUndefined()
    expect(result.current.debouncedState).toEqual([1, 2, 3])
    expect(result.current.prevDebouncedState).toBeUndefined()

    rerender([4, 5, 6])
    expect(result.current.prevState).toEqual([1, 2, 3])
    expect(result.current.debouncedState).toEqual([1, 2, 3])
    expect(result.current.prevDebouncedState).toBeUndefined()

    await waitFor(() => {
      expect(result.current.prevDebouncedState).toEqual([1, 2, 3])
      expect(result.current.debouncedState).toEqual([4, 5, 6])
    })
  })
})
