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

## 大数字安全解析

自动检测超过 `Number.MAX_SAFE_INTEGER` 的大数字，转为字符串保留精度。

```tsx | pure
// 后端返回 {"id": 9007199254740993}
// 默认 JSON.parse 精度丢失: 9007199254740992

// request 自动安全解析:
const data = await request.get('/api/resource')
// data.id === "9007199254740993" (字符串保留精度)
```

## 错误处理

```tsx | pure
try {
  const data = await request.get('/api/users')
} catch (error) {
  if (error.response?.status === 401) {
    redirectToLogin()
  } else {
    message.error(error.message || '请求失败')
  }
}
```
