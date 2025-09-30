# useDebounce - 防抖 Hook

## 功能介绍

useDebounce 是一个防抖 Hook，用于延迟更新值，常用于搜索输入、API 调用优化等场景，有效减少不必要的操作频率。

## 核心特性

- ⏰ **延迟更新**：在指定延迟时间后才更新值
- 🚫 **自动取消**：新的值变化会取消之前的延迟更新
- 🎯 **性能优化**：减少频繁的 API 调用和计算
- 💡 **简单易用**：API 简洁，使用方便
- 🔄 **即时生效**：组件卸载时自动清理定时器

## API

### useDebounce

```typescript
const useDebounce = <T>(value: T, delay: number) => T
```

### 参数说明

| 参数  | 说明             | 类型   | 默认值 |
| ----- | ---------------- | ------ | ------ |
| value | 需要防抖的值     | T      | -      |
| delay | 延迟时间（毫秒） | number | -      |

### 返回值

返回经过防抖处理的值，类型与输入值相同。

## 使用场景

### 1. 搜索输入防抖

```jsx
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@fexd/pro-utils'
import { Input } from 'antd'

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索API调用
      searchAPI(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  return <Input placeholder="输入搜索关键词" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
}
```

### 2. 表单验证防抖

```jsx
const FormField = () => {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)
  const debouncedEmail = useDebounce(email, 300)

  useEffect(() => {
    if (debouncedEmail) {
      validateEmail(debouncedEmail).then(setIsValid)
    }
  }, [debouncedEmail])

  return (
    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} status={!isValid ? 'error' : ''} />
  )
}
```

### 3. 窗口大小监听防抖

```jsx
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const debouncedSize = useDebounce(windowSize, 100)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return debouncedSize
}
```

### 4. 自动保存防抖

```jsx
const AutoSaveEditor = () => {
  const [content, setContent] = useState('')
  const debouncedContent = useDebounce(content, 1000)

  useEffect(() => {
    if (debouncedContent) {
      // 自动保存到服务器
      autoSave(debouncedContent)
    }
  }, [debouncedContent])

  return <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="输入内容，将自动保存..." />
}
```

## 实际应用示例

### 智能搜索组件

```jsx
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@fexd/pro-utils'
import { Input, List, Spin, Empty } from 'antd'

const SmartSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const searchResults = await onSearch(debouncedQuery)
        setResults(searchResults)
      } catch (error) {
        console.error('搜索失败:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [debouncedQuery, onSearch])

  return (
    <div>
      <Input placeholder="输入关键词搜索..." value={query} onChange={(e) => setQuery(e.target.value)} allowClear />

      <div style={{ marginTop: 16 }}>
        <Spin spinning={loading}>
          {results.length > 0 ? (
            <List dataSource={results} renderItem={(item) => <List.Item>{item.title}</List.Item>} />
          ) : (
            !loading && query && <Empty description="没有找到相关结果" />
          )}
        </Spin>
      </div>
    </div>
  )
}
```

## 最佳实践

### 1. 合理的延迟时间

```jsx
// ✅ 根据使用场景选择合适的延迟时间
const SearchBox = () => {
  const [query, setQuery] = useState('')

  // 搜索：300-500ms，平衡响应性和性能
  const debouncedQuery = useDebounce(query, 300)

  // 自动保存：1000-2000ms，避免频繁保存
  const debouncedContent = useDebounce(content, 1500)

  // 窗口大小：100-200ms，保持界面响应
  const debouncedSize = useDebounce(windowSize, 150)
}
```

### 2. 避免过度防抖

```jsx
// ✅ 只对需要的值进行防抖
const FormComponent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // 只对需要验证的字段防抖
  const debouncedEmail = useDebounce(email, 300)

  // 简单的name字段不需要防抖
  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
  )
}
```

### 3. 结合其他 Hook 使用

```jsx
// ✅ 与其他Hook配合使用
const useSearchResults = (query) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    let isCancelled = false
    setLoading(true)

    searchAPI(debouncedQuery).then((data) => {
      if (!isCancelled) {
        setResults(data)
        setLoading(false)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [debouncedQuery])

  return { results, loading }
}
```

## 注意事项

1. **延迟时间选择**：不同场景需要不同的延迟时间，搜索建议300-500ms，自动保存建议1000-2000ms
2. **内存泄漏**：组件卸载时会自动清理定时器，无需手动处理
3. **初始值处理**：首次渲染时会立即返回初始值，延迟只对后续变化生效
4. **性能考虑**：避免对所有输入都使用防抖，只在需要的地方使用
5. **用户体验**：过长的延迟会让用户感觉界面卡顿，需要平衡性能和体验
