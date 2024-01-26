import { useLatest, useMemoizedFn } from 'ahooks'

export default function useGetLatest<T>(value: T) {
  const latestRef = useLatest(value)
  const getLatest = useMemoizedFn(() => latestRef.current)

  return getLatest
}
