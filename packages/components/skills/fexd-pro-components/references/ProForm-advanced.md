---
name: ProForm-advanced
description: ProForm 高级用法——校验、关联（hook/dependencies）、分组、编辑/只读模式、动态渲染
---

# ProForm 高级用法

## 表单校验

### 简单必填

`required` 支持 `boolean` 和 `string`（字符串为自定义提示语）：

```tsx
fields={[
  { label: '姓名', name: 'name', required: true },          // 默认提示
  { label: '邮箱', name: 'email', required: '请输入邮箱' },  // 自定义提示
]}
```

### antd rules

使用 `rules` 进行详细校验（配置后 `required` 属性失效）：

```tsx
fields={[
  {
    label: '邮箱', name: 'email',
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ],
  },
  {
    label: '手机号', name: 'phone',
    rules: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1\d{10}$/, message: '手机号格式不正确' },
    ],
  },
  {
    label: '密码', name: 'password',
    rules: [
      { required: true, message: '请输入密码' },
      { min: 6, max: 20, message: '密码长度 6-20 位' },
    ],
  },
]}
```

### 内置规则（builtInRule）

```tsx
fields={[
  {
    label: '日期范围', name: 'dateRange', type: 'dateRange',
    builtInRule: 'same-month', // 两个日期必须在同一个月内
  },
]}
```

### 分组校验（validateGroups）

```tsx
const [form] = ProForm.useForm()

// 定义分组
fields={[
  { label: '姓名', name: 'name', required: true, group: 'basic' },
  { label: '邮箱', name: 'email', required: true, group: 'basic' },
  { label: '技能', name: 'skills', group: 'advanced' },
  { label: '简介', name: 'bio', group: 'advanced' },
]}

// 仅校验基础信息组
const handleNextStep = async () => {
  await form.validateGroups(['basic'])
  goToStep2()
}

// 最终提交校验全部
const handleSubmit = async () => {
  await form.validateGroups(['basic', 'advanced'])
  const values = await form.validateFields()
  await api.submit(values)
}
```

## 字段关联（hook + dependencies）

`hook` 是 ProForm 最强大的特性——一个**可以使用 React Hooks** 的函数，用于动态控制字段配置。

### 基础关联

```tsx
fields={[
  { label: '省份', name: 'province', type: 'select', options: provinceOptions },
  {
    label: '城市', name: 'city', type: 'select',
    hook: ({ form }) => {
      const province = form.getFieldValue('province')

      return {
        options: province ? cityMap[province] : [],
        disabled: !province,
        placeholder: province ? '请选择城市' : '请先选择省份',
      }
    },
    dependencies: ['province'],
  },
]}
```

### hook 中使用 React Hooks

```tsx
{
  label: '城市', name: 'city', type: 'select',
  hook: ({ form }) => {
    const province = form.getFieldValue('province')
    const [loading, setLoading] = useState(false)
    const [cityOptions, setCityOptions] = useState([])

    useEffect(() => {
      if (!province) {
        setCityOptions([])
        return
      }
      setLoading(true)
      fetchCities(province)
        .then(setCityOptions)
        .finally(() => setLoading(false))
    }, [province])

    return {
      options: cityOptions,
      disabled: !province,
      props: { loading },
    }
  },
  dependencies: ['province'],
}
```

### hook 返回 false 隐藏字段

```tsx
{
  label: '其他说明', name: 'otherReason', type: 'textarea',
  hook: ({ form }) => {
    const reason = form.getFieldValue('reason')
    return reason === 'other' // 返回 false 时隐藏字段
      ? { required: true }
      : false
  },
  dependencies: ['reason'],
}
```

### hook 返回 ReactNode 替换字段

hook 不仅能返回配置对象或 `false`，还可以直接返回 React 节点，完全替换该字段的渲染：

```tsx
{
  label: '预览', name: 'preview',
  hook: ({ form }) => {
    const type = form.getFieldValue('contentType')

    if (type === 'image') {
      return <img src={form.getFieldValue('url')} style={{ maxWidth: 200 }} />
    }

    if (type === 'video') {
      return <video src={form.getFieldValue('url')} controls width={300} />
    }

    return { type: 'text', disabled: true }  // 正常配置对象
  },
  dependencies: ['contentType', 'url'],
}
```

**hook 返回值的完整行为：**

| 返回值                         | 行为                              |
| ------------------------------ | --------------------------------- |
| 配置对象 `{ ... }`             | 与当前字段配置合并，渲染 ProField |
| `false` / `null` / `undefined` | 隐藏字段                          |
| `true`                         | 使用原始配置（不修改）            |
| ReactNode（JSX）               | 直接渲染该节点，替换整个字段      |
| `string` / `number`            | 直接作为文本渲染                  |

### hook 参数

| 参数 | 说明                        |
| ---- | --------------------------- |
| form | ProFormInstance             |
| mode | 当前模式 ('edit' \| 'view') |

### dependencies 说明

- **不指定**：任何字段值变化都触发 hook 重新计算
- **指定数组**：仅列出的字段变化时触发
- **推荐**：始终显式声明 dependencies 以避免不必要的重计算

### key 重置字段

当关联的字段变化时需要完全重置（包括状态和 DOM）：

```tsx
{
  label: '城市', name: 'city', type: 'select',
  hook: ({ form }) => {
    const province = form.getFieldValue('province')
    return {
      key: province, // province 变化时字段完全重建
      options: cityMap[province] || [],
    }
  },
  dependencies: ['province'],
}
```

## 编辑/只读模式

### 全局模式切换

```tsx
import { useState } from 'react'
import { ProForm, ProField } from '@fexd/pro-components'

const UserProfile = () => {
  const [form] = ProForm.useForm()
  const [mode, setMode] = useState<'edit' | 'view'>('view')

  return (
    <div>
      <ProField
        noStyle
        type="switch"
        props={{
          checked: mode === 'view',
          checkedChildren: '只读',
          unCheckedChildren: '编辑',
          onChange: (checked) => setMode(checked ? 'view' : 'edit'),
        }}
      />

      <ProForm
        form={form}
        mode={mode}
        gridColumns={3}
        fields={[
          { label: '姓名', name: 'name', type: 'text', required: true },
          { label: '部门', name: 'dept', type: 'select', options: deptOptions },
          { label: '入职日期', name: 'joinDate', type: 'date' },
        ]}
      />
    </div>
  )
}
```

### 单字段模式覆盖

```tsx
fields={[
  { label: '用户名', name: 'username', type: 'text', mode: 'view' }, // 始终只读
  { label: '昵称', name: 'nickname', type: 'text' }, // 跟随表单 mode
  { label: '密码', name: 'password', type: 'password' }, // 跟随表单 mode
]}
```

### view 模式行为

- `FieldSwitch` 走 `ReadonlyField` 分支
- 日期等类型使用各自的 `renderView` 渲染
- 选择类型显示 label 而非 value
- `copyable: true` 时可复制

## 动态渲染（gridDynamicRender）

```tsx
<ProForm
  gridDynamicRender // 开启动态渲染
  fields={[
    { label: '姓名', name: 'name', type: 'text' },
    {
      label: '扩展信息',
      name: 'extra',
      type: 'textarea',
      hook: ({ form }) => {
        const name = form.getFieldValue('name')
        return name ? {} : false // name 有值时才显示
      },
      dependencies: ['name'],
    },
  ]}
/>
```

> 开启 `gridDynamicRender` 时，带 `hook` 的字段会走延迟批处理，避免频繁渲染。

## 分组（group）

### 定义分组

`group` 属性可以是字符串或**字符串数组**（一个字段属于多个分组）：

```tsx
fields={[
  { label: '姓名', name: 'name', group: 'basic' },
  { label: '邮箱', name: 'email', group: ['basic', 'contact'] },  // 同时属于两个组
  { label: '技能', name: 'skills', group: 'professional' },
  { label: '简介', name: 'bio', group: 'professional' },
  { label: '电话', name: 'phone', group: 'contact' },
]}
```

### 按组渲染

```tsx
const formRef = ProForm.useRef()

// 渲染基础信息组
formRef.current?.renderGroupFields('basic')

// 渲染为描述列表（只读）
formRef.current?.renderDescriptions({ group: 'basic' })
```

### 按组校验

```tsx
const [form] = ProForm.useForm()

// 仅校验 basic 组
await form.validateGroups(['basic'])

// 校验多个组（字段如果属于 contact 组，在此也会被校验）
await form.validateGroups(['basic', 'contact'])
```

> 注意：`validateGroups` 依赖内部的 `groupRegisterMap`（字段挂载时自动注册），如果字段被 `hook` 返回 `false` 隐藏了，它不会注册到分组中。

### renderDescriptions 完整参数

`renderDescriptions` 支持丰富的配置参数，控制描述列表的展示：

```tsx
formRef.current?.renderDescriptions({
  // 基础过滤
  group: 'basic', // 只展示指定分组
  filter: (field) => !field.hidden, // 自定义过滤函数
  sort: (a, b) => a.label.localeCompare(b.label), // 排序

  // 指定要渲染的字段（数组格式，可混合字段名和配置对象）
  configs: ['name', 'phone', { label: '备注', name: 'remark', colSpan: 2 }],
  // 或对象格式覆盖特定字段
  // configs: { name: { label: '用户姓名' } },

  // antd Descriptions 配置
  descriptionsProps: {
    bordered: true,
    column: 2,
    size: 'small',
  },

  // 单项配置（可为函数）
  descriptionsItemProps: (field) => ({
    span: field.name === 'bio' ? 2 : 1,
  }),

  // 使用动态网格渲染
  gridDynamicRender: true,
})
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `group` | `string` | 按分组筛选字段 |
| `filter` | `(field) => boolean` | 自定义过滤条件 |
| `sort` | `(a, b) => number` | 自定义排序 |
| `configs` | `(FieldConfig \| NamePath)[]` 或 `Record<string, FieldConfig>` | 指定要渲染的字段列表或配置覆盖（数组时为字段名/配置的列表；对象时为覆盖 map） |
| `descriptionsProps` | `DescriptionsProps` | antd Descriptions 组件 props |
| `descriptionsItemProps` | `object \| (field) => object` | 每项的 props（支持函数按字段定制） |
| `gridDynamicRender` | `boolean` | 使用 Grid 动态渲染 |

## sharedFieldProps

所有字段共享的默认配置：

```tsx
<ProForm
  sharedFieldProps={{
    props: { allowClear: true },
    labelFontBold: true,
  }}
  fields={[
    { label: '姓名', name: 'name' }, // 自动继承 allowClear 和 labelFontBold
    { label: '部门', name: 'dept' },
  ]}
/>
```

## filterEmptyParam

获取表单值时自动过滤空值：

```tsx
<ProForm
  filterEmptyParam  // 开启空值过滤
  fields={[...]}
/>

// 或在获取值时处理
const formRef = ProForm.useRef()
const values = formRef.current?.getValues() // 自动过滤空值
```

## normalizeFieldValue

按各字段 valueType 的 `normalizeValue` 转换值（如日期格式化、数字处理等）：

```tsx
<ProForm
  normalizeFieldValue // 默认 true
  fields={[
    { label: '日期', name: 'date', type: 'date' },
    // getValues 时 date 会自动格式化为 YYYY-MM-DD 字符串
  ]}
/>
```

## ProForm.Item（自定义 FormItem）

`ProForm.Item` 替代了 antd `Form.Item`，增强了 children 为函数时的处理：

```tsx
<ProForm form={form}>
  <ProForm.Item label="自定义字段" name="custom">
    {({ value, onChange }) => <MyCustomComponent value={value} onChange={onChange} />}
  </ProForm.Item>
</ProForm>
```

## 使用 Action 提交表单

```tsx
import { Action } from '@fexd/pro-components'

<Action
  type="primary"
  onClick={async () => {
    const values = await form.validateFields()
    await api.submit(values)
    message.success('提交成功')
  }}
>
  提交
</Action>

<Action onClick={() => form.resetFields()}>重置</Action>
```

> `Action` 组件自动管理异步 onClick 的 loading 状态。

## 与 ProTable 的集成

- ProTable 的查询区域、编辑弹窗、新增弹窗内部都使用 ProForm
- 通过 ProTable 的 `queryFieldFormProps` / `editFieldFormProps` / `addFieldFormProps` 可传递 ProForm 的 props
- ProTable 内部使用 `useProFormLocales.Provider` 与 ProForm 共享 locale 体系
- `modalSelect` / `modalMultipleSelect` 字段类型可在弹窗中嵌入 ProTable
