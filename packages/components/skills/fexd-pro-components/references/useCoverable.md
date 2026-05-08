---
name: useCoverable
description: 业务组件化 Hook，用于创建可配置的业务组件，支持默认配置与运行时配置的智能合并
---

# useCoverable 业务组件化

## 何时使用

- 创建可配置的业务组件（默认配置 + 运行时覆盖）
- 组件需要支持外部精确覆盖内部配置项
- 需要自定义合并策略的场景

## API

### useCoverable(config)

声明一组可覆盖的默认配置。

```typescript
function useCoverable<T extends Record<string, any>>(
  config: T | ((options: { getConfig: () => Record<string, any> }) => T),
): Coverable<T>
```

| 参数   | 说明                           | 类型                  |
| ------ | ------------------------------ | --------------------- |
| config | 默认配置对象，或返回配置的函数 | T \| ((options) => T) |

返回值的 `getConfig()` 获取合并后的最终配置。

### useCoverable.component(useContent, options?)

组件工厂，包装为带 `coverable` prop 的 React 组件。

```typescript
const MyComponent = useCoverable.component((props, ref) => {
  const config = useCoverable({ ... })
  return useCoverable.props({ config }).render(() => <JSX />)
})
```

### useCoverable.props(configs)

将多个 useCoverable 配置连接到渲染管线。

```typescript
useCoverable.props({ config1, config2 }).render(() => <JSX />)
```

### useCoverable.value(valueConfig)

创建自定义合并策略的配置值。

```typescript
useCoverable.value({
  default: defaultValue,
  config: configType, // 仅用于 TS 类型推导
  onCovered: (current, config) => mergedValue,
})
```

### useCoverable.raw(value)

标记一个对象为"不可处理"，coverable 系统会跳过对它的 clone / traverse / merge，保持原始引用不变。

```typescript
const controller = useCoverable.raw({ reload: () => {}, reset: () => {} })
const config = useCoverable({ controller, title: '表格' })
// config.getConfig().controller === controller  ✅ 同一引用
```

适用场景：

- ref 对象（`useRef` / `createRef` 产物已被**自动识别**，无需手动标记）
- 第三方 SDK 实例、事件总线等不应被深拷贝的对象
- 任何内部状态不应被 coverable 侵入的值

> **注意**：React ref（仅含 `current` 一个 key 的对象）已被 coverable 自动检测并保护，大多数场景无需手动调用 `raw()`。`raw()` 是为非 ref 的特殊对象提供的显式逃生舱。

### useCoverable.merge(obj1, obj2)

内置深度合并工具函数。

### 合并策略

| 数据类型         | 合并行为                                |
| ---------------- | --------------------------------------- |
| 普通对象         | 递归深度合并                            |
| 数组             | 可用 `{ index: value }` 按索引覆盖      |
| CoverableValue   | 调用 `onCovered()`                      |
| 基本类型         | 直接替换                                |
| React 元素       | 跳过深度遍历，直接替换                  |
| **React ref**    | **自动检测，保持引用，整体替换**        |
| **raw 标记对象** | **跳过 clone/traverse/merge，保持引用** |

## 代码示例

### 基础用法

```tsx
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
        <p>columns: {layout.columns}, pageSize: {pagination.pageSize}</p>
      </div>
    )
  })
})

// 使用时覆盖配置
<MyComponent
  title="示例"
  coverable={{
    config: {
      layout: { columns: 4 },
      pagination: { pageSize: 20 },
    },
  }}
/>
```

### 自定义合并策略

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

### 多配置组

```tsx
const Panel = useCoverable.component((props, ref) => {
  const headerConfig = useCoverable({ height: 48, showLogo: true })
  const tableConfig = useCoverable({ actions: ['add', 'refresh'] })

  return useCoverable.props({ headerConfig, tableConfig }).render(() => { /* ... */ })
})

<Panel coverable={{
  headerConfig: { showLogo: false },
  tableConfig: { actions: ['add', 'refresh', 'export'] },
}} />
```

### 数组按索引覆盖

```tsx
const config = useCoverable({ tabs: ['首页', '列表', '详情', '设置'] })
<MyComponent coverable={{ config: { tabs: { 2: '详情页（新）' } } }} />
```

### 函数式 coverable

```tsx
<MyComponent
  coverable={(defaultConfig) => ({
    config: {
      pagination: { pageSize: defaultConfig.config.pagination.pageSize * 2 },
    },
  })}
/>
```

### Ref 安全传递

`useCoverableProps` 会自动提取 `ref` / `tableRef` / `formRef`，使其不经过 coverable 的 clone/merge 链，在 `getProps()` 输出时安全注入。

```tsx
const CoverableTable = useCoverable.component((props, ref) => {
  const tableRef = ProTable.useRef()
  const tableProps = ProTable.useCoverableProps({
    ref: tableRef,          // ✅ 自动提取，不会被 cloneDeep 破坏
    title: '用户列表',
    columns: [{ title: '名称', dataIndex: 'name' }],
  })

  return useCoverable.props({ tableProps }).render(() => (
    <ProTable {...tableProps.getProps()} />
  ))
})

// 父组件可通过 coverable 覆盖 ref
<CoverableTable coverable={{ tableProps: { ref: parentRef } }} />
```

### 保护非 ref 的特殊对象

```tsx
const CoverableBC = useCoverable.component((props, ref) => {
  const sdk = React.useMemo(() => useCoverable.raw(createSDK()), [])

  const config = useCoverable({
    sdk, // ✅ raw 标记，不会被 cloneDeep / deepMerge 破坏
    title: '业务组件',
  })

  return useCoverable.props({ config }).render(() => {
    const { sdk, title } = config.getConfig()
    return (
      <div>
        {title} - v{sdk.version}
      </div>
    )
  })
})
```

## 注意事项

1. `getConfig()` 延迟求值，在 `render()` 回调中调用最安全
2. 覆盖是非破坏性的，未被覆盖的字段保持默认值
3. React 元素在深度遍历时会被跳过
4. 数组索引覆盖用 `{ index: value }`，不改变数组长度
5. CoverableValue 的 `config` 字段仅用于类型推导
6. **React ref**（`{ current: ... }` 单键对象）**自动保持引用**，无需手动处理
7. 非 ref 的特殊对象（SDK、事件总线等）使用 `useCoverable.raw()` 标记保护
8. `useCoverableProps` 自动处理 `ref` / `tableRef` / `formRef` 的安全传递
