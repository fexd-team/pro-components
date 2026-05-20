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

### useProState — 增强状态管理

`useState` 的增强版本，支持**跨组件同步**、**持久化**（localStorage/sessionStorage）、**对象自动合并**、**防抖/节流**。详见 [references/useProState.md](references/useProState.md)。

```tsx
import { useProState } from '@fexd/pro-components'

const { state, setState, resetState, debouncedState, prevState } = useProState(
  { page: 1, keyword: '' },
  {
    key: 'my-feature:list-params', // 相同 key 的多个实例自动同步
    persist: true, // 持久化到 localStorage
    autoMergeObject: true, // 对象自动合并（类似 useSetState）
    debounce: { wait: 300 }, // 内置 debounce
  },
)

// 对象自动合并（无需展开）
setState({ keyword: '搜索词' }) // 结果：{ page: 1, keyword: '搜索词' }

// 函数式更新
setState((prev) => ({ page: prev.page + 1 }))

// 重置为初始值
resetState()
```

**API 参数：**

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `key` | `string` | - | 唯一标识。设置后启用同步和持久化 |
| `sync` | `boolean` | `true` | 相同 key 的多个 useProState 实例自动同步值 |
| `persist` | `boolean \| 'localStorage' \| 'sessionStorage'` | `true` | 持久化存储类型 |
| `autoMergeObject` | `boolean` | `true` | 对象类型 setState 时自动浅合并 |
| `syncDefaultValue` | `boolean` | `false` | defaultValue 变化时自动同步更新 state |
| `beforeStatePersist` | `(value) => any` | - | 持久化前的数据转换 |
| `beforeStateRecovery` | `(value) => any` | - | 恢复持久化数据时的转换 |
| `debounce` | `DebounceOptions` | - | 为 debouncedState 配置防抖 |
| `throttle` | `ThrottleOptions` | - | 为 throttledState 配置节流 |

**返回值：**

| 属性             | 说明                                 |
| ---------------- | ------------------------------------ |
| `state`          | 当前状态值                           |
| `setState`       | 设置状态（支持函数式、对象自动合并） |
| `resetState`     | 重置为初始值                         |
| `prevState`      | 上一次的状态值                       |
| `debouncedState` | 防抖后的状态值                       |
| `throttledState` | 节流后的状态值                       |
| `getState`       | 获取最新状态（闭包安全）             |

**典型场景：**

```tsx
// 1. 全局共享状态（配合 hox createModel）
function useAccount() {
  const accountState = useProState<UserInfo>(undefined, {
    key: '@app/shared:account',
  })
  return { account: accountState.state, setAccount: accountState.setState }
}
export default createModel(useAccount)

// 2. 应用级配置（跨组件同步 + 持久化）
const appConfig = useProState({}, { key: '@app/shared:appConfig' })

// 3. Tab 切换状态（含 URL 参数联动）
const tabState = useProState(searchParams?.type ?? 'all')
```

### useLazyRender — 视口懒渲染

基于 IntersectionObserver 的懒渲染 Hook，内容进入视口后才真正渲染。用于大列表/大表格的性能优化。

```tsx
import { useLazyRender } from '@fexd/pro-components'

const content = useLazyRender({
  content: () => <HeavyComponent />, // 实际内容（函数或 ReactNode）
  placeholder: <Skeleton />, // 未渲染时的占位
  forceVisible: false, // 强制直接渲染（跳过懒加载）
})

return <div>{content}</div>
```

**API 参数：**

| 选项                          | 类型                           | 默认值  | 说明                             |
| ----------------------------- | ------------------------------ | ------- | -------------------------------- |
| `content`                     | `ReactNode \| () => ReactNode` | -       | 进入视口后渲染的真实内容         |
| `placeholder`                 | `ReactNode`                    | -       | 未加载时的占位元素               |
| `forceVisible`                | `boolean`                      | `false` | 强制直接渲染（跳过懒加载）       |
| `placeholderWrapperClassName` | `string`                       | -       | 占位容器的 className             |
| `debugLog`                    | `boolean`                      | `false` | 调试模式，打印渲染次数           |
| `threshold`                   | `number`                       | `0`     | IntersectionObserver threshold   |
| `wait`                        | `number`                       | `128`   | 进入视口后的 debounce 延迟（ms） |

**内部使用场景：**

ProTable 和 ProField 内部自动使用 `useLazyRender` 优化大数据表格渲染：

```tsx
// ProField 的 lazyRender 属性
fields={[
  { label: '描述', name: 'desc', type: 'textarea', lazyRender: true },
]}

// ProTable 的 lazyRenderCell（默认配置）
<ProTable
  lazyRenderCell={({ yIndex, isActionColumn }) => {
    if (isActionColumn && yIndex <= 14) return false  // 前15行操作列不懒加载
    return { wait: 64 }  // 其余单元格使用 64ms debounce 懒加载
  }}
/>
```

### 其他 Hooks

| Hook               | 说明                 |
| ------------------ | -------------------- |
| useGetLatest       | 始终获取最新值的 ref |
| useThrottle        | 节流 Hook            |
| useForceUpdate     | 强制重渲染           |
| usePreferredDark   | 检测系统暗色模式     |
| useInitializeTasks | 初始化任务队列       |

## 工具组件

### Action — 操作按钮

异步 loading + 确认操作的增强按钮。详见 [references/Action.md](references/Action.md)。

### Actions — 操作按钮组

基于 `Space` 渲染一组 `Action`，支持配置数组、共享 loading、内置动作映射：

```tsx
import { Actions } from '@fexd/pro-components'

<Actions
  configs={[
    { children: '编辑', onClick: handleEdit },
    { children: '删除', danger: true, onClick: handleDelete, confirm: '确认删除？' },
    { builtIn: 'view' },  // 引用内置动作
  ]}
  shareAutoLoading      // 一个按钮 loading 时其余 disabled
  spaceSize="small"
/>

// configs 也可为函数（用于动态生成）
<Actions configs={(record) => [
  { children: '审批', onClick: () => handleApprove(record) },
  record.status === 'draft' && { children: '编辑', onClick: () => handleEdit(record) },
].filter(Boolean)} />
```

| 属性                | 说明                                         | 类型                                       |
| ------------------- | -------------------------------------------- | ------------------------------------------ |
| `configs`           | 按钮配置数组或生成函数                       | `ActionConfig[] \| (() => ActionConfig[])` |
| `shareAutoLoading`  | 共享 loading（一个 loading 时其余 disabled） | `boolean`                                  |
| `noWrapper`         | 不包裹 Space                                 | `boolean`                                  |
| `spaceSize`         | Space 间距                                   | `SpaceProps['size']`                       |
| `renderAction`      | 自定义渲染每个 Action                        | `(config) => ReactNode`                    |
| `actionParams`      | 传递给 configs 函数的参数                    | `any[]`                                    |
| `getBuiltInActions` | 内置动作映射表                               | `() => Record<string, ActionConfig>`       |

### DropdownButton — 下拉按钮

增强的 `Dropdown.Button`，继承 Action 的自动 loading + Button 的所有 props：

```tsx
import { DropdownButton } from '@fexd/pro-components'
;<DropdownButton
  type="primary"
  onClick={handleMainAction}
  menuIcon={<DownOutlined />}
  menu={{
    items: [
      { key: 'export', label: '导出' },
      { key: 'import', label: '导入' },
    ],
  }}
>
  操作
</DropdownButton>
```

### showModal — 命令式弹窗

命令式模态框，支持拖拽和 Promise。详见 [references/showModal.md](references/showModal.md)。

#### closeAll — 关闭所有弹窗

关闭所有通过 `showModal` / `showDrawer` 打开的命令式弹窗，同时销毁 antd 的 `Modal.destroyAll()` 和 `message.destroy()`：

```tsx
import { closeAll } from '@fexd/pro-components'

// 路由跳转时清理所有弹窗
router.beforeEach(() => {
  closeAll()
})
```

### showTipsWithResponse — 根据响应自动提示

根据 `ServerResponse` 格式的对象自动显示 `message` 或 `notification` 提示：

```tsx
import { showTipsWithResponse } from '@fexd/pro-components'

const res = await request.post('/api/users', data)
showTipsWithResponse(res)
// 如果 res.success=true 且 res.message='创建成功' → message.success('创建成功')
// 如果 res.success=false 且 res.message='参数错误' → message.error('参数错误')
// 如果 res.notification='操作完成' → notification.success({ description: '操作完成' })
```

提示逻辑：

- `response.message` 为字符串 → `message[success ? 'success' : 'error'](msg)`
- `response.message` 为对象 → `message[type](messageConfig)`
- `response.notification` 为字符串 → `notification[type]({ description })`
- `response.notification` 为对象 → `notification[type](notifyConfig)`

### showImages — 图片预览

命令式多图预览工具。详见 [references/showImages.md](references/showImages.md)。

### showDrawer — 命令式抽屉

命令式侧边抽屉组件。

## 工具函数

### dayjsTZ — 时区安全的 dayjs

解决前端与后端服务器时区不一致的问题。`dayjsTZ` 是 dayjs 的时区感知包装，所有 ProForm/ProField 的时间类字段（date、dateTime、time、fromNow 等）内部都使用 `dayjsTZ`。

```tsx
import { dayjsTZ } from '@fexd/pro-components'

// 替代 dayjs() 使用
const now = dayjsTZ() // 自动应用当前时区

// 设置默认时区（全局生效）
dayjsTZ.setDefault('Etc/GMT-7') // 东七区
dayjsTZ.setDefault('Asia/Jakarta') // 雅加达时区
dayjsTZ.setDefault() // 恢复本地时区

// 时区转换
dayjsTZ('2024-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')
```

**工作原理：**

| 场景             | 不用 dayjsTZ      | 用 dayjsTZ         |
| ---------------- | ----------------- | ------------------ |
| 用户选 2/1       | 传东八区的时间戳  | 传后端时区的时间戳 |
| 后端(东七区)收到 | 识别为 1/31 23:00 | 识别为 2/1 00:00   |
| 用户看到的数据   | 1/31（错误）      | 2/1（正确）        |

**注意事项：**

- `dayjsTZ.setDefault()` 设置后，所有 ProField 时间类字段的输入/展示会自动适配
- 已内置 `utc`、`timezone`、`relativeTime`、`advancedFormat`、`weekOfYear`、`customParseFormat` 插件
- 支持 locale：`zh-cn`、`en`、`id`、`ms-my`

### request — 请求工具

基于 axios + axios-cache-interceptor 的请求封装。详见 [references/request.md](references/request.md)。

```jsx
import { request } from '@fexd/pro-components'

const result = await request.get('/api/users', { params: { page: 1 } })
if (result.success) {
  console.log(result.data)
}
```

### createValueProxy — 值代理

为对象或数组中的值创建 Proxy，在读取属性时拦截并转换。典型用途：**选项数组的 i18n 翻译代理**。

```tsx
import { createValueProxy } from '@fexd/pro-components'

// 基础用法：拦截对象属性读取
const proxied = createValueProxy({ name: '张三', age: 25 }, (value, key) => {
  if (key === 'name') return `[前缀] ${value}`
  return value
})
console.log(proxied.name) // "[前缀] 张三"
console.log(proxied.age) // 25

// 典型模式：选项数组 i18n 翻译代理
function createArrayTranslationProxy(arr, translateKey = 'label') {
  return arr.map((item) =>
    createValueProxy(item, (value, key) => {
      if (key === translateKey) return t(value) ?? value
      return value
    }),
  )
}

// 使用：静态选项定义 + 动态翻译
export const STATUS_OPTIONS = createArrayTranslationProxy([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
])
// 当语言切换时，读取 label 会自动返回翻译后的值
```

**API：**

```typescript
function createValueProxy(target: any, valueHandler: (value: any, prop: string | symbol) => any): Proxy
```

**使用场景：**

- options 选项的 label 动态翻译（无需 useMemo 重建数组）
- 对象属性值的统一格式化处理
- 枚举配置的延迟计算

### coloringOptions — 选项自动染色

为 options 数组中的每个选项自动分配不同的 `tag` 颜色。预置 11 种 antd Tag 颜色（随机打乱），超出时自动生成 RGB 随机色。

```tsx
import { coloringOptions } from '@fexd/pro-components'

// 基础用法：自动给每个选项分配不同颜色
const statusOptions = coloringOptions([
  { label: '待处理', value: 0 },
  { label: '处理中', value: 1 },
  { label: '已完成', value: 2 },
  { label: '已关闭', value: 3 },
])
// 结果：每项自动附加 tag: 'magenta' / 'red' / 'volcano' / ... 等颜色

// 已有 tag 的选项不会被覆盖
const options = coloringOptions([
  { label: '成功', value: 1, tag: 'success' }, // 保持 'success'
  { label: '失败', value: 0 }, // 自动分配颜色
])

// 支持对象格式输入
const options2 = coloringOptions({ 1: '选项A', 2: '选项B', 3: '选项C' })
// 结果：[{ label: '选项A', value: '1', tag: '...' }, ...]
```

**预置色板（11色，随机排列）**：`magenta`、`red`、`volcano`、`orange`、`gold`、`lime`、`green`、`cyan`、`blue`、`geekblue`、`purple`

**典型用途**：

- 状态字段的选项着色（不想手动逐一配色时）
- ProTable 列中自动展示彩色标签
- 与 `useRequest` 配合，异步 options 返回后自动染色

```tsx
// 在 BC 组件中配合异步 options
const statusService = useRequest(async () => {
  const { data } = await apis.getConfig().fetchStatus()
  return coloringOptions(data.map(item => ({ label: item.name, value: item.id })))
})

// ProTable 列直接使用
columns={{
  状态: { label: '状态', name: 'status', type: 'select', options: statusService },
}}
```

### deepMapItem — 深度遍历与转换

递归遍历对象/数组的每个节点，可对其值做变换或过滤：

```tsx
import { deepMapItem } from '@fexd/pro-components'

// 将所有 null 值转为空字符串
const cleaned = deepMapItem(rawData, {
  handleItem: (value, key, keyPath) => (value === null ? '' : value),
})

// 过滤敏感字段（不深入遍历）
const safe = deepMapItem(userData, {
  filterItem: (value, key) => key !== 'password' && key !== 'token',
  handleItem: (value) => value,
})
```

**API：**

```typescript
function deepMapItem(
  object: any,
  options?: {
    handleItem?: (item: any, key: any, keyPath: any[]) => any
    filterItem?: (item: any, key: any, keyPath: any[]) => boolean
    prefixKeys?: any[]
  },
): any
```

### diffArray — 数组差异计算

比较两个数组，算出新增、移除、全部差异：

```tsx
import { diffArray } from '@fexd/pro-components'

const { add, remove, diff } = diffArray(
  [1, 2, 3], // 初始数组
  [2, 3, 4, 5], // 当前数组
)
// add: [4, 5]    — 新增的
// remove: [1]    — 移除的
// diff: [4, 5, 1] — 全部差异
```

典型场景：批量编辑后计算哪些项是新增、哪些被移除，分别调不同接口。

### useRequest 扩展 — promiseRef

`@fexd/pro-components` 的 `useRequest` 基于 ahooks `useRequest` 增强，额外返回：

```tsx
import { useRequest } from '@fexd/pro-components'

const service = useRequest(fetchData)

// 额外属性
service.promiseRef.current // 当前请求的 enhancedPromise（可 await）
service.isUseRequest // 标识符 true（用于 ProTable 内部识别）
```

**`promiseRef` 的作用**：每次 `run()` / `runAsync()` 时自动创建新的 `enhancePromise`，请求完成后自动 resolve/reject。可用于：

```tsx
// 场景：外部等待某次请求完成
const service = useRequest(api.fetchStatus, { manual: true })

async function handleRefreshAndWait() {
  service.run()
  const data = await service.promiseRef.current // 等待本次请求结果
  console.log('请求完成:', data)
}
```

### 常用工具

| 函数                              | 说明                                          |
| --------------------------------- | --------------------------------------------- |
| deepMerge(a, b)                   | 深度合并两个对象                              |
| catchPromise(promise)             | 安全的 Promise 捕获，返回 [error, data]       |
| confirmPromise(fn)                | 需要用户确认的异步流程                        |
| filterObjectEmptyValue(obj)       | 过滤对象中的空值                              |
| coloringOptions(options)          | 选项自动染色（自动分配 tag 颜色）             |
| deepMapItem(obj, options)         | 深度遍历转换对象/数组节点                     |
| diffArray(init, current)          | 数组差异计算（add/remove/diff）               |
| showTipsWithResponse(res)         | 根据 ServerResponse 自动 message/notification |
| closeAll()                        | 关闭所有命令式弹窗                            |
| dayjsTZ                           | 带时区的 dayjs 实例                           |
| createSharedHook(hook)            | 创建跨组件共享的 Hook                         |
| file2base64(file)                 | 文件转 base64                                 |
| obj2formdata(obj)                 | 对象转 FormData                               |
| formdata2obj(formdata)            | FormData 转对象                               |
| createValueProxy(target, handler) | 属性代理（拦截取值并转换）                    |

## i18n

内置国际化支持：

```jsx
import { ConfigProvider } from '@fexd/pro-components'
;<ConfigProvider localeKey="en-US">
  <App />
</ConfigProvider>
```

支持语言：zh-CN、en-US、id-ID、ms_MY、th-TH。
