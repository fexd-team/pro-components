---
nav:
  title: 表格
  order: 2

title: 预览
order: 1
toc: false

atomId: ProTable
contentMaxWidth: 100%
---

## 功能演示

```jsx | pure
import { ProTable } from '@fexd/pro-components'
import '@fexd/pro-components/es/style.less'
```

<code src="./demos/preview"></code>

## API

细分为：<a href="/table#基础api">基础 API</a>、<a href="/table#表格数据相关api">表格数据相关 API</a>、<a href="/table#查询表单相关api">查询表单相关 API</a>、<a href="/table#操作相关api">操作相关 API</a>。

### 基础 API

| 属性 | 描述 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| ref | 详见<a href="/table/plugins#访问内部插件">访问内部插件</a> | `Ref<any>` | - |
| pure | 是否纯表格，将去除外部边框和边距，且默认 `sticky=false` | `boolean` | `false` |
| mini | 是否迷你模式 | `boolean` | `false` |
| title | 标题 | `string \| ReactNode` | - |
| sticky | 设置粘性头部和滚动条 | `boolean \| {offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}` | - |
| defaultSize | 表格大小 | `large \| middle \| small` | `large` |
| noBackgroundColor | 不设置外面区域的背景颜色 | `boolean` | `false` |
| tableExtraRender | 表格外面上方需要额外渲染的内容 | `ReactNode` | - |

### 表格数据相关 API

| 属性 | 描述 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| onQuery | 查询动作，详见<a href="/table/qury">内置查询</a> | - | - |
| columns | 表格列的配置描述 | <a href="/table#column">Column</a>[] | - |
| dataSource | 自定义数据源，onQuery 查询动作将失效 | `object[]` | - |
| hideColumnsWhenNoData | 表格数据为空时隐藏所有的列，用在 columns 项较多但数据为空时，优化呈现效果 | `boolean` | `false` |
| showDataSourceIndex | 是否展示数据的序列标识 | `boolean` | `false` |
| dataSourceIndexCalcWithPage | 数据的序列标识是否按页累加 | `boolean` | `true` |
| dataSourceIndexColumnConfig | 序列标识 column 的列配置项 | <a href="/table#column">Column</a> | - |
| pagination | 分页器，设为 false 时不展示和进行分页 | `object \| false` | - |
| initialPaginationParams | 初始分页参数 | `{ page?: number; pageSize?: number }` | - |
| defaultPageSize | 初始一页数量 | `number` | - |
| unknownDataLength | 未知数据长度，将开启无 total 分页 | `boolean` | `false` |
| queryAfterPaginationChange | 页数改变时调用查询方法 | `boolean` | `true` |

#### Column

列描述数据对象，是 columns 中的一项。

| 属性 | 描述 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| title | 列头显示文字 | `ReactNode` | - |
| width | 列宽度 | `string \| number` | - |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | `string \| string[]` | - |
| tooltip | 在 title 右侧，鼠标移入会显示的内容 | `ReactNode` | - |
| valueType | 值的类型 | `"text" \| "password" \| "money" \| "textarea \| "digit" \| "percent" \|`<br/>`"select" \| "multipleSelect" \| "cascader" \| "treeSelect" \| "multipleTreeSelect" \|`<br/>`"modalSelect" \| "modalMultipleSelect" \| "checkbox" \| "radio" \| "radioButton" \|`<br/>`"switch" \| "rate" \| "image" \| "upload" \| "slider" \| "transfer" \| "date" \|`<br/>`"dateTime"\| "dateWeek"\| "dateMonth"\| "dateQuarter"\| "dateYear"\| "time"\|`<br/>`"fromNow" \| "dateRange" \| "dateTimeRange" \| "dateWeekRange" \| "dateMonthRange"`<br/>`\| "dateQuarterRange" \| "timeRange" \| "fromNowRange"` | `"text"` |
| valueEnum | 给值做映射的枚举值数据。 tag 属性（非必填）可设置标签状态，badge 属性（非必填）可设置徽标状态 | `{ label, value, tag, badge }[] \| () => Promise<{ label, value, tag, badge }[]>` | - |
| hidden | 不展示 | `boolean` | `false` |
| copyable | 是否能复制 | `boolean` | `false` |
| expandView | 是否展开拓展内容 | `boolean` | `false` |
| children | 展开后的内容 | `ReactNode` | - |
| queryField | 此字段在查询区域的配置，详见<a href="/table/query#从-columns-继承">从 columns 继承</a> | boolean \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode) | - |
| editField | 此字段在编辑区域的配置，详见<a href="/table/edit#从-columns-继承">从 columns 继承</a> | boolean \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode) | - |
| viewField | 此字段在详情区域的配置，详见<a href="/table/view#从-columns-继承">从 columns 继承</a> | boolean \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode) | - |

### 查询表单相关 API

| 属性 | 描述 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| onQuery | 查询动作，详见<a href="/table/qury">内置查询</a> | - | - |
| manualQuery | 是否手动请求 | `boolean` | `false` |
| queryFieldColumns | 查询表单一行 N 个 | `number` | `4` |
| queryFieldGutter | 栅格间隔 | `number \| object \| array` | `0` |
| queryFieldLayout | 表单布局 | `"horizontal" \| "inline" \| "vertical"` | `"vertical"` |
| queryFieldFilterEmptyParam | 是否清空查询表单空参数 | `boolean` | `false` |
| queryFieldRefreshAfterReset | 重置查询表单后是否刷新 | `boolean` | `true` |
| queryFieldDefaultLines | 查询表单默认展示前 N 行 | `number` | `1` |
| queryFieldDefaultLength | 查询表单默认展示前 N 个，如果使用此项将覆盖 queryFieldDefaultLines 行为 | `number` | - |
| queryFields | 单独配置搜索表单，此项存在时，columns 内配置将失效，详见<a href="/table/query#内置查询">内置查询</a> | (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[] \|<br/> (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[][] | - |
| queryFieldOrder | 搜索表单项的排序 | `string[]` | - |
| hideQueryFields | 是否隐藏查询表单 | `boolean` | `false` |
| queryFieldTriggerOnEnter | 是否回车键触发表单查询 | `boolean` | `true` |
| queryFieldServiceOptions | 查询表单服务的配置，见 https://ahooks.js.org/zh-CN/hooks/use-request/basic#options | `UseRequestOptions<any, any>` | - |
| renderQueryFields | 自定义查询区域 | `(params: ProTableQueryFieldRenderParams) => ReactNode` | - |
| queryFieldPersistKey | 参数持久化 key 值 | `string` | - |
| queryFieldPersistType | 参数持久化类型 | `"sessionStorage" \| "localStorage"` | `"sessionStorage"` |
| queryFieldPersistFormKeyExcludes | 参数持久化 Form 部分排除项的 value key 名 | `string[]` | - |
| queryFieldPersistPaginationParams | 参数持久化分页器部分排除项的 value key 名 | `('page' \| 'pageSize' \| Omit<string, 'page' \| 'pageSize'>)[]` | - |
| queryFieldPersistPaginationParams | 是否持久化分页部分，默认存在 queryFieldPersistKey 则持久化 | `boolean` | - |
| queryFieldPersistForm | 是否持久化 Form 部分，默认存在 queryFieldPersistKey 则持久化 | `boolean` | - |
| onQueryFieldReset | 当重置按钮点击时的回调 | `(...args: any) => any` | - |
| queryFieldActionSortList | 查询区域按钮排序 | `('query' \| 'reset' \| 'fold' \| 'text-fold')[]` | - |
| queryFieldFoldActionProps |  | <a href="/table#buttonaction">ButtonAction</a> |  |
| queryFieldTextFoldActionProps |  | <a href="/table#buttonaction">ButtonAction</a> |  |
| queryFieldQueryActionProps |  | <a href="/table#buttonaction">ButtonAction</a> |  |
| queryFieldResetActionProps |  | <a href="/table#buttonaction">ButtonAction</a> |  |

### ProFieldValueField

字段的基本类型，

| 属性 | 描述 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| mode | 模式 | `'view' \| 'edit'` | - |
| label | label 标签 | `ReactNode` | - |
| name | 表单字段名称 | `string` | - |
| type | 表单字段类型 | `"text" \| "password" \| "money" \| "textarea \| "digit" \| "percent" \|`<br/>`"select" \| "multipleSelect" \| "cascader" \| "treeSelect" \| "multipleTreeSelect" \|`<br/>`"modalSelect" \| "modalMultipleSelect" \| "checkbox" \| "radio" \| "radioButton" \|`<br/>`"switch" \| "rate" \| "image" \| "upload" \| "slider" \| "transfer" \| "date" \|`<br/>`"dateTime"\| "dateWeek"\| "dateMonth"\| "dateQuarter"\| "dateYear"\| "time"\|`<br/>`"fromNow" \| "dateRange" \| "dateTimeRange" \| "dateWeekRange" \| "dateMonthRange"`<br/>`\| "dateQuarterRange" \| "timeRange" \| "fromNowRange"` | `"text"` |
| options | 给值做映射的枚举值数据。 tag 属性（非必填）可设置标签状态，badge 属性（非必填）可设置徽标状态 | `{ label, value, tag, badge }[] \| () => Promise<{ label, value, tag, badge }[]>` | - |
| renderField | 自定义表单类型，将会作为 `Form.Item` 的直接子节点使用，详见<a href="/form/types-order#自定义类型">自定义类型</a> | - | - |
| renderView | 自定义当 mode="view" 时的表单类型 | (value: any, config: <a href="/table#profieldvaluefield">ProFieldValueFieldType</a>) => ReactNode | - |
| copyable | 是否能复制 | `boolean` | - |
| tooltip | 提示，会出现在 label 右侧 | `string \| ReactNode \| AntdTooltipProps` | - |
| fromNowTooltip | 是否展示至今时间间隔 | `boolean` | `true` |
| props | 传递给表单字段的其他属性 | `Object` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| required | 必填 | `boolean \| string` | - |
| placeholder | 表单内容的 placeholder | `string` | - |
| colSpan | 栅格占位格数 | `number` | - |
| hook | 动态关联，可以动态修改除了 name 之外的所有属性 | (hookParams: BuiltInHookParams, ...args: any[]) => Omit<<a href="/table#profieldvaluefield">ProFieldValueFieldType</a>, 'hook' \| 'name'> \| void \| undefined \| null \| boolean \| ReactNode | - |
| format | 自定义日期显示格式 | `string` | - |
| unit | 货币单位 | `string` | - |

### 操作相关 API

| 属性 | 描述 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| iconActions | 表格 icon 按钮动作，目前内置了刷新、列设置、全屏动作 | ('refresh' \| 'table-size' \| 'fullscreen' \|<br/>Omit<string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode), 'refresh' \| 'table-size' \| 'fullscreen'>)[] | - |
| fixColumnActions | 是否固定动作栏到右侧 | `boolean` | - |
| selectable | 可选择表格 | `boolean` | `false` |
| batchActions | 多选动作，目前内置了批量删除动作 | string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode)[] | - |
| actions | 表格按钮动作，目前内置了新增动作 | ('add' \| Omit<string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode), 'add'>)[] | - |
| addFields | 单独配置新增表单，此项存在时，columns 内配置将失效，详见<a href="/table/add#内置新增">内置新增</a> | (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[] \| <br/> ((item: R \| undefined, mode: 'add') => (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[]) | - |
| onAdd | 新增的回调函数 | `<T = any>(params: any) => Promise<ProTableResponse<any> \| void \| boolean> \| void \| boolean` | - |
| refreshAfterAdd | 新增成功后刷新表格 | `boolean` | `true` |
| addFieldGutter | 新增表单项之间的间隔 | `number \| object \| array \| ((item: R \| undefined, mode: 'add') => number \| object \| array)` | - |
| addFieldFilterEmptyParam | 是否清空新增表单空参数 | `boolean` | `false` |
| addFieldLayout | 新增表单布局 | `"horizontal" \| "vertical" \| "inline" \| ((item: R \| undefined, mode: 'add') => "horizontal" \| "vertical" \| "inline")` | `"vertical"` |
| addFieldColumns | 新增表单一行 N 个 | `number \| ((item: R \| undefined, mode: 'add') => number)` | - |
| renderModalAddFields | 属性进行更灵活的自定义，详见<a href="/table/add#完全自定义">完全自定义</a> | `(renderParams: ProTableEditFieldRenderParams) => ReactNode` | - |
| editFields | 单独配置编辑表单，此项存在时，columns 内配置将失效，详见<a href="/table/edit">内置编辑</a> | (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[] \| <br/> ((item: R \| undefined, mode: 'edit') => (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[]) | - |
| onEdit | 编辑的回调函数 | `<T = any>(params: any, item: R) => Promise<ProTableResponse<any> \| void \| boolean> \| void \| boolean` | - |
| refreshAfterEdit | 编辑成功后刷新表格 | `boolean` | `false` |
| whenToTriggerOnEdit | 何时触发 onEdit | `"changed" \| "always"` | - |
| editFieldGutter | 编辑表单项之间的间隔 | `number \| object \| array \| ((item: R \| undefined, mode: 'edit') => number \| object \| array)` | - |
| editFieldFilterEmptyParam | 是否清空编辑表单空参数 | `boolean` | `false` |
| editFieldColumns | 编辑表单一行 N 个 | `number \| ((item: R \| undefined, mode: 'edit') => number)` | - |
| editFieldLayout | 编辑表单布局 | `"horizontal" \| "vertical" \| "inline" \| ((item: R \| undefined, mode: 'edit') => "horizontal" \| "vertical" \| "inline")` | `"vertical"` |
| renderModalEditFields | 属性进行更灵活的自定义，详见<a href="/table/edit#完全自定义">完全自定义</a> | `(renderParams: ProTableEditFieldRenderParams) => ReactNode` | - |
| viewFields | 单独配置浏览区域，此项存在时，columns 内配置将失效，详见<a href="/table/view">内置详情查看</a> | (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[] \| <br/> ((item: R, mode: 'view') => (string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode \| ((...args: any[]) => string \| <a href="/table#buttonaction">ButtonAction</a> \| ReactNode))[]) | - |
| onView | 详情的回调函数 | `<T = any>(params: any) => Promise<ProTableResponse<any> \| void \| boolean> \| void \| boolean` | - |
| viewFieldGutter | 浏览表单项之间的间隔 | `number \| object \| array \| ((item: R \| undefined, mode: 'view') => number \| object \| array)` | - |
| viewFieldColumns | 浏览表单一行 N 个 | `number \| ((item: R \| undefined, mode: 'view') => number)` | - |
| viewFieldLayout | 浏览表单布局 | `"horizontal" \| "vertical" \| "inline" \| ((item: R \| undefined, mode: 'view') => "horizontal" \| "vertical" \| "inline")` | `"vertical"` |
| renderModalViewFields | 属性进行更灵活的自定义，详见<a href="/table/view#自定义布局">自定义布局</a> | `(renderParams: ProTableEditFieldRenderParams) => ReactNode` | - |

### ButtonAction

表格里的操作配置对象，是 ProTableButtonAction 里的一项。

| 属性              | 描述                    | 类型                                       | 默认值  |
| :---------------- | :---------------------- | :----------------------------------------- | :------ |
| builtIn           | 内置动作                | `string`                                   | -       |
| hidden            | 是否不展示              | `boolean`                                  | `false` |
| content           | 内容                    | `ReactNode`                                | -       |
| children          | 内容                    | `ReactNode`                                | -       |
| confirm           | 二次确认                | `string \| PopconfirmProps`                | -       |
| extraConfirmProps | 额外的 confirm 的 props | `Omit<PopconfirmProps, 'title'>`           | -       |
| tooltip           | 提示                    | `string \| ReactNode \| AntdTooltipProps`  | -       |
| extraTooltipProps | 额外的 tooltip 的 props | `Omit<TooltipProps, 'title' \| 'overlay'>` | -       |

## 类型定义一览

```tsx | pure
interface ProTableProps<R = any> extends Omit<TableProps<R>, 'title' | 'locale'> {
  pure?: boolean

  // Pick<TableProps<R>, 'rowKey' | 'rowSelection' | 'indentSize'> {
  title?: string | ReactNode
  ref?: Ref<any>

  /** 是否固定动作栏到右侧 */
  fixColumnActions?: boolean
  tableExtraRender?: () => ReactNode

  defaultTableSize?: TableProps<R>['size']

  showDataSourceIndex?: boolean
  dataSourceIndexCalcWithPage?: boolean
  dataSourceIndexColumnConfig?: ProTableColumnType<R>

  /** 可选择表格 */
  selectable?: boolean

  pagination?: TableProps<R>['pagination']

  /** 表格 icon 按钮动作，目前内置了刷新、列设置动作 */
  iconActions?: (
    | 'refresh'
    | 'table-size'
    | 'fullscreen'
    | Omit<ProTableTableActionType, 'refresh' | 'table-size' | 'fullscreen'>
  )[]

  /** 多选动作，目前内置了批量删除动作 */
  batchActions?: ProTableTableActionType[]

  /** 多选动作（废弃），目前内置了批量删除动作 */
  multipleActions?: ProTableTableActionType[]

  builtInActions?: {
    actions?: Record<string, ProTableBuiltInActionType>
    iconActions?: Record<string, ProTableBuiltInActionType>
    batchActions?: Record<string, ProTableBuiltInActionType>
    columnActions?: Record<string, ProTableBuiltInActionType>
  }

  /** 删 */
  onDelete?: <T = any>(target: R | R[]) => Promise<ProTableResponse<T>>

  /** 是否手动请求 */
  manualQuery?: boolean

  /** 是否隐藏查询表单 */
  hideQueryFields?: boolean

  /** 查询表单一行 N 个，默认值 4, */
  queryFieldColumns?: number
  queryFieldGutter?: RowProps['gutter']
  queryFieldLayout?: FormProps['layout']

  /** 查询表单默认展示前 N 行，默认值 1, */
  queryFieldDefaultLines?: number

  /** 查询表单默认展示前 N 个, 无默认值，如果使用此项将覆盖 queryFieldDefaultLines 行为 */
  queryFieldDefaultLength?: number

  /** 单独配置搜索表单，此项存在时，columns 内配置将失效 */
  queryFields?: ProTableQueryFieldType[] | ProTableQueryFieldType[][]

  /** 搜索表单项的排序 */
  queryFieldOrder?: string[]

  /** 是否序列化 field 值，例如 Moment -> timestamp */
  normalizeFieldValue?: boolean

  /** 是否回车键触发表单查询 */
  queryFieldTriggerOnEnter?: boolean

  /** 查询表单服务的配置，见 https://ahooks.js.org/zh-CN/hooks/use-request/basic#options */
  queryFieldServiceOptions?: UseRequestOptions<any, any>

  renderQueryFields?: (params: ProTableQueryFieldRenderParams) => ReactNode

  /** 初始分页参数 */
  initialPaginationParams?: { page?: number; pageSize?: number }
  /** 初始分页参数 */
  defaultPaginationParams?: { page?: number; pageSize?: number }
  defaultPageSize?: number

  editFieldModalProps?:
    | ProTableEditFieldModalProps
    | ((item: R, mode: ProTableEditFieldMode) => ProTableEditFieldModalProps)
  addFieldModalProps?:
    | ProTableEditFieldModalProps
    | ((item: R, mode: ProTableEditFieldMode) => ProTableEditFieldModalProps)
  viewFieldModalProps?:
    | ProTableEditFieldModalProps
    | ((item: R, mode: ProTableEditFieldMode) => ProTableEditFieldModalProps)

  editFieldGutter?: RowProps['gutter'] | ((item: R | undefined, mode: ProTableEditFieldMode) => RowProps['gutter'])
  viewFieldGutter?: RowProps['gutter']
  addFieldGutter?: RowProps['gutter']

  /** 单独配置新增表单，此项存在时，columns 内配置将失效 */
  addFields?: ProTableEditFieldType[] | ((item: undefined, mode: 'add') => ProTableEditFieldType[])
  addFieldLayout?: FormProps['layout']
  addFieldColumns?: number
  renderModalAddFields?: (renderParams: ProTableEditFieldRenderParams) => ReactNode

  /** 单独配置浏览区域，此项存在时，columns 内配置将失效 */
  viewFields?: ProTableEditFieldType[] | ((item: R, mode: 'view') => ProTableEditFieldType[])
  viewFieldLayout?: FormProps['layout']
  viewFieldColumns?: number
  renderModalViewFields?: (renderParams: ProTableEditFieldRenderParams) => ReactNode

  /** 单独配置编辑表单，此项存在时，columns 内配置将失效 */
  editFields?: ProTableEditFieldType[] | ((item: R | undefined, mode: ProTableEditFieldMode) => ProTableEditFieldType[])
  editFieldColumns?: number | ((item: R | undefined, mode: ProTableEditFieldMode) => number)
  editFieldLayout?: FormProps['layout'] | ((item: R | undefined, mode: ProTableEditFieldMode) => FormProps['layout'])
  renderModalEditFields?: (renderParams: ProTableEditFieldRenderParams) => ReactNode

  /** 表格按钮动作，目前内置了新增动作 */
  actions?: ('add' | Omit<ProTableTableActionType, 'add'>)[]
  columns?: ProTableColumnType<R>[]

  /** 表格项动作，目前内置了查看详情、编辑、删除动作 */
  columnActions?: (
    | 'view'
    | 'edit'
    | 'edit-icon'
    | 'table-edit'
    | Omit<ProTableTableActionType, 'view' | 'edit' | 'edit-icon' | 'table-edit'>
    | ProTableTableSwitchActionType
  )[]

  /** 表格项动作 column 的配置 */
  columnActionsConfig?: ProTableColumnType<R>

  /** 表格数据为空时隐藏所有的列，用在 columns 项较多但数据为空时，优化呈现效果 */
  hideColumnsWhenNoData?: boolean

  /** 查询动作 */
  onQuery?:
    | (<T = any>(params: any, extraParams: any) => Promise<ProTableResponse<R[]> | R[] | void>)
    | UseRequestResult<any, any>

  /** 详情 */
  onView?: <T = any>(item: R) => Promise<ProTableResponse<T>>

  /** 增 */
  onAdd?: <T = any>(params: any) => Promise<ProTableResponse<any> | void> | void

  /** 改 */
  onEdit?: <T = any>(params: any, item: R) => Promise<ProTableResponse<any> | void> | void

  /** 编辑成功后刷新表格 */
  refreshAfterEdit?: boolean

  /** 新增成功后刷新表格 */
  refreshAfterAdd?: boolean

  queryWrapperStyle?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  mainStyle?: React.CSSProperties
  toolbarStyle?: React.CSSProperties
  noBackgroundColor?: boolean

  /** 内置语言包 */
  locale?: TableProps<R>['locale'] & {
    table?: {
      selectionTips?: ProTableLocaleValue
      deselect?: ProTableLocaleValue
      inverse?: ProTableLocaleValue
      action?: ProTableLocaleValue
      totalDataCount?: ProTableLocaleValue
      edit?: ProTableLocaleValue
      save?: ProTableLocaleValue
      cancel?: ProTableLocaleValue
      cancelConfirm?: ProTableLocaleValue
      density?: ProTableLocaleValue
      densityLarger?: ProTableLocaleValue
      densityMiddle?: ProTableLocaleValue
      densitySmall?: ProTableLocaleValue
    }
    actions?: {
      multipleDeleteConfirm?: ProTableLocaleValue
      multipleDelete?: ProTableLocaleValue
      deleteConfirm?: ProTableLocaleValue
      delete?: ProTableLocaleValue
      refreshTip?: ProTableLocaleValue
    }
    queryField?: {
      query?: ProTableLocaleValue
      reset?: ProTableLocaleValue
      fold?: ProTableLocaleValue
      more?: ProTableLocaleValue
    }
    valueType?: {
      inputPassword?: ProTableLocaleValue
      inputContent?: ProTableLocaleValue
      chooseContent?: ProTableLocaleValue
      startTime?: ProTableLocaleValue
      endTime?: ProTableLocaleValue
    }
    editField?: {
      add?: ProTableLocaleValue
      details?: ProTableLocaleValue
      edit?: ProTableLocaleValue
    }
    modal?: {
      okText?: ProTableLocaleValue
      cancelText?: ProTableLocaleValue
    }
  }

  localeKey?: 'zh-CN' | 'zh_CN' | 'en-US' | 'en_US' | 'id-ID' | 'id_ID'

  /** 渲染控制函数 */
  render?: ({ queryField, tableExtra, table }: any) => JSX.Element
}

type ProTableLocaleValue = string | ReactNode | ((...args: any[]) => string | ReactNode)

interface ProTableResponse<T = any> {
  success: boolean
  data?: T
  message?: any
  // [key: string]: any
}

interface ProTableQueryFieldType extends ProFieldValueFieldType {
  hook?: (params: {
    form: FormInstance
  }) => Omit<ProTableQueryFieldType, 'hook'> | void | undefined | null | boolean | ReactNode
}

interface ProTableTableButtonActionType extends Omit<ButtonProps, 'children'> {
  builtIn?: string
  content?: ButtonProps['children']
  confirm?: string | PopconfirmProps
  tooltip?: TooltipConfig
  actionType?: 'button'
}

type ProTableEditFieldMode = 'view' | 'add' | 'edit'

interface ProTableEditFieldParams<R = any> {
  item: R | undefined
  form: FormInstance
  mode: ProTableEditFieldMode
}

interface ProTableEditFieldType<R = any> extends Omit<ProFieldValueFieldType, 'hook'> {
  readonly?: boolean
  hook?: (
    params: ProTableEditFieldParams<R>,
  ) => Omit<ProTableEditFieldType, 'hook' | 'name'> | void | undefined | null | boolean | ReactNode
}

interface ProTableColumnType<R = any> extends TableColumnType<R> {
  valueType?: ProFieldValueFieldType['type']
  valueEnum?: ProFieldValueFieldType['options']
  editField?: boolean | ProTableEditFieldType | ProTableEditFieldType['hook']
  addField?: boolean | ProTableEditFieldType | ProTableEditFieldType['hook']
  viewField?: boolean | ProTableEditFieldType | ProTableEditFieldType['hook']
  queryField?: boolean | ProTableQueryFieldType | ProTableQueryFieldType['hook']
  tooltip?: TooltipConfig
  format?: string
  copyable?: boolean | Pick<ProTableTableButtonActionType, 'tooltip' | 'confirm'>
  hidden?: boolean
}

interface ProTableTableSwitchActionType extends SwitchProps {
  builtIn?: string
  confirm?: string | PopconfirmProps
  tooltip?: TooltipConfig
  actionType?: 'switch'
}

type ProTableTableActionType =
  | string
  | ProTableTableButtonActionType
  | ReactNode
  | ((...args: any[]) => string | ProTableTableButtonActionType | ReactNode)

type ProTableBuiltInActionType = ReactNode | ((...args: any[]) => ReactNode)

interface ProTableBuiltInPlugins {
  editField: ReturnType<typeof editField>
  queryField: ReturnType<typeof queryField>
  table: ReturnType<typeof table>
  valueType: ReturnType<typeof valueType>
  actions: ReturnType<typeof actions>
  locale: ReturnType<typeof locale>
  modal: ReturnType<typeof modal>
}

interface ProTableEditFieldsConfig {
  isAvailable: boolean
  fields: ProTableEditFieldType[]
}
interface ProTableEditFieldRenderParams extends ProFormRenderParams<ProTableEditFieldType> {
  fieldsMap: Record<string, ProTableEditFieldType>
  fieldsConfig: ProTableEditFieldsConfig
  getField: (fieldName: string) => ProTableEditFieldType | undefined
  // renderField: (fieldName: string, ...args: any[]) => ReactNode
  // renderFields: (fields?: any[], ...args: any[]) => ReactNode
  // form: FormInstance
  item?: Record<string, any>
  mode: ProTableEditFieldMode
}

interface ProTableQueryFieldRenderParams extends ProFormRenderParams<ProTableQueryFieldType> {
  // renderField: (field: string | ProTableQueryFieldType) => ReactNode
  // renderFields: (
  //   fields: (string | ProTableQueryFieldType | ReactNode)[] | (string | ProTableQueryFieldType | ReactNode)[][],
  // ) => ReactNode
  rawActions: ReactNode
  actions: ReactNode
  fold: ReactNode
  query: ReactNode
  reset: ReactNode
  // form: FormInstance
  showMore: boolean
}

interface ProTableEditFieldModalProps extends ModalProps {
  greyBody?: boolean
  draggable?: boolean
  fullscreenable?: boolean
}

interface ProTableEditFieldModalProps extends DrawerProps {
  drawer?: boolean
}
```
