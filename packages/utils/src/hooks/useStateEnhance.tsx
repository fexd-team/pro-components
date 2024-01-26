import { usePrevious } from 'ahooks'
import { DebounceOptions } from 'ahooks/es/useDebounce/debounceOptions'
import { ThrottleOptions } from 'ahooks/es/useThrottle/throttleOptions'

import useDebounce from './useDebounce'
import useThrottle from './useThrottle'
import useGetLatest from './useGetLatest'

export interface UseStateEnhanceOptions<T> {
  debounce?: DebounceOptions
  throttle?: ThrottleOptions
  shouldPrevUpdate?: (prev: T | undefined, next: T) => boolean
}

export default function useStateEnhance<T>(state: T, options: UseStateEnhanceOptions<T> = {}) {
  const { debounce: debounceOptions, throttle: throttleOptions, shouldPrevUpdate } = options ?? {}

  const prevState = usePrevious(state, shouldPrevUpdate)
  const debouncedState = useDebounce(state, debounceOptions)
  const throttledState = useThrottle(state, throttleOptions)
  const prevDebouncedState = usePrevious(debouncedState, shouldPrevUpdate)
  const prevThrottledState = usePrevious(throttledState, shouldPrevUpdate)

  const getState = useGetLatest(state)
  const getPrevState = useGetLatest(prevState)
  const getDebouncedState = useGetLatest(debouncedState)
  const getThrottledState = useGetLatest(throttledState)
  const getPrevDebouncedState = useGetLatest(prevDebouncedState)
  const getPrevThrottledState = useGetLatest(prevThrottledState)

  return {
    prevState,
    debouncedState,
    throttledState,
    prevDebouncedState,
    prevThrottledState,
    getState,
    getPrevState,
    getDebouncedState,
    getThrottledState,
    getPrevDebouncedState,
    getPrevThrottledState,
  }
}
