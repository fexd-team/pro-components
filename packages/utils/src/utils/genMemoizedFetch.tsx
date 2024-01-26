import { SAS, memoize, run } from '@fexd/tools'

const genMemoizedFetch = <T,>(fetch: T, { cacheMinutes = 1 }: { cacheMinutes?: number } = {}) => {
  const memoizedFetch = memoize(SAS(fetch as any), {
    // @ts-ignore
    disable: ({ result, drop }: any) => {
      run(result, 'then', (response) => {
        // 缓存 1 分钟，防止频繁请求
        if (cacheMinutes > 0) {
          setTimeout(() => drop(), 1000 * 60 * cacheMinutes)
        }

        return response
      })
      run(result, 'catch', (e) => {
        drop()
        throw e
      })
    },
  })

  return memoizedFetch as any as T & {
    cache: typeof memoizedFetch.cache
  }
}

export default genMemoizedFetch
