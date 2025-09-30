# ProTable 表格组件

## 何时使用

ProTable 是一个功能强大的表格组件，提供了完整的数据展示和操作解决方案：

- 📊 **数据展示**：支持各种数据类型的展示，包含丰富的 valueType 类型
- 🔍 **内置查询**：集成查询表单，支持多种查询字段类型和布局
- ✏️ **内置编辑**：支持弹窗编辑、表格内编辑、批量编辑等多种编辑方式
- 🎬 **丰富动作**：内置新增、编辑、删除、查看等常用动作
- 📱 **响应式**：支持不同屏幕尺寸的自适应显示
- 🔧 **插件化**：基于插件系统，功能模块化，支持自定义扩展

## API

ProTable 的 API 分为四大类：**基础 API**、**表格数据相关 API**、**查询表单相关 API**、**操作相关 API**。

### 基础 API

| 属性              | 说明                           | 类型                           | 默认值  |
| ----------------- | ------------------------------ | ------------------------------ | ------- |
| ref               | 组件引用，可访问内部插件       | Ref\<any\>                     | -       |
| pure              | 是否纯表格，去除外部边框和边距 | boolean                        | false   |
| mini              | 是否迷你模式                   | boolean                        | false   |
| title             | 表格标题                       | string \| ReactNode            | -       |
| sticky            | 设置粘性头部和滚动条           | boolean \| StickyConfig        | -       |
| defaultSize       | 表格大小                       | 'large' \| 'middle' \| 'small' | 'large' |
| noBackgroundColor | 不设置外部区域的背景颜色       | boolean                        | false   |
| tableExtraRender  | 表格上方需要额外渲染的内容     | ReactNode                      | -       |

### 表格数据相关 API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onQuery | 查询动作，返回表格数据 | (params: any, extraParams: any) => Promise\<ProTableResponse\<T[]\>\> | - |
| columns | 表格列的配置描述 | Column[] | - |
| dataSource | 自定义数据源，设置后 onQuery 将失效 | object[] | - |
| hideColumnsWhenNoData | 数据为空时隐藏所有列 | boolean | false |
| showDataSourceIndex | 是否展示数据序号 | boolean | false |
| dataSourceIndexCalcWithPage | 数据序号是否按页累加 | boolean | true |
| dataSourceIndexColumnConfig | 序号列的配置项 | Column | - |
| pagination | 分页器配置，false 时不显示分页 | object \| false | - |
| initialPaginationParams | 初始分页参数 | { page?: number; pageSize?: number } | - |
| defaultPageSize | 初始每页数量 | number | - |
| unknownDataLength | 开启无 total 分页 | boolean | false |
| queryAfterPaginationChange | 页数改变时调用查询方法 | boolean | true |

### Column 列配置

| 属性       | 说明                        | 类型                        | 默认值 |
| ---------- | --------------------------- | --------------------------- | ------ |
| label      | 列头显示文字                | ReactNode                   | -      |
| name       | 列数据在数据项中对应的路径  | string \| string[]          | -      |
| width      | 列宽度                      | string \| number            | -      |
| tooltip    | 在 label 右侧显示的提示信息 | ReactNode                   | -      |
| type       | 值的类型                    | ValueType                   | 'text' |
| options    | 给值做映射的枚举值数据      | EnumData[]                  | -      |
| hidden     | 是否隐藏此列                | boolean                     | false  |
| copyable   | 是否支持复制                | boolean                     | false  |
| expandView | 是否展开拓展内容            | boolean                     | false  |
| queryField | 此字段在查询区域的配置      | boolean \| QueryFieldConfig | -      |
| editField  | 此字段在编辑区域的配置      | boolean \| EditFieldConfig  | -      |
| viewField  | 此字段在详情区域的配置      | boolean \| ViewFieldConfig  | -      |

### 查询表单相关 API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| manualQuery | 是否手动请求 | boolean | false |
| queryFieldColumns | 查询表单一行显示的字段数 | number | 4 |
| queryFieldGutter | 栅格间隔 | number \| object \| array | 0 |
| queryFieldLayout | 表单布局 | 'horizontal' \| 'inline' \| 'vertical' | 'vertical' |
| queryFieldFilterEmptyParam | 是否过滤查询表单空参数 | boolean | false |
| queryFieldRefreshAfterReset | 重置后是否刷新 | boolean | true |
| queryFieldDefaultLines | 查询表单默认展示行数 | number | 1 |
| queryFieldDefaultLength | 查询表单默认展示字段数 | number | - |
| queryFields | 单独配置查询表单 | QueryField[] | - |
| queryFieldOrder | 查询表单项的排序 | string[] | - |
| hideQueryFields | 是否隐藏查询表单 | boolean | false |
| queryFieldTriggerOnEnter | 是否回车触发查询 | boolean | true |
| renderQueryFields | 自定义查询区域 | (params: QueryFieldRenderParams) => ReactNode | - |
| queryFieldPersistKey | 参数持久化 key | string | - |
| queryFieldPersistType | 参数持久化类型 | 'sessionStorage' \| 'localStorage' | 'sessionStorage' |

### 操作相关 API

| 属性             | 说明                 | 类型                                                  | 默认值 |
| ---------------- | -------------------- | ----------------------------------------------------- | ------ |
| iconActions      | 表格图标按钮动作     | IconAction[]                                          | -      |
| fixColumnActions | 是否固定动作栏到右侧 | boolean                                               | -      |
| selectable       | 可选择表格           | boolean                                               | false  |
| batchActions     | 多选动作             | BatchAction[]                                         | -      |
| actions          | 表格按钮动作         | Action[]                                              | -      |
| columnActions    | 表格项动作           | ColumnAction[]                                        | -      |
| addFields        | 新增表单配置         | AddField[]                                            | -      |
| onAdd            | 新增回调函数         | (params: any) => Promise\<ProTableResponse\>          | -      |
| refreshAfterAdd  | 新增成功后刷新表格   | boolean                                               | true   |
| editFields       | 编辑表单配置         | EditField[]                                           | -      |
| onEdit           | 编辑回调函数         | (params: any, item: T) => Promise\<ProTableResponse\> | -      |
| refreshAfterEdit | 编辑成功后刷新表格   | boolean                                               | false  |
| viewFields       | 详情查看配置         | ViewField[]                                           | -      |
| onView           | 详情查看回调函数     | (item: T) => Promise\<ProTableResponse\>              | -      |
| onDelete         | 删除回调函数         | (target: T \| T[]) => Promise\<ProTableResponse\>     | -      |

### ButtonAction 动作配置

| 属性    | 说明         | 类型                                | 默认值 |
| ------- | ------------ | ----------------------------------- | ------ |
| builtIn | 内置动作标识 | string                              | -      |
| hidden  | 是否隐藏     | boolean                             | false  |
| content | 按钮内容     | ReactNode                           | -      |
| confirm | 二次确认配置 | string \| PopconfirmProps           | -      |
| tooltip | 提示信息     | string \| ReactNode \| TooltipProps | -      |

## 内置动作

### 表格动作 (actions)

- `add` - 新增数据

### 图标动作 (iconActions)

- `refresh` - 刷新表格
- `table-size` - 表格密度切换
- `fullscreen` - 全屏显示

### 表格项动作 (columnActions)

- `view` - 查看详情
- `edit` - 编辑（弹窗）
- `edit-icon` - 编辑图标
- `table-edit` - 表格内编辑
- `delete` - 删除

### 批量动作 (batchActions)

- `delete` - 批量删除

## 字段类型 (Type)

### 输入类型

- `text` - 文本
- `password` - 密码
- `textarea` - 文本域
- `digit` - 数字
- `money` - 金额
- `percent` - 百分比

### 选择类型

- `select` - 单选下拉框
- `multipleSelect` - 多选下拉框
- `cascader` - 级联选择
- `treeSelect` - 树形单选
- `multipleTreeSelect` - 树形多选
- `modalSelect` - 弹窗单选
- `modalMultipleSelect` - 弹窗多选
- `checkbox` - 复选框
- `radio` - 单选框
- `radioButton` - 单选按钮

### 日期时间类型

- `date` - 日期
- `dateTime` - 日期时间
- `dateWeek` - 周
- `dateMonth` - 月
- `dateQuarter` - 季度
- `dateYear` - 年
- `time` - 时间
- `fromNow` - 相对时间
- `dateRange` - 日期范围
- `dateTimeRange` - 日期时间范围
- `dateWeekRange` - 周范围
- `dateMonthRange` - 月范围
- `dateQuarterRange` - 季度范围
- `dateYearRange` - 年范围
- `timeRange` - 时间范围
- `fromNowRange` - 相对时间范围

### 其他类型

- `switch` - 开关
- `rate` - 评分
- `image` - 图片
- `upload` - 上传
- `slider` - 滑块
- `transfer` - 穿梭框

## 方法

通过 ref 可以访问组件实例的方法：

| 方法名            | 说明               | 参数 | 返回值       |
| ----------------- | ------------------ | ---- | ------------ |
| refresh           | 刷新表格数据       | -    | -            |
| reset             | 重置查询条件并刷新 | -    | -            |
| getQueryFieldForm | 获取查询表单实例   | -    | FormInstance |

## 响应数据格式

ProTable 期望的响应数据格式：

```typescript
interface ProTableResponse<T = any> {
  success: boolean
  data?: T
  message?: any
  total?: number // 分页总数
}
```

## 插件系统

ProTable 基于插件系统构建，内置以下插件：

- `queryField` - 查询表单插件
- `editField` - 编辑表单插件
- `table` - 表格核心插件
- `valueType` - 字段类型插件
- `actions` - 动作插件
- `locale` - 国际化插件
- `modal` - 弹窗插件

## 国际化

ProTable 内置多语言支持：

- `zh-CN` / `zh_CN` - 简体中文
- `en-US` / `en_US` - 英文
- `id-ID` / `id_ID` - 印尼语

通过 `localeKey` 属性设置语言。
