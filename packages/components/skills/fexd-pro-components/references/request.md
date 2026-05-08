---
name: request
description: 请求工具，基于 axios + axios-cache-interceptor，支持缓存、大数字解析、defineApi 配置化
---

# request 请求工具

## 何时使用

- HTTP 请求封装，统一响应格式
- 需要请求缓存（GET/POST 均支持）
- 大数字 JSON 解析（如后端返回 bigint ID）
- 配置化 API 定义（`defineApi`）

## 基础实例

```typescript
import { request } from '@fexd/pro-components'
```

默认实例特性：

- 超时 60s
- 内置 BigInt JSON 解析
- 内置响应拦截器（归一化 `ServerResponse` 格式）
- 内置缓存支持（`axios-cache-interceptor`）

## request 实例方法

| 方法                              | 说明                                     |
| --------------------------------- | ---------------------------------------- |
| request.get(url, config?)         | GET 请求                                 |
| request.post(url, data?, config?) | POST 请求                                |
| request.put(url, data?, config?)  | PUT 请求                                 |
| request.delete(url, config?)      | DELETE 请求                              |
| request.clone(options?)           | 克隆实例（可选保留拦截器、合并缓存配置） |
| request.define(config)            | 创建配置化 API（`defineApi`）            |
| request.setConfig(config)         | 修改默认配置                             |

## ServerResponse 响应格式

```typescript
interface ServerResponse<T = any> {
  success: boolean
  data?: T
  message?: any
  code?: number | string
  error?: any
  response?: AxiosResponse
}
```

## defineApi — 配置化 API

```typescript
import { defineApi } from '@fexd/pro-components'

const fetchUsers = defineApi({
  url: '/api/users',
  method: 'get',
  handleParams: (params) => ({ params }),
  handleResponse: (res) => res.data,
})

const result = await fetchUsers({ page: 1, pageSize: 20 })
```

### DefineApiConfig

| 属性            | 说明         | 类型                        |
| --------------- | ------------ | --------------------------- |
| url             | 请求地址     | string                      |
| method          | 请求方法     | string                      |
| handleParams    | 参数处理函数 | (...args) => any            |
| handleResponse  | 响应处理函数 | (response) => any           |
| overrideConfig  | 额外配置覆盖 | (config, params?) => config |
| requestInstance | 请求实例     | ServerRequest               |

### DefinedApi 返回值方法

| 方法                                              | 说明                              |
| ------------------------------------------------- | --------------------------------- |
| definedApi(...args)                               | 直接调用发起请求                  |
| definedApi.runApi(...args)                        | 同上                              |
| definedApi.runWithConfig(overrideConfig, ...args) | 覆盖配置后请求                    |
| definedApi.override(partialOrFn)                  | 深度合并配置，返回新的 DefinedApi |

## 缓存

**缓存默认不启用**（`ttl: -1`）。需要手动配置 `ttl > 0` 才会生效。

```typescript
// 方式 1：克隆实例并启用缓存
const cachedRequest = request.clone({
  cacheSetupOptions: { ttl: 5 * 60 * 1000 }, // 5 分钟缓存
})

// 方式 2：在 defineApi 中为单个接口启用缓存
const fetchConfig = defineApi({
  url: '/api/config',
  cache: { ttl: 10 * 60 * 1000 }, // 10 分钟缓存
})

// 方式 3：单次请求启用缓存
request.get('/api/data', { cache: { ttl: 60 * 1000 } }) // 1 分钟缓存
```

缓存规则：

- **默认关闭**：`ttl` 默认值为 `-1`，所有请求不缓存
- **方法范围**：启用后对 GET、POST、HEAD 方法生效
- **禁用方式**：`cache: false` 或 `ttl <= 0`
- **缓存行为**：基于 `axios-cache-interceptor`，相同请求在 TTL 内直接返回缓存结果

## BigInt 解析

默认开启 `bigIntJSONParsing`，超出 `Number.MAX_SAFE_INTEGER` 的数字自动转字符串。

```typescript
// 禁用
request.get('/api/data', { bigIntJSONParsing: false })
```

## 代码示例

### 基础请求

```tsx
import { request } from '@fexd/pro-components'

const result = await request.get('/api/users', { params: { page: 1 } })
if (result.success) {
  console.log(result.data)
}
```

### defineApi 完整 CRUD 示例

```tsx
import { defineApi } from '@fexd/pro-components'

const userApi = {
  list: defineApi({
    url: '/api/users',
    method: 'get',
    handleParams: ({ page, pageSize, ...filters }) => ({
      params: { page, pageSize, ...filters },
    }),
  }),
  create: defineApi({
    url: '/api/users',
    method: 'post',
    handleParams: (userData) => userData,
  }),
  update: defineApi({
    url: '/api/users',
    method: 'put',
    handleParams: (id, data) => ({ ...data, id }),
    overrideConfig: (config, params) => ({
      url: `/api/users/${params?.id || ''}`,
    }),
  }),
  delete: defineApi({
    url: '/api/users',
    method: 'delete',
    handleParams: (ids: (string | number)[]) => ({ data: { ids } }),
  }),
}

const users = await userApi.list({ page: 1, pageSize: 20 })
await userApi.create({ name: '张三', age: 25 })
await userApi.update('user-id-1', { name: '李四' })
await userApi.delete(['user-id-1', 'user-id-2'])
```

### 与 ProTable 对接

`defineApi` 返回的 `ServerResponse` 只有 `success` / `data` / `message`。ProTable 的 `onQuery` 还需要 `total`，需通过 `handleResponse` 或后端约定来桥接：

```tsx
import { ProTable, defineApi } from '@fexd/pro-components'
import { message } from 'antd'

const userApi = {
  list: defineApi({
    url: '/api/users',
    method: 'get',
    handleParams: (params) => ({ params }),
    handleResponse: (res) => ({
      success: res.success,
      data: res.data?.list ?? res.data,
      total: res.data?.total ?? 0,
    }),
  }),
  create: defineApi({ url: '/api/users', method: 'post', handleParams: (data) => data }),
  update: defineApi({
    url: '/api/users',
    method: 'put',
    handleParams: (id, data) => ({ ...data, id }),
    overrideConfig: (_, params) => ({ url: `/api/users/${params?.id}` }),
  }),
  delete: defineApi({
    url: '/api/users',
    method: 'delete',
    handleParams: (ids: (string | number)[]) => ({ data: { ids } }),
  }),
}

export default () => (
  <ProTable
    title="用户管理"
    actions={['add']}
    columnActions={['edit', { builtIn: 'delete', confirm: '确定删除？' }]}
    selectable
    batchActions={[{ builtIn: 'delete', confirm: '确定批量删除？' }]}
    columns={[
      { label: '姓名', name: 'name', queryField: true, editField: { required: true } },
      { label: '部门', name: 'dept', type: 'select', options: deptOptions, queryField: true, editField: true },
      { label: '入职日期', name: 'joinDate', type: 'date', editField: true },
    ]}
    onQuery={async (params) => {
      // params 包含 { current, pageSize, ...查询表单值 }
      const res = await userApi.list({ page: params.current, pageSize: params.pageSize, ...params })
      return { success: res.success, data: res.data, total: res.total }
    }}
    onAdd={async (values) => {
      await userApi.create(values)
      message.success('新增成功')
      return { success: true }
    }}
    onEdit={async (values, item) => {
      // item 是当前行数据，包含 id 等字段
      await userApi.update(item.id, values)
      message.success('编辑成功')
      return { success: true }
    }}
    onDelete={async (target) => {
      // target: 单条删除时为行对象，批量删除时为行对象数组
      const ids = Array.isArray(target) ? target.map((t) => t.id) : [target.id]
      await userApi.delete(ids)
      message.success('删除成功')
      return { success: true }
    }}
  />
)
```

> **onDelete 的 target 参数说明**：单条删除时 `target` 为当前行对象；批量删除时为选中行对象数组。需统一转换为 id 数组。

### 克隆实例

```tsx
const customRequest = request.clone({
  keepInterceptors: true,
  cloneOptions: { baseURL: 'https://other-api.com' },
})
```

## 内置响应拦截器

自动归一化多种后端响应字段名：

- `success` / `errCode` / `code` → `success: boolean`
- `data` / `result` → `data`
- `message` / `errMsg` / `msg` → `message`
