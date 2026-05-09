---
title: useProState - 增强状态
order: 10
---

# useProState 增强状态管理

`useState` 的增强版本，支持**跨组件同步**、**持久化**（localStorage/sessionStorage）、**对象自动合并**、**防抖/节流**。

## API

```tsx | pure
const result = useProState<T>(defaultValue, options?)
```

### 参数

| 参数         | 说明   | 类型                    |
| ------------ | ------ | ----------------------- |
| defaultValue | 初始值 | T \| () => T            |
| options      | 配置项 | UseProStateOptions\<T\> |

### UseProStateOptions

| 选项                | 类型                                          | 默认值 | 说明                                  |
| ------------------- | --------------------------------------------- | ------ | ------------------------------------- |
| key                 | string                                        | -      | 唯一标识，设置后启用同步和持久化      |
| sync                | boolean                                       | true   | 相同 key 的多个实例自动同步           |
| persist             | boolean \| 'localStorage' \| 'sessionStorage' | true   | 持久化存储类型                        |
| autoMergeObject     | boolean                                       | true   | 对象类型 setState 时自动浅合并        |
| syncDefaultValue    | boolean                                       | false  | defaultValue 变化时自动同步更新 state |
| beforeStatePersist  | (value: T) => any                             | -      | 持久化前的数据转换                    |
| beforeStateRecovery | (value: T) => any                             | -      | 恢复持久化数据时的转换                |
| debounce            | DebounceOptions                               | -      | 为 debouncedState 配置防抖            |
| throttle            | ThrottleOptions                               | -      | 为 throttledState 配置节流            |

> `persist` 和 `sync` 仅在 `key` 为有效字符串时生效。不传 `key` 时等同普通增强 useState。

### 返回值

| 属性           | 说明                                 |
| -------------- | ------------------------------------ |
| state          | 当前状态值                           |
| setState       | 设置状态（支持函数式、对象自动合并） |
| resetState     | 重置为初始值                         |
| prevState      | 上一次的状态值                       |
| debouncedState | 防抖后的状态值                       |
| throttledState | 节流后的状态值                       |
| getState       | 获取最新状态（闭包安全）             |

## 代码示例

### 基础用法 — 对象自动合并

```tsx | pure
import { useProState } from '@fexd/pro-components'

const { state, setState, resetState } = useProState({ page: 1, keyword: '' }, { autoMergeObject: true })

setState({ keyword: '搜索词' })
// 结果：{ page: 1, keyword: '搜索词' }（自动合并，无需展开）

setState((prev) => ({ page: prev.page + 1 }))

resetState()
// 恢复为 { page: 1, keyword: '' }
```

### 跨组件同步 + 持久化

```tsx | pure
const { state, setState } = useProState(
  { page: 1, keyword: '' },
  {
    key: 'my-feature:list-params',
    persist: true,
    sync: true,
  },
)
```

设置相同 `key` 的多个组件实例会自动同步状态，刷新页面后从 localStorage 恢复。

### 全局共享状态

```tsx | pure
import { useProState } from '@fexd/pro-components'
import { createModel } from 'hox'

function useAccount() {
  const accountState = useProState(undefined, {
    key: '@app/shared:account',
  })
  return {
    account: accountState.state,
    setAccount: accountState.setState,
  }
}

export default createModel(useAccount)
```

### 带防抖的搜索参数

```tsx | pure
const { state, setState, debouncedState } = useProState(
  { keyword: '' },
  {
    key: 'search:params',
    debounce: { wait: 300 },
    persist: 'sessionStorage',
  },
)

// state.keyword 实时更新
// debouncedState.keyword 300ms 后更新（用于请求）
```

## ⚠️ 注意事项

1. `key` 不传时，`persist` 和 `sync` 不会生效
2. `autoMergeObject` 仅对纯对象类型有效，数组/原始值不会自动合并
3. `persist: true` 默认使用 localStorage，传 `'sessionStorage'` 可切换为 sessionStorage
4. 持久化的值会在页面加载时自动恢复，优先级高于 `defaultValue`
