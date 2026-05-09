---
name: ProField
description: 字段组件，可独立使用，支持多种字段类型和编辑/查看双模式
---

# ProField 字段组件

## 何时使用

- 独立字段渲染，不依赖表单上下文
- 数据展示场景（view 模式）
- 自定义字段组件开发

## API

| 属性         | 说明                     | 类型                  | 默认值 |
| ------------ | ------------------------ | --------------------- | ------ |
| mode         | 字段模式                 | 'edit' \| 'view'      | 'edit' |
| label        | 字段标签                 | ReactNode             | -      |
| name         | 字段名称                 | string                | -      |
| type         | 字段类型                 | FieldType             | 'text' |
| value        | 字段值（受控）           | any                   | -      |
| defaultValue | 默认值（非受控）         | any                   | -      |
| onChange     | 值变化回调               | (value: any) => void  | -      |
| options      | 选择类字段选项           | Option[]              | -      |
| props        | 传递给底层组件的属性     | Record\<string, any\> | -      |
| noStyle      | 去除样式，只渲染字段本身 | boolean               | false  |
| disabled     | 是否禁用                 | boolean               | false  |
| required     | 是否必填                 | boolean               | false  |
| placeholder  | 占位符                   | string                | -      |
| tooltip      | 提示信息                 | ReactNode             | -      |
| copyable     | 可复制（view 模式）      | boolean               | false  |
| format       | 日期格式化字符串         | string                | -      |
| unit         | 单位                     | string                | -      |

## 代码示例

### 独立使用

```tsx
import { ProField } from '@fexd/pro-components'

export default () => (
  <div>
    <ProField label="姓名" name="name" type="text" value="张三" />
    <ProField label="部门" name="dept" type="select" options={[{ label: '技术部', value: 'tech' }]} value="tech" />
    <ProField label="入职日期" name="date" type="date" value="2023-01-01" />
  </div>
)
```

### 编辑/查看模式切换

```tsx
const [mode, setMode] = useState('edit')

<ProField mode={mode} label="姓名" name="name" type="text" value={name} onChange={setName} />
<ProField mode={mode} label="金额" name="amount" type="money" value={amount} unit="元" />
```

### noStyle 模式（保留表单绑定，去除视觉容器）

`noStyle` 是 antd Form.Item 的原生属性。设置后 Form.Item 仍然存在（保持 name → form 的值绑定），但**不渲染**任何外层容器、label、校验提示等：

```tsx
// 仍与 form 绑定（name 值会存到 form 中），但只渲染纯 Select
<ProField noStyle name="status" type="select" options={options} />
```

适用场景：

- 在自定义布局中嵌入表单字段，不需要标准的 Form.Item 外观
- 组合多个字段为一行（用自己的容器布局，各字段设 `noStyle`）

### static 模式（完全无 Form.Item，仅渲染值）

`static` 模式仅在 **view（只读）模式** 下生效。设为 true 时完全跳过 Form.Item 包裹，直接输出值内容：

```tsx
import { ReadonlyProField } from '@fexd/pro-components'

// 纯渲染值，无任何 Form.Item 包裹
;<ReadonlyProField static type="select" options={statusOptions} value={1} />
```

> ProTable 内部列渲染就使用 `<ReadonlyProField static />` 实现轻量化。

自动触发条件：在 view 模式下，如果同时满足 `!form && !name && !label`（无表单上下文、无字段名、无标签），也会自动进入 static 模式：

```tsx
// 以下等同于 static 模式（view 模式 + 无 form + 无 name + 无 label）
<ProField mode="view" type="date" value="2024-01-01" format="YYYY年MM月DD日" />
```

### 三种"纯组件"模式对比

| 模式      | 写法                                          | Form.Item    | 表单绑定             | 适用模式    |
| --------- | --------------------------------------------- | ------------ | -------------------- | ----------- |
| `noStyle` | `<ProField noStyle name="x" ... />`           | 存在但不可见 | 有（name 绑定 form） | edit + view |
| `static`  | `<ReadonlyProField static ... />`             | 完全不存在   | 无                   | 仅 view     |
| 自动 pure | `<ProField mode="view" />` 无 name/label/form | 完全不存在   | 无                   | 仅 view     |

## Props 透传机制（重要）

ProField 内部由两层构成：**Form.Item**（表单项容器）+ **底层 antd 组件**（如 Input、Select）。不同的 props 会分别透传到不同层级：

### 分层规则

```
ProField props
├─→ Form.Item 层（表单项容器）
│   ├── label, name, rules, required, initialValue
│   ├── tooltip, hidden, dependencies, shouldUpdate
│   ├── className, style, colon, extra, help
│   ├── fieldItemProps（显式传给 Form.Item 的额外 props）
│   └── ...其余未被单独处理的顶层 props（默认都跟 Form.Item）
│
└─→ 底层组件层（antd Input/Select/DatePicker 等）
    ├── props（显式传给底层组件的属性对象）
    ├── disabled, placeholder（自动向下传递）
    ├── options（选择类组件）
    ├── format（日期类组件）
    └── initialValue → defaultValue（转换后传入）
```

### 关键区分

| 目标层         | 使用方式                                  | 示例                                                  |
| -------------- | ----------------------------------------- | ----------------------------------------------------- |
| 底层 antd 组件 | `props: { ... }`                          | `props: { maxLength: 11, allowClear: true }`          |
| Form.Item      | 直接写在顶层 或 `fieldItemProps: { ... }` | `rules: [...]` 或 `fieldItemProps: { extra: '提示' }` |

### 默认行为：剩余 props → Form.Item

**重要**：ProField 的解构逻辑中，除 `props`、`type`、`options`、`renderField`、`renderView`、`disabled`、`placeholder`、`children`、`hook`、`copyable`、`lazyRender`、`labelFontBold`、`labelClassName`、`labelStyle` 等被单独处理的属性外，**所有其他顶层属性都默认透传给 Form.Item**。

底层组件 **不会** 自动继承顶层属性，必须通过 `props` 显式传入。

### 代码示例

```tsx
// ❌ 错误：maxLength 会被传给 Form.Item（无效），不会到 Input
{ label: '姓名', name: 'name', type: 'text', maxLength: 10 }

// ✅ 正确：通过 props 传给底层 Input
{ label: '姓名', name: 'name', type: 'text', props: { maxLength: 10 } }

// ❌ 错误：extra 放在 props 里会传给 Input（无效）
{ label: '姓名', name: 'name', type: 'text', props: { extra: '请输入真实姓名' } }

// ✅ 正确：extra 直接写在顶层（会透传给 Form.Item）
{ label: '姓名', name: 'name', type: 'text', extra: '请输入真实姓名' }

// ✅ 也可以通过 fieldItemProps 显式传给 Form.Item
{ label: '姓名', name: 'name', type: 'text', fieldItemProps: { extra: '请输入真实姓名' } }
```

### 完整示例：同时配置两层

```tsx
{
  // Form.Item 层
  label: '手机号',
  name: 'phone',
  required: '请输入手机号',
  rules: [{ pattern: /^1\d{10}$/, message: '手机号格式不正确' }],
  tooltip: '用于接收验证码',
  fieldItemProps: {
    extra: <span style={{ color: '#999' }}>仅限中国大陆手机号</span>,
  },

  // 底层组件层
  type: 'text',
  placeholder: '请输入手机号',
  disabled: false,
  props: {
    maxLength: 11,
    addonBefore: '+86',
    allowClear: true,
    onChange: (e) => console.log(e.target.value),
  },
}
```

### disabled 和 placeholder 的特殊性

`disabled` 和 `placeholder` 是两个特殊属性——它们写在顶层，但会**同时**向底层组件传递：

```tsx
// disabled 同时影响 Form.Item 的展示状态和底层组件的禁用状态
{ label: '姓名', name: 'name', type: 'text', disabled: true }

// 等同于
{ label: '姓名', name: 'name', type: 'text', props: { disabled: true } }
```

### renderField 中的 fieldProps

使用 `renderField` 自定义渲染时，回调参数中的 `fieldProps` 已经是合并后的完整底层组件 props：

```tsx
{
  label: '自定义', name: 'custom', type: 'text',
  disabled: true,
  placeholder: '请输入',
  props: { maxLength: 20, allowClear: true },
  renderField: ({ fieldProps }) => {
    // fieldProps 已包含：{ disabled: true, placeholder: '请输入', maxLength: 20, allowClear: true, ... }
    return <Input {...fieldProps} />
  },
}
```

### 按类型查看 props 透传目标

| type              | 底层组件          | `props` 中常用属性                                                         |
| ----------------- | ----------------- | -------------------------------------------------------------------------- |
| `text`            | Input             | `maxLength`, `addonBefore`, `addonAfter`, `allowClear`, `prefix`, `suffix` |
| `textarea`        | Input.TextArea    | `rows`, `maxLength`, `showCount`, `autoSize`                               |
| `digit`/`number`  | InputNumber       | `min`, `max`, `step`, `precision`, `addonBefore`, `addonAfter`             |
| `select`          | Select            | `showSearch`, `allowClear`, `mode`, `maxTagCount`, `filterOption`          |
| `multipleSelect`  | Select (multiple) | 同上 + `maxTagCount`, `tokenSeparators`                                    |
| `treeSelect`      | TreeSelect        | `showSearch`, `treeCheckable`, `treeDefaultExpandAll`                      |
| `date`/`dateTime` | DatePicker        | `disabledDate`, `showTime`, `picker`                                       |
| `dateRange`       | RangePicker       | `disabledDate`, `showTime`, `ranges`                                       |
| `switch`          | Switch            | `checkedChildren`, `unCheckedChildren`                                     |
| `upload`          | Upload            | `action`, `accept`, `maxCount`, `listType`                                 |
| `cascader`        | Cascader          | `showSearch`, `changeOnSelect`, `expandTrigger`                            |

## 独立导出的 ProField 变体

### EditableProField

可编辑态的 ProField，等价于 `<ProField mode="edit" />`，但作为独立命名导出，便于非表单场景中使用：

```tsx
import { EditableProField } from '@fexd/pro-components'

// 在自定义布局中使用编辑态字段（不依赖 ProForm 上下文）
;<EditableProField type="select" options={statusOptions} value={selected} onChange={setSelected} />
```

### Remote\* 系列组件

选择类 ProField 的底层实现组件，可独立使用：

```tsx
import { RemoteSelect, RemoteTreeSelect, RemoteCheckbox, RemoteRadio } from '@fexd/pro-components'

// 独立使用远程 Select（脱离 Form 上下文）
<RemoteSelect
  options={async () => {
    const res = await api.getDepts()
    return res.data.map(d => ({ label: d.name, value: d.id }))
  }}
  value={selected}
  onChange={setSelected}
  showSearch
/>

// 独立使用远程 TreeSelect
<RemoteTreeSelect
  options={treeService}
  treeCheckable
  value={checkedKeys}
  onChange={setCheckedKeys}
/>
```

这些组件统一支持 `options` 为静态数组、`useRequest` 结果或 async 函数。

### CopyButton

内置的复制按钮组件，ProField readonly 模式下 `copyable` 功能的底层实现：

```tsx
import { CopyButton } from '@fexd/pro-components'
;<CopyButton text="要复制的内容" />
```

## 与 ProForm 的关系

- ProField 是 ProForm 的基础构建块
- ProForm 中的每个字段都通过 ProField 渲染
- ProField 可以独立使用，不需要 ProForm 上下文
- 两者共享相同的字段类型系统
- ProForm 的 `fields` 数组每一项就是 `ProFieldValueFieldType`，整体作为 ProField 的 props

## 字段类型

与 ProForm 支持相同的所有字段类型，详见 [ProForm-fields.md](ProForm-fields.md) 的字段类型章节。

## 注意事项

1. edit 和 view 模式下组件行为完全不同
2. 确保 value 的类型与字段类型匹配
3. 使用 noStyle 时需要自行处理布局
4. 选择类字段需要提供正确的 options 格式
5. **底层组件的 props 必须通过 `props` 字段传入**，直接写在顶层不会生效（会被传给 Form.Item）
6. `fieldItemProps` 可显式传 Form.Item 额外属性，但通常直接写顶层即可（默认行为）
