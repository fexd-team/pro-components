---
title: request - 请求工具
order: 7
---

# request 请求工具

基于 axios 的请求封装，提供简洁的 HTTP 方法调用、大数字安全解析、可覆盖 API 定义等特性。

## 基础用法

```tsx | pure
import { request } from '@fexd/pro-components'

// GET
const result = await request.get('/api/users', { params: { page: 1, size: 10 } })

// POST
const result = await request.post('/api/users', { name: '张三', email: 'test@example.com' })

// PUT
const result = await request.put('/api/users/1', { name: '李四' })

// DELETE
const result = await request.delete('/api/users/1')
```

### 响应结构

```tsx | pure
interface ServerResponse<T = any> {
  success: boolean
  data: T
  message?: string
  notification?: string
}

const result = await request.get('/api/users')
if (result.success) {
  console.log(result.data)
}
```

## 组合 useRequest

推荐使用 ahooks 的 `useRequest` 搭配 `request`：

```tsx | pure
import { useRequest } from 'ahooks'
import { request } from '@fexd/pro-components'

const UserList = () => {
  const data = useRequest(() => request.get('/api/users'))

  return <Table dataSource={data.data?.list} loading={data.loading} />
}
```

## 全局配置

```tsx | pure
// 设置全局请求配置（基于 axios）
request.setConfig({
  baseURL: '/api',
  timeout: 10000,
  headers: { Authorization: `Bearer ${token}` },
})
```

## 克隆实例

```tsx | pure
// 创建独立的 request 实例（不影响全局配置）
const customRequest = request.clone({
  baseURL: 'https://other-api.example.com',
  timeout: 30000,
})
```

## request.coverable — 可覆盖 API

结合 `useCoverable` 体系，定义可被上层 BC 覆盖配置的 API。

```tsx | pure
import { request } from '@fexd/pro-components'

// 定义可覆盖的 API
const fetchUsers = request.coverable({
  url: '/api/users',
  method: 'get',
})

const createUser = request.coverable({
  url: '/api/users',
  method: 'post',
})

// 在 useCoverable 组件中，上层可通过 coverable 属性覆盖 API 配置
```

## 内置响应拦截器

request 内置了统一的响应拦截器，自动将各种后端响应格式规范化为 `ServerResponse` 结构。

### 成功响应

自动兼容多种后端字段命名，统一为：

```tsx | pure
{
  success: true,
  data: response.data,
  code: errCode ?? code ?? status,
  message: msg ?? sysMsg ?? errMsg ?? message,
  response,  // 原始 axios response
}
```

### 失败响应

错误也被包装为业务结构（不会直接 throw），方便统一处理：

```tsx | pure
{
  success: false,
  data: error.response?.data,
  code,
  message,
  error,
  response: error.response,
}
```

### Blob 响应

当响应数据为 `Blob` 类型时（如文件下载），拦截器直接返回 Blob 数据，不做包装。

### 自定义拦截器

可以在内置拦截器之外追加自定义拦截器：

```tsx | pure
// 请求拦截 — 统一添加 token
request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})

// 响应拦截 — 全局错误处理
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 401) {
      redirectToLogin()
    }
    return error
  },
)
```

## 请求缓存

基于 `axios-cache-interceptor`，支持对 GET/POST/HEAD 请求进行缓存。

### 默认行为

默认 **不缓存**（`ttl: -1`）。需要缓存时在单次请求中传入 `cache` 配置：

```tsx | pure
// 缓存 5 秒
const result = await request.get('/api/config', {
  cache: { ttl: 5000 },
})

// 第二次相同请求将直接返回缓存
const cached = await request.get('/api/config', {
  cache: { ttl: 5000 },
})
// cached.cached === true
```

### 缓存配置

| 属性            | 类型       | 默认值                    | 说明                                |
| --------------- | ---------- | ------------------------- | ----------------------------------- |
| ttl             | number     | -1                        | 缓存过期时间（毫秒），-1 表示不缓存 |
| interpretHeader | boolean    | false                     | 是否根据响应头缓存策略              |
| methods         | string\[\] | \['get', 'post', 'head'\] | 允许参与缓存的 HTTP 方法            |

## 大数字安全解析

默认开启（`bigIntJSONParsing: true`），自动检测超过安全范围的数字并保留精度。

```tsx | pure
// 后端返回 {"id": 9007199254740993}
// 默认 JSON.parse 会丢失精度: 9007199254740992

// request 自动安全解析:
const data = await request.get('/api/resource')
// data.id === "9007199254740993"
```

### 配置大数解析

```tsx | pure
// 关闭大数解析
request.setConfig({ bigIntJSONParsing: false })

// 自定义解析器
request.setConfig({
  bigIntJSONParsing: true,
  bigIntNumberParser: (key, str) => {
    // 自定义大数处理逻辑
    return BigInt(str)
  },
})
```

## Content-Type 自动处理

内置的 `transformRequest` 根据 `Content-Type` 自动处理请求体：

| Content-Type                        | 处理方式               |
| ----------------------------------- | ---------------------- |
| `application/x-www-form-urlencoded` | `qs.stringify(data)`   |
| `application/json`                  | `JSON.stringify(data)` |
| `multipart/form-data`               | 原样传递               |
| 未设置（对象/数组）                 | 自动设为 JSON 并序列化 |
