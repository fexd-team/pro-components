---
name: ProTable-ref
description: ProTable Ref 方法、静态方法、useController、插件 ref 完整结构
---

# ProTable Ref 与静态方法

## 获取 Ref 的三种方式

### 1. ProTable.useRef() / useProTableRef()

返回一个 ref 对象，**按插件名分组**，包含所有内置插件的完整能力。

```tsx
import { ProTable, useProTableRef } from '@fexd/pro-components'

const MyPage = () => {
  const proTableRef = useProTableRef() // 或 ProTable.useRef()

  useEffect(() => {
    // ref 按插件名分组
    console.log(proTableRef.current?.config)
    console.log(proTableRef.current?.queryField)
    console.log(proTableRef.current?.actions)
    console.log(proTableRef.current?.table)
    console.log(proTableRef.current?.modal)
    console.log(proTableRef.current?.editField)
    console.log(proTableRef.current?.valueType)
  }, [])

  return <ProTable ref={proTableRef} ... />
}
```

### 2. ProTable.useController() / useProTableController()

封装了 useRef 的常用方法，提供**扁平化**的 API（必须在 ProTable 内部的组件中使用）。

```tsx
import { ProTable, useProTableController } from '@fexd/pro-components'

const ToolbarButton = () => {
  const controller = useProTableController() // 或 ProTable.useController()

  return <button onClick={() => controller.refresh()}>刷新</button>
}
```

### 3. ProTable.createRef() / createProTableRef()

不在 React 组件中时创建 ref（如工具函数）。

```tsx
import { ProTable, createProTableRef } from '@fexd/pro-components'

const tableRef = createProTableRef()
// 用法同 useRef，但不依赖 Hook 上下文
```

## Ref 完整结构（按插件分组）

`ref.current` 是一个对象，key 为插件名，value 为该插件暴露的能力：

### ref.current.config

| 属性/方法                  | 说明           |
| -------------------------- | -------------- |
| size                       | 当前表格尺寸   |
| setSize                    | 设置表格尺寸   |
| getTranslatedText / t      | 获取国际化文案 |
| localeKey                  | 当前语言 key   |
| scopeI18n                  | 作用域国际化   |
| i18nT / withI18n / useI18n | 国际化工具集   |
| FormattedMessage           | 格式化消息组件 |
| useTranslation             | 翻译 hook      |

### ref.current.valueType

| 属性/方法                      | 说明               |
| ------------------------------ | ------------------ |
| types                          | 完整的值类型注册表 |
| renderField(field, config?)    | 渲染单个字段       |
| renderColumn(column, options?) | 渲染单个列         |

### ref.current.queryField（最常用）

| 属性/方法                       | 说明                            |
| ------------------------------- | ------------------------------- |
| hasQueryFields                  | 是否配置了查询表单              |
| form                            | 查询表单的 form 实例            |
| proFormRef                      | 查询区 ProForm 的 ref           |
| loading                         | 请求中状态                      |
| dataSource                      | 当前数据集                      |
| mockDataSource                  | 模拟数据集                      |
| isSearched                      | 是否已搜索过                    |
| paginationParams                | 当前分页参数                    |
| selectedItems                   | 选中的行                        |
| **setPaginationParams(params)** | 设置分页参数                    |
| **getPaginationParams()**       | 获取分页参数（穿透闭包）        |
| **setSelectedItems(items)**     | 设置选中行                      |
| **getSelectedItems()**          | 获取选中行（穿透闭包）          |
| **getQueryingParams()**         | 获取当前使用中的查询参数        |
| **getQueryingExtraParams()**    | 获取额外查询参数（排序/筛选等） |
| **setExtraParams(params)**      | 设置额外参数                    |
| **getQueryParams()**            | 获取完整查询参数                |
| **normalizeFormValues(values)** | 归一化表单值                    |
| **refresh(params?)**            | 刷新请求（携带当前参数）        |
| **search(params?)**             | 触发搜索，可指定参数            |
| service                         | useRequest 返回的服务实例       |
| getService()                    | 获取 service（穿透闭包）        |
| render                          | 渲染查询区（内部用）            |
| renderAutoQueryTrigger          | 自动查询触发钩子（内部用）      |
| createMockDataSource            | 创建模拟数据集                  |
| updateMockDataSource            | 更新模拟数据集                  |

### ref.current.actions

| 属性/方法            | 说明                                          |
| -------------------- | --------------------------------------------- |
| builtInActions       | 聚合的内置动作 Map（table/icon/batch/column） |
| setTableActions      | 设置表格动作                                  |
| setIconActions       | 设置图标动作                                  |
| setBatchActions      | 设置批量动作                                  |
| setColumnActions     | 设置列动作                                    |
| renderTableActions   | 渲染表格动作                                  |
| renderIconActions    | 渲染图标动作                                  |
| renderBatchActions   | 渲染批量动作                                  |
| renderColumnsActions | 渲染列动作                                    |
| hasColumnsActions    | 是否有列动作                                  |
| hasColumnActions     | 是否有单条动作                                |

### ref.current.table

| 属性/方法                   | 说明                    |
| --------------------------- | ----------------------- |
| tableRef                    | 包含多个 DOM ref 的对象 |
| tableRef.tableWrapperDomRef | 表格包裹器 DOM ref      |
| tableRef.tableToolbarDomRef | 工具栏 DOM ref          |
| tableRef.tableContentDomRef | 表格内容 DOM ref        |
| tableRef.antdTableRef       | antd Table ref          |
| tableRef.tableColumnsRef    | 列配置 ref              |
| render                      | 渲染表格主体（内部用）  |

### ref.current.modal

| 属性/方法                  | 说明                               |
| -------------------------- | ---------------------------------- |
| stationId                  | 弹窗站 ID                          |
| **showModal(config)**      | 命令式唤起弹窗（绑定内部 station） |
| **showDrawer(config)**     | 命令式唤起抽屉（绑定内部 station） |
| **confirmPromise(config)** | 命令式确认（返回 Promise）         |
| modalStationRef            | 弹窗站 ref                         |
| renderStation              | 渲染弹窗站（内部用）               |

### ref.current.editField

| 属性/方法                              | 说明                                                      |
| -------------------------------------- | --------------------------------------------------------- |
| **showAddModal(customConfig?)**        | 命令式弹出新增弹窗                                        |
| **showEditModal(item, customConfig?)** | 命令式弹出编辑弹窗                                        |
| modalController                        | 弹窗控制器（close / promise / update）                    |
| editFieldRef                           | 内部 EditField ref（submit / cancel / proFormRef / form） |

## useController 扁平化 API

`useProTableController()` 在 `useRef` 基础上包装了常用操作：

```tsx
const controller = useProTableController()

// 查询与刷新
controller.refresh()                   // 携带当前参数刷新
controller.search(params)              // 指定参数搜索

// 数据
controller.getDataSource()             // 获取当前数据集
controller.getMockDataSource()         // 获取模拟数据集

// 分页
controller.setPaginationParams(params) // 设置分页
controller.getPaginationParams()       // 获取分页（穿透闭包）

// 选中
controller.setSelectedItems(items)     // 设置选中行
controller.getSelectedItems()          // 获取选中行

// 查询参数
controller.getQueryingParams()         // 当前查询参数
controller.getQueryingExtraParams()    // 额外参数（排序等）
controller.setExtraParams(params)      // 设置额外参数

// 弹窗
controller.showModal(config)           // 命令式弹窗
controller.showDrawer(config)          // 命令式抽屉
controller.confirmPromise(config)      // 命令式确认

// CRUD
controller.showAddModal(config?)       // 弹出新增
controller.showEditModal(item, config?)// 弹出编辑

// Mock
controller.createMockDataSource()
controller.updateMockDataSource()

// ref 本身
controller.ref                         // 原始 ref
```

## 静态方法一览

`ProTable` 组件上挂载的所有静态方法：

| 静态方法                                | 说明                                                        |
| --------------------------------------- | ----------------------------------------------------------- |
| `ProTable.useRef()`                     | 创建 ref Hook（返回完整插件 ref）                           |
| `ProTable.createRef()`                  | 非 Hook 方式创建 ref                                        |
| `ProTable.useController()`              | 创建控制器 Hook（扁平化 API）                               |
| `ProTable.setDefaultProps(props)`       | 全局修改默认 props                                          |
| `ProTable.useProps`                     | 获取合并后的 props（内部用）                                |
| `ProTable.defineColumns(config)`        | 对象格式定义列                                              |
| `ProTable.defineColumn(config)`         | 定义单列                                                    |
| `ProTable.defineFields(config)`         | 对象格式定义字段                                            |
| `ProTable.defineField(config)`          | 定义单字段                                                  |
| `ProTable.extendColumn(base, override)` | 继承并扩展列配置                                            |
| `ProTable.extendField(base, override)`  | 继承并扩展字段配置                                          |
| `ProTable.defineCoverableProps(config)` | Coverable props 定义                                        |
| `ProTable.useCoverableProps(config)`    | Coverable props Hook（自动保护 `ref`/`tableRef`/`formRef`） |
| `ProTable.useItem`                      | 获取当前行 item                                             |
| `ProTable.useFieldParams`               | 获取字段参数                                                |
| `ProTable.useColumnConfig`              | 获取列配置                                                  |

### 内置插件 Hook（高级用法）

| 静态方法                       | 说明              |
| ------------------------------ | ----------------- |
| `ProTable.useQueryFieldPlugin` | 查询字段插件 Hook |
| `ProTable.useActionsPlugin`    | 动作插件 Hook     |
| `ProTable.useTablePlugin`      | 表格插件 Hook     |
| `ProTable.useEditFieldPlugin`  | 编辑字段插件 Hook |
| `ProTable.useValueTypePlugin`  | 值类型插件 Hook   |
| `ProTable.useModalPlugin`      | 弹窗插件 Hook     |
| `ProTable.useConfigPlugin`     | 配置插件 Hook     |

## 使用场景示例

### 外部控制刷新

```tsx
const proTableRef = ProTable.useRef()

<Button onClick={() => proTableRef.current?.queryField.refresh()}>刷新</Button>
<ProTable ref={proTableRef} ... />
```

### 获取选中行并批量操作

```tsx
const controller = ProTable.useController()

const handleBatchExport = async () => {
  const items = controller.getSelectedItems()
  if (items.length === 0) return message.warning('请先选择数据')
  await api.exportUsers(items.map((i) => i.id))
}
```

### 命令式弹出编辑

```tsx
const controller = ProTable.useController()

<Button onClick={() => controller.showEditModal(someItem, {
  title: '自定义标题',
  width: 800,
})}>
  编辑指定项
</Button>
```

### 设置额外查询参数

```tsx
const controller = ProTable.useController()

// 当外部状态变化时，将额外参数传入查询
useEffect(() => {
  controller.setExtraParams({ orgId: currentOrgId })
  controller.refresh()
}, [currentOrgId])
```

### 在 coverable 组件中安全使用 ref

`ProTable.useCoverableProps` 会自动提取 `ref` / `tableRef`，使其绕过 coverable 的 clone/merge 链路。

```tsx
const CoverableUserTable = useCoverable.component((props, ref) => {
  const tableRef = ProTable.useRef()
  const tableProps = ProTable.useCoverableProps({
    ref: tableRef,         // ✅ 安全：自动提取，不经过 cloneDeep
    title: '用户列表',
    columns: [{ title: '名称', dataIndex: 'name' }],
    onQuery: async (params) => { /* ... */ },
  })

  return useCoverable.props({ tableProps }).render(() => (
    <div>
      <Button onClick={() => tableRef.current?.queryField.refresh()}>刷新</Button>
      <ProTable {...tableProps.getProps()} />
    </div>
  ))
})

// 父组件可通过 coverable 覆盖 ref（方案 1 自动保护覆盖路径上的 ref）
<CoverableUserTable coverable={{ tableProps: { ref: parentRef } }} />
```
