---
name: useCoverable-request
description: request.coverable 深入——将 API 请求封装为可覆盖的 CoverableValue，支持 URL/参数/响应的精确覆盖和完全接管
---

# request.coverable 深入

## 原理

`request.coverable(apiConfig)` 是 `useCoverable.value()` 的特化版本，专为 API 请求设计。

它将一个 API 配置（url + method + handleParams + handleResponse + ...）包装为 `CoverableValue`。当外部通过 coverable 覆盖时，会调用 `api.override(config)` 来深度合并配置，而非简单替换。

```typescript
// 内部实现简化
function coverable(apiConfig) {
  const api = defineApi(apiConfig)

  return useCoverable.value({
    default: api,
    config: {},
    onCovered: (current, next) => current.override(next),
  })
}
```

## defineApi 配置项

| 字段           | 说明                      | 类型                                   | 默认值       |
| -------------- | ------------------------- | -------------------------------------- | ------------ |
| url            | 请求地址                  | `string`                               | `''`         |
| method         | 请求方法                  | `'get' \| 'post' \| 'put' \| 'delete'` | `'get'`      |
| handleParams   | 参数预处理                | `(...args) => any`                     | `(v) => v`   |
| handleResponse | 响应后处理                | `(response) => any`                    | `(v) => v`   |
| overrideConfig | 请求时动态配置            | `(config, params) => object`           | `() => ({})` |
| cache          | 缓存配置                  | `{ ttl, methods, cachePredicate }`     | -            |
| id             | 请求标识（用于缓存/去重） | `string`                               | -            |
| responseType   | 响应类型                  | `string`                               | -            |

## 使用方式

### 在 BC 组件中声明 API

```tsx
const apis = useCoverable({
  getList: request.coverable({
    url: '/api/module/list',
    method: 'post',
    handleParams: (params) => ({
      page: params?.page ?? 1,
      page_size: params?.pageSize ?? 10,
      keyword: params?.keyword,
    }),
    handleResponse: (response) => ({
      ...response,
      data: response?.data?.records,
      total: response?.data?.total_count,
    }),
  }),
  getDetail: request.coverable({
    url: '/api/module/detail',
    method: 'get',
  }),
  create: request.coverable({
    url: '/api/module/create',
    method: 'post',
    handleParams: (params) => filterEmptyValues(params),
  }),
  remove: request.coverable({
    url: '/api/module/delete',
    method: 'post',
    handleParams: (item) => ({ id: item.id }),
  }),
})
```

### 在回调中调用 API

始终通过 `apis.getConfig().apiName(args)` 调用，这样能确保外部覆盖生效：

```tsx
onQuery: async (params) => {
  const response = await apis.getConfig().getList(params)
  return response
},
onDelete: async (item) => {
  const response = await apis.getConfig().remove(item)
  return response
},
```

## 覆盖方式

### 方式一：对象覆盖（深度合并）

传入一个配置对象，会与默认 API 配置深度合并。**未传的字段保持原值**。

```tsx
// 只改 url，保留原有 handleParams / handleResponse
coverable={{
  apis: {
    getList: { url: '/api/v2/custom-list' },
  },
}}

// 只改参数处理，保留 url 和其他配置
coverable={{
  apis: {
    getList: {
      handleParams: (params) => ({
        ...params,
        page_num: params?.page,
        page_count: params?.pageSize,
        extra_field: 'custom',
      }),
    },
  },
}}

// 覆盖多个字段
coverable={{
  apis: {
    getList: {
      url: '/api/v2/list',
      method: 'get',
      handleParams: (params) => ({ ...params, format: 'v2' }),
    },
  },
}}
```

### 方式二：函数覆盖（完全接管）

传入一个 async 函数，完全替代内置的请求逻辑。函数的参数与原 `handleParams` 的参数相同。

```tsx
coverable={{
  apis: {
    getList: async (params) => {
      // 完全自定义的请求逻辑
      const result = await myCustomService.fetchList({
        offset: (params.page - 1) * params.pageSize,
        limit: params.pageSize,
      })
      return {
        success: true,
        data: result.items,
        total: result.totalCount,
      }
    },
  },
}}
```

**注意**：函数形式会经过 `builtInRequestConfig.responseInterceptors` 处理，保持与 request 实例的拦截器行为一致。

### 方式三：缓存配置覆盖

```tsx
coverable={{
  apis: {
    getMetadata: {
      cache: {
        ttl: 1000 * 60, // 缓存60秒（默认可能只有5秒）
      },
    },
  },
}}
```

## 与 useRequest 配合

BC 中常用 ahooks 的 `useRequest` 来管理异步状态，配合 coverable API：

```tsx
const metadataService = useRequest(async () => {
  const { data } = await apis.getConfig().getMetadata()
  return coloringOptions(
    data?.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  )
})
```

这样如果消费方覆盖了 `getMetadata` 的 url，`useRequest` 会自动使用新地址请求。

## handleParams / handleResponse 设计规范

### handleParams 规范

- 输入：业务语义的参数（page, pageSize, keyword 等）
- 输出：后端 API 期望的格式
- 保持输入参数语义统一（所有 BC 统一使用 page/pageSize）

```tsx
// ✅ 好：统一输入 → 适配后端
handleParams: (params) => ({
  current_page: params?.page,
  page_size: params?.pageSize,
  search_key: params?.keyword,
})

// ❌ 差：直接透传，失去适配层
handleParams: (params) => params
```

### handleResponse 规范

- 输入：后端原始响应
- 输出：统一格式 `{ success, data, total?, message? }`
- 在此层完成数据结构转换

```tsx
handleResponse: (response) => ({
  ...response,
  data: response?.data?.list ?? [],
  total: response?.data?.total_count ?? 0,
})
```

## api.override 的合并规则

| 覆盖内容         | 合并方式                      |
| ---------------- | ----------------------------- |
| `url`            | 直接替换                      |
| `method`         | 直接替换                      |
| `handleParams`   | 直接替换（整个函数）          |
| `handleResponse` | 直接替换（整个函数）          |
| `cache`          | 深度合并                      |
| 其他 config      | 深度合并                      |
| 函数（非对象）   | 完全接管，跳过 defineApi 逻辑 |

## 运行时动态调用

除了在 `onQuery`/`onAdd` 等回调中使用，也可以在任何地方动态调用 API：

```tsx
// 在弹窗 render 函数中
const { data } = await apis.getConfig().getDetail({ id: item.id })

// 在 useRequest 中
const service = useRequest(async () => apis.getConfig().getMetadata(), { refreshDeps: [someDep] })
```

## 注意事项

1. **必须通过 `getConfig()` 访问**：直接访问 `apis.getList` 获取的是原始配置，不包含覆盖
2. **函数形式的响应**需要自行返回 `{ success, data, ... }` 格式
3. **覆盖 handleParams 是整体替换**（函数无法深度合并），需要在新函数中处理完整逻辑
4. **缓存配置可深度合并**：只改 ttl 不影响其他缓存配置
5. **id 字段**用于缓存 key 和去重，覆盖时一般不需要改
