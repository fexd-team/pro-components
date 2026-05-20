---
name: useProState
description: 增强状态 Hook，支持跨组件同步、localStorage/sessionStorage 持久化、对象自动合并、防抖/节流和闭包安全读取。
---

# useProState 增强状态

`useProState` 是 `useState` 的增强版本，适合页面查询条件、用户偏好、应用配置、跨组件共享状态等场景。

## 快速示例

```tsx
import { useProState } from '@fexd/pro-components'

const preferences = useProState(
  { theme: 'light', density: 'middle', pageSize: 20 },
  {
    key: '@app/user-preferences',
    persist: true,
    autoMergeObject: true,
  },
)

preferences.setState({ density: 'small' })
// state: { theme: 'light', density: 'small', pageSize: 20 }
```

## 跨组件同步 + 持久化

多个组件使用同一个 `key` 时，状态会自动同步；配置 `persist` 后，刷新页面可恢复。

```tsx
import { ProTable, useProState } from '@fexd/pro-components'

function ToolbarDensity() {
  const { state, setState } = useProState(
    { density: 'middle' },
    { key: '@app/table-preferences', persist: 'localStorage' },
  )

  return <DensitySwitch value={state.density} onChange={(density) => setState({ density })} />
}

function TableView() {
  const { state } = useProState({ density: 'middle' }, { key: '@app/table-preferences', persist: 'localStorage' })

  return <ProTable defaultSize={state.density} />
}
```

## 常用选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `key` | `string` | - | 状态唯一标识；相同 key 的实例可同步 |
| `sync` | `boolean` | `true` | 相同 key 的实例自动同步 |
| `persist` | `boolean \| 'localStorage' \| 'sessionStorage'` | `true` | 持久化存储类型 |
| `autoMergeObject` | `boolean` | `true` | 对象类型 `setState` 时自动浅合并 |
| `syncDefaultValue` | `boolean` | `false` | defaultValue 变化时同步更新 state |
| `beforeStatePersist` | `(value) => any` | - | 持久化前转换数据 |
| `beforeStateRecovery` | `(value) => any` | - | 恢复持久化数据时转换数据 |
| `debounce` | `DebounceOptions` | - | 生成 `debouncedState` |
| `throttle` | `ThrottleOptions` | - | 生成 `throttledState` |

## 返回值

| 属性             | 说明                                     |
| ---------------- | ---------------------------------------- |
| `state`          | 当前状态                                 |
| `setState`       | 设置状态，支持函数式更新；对象默认浅合并 |
| `resetState`     | 重置为初始值                             |
| `prevState`      | 上一次状态                               |
| `debouncedState` | 防抖后的状态                             |
| `throttledState` | 节流后的状态                             |
| `getState`       | 获取最新状态，避免闭包旧值               |

## 使用建议

- 需要跨组件共享或持久化时必须设置稳定的 `key`。
- 对象状态默认浅合并，更新局部字段时不需要手动展开旧对象。
- 数组、字符串、数字等非普通对象不会自动合并，会直接替换。
- `persist: true` 默认使用 localStorage；临时状态用 `persist: 'sessionStorage'`。
- 异步回调里需要最新状态时，使用 `getState()`，不要依赖闭包里的旧 `state`。
