import { useRef } from 'react'
import { useRequest as useAhooksRequest, useMemoizedFn } from 'ahooks'
import { enhancePromise } from '@fexd/tools'
import type {
  Result as UseRequestResult,
  Service as UseRequestService,
  Options as UseRequestOptions,
  Plugin as UseRequestPlugin,
} from 'ahooks/es/useRequest/src/types'
import 'ahooks/es/useRequest/src/types'

export type { UseRequestResult, UseRequestService, UseRequestOptions, UseRequestPlugin }

export default function useRequest<TData, TParams extends any[]>(
  service: UseRequestService<TData, TParams>,
  options?: UseRequestOptions<TData, TParams>,
  plugins: UseRequestPlugin<TData, TParams>[] = [],
): UseRequestResult<TData, TParams> & {
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
  }) as UseRequestPlugin<TData, TParams>)
  const ahooksResult = useAhooksRequest(service, options, [usePromisePlugin, ...plugins])

  return Object.assign(ahooksResult, { promiseRef, isUseRequest: true as const })
}
