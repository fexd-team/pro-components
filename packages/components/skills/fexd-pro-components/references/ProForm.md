---
name: ProForm
description: 配置化表单组件，提供灵活的 Grid/自定义布局、丰富的字段类型、编辑/只读模式切换
---

# ProForm 表单组件

> 核心组件，详细文档已拆分为子文件，按需查阅。

## 子文档导航

| 文档                                      | 内容                                                                    |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| [ProForm-ref](./ProForm-ref.md)           | Ref 方法、useRef、useForm、createForm、静态方法、表单实例完整能力       |
| [ProForm-fields](./ProForm-fields.md)     | 所有字段类型详解——输入/选择/日期/其他、FieldConfig 完整 API、自定义字段 |
| [ProForm-layout](./ProForm-layout.md)     | Grid 布局、render 自由布局、二维 fields、colSpan、内联 label            |
| [ProForm-advanced](./ProForm-advanced.md) | 校验、关联（hook/dependencies）、分组（group）、编辑/只读模式、动态渲染 |

## 快速上手

```tsx
import { ProForm, Action } from '@fexd/pro-components'

const MyForm = () => {
  const [form] = ProForm.useForm()

  return (
    <>
      <ProForm
        form={form}
        gridColumns={3}
        fields={[
          { label: '姓名', name: 'name', type: 'text', required: true },
          { label: '部门', name: 'dept', type: 'select', options: deptOptions },
          { label: '入职日期', name: 'joinDate', type: 'date' },
          { label: '备注', name: 'remark', type: 'textarea', colSpan: 3 },
        ]}
      />
      <Action
        type="primary"
        onClick={async () => {
          const values = await form.validateFields()
          await api.submit(values)
        }}
      >
        提交
      </Action>
    </>
  )
}
```

## 核心 Props 速查

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 表单实例 | `ProFormInstance` | 内部自动创建 |
| formRef | 表单 ref（与 ref 指向同一对象） | `Ref<ProFormInternalParams>` | - |
| fields | 字段配置数组（一维或二维） | `FieldConfig[] \| FieldConfig[][]` | `[]` |
| mode | 表单模式 | `'edit' \| 'view'` | `'edit'` |
| gridColumns | 网格列数 | `number` | `3` |
| gridGutter | 网格间距 | `RowProps['gutter']` | `size==='small' ? 12 : 16` |
| gridDynamicRender | 动态渲染（带 hook 的字段延迟批处理） | `boolean` | `false` |
| render | 自定义布局 | `RenderConfig[][] \| Function` | - |
| children | 子节点（可为函数或配置数组） | `ReactNode \| Function \| Array` | - |
| filterEmptyParam | 获取值时过滤空参数 | `boolean` | `false` |
| normalizeFieldValue | 归一化字段值 | `boolean` | `true` |
| sharedFieldProps | 所有字段共享的默认配置 | `FieldConfig` | `{}` |
| preserve | 是否保留未挂载字段值 | `boolean` | `false`（**非 true**） |
| layout | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'vertical'` |
| localeKey | 国际化 key | `string` | - |

> **重要纠错**：`preserve` 默认值源码为 `false`（MCP 旧文档标注 `true` 不准确）

## FieldConfig 核心字段速查

| 属性         | 说明                             | 类型                          |
| ------------ | -------------------------------- | ----------------------------- |
| name         | 字段名，支持嵌套路径             | `string \| string[]`          |
| label        | 标签                             | `ReactNode`                   |
| type         | 字段类型                         | `ValueType`                   |
| required     | 必填（字符串=自定义提示）        | `boolean \| string`           |
| options      | 选项（数组/对象/异步函数）       | `EnumData[] \| () => Promise` |
| props        | 透传给底层 antd 组件             | `object`                      |
| rules        | 校验规则                         | `Rule[]`                      |
| builtInRule  | 内置校验规则                     | `string`                      |
| placeholder  | 占位符                           | `string`                      |
| tooltip      | 提示信息                         | `ReactNode`                   |
| colSpan      | Grid 占用列数                    | `number`                      |
| initialValue | 初始值                           | `any`                         |
| format       | 格式化字符串                     | `string`                      |
| unit         | 单位                             | `string`                      |
| disabled     | 禁用                             | `boolean`                     |
| hidden       | 隐藏                             | `boolean`                     |
| mode         | 单字段模式覆盖                   | `'edit' \| 'view'`            |
| copyable     | 只读模式下可复制                 | `boolean`                     |
| hook         | 动态关联函数（可写 React Hooks） | `(params) => config \| false` |
| dependencies | hook 的依赖字段                  | `string[]`                    |
| group        | 分组名                           | `string`                      |
| renderField  | 自定义字段渲染                   | `(params) => ReactNode`       |
| renderView   | 自定义只读渲染                   | `(params) => ReactNode`       |

详见 [ProForm-fields](./ProForm-fields.md)

## 字段类型概览

**输入**：text/input, password, textarea, digit/number, money, percent **选择**：select, multipleSelect, cascader, treeSelect, multipleTreeSelect, modalSelect, modalMultipleSelect, checkbox, radio, radioButton **日期时间**：date, dateTime, dateWeek, dateMonth, dateQuarter, dateYear, time, fromNow + 对应 Range 系列 **其他**：switch, rate, image, upload, slider, transfer, tree, singleTree

## 注意事项

- `ProForm.useForm()` 返回数组 `[form]`，不是对象
- `gridColumns` 下的 `colSpan` 表示占几列；`render` 下的 `colSpan` 是 24 栅格值
- `preserve` 默认 `false`，未挂载字段值不保留
- `mode='view'` 时字段切换为只读展示
- `render` / `children` 可为函数，返回值若为数组会再走 `renderFields`
- `fields` 二维数组第一维为行（走自由布局）
- `form` 实例上有额外的 `validateGroups(groups)` 方法
