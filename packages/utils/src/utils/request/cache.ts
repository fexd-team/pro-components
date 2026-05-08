import { CacheOptions, defaultRequestInterceptor, AxiosCacheInstance } from 'axios-cache-interceptor'
import { isExist, isObject } from '@fexd/tools'

export const defaultCacheOptions: CacheOptions = {
  ttl: -1,
  interpretHeader: false,
  methods: ['get', 'post', 'head'],
}

export const getCacheRequestInterceptor = (axios: AxiosCacheInstance) => {
  const defaultRequestInterceptorResult = defaultRequestInterceptor(axios)
  const onFulfilled = ((config, ...args) => {
    if (!isExist(config?.cache) || (config?.cache as any)?.ttl <= 0) {
      config.cache = false
    }

    if (isObject(config?.cache)) {
      config.cache = {
        ...defaultCacheOptions,
        ...config.cache,
      }
    }

    return defaultRequestInterceptorResult.onFulfilled(config, ...args)
  }) as typeof defaultRequestInterceptorResult.onFulfilled
  const apply = (() => axios.interceptors.request.use(onFulfilled)) as typeof defaultRequestInterceptorResult.apply

  return {
    ...defaultRequestInterceptorResult,
    onFulfilled,
    apply,
  }
}
