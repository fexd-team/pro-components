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
| `ProTable.defineColumns(config)`        | 对象格式定义列（返回增强对象，见下文）                      |
| `ProTable.defineColumn(config)`         | 定义单列                                                    |
| `ProTable.defineFields(config)`         | 对象格式定义字段（返回增强对象，见下文）                    |
| `ProTable.defineField(config)`          | 定义单字段                                                  |
| `ProTable.extendColumn(base, override)` | 继承并扩展列配置                                            |
| `ProTable.extendField(base, override)`  | 继承并扩展字段配置                                          |
| `ProTable.defineCoverableProps(config)` | Coverable props 定义                                        |
| `ProTable.useCoverableProps(config)`    | Coverable props Hook（自动保护 `ref`/`tableRef`/`formRef`） |
| `ProTable.useItem`                      | 获取当前行 item                                             |
| `ProTable.useFieldParams`               | 获取字段参数                                                |
| `ProTable.useColumnConfig`              | 获取列配置                                                  |

### defineColumns / defineFields — 对象格式定义与按 key 引用

#### 三大核心价值

1. **按 key 直接引用字段** — 在 `renderModalEditFields` 自定义布局中，通过 `config.fields.xxx.name` 引用字段名
2. **对象格式 + coverable** — 使 deepMerge 可按 key 精确覆盖
3. **`defineColumn()` 支持 Hooks** — 单列定义中可以使用 `useRequest` 等

#### 用法一：defineFields + renderModalEditFields 自定义布局（最常见）

将表单字段分组定义，在自定义弹窗布局中按 key 引用字段名，配合 `renderFields` 二维数组实现精确布局：

```tsx
const config = useConfigurable(() => ({
  // 定义多个字段组
  basicInfoFields: ProTable.defineFields({
    编号: { label: t('编号'), name: 'letter_no', mode: 'view' },
    分类: { label: t('分类'), name: 'classification', type: 'select', options: classOptions },
    重要性: { label: t('重要性'), name: 'importance', type: 'select', options: importanceOptions },
    创建日期: { label: t('创建日期'), name: 'create_date', type: 'dateTime', mode: 'view' },
    主题: { label: t('主题'), name: 'subject', type: 'textarea', mode: 'view' },
    备注: { label: t('备注'), name: 'note', type: 'textarea', mode: 'view' },
  }),
  actionPlanFields: ProTable.defineFields({
    计划ID: { label: t('计划ID'), name: 'plan_id', mode: 'view' },
    预计完工: { label: t('预计完工'), name: 'due_date', type: 'date' },
    状态: { label: t('状态'), name: 'status', type: 'select', options: statusOptions },
    描述: { label: t('描述'), name: 'description', type: 'textarea' },
  }),
  columns: ProTable.defineColumns({ /* ... */ }),
}))

// ProTable 中使用
<ProTable
  columns={config.columns.getConfigs()}
  editFields={config.basicInfoFields.getConfigs()}  // 整组作为数组
  viewFields={config.basicInfoFields.getConfigs()}
  renderModalEditFields={({ renderFields, mode, item }) => (
    <div className="flex flex-col gap-4">
      <Card title={t('基本信息')}>
        {/* ✅ 关键用法：通过 key 引用字段名，配合 freeLayout 二维数组布局 */}
        {renderFields([
          [config.basicInfoFields.编号.name, config.basicInfoFields.分类.name, config.basicInfoFields.重要性.name],
          [config.basicInfoFields.创建日期.name],
          [config.basicInfoFields.主题.name],
          [config.basicInfoFields.备注.name],
        ])}
      </Card>
      <Card title={t('行动计划')}>
        {renderFields([
          [config.actionPlanFields.计划ID.name, config.actionPlanFields.预计完工.name, config.actionPlanFields.状态.name],
          [config.actionPlanFields.描述.name],
        ])}
      </Card>
    </div>
  )}
/>
```

**为什么不直接写字符串 `'letter_no'`？**

因为在 coverable/configurable 场景下，消费方可能覆盖字段的 `name`：

```tsx
// 消费方覆盖字段 name（对接不同后端接口）
<MyComponent
  configurable={{
    basicInfoFields: {
      编号: { name: 'inquiry_no' }, // 改了 name
    },
  }}
/>
```

通过 `config.basicInfoFields.编号.name` 引用，可以动态获取到覆盖后的值。

#### 用法二：defineColumns + coverable 覆盖列

```tsx
const config = useConfigurable(() => ({
  columns: ProTable.defineColumns({
    订单类型: ProTable.defineColumn(() => {
      const options = useRequest(async () => await apis.fetchOrderTypes())
      return {
        label: t('订单类型'),
        name: 'order_type',
        type: 'select',
        options,
        queryField: { props: { allowClear: false } },
      }
    }),
    审核状态: {
      label: t('审核状态'),
      name: 'check_status',
      type: 'select',
      options: statusService,
      queryField: { placeholder: '全部' },
    },
  }),
}))

<ProTable columns={config.columns.getConfigs()} />

// 消费方按 key 覆盖
<OrderQuery configurable={{ columns: { 订单类型: { options: customOpts } } }} />
```

#### defineColumn — 单列 Hook 容器

```tsx
// ✅ defineColumn 内可使用 Hooks
columns: {
  状态: ProTable.defineColumn(() => {
    const options = useRequest(fetchStatus)
    return { label: '状态', name: 'status', options }
  }),
}
```

#### getter 方法

| 方法                                   | 返回值   | 使用频率                                     |
| -------------------------------------- | -------- | -------------------------------------------- |
| `getConfigs()`                         | 数组     | ⭐⭐⭐ — 传给 ProTable / editFields          |
| `config.xxx.name`                      | 字段名   | ⭐⭐⭐ — renderModalEditFields 中按 key 引用 |
| `getRawConfig()`                       | 原始对象 | 偶尔                                         |
| `getQueryFields()` / `getEditFields()` | Record   | 极少（ProTable 内部自动处理）                |

#### extendColumn / extendField — 跨组继承字段配置

从已有的列或字段配置中提取公共属性（label、name、type、options 等），用于在另一个字段集中继承复用：

```tsx
const { defineColumns, defineFields, extendColumn, extendField } = ProTable

// 1. 定义表格列
const columns = defineColumns({
  推送ID: { label: t('推送ID'), name: 'pushId', width: 190, copyable: true, expandView: true },
  推送标题: { label: t('推送标题'), name: 'title', width: 200 },
  推送状态: { label: t('推送状态'), name: 'status', type: 'select', options: statusOpts },
  推送时间: { label: t('推送时间'), name: 'pushTime', type: 'dateTime', width: 160 },
  创建人: { label: t('创建人'), name: 'oprName', type: 'select', width: 100 },
})

// 2. 定义查询字段 — 可覆盖 name/type
const queryFields = defineFields({
  推送ID: { ...extendColumn(columns.推送ID), name: 'id' },
  推送标题: { ...extendColumn(columns.推送标题), name: 'pushTitle' },
  推送状态: { ...extendColumn(columns.推送状态), name: ['extend', 'statusSwitch'], placeholder: '全部' },
  推送时间: { ...extendColumn(columns.推送时间), type: 'dateTimeRange' },
  创建人: { ...extendColumn(columns.创建人), name: ['extend', 'oprName'] },
})

// 3. 定义详情字段 — 继承列配置，可加 renderView
const viewFields = defineFields({
  推送ID: extendColumn(columns.推送ID),
  推送标题: extendColumn(columns.推送标题),
  推送状态: { ...extendColumn(columns.推送状态), label: t('推送状态') },
  推送时间: extendColumn(columns.推送时间),
  创建人: extendColumn(columns.创建人),
})

// 4. 定义新增字段 — 继承 + 扩展（required、rules、placeholder）
const addFields = defineFields({
  推送标题: {
    ...extendField(queryFields.推送标题),
    required: true,
    placeholder: t('不超过60个字符'),
    rules: [{ max: 60, message: t('不超过60个字符') }],
  },
  推送时间: {
    ...extendColumn(columns.推送时间),
    type: 'radio',
    required: true,
    name: 'pushType.type',
  },
  短信内容: {
    ...extendField(viewFields.短信内容),
    type: 'textarea',
    required: true,
  },
})
```

**`extendColumn` 提取的属性**：`label`、`name`、`type`、`options`、`tooltip`、`format`、`unit`、`copyable`、`lazyRender` 等（过滤掉 undefined 的）

**`extendField` 行为**：直接 pickBy 过滤 undefined，返回干净的字段配置副本

**使用场景**：

- **列 → 查询字段**：表格列的 label/type/options 与查询表单基本一致，只需改 name
- **列 → 详情字段**：展开详情或 view 模式复用列配置
- **查询/详情 → 新增字段**：在已有字段配置上追加 required、rules
- **一处改动全局生效**：修改 `columns.推送ID` 的 label 后，所有继承的地方自动同步

#### 设计意图：key 为契约，name 为实现

`defineColumns`/`defineFields` 的对象格式中，**key 是稳定的语义标识符**，而字段的 `.name` 属性是可变的实现细节：

```tsx
const fields = defineFields({
  状态: { label: '状态', name: 'status', ... },
  // key「状态」永远不变；name 'status' 可能被覆盖为 'order_status'
})

// ✅ 通过 key 引用 name — 即使 name 被覆盖/重命名，布局代码不受影响
renderFields([[fields.状态.name, fields.金额.name, fields.时间.name]])

// ❌ 硬编码 name — 如果 configurable 覆盖了 name，这里就断了
renderFields([['status', 'amount', 'createTime']])
```

这与 coverable 的理念一致：**key 是不变的接口契约，配置内容（含 name）是可被覆盖的实现细节**。

#### 最佳实践总结

| 场景                  | 推荐做法                                                        |
| --------------------- | --------------------------------------------------------------- |
| 多字段组 + 自定义布局 | `defineFields` 分组，`renderFields` 中用 `fields.key.name` 引用 |
| 跨组继承字段配置      | `extendColumn`/`extendField` 提取公共属性 + spread 覆盖         |
| 列定义 + coverable    | `defineColumns` 对象格式，消费方按 key 覆盖                     |
| 单列需要 Hooks        | `defineColumn(() => { useRequest... })`                         |
| 传给 ProTable/ProForm | `.getConfigs()` 转数组                                          |
| 避免 name 耦合        | 布局引用一律用 `fields.key.name`，不硬编码字符串                |

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
