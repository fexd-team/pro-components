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

### noStyle 模式

```tsx
<ProField noStyle type="select" options={options} value={value} onChange={setValue} />
```

## 与 ProForm 的关系

- ProField 是 ProForm 的基础构建块
- ProForm 中的每个字段都通过 ProField 渲染
- ProField 可以独立使用，不需要 ProForm 上下文
- 两者共享相同的字段类型系统

## 字段类型

与 ProForm 支持相同的所有字段类型，详见 [ProForm.md](ProForm.md) 的字段类型章节。

## 注意事项

1. edit 和 view 模式下组件行为完全不同
2. 确保 value 的类型与字段类型匹配
3. 使用 noStyle 时需要自行处理布局
4. 选择类字段需要提供正确的 options 格式
