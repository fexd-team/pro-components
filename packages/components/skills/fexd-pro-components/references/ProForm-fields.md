---
name: ProForm-fields
description: ProForm 字段类型完整指南——FieldConfig 完整 API、所有内置类型、自定义类型、options 配置
---

# ProForm 字段类型

## FieldConfig 完整 API

> `ProFieldConfig` 是 `ProFieldValueFieldType` 的类型别名，通过 interface merging 合并了两段定义。

### 核心属性

| 属性         | 说明                             | 类型                   | 默认值   |
| ------------ | -------------------------------- | ---------------------- | -------- |
| name         | 字段名（支持嵌套路径）           | `string \| string[]`   | -        |
| label        | 标签                             | `ReactNode`            | -        |
| type         | 字段类型                         | `BuiltInValueTypeKeys` | `'text'` |
| required     | 必填（string=自定义提示）        | `boolean \| string`    | -        |
| rules        | 校验规则（配置后 required 失效） | `Rule[]`               | -        |
| builtInRule  | 内置校验规则                     | `string`               | -        |
| initialValue | 初始值                           | `any`                  | -        |
| placeholder  | 占位符                           | `string`               | -        |
| tooltip      | label 旁提示                     | `ReactNode`            | -        |
| disabled     | 禁用                             | `boolean`              | -        |
| hidden       | 隐藏                             | `boolean`              | -        |

### 数据与展示

| 属性           | 说明                       | 类型                                    | 默认值 |
| -------------- | -------------------------- | --------------------------------------- | ------ |
| options        | 选项数据                   | `EnumData[] \| Record \| () => Promise` | -      |
| props          | 透传给底层 antd 组件       | `object`                                | -      |
| value          | 手动设置值                 | `any`                                   | -      |
| format         | 格式化字符串（日期类型用） | `string`                                | -      |
| unit           | 单位（money/percent 用）   | `string`                                | -      |
| digits         | 小数位数                   | `number`                                | -      |
| numberLocale   | 数字本地化                 | `string`                                | -      |
| currencyLocale | 货币本地化                 | `string`                                | -      |
| fromNowTooltip | fromNow 类型的 tooltip     | -                                       | -      |
| copyable       | 只读模式下可复制           | `boolean`                               | -      |

### 布局

| 属性           | 说明                                  | 类型            | 默认值 |
| -------------- | ------------------------------------- | --------------- | ------ |
| colSpan        | Grid 布局占列数 / render 布局占栅格数 | `number`        | -      |
| lazyRender     | 延迟渲染                              | `boolean`       | -      |
| labelFontBold  | 标签加粗                              | `boolean`       | -      |
| labelClassName | 标签样式类                            | `string`        | -      |
| labelStyle     | 标签内联样式                          | `CSSProperties` | -      |

### 模式与渲染

| 属性        | 说明                          | 类型                    | 默认值   |
| ----------- | ----------------------------- | ----------------------- | -------- |
| mode        | 单字段模式覆盖                | `'edit' \| 'view'`      | 继承表单 |
| form        | 设为 false 时不包裹 Form.Item | `false`                 | -        |
| renderField | 自定义编辑态渲染              | `(params) => ReactNode` | -        |
| renderView  | 自定义只读态渲染              | `(params) => ReactNode` | -        |

### 关联与动态

| 属性         | 说明                                    | 类型                                       | 默认值 |
| ------------ | --------------------------------------- | ------------------------------------------ | ------ |
| hook         | 动态关联函数（**可写 React Hooks**）    | `({ form, mode, ... }) => config \| false` | -      |
| dependencies | hook 依赖字段（不指定则任何变化都触发） | `string[]`                                 | -      |
| shouldUpdate | 更新条件                                | `boolean \| Function`                      | -      |
| key          | 重置字段用（key 变化时字段重新创建）    | `string`                                   | -      |

### 分组与表单项

| 属性           | 说明                                              | 类型      | 默认值 |
| -------------- | ------------------------------------------------- | --------- | ------ |
| group          | 分组名（配合 validateGroups / renderGroupFields） | `string`  | -      |
| fieldItemProps | 传给 Form.Item 的额外 props                       | `object`  | -      |
| formPreserve   | 单字段 preserve 覆盖                              | `boolean` | -      |

## 内置字段类型详解

### 输入类型

| type               | 底层组件       | 说明            |
| ------------------ | -------------- | --------------- |
| `text` / `input`   | Input          | 单行文本        |
| `password`         | Input.Password | 密码            |
| `textarea`         | Input.TextArea | 多行文本        |
| `digit` / `number` | InputNumber    | 数字            |
| `money`            | InputNumber    | 金额（带 unit） |
| `percent`          | InputNumber    | 百分比          |

```tsx
fields={[
  { label: '文本', name: 'text', type: 'text' },
  { label: '密码', name: 'password', type: 'password' },
  { label: '金额', name: 'money', type: 'money', unit: '¥' },
  { label: '多行', name: 'textarea', type: 'textarea', props: { rows: 4 } },
  { label: '数字', name: 'digit', type: 'digit', props: { min: 0, max: 100, step: 1 } },
  { label: '百分比', name: 'percent', type: 'percent', props: { min: 0, max: 1, step: 0.01 } },
]}
```

### 选择类型

| type                  | 底层组件              | 说明                        |
| --------------------- | --------------------- | --------------------------- |
| `select`              | Select                | 单选下拉                    |
| `multipleSelect`      | Select (multiple)     | 多选下拉                    |
| `treeSelect`          | TreeSelect            | 树形单选                    |
| `multipleTreeSelect`  | TreeSelect (multiple) | 树形多选                    |
| `cascader`            | Cascader              | 级联选择                    |
| `modalSelect`         | 自定义弹窗            | 弹窗选择（可内嵌 ProTable） |
| `modalMultipleSelect` | 自定义弹窗            | 弹窗多选（可内嵌 ProTable） |
| `checkbox`            | Checkbox.Group        | 多选框组                    |
| `radio`               | Radio.Group           | 单选框组                    |
| `radioButton`         | Radio.Group (button)  | 按钮式单选                  |

```tsx
fields={[
  {
    label: '单选', name: 'select', type: 'select',
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
    ],
  },
  {
    label: '多选', name: 'multiSelect', type: 'multipleSelect',
    options: simpleOptions,
    props: { mode: 'tags', maxTagCount: 3 },
  },
  {
    label: '级联', name: 'cascader', type: 'cascader',
    options: [
      { label: '浙江', value: 'zj', children: [{ label: '杭州', value: 'hz' }] },
    ],
  },
  {
    label: '树选择', name: 'tree', type: 'treeSelect',
    options: treeData,
  },
  {
    label: '多选框', name: 'checkbox', type: 'checkbox',
    options: simpleOptions,
  },
  {
    label: '单选框', name: 'radio', type: 'radio',
    options: simpleOptions,
  },
  {
    label: '按钮单选', name: 'radioButton', type: 'radioButton',
    options: simpleOptions,
  },
]}
```

### options 多种格式

```tsx
// 1. 数组格式
options: [{ label: '选项1', value: 1 }]

// 2. 对象格式
options: { 1: '选项1', 2: '选项2' }

// 3. 异步函数
options: async () => {
  const res = await api.fetchOptions()
  return res.data.map(item => ({ label: item.name, value: item.id }))
}

// 4. ahooks useRequest（配合 queryFieldServiceOptions）
```

### options 上的 tag / badge 属性

选项对象上可以直接附加 `tag` 或 `badge` 属性，在只读展示（ProTable 列 / ProField view 模式）时自动渲染为彩色标签或徽标：

```tsx
options: [
  { label: '启用', value: 1, tag: 'success' }, // antd Tag color
  { label: '禁用', value: 0, tag: 'error' },
  { label: '待审核', value: 2, badge: 'processing' }, // antd Badge status
  { label: '已过期', value: 3, badge: 'default' },
]
```

**tag 可选值**：任意 antd Tag 的 `color` 值（如 `'success'`、`'processing'`、`'warning'`、`'error'`、`'#f50'` 等）

**badge 可选值**：antd Badge 的 `status` 值（`'success'`、`'processing'`、`'default'`、`'error'`、`'warning'`）

> 无需自定义 `render` 或 `renderView`，直接在 options 上标注即可自动展示颜色状态。配合 `coloringOptions()` 工具函数还能自动分配颜色。

### modalSelect（弹窗选择，可内嵌 ProTable）

```tsx
{
  label: '选择用户', name: 'userId', type: 'modalSelect',
  props: {
    getModalConfig: () => ({
      title: '选择用户',
      content: (
        <ProTable
          columns={[
            { label: '姓名', name: 'name' },
            { label: '部门', name: 'dept' },
          ]}
          onQuery={api.fetchUsers}
        />
      ),
    }),
  },
}
```

### 日期时间类型

| type               | 说明         | 格式                     |
| ------------------ | ------------ | ------------------------ |
| `date`             | 日期         | YYYY-MM-DD               |
| `dateTime`         | 日期时间     | YYYY-MM-DD HH:mm:ss      |
| `dateWeek`         | 周           | YYYY-wo                  |
| `dateMonth`        | 月           | YYYY-MM                  |
| `dateQuarter`      | 季度         | YYYY-Q                   |
| `dateYear`         | 年           | YYYY                     |
| `time`             | 时间         | HH:mm:ss                 |
| `fromNow`          | 相对时间     | -                        |
| `dateRange`        | 日期范围     | [YYYY-MM-DD, YYYY-MM-DD] |
| `dateTimeRange`    | 日期时间范围 | -                        |
| `dateWeekRange`    | 周范围       | -                        |
| `dateMonthRange`   | 月范围       | -                        |
| `dateQuarterRange` | 季度范围     | -                        |
| `dateYearRange`    | 年范围       | -                        |
| `timeRange`        | 时间范围     | -                        |
| `fromNowRange`     | 相对时间范围 | -                        |

```tsx
fields={[
  { label: '日期', name: 'date', type: 'date' },
  { label: '日期时间', name: 'dateTime', type: 'dateTime' },
  {
    label: '日期范围', name: 'dateRange', type: 'dateRange',
    builtInRule: 'same-month', // 必须在同一个月内
  },
  { label: '时间', name: 'time', type: 'time' },
  { label: '相对时间', name: 'fromNow', type: 'fromNow' },
]}
```

#### builtInRule 详解

| 值             | 适用类型                  | 说明                                   |
| -------------- | ------------------------- | -------------------------------------- |
| `'same-month'` | dateRange / dateTimeRange | 起止日期必须在同一月                   |
| `'days-span'`  | dateRange / dateTimeRange | 起止日期最大跨度限制（需搭配对象形式） |

`days-span` 需传对象配置：

```tsx
{
  label: '查询时间', name: 'dateRange', type: 'dateRange',
  builtInRule: { name: 'days-span', span: 30 },  // 最多跨 30 天
}
```

启用后：选择起始日期时，超出 span 天数的日期会自动 disabled；选完范围后如果不符合规则会阻止选择。

### 其他类型

| type         | 底层组件 | 说明         |
| ------------ | -------- | ------------ |
| `switch`     | Switch   | 开关         |
| `rate`       | Rate     | 评分         |
| `slider`     | Slider   | 滑块         |
| `upload`     | Upload   | 文件上传     |
| `image`      | 自定义   | 图片         |
| `tree`       | Tree     | 树形（多选） |
| `singleTree` | Tree     | 树形（单选） |
| `transfer`   | Transfer | 穿梭框       |

```tsx
fields={[
  { label: '开关', name: 'active', type: 'switch' },
  { label: '评分', name: 'score', type: 'rate', props: { allowHalf: true } },
  { label: '滑块', name: 'range', type: 'slider', props: { range: true, min: 0, max: 100 } },
  { label: '上传', name: 'files', type: 'upload' },
  { label: '图片', name: 'avatar', type: 'image' },
]}
```

#### tree / singleTree 专有 props

除 antd Tree 的标准 props 外，还支持：

| props 属性                       | 说明                                      | 类型      | 默认值 |
| -------------------------------- | ----------------------------------------- | --------- | ------ |
| `parentControlledByChildren`     | 父节点选中状态由子节点控制（全选子=选父） | `boolean` | -      |
| `includeHalfCheckedWhileOnCheck` | onCheck 时包含半选状态的节点              | `boolean` | -      |

```tsx
{
  label: '权限树', name: 'permissions', type: 'tree',
  options: treeData,
  props: {
    checkable: true,
    parentControlledByChildren: true,
    includeHalfCheckedWhileOnCheck: true,
  },
}
```

#### lazyRender 不只是 boolean

`lazyRender` 属性可传对象配置，控制 IntersectionObserver 和 debounce 行为：

```tsx
{
  label: '富文本', name: 'content', type: 'textarea',
  lazyRender: true,  // 简写：使用默认配置

  // 或传对象精细控制
  lazyRender: {
    threshold: 0.1,   // IntersectionObserver threshold
    wait: 200,        // debounce 延迟（ms）
  },
}
```

#### copyable 不只是 boolean

`copyable` 可传对象，透传确认或 tooltip 配置给复制按钮（view 模式下）：

```tsx
{
  label: '密钥', name: 'secretKey',
  copyable: true,          // 简写

  // 或传对象自定义
  copyable: {
    tooltipText: '点击复制密钥',
    successText: '已复制',
  },
}
```

## 自定义字段渲染（renderField）

不设置 `type` 时，通过 `renderField` 完全自定义：

```tsx
fields={[
  {
    label: '自定义组件', name: 'custom',
    renderField: ({ fieldProps }) => (
      <MyCustomInput {...fieldProps} />
    ),
  },
  {
    label: '带额外信息', name: 'rich',
    type: 'text',
    renderField: ({ fieldProps, defaultRender }) => (
      <div>
        {defaultRender()} {/* 渲染默认组件 */}
        <span style={{ color: '#999' }}>提示文字</span>
      </div>
    ),
  },
]}
```

## 自定义只读渲染（renderView）

```tsx
fields={[
  {
    label: '状态', name: 'status', type: 'select',
    options: statusOptions,
    renderView: ({ value, fieldConfig }) => (
      <Tag color={value === 1 ? 'green' : 'red'}>
        {fieldConfig.options?.find(o => o.value === value)?.label}
      </Tag>
    ),
  },
]}
```

## 全局注册新类型（registerValueType）

```tsx
import { registerValueType } from '@fexd/pro-components'

registerValueType('color', {
  renderField: ({ fieldProps }) => (
    <input type="color" {...fieldProps} />
  ),
  renderView: ({ value }) => (
    <div style={{ width: 24, height: 24, background: value, borderRadius: 4 }} />
  ),
  normalizeValue: (value) => value,
  normalizeFieldValue: true,
  fieldItemProps: { valuePropName: 'value' },
})

// 使用
fields={[{ label: '颜色', name: 'color', type: 'color' }]}
```

> 运行时注册后已挂载的字段会通过 `useUpdateAfterValueTypeAdd` 自动刷新。

## props 透传机制

每个 field 配置项由两层组成：**Form.Item（表单项容器）** 和 **底层 antd 组件（Input/Select 等）**。

### 核心规则

| 目标层             | 传入方式                                  | 说明                                            |
| ------------------ | ----------------------------------------- | ----------------------------------------------- |
| **底层 antd 组件** | `props: { ... }`                          | 如 Input 的 `maxLength`、Select 的 `showSearch` |
| **Form.Item**      | 直接顶层属性 或 `fieldItemProps: { ... }` | 如 `rules`、`extra`、`help`、`colon`            |

**默认行为**：除 `props`、`type`、`options`、`disabled`、`placeholder`、`renderField`、`renderView`、`hook`、`copyable` 等被单独处理的属性外，**顶层属性默认给 Form.Item**。底层组件的属性必须通过 `props` 显式传入。

### 示例

```tsx
fields={[
  {
    // → Form.Item 层
    label: '手机号',
    name: 'phone',
    required: '请填写手机号',
    tooltip: '仅中国大陆',
    fieldItemProps: { extra: '11位数字' },

    // → 底层 Input 层
    type: 'text',
    placeholder: '请输入',
    disabled: false,
    props: { maxLength: 11, addonBefore: '+86', allowClear: true },
  },
  {
    label: '金额', name: 'amount', type: 'digit',
    props: { min: 0, max: 999999, step: 100, precision: 2, addonAfter: '元' },
  },
  {
    label: '日期', name: 'date', type: 'date',
    props: { disabledDate: (current) => current > dayjs() },
  },
  {
    label: '技能', name: 'skills', type: 'multipleSelect',
    props: { mode: 'tags', maxTagCount: 3, tokenSeparators: [','] },
    options: skillOptions,
  },
]}
```

### 常见错误

```tsx
// ❌ maxLength 写在顶层 → 传给 Form.Item（无效）
{ label: '姓名', name: 'name', type: 'text', maxLength: 10 }

// ✅ 通过 props 传给 Input
{ label: '姓名', name: 'name', type: 'text', props: { maxLength: 10 } }
```

> 完整的 props 分层说明和各类型常用 props 列表，详见 [ProField.md → Props 透传机制](ProField.md)。
