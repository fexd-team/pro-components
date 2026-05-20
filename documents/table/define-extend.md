---
title: 列与字段定义
order: 4
---

# defineColumns / defineFields / extendColumn / extendField

ProTable 提供了一套**对象格式**的列与字段定义工具，解决传统数组定义在 coverable 场景下无法按 key 精确覆盖的问题。

## 为什么不用数组？

传统的 `columns: [{ title: '名称', dataIndex: 'name' }, ...]` 是数组——深度合并时只能按索引覆盖，无法精确定位某一列。对象格式让每一列都有稳定的 key，天然适配 `useCoverable` 的 deepMerge：

```tsx | pure
// ❌ 数组：消费方无法精确覆盖「状态」列
columns: [col1, col2, col3]

// ✅ 对象：按 key 直接覆盖
columns: ProTable.defineColumns({
  名称: { label: '名称', name: 'name' },
  状态: { label: '状态', name: 'status', type: 'select', options: statusOpts },
})
// 消费方 coverable: { columns: { 状态: { hidden: true } } }
```

---

## defineColumns

以对象格式定义表格列。返回的增强对象**既是原始对象**（可 `.名称` 访问），**又附带 getter 方法**。

```tsx | pure
import { ProTable } from '@fexd/pro-components'

const columns = ProTable.defineColumns({
  订单号: { label: '订单号', name: 'orderId', width: 180, copyable: true },
  商品名称: { label: '商品名称', name: 'productName', queryField: true },
  状态: {
    label: '状态',
    name: 'status',
    type: 'select',
    options: statusOpts,
    queryField: true,
    editField: { required: true },
  },
  金额: { label: '金额', name: 'amount', type: 'money' },
  创建时间: { label: '创建时间', name: 'createdAt', type: 'dateTime', queryField: { type: 'dateTimeRange' } },
})

// 传给 ProTable — 自动转数组
<ProTable columns={columns.getConfigs()} />

// 也可以直接传对象，ProTable 内部会自动调用 getConfigs()
<ProTable columns={columns} />
```

### 返回值方法

| 方法 | 返回类型 | 说明 |
| --- | --- | --- |
| `getConfigs()` | `Column[]` | 转为数组，传给 ProTable 的 `columns` |
| `getRawConfig()` | `Record<string, Column>` | 原始对象 |
| `getQueryFields()` | `Record<string, Field>` | 提取所有 `queryField` 不为空的列对应的查询字段 |
| `getEditFields()` | `Record<string, Field>` | 提取所有 `editField` 不为空的列对应的编辑字段 |
| `getAddFields()` | `Record<string, Field>` | 提取所有 `addField`（或 `editField` 且未显式 `addField: false`）的新增字段 |
| `getViewFields()` | `Record<string, Field>` | 提取所有 `viewField` 不为空的列对应的查看字段 |
| `getExpandViewFields()` | `Record<string, Field>` | 提取 `expandView` 字段 |
| `get*FieldKeys()` | `string[]` | 对应的 key 列表 |

> 这些 getter 在 ProTable 内部已自动调用，大多数场景**无需手动调用**。主要用于自定义布局或跨组引用。

### 单列支持 Hooks

`defineColumns` 的每个值可以是**函数**，函数内可以使用 React Hooks（如 `useRequest`）：

```tsx | pure
const columns = ProTable.defineColumns({
  类型: ProTable.defineColumn(() => {
    const { data: typeOptions } = useRequest(() => fetchTypeOptions())
    return {
      label: '类型',
      name: 'type',
      type: 'select',
      options: typeOptions,
      queryField: true,
    }
  }),
})
```

---

## defineFields

以对象格式定义字段组（用于表单、查询、详情等场景），返回带 `getConfigs()` 方法的增强对象。

```tsx | pure
const basicInfoFields = ProTable.defineFields({
  编号: { label: '编号', name: 'letter_no', mode: 'view' },
  分类: { label: '分类', name: 'classification', type: 'select', options: classOptions },
  主题: { label: '主题', name: 'subject', type: 'textarea' },
  备注: { label: '备注', name: 'note', type: 'textarea' },
})

const actionPlanFields = ProTable.defineFields({
  计划ID: { label: '计划ID', name: 'plan_id', mode: 'view' },
  预计完工: { label: '预计完工', name: 'due_date', type: 'date' },
  状态: { label: '状态', name: 'status', type: 'select', options: statusOptions },
})
```

### 返回值方法

| 方法             | 返回类型                | 说明     |
| ---------------- | ----------------------- | -------- |
| `getConfigs()`   | `Field[]`               | 转为数组 |
| `getRawConfig()` | `Record<string, Field>` | 原始对象 |

### defineFields.from — 从列定义派生字段

当查询/编辑/详情字段与表格列高度重合时，用 `defineFields.from` 从 `defineColumns` 的结果中派生，避免重复定义：

```tsx | pure
const columns = ProTable.defineColumns({
  推送ID: { label: '推送ID', name: 'pushId', width: 190, copyable: true },
  推送标题: { label: '推送标题', name: 'title', width: 200 },
  推送状态: { label: '推送状态', name: 'status', type: 'select', options: statusOpts },
  推送时间: { label: '推送时间', name: 'pushTime', type: 'dateTime' },
})

// 从 columns 派生查询字段，可覆盖 name/type
const queryFields = ProTable.defineFields.from(columns, {
  推送ID: { name: 'id' },
  推送标题: { name: 'pushTitle' },
  推送状态: { placeholder: '全部' },
  推送时间: { type: 'dateTimeRange', name: 'pushTimeRange' },
})

// queryFields.推送ID 自动继承了 label、type、options，只覆盖了 name
// queryFields.推送时间 自动继承 label/name，只把 type/name 改成查询字段需要的值
```

`from` 内部会自动判断 source 是列（`extendColumn`）还是字段（`extendField`），提取基础属性后合并 override。

返回值仍是标准 `defineFields()` 增强对象，支持 `.getConfigs()`、`.getRawConfig()` 和 `fields.key.name` 引用。

---

## extendColumn / extendField

手动从列或字段配置中**提取可复用属性子集**，用于跨字段组继承。

### extendColumn

从列配置中提取 `label`、`name`、`type`、`options`、`tooltip`、`format`、`unit`、`copyable` 等字段属性（过滤掉 `undefined`），去除列特有的 `width`、`dataIndex`、`render` 等：

```tsx | pure
const columns = ProTable.defineColumns({
  推送ID: { label: '推送ID', name: 'pushId', width: 190, copyable: true },
  推送标题: { label: '推送标题', name: 'title', width: 200 },
  推送状态: { label: '推送状态', name: 'status', type: 'select', options: statusOpts },
  推送时间: { label: '推送时间', name: 'pushTime', type: 'dateTime' },
})

// 查询字段 — 继承列配置，覆盖 name/type
const queryFields = ProTable.defineFields({
  推送ID: { ...ProTable.extendColumn(columns.推送ID), name: 'id' },
  推送标题: { ...ProTable.extendColumn(columns.推送标题), name: 'pushTitle' },
  推送状态: { ...ProTable.extendColumn(columns.推送状态), placeholder: '全部' },
  推送时间: { ...ProTable.extendColumn(columns.推送时间), type: 'dateTimeRange' },
})

// 详情字段 — 直接继承
const viewFields = ProTable.defineFields({
  推送ID: ProTable.extendColumn(columns.推送ID),
  推送标题: ProTable.extendColumn(columns.推送标题),
  推送状态: ProTable.extendColumn(columns.推送状态),
})
```

### extendField

从字段配置中提取全部非 `undefined` 属性的副本，用于字段间继承：

```tsx | pure
// 新增字段 — 从查询字段继承，扩展校验规则
const addFields = ProTable.defineFields({
  推送标题: {
    ...ProTable.extendField(queryFields.推送标题),
    required: true,
    placeholder: '不超过60个字符',
    rules: [{ max: 60, message: '不超过60个字符' }],
  },
  短信内容: {
    ...ProTable.extendField(viewFields.短信内容),
    type: 'textarea',
    required: true,
  },
})
```

---

## 自定义布局中按 key 引用字段

`defineFields` 最常见的场景是配合 `renderModalEditFields` 实现自定义弹窗布局：

```tsx | pure
const config = useCoverable(() => ({
  basicInfoFields: ProTable.defineFields({
    编号: { label: '编号', name: 'letter_no', mode: 'view' },
    分类: { label: '分类', name: 'classification', type: 'select', options: classOptions },
    主题: { label: '主题', name: 'subject', type: 'textarea' },
    备注: { label: '备注', name: 'note', type: 'textarea' },
  }),
  actionPlanFields: ProTable.defineFields({
    计划ID: { label: '计划ID', name: 'plan_id', mode: 'view' },
    预计完工: { label: '预计完工', name: 'due_date', type: 'date' },
    状态: { label: '状态', name: 'status', type: 'select', options: statusOptions },
  }),
}))

// 自定义布局：用 fields.key.name 引用字段名
const renderModalEditFields = ({ renderFields }) => (
  <div>
    <h3>基本信息</h3>
    {renderFields([
      [config.basicInfoFields.编号.name, config.basicInfoFields.分类.name],
      [config.basicInfoFields.主题.name],
    ])}
    <h3>行动计划</h3>
    {renderFields([
      [config.actionPlanFields.计划ID.name, config.actionPlanFields.预计完工.name],
      [config.actionPlanFields.状态.name],
    ])}
  </div>
)
```

> 始终用 `fields.key.name` 引用而非硬编码字符串，确保消费方通过 coverable 覆盖 `name` 后布局仍然正确。

---

## 设计哲学：key 为契约，name 为实现

```tsx | pure
const fields = ProTable.defineFields({
  状态: { label: '状态', name: 'status', type: 'select', options },
  //  ↑ key「状态」是稳定的语义标识符
  //                      ↑ name 'status' 是可变的实现细节
})

// 项目 A：后端字段名不同
coverable: { fields: { 状态: { name: 'order_status' } } }

// 项目 B：使用不同的组件类型
coverable: { fields: { 状态: { type: 'radio', options: otherOptions } } }
```

key 永远不变，是组件作者与消费者之间的契约；name、type、options 等都是可覆盖的实现细节。

---

## 选择指南

| 场景                  | 推荐做法                                                        |
| --------------------- | --------------------------------------------------------------- |
| 多字段组 + 自定义布局 | `defineFields` 分组，`renderFields` 中用 `fields.key.name` 引用 |
| 跨组继承字段配置      | `extendColumn`/`extendField` 提取公共属性 + spread 覆盖         |
| 列定义 + coverable    | `defineColumns` 对象格式，消费方按 key 覆盖                     |
| 批量从列派生字段      | `defineFields.from(columns, { key: overrides })`                |
| 单列需要 Hooks        | `ProTable.defineColumn(() => { useRequest... })`                |
| 传给 ProTable/ProForm | `.getConfigs()` 转数组                                          |
| 避免 name 耦合        | 布局引用一律用 `fields.key.name`，不硬编码字符串                |
