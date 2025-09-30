# ProTable 查询功能

## 功能概述

ProTable 查询功能提供了强大的数据筛选能力，集成查询表单，支持多种查询字段类型和布局，可以与表格数据实现无缝联动。

## 主要特性

- 🔍 **集成查询表单**：内置查询区域，支持多种查询字段类型
- 🎛️ **灵活布局**：支持水平、垂直、内联等多种布局方式
- 💾 **参数持久化**：支持查询参数的本地存储和会话存储
- ⚡ **实时查询**：支持手动查询和自动查询模式
- 🔄 **自动刷新**：重置后可自动刷新数据
- 📱 **响应式设计**：查询表单支持响应式布局

## 查询相关 API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onQuery | 查询动作，返回表格数据 | (params: any, extraParams: any) => Promise\<ProTableResponse\<T[]\>\> | - |
| manualQuery | 是否手动请求 | boolean | false |
| queryAfterPaginationChange | 页数改变时调用查询方法 | boolean | true |
| hideColumnsWhenNoData | 数据为空时隐藏所有列 | boolean | false |

## 查询表单配置 API

| 属性              | 说明                     | 类型                                   | 默认值     |
| ----------------- | ------------------------ | -------------------------------------- | ---------- |
| queryFields       | 单独配置查询表单         | QueryField[]                           | -          |
| queryFieldColumns | 查询表单一行显示的字段数 | number                                 | 4          |
| queryFieldGutter  | 栅格间隔                 | number \| object \| array              | 0          |
| queryFieldLayout  | 表单布局                 | 'horizontal' \| 'inline' \| 'vertical' | 'vertical' |
| queryFieldOrder   | 查询表单项的排序         | string[]                               | -          |
| hideQueryFields   | 是否隐藏查询表单         | boolean                                | false      |

## 查询行为配置 API

| 属性                        | 说明                   | 类型    | 默认值 |
| --------------------------- | ---------------------- | ------- | ------ |
| queryFieldFilterEmptyParam  | 是否过滤查询表单空参数 | boolean | false  |
| queryFieldRefreshAfterReset | 重置后是否刷新         | boolean | true   |
| queryFieldTriggerOnEnter    | 是否回车触发查询       | boolean | true   |
| queryFieldDefaultLines      | 查询表单默认展示行数   | number  | 1      |
| queryFieldDefaultLength     | 查询表单默认展示字段数 | number  | -      |

## 查询持久化 API

| 属性                  | 说明           | 类型                               | 默认值           |
| --------------------- | -------------- | ---------------------------------- | ---------------- |
| queryFieldPersistKey  | 参数持久化 key | string                             | -                |
| queryFieldPersistType | 参数持久化类型 | 'sessionStorage' \| 'localStorage' | 'sessionStorage' |

## 自定义渲染 API

| 属性              | 说明           | 类型                                          | 默认值 |
| ----------------- | -------------- | --------------------------------------------- | ------ |
| renderQueryFields | 自定义查询区域 | (params: QueryFieldRenderParams) => ReactNode | -      |

## QueryField 查询字段配置

| 属性         | 说明                         | 类型       | 默认值 |
| ------------ | ---------------------------- | ---------- | ------ |
| label        | 字段标签                     | ReactNode  | -      |
| name         | 字段名称                     | string     | -      |
| type         | 字段类型                     | ValueType  | 'text' |
| placeholder  | 占位符                       | string     | -      |
| options      | 选项数据（选择类型字段使用） | EnumData[] | -      |
| required     | 是否必填                     | boolean    | false  |
| defaultValue | 默认值                       | any        | -      |
| hidden       | 是否隐藏                     | boolean    | false  |
| span         | 栅格占位格数                 | number     | -      |

## Column 中的查询配置

在列配置中可以通过 `queryField` 属性配置该字段在查询区域的行为：

| 属性       | 说明                   | 类型                        | 默认值 |
| ---------- | ---------------------- | --------------------------- | ------ |
| queryField | 此字段在查询区域的配置 | boolean \| QueryFieldConfig | -      |

### QueryFieldConfig 配置

| 属性         | 说明         | 类型      | 默认值 |
| ------------ | ------------ | --------- | ------ |
| type         | 查询字段类型 | ValueType | -      |
| placeholder  | 占位符       | string    | -      |
| defaultValue | 默认值       | any       | -      |
| hidden       | 是否隐藏     | boolean   | false  |
| span         | 栅格占位格数 | number    | -      |
| order        | 排序权重     | number    | -      |

## 查询字段类型

### 输入类型

- `text` - 文本输入
- `textarea` - 多行文本
- `digit` - 数字输入
- `password` - 密码输入

### 选择类型

- `select` - 单选下拉框
- `multipleSelect` - 多选下拉框
- `cascader` - 级联选择
- `treeSelect` - 树形单选
- `multipleTreeSelect` - 树形多选
- `radio` - 单选框
- `checkbox` - 复选框

### 日期时间类型

- `date` - 日期选择
- `dateTime` - 日期时间选择
- `dateRange` - 日期范围选择
- `dateTimeRange` - 日期时间范围选择
- `dateWeek` - 周选择
- `dateMonth` - 月选择
- `dateYear` - 年选择
- `time` - 时间选择
- `timeRange` - 时间范围选择

### 其他类型

- `switch` - 开关
- `slider` - 滑块

## 响应数据格式

查询方法期望的响应格式：

```typescript
interface ProTableResponse<T = any> {
  success: boolean
  data?: T
  message?: any
  total?: number // 分页总数
}
```

## 使用场景

- 数据列表筛选
- 复杂条件查询
- 报表数据过滤
- 用户管理系统
- 订单管理系统
