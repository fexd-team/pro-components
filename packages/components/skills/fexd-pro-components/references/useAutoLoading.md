---
name: useAutoLoading
description: 自动管理异步函数加载状态的 Hook
---

# useAutoLoading 自动加载状态

## 何时使用

- 异步操作需要 loading 状态管理
- 替代手动的 useState + try/finally 模式

## API

```typescript
const { loading, run, runAsync } = useAutoLoading<T>(asyncFunction: T)
```

| 参数          | 说明     | 类型                        |
| ------------- | -------- | --------------------------- |
| asyncFunction | 异步函数 | (...args) => Promise\<any\> |

### 返回值

| 属性     | 说明                       | 类型    |
| -------- | -------------------------- | ------- |
| loading  | 加载状态                   | boolean |
| run      | 执行函数（不返回 Promise） | T       |
| runAsync | 执行函数（返回 Promise）   | T       |

## 代码示例

### 基础用法

```tsx
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

```tsx
const { loading, runAsync } = useAutoLoading(async (id: string) => {
  const result = await api.getDetail(id)
  return result
})

const handleClick = async () => {
  const detail = await runAsync('123')
  setDetail(detail)
}
```

### 列表加载

```tsx
const { loading, run: fetchList } = useAutoLoading(async (params) => {
  const result = await api.getList(params)
  setList(result.data)
})

useEffect(() => {
  fetchList({ page: 1 })
}, [])
```

## 注意事项

1. `run` 不返回 Promise，适合事件处理器
2. `runAsync` 返回 Promise，适合需要获取结果的场景
3. 优先考虑使用 `Action` 组件（内置自动 loading）
