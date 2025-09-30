# ProField 字段组件

## 何时使用

ProField 是 ProForm 的核心字段渲染组件，也可以独立使用：

- 🔧 **独立字段**：可以单独使用，不依赖于表单上下文
- 🎛️ **多种类型**：支持所有 ProForm 中的字段类型
- 👁️ **双模式**：支持编辑模式和查看模式
- ⚙️ **高度可配**：通过 props 传递底层组件属性
- 🎨 **样式控制**：支持 noStyle 属性去除默认样式
- 🔄 **状态管理**：可以作为受控或非受控组件使用

## API

### ProField

| 属性         | 说明                         | 类型                 | 默认值 |
| ------------ | ---------------------------- | -------------------- | ------ |
| mode         | 字段模式                     | 'edit' \| 'view'     | 'edit' |
| label        | 字段标签                     | ReactNode            | -      |
| name         | 字段名称                     | string               | -      |
| type         | 字段类型                     | FieldType            | 'text' |
| value        | 字段值（受控）               | any                  | -      |
| defaultValue | 默认值（非受控）             | any                  | -      |
| onChange     | 值变化回调                   | (value: any) => void | -      |
| options      | 选择类字段的选项数据         | Option[]             | -      |
| props        | 传递给底层组件的属性         | Record<string, any>  | -      |
| noStyle      | 是否去除样式，只渲染字段本身 | boolean              | false  |
| disabled     | 是否禁用                     | boolean              | false  |
| required     | 是否必填                     | boolean              | false  |
| placeholder  | 占位符文本                   | string               | -      |
| tooltip      | 提示信息                     | ReactNode            | -      |
| copyable     | 是否可复制（查看模式下）     | boolean              | false  |
| format       | 日期格式化字符串             | string               | -      |
| unit         | 单位（如金额字段）           | string               | -      |

## 字段类型 (Type)

ProField 支持与 ProForm 相同的所有字段类型：

### 输入类型

- `text` / `input` - 文本输入框
- `password` - 密码输入框
- `textarea` - 文本域
- `digit` / `number` - 数字输入框
- `money` - 金额输入框
- `percent` - 百分比输入框

### 选择类型

- `select` - 单选下拉框
- `multipleSelect` - 多选下拉框
- `cascader` - 级联选择器
- `treeSelect` - 树形单选
- `multipleTreeSelect` - 树形多选
- `modalSelect` - 弹窗单选
- `modalMultipleSelect` - 弹窗多选
- `checkbox` - 复选框
- `radio` - 单选框
- `radioButton` - 单选按钮

### 日期时间类型

- `date` - 日期选择器
- `dateTime` - 日期时间选择器
- `dateWeek` - 周选择器
- `dateMonth` - 月选择器
- `dateQuarter` - 季度选择器
- `dateYear` - 年份选择器
- `time` - 时间选择器
- `fromNow` - 相对时间
- `dateRange` - 日期范围选择器
- `dateTimeRange` - 日期时间范围选择器
- `dateWeekRange` - 周范围选择器
- `dateMonthRange` - 月范围选择器
- `dateQuarterRange` - 季度范围选择器
- `dateYearRange` - 年份范围选择器
- `timeRange` - 时间范围选择器
- `fromNowRange` - 相对时间范围

### 其他类型

- `switch` - 开关
- `rate` - 评分
- `image` - 图片
- `upload` - 上传
- `tree` - 树形选择器
- `singleTree` - 树形单选器
- `slider` - 滑块
- `transfer` - 穿梭框

## 使用场景

### 独立使用

ProField 可以脱离表单上下文独立使用，适合需要单个字段渲染的场景。

### 表单组件

作为 ProForm 的基础组件，所有表单字段最终都是通过 ProField 渲染的。

### 查看模式

通过设置 `mode="view"` 可以将字段渲染为只读模式，适合数据展示场景。

### 自定义控件

通过 `props` 属性可以传递任意属性给底层组件，实现高度自定义。

## 与 ProForm 的关系

ProField 是 ProForm 的基础构建块：

- ProForm 中的每个字段都是通过 ProField 渲染的
- ProField 可以独立使用，不需要 ProForm 上下文
- 两者共享相同的字段类型系统和 API 设计

## 注意事项

1. **模式切换**：edit 和 view 模式下组件行为完全不同
2. **类型安全**：确保 value 的类型与字段类型匹配
3. **样式控制**：使用 noStyle 时需要自行处理布局
4. **选项数据**：选择类字段需要提供正确的 options 格式
