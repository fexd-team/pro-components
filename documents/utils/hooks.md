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
const debouncedValue = useDebounce<T>(value: T, delay: number): T
```

| 参数  | 说明             | 类型   | 默认值 |
| ----- | ---------------- | ------ | ------ |
| value | 需要防抖的值     | T      | -      |
| delay | 延迟时间（毫秒） | number | -      |

### 搜索输入

```tsx | pure
import { useState, useEffect } from 'react'
import { useDebounce } from '@fexd/pro-components'

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearch = useDebounce(searchText, 300)

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
const debouncedEmail = useDebounce(email, 500)

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
const { loading, run, runAsync } = useAutoLoading(asyncFn)
```

| 参数    | 说明     | 类型                        |
| ------- | -------- | --------------------------- |
| asyncFn | 异步函数 | (...args) => Promise\<any\> |

### 返回值

| 属性     | 说明                   | 类型    |
| -------- | ---------------------- | ------- |
| loading  | 是否加载中             | boolean |
| run      | 执行（不返回 Promise） | T       |
| runAsync | 执行（返回 Promise）   | T       |

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
