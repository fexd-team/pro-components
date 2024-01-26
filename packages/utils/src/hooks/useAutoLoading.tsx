import { useDebounce, useMemoizedFn, useSafeState } from 'ahooks'
import { run } from '@fexd/tools'

import catchPromise from '../utils/catchPromise'

export interface UseAutoLoadingConfig {
  loading?: any
  action?: (...args: any) => any
}

export default function useAutoLoading({ loading: propLoading, action }: UseAutoLoadingConfig = {}) {
  const [loading, setLoading] = useSafeState(false)
  const debouncedLoading = useDebounce(loading, {
    wait: 100,
  })

  const onAction = useMemoizedFn(async (...args: any[]) => {
    setLoading(true)
    const [err] = await catchPromise(run(action, undefined, ...args))
    if (err) {
      console.error(err)
    }
    setLoading(false)
  })

  return {
    realTimeLoading: propLoading ?? loading,
    loading: propLoading ?? (loading === false ? loading : debouncedLoading),
    onAction,
  }
}
