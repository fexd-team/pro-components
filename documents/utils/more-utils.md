---
title: 更多工具
order: 11
---

# 更多工具函数与组件

项目中常用的辅助工具函数和小型组件。

---

## closeAll — 关闭所有弹窗

<code src="./demos/closeAll-demo.tsx"></code>

关闭所有通过 `showModal` / `showDrawer` 打开的命令式弹窗，同时销毁 antd 的 `Modal.destroyAll()` 和 `message.destroy()`。

```tsx | pure
import { closeAll } from '@fexd/pro-components'

// 路由跳转时清理所有弹窗
router.beforeEach(() => {
  closeAll()
})
```

---

## Actions — 操作按钮组

<code src="./demos/actions-group-demo.tsx"></code>

基于 `Space` 渲染一组 `Action`，支持配置数组、共享 loading、内置动作映射。

```tsx | pure
import { Actions } from '@fexd/pro-components'
;<Actions
  configs={[
    { children: '编辑', onClick: handleEdit },
    { children: '删除', danger: true, onClick: handleDelete, confirm: '确认删除？' },
    { builtIn: 'view' },
  ]}
  shareAutoLoading
  spaceSize="small"
/>
```

### API

| 属性              | 说明                                         | 类型                                     |
| ----------------- | -------------------------------------------- | ---------------------------------------- |
| configs           | 按钮配置数组或生成函数                       | ActionConfig[] \| (() => ActionConfig[]) |
| shareAutoLoading  | 共享 loading（一个 loading 时其余 disabled） | boolean                                  |
| noWrapper         | 不包裹 Space                                 | boolean                                  |
| spaceSize         | Space 间距                                   | SpaceProps\['size'\]                     |
| renderAction      | 自定义渲染每个 Action                        | (config) => ReactNode                    |
| actionParams      | 传递给 configs 函数的参数                    | any\[\]                                  |
| getBuiltInActions | 内置动作映射表                               | () => Record\<string, ActionConfig\>     |

### 动态配置（表格操作列）

```tsx | pure
<Actions
  configs={(record) =>
    [
      { children: '审批', onClick: () => handleApprove(record) },
      record.status === 'draft' && { children: '编辑', onClick: () => handleEdit(record) },
    ].filter(Boolean)
  }
/>
```

---

## DropdownButton — 下拉按钮

增强的 `Dropdown.Button`，继承 Action 的自动 loading：

```tsx | pure
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

---

## createValueProxy — 值代理

为对象属性读取创建 Proxy，拦截并转换值。典型用途：选项数组的 i18n 翻译代理。

```tsx | pure
import { createValueProxy } from '@fexd/pro-components'

// 属性拦截
const proxied = createValueProxy({ name: '张三', age: 25 }, (value, key) =>
  key === 'name' ? `[前缀] ${value}` : value,
)
proxied.name // "[前缀] 张三"
proxied.age // 25

// i18n 翻译代理（无需 useMemo 重建）
const STATUS_OPTIONS = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
].map((item) => createValueProxy(item, (value, key) => (key === 'label' ? (t(value) ?? value) : value)))
```

---

## coloringOptions — 选项自动染色

<code src="./demos/coloringOptions-demo.tsx"></code>

为 options 数组自动分配 antd Tag 颜色。预置 11 种颜色，超出自动生成随机色。

```tsx | pure
import { coloringOptions } from '@fexd/pro-components'

const statusOptions = coloringOptions([
  { label: '待处理', value: 0 },
  { label: '处理中', value: 1 },
  { label: '已完成', value: 2 },
])
// 每项自动附加 tag: 'magenta' / 'red' / 'volcano' / ...

// 也支持对象格式
coloringOptions({ 1: '选项A', 2: '选项B' })
```

---

## showTipsWithResponse — 响应自动提示

根据 `ServerResponse` 格式自动显示 `message` 或 `notification`：

```tsx | pure
import { showTipsWithResponse } from '@fexd/pro-components'

const res = await request.post('/api/users', data)
showTipsWithResponse(res)
// res.success=true + res.message='创建成功' → message.success('创建成功')
// res.success=false + res.message='参数错误' → message.error('参数错误')
```

---

## deepMerge — 深度合并

<code src="./demos/deepMerge-demo.tsx"></code>

深度合并两个对象，支持循环引用检测（使用 WeakSet）。

```tsx | pure
import { deepMerge } from '@fexd/pro-components'

const merged = deepMerge({ a: 1, nested: { x: 10 } }, { b: 2, nested: { y: 20 } })
// { a: 1, b: 2, nested: { x: 10, y: 20 } }
```

---

## deepMapItem — 深度遍历转换

递归遍历对象/数组的每个节点，可对值做变换或过滤：

```tsx | pure
import { deepMapItem } from '@fexd/pro-components'

const cleaned = deepMapItem(rawData, {
  handleItem: (value, key, keyPath) => (value === null ? '' : value),
})
```

---

## diffArray — 数组差异计算

比较两个数组，算出新增、移除、全部差异：

```tsx | pure
import { diffArray } from '@fexd/pro-components'

const { add, remove, diff } = diffArray([1, 2, 3], [2, 3, 4, 5])
// add: [4, 5], remove: [1], diff: [4, 5, 1]
```

---

## 其他常用工具

| 函数                        | 说明                                         |
| --------------------------- | -------------------------------------------- |
| catchPromise(promise)       | 安全 Promise 捕获，返回 \[error, data\] 元组 |
| filterObjectEmptyValue(obj) | 过滤对象中的空值                             |
| file2base64(file)           | 文件转 base64                                |
| obj2formdata(obj)           | 对象转 FormData                              |
| formdata2obj(formdata)      | FormData 转对象                              |
| createSharedHook(hook)      | 创建跨组件共享的 Hook                        |
| useGetLatest(value)         | 始终获取最新值的 ref                         |
| useThrottle(value, delay)   | 节流 Hook                                    |
| useForceUpdate()            | 强制重渲染                                   |
| usePreferredDark()          | 检测系统暗色模式                             |
