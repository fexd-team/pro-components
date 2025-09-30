# ProForm 表单组件

## 何时使用

ProForm 是一个基于配置化的表单组件，适用于快速生成各种表单场景：

- 🎯 **配置化驱动**：通过 fields 配置快速生成表单
- 📐 **内置布局**：提供灵活的 Grid 布局系统
- 🎨 **自定义渲染**：支持完全自定义的表单布局
- 📝 **多种字段类型**：支持输入、选择、日期、上传等多种字段类型
- 👁️ **只读模式**：支持编辑/只读模式切换

## API

### ProForm

| 属性        | 说明                                    | 类型                       | 默认值 | 版本 |
| ----------- | --------------------------------------- | -------------------------- | ------ | ---- |
| form        | 表单实例，可通过 ProForm.useForm() 创建 | FormInstance               | -      |      |
| fields      | 字段配置数组                            | FieldConfig[]              | []     |      |
| gridColumns | 网格列数，控制一行显示几个字段          | number                     | 3      |      |
| gridGutter  | 网格间距，[水平间距, 垂直间距]          | [number, number] \| number | 16     |      |
| render      | 自定义渲染配置，完全控制表单布局        | RenderConfig[][]           | -      |      |
| mode        | 表单模式                                | 'edit' \| 'view'           | 'edit' |      |
| preserve    | 是否保持字段值                          | boolean                    | true   |      |

### FieldConfig 字段配置

| 属性         | 说明                       | 类型                | 默认值 |
| ------------ | -------------------------- | ------------------- | ------ |
| name         | 字段名称，支持嵌套结构     | string \| string[]  | -      |
| label        | 字段标签                   | ReactNode           | -      |
| type         | 字段类型                   | FieldType           | 'text' |
| required     | 是否必填                   | boolean             | false  |
| tooltip      | 提示信息                   | ReactNode           | -      |
| options      | 选择类字段的选项数据       | Option[]            | -      |
| props        | 传递给底层组件的属性       | Record<string, any> | -      |
| colSpan      | 在 Grid 布局中占用的列数   | number              | -      |
| initialValue | 初始值                     | any                 | -      |
| unit         | 单位（如金额字段）         | string              | -      |
| format       | 格式化字符串（如日期字段） | string              | -      |
| builtInRule  | 内置验证规则               | string              | -      |

## 字段类型

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
- `modalSelect` - 弹窗选择器

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

## 方法

| 方法名         | 说明           | 参数                                      | 返回值  |
| -------------- | -------------- | ----------------------------------------- | ------- |
| validateFields | 验证表单字段   | (nameList?: NamePath[]) => Promise\<any\> | Promise |
| resetFields    | 重置表单字段   | (fields?: NamePath[]) => void             | -       |
| setFieldsValue | 设置表单字段值 | (values: any) => void                     | -       |
| getFieldsValue | 获取表单字段值 | (nameList?: NamePath[]) => any            | 表单值  |

## 静态方法

| 方法名          | 说明         | 参数 | 返回值         |
| --------------- | ------------ | ---- | -------------- |
| ProForm.useForm | 创建表单实例 | -    | [FormInstance] |

## 布局系统

### Grid 布局

ProForm 内置基于 antd Row/Col 的 Grid 布局系统：

- `gridColumns` 控制每行显示的字段数量
- `gridGutter` 控制字段间的间距
- `colSpan` 控制单个字段占用的列数

### 自定义布局

通过 `render` 属性可以完全自定义表单布局：

- 支持二维数组配置，每个子数组代表一行
- 支持字段名称字符串、配置对象、自定义内容
- 可以精确控制每个字段的位置和样式
