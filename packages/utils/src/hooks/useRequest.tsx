import { useRef } from 'react'
import { useRequest as useAhooksRequest, useMemoizedFn } from 'ahooks'
import { Result, Service, Options, Plugin as RequestPlugin } from 'ahooks/es/useRequest/src/types.d'
import { enhancePromise } from '@fexd/tools'

export default function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins: RequestPlugin<TData, TParams>[] = [],
): Result<TData, TParams> & {
  isUseRequest: true
  promiseRef: {
    current: ReturnType<typeof enhancePromise<TData>>
  }
} {
  const promiseRef = useRef(enhancePromise())
  const usePromisePlugin = useMemoizedFn<any>(((fetchInstance, options) => {
    promiseRef.current = enhancePromise()

    return {
      onBefore() {
        promiseRef.current = enhancePromise()
      },
      onFinally(params, data, e) {
        if (e) {
          promiseRef.current.reject(e)
          return
        }
        promiseRef.current.resolve(data)
      },
    }
  }) as RequestPlugin<TData, TParams>)
  const ahooksResult = useAhooksRequest(service, options, [usePromisePlugin, ...plugins])

  return Object.assign(ahooksResult, { promiseRef, isUseRequest: true as const })
}
