/* eslint-disable react-hooks/exhaustive-deps */
// fork from https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useThrottleFn/index.ts
// 调整了逻辑
import { useEffect, useState, useMemo } from 'react'
import { useDebounceFn } from 'ahooks'
import { DebounceOptions } from 'ahooks/es/useDebounce/debounceOptions'

function useDebounce<T>(value: T, options?: DebounceOptions) {
  // 如果没有传递 wait 参数或 wait 为 0，认为是同步状态
  const sync = useMemo(() => (options?.wait ?? 0) <= 0, [options?.wait])
  const [debounced, setDebounced] = useState(value)

  const { run } = useDebounceFn(() => {
    // 同步状态下不执行 state 更新，避免触发额外 render
    if (sync) return
    setDebounced(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return sync ? value : debounced
}

export default useDebounce
