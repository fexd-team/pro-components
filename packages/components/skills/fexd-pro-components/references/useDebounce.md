---
name: useDebounce
description: 防抖 Hook，延迟更新值，常用于搜索输入、API 调用优化
---

# useDebounce 防抖 Hook

## 何时使用

- 搜索输入优化，减少 API 请求频率
- 实时校验的延迟执行
- 窗口 resize 等高频事件处理

## API

```typescript
const debouncedValue = useDebounce<T>(value: T, delay: number): T
```

| 参数  | 说明             | 类型   | 默认值 |
| ----- | ---------------- | ------ | ------ |
| value | 需要防抖的值     | T      | -      |
| delay | 延迟时间（毫秒） | number | -      |

## 代码示例

### 搜索输入

```tsx
import { useState } from 'react'
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

```tsx
const [email, setEmail] = useState('')
const debouncedEmail = useDebounce(email, 500)

useEffect(() => {
  if (debouncedEmail) {
    validateEmail(debouncedEmail)
  }
}, [debouncedEmail])
```
