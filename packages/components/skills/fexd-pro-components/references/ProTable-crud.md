---
name: ProTable-crud
description: ProTable 增删改查完整指南——新增、编辑、详情、删除、弹窗/抽屉配置、行内编辑
---

# ProTable CRUD

> 由 `editField` 插件管理，结合 `actions` 插件注册内置 CRUD 动作。

## CRUD Props

### 编辑相关

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| editFields | 编辑表单字段配置 | `FieldConfig[] \| ((item, mode) => FieldConfig[])` | - |
| onEdit | 编辑回调 | `(params, item) => Promise<Response>` | - |
| refreshAfterEdit | 编辑后自动刷新 | `boolean` | `true` (**源码**) |
| whenToTriggerOnEdit | 触发 onEdit 的时机 | `'changed' \| 'always'` | `'changed'` |
| editFieldColumns | 编辑表单列数 | `number` | - |
| editFieldGutter | 编辑表单间距 | `number \| ((item, mode) => number)` | - |
| editFieldLayout | 编辑表单布局 | `string` | - |
| editFieldFormProps | 编辑表单的 ProForm props | `ProFormProps \| ((item, mode) => ProFormProps)` | - |
| editFieldModalProps | 编辑弹窗配置 | `ModalProps & { drawer?: boolean }` | - |
| editFieldFilterEmptyParam | 编辑提交是否过滤空值 | `boolean` | - |
| renderModalEditFields | 自定义编辑区布局 | `(params) => ReactNode` | - |

**whenToTriggerOnEdit 说明**：

- `'changed'`（默认）：只在表单值有变更时才触发 `onEdit`，无改动关闭弹窗不调用
- `'always'`：无论是否修改，确认即触发 `onEdit`

### 新增相关

| 属性                     | 说明                     | 类型                                               | 默认值 |
| ------------------------ | ------------------------ | -------------------------------------------------- | ------ |
| addFields                | 新增表单字段配置         | `FieldConfig[] \| ((item, mode) => FieldConfig[])` | -      |
| onAdd                    | 新增回调                 | `(params) => Promise<Response>`                    | -      |
| refreshAfterAdd          | 新增后自动刷新           | `boolean`                                          | `true` |
| addFieldColumns          | 新增表单列数             | `number`                                           | -      |
| addFieldGutter           | 新增表单间距             | `number \| ((item, mode) => number)`               | -      |
| addFieldFormProps        | 新增表单的 ProForm props | `ProFormProps \| ((item, mode) => ProFormProps)`   | -      |
| addFieldModalProps       | 新增弹窗配置             | `ModalProps & { drawer?: boolean }`                | -      |
| addFieldFilterEmptyParam | 新增提交是否过滤空值     | `boolean`                                          | -      |

### 详情相关

| 属性                  | 说明                           | 类型                                               | 默认值 |
| --------------------- | ------------------------------ | -------------------------------------------------- | ------ |
| viewFields            | 详情展示字段配置               | `FieldConfig[] \| ((item, mode) => FieldConfig[])` | -      |
| onView                | 详情回调（可异步获取详情数据） | `(item, mode) => Promise<Response>`                | -      |
| viewFieldColumns      | 详情列数                       | `number`                                           | -      |
| viewFieldFormProps    | 详情表单 ProForm props         | `ProFormProps \| ((item, mode) => ProFormProps)`   | -      |
| viewFieldModalProps   | 详情弹窗配置                   | `ModalProps & { drawer?: boolean }`                | -      |
| renderModalViewFields | 自定义详情区布局               | `(params) => ReactNode`                            | -      |

### 字段配置的函数形式

`editFields`、`addFields`、`viewFields` 支持函数形式，根据当前行数据和模式动态生成字段：

```tsx
<ProTable
  editFields={(item, mode) => {
    const baseFields = [
      { label: '名称', name: 'name', required: true },
      { label: '类型', name: 'type', type: 'select', options: typeOptions },
    ]
    if (mode === 'edit' && item?.type === 'advanced') {
      baseFields.push({ label: '高级配置', name: 'config', type: 'textarea' })
    }
    return baseFields
  }}
  viewFields={(item, mode) => [
    { label: '名称', name: 'name' },
    { label: '类型', name: 'type', type: 'select', options: typeOptions },
    ...(item?.log ? [{ label: '操作日志', name: 'log', type: 'textarea' }] : []),
  ]}
/>
```

### 删除相关

| 属性     | 说明     | 类型                            | 默认值 |
| -------- | -------- | ------------------------------- | ------ |
| onDelete | 删除回调 | `(target) => Promise<Response>` | -      |

## 基础用法：editFields 独立配置

```tsx
<ProTable
  columnActions={['edit']}
  editFields={[
    { label: '姓名', name: 'name', required: '请输入姓名' },
    { label: '部门', name: 'department', type: 'select', options: deptOptions },
  ]}
  onView={async (item) => {
    // 编辑前加载详情（可选）
    const detail = await api.getUserDetail(item.id)
    return { success: true, data: { ...item, ...detail } }
  }}
  onEdit={async (params, item) => {
    await api.updateUser(item.id, params)
    return { success: true, message: '编辑成功' }
  }}
  columns={[
    { label: '姓名', name: 'name' },
    { label: '部门', name: 'department', type: 'select', options: deptOptions },
  ]}
/>
```

> `onEdit` 只在表单有改动时才调用。编辑完成后自动刷新（`refreshAfterEdit: true`）。

## 从 columns 继承（推荐）

在 `columns` 中使用 `editField` / `addField` / `viewField` 属性：

```tsx
<ProTable
  actions={['add']}
  columnActions={['view', 'edit', 'delete']}
  columns={[
    {
      label: '姓名',
      name: 'name',
      queryField: true, // 同时参与查询
      editField: { required: true }, // 编辑时必填
      // addField 未设置时默认继承 editField
    },
    {
      label: '部门',
      name: 'department',
      type: 'select',
      options: deptOptions,
      queryField: true,
      editField: true, // true = 直接继承 column 的 type/options
    },
    {
      label: '备注',
      name: 'remark',
      type: 'textarea',
      editField: true,
      hidden: true, // 表格中不显示，但编辑弹窗中出现
      // hidden 字段不会出现在 table-edit 中
    },
    {
      label: 'ID',
      name: 'id',
      width: 80,
      editField: false, // 编辑时不显示
    },
  ]}
  onAdd={async (params) => {
    await api.create(params)
    return { success: true }
  }}
  onEdit={async (params, item) => {
    await api.update(item.id, params)
    return { success: true }
  }}
  onDelete={async (target) => {
    const ids = Array.isArray(target) ? target.map((t) => t.id) : [target.id]
    await api.batchDelete(ids)
    return { success: true }
  }}
/>
```

> **继承规则**：label ← column.title/label, name ← column.dataIndex/name, type ← column.valueType/type, options ← column.valueEnum/options

## 行内编辑（table-edit）

通过 `columnActions={['table-edit']}` 启用行内编辑（仅在 editField 从 columns 继承时有效）：

```tsx
<ProTable
  columnActions={['table-edit']}
  columns={[
    {
      label: '姓名',
      name: 'name',
      editField: {
        hook: ({ form }) => {
          const depValue = form.getFieldValue('select')
          return depValue !== 1 // 返回 false 隐藏编辑，返回对象可修改配置
        },
      },
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      options: statusOptions,
      editField: true,
    },
    {
      label: '开关',
      name: 'active',
      type: 'switch',
      editField: true,
    },
  ]}
  onEdit={async (params, item) => {
    await api.updateUser(item.id, params)
    return { success: true }
  }}
/>
```

> 行内编辑点击"保存"时也会调用 `onEdit`。`hidden: true` 的列不会出现在行内编辑中。

## 编辑表单校验

```tsx
editFields={[
  { label: '文本', name: 'text', required: '请填写此项' },
  {
    label: '单选框', name: 'select', type: 'select',
    options: [...],
    rules: [{ required: true, message: '请选择此项' }],
  },
]}
// 或从 columns 继承
columns={[
  { label: '文本', name: 'text', editField: { required: '请填写此项' } },
  {
    label: '单选框', name: 'select', type: 'select', options: [...],
    editField: { rules: [{ required: true, message: '请选择此项' }] },
  },
]}
```

## 编辑表单关联（hook）

```tsx
editFields={[
  { label: '文本', name: 'text' },
  {
    label: '单选框', name: 'select', type: 'select',
    hook: ({ form }) => {
      const textValue = form.getFieldValue('text')

      useEffect(() => {
        console.log('text 变化了', textValue)
      }, [textValue])

      return {
        options: textValue ? [{ label: textValue, value: textValue }] : [],
      }
    },
    dependencies: ['text'],
  },
]}
```

## 弹窗配置

### 弹窗尺寸

```tsx
<ProTable
  editFieldColumns={1}                    // 一列布局
  editFieldModalProps={{ width: 390 }}     // 弹窗宽度
  editFields={[...]}
/>
```

> `editFieldModalProps` 的属性与 antd `Modal` 完全一致。

### 使用抽屉（Drawer）

```tsx
<ProTable
  editFieldModalProps={{ drawer: true }}    // 切换为抽屉
  editFields={[...]}
/>
```

> 启用 `drawer: true` 后，`editFieldModalProps` 的属性将传给 antd `Drawer`。

### 抽屉方向

```tsx
<ProTable
  editFieldModalProps={{
    drawer: true,
    placement: 'left', // 'top' | 'right' | 'bottom' | 'left'（默认 right）
  }}
  editFields={[...]}
/>
```

### 为新增/详情分别配置弹窗

```tsx
<ProTable
  addFieldModalProps={{ width: 600, title: '创建用户' }}
  editFieldModalProps={{ drawer: true, width: 720 }}
  viewFieldModalProps={{ drawer: true, placement: 'right' }}
  ...
/>
```

## 自定义编辑布局（renderModalEditFields）

```tsx
<ProTable
  editFields={[
    { label: '文本1', name: 'text1' },
    { label: '文本2', name: 'text2' },
    { label: '文本3', name: 'text3' },
  ]}
  renderModalEditFields={({ renderField, renderFields, mode, item, form }) => (
    <>
      {mode === 'edit' && <div>正在编辑: {item?.name}</div>}
      {renderField('text1')}
      {renderFields([
        ['text2', 'text3'],
        [
          { name: 'text1', colSpan: 16 },
          { name: 'text2', colSpan: 8 },
        ],
        [
          { colSpan: 16, content: <div>自定义节点</div> },
          { colSpan: 8, content: <div>自定义节点2</div> },
        ],
      ])}
    </>
  )}
/>
```

**renderModalEditFields 参数：**

| 参数                        | 说明                                    |
| --------------------------- | --------------------------------------- |
| renderField(name \| config) | 渲染单个字段                            |
| renderFields(configs)       | 渲染多个字段（一维/二维数组）           |
| mode                        | 当前模式：`'add'` / `'edit'` / `'view'` |
| item                        | 当前操作项（edit/view 时有值）          |
| form                        | 当前表单 form 实例                      |

## 命令式弹出 CRUD 弹窗

通过 ref 或 controller 命令式弹出：

```tsx
const controller = ProTable.useController()

// 弹出新增
controller.showAddModal()

// 弹出编辑（传入当前行）
controller.showEditModal(item)

// 自定义弹窗配置
controller.showEditModal(item, {
  title: '自定义标题',
  width: 800,
})

// 通过 ref
proTableRef.current?.editField.showAddModal()
proTableRef.current?.editField.showEditModal(item)
```

## 完整 CRUD 示例

```tsx
import { ProTable } from '@fexd/pro-components'
import { message } from 'antd'

const deptOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
]

export default () => (
  <ProTable
    title="用户管理"
    selectable
    actions={['add']}
    iconActions={['refresh', 'table-size', 'fullscreen']}
    columnActions={['view', 'edit', 'delete']}
    batchActions={['delete']}
    fixColumnActions
    columns={[
      { label: '姓名', name: 'name', queryField: true, editField: { required: true } },
      { label: '年龄', name: 'age', type: 'digit', editField: { required: true } },
      {
        label: '部门',
        name: 'department',
        type: 'select',
        options: deptOptions,
        queryField: true,
        editField: true,
      },
      { label: '入职日期', name: 'joinDate', type: 'date', editField: true },
      { label: '备注', name: 'remark', type: 'textarea', editField: true, hidden: true },
    ]}
    onQuery={async (params) => {
      const res = await api.fetchUsers(params)
      return { success: true, data: res.data, total: res.total }
    }}
    onAdd={async (params) => {
      await api.createUser(params)
      message.success('新增成功')
      return { success: true }
    }}
    onView={async (item) => {
      const detail = await api.getUserDetail(item.id)
      return { success: true, data: { ...item, ...detail } }
    }}
    onEdit={async (params, item) => {
      await api.updateUser(item.id, params)
      message.success('编辑成功')
      return { success: true }
    }}
    onDelete={async (target) => {
      const ids = Array.isArray(target) ? target.map((t) => t.id) : [target.id]
      await api.deleteUsers(ids)
      message.success('删除成功')
      return { success: true }
    }}
  />
)
```
