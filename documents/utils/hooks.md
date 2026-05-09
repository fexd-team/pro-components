---
title: Hooks 工具集
order: 9
---

# Hooks 工具集

项目提供的实用 React Hooks，解决常见开发需求。

## 在线演示

<code src="./demos/hooks-demo.tsx"></code>

---

## useDebounce 防抖 Hook

延迟更新值，常用于搜索输入、API 调用优化。

### API

```tsx | pure
const debouncedValue = useDebounce<T>(value: T, options?: DebounceOptions): T
```

| 参数    | 说明         | 类型            | 默认值 |
| ------- | ------------ | --------------- | ------ |
| value   | 需要防抖的值 | T               | -      |
| options | 防抖配置     | DebounceOptions | -      |

**DebounceOptions**（来自 ahooks）：

| 属性     | 说明             | 类型    | 默认值 |
| -------- | ---------------- | ------- | ------ |
| wait     | 延迟时间（毫秒） | number  | 0      |
| leading  | 是否在延迟前调用 | boolean | false  |
| trailing | 是否在延迟后调用 | boolean | true   |

> `wait` 为 0 或不传时，直接返回原始值（同步模式，不触发额外渲染）。

### 搜索输入

```tsx | pure
import { useState, useEffect } from 'react'
import { useDebounce } from '@fexd/pro-components'

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearch = useDebounce(searchText, { wait: 300 })

  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch)
    }
  }, [debouncedSearch])

  return <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="搜索..." />
}
```

### 实时校验

```tsx | pure
const [email, setEmail] = useState('')
const debouncedEmail = useDebounce(email, { wait: 500 })

useEffect(() => {
  if (debouncedEmail) {
    validateEmail(debouncedEmail)
  }
}, [debouncedEmail])
```

---

## useAutoLoading 自动 loading

<code src="./demos/autoloading-demo.tsx"></code>

自动管理异步函数的加载状态，告别 `useState(false)` + `try/finally` 模板代码。

### API

```tsx | pure
const { loading, onAction } = useAutoLoading({ action: asyncFn, loading?: externalLoading })
```

| 参数    | 说明              | 类型                        |
| ------- | ----------------- | --------------------------- |
| action  | 异步函数          | (...args) => Promise\<any\> |
| loading | 外部 loading 控制 | boolean（可选）             |

### 返回值

| 属性            | 说明                     | 类型     |
| --------------- | ------------------------ | -------- |
| loading         | 防抖后的加载状态         | boolean  |
| realTimeLoading | 实时加载状态（无防抖）   | boolean  |
| onAction        | 执行函数（返回 Promise） | Function |
| setLoading      | 手动设置 loading         | Function |

> `Action` 组件内部使用此 Hook，通常不需要直接调用。

### 基础用法

```tsx | pure
import { useAutoLoading } from '@fexd/pro-components'

const MyComponent = () => {
  const { loading, run } = useAutoLoading(async () => {
    await api.fetchData()
  })

  return (
    <Button loading={loading} onClick={run}>
      加载数据
    </Button>
  )
}
```

### 带返回值

```tsx | pure
const { loading, runAsync } = useAutoLoading(async (id: string) => {
  const result = await api.getDetail(id)
  return result
})

const handleClick = async () => {
  const detail = await runAsync('123')
  setDetail(detail)
}
```

### 💡 提示

- `run` 适合直接绑定事件处理器（不关心返回值）
- `runAsync` 适合需要获取异步结果的场景
- 如果只需要按钮级 loading，优先考虑 `Action` 组件（内置自动 loading）
