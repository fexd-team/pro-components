# Hooks 与工具函数

@fexd/pro-utils 提供的实用 Hooks 和工具函数，全部通过 `@fexd/pro-components` 统一导出。

## Hooks

### useCoverable — 业务组件化

创建可覆盖配置的业务组件。详见 [references/useCoverable.md](references/useCoverable.md)。

核心 API：`useCoverable()` · `useCoverable.component()` · `useCoverable.props()` · `useCoverable.value()` · `useCoverable.raw()` · `useCoverable.merge()`

- **ref 自动保护**：`{ current: ... }` 单键对象被自动识别，不会被 clone / merge 破坏
- **`raw()` 逃生舱**：非 ref 的特殊对象用 `useCoverable.raw(obj)` 标记，跳过所有处理
- **`useCoverableProps`**：ProTable/ProForm 的 `ref` / `tableRef` / `formRef` 会被自动提取并安全回注

```jsx
import { useCoverable } from '@fexd/pro-components'

const MyComponent = useCoverable.component((props, ref) => {
  const config = useCoverable({ pageSize: 10, showHeader: true })
  return useCoverable.props({ config }).render(() => {
    const { pageSize, showHeader } = config.getConfig()
    return <div>...</div>
  })
})
```

### useDebounce — 防抖

延迟更新值，适用于搜索输入优化。详见 [references/useDebounce.md](references/useDebounce.md)。

```jsx
import { useDebounce } from '@fexd/pro-components'
const debouncedValue = useDebounce(searchText, 300)
```

### useAutoLoading — 自动加载状态

自动管理异步函数的 loading 状态。详见 [references/useAutoLoading.md](references/useAutoLoading.md)。

```jsx
import { useAutoLoading } from '@fexd/pro-components'
const { loading, run, runAsync } = useAutoLoading(fetchData)
```

### useRequest — 请求 Hook

来自 ahooks 的请求 Hook，推荐用法：

```jsx
import { useRequest } from '@fexd/pro-components'
const data = useRequest(fetchApi)
data.run()
```

### 其他 Hooks

| Hook               | 说明                                  |
| ------------------ | ------------------------------------- |
| useProState        | 增强的 useState，支持更灵活的状态更新 |
| useGetLatest       | 始终获取最新值的 ref                  |
| useThrottle        | 节流 Hook                             |
| useForceUpdate     | 强制重渲染                            |
| useLazyRender      | 延迟渲染，优化性能                    |
| usePreferredDark   | 检测系统暗色模式                      |
| useInitializeTasks | 初始化任务队列                        |

## 工具组件

### Action — 操作按钮

异步 loading + 确认操作的增强按钮。详见 [references/Action.md](references/Action.md)。

### showModal — 命令式弹窗

命令式模态框，支持拖拽和 Promise。详见 [references/showModal.md](references/showModal.md)。

### showImages — 图片预览

命令式多图预览工具。详见 [references/showImages.md](references/showImages.md)。

### showDrawer — 命令式抽屉

命令式侧边抽屉组件。

## 工具函数

### request / defineApi

请求工具，支持内置配置和缓存：

```jsx
import { request, defineApi } from '@fexd/pro-components'

const api = defineApi({ baseURL: '/api' })
const result = await api.get('/users')
```

### 常用工具

| 函数                        | 说明                                    |
| --------------------------- | --------------------------------------- |
| deepMerge(a, b)             | 深度合并两个对象                        |
| catchPromise(promise)       | 安全的 Promise 捕获，返回 [error, data] |
| confirmPromise(fn)          | 需要用户确认的异步流程                  |
| filterObjectEmptyValue(obj) | 过滤对象中的空值                        |
| dayjsTZ                     | 带时区的 dayjs 实例                     |
| createSharedHook(hook)      | 创建跨组件共享的 Hook                   |
| file2base64(file)           | 文件转 base64                           |
| obj2formdata(obj)           | 对象转 FormData                         |
| formdata2obj(formdata)      | FormData 转对象                         |

## i18n

内置国际化支持：

```jsx
import { ConfigProvider } from '@fexd/pro-components'
;<ConfigProvider localeKey="en-US">
  <App />
</ConfigProvider>
```

支持语言：zh-CN、en-US、id-ID、ms_MY、th-TH。
