import { useEffect, useState, useMemo } from 'react'
import { useThrottleFn } from 'ahooks'
import { ThrottleOptions } from 'ahooks/es/useThrottle/throttleOptions'

function useThrottle<T>(value: T, options?: ThrottleOptions) {
  // 如果没有传递 wait 参数或 wait 为 0，认为是同步状态
  const sync = useMemo(() => (options?.wait ?? 0) <= 0, [options?.wait])
  const [throttled, setThrottled] = useState(value)

  const { run } = useThrottleFn(() => {
    // 同步状态下不执行 state 更新，避免触发额外 render
    if (sync) return
    setThrottled(value)
  }, options)

  useEffect(() => {
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return sync ? value : throttled
}

export default useThrottle
