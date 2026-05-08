---
name: ProTable-query
description: ProTable 查询表单完整指南——配置方式、布局、校验、关联、持久化、自定义渲染
---

# ProTable 查询表单

> 由 `queryField` 插件管理，是 ProTable 最核心的内部插件。

## 查询 Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onQuery | 查询函数（或 ahooks useRequest 结果） | `(params, extra) => Promise<Response>` | - |
| manualQuery | 手动查询（不自动发起首次请求） | `boolean` | `false` |
| queryFields | 独立配置查询字段（一维/二维数组） | `FieldConfig[] \| FieldConfig[][]` | - |
| queryFieldColumns | 一行显示字段数 | `number` | `4` |
| queryFieldLayout | 表单布局 | `'horizontal' \| 'inline' \| 'vertical'` | `'vertical'` |
| queryFieldGutter | 字段间距 | `RowProps['gutter']` | - |
| queryFieldFormProps | 查询表单的 ProForm props | `object` | - |
| queryFieldFilterEmptyParam | 过滤空参数 | `boolean` | `false` |
| queryFieldRefreshAfterReset | 重置后自动刷新 | `boolean` | `true` |
| queryFieldDefaultLines | 默认展示行数（超出折叠） | `number` | `1` |
| queryFieldDefaultLength | 默认展示字段数 | `number` | - |
| queryFieldOrder | 自定义字段排列顺序 | `string[]` | - |
| queryFieldTriggerOnEnter | 回车触发查询 | `boolean` | - |
| queryFieldPersistKey | 参数持久化 key | `string` | - |
| queryFieldPersistType | 持久化存储方式 | `'sessionStorage' \| 'localStorage'` | `'sessionStorage'` |
| hideQueryFields | 隐藏查询表单 | `boolean` | `false` |
| renderQueryFields | 完全自定义查询区域 | `(params) => ReactNode` | - |
| queryFieldServiceOptions | 传给内部 useRequest 的 options | `object` | - |
| onQueryFieldReset | 重置回调 | `() => void` | - |

## 配置查询的两种方式

### 方式 1：通过 queryFields 独立配置

查询字段与表格列不完全对应时使用。

```tsx
<ProTable
  queryFields={[
    { label: '关键词', name: 'keyword', type: 'text', placeholder: '姓名/邮箱/手机' },
    { label: '部门', name: 'department', type: 'select', options: deptOptions },
    { label: '时间段', name: 'dateRange', type: 'dateRange' },
  ]}
  onQuery={async (params) => {
    const { current, pageSize, ...filters } = params
    const res = await api.fetchList({ page: current, size: pageSize, ...filters })
    return { success: true, data: res.list, total: res.total }
  }}
/>
```

### 方式 2：从 columns 继承（推荐，减少重复）

在 `columns` 中设置 `queryField` 属性：

```tsx
<ProTable
  columns={[
    {
      label: '文本', name: 'text',
      queryField: true, // true = 直接继承 column 的 type/options
    },
    {
      label: '单选框', name: 'select', type: 'select',
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
      queryField: {
        // 可覆盖继承的属性
        // label / name / type / options 均继承自 column
        placeholder: '请选择',
      },
    },
    {
      label: '隐藏但参与查询', name: 'hidden_field',
      queryField: true,
      hidden: true, // 表格中不显示，仅用于查询
    },
  ]}
  onQuery={async (params) => { ... }}
/>
```

> **继承规则**：label ← column.title/label，name ← column.dataIndex/name，type ← column.valueType/type，options ← column.valueEnum/options

## onQuery 参数详解

```tsx
onQuery={async (params, extraParams) => {
  // params 包含：查询表单值 + 分页参数
  const {
    current,   // 当前页码
    pageSize,  // 每页条数
    ...filters // 查询表单的值
  } = params

  // extraParams：额外参数（排序、筛选等）
  // 可通过 controller.setExtraParams() 注入

  return {
    success: true,  // 必须
    data: [],       // 表格数据
    total: 100,     // 数据总量（分页用）
    message: '',    // 可选消息
  }
}}
```

### onQuery 传入 useRequest 结果

`onQuery` 支持直接传入 ahooks `useRequest` 的结果对象（内部会自动检测 `isAhooksUseRequestResult`）：

```tsx
import { useRequest } from 'ahooks'

const MyPage = () => {
  const service = useRequest(api.fetchUsers, { manual: true })

  return (
    <ProTable
      onQuery={service} // 直接传入 useRequest 结果
      columns={[...]}
    />
  )
}
```

## 更多/收起 折叠

两种条件触发折叠按钮：

**条件 1（推荐）**：行数 × 列数

```tsx
<ProTable
  queryFieldColumns={4} // 一行 4 个字段
  queryFieldDefaultLines={1} // 默认只展示 1 行
  queryFields={[
    { label: '文本1', name: 'text1' },
    { label: '文本2', name: 'text2' },
    { label: '文本3', name: 'text3' },
    { label: '文本4', name: 'text4' },
    { label: '文本5', name: 'text5' },
    { label: '文本6', name: 'text6' },
  ]}
/>
```

**条件 2**：指定默认显示字段数

```tsx
<ProTable
  queryFieldDefaultLength={2} // 默认只展示 2 个字段
  queryFields={[...]}
/>
```

> `queryFieldDefaultLength` 优先级高于 `queryFieldDefaultLines`。两者可混用。

## 调整字段顺序

```tsx
<ProTable
  queryFieldOrder={['text5', 'text3']} // 仅指定需要前置的字段
  queryFields={[
    { label: '文本1', name: 'text1' },
    { label: '文本2', name: 'text2' },
    { label: '文本3', name: 'text3' },
    { label: '文本4', name: 'text4' },
    { label: '文本5', name: 'text5' },
  ]}
/>
```

> 未在 `queryFieldOrder` 中指定的字段保持原有顺序。

## 表单校验

```tsx
queryFields={[
  {
    label: '文本', name: 'text',
    required: '请填写此项',  // 简单必填（string 为提示语）
  },
  {
    label: '单选框', name: 'select', type: 'select',
    options: [...],
    rules: [{ required: true, message: '请选择此项' }], // 使用 antd Form.Item rules
    // 配置 rules 时 required 属性失效
  },
]}
```

## 表单关联（hook + dependencies）

通过 `hook` 实现动态关联——hook 是一个**可以写 React Hooks** 的函数：

```tsx
queryFields={[
  { label: '省份', name: 'province', type: 'select', options: provinceOptions },
  {
    label: '城市', name: 'city', type: 'select',
    hook: ({ form }) => {
      const province = form.getFieldValue('province')
      const [cityOptions, setCityOptions] = useState([])

      useEffect(() => {
        if (province) {
          fetchCities(province).then(setCityOptions)
        } else {
          setCityOptions([])
        }
      }, [province])

      return {
        options: cityOptions,
        disabled: !province,
        placeholder: province ? '请选择城市' : '请先选择省份',
      }
    },
    dependencies: ['province'], // 显式声明依赖；不指定则任何值变化都重新计算
  },
]
```

> `hook` 返回值可以动态修改**除 name 之外**的所有字段属性。返回 `false` 可隐藏字段。

## 查询布局

### 内联 label

```tsx
<ProTable queryFieldLayout="horizontal" queryFields={[...]} />
```

> 不建议。最好保持 `vertical` 上下结构以保证 label 有充足空间。

### 二维 queryFields（自定义行列）

`queryFields` 支持二维数组，第一维为行，第二维为列：

```tsx
<ProTable
  queryFields={[
    [
      { label: '文本1', name: 'text1' }, // 一行两个
      { label: '文本2', name: 'text2' },
    ],
    [{ label: '文本3', name: 'text3' }], // 独占一行
    [
      { label: '文本4', name: 'text4', colSpan: 16 }, // 占 2/3 (16/24)
      { label: '文本5', name: 'text5', colSpan: 8 }, // 占 1/3 (8/24)
    ],
  ]}
/>
```

> 每行默认等分，可通过 `colSpan`（24 栅格）调整。此模式下查询按钮组独占一行。

### 完全自定义（renderQueryFields）

```tsx
<ProTable
  queryFields={[
    { label: '文本1', name: 'text1' },
    { label: '文本2', name: 'text2' },
    { label: '文本3', name: 'text3' },
  ]}
  renderQueryFields={({ renderField, renderFields, actions, query, reset, fold, showMore, rawActions }) => (
    <>
      {renderField('text2')}
      {renderFields([
        ['text1', 'text2'],
        ['text3', actions],
        [
          { name: 'text2', colSpan: 16 },
          { name: 'text1', colSpan: 8 },
        ],
        [
          { colSpan: 16, content: <div>{query}</div> },
          { colSpan: 8, content: <div>{reset}</div> },
        ],
      ])}
    </>
  )}
/>
```

**renderQueryFields 参数：**

| 参数                        | 说明                          |
| --------------------------- | ----------------------------- |
| renderField(name \| config) | 渲染单个字段                  |
| renderFields(configs)       | 渲染多个字段（一维/二维数组） |
| rawActions                  | 未包裹 Form.Item 的按钮组     |
| actions                     | 包裹了 Form.Item 的按钮组     |
| query                       | 查询按钮                      |
| reset                       | 重置按钮                      |
| fold                        | 更多/收起按钮                 |
| showMore                    | 当前是否展开                  |

> 此模式下查询按钮组不会自动显示，需手动渲染 `actions` 参数。

## 参数持久化

查询参数自动保存，页面刷新后恢复：

```tsx
<ProTable
  queryFieldPersistKey="user-management-filters"
  queryFieldPersistType="sessionStorage" // 或 'localStorage'
  ...
/>
```

> 如果设置了 `id` prop，内部会自动使用 `id` 作为 `queryFieldPersistKey` 的默认值。

## 自定义表单类型

使用 `renderField` 配置项自定义表单类型（作为 Form.Item 的子节点）：

```tsx
queryFields={[
  {
    label: '自定义',
    name: 'custom',
    renderField: ({ fieldProps }) => (
      <input placeholder="自定义组件" {...fieldProps} />
    ),
  },
]}
```
