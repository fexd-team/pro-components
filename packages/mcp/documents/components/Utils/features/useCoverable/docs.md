# useCoverable - 业务组件化 Hook

## 功能介绍

useCoverable 是一套用于构建**可覆盖配置**的业务组件化 Hook 体系。组件作者定义默认配置，使用者通过 `coverable` prop 按路径精确覆盖任意层级的配置项，无需整体替换。

## 核心特性

- 🔧 **深度合并**：默认配置与覆盖配置智能深度合并，未覆盖字段保持默认值
- 🎯 **精确覆盖**：按 key path 逐层定位要覆盖的配置项
- 🎨 **自定义合并**：通过 `useCoverable.value` 定义特殊的合并策略
- 📦 **类型安全**：完整的 TypeScript 类型推导，coverable prop 自动推导可覆盖字段
- 🔗 **多配置组**：一个组件内可定义多组独立的可覆盖配置
- 🧩 **数组索引覆盖**：数组可按索引精确修改，如 `{ 2: newValue }`

## API

### useCoverable(config)

核心 Hook，声明一组可覆盖的默认配置。

```typescript
function useCoverable<T extends Record<string, any>>(
  config: T | ((options: { getConfig: () => Record<string, any> }) => T),
): Coverable<T>
```

#### 参数

| 参数   | 说明                           | 类型                    | 默认值 |
| ------ | ------------------------------ | ----------------------- | ------ |
| config | 默认配置对象，或返回配置的函数 | `T \| ((options) => T)` | -      |

#### 返回值 Coverable\<T\>

| 属性        | 说明                 | 类型                     |
| ----------- | -------------------- | ------------------------ |
| getConfig() | 获取合并后的最终配置 | `() => DeepCoverable<T>` |

### useCoverable.value(valueConfig)

创建一个自定义合并策略的配置值。

```typescript
function createValue<V, T>(valueConfig: CoverableValueConfig<V, T>): CoverableValue<V, T>

interface CoverableValueConfig<V, T> {
  default?: V // 默认值
  config?: T // 覆盖配置类型（仅用于 TS 类型推导）
  onCovered?: (current: V, config: T) => any // 自定义合并函数
}
```

### useCoverable.props(configs)

将多个 useCoverable 返回的配置连接到渲染管线。

```typescript
useCoverable.props({ config1, config2 }).render(() => <JSX />)
```

### useCoverable.component(useContent, options?)

组件工厂，包装为带 `coverable` prop 的 React 组件。

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
): React.FC<Props & { coverable?: CoverableProps<T> }>
```

### useCoverable.merge(obj1, obj2)

内置深度合并工具函数。

### 合并策略

| 数据类型       | 合并行为                                       |
| -------------- | ---------------------------------------------- |
| 普通对象 `{}`  | 递归深度合并                                   |
| 数组 `[]`      | 可用对象形式按索引覆盖 `{ 2: newValue }`       |
| CoverableValue | 调用 `onCovered(defaultValue, overrideConfig)` |
| 基本类型       | 直接替换                                       |
| React 元素     | 跳过深度遍历，直接替换                         |

## 使用场景

### 1. 基础用法 — 定义可覆盖的组件

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

function App() {
  return (
    <MyComponent
      title="示例"
      coverable={{
        config: {
          layout: { columns: 4 },
          pagination: { pageSize: 20 },
        },
      }}
    />
  )
}
```

### 2. 自定义合并策略

```tsx
const config = useCoverable({
  theme: useCoverable.value({
    default: { primary: '#1890ff', fontSize: 14 },
    config: { mode: 'dark' as 'dark' | 'light' },
    onCovered: (current, config) => {
      const colorMap = { dark: '#141414', light: '#ffffff' }
      return { ...current, primary: colorMap[config.mode] ?? current.primary }
    },
  }),
})
```

### 3. 多配置组

```tsx
const Panel = useCoverable.component((props, ref) => {
  const headerConfig = useCoverable({ height: 48, showLogo: true })
  const tableConfig = useCoverable({ actions: ['add', 'refresh'] })

  return useCoverable
    .props({ headerConfig, tableConfig })
    .render(() => { /* ... */ })
})

<Panel coverable={{
  headerConfig: { showLogo: false },
  tableConfig: { actions: ['add', 'refresh', 'export'] },
}} />
```

### 4. 数组按索引覆盖

```tsx
const config = useCoverable({ tabs: ['首页', '列表', '详情', '设置'] })
// 只修改索引 2 的项
<MyComponent coverable={{ config: { tabs: { 2: '详情页（新）' } } }} />
```

### 5. 函数式 coverable

```tsx
<MyComponent
  coverable={(defaultConfig) => ({
    config: {
      pagination: { pageSize: defaultConfig.config.pagination.pageSize * 2 },
    },
  })}
/>
```

## 注意事项

1. `getConfig()` 延迟求值，在 render 回调中调用最安全
2. 覆盖是非破坏性的，未被覆盖的字段始终保持默认值
3. React 元素在深度遍历时会被跳过
4. 数组索引覆盖使用对象形式 `{ index: value }`，不改变数组长度
5. CoverableValue 的 `config` 字段仅用于类型推导，运行时不参与合并
