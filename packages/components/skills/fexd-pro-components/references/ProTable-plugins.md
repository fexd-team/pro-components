---
name: ProTable-plugins
description: ProTable 插件系统完整指南——7 个内置插件详解、插件 API、自定义插件开发
---

# ProTable 插件系统

> ProTable 是插件式架构。内置 7 个插件通过类似 hox 的机制共享上下文，可相互调用。

## 内置插件列表

| 插件名       | 说明                                     | ref 路径                 |
| ------------ | ---------------------------------------- | ------------------------ |
| `config`     | 管理配置（国际化文案、尺寸等）           | `ref.current.config`     |
| `valueType`  | 管理值类型（数据格式、呈现、表单形态）   | `ref.current.valueType`  |
| `queryField` | 管理查询区域与数据源（**最核心**）       | `ref.current.queryField` |
| `actions`    | 注册和管理内置/自定义动作                | `ref.current.actions`    |
| `table`      | 表格呈现、DOM 管理                       | `ref.current.table`      |
| `modal`      | 命令式弹窗（绑定 ProTable 内部 station） | `ref.current.modal`      |
| `editField`  | CRUD 表单（新增/编辑/详情弹窗）          | `ref.current.editField`  |

> **注意**：没有名为 `locale` 的插件。国际化在 `config` 插件中管理。MCP 旧文档中的 "locale 插件" 与源码不一致。

## 访问插件

### 方式 1：通过 useRef

```tsx
import { ProTable, useProTableRef } from '@fexd/pro-components'

const proTableRef = useProTableRef() // 或 ProTable.useRef()

useEffect(() => {
  // 各插件都在 ref.current 上
  proTableRef.current?.config      // 配置
  proTableRef.current?.valueType   // 值类型
  proTableRef.current?.queryField  // 查询与数据
  proTableRef.current?.actions     // 动作
  proTableRef.current?.table       // 表格
  proTableRef.current?.modal       // 弹窗
  proTableRef.current?.editField   // 编辑
}, [])

<ProTable ref={proTableRef} ... />
```

### 方式 2：通过 useController

```tsx
const controller = useProTableController()

controller.refresh()        // queryField.refresh 的包装
controller.showModal(...)   // modal.showModal 的包装
controller.showEditModal(item) // editField.showEditModal 的包装
```

## 各插件详细能力

### config 插件

管理国际化、尺寸等全局配置。

```tsx
// 获取翻译
const text = proTableRef.current?.config.t('actions.add')

// 当前尺寸
const size = proTableRef.current?.config.size

// 修改尺寸
proTableRef.current?.config.setSize('small')
```

### valueType 插件

管理值类型注册表，控制字段的渲染方式。

```tsx
// 获取所有注册的值类型
const types = proTableRef.current?.valueType.types

// 手动渲染字段
const fieldNode = proTableRef.current?.valueType.renderField(fieldConfig)

// 手动渲染列
const columnNode = proTableRef.current?.valueType.renderColumn(columnConfig)
```

### queryField 插件（最常用）

管理查询表单、数据源、分页、选中状态等。详见 [ProTable-ref](./ProTable-ref.md#refcurrentqueryfield最常用)。

```tsx
const qf = proTableRef.current?.queryField

qf.hasQueryFields // 是否有查询表单
qf.form // 查询表单 form 实例
qf.loading // 请求中状态
qf.dataSource // 当前数据
qf.paginationParams // 分页参数
qf.selectedItems // 选中行

qf.refresh() // 刷新
qf.search(params) // 搜索
qf.setPaginationParams(params) // 设置分页
qf.getPaginationParams() // 获取分页（穿透闭包）
qf.setSelectedItems(items) // 设置选中
qf.getSelectedItems() // 获取选中（穿透闭包）
qf.getQueryingParams() // 当前查询参数
qf.setExtraParams(params) // 设置额外参数
qf.service // useRequest 实例
```

### actions 插件

管理四类动作的注册和渲染。

```tsx
const act = proTableRef.current?.actions

act.builtInActions       // 内置动作注册表
act.hasColumnsActions    // 是否有列动作
act.setTableActions([...])  // 动态设置
act.setColumnActions([...])
```

### table 插件

管理表格 DOM 和渲染。

```tsx
const tbl = proTableRef.current?.table

tbl.tableRef.antdTableRef // antd Table 原始 ref
tbl.tableRef.tableWrapperDomRef // 表格包裹器 DOM
tbl.tableRef.tableToolbarDomRef // 工具栏 DOM
tbl.tableRef.tableContentDomRef // 内容区 DOM
tbl.tableRef.tableColumnsRef // 列配置 ref
```

### modal 插件

命令式弹窗，自动绑定 ProTable 内部的 ModalStation。

```tsx
const mod = proTableRef.current?.modal

// 弹窗
mod.showModal({
  title: '自定义弹窗',
  content: <div>弹窗内容</div>,
})

// 抽屉
mod.showDrawer({
  title: '自定义抽屉',
  content: <div>抽屉内容</div>,
})

// 确认
mod
  .confirmPromise({
    title: '确认',
    content: '确定执行此操作？',
  })
  .then(() => {
    // 确认
  })
  .catch(() => {
    // 取消
  })
```

### editField 插件

管理新增/编辑/详情弹窗。

```tsx
const ef = proTableRef.current?.editField

// 弹出新增弹窗
ef.showAddModal()

// 弹出编辑弹窗
ef.showEditModal(item)

// 自定义弹窗配置
ef.showEditModal(item, { title: '自定义标题', width: 800 })

// 弹窗控制器
ef.modalController.close()     // 关闭弹窗
ef.modalController.promise     // 弹窗 Promise
ef.modalController.update(...) // 更新弹窗

// 内部表单
ef.editFieldRef.form           // 编辑表单 form 实例
ef.editFieldRef.proFormRef     // ProForm ref
ef.editFieldRef.submit()       // 提交
ef.editFieldRef.cancel()       // 取消
```

## 自定义插件开发

使用 `createPlugin` / `createProTablePlugin` 创建自定义插件，然后通过 `createProTable` 注入。

### 创建插件

```tsx
import { createProTablePlugin, createProTable, builtInPlugins } from '@fexd/pro-components'

const usePollingPlugin = createProTablePlugin(function usePolling() {
  const controller = useProTableController()
  const [interval, setInterval] = useState(0)

  useEffect(() => {
    if (interval <= 0) return
    const timer = setInterval(() => controller.refresh(), interval)
    return () => clearInterval(timer)
  }, [interval])

  return {
    startPolling: (ms: number) => setInterval(ms),
    stopPolling: () => setInterval(0),
    isPolling: interval > 0,
  }
}, 'polling') // 插件名称，会成为 ref.current.polling
```

### 注入插件

```tsx
const MyProTable = createProTable(
  builtInPlugins.add(usePollingPlugin)
)

// 使用
const ref = ProTable.useRef()
ref.current?.polling?.startPolling(5000)

<MyProTable ref={ref} ... />
```

### 插件间通信

插件通过类似 hox 的共享上下文机制通信。`TableWrapper` 中的 `sharedContext.Provider` 限定只有当前 plugins 列表内的 hook 能收到上下文。

```tsx
const useMyPlugin = createProTablePlugin(function useMyPlugin() {
  // 可以调用其他插件
  const queryField = useProTableQueryFieldPlugin()
  const modal = useProTableModalPlugin()

  return {
    doSomething: () => {
      const params = queryField.getQueryingParams()
      modal.showModal({
        title: '参数详情',
        content: JSON.stringify(params),
      })
    },
  }
}, 'myPlugin')
```

## 扩展 Table

`ProTable` 通过 `hoist-non-react-statics` 继承了 antd `Table` 的静态成员。同时 `ProTableProps` 继承了 `Omit<TableProps, 'title' | 'locale' | 'sticky' | 'rowSelection' | 'columns'>` —— 即大部分 antd Table 的 props 可直接使用。

被重写/扩展的 props：

- `title`：改为 `string | ReactNode`
- `locale`：扩展为包含 actions/editField/queryField/modal/table/valueType 的完整文案结构
- `sticky`：扩展支持 `{ offsetBottom? }`
- `rowSelection`：扩展增加 `rowClickable` / `toggleRowSelectionByClick`
- `columns`：扩展为 `ProTableColumnType[]` 或对象格式
