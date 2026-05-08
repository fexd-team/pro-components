---
name: ProTable-actions
description: ProTable 四类动作完整指南——内置/自定义/修改内置/菜单/Switch/函数式动作
---

# ProTable 动作系统

> 由 `actions` 插件管理。表格动作分为 4 类。

## 四类动作

| 类型     | 属性名          | 位置       | 说明                           |
| -------- | --------------- | ---------- | ------------------------------ |
| 表格动作 | `actions`       | 标题栏右侧 | 全局操作按钮（如新增）         |
| 图标动作 | `iconActions`   | 表格右上角 | 图标按钮（如刷新、密度、全屏） |
| 行动作   | `columnActions` | 每行操作列 | 针对单条数据的操作             |
| 批量动作 | `batchActions`  | 选中后出现 | 针对选中数据的批量操作         |

## Props

| 属性                | 说明                       | 类型                                                    | 默认值  |
| ------------------- | -------------------------- | ------------------------------------------------------- | ------- |
| actions             | 表格动作配置               | `(string \| ActionConfig)[]`                            | -       |
| iconActions         | 图标动作配置               | `(string \| ActionConfig)[]`                            | -       |
| columnActions       | 行动作配置                 | `(string \| ActionConfig \| (item) => ActionConfig)[]`  | -       |
| batchActions        | 批量动作配置               | `(string \| ActionConfig \| (items) => ActionConfig)[]` | -       |
| fixColumnActions    | 固定动作列到右侧           | `boolean`                                               | -       |
| selectable          | 启用行选择（批量动作需要） | `boolean`                                               | `false` |
| columnActionsConfig | 动作列配置（width 等）     | `object`                                                | -       |
| builtInActions      | 覆盖内置动作注册表（高级） | `object`                                                | -       |

## 内置动作标识

| 类型          | 标识         | 说明     |
| ------------- | ------------ | -------- |
| actions       | `add`        | 新增按钮 |
| iconActions   | `refresh`    | 刷新     |
| iconActions   | `table-size` | 密度切换 |
| iconActions   | `fullscreen` | 全屏     |
| iconActions   | `search`     | 搜索切换 |
| iconActions   | `settings`   | 列设置   |
| columnActions | `view`       | 查看详情 |
| columnActions | `edit`       | 弹窗编辑 |
| columnActions | `edit-icon`  | 编辑图标 |
| columnActions | `table-edit` | 行内编辑 |
| columnActions | `delete`     | 删除     |
| batchActions  | `delete`     | 批量删除 |

## 使用内置动作

```tsx
<ProTable
  actions={['add']}
  iconActions={['refresh', 'table-size', 'fullscreen']}
  columnActions={['view', 'edit', 'delete']}
  selectable
  batchActions={['delete']}
  ...
/>
```

> `batchActions` 需配合 `selectable` 使用，仅在选中数据后才出现。

## 修改内置动作

通过 `builtIn` 字段选择要修改的内置动作，可覆盖任意属性（包括 onClick）：

```tsx
actions={[
  {
    builtIn: 'add',
    icon: null,                  // 取消 icon
    content: '创建新数据',        // 修改按钮文字
    type: 'dashed',              // 修改按钮样式
  },
]}

columnActions={[
  {
    builtIn: 'edit',
    content: '修改',             // 自定义文字
  },
  {
    builtIn: 'delete',
    confirm: '确定要删除此记录吗？', // 自定义确认文案
  },
]}
```

## 自定义动作

```tsx
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'

actions={[
  'add', // 内置
  {
    icon: <DownloadOutlined />,
    content: '导出数据',
    tooltip: '导出为 Excel',
    async onClick() {
      await exportData()
    },
  },
  {
    icon: <PlusOutlined />,
    content: '带确认',
    confirm: '确定执行此操作？',
    async onClick() {
      await doSomething()
    },
  },
]}
```

> 异步 `onClick` 自动管理 loading 状态。带 `confirm` 时 loading 位置不同。

## 动作菜单（更多/下拉）

通过 `menu` 配置下拉菜单：

```tsx
actions={[
  {
    content: '更多操作',
    async onClick() {
      // 按钮本身也可点击
    },
    menu: [
      {
        label: '导入',
        onClick() { message.info('导入') },
      },
      {
        label: '导出',
        onClick() { message.info('导出') },
      },
      {
        label: '禁用项',
        disabled: true,
      },
    ],
  },
  {
    // 只有 menu 没有主按钮
    menu: [
      { label: '子按钮1', onClick() { ... } },
      { label: '子按钮2', disabled: true },
    ],
  },
]}
```

## 行动作获取 item（函数式）

`columnActions` 支持函数形式，函数接收当前行 `item`：

```tsx
columnActions={[
  'view',
  'edit',
  (item) => ({
    content: '审批',
    tooltip: `审批 ${item.name}`,
    confirm: `确认审批 ${item.name}？`,
    disabled: item.status !== 'pending',
    async onClick() {
      await api.approve(item.id)
    },
  }),
  (item) => (item.canDelete ? {
    content: '删除',
    confirm: '确认删除？',
    async onClick() { await api.delete(item.id) },
  } : null), // 返回 null/undefined 不显示
]}
```

## 自定义批量删除确认

内置 `batchActions: ['delete']` 自带默认确认框。如需自定义确认文案：

```tsx
batchActions={[
  {
    builtIn: 'delete',
    confirm: '确定要删除选中的数据吗？此操作不可撤销。',
  },
]}
```

## 批量动作获取 items（函数式）

`batchActions` 支持函数形式，函数接收选中的 `items` 数组：

```tsx
batchActions={[
  'delete',
  (items) => ({
    content: `批量导出 ${items.length} 条`,
    async onClick() {
      await api.batchExport(items.map(i => i.id))
    },
  }),
]}
```

## Switch 动作

通过 `actionType: 'switch'` 切换为开关动作（属性传给 antd Switch）：

```tsx
columnActions={[
  {
    actionType: 'switch',
    checkedChildren: '开启',
    unCheckedChildren: '关闭',
    tooltip: '切换状态',
    confirm: '确认切换？',
    async onClick(checked, item) {
      await api.toggleStatus(item.id, checked)
    },
  },
]}
```

## 通过 ref 动态操作

```tsx
const proTableRef = ProTable.useRef()

// 获取内置动作注册表
proTableRef.current?.actions.builtInActions

// 动态设置动作
proTableRef.current?.actions.setTableActions([...])
proTableRef.current?.actions.setIconActions([...])
proTableRef.current?.actions.setColumnActions([...])
proTableRef.current?.actions.setBatchActions([...])
```
