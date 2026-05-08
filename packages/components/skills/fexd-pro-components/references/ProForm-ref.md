---
name: ProForm-ref
description: ProForm Ref 完整方法、静态方法、useForm、useRef、createForm、表单实例
---

# ProForm Ref 与静态方法

## 获取 Ref 的方式

### 1. ProForm.useRef() / useProFormRef()

```tsx
import { ProForm, useProFormRef } from '@fexd/pro-components'

const MyForm = () => {
  const formRef = useProFormRef() // 或 ProForm.useRef()

  return <ProForm ref={formRef} fields={[...]} />
}
```

### 2. formRef prop

`formRef` 与 `ref` 指向**同一个** imperative handle。

```tsx
const formRef = ProForm.useRef()

<ProForm formRef={formRef} fields={[...]} />
```

### 3. ProForm.createRef()

不在 Hook 上下文中时使用。

```tsx
const formRef = ProForm.createRef()
```

## Ref 暴露的完整能力

`ref.current` / `formRef.current` 指向 `ProFormInternalParams` 对象：

| 属性/方法                                | 说明                                                   |
| ---------------------------------------- | ------------------------------------------------------ |
| `form`                                   | `ProFormInstance`（增强版 antd FormInstance，见下文）  |
| `antdFormRef`                            | 底层 antd `Form` 的原始 ref                            |
| `fieldsMapRef`                           | 各字段 ProField 的 ref 映射（按字段名）                |
| `fieldsMap`                              | 合并 mode 后的字段配置映射（同名后者覆盖）             |
| **`getValues()`**                        | 获取值（**带校验**） + normalizeValues + filterEmpty   |
| **`getFieldsValue()`**                   | 获取值（**不带校验**） + normalizeValues + filterEmpty |
| **`normalizeValues(values)`**            | 按各字段 valueType 归一化值                            |
| **`renderField(config, override?)`**     | 渲染单个字段（传 name 或 FieldConfig）                 |
| **`renderFields(configs?, options?)`**   | 渲染多个字段                                           |
| **`renderGroupFields(group, options?)`** | 按分组渲染字段                                         |
| **`renderDescriptions(options?)`**       | 只读描述列表布局（antd Descriptions）                  |

> **注意**：`getFieldsValue` 和 `normalizeValues` 在 TypeScript 类型定义中缺失，使用时可能需要 `as any`。

### getValues vs getFieldsValue

```tsx
const formRef = ProForm.useRef()

// 带校验 —— 校验通过才返回值，失败时 reject（需 try/catch）
try {
  const values = await formRef.current?.getValues()
  await api.submit(values)
  message.success('提交成功')
} catch (err) {
  // 校验失败，表单自动显示错误提示，无需额外处理
}

// 不带校验 —— 同步获取当前值
const values = formRef.current?.getFieldsValue()

// 两者都会：
// 1. 调用 normalizeValues（按 valueType 转换值）
// 2. 如果 filterEmptyParam=true，过滤空值
```

### renderField / renderFields

在 ProForm 外部手动渲染字段：

```tsx
const formRef = ProForm.useRef()

// 渲染单个字段（传 name）
formRef.current?.renderField('username')

// 渲染单个字段（传 config + 覆盖）
formRef.current?.renderField({ name: 'username', type: 'text' }, { required: true })

// 渲染多个字段
formRef.current?.renderFields([
  { name: 'username', type: 'text' },
  { name: 'email', type: 'text' },
])
```

### renderGroupFields

按 group 分组渲染：

```tsx
// fields 中设置 group
fields={[
  { label: '姓名', name: 'name', group: 'basic' },
  { label: '邮箱', name: 'email', group: 'basic' },
  { label: '技能', name: 'skills', group: 'advanced' },
]}

// 分组渲染
formRef.current?.renderGroupFields('basic')
formRef.current?.renderGroupFields('advanced')
```

### renderDescriptions

以只读描述列表形式渲染：

```tsx
// 渲染所有字段的描述列表
formRef.current?.renderDescriptions()

// 渲染指定分组
formRef.current?.renderDescriptions({ group: 'basic' })
```

## ProFormInstance（表单实例）

通过 `ProForm.useForm()` 创建的实例，在 antd `FormInstance` 基础上增加：

| 方法                       | 说明                                          |
| -------------------------- | --------------------------------------------- |
| validateFields(...)        | 校验并获取值（antd 原生）                     |
| resetFields(...)           | 重置字段（增强版：会触发 dependencies）       |
| setFieldsValue(values)     | 设置值（增强版：会触发 dependencies）         |
| getFieldsValue(...)        | 获取值（antd 原生）                           |
| getFieldValue(name)        | 获取单个字段值                                |
| setFieldValue(name, value) | 设置单个字段值（增强版：会触发 dependencies） |
| scrollToField(name)        | 滚动到指定字段                                |
| getFieldInstance(name)     | 获取字段实例                                  |
| **validateGroups(groups)** | 按分组校验（传入分组名数组）                  |

> `setFieldValue` / `resetFields` 经过 patch，会自动触发 dependencies 重新计算（与原生 rc-field-form 行为不同）。

### validateGroups

```tsx
const [form] = ProForm.useForm()

// 仅校验 basic 分组
await form.validateGroups(['basic'])

// 校验多个分组
await form.validateGroups(['basic', 'advanced'])
```

## createForm

创建不依赖 Hook 的表单实例（用于 class 组件或外部逻辑）。

```tsx
import { createForm } from '@fexd/pro-components'

const form = createForm()

// 与 useForm 返回的实例能力相同
form.setFieldsValue({ name: '张三' })
form.validateFields()
form.validateGroups(['basic'])
```

## 静态方法一览

| 静态方法                               | 说明                                                        |
| -------------------------------------- | ----------------------------------------------------------- |
| `ProForm.useForm()`                    | 创建表单实例 Hook（返回 `[form]` 数组）                     |
| `ProForm.useRef()`                     | 创建 ref Hook                                               |
| `ProForm.createRef()`                  | 非 Hook 方式创建 ref                                        |
| `ProForm.createForm()`                 | 非 Hook 方式创建 form 实例                                  |
| `ProForm.useValues()`                  | 订阅 form watch，返回当前全量 values                        |
| `ProForm.Item`                         | 自定义 FormItem（替代 antd Form.Item）                      |
| `ProForm.defineCoverableProps(config)` | 定义 coverable props                                        |
| `ProForm.useCoverableProps(config)`    | Coverable props Hook（自动保护 `ref`/`formRef`/`tableRef`） |
| `ProForm.coloringOptions(options)`     | 给选项列表染色                                              |

> `ProForm` 通过 `hoist-non-react-statics` 继承了 antd `Form` 的静态成员，但 `Form.Item` 被替换为自定义 `FormItem`。

## useValues

实时订阅表单值变化：

```tsx
const [form] = ProForm.useForm()
const values = ProForm.useValues(form)

useEffect(() => {
  console.log('表单值变化：', values)
}, [values])
```

## coloringOptions

给 options 列表添加颜色标记：

```tsx
const statusOptions = ProForm.coloringOptions([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
])
```

## 全局注册值类型

```tsx
import { registerValueType } from '@fexd/pro-components'

registerValueType('richText', {
  renderField: ({ fieldProps }) => <RichEditor {...fieldProps} />,
  renderView: ({ value }) => <div dangerouslySetInnerHTML={{ __html: value }} />,
  normalizeValue: (value) => value?.trim(),
})

// 注册后即可在 fields 中使用
fields={[
  { label: '内容', name: 'content', type: 'richText' },
]}
```

> 运行时 `registerValueType` 后，已挂载的字段会通过 `useUpdateAfterValueTypeAdd` 自动刷新。

## 在 coverable 组件中安全使用 ref

`ProForm.useCoverableProps` 会自动提取 `ref` / `formRef`，使其绕过 coverable 的 clone/merge 链路。

```tsx
const CoverableSettingsForm = useCoverable.component((props, ref) => {
  const formRef = ProForm.useRef()
  const formProps = ProForm.useCoverableProps({
    ref: formRef,           // ✅ 安全：自动提取，不经过 cloneDeep
    fields: [
      { label: '名称', name: 'name', type: 'text' },
    ],
  })

  return useCoverable.props({ formProps }).render(() => (
    <div>
      <ProForm {...formProps.getProps()} />
      <Button onClick={async () => {
        const values = await formRef.current?.getValues()
        console.log(values)
      }}>提交</Button>
    </div>
  ))
})

// 父组件可通过 coverable 覆盖 formRef
<CoverableSettingsForm coverable={{ formProps: { formRef: parentRef } }} />
```
