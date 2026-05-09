---
title: request - 请求工具
order: 7
---

# request 请求工具

基于 fetch 的请求工具，提供 API 定义、大数字安全解析、`useCoverable` 集成等增强特性。

## 核心 API

### request

发起 HTTP 请求，支持中间件扩展。

```tsx | pure
import { request } from '@fexd/pro-components'

const data = await request('/api/users', {
  method: 'GET',
  params: { page: 1, size: 10 },
})
```

| 参数    | 说明     | 类型           | 默认值 |
| ------- | -------- | -------------- | ------ |
| url     | 请求 URL | string         | -      |
| options | 请求配置 | RequestOptions | -      |

### RequestOptions

| 属性         | 说明             | 类型   | 默认值 |
| ------------ | ---------------- | ------ | ------ |
| method       | 请求方法         | string | 'GET'  |
| params       | URL 参数         | object | -      |
| data / body  | 请求体           | any    | -      |
| headers      | 请求头           | object | -      |
| timeout      | 超时时间（毫秒） | number | -      |
| responseType | 响应类型         | string | 'json' |
| prefix       | URL 前缀         | string | -      |

## defineApi - API 定义

使用 `defineApi` 创建类型安全的 API 函数，结合 `useCoverable` 支持可覆盖配置。

```tsx | pure
import { defineApi } from '@fexd/pro-components'

const fetchUsers = defineApi({
  url: '/api/users',
  method: 'GET',
})

const createUser = defineApi({
  url: '/api/users',
  method: 'POST',
})

// 使用
const users = await fetchUsers({ params: { page: 1 } })
await createUser({ data: { name: '张三' } })
```

### 与 useCoverable 集成

```tsx | pure
import { defineApi, useCoverable } from '@fexd/pro-components'

const api = useCoverable.raw({
  fetchUsers: defineApi({ url: '/api/users' }),
  createUser: defineApi({ url: '/api/users', method: 'POST' }),
})

// 组件中
const users = await api.fetchUsers({ params: { page: 1 } })
```

## 大数字安全解析

使用 `json-custom-numbers` 进行 JSON 解析，安全处理超过 `Number.MAX_SAFE_INTEGER` 的大数字。

```tsx | pure
// 后端返回 {"id": 9007199254740993}
// 默认 JSON.parse 精度丢失: 9007199254740992

// request 自动安全解析:
const data = await request('/api/resource')
// data.id === "9007199254740993" (字符串保留精度)
```

### 原理

- 自动检测超出安全范围的数字
- 将大数字转换为字符串保留精度
- 不影响正常范围的数字
- 底层从 `json-bigint` 迁移到 `json-custom-numbers`，更轻量

## 常见模式

### 组合 useRequest

```tsx | pure
import { useRequest } from 'ahooks'
import { request } from '@fexd/pro-components'

const UserList = () => {
  const data = useRequest(() => request('/api/users'))

  return <Table dataSource={data.data?.list} loading={data.loading} />
}
```

### RESTful CRUD

```tsx | pure
const userApi = {
  list: defineApi({ url: '/api/users' }),
  detail: defineApi({ url: '/api/users/:id' }),
  create: defineApi({ url: '/api/users', method: 'POST' }),
  update: defineApi({ url: '/api/users/:id', method: 'PUT' }),
  remove: defineApi({ url: '/api/users/:id', method: 'DELETE' }),
}
```

### 错误处理

```tsx | pure
try {
  const data = await request('/api/users')
} catch (error) {
  if (error.response?.status === 401) {
    redirectToLogin()
  } else {
    message.error(error.message || '请求失败')
  }
}
```
