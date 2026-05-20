---
title: useCoverable - 业务组件化
order: 3
---

# useCoverable

一套用于构建**可覆盖配置**的业务组件化 Hook 体系。组件作者定义默认配置，使用者通过 `coverable` prop 按路径精确覆盖任意层级的配置项，无需整体替换。

## 设计理念：为什么需要 useCoverable？

传统的 React 组件复用方式是通过 Props 暴露定制接口。当组件足够复杂（如一整个 CRUD 管理页面）时，需要定制的点会非常多——API 地址、权限开关、表格列、分页大小、操作按钮……传统方式会导致 Props 接口爆炸式增长。

`useCoverable` 提供了另一种思路：**组件内部声明完整的默认配置树，外部按路径覆盖需要变更的节点**。

- 组件作者不需要预测所有定制需求——配置结构本身就是定制接口
- 消费方只传差异部分——代码极简
- 新增需求不改接口——只需在内部增加配置节点，自动可覆盖

### 传统组件 vs BC 组件

<code src="./demos/useCoverable-design.tsx"></code>

---

## BC 包：设计方法与实践

### 什么是 BC（Business Component）

BC 是基于 `useCoverable` 封装的**整页级可复用业务组件**。一个 BC 通常是一整个管理后台页面——包含完整的 API 调用、权限控制、表格/表单配置和业务逻辑——但全部以「可覆盖配置」形式暴露。不同项目只需传入差异化的 `coverable` prop 即可完成定制。

### 核心设计思维：从「暴露接口」到「暴露配置路径」

**传统组件思维：**

> "用户可能需要定制 X，所以我加一个 `customX` prop"

**BC 思维：**

> "我把 X 作为配置写入 coverable，用户需要定制时自然能覆盖"

这意味着 BC 组件**不需要预测所有定制需求**。只要配置结构合理，任何节点都自动可覆盖。新增需求时只需在内部添加配置节点，消费方即可立即使用，无需发布新版 prop 接口。

### 配置分组设计

一个完整的 BC 组件通常包含以下「配置分组」，每个分组是一个独立的 `useCoverable` 调用：

#### `apis` — 接口请求层

所有后端 API 统一收在此处，使用 `request.coverable()` 包装：

```tsx | pure
const apis = useCoverable({
  getList: request.coverable({
    url: '/api/product/list',
    method: 'post',
    handleParams: (params) => ({
      page: params?.page,
      page_size: params?.pageSize,
    }),
    handleResponse: (response) => ({
      ...response,
      data: response?.data?.records,
      total: response?.data?.count,
    }),
  }),
  create: request.coverable({ url: '/api/product/create', method: 'post' }),
  remove: request.coverable({
    url: '/api/product/delete',
    method: 'post',
    handleParams: (item) => ({ id: item.id }),
  }),
})
```

**设计要点：**

- 每个 API 独立命名，语义清晰
- `handleParams` 负责将标准参数格式转换为后端期望格式
- `handleResponse` 负责将后端响应标准化
- 消费方可覆盖 URL、参数处理、甚至完全接管请求逻辑

#### `permission` — 权限控制层

定义页面中各功能的权限开关。**默认全部开启**，消费方按需关闭：

```tsx | pure
const permission = useCoverable({
  search: true,
  add: true,
  edit: true,
  delete: true,
  export: false, // 某些功能可默认关闭
})
```

**设计要点：**

- BC 不关心权限怎么来——只声明开关
- 消费方根据自身的权限体系注入具体值（如 `hasPermission(xxx)`）
- 在 tableProps 中读取权限控制按钮/行为的显隐

#### `options` — 枚举/选项映射层

```tsx | pure
const options = useCoverable({
  statusList: [
    { label: t('上架'), value: 'online', badge: 'processing' },
    { label: t('下架'), value: 'offline', badge: 'warning' },
  ],
  categoryMapping: {
    electronics: t('电子产品'),
    clothing: t('服装'),
  },
})
```

#### `functions` — 可覆盖业务逻辑层

将**核心业务算法/流程**放入 functions，允许消费方替换特定逻辑：

```tsx | pure
const functions = useCoverable({
  filterDetailTypes: (key, item) => key !== 'deprecated',
  computeStatistics: (data) => ({ total: data.length, active: data.filter((d) => d.active).length }),
  formatExportData: (records) => records.map((r) => ({ ...r, formatted: true })),
})
```

#### `tableProps` — ProTable 完整配置

使用 `ProTable.useCoverableProps` 声明表格的所有配置：

```tsx | pure
const tableProps = ProTable.useCoverableProps({
  title: t('商品管理'),
  bordered: true,
  columns: {
    商品名称: { label: t('商品名称'), name: 'name', queryField: true, editField: { required: true } },
    状态: { label: t('状态'), name: 'status', type: 'select', options: options.getConfig().statusList },
  },
  actions: permission.getConfig().add ? ['add'] : [],
  columnActions: { 删除: permission.getConfig().delete ? 'delete' : (undefined as any) },
  onQuery: async (params) => apis.getConfig().getList(params),
  onDelete: async (item) => apis.getConfig().remove(item),
})
```

#### 注册并渲染

最后用 `useCoverable.props()` 注册所有配置，配置组的 key 名即为消费方 `coverable` prop 的路径：

```tsx | pure
return useCoverable
  .props({ apis, permission, options, functions, tableProps })
  .render(() => <ProTable {...tableProps.getProps()} />)
```

### 消费方的使用体验

配置的覆盖是按路径精确合并的——只需传变更部分，其余保持默认：

```tsx | pure
// 项目 A：只需传权限
<ProductManager coverable={{ permission: { add: false, delete: false } }} />

// 项目 B：API 路径不同
<ProductManager coverable={{ apis: { getList: { url: '/api/v2/products' } } }} />

// 项目 C：隐藏某列 + 改分页
<ProductManager coverable={{
  tableProps: {
    columns: { 状态: { hidden: true } },
    pagination: { pageSize: 20 },
  },
}} />

// 项目 D：函数式覆盖（基于默认值计算）
<ProductManager
  coverable={(defaultConfig) => ({
    tableProps: { title: defaultConfig.tableProps.title + ' (V2)' },
  })}
/>
```

### 渐进式演进路径

BC 不是从零开始设计的，而是可以从已有代码逐步演进：

**Phase 1** — 先写好普通页面组件

```tsx | pure
function ProductPage() {
  return <ProTable onQuery={...} columns={[...]} />
}
```

**Phase 2** — 当需要复用时，用 `useCoverable.component` 包装

```tsx | pure
const ProductManager = useCoverable.component(() => {
  const apis = useCoverable({ ... })
  const permission = useCoverable({ ... })
  // ...
  return useCoverable.props({ ... }).render(...)
})
```

**Phase 3** — 多个项目需要时，移入独立 npm 包发布

### BC（Business Component）实战 Demo

以下 Demo 展示一个用 `useCoverable` 封装的完整 CRUD 管理页面，使用开关模拟不同项目对同一 BC 的差异化配置：

<code src="./demos/useCoverable-bc.tsx"></code>

---

### BC 包的组织结构

推荐的 monorepo 结构：

```
bc-library/
├── packages/
│   ├── module-a/           → @scope/module-a
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── PageA.tsx     ← useCoverable.component 整页组件
│   │   │   │   └── PageB.tsx
│   │   │   ├── index.ts          ← 统一导出
│   │   │   └── style.css
│   │   └── package.json
│   ├── module-b/           → @scope/module-b
│   └── shared/             → @scope/shared（公共工具/国际化）
├── pnpm-workspace.yaml
└── turbo.json
```

每个组件文件即一个完整页面，导出后消费方一行代码引入使用。

---

## API 参考

### useCoverable(config)

核心 Hook，在组件内部声明一组可覆盖的默认配置。

```typescript
function useCoverable<T extends Record<string, any>>(
  config: T | ((options: { getConfig: () => Record<string, any> }) => T),
): Coverable<T>
```

| 参数     | 说明                           | 类型                    |
| -------- | ------------------------------ | ----------------------- |
| `config` | 默认配置对象，或返回配置的函数 | `T \| ((options) => T)` |

**返回值** `Coverable<T>`：

| 属性          | 说明                 | 类型                     |
| ------------- | -------------------- | ------------------------ |
| `getConfig()` | 获取合并后的最终配置 | `() => DeepCoverable<T>` |

---

### useCoverable.value(valueConfig)

创建一个**自定义合并策略**的配置值。当默认的深度合并行为不满足需求时使用。

```typescript
function createValue<V, T>(valueConfig: CoverableValueConfig<V, T>): CoverableValue<V, T>
```

| 参数        | 说明                                         | 类型                             | 必填 |
| ----------- | -------------------------------------------- | -------------------------------- | ---- |
| `default`   | 默认值                                       | `V`                              | 否   |
| `config`    | 覆盖时传入的配置类型（仅用于 TS 类型推导）   | `T`                              | 否   |
| `onCovered` | 自定义合并函数 `(current, config) => result` | `(current: V, config: T) => any` | 否   |

> 当未提供 `onCovered` 时，默认使用 `builtInMerge`（深度合并）。

---

### useCoverable.props(configs)

将多个 `useCoverable` 返回的配置连接到渲染管线。

```typescript
useCoverable.props({ config1, config2, ... }).render(() => <JSX />)
```

返回一个对象，包含：

- `render(content)` — 传入渲染函数，返回 `{ coverableConfig, content, getDefaultCoverableConfig }` 供 `useCoverable.component` 消费。

---

### useCoverable.component(useContent, options?)

组件工厂函数，将 Hook 逻辑包装为一个带 `coverable` prop 的 React 组件。

```typescript
function createComponent<Props, Ref, T>(
  useContent: (
    props: Props,
    ref: Ref,
  ) => {
    coverableConfig: T
    content: any
    getDefaultCoverableConfig?: () => any
  },
  options?: {
    defaultProps?: Props
    propsAreEqual?: (prev, next) => boolean
  },
): React.FC<Props & { coverable?: CoverableProps<T> | ((defaultConfig) => CoverableProps<T>) }>
```

生成的组件自动支持：

- `coverable` prop（对象形式或函数形式）
- `React.memo` 优化
- `React.forwardRef` 转发

---

### useCoverable.merge(obj1, obj2, filter?)

内置的深度合并工具函数。

```typescript
function merge(obj1: any, obj2: any, filter?: (value, key) => boolean): any
```

---

## 合并策略

| 数据类型                              | 合并行为                                       |
| ------------------------------------- | ---------------------------------------------- |
| 普通对象 `{}`                         | 递归深度合并                                   |
| 数组 `[]`                             | 可用对象形式按索引覆盖，如 `{ 2: newValue }`   |
| `CoverableValue`                      | 调用 `onCovered(defaultValue, overrideConfig)` |
| 基本类型（string / number / boolean） | 直接替换                                       |
| React 元素                            | 跳过深度遍历，直接替换                         |

---

## 使用场景

### 1️⃣ 基础用法 — 定义可覆盖的组件

```tsx | pure
import React from 'react'
import { useCoverable } from '@fexd/pro-components'

const MyComponent = useCoverable.component((props: { title: string }, ref) => {
  const config = useCoverable({
    layout: { gutter: 16, columns: 3 },
    pagination: { pageSize: 10, showTotal: true },
  })

  return useCoverable.props({ config }).render(() => {
    const { layout, pagination } = config.getConfig()
    return (
      <div>
        <h3>{props.title}</h3>
        <p>
          columns: {layout.columns}, pageSize: {pagination.pageSize}
        </p>
      </div>
    )
  })
})

// 使用时覆盖部分配置
function App() {
  return (
    <MyComponent
      title="示例"
      coverable={{
        config: {
          layout: { columns: 4 }, // 只改 columns，gutter 保持 16
          pagination: { pageSize: 20 }, // 只改 pageSize，showTotal 保持 true
        },
      }}
    />
  )
}
```

---

### 2️⃣ 自定义合并策略 — useCoverable.value

当你需要控制配置的合并方式，而非简单的深度合并时：

```tsx | pure
const config = useCoverable({
  theme: useCoverable.value({
    default: { primary: '#1890ff', fontSize: 14 },
    config: { mode: 'dark' as 'dark' | 'light' },
    onCovered: (current, config) => {
      // 根据 mode 切换主题色，保留 fontSize
      const colorMap = { dark: '#141414', light: '#ffffff' }
      return { ...current, primary: colorMap[config.mode] ?? current.primary }
    },
  }),
})

// 使用时传入 config 类型的数据
<MyComponent coverable={{ config: { theme: { mode: 'dark' } } }} />
```

---

### 3️⃣ 多配置组 + 嵌套覆盖

```tsx | pure
const Panel = useCoverable.component((props: { name: string }, ref) => {
  const headerConfig = useCoverable({ height: 48, showLogo: true })
  const tableConfig = useCoverable({
    columns: [
      { title: '名称', dataIndex: 'name' },
      { title: '状态', dataIndex: 'status' },
    ],
    actions: ['add', 'refresh'],
  })

  return useCoverable
    .props({ headerConfig, tableConfig })
    .render(() => {
      const header = headerConfig.getConfig()
      const table = tableConfig.getConfig()
      return (
        <div>
          <header style={{ height: header.height }}>
            {header.showLogo && <span>LOGO</span>}
          </header>
          <p>actions: {table.actions.join(', ')}</p>
        </div>
      )
    })
})

// 使用时分别覆盖
<Panel
  name="管理面板"
  coverable={{
    headerConfig: { showLogo: false },
    tableConfig: {
      actions: ['add', 'refresh', 'export'],
    },
  }}
/>
```

---

### 4️⃣ 数组按索引覆盖

数组配置可以用对象形式按索引精确覆盖：

```tsx | pure
const config = useCoverable({
  tabs: ['首页', '列表', '详情', '设置'],
})

// 只修改第 3 项（索引 2），其余保持不变
<MyComponent coverable={{ config: { tabs: { 2: '详情页（新）' } } }} />
// 结果: ['首页', '列表', '详情页（新）', '设置']
```

---

### 5️⃣ 函数式 coverable — 根据默认值动态决定覆盖

`coverable` prop 也可以传入函数，入参为组件的默认配置：

```tsx | pure
<MyComponent
  coverable={(defaultConfig) => ({
    config: {
      pagination: {
        pageSize: defaultConfig.config.pagination.pageSize * 2,
      },
    },
  })}
/>
```

---

## 类型定义

```typescript
// 可覆盖值的配置
interface CoverableValueConfig<V, T> {
  default?: V
  config?: T
  onCovered?: (current: V, config: T) => any
}

// useCoverable 返回值
interface Coverable<T> {
  getConfig: () => DeepCoverable<T>
}

// coverable prop 的类型
type CoverableProps<T> = {
  [K in keyof T]?: /* 递归推导的可选覆盖类型 */
}
```

---

## 注意事项

1. **`getConfig()` 延迟求值** — 配置的合并在调用 `getConfig()` 时才执行，在 `render` 回调中调用最安全
2. **覆盖是非破坏性的** — 未被覆盖的字段始终保持默认值
3. **React 元素会被跳过** — 深度遍历时遇到 React 元素不会继续递归
4. **数组索引覆盖** — 使用对象 `{ index: value }` 形式，不会改变数组长度
5. **CoverableValue 的 `config` 字段** — 仅用于 TypeScript 类型推导，运行时不参与合并逻辑

---

## BC 组件设计优势总结

| 维度         | 传统 Props 组件            | BC Coverable 组件                |
| ------------ | -------------------------- | -------------------------------- |
| 定制粒度     | 预设的 props 级别          | 任意深度配置节点                 |
| 接口膨胀     | 需求增加 → props 增加      | 配置结构固定，覆盖无限扩展       |
| 消费方代码量 | 大量 props 传递            | 只传差异部分                     |
| API 定制能力 | 通常只能改 URL             | URL + 参数 + 响应 + 完全接管     |
| 维护性       | props 变更需通知所有消费方 | 内部重构不影响覆盖路径           |
| 新增需求     | 改组件接口 + 改所有消费方  | 只改组件内部配置（已有覆盖路径） |

### 何时选择 BC 模式

- 一个组件 = 一个完整管理页面
- 多个项目需要以不同配置复用同一功能
- 涉及 API、权限、表格列、表单字段等多层配置
- 需要「零配置即可用，差异化按需覆盖」的体验

### 何时用传统 Props

- 纯 UI 组件（Button、Card 等）
- 配置项少且固定
- 不存在跨项目复用需求
