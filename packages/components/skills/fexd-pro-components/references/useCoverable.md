---
name: useCoverable
description: 业务组件化 Hook，用于创建可配置的业务组件，支持默认配置与运行时配置的智能合并。核心设计理念：将一整个页面/功能封装为"可覆盖业务组件(BC)"，通过 coverable prop 实现跨项目复用时的精确定制。
---

# useCoverable 业务组件化

> 核心 Hook，详细文档已拆分为子文件，按需查阅。

## 子文档导航

| 文档 | 内容 |
| --- | --- |
| [useCoverable-design](./useCoverable-design.md) | 设计指南——传统组件 vs BC 组件对比、设计思维、反模式 |
| [useCoverable-bc](./useCoverable-bc.md) | BC 编写指南——从组件封装到 npm 发布的完整模式 |
| [useCoverable-consume](./useCoverable-consume.md) | 消费方使用指南——如何通过 coverable prop 覆盖权限/API/UI |
| [useCoverable-request](./useCoverable-request.md) | request.coverable 深入——API 请求的可覆盖配置机制 |
| [useCoverable-migration](./useCoverable-migration.md) | 从旧版 createBC + configurable 迁移到新版 useCoverable.component |

## 核心概念

useCoverable 解决的问题：**将完整的业务页面封装为可复用组件，让不同项目能精准覆盖 API 地址、权限控制、UI 配置等任意层级的配置项**。

核心设计思路是「默认配置 + 外部覆盖」：组件定义完整默认配置，使用方通过 `coverable` prop 精确覆盖变更部分，未覆盖字段保持默认值不变。

## API 速览

### useCoverable(config)

声明一组可覆盖的默认配置，返回 `Coverable<T>` 对象。

```typescript
function useCoverable<T extends Record<string, any>>(
  config: T | ((options: { getConfig: () => Record<string, any> }) => T),
): Coverable<T>
```

### useCoverable.component(useContent, options?)

组件工厂，将 hook 函数包装为带 `coverable` prop 的 React 组件。

```typescript
const MyBC = useCoverable.component((props, ref) => {
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

自定义合并策略。

```typescript
useCoverable.value({
  default: defaultValue,
  config: configType,
  onCovered: (current, config) => mergedValue,
})
```

### useCoverable.raw(value)

标记对象为不可处理，跳过 clone/traverse/merge，保持原始引用。

### useCoverable.merge(obj1, obj2)

内置深度合并工具函数。

### request.coverable(apiConfig)

API 请求的可覆盖配置值。详见 [useCoverable-request](./useCoverable-request.md)。

## 合并策略

| 数据类型       | 合并行为                            |
| -------------- | ----------------------------------- |
| 普通对象       | 递归深度合并                        |
| 数组           | 可用 `{ index: value }` 按索引覆盖  |
| CoverableValue | 调用 `onCovered()`                  |
| 基本类型       | 直接替换                            |
| React 元素     | 跳过深度遍历，直接替换              |
| React ref      | 自动检测，保持引用，整体替换        |
| raw 标记对象   | 跳过 clone/traverse/merge，保持引用 |

### 顶层 key 不可新增

`useCoverable` 只能**覆盖**已声明的配置项，**不能**在顶层新增原配置中不存在的 key。这是有意为之的设计约束：

```typescript
const config = useCoverable({ a: 1, b: 2 })
// ❌ 顶层新增 key 无效
// __cover({ c: 3 }) → getConfig() 仍为 { a: 1, b: 2 }，c 不存在

// ✅ 嵌套对象中可以新增 key（子对象合并时会带入 override 的所有属性）
const config = useCoverable({ data: { a: 1, b: 2 } })
// __cover({ data: { c: 3 } }) → getConfig().data = { a: 1, b: 2, c: 3 }
```

**设计原因**：

1. **类型安全**：`CoverableProps<T>` 使用 `[K in keyof T]?` 映射，TypeScript 类型系统不允许传入未声明的 key
2. **API 契约**：顶层 key 是组件的配置面声明，组件作者通过 `useCoverable({...})` 明确暴露哪些项可被覆盖
3. **实现机制**：核心 `deepMap(defaultConfig, handleItem)` 只遍历 `defaultConfig` 自有的 key

嵌套对象能新增 key 是因为 `shallowMerge(item, override, ...)` 在合并时会把 override 的所有属性带入结果。

## 最小使用示例

```tsx
import { useCoverable, ProTable } from '@fexd/pro-components'

const UserList = useCoverable.component((props, ref) => {
  const permission = useCoverable({ search: true, add: true, delete: true })
  const tableProps = ProTable.useCoverableProps({
    title: '用户管理',
    columns: { 姓名: { label: '姓名', name: 'name' } },
    onQuery: async (params) => fetchUsers(params),
  })

  return useCoverable
    .props({ permission, tableProps })
    .render(() => <ProTable {...tableProps.getProps()} />)
})

// 消费方
<UserList coverable={{ permission: { add: false }, tableProps: { title: '员工列表' } }} />
```

## 轻量数据面板示例

不是所有可覆盖组件都需要封装成完整管理页。简单的数据面板也可以用 `useCoverable.component` 暴露布局、分页和数据源等默认配置：

```tsx
import { useCoverable } from '@fexd/pro-components'

const DataPanel = useCoverable.component((props, ref) => {
  const layout = useCoverable({
    pageSize: 10,
    columns: 3,
    showTotal: true,
  })
  const data = useCoverable({
    fetchList: async (params) => ({ total: 0, list: [] }),
  })

  return useCoverable.props({ layout, data }).render(() => {
    const layoutConfig = layout.getConfig()
    const dataConfig = data.getConfig()

    return (
      <PanelGrid
        columns={layoutConfig.columns}
        pageSize={layoutConfig.pageSize}
        showTotal={layoutConfig.showTotal}
        request={dataConfig.fetchList}
      />
    )
  })
})

// 消费方只覆盖差异项
;<DataPanel
  coverable={{
    layout: { pageSize: 20, columns: 4 },
    data: { fetchList: fetchDashboardCards },
  }}
/>
```

轻量场景也遵循同一条规则：默认配置用 `useCoverable()` 声明，渲染前用 `useCoverable.props({ ... }).render()` 接入管线，在 `render()` 回调内通过 `getConfig()` 读取最终配置。

## 注意事项

1. `getConfig()` 延迟求值，在 `render()` 回调中调用最安全
2. 覆盖是非破坏性的，未被覆盖的字段保持默认值
3. 在 `useCoverable.props()` 中注册的配置组名称即为 coverable prop 中的覆盖路径
4. 始终通过 `apis.getConfig().apiName(params)` 调用 API，确保覆盖后的值生效
5. React ref（`{ current: ... }` 单键对象）自动保持引用
6. 非 ref 特殊对象用 `useCoverable.raw()` 标记保护
7. `useCoverableProps` 自动处理 `ref` / `tableRef` / `formRef` 的安全传递
8. 顶层 key 不可新增——只能覆盖已声明的配置项（嵌套对象中可以新增 key，参见合并策略章节）
