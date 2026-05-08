---
title: useCoverable - 业务组件化
order: 3
---

# useCoverable

一套用于构建**可覆盖配置**的业务组件化 Hook 体系。组件作者定义默认配置，使用者通过 `coverable` prop 按路径精确覆盖任意层级的配置项，无需整体替换。

<code src="./demos/useCoverable.tsx"></code>

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

```tsx
import React from 'react'
import { useCoverable } from '@fexd/pro-utils'

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

```tsx
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

```tsx
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

```tsx
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

```tsx
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
