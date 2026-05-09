---
name: useCoverable-migration
description: 从旧版 createBC + configurable 模式迁移到新版 useCoverable.component 模式的完整指南
---

# 从 createBC 迁移到 useCoverable.component

## 背景

`createBC` 是旧版的业务组件创建方式，通过 `configurable` prop 实现配置覆盖。新版 `useCoverable.component` 提供了更灵活、更清晰的方案。两者在消费方体验上类似，但内部编写方式差异较大。

## 核心差异对比

| 特性 | createBC（旧版） | useCoverable.component（新版） |
| --- | --- | --- |
| 组件创建 | `createBC({ configurable, render })` | `useCoverable.component((props, ref) => {...})` |
| 配置声明 | `configurable` 函数返回单个对象 | 多个 `useCoverable()` 调用，分组清晰 |
| API 定义 | `createApi({ ... })` | `request.coverable({ ... })` |
| columns 定义 | `defineProTableColumns({ ... })` | 直接写在 `ProTable.useCoverableProps` 的 columns 中 |
| 配置读取 | `config.apis.xxx()` / `config.columns.getConfigs()` | `apis.getConfig().xxx()` / `tableProps.getProps()` |
| 覆盖入口 | `<Comp configurable={{ ... }}>` | `<Comp coverable={{ ... }}>` |
| 配置合并 | 单层 deepMerge | 多层级精细 merge + CoverableValue |
| 渲染控制 | `render: ({ config }) => JSX` | `useCoverable.props({}).render(() => JSX)` |
| Ref 支持 | 无内建支持 | 自动保护 ref/tableRef/formRef |
| 多配置组 | 不支持（只有一个 configurable 对象） | 支持任意数量配置组 |

## 迁移步骤

### 第 1 步：骨架转换

**旧版：**

```tsx
const MyPage = createBC({
  defaultProps: { title: '' } as { title?: string },
  configurable: (props, { createApi, defineProTableColumns }) => {
    return { apis: {...}, access: {...}, columns: defineProTableColumns({...}) }
  },
  render: ({ config, ...props }) => {
    return <ProTable columns={config.columns.getConfigs()} ... />
  },
})
```

**新版：**

```tsx
const MyPage = useCoverable.component((props: { title?: string }, ref) => {
  const apis = useCoverable({ ... })
  const permission = useCoverable({ ... })
  const tableProps = ProTable.useCoverableProps({ ... })

  return useCoverable
    .props({ apis, permission, tableProps })
    .render(() => <ProTable {...tableProps.getProps()} />)
})
```

### 第 2 步：API 迁移

**旧版：**

```tsx
configurable: (props, { createApi }) => ({
  apis: {
    query: createApi({
      url: '/api/list',
      method: 'post',
      handleParams: (params) => ({ page: params?.page }),
      handleResponse: (response) => ({
        ...response,
        data: { list: response?.data?.records, total: response?.data?.total },
      }),
    }),
    delete: createApi({
      url: '/api/delete',
      method: 'post',
      handleParams: (item) => ({ id: item.id }),
    }),
  },
})
```

**新版：**

```tsx
const apis = useCoverable({
  query: request.coverable({
    url: '/api/list',
    method: 'post',
    handleParams: (params) => ({ page: params?.page }),
    handleResponse: (response) => ({
      ...response,
      data: { list: response?.data?.records, total: response?.data?.total },
    }),
  }),
  delete: request.coverable({
    url: '/api/delete',
    method: 'post',
    handleParams: (item) => ({ id: item.id }),
  }),
})
```

**变更**：`createApi` → `request.coverable`

### 第 3 步：权限/access 迁移

**旧版：**

```tsx
configurable: () => ({
  access: {
    add: true,
    edit: true,
    delete: true,
  },
})
```

**新版：**

```tsx
const permission = useCoverable({
  add: true,
  edit: true,
  delete: true,
})
```

### 第 4 步：columns 迁移

**旧版：**

```tsx
configurable: (props, { defineProTableColumns }) => ({
  columns: defineProTableColumns({
    名称: { label: '名称', name: 'name', width: 200 },
    状态: { label: '状态', name: 'status', type: 'select', options: [...] },
  }),
})

// render 中使用
<ProTable columns={config.columns.getConfigs()} />
```

**新版：**

```tsx
const tableProps = ProTable.useCoverableProps({
  columns: {
    名称: { label: '名称', name: 'name', width: 200 },
    状态: { label: '状态', name: 'status', type: 'select', options: [...] },
  },
  // ... 其他 ProTable props 也一起放在这里
})

// render 中使用
<ProTable {...tableProps.getProps()} />
```

**变更**：

- `defineProTableColumns` → 直接写在 `ProTable.useCoverableProps` 的 `columns` 中
- `config.columns.getConfigs()` → `tableProps.getProps()`（已包含 columns）

### 第 5 步：render 迁移

**旧版：**

```tsx
render: ({ config, ...props }) => {
  return (
    <ProTable
      title={props?.title}
      columns={config.columns.getConfigs()}
      onQuery={async (params) => {
        const response = await config.apis.query(params)
        return { success: response?.success, data: response?.data?.list }
      }}
      actions={[config.access.add ? 'add' : undefined].filter(Boolean)}
      columnActions={[config.access.delete ? 'delete' : undefined].filter(Boolean)}
      onDelete={async (item) => config.apis.delete(item)}
    />
  )
}
```

**新版：**

```tsx
// onQuery / onDelete 等放到 ProTable.useCoverableProps 中
const tableProps = ProTable.useCoverableProps({
  title: props?.title,
  columns: { ... },
  actions: permission.getConfig().add ? ['add'] : [],
  columnActions: { 删除: permission.getConfig().delete ? 'delete' : (undefined as any) },
  onQuery: async (params) => {
    const response = await apis.getConfig().query(params)
    return { success: response?.success, data: response?.data?.list }
  },
  onDelete: async (item) => apis.getConfig().delete(item),
})

return useCoverable
  .props({ apis, permission, tableProps })
  .render(() => <ProTable {...tableProps.getProps()} />)
```

**变更**：

- ProTable 的所有 props 统一放到 `useCoverableProps` 中
- `config.apis.query()` → `apis.getConfig().query()`
- `config.access.add` → `permission.getConfig().add`

### 第 6 步：消费方 prop 调整

**旧版消费方：**

```tsx
<MyPage
  configurable={{
    access: { add: hasPermission(101), delete: hasPermission(102) },
    apis: { query: { url: '/api/v2/list' } },
    columns: { 状态: { hidden: true } },
  }}
/>
```

**新版消费方：**

```tsx
<MyPage
  coverable={{
    permission: { add: hasPermission(101), delete: hasPermission(102) },
    apis: { query: { url: '/api/v2/list' } },
    tableProps: { columns: { 状态: { hidden: true } } },
  }}
/>
```

**变更**：

- `configurable` prop → `coverable` prop
- `access` → `permission`（或保持 `access`，取决于新组件内部命名）
- `columns` 嵌套在 `tableProps` 下（因为 columns 现在是 tableProps 的一部分）

## 逐步迁移策略

如果项目中有大量旧版 BC 组件，建议：

1. **新组件用新版**：所有新写的 BC 组件统一用 `useCoverable.component`
2. **按需迁移旧组件**：有修改需求时顺带迁移为新版
3. **保持 `createBC` 可用**：两种写法可共存，无需一次性全部迁移
4. **迁移后消费方需同步调整**：`configurable` → `coverable`，路径可能有微调

## 新版的优势

1. **多配置组**：apis / permission / tableProps / options / functions 分组清晰，覆盖路径直观
2. **ProTable 完整集成**：`useCoverableProps` 让所有 ProTable props 可覆盖，不仅仅是 columns
3. **Ref 安全**：自动保护 ref 对象，不会被 clone/merge 破坏
4. **嵌套配置**：配置组内部可再嵌套 `useCoverable`，层级更灵活
5. **类型推导更好**：coverable prop 的类型可从内部配置自动推导
6. **`request.coverable` 语义更强**：明确表达这是一个可覆盖的 API 配置
7. **函数式 coverable**：消费方可基于默认配置计算覆盖值

## 旧版与新版共存

在同一个 BC 库中，旧版和新版可以共存。`createBC` 底层实际上已经使用了 `createNextBC`（即 configurable 系统），两者的覆盖机制在消费方层面是兼容的。

旧版写法的组件继续通过 `configurable` prop 覆盖，新版通过 `coverable` prop 覆盖，互不干扰。
