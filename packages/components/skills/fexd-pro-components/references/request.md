---
name: request
description: 请求工具，基于 axios + axios-cache-interceptor，内置响应归一化、大数字处理、缓存支持，搭配 request.coverable 用于 BC 组件中的可覆盖 API 配置
---

# request 请求工具

## 何时使用

- HTTP 请求封装，统一响应格式 `{ success, data, message, code }`
- 需要请求缓存（GET/POST 均支持，基于 `axios-cache-interceptor`）
- 大数字 JSON 解析（超出 `Number.MAX_SAFE_INTEGER` 的数字自动转字符串）
- 在 BC 组件中配置可覆盖的 API（`request.coverable`）

## 基础用法

```typescript
import { request } from '@fexd/pro-components'

// GET
const result = await request.get('/api/users', { params: { page: 1 } })
if (result.success) {
  console.log(result.data)
}

// POST
const createResult = await request.post('/api/users', { name: '张三', age: 25 })
```

## 默认实例特性

| 特性         | 说明                                                          |
| ------------ | ------------------------------------------------------------- |
| 超时         | 60s                                                           |
| Content-Type | 自动检测：对象/数组 → `application/json`，FormData → 原样传递 |
| BigInt 处理  | 默认开启，超出安全整数范围的数字自动转字符串                  |
| 响应拦截器   | 内置归一化拦截器，将各种后端响应格式统一为 `ServerResponse`   |
| 缓存         | 默认关闭（`ttl: -1`），需手动配置开启                         |

## request 实例方法

| 方法                                | 说明                                     |
| ----------------------------------- | ---------------------------------------- |
| `request.get(url, config?)`         | GET 请求                                 |
| `request.post(url, data?, config?)` | POST 请求                                |
| `request.put(url, data?, config?)`  | PUT 请求                                 |
| `request.delete(url, config?)`      | DELETE 请求                              |
| `request.clone(options?)`           | 克隆实例（可保留拦截器、合并缓存配置）   |
| `request.coverable(config)`         | 创建可覆盖的 API 配置值（用于 BC 组件）  |
| `request.setConfig(config)`         | 修改默认配置（如 baseURL、headers 等）   |
| `request.define(config)`            | 创建 defineApi（底层 API，一般不直接用） |

## ServerResponse 响应格式

所有请求经过内置拦截器后，返回统一格式：

```typescript
interface ServerResponse<T = any> {
  success: boolean
  data: T
  message: string
  code: string | number
  error?: Error
  response?: AxiosResponse
}
```

## 内置响应拦截器（归一化行为）

request 内置的响应拦截器会自动将各种后端响应格式归一化为 `ServerResponse`：

**成功响应归一化：**

| 后端字段                                                                    | 归一化为                   |
| --------------------------------------------------------------------------- | -------------------------- |
| `data`                                                                      | `data`                     |
| `success`                                                                   | `success`（默认为 `true`） |
| `errCode` / `code` / `status`                                               | `code`                     |
| `msg` / `sysMsg` / `errMsg` / `message` / `sys_msg` / `tip_msg` / `err_msg` | `message`                  |
| 原始响应                                                                    | `response`                 |

**错误响应归一化（请求失败/网络错误）：**

```typescript
{
  success: false,
  data: err?.response?.data,
  code: /* 从 response 中提取 */,
  message: /* 从 response 或 error 中提取 */,
  error: err,
  response: err?.response,
}
```

### 修改/覆盖内置拦截器行为

内置拦截器通过 `builtInRequestConfig` 暴露，可直接修改：

```typescript
import { builtInRequestConfig } from '@fexd/pro-components'

// 覆盖成功响应处理
builtInRequestConfig.responseInterceptors.onFulfilled = (response) => {
  const { data, code, msg } = response?.data ?? {}
  return {
    success: code === 0 || code === 200,
    data,
    code,
    message: msg,
    response,
  }
}

// 覆盖错误响应处理
builtInRequestConfig.responseInterceptors.onRejected = (err) => {
  // 自定义错误处理逻辑
  if (err?.response?.status === 401) {
    window.location.href = '/login'
  }
  return {
    success: false,
    data: null,
    code: err?.response?.status,
    message: err?.message ?? '请求失败',
    error: err,
    response: err?.response,
  }
}
```

**重要**：修改 `builtInRequestConfig` 是全局生效的，会影响所有使用 `request` 的请求（包括 BC 组件中 `request.coverable` 创建的 API）。

### 添加额外拦截器

也可以通过标准 axios API 添加额外的请求/响应拦截器：

```typescript
import { request } from '@fexd/pro-components'

// 请求拦截器：添加 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：统一错误提示（在内置拦截器之后执行）
request.interceptors.response.use(
  (response) => response, // 成功直接透传
  (error) => {
    message.error(error?.message ?? '网络异常')
    return Promise.reject(error)
  },
)
```

## 修改默认配置

```typescript
import { request } from '@fexd/pro-components'

// 设置 baseURL
request.setConfig({ baseURL: 'https://api.example.com' })

// 设置默认 headers
request.setConfig({
  headers: { 'X-Custom-Header': 'value' },
})
```

## 克隆实例

当不同模块需要独立配置（如不同的 baseURL 或拦截器）时，使用 `clone`：

```typescript
const moduleRequest = request.clone({
  keepInterceptors: true, // 保留原有拦截器
  cloneOptions: {
    baseURL: 'https://module-api.com',
    timeout: 30 * 1000,
  },
  cacheSetupOptions: { ttl: 5 * 60 * 1000 }, // 5分钟缓存
})

// 克隆的实例是独立的，修改不影响原实例
const result = await moduleRequest.get('/api/data')
```

## 缓存

**缓存默认不启用**（`ttl: -1`）。需要手动配置 `ttl > 0` 才会生效。

```typescript
// 方式 1：在单次请求中启用
request.get('/api/config', { cache: { ttl: 60 * 1000 } }) // 缓存 1 分钟

// 方式 2：克隆实例全局启用
const cachedRequest = request.clone({
  cacheSetupOptions: { ttl: 5 * 60 * 1000 },
})

// 方式 3：在 request.coverable 中为单个 API 启用
request.coverable({
  url: '/api/metadata',
  cache: { ttl: 1000 * 10 }, // 缓存 10 秒
})
```

缓存规则：

- **默认关闭**：`ttl` 默认 `-1`，不缓存
- **方法范围**：启用后对 GET、POST、HEAD 方法均生效
- **禁用方式**：`cache: false` 或 `ttl <= 0`
- **缓存行为**：相同请求在 TTL 内直接返回缓存结果

## BigInt 解析

默认开启，超出 `Number.MAX_SAFE_INTEGER` 的数字自动保持为字符串格式，避免精度丢失。

```typescript
// 禁用（单次请求）
request.get('/api/data', { bigIntJSONParsing: false })

// 自定义数字解析器
request.get('/api/data', {
  bigIntNumberParser: (key, str) => {
    // 自定义：所有 id 字段保持字符串
    if (key === 'id') return str
    return Number(str)
  },
})
```

## request.coverable — BC 组件中的可覆盖 API

这是 `useCoverable.value()` 的特化版本，专为 BC 组件中的 API 配置设计。详见 [useCoverable-request.md](./useCoverable-request.md)。

```typescript
const apis = useCoverable({
  getList: request.coverable({
    url: '/api/list',
    method: 'post',
    handleParams: (params) => ({ page: params?.page, size: params?.pageSize }),
    handleResponse: (res) => ({ ...res, data: res.data?.list, total: res.data?.count }),
    cache: { ttl: 1000 * 5 },
  }),
})

// 使用
const result = await apis.getConfig().getList({ page: 1, pageSize: 10 })
```

消费方可覆盖：

```tsx
<Component
  coverable={{
    apis: {
      getList: { url: '/api/v2/list' }, // 只改 URL
    },
  }}
/>
```

## transformRequest 行为

内置的 `transformRequest` 自动处理请求体格式：

| 输入类型                                             | Content-Type                | 处理方式               |
| ---------------------------------------------------- | --------------------------- | ---------------------- |
| 普通对象/数组                                        | 自动设为 `application/json` | `JSON.stringify(data)` |
| FormData                                             | 保持原样                    | 直接传递               |
| 字符串                                               | 不改                        | 直接传递               |
| 有 `Content-Type: application/x-www-form-urlencoded` | 已设                        | `qs.stringify(data)`   |

## 代码示例

### 基础 CRUD 请求

```tsx
import { request } from '@fexd/pro-components'
import { message } from 'antd'

// 查询列表
const fetchList = async (page, pageSize) => {
  const result = await request.get('/api/users', { params: { page, pageSize } })
  if (!result.success) {
    message.error(result.message)
    return []
  }
  return result.data
}

// 创建
const createUser = async (data) => {
  const result = await request.post('/api/users', data)
  if (result.success) message.success('创建成功')
  return result
}

// 删除
const deleteUser = async (id) => {
  const result = await request.post('/api/users/delete', { id })
  return result
}
```

### 与 ProTable 对接

ProTable 的 `onQuery` 期望返回 `{ success, data, total }`：

```tsx
<ProTable
  onQuery={async (params) => {
    const result = await request.post('/api/users/list', {
      page: params.page,
      page_size: params.pageSize,
      keyword: params.keyword,
    })
    return {
      success: result.success,
      data: result.data?.list ?? [],
      total: result.data?.total ?? 0,
    }
  }}
/>
```

### 文件下载

```typescript
const downloadFile = async (id) => {
  const result = await request.post(
    '/api/export',
    { id },
    {
      responseType: 'arraybuffer',
    },
  )
  // responseType 为 arraybuffer/blob 时，不经过内置响应拦截器归一化
  const blob = new Blob([result])
  const url = URL.createObjectURL(blob)
  // ...
}
```

## 注意事项

1. **响应格式统一**：所有请求（包括错误）都返回 `{ success, data, message, code }` 格式，不需要 `try/catch`
2. **`builtInRequestConfig` 全局生效**：修改会影响所有请求实例
3. **`request.coverable` 优先**：在 BC 组件中，优先使用 `request.coverable` 而非 `defineApi`
4. **clone 保留拦截器**：默认 `keepInterceptors: true`，克隆实例继承所有拦截器
5. **Blob 响应特殊处理**：`responseType: 'blob'` 或 `arraybuffer` 时，内置拦截器不做归一化
6. **BigInt 注意事项**：开启 bigIntJSONParsing 后，大数字会变成字符串，需要后续处理注意类型
