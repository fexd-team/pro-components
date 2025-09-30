# ProTable 基础表格功能

## 功能概述

ProTable 基础表格功能提供了数据展示的核心能力，包括列配置、分页、排序等基础表格功能。

## 主要特性

- 📊 **数据展示**：支持各种数据类型的展示，包含丰富的 valueType 类型
- 📑 **列配置**：灵活的列配置选项，支持宽度、对齐方式、固定等设置
- 📄 **分页功能**：内置分页器，支持自定义分页参数
- 🔢 **序号显示**：支持显示数据序号，可选择是否按页累加
- 📱 **响应式表格**：基础的响应式支持
- 🎨 **样式定制**：支持表格大小、边框、背景色等样式定制

## 基础 API

| 属性              | 说明                                | 类型                           | 默认值  |
| ----------------- | ----------------------------------- | ------------------------------ | ------- |
| dataSource        | 自定义数据源，设置后 onQuery 将失效 | object[]                       | -       |
| columns           | 表格列的配置描述                    | Column[]                       | -       |
| title             | 表格标题                            | string \| ReactNode            | -       |
| pure              | 是否纯表格，去除外部边框和边距      | boolean                        | false   |
| mini              | 是否迷你模式                        | boolean                        | false   |
| defaultSize       | 表格大小                            | 'large' \| 'middle' \| 'small' | 'large' |
| sticky            | 设置粘性头部和滚动条                | boolean \| StickyConfig        | -       |
| noBackgroundColor | 不设置外部区域的背景颜色            | boolean                        | false   |
| tableExtraRender  | 表格上方需要额外渲染的内容          | ReactNode                      | -       |

## 分页相关 API

| 属性                    | 说明                           | 类型                                 | 默认值 |
| ----------------------- | ------------------------------ | ------------------------------------ | ------ |
| pagination              | 分页器配置，false 时不显示分页 | object \| false                      | -      |
| initialPaginationParams | 初始分页参数                   | { page?: number; pageSize?: number } | -      |
| defaultPageSize         | 初始每页数量                   | number                               | -      |
| unknownDataLength       | 开启无 total 分页              | boolean                              | false  |

## 数据序号相关 API

| 属性                        | 说明                 | 类型    | 默认值 |
| --------------------------- | -------------------- | ------- | ------ |
| showDataSourceIndex         | 是否展示数据序号     | boolean | false  |
| dataSourceIndexCalcWithPage | 数据序号是否按页累加 | boolean | true   |
| dataSourceIndexColumnConfig | 序号列的配置项       | Column  | -      |

## Column 列配置

| 属性       | 说明                        | 类型               | 默认值 |
| ---------- | --------------------------- | ------------------ | ------ |
| label      | 列头显示文字                | ReactNode          | -      |
| name       | 列数据在数据项中对应的路径  | string \| string[] | -      |
| width      | 列宽度                      | string \| number   | -      |
| tooltip    | 在 label 右侧显示的提示信息 | ReactNode          | -      |
| type       | 值的类型                    | ValueType          | 'text' |
| options    | 给值做映射的枚举值数据      | EnumData[]         | -      |
| hidden     | 是否隐藏此列                | boolean            | false  |
| copyable   | 是否支持复制                | boolean            | false  |
| expandView | 是否展开拓展内容            | boolean            | false  |

## 字段类型 (ValueType)

### 基础类型

- `text` - 文本
- `digit` - 数字
- `money` - 金额
- `percent` - 百分比

### 日期时间类型

- `date` - 日期
- `dateTime` - 日期时间
- `time` - 时间
- `fromNow` - 相对时间

### 其他类型

- `image` - 图片
- `switch` - 开关
- `rate` - 评分

## 使用场景

- 数据列表展示
- 报表数据呈现
- 简单的数据浏览
- 静态数据表格
