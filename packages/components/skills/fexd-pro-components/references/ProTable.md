---
name: ProTable
description: 插件化表格组件，集成数据展示、查询、CRUD、操作等功能的一体化解决方案
---

# ProTable 表格组件

> 核心组件，详细文档已拆分为子文件，按需查阅。

## 子文档导航

| 文档 | 内容 |
| --- | --- |
| [ProTable-ref](./ProTable-ref.md) | Ref 方法、useController、useRef、静态方法、插件 ref 结构 |
| [ProTable-query](./ProTable-query.md) | 查询表单配置、布局、校验、关联、持久化、自定义渲染 |
| [ProTable-crud](./ProTable-crud.md) | 新增/编辑/详情/删除、弹窗配置、抽屉模式、行内编辑、表单校验关联 |
| [ProTable-actions](./ProTable-actions.md) | 四类动作（actions/iconActions/columnActions/batchActions）、内置/自定义/菜单 |
| [ProTable-plugins](./ProTable-plugins.md) | 7 个内置插件详解、插件 API、自定义插件开发 |

## 快速上手

```tsx
import { ProTable } from '@fexd/pro-components'
;<ProTable
  title="用户管理"
  columns={[
    { label: '姓名', name: 'name', queryField: true, editField: { required: true } },
    { label: '部门', name: 'department', type: 'select', options: deptOptions, queryField: true, editField: true },
  ]}
  actions={['add']}
  columnActions={['view', 'edit', 'delete']}
  selectable
  batchActions={['delete']}
  onQuery={async (params) => {
    const res = await api.fetchUsers(params)
    return { success: true, data: res.data, total: res.total }
  }}
  onAdd={async (params) => {
    await api.createUser(params)
    return { success: true }
  }}
  onEdit={async (params, item) => {
    await api.updateUser(item.id, params)
    return { success: true }
  }}
  onDelete={async (target) => {
    const ids = Array.isArray(target) ? target.map((t) => t.id) : [target.id]
    await api.deleteUsers(ids)
    return { success: true }
  }}
/>
```

## 核心 Props 速查

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置（可为数组或对象） | `ProTableColumnType[]` \| `Record` | - |
| onQuery | 查询函数或 ahooks useRequest 结果 | `(params, extra) => Promise<Response>` \| `useRequest Result` | - |
| dataSource | 静态数据源（设置后 onQuery 失效） | `any[]` | - |
| title | 表格标题 | `string \| ReactNode` | - |
| rowKey | 行唯一标识 | `string` | `'id'` |
| ref / tableRef | 组件引用（两者指向同一对象） | `Ref<ProTableBuiltInPlugins>` | - |
| selectable | 是否可选择 | `boolean` | `false` |
| pagination | 分页配置，false 禁用 | `object \| false` | - |
| defaultPageSize | 初始每页条数 | `number` | `10` |
| pure | 纯表格模式（无外部边框和边距） | `boolean` | `false` |
| mini | 迷你模式 | `boolean` | `false` |
| sticky | 粘性表头 | `boolean \| { offsetBottom? }` | - |
| render | 自定义整体布局 | `({ queryField, tableExtra, table }) => JSX` | - |
| locale | 自定义文案 | `object` | - |
| localeKey | 国际化 key | `string` | - |
| mockDataSource | 启用模拟数据 | `boolean \| number` | `false` |

## Column 列配置速查

| 属性       | 说明                      | 类型                                 | 默认值   |
| ---------- | ------------------------- | ------------------------------------ | -------- |
| label      | 列头文字                  | `ReactNode`                          | -        |
| name       | 数据路径                  | `string \| string[]`                 | -        |
| type       | 值类型                    | `ValueType`                          | `'text'` |
| options    | 枚举值映射                | `EnumData[]`                         | -        |
| width      | 列宽度                    | `string \| number`                   | -        |
| hidden     | 隐藏此列                  | `boolean`                            | `false`  |
| copyable   | 支持复制                  | `boolean`                            | `false`  |
| tooltip    | label 右侧提示            | `ReactNode`                          | -        |
| queryField | 查询区域配置（true=继承） | `boolean \| FieldConfig`             | -        |
| editField  | 编辑区域配置（true=继承） | `boolean \| FieldConfig`             | -        |
| viewField  | 详情区域配置（true=继承） | `boolean \| FieldConfig`             | -        |
| addField   | 新增区域配置（true=继承） | `boolean \| FieldConfig`             | -        |
| mock       | 列 mock 规则              | -                                    | -        |
| render     | 自定义单元格渲染          | `(text, record, index) => ReactNode` | -        |

## 行展开详情（expandView）

在列配置中设置 `expandView: true` 的列，会被收集为展开区域的字段。表格自动支持**点击行展开**，展开区渲染为 ProForm 只读视图（Descriptions 样式）。

```tsx
<ProTable
  columns={{
    姓名: { label: '姓名', name: 'name' },
    邮箱: { label: '邮箱', name: 'email', expandView: true },
    地址: { label: '地址', name: 'address', expandView: true },
    备注: { label: '备注', name: 'remark', expandView: true },
  }}
  // 展开区域布局配置（可选）
  expandableDescriptionConfig={{ gridColumns: 2 }}
  // 或完全自定义展开区的 ProForm render
  expandableProFormRender={({ renderField }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {renderField('email')}
      {renderField('address')}
      {renderField('remark')}
    </div>
  )}
  // 也可传 antd expandable 的原生配置
  expandable={{ expandRowByClick: true }}
/>
```

**相关 Props：**

| 属性                          | 说明                       | 类型                             |
| ----------------------------- | -------------------------- | -------------------------------- |
| `column.expandView`           | 是否作为展开字段           | `boolean`                        |
| `column.expandViewField`      | 展开字段配置（覆盖列配置） | `FieldConfig`                    |
| `expandableDescriptionConfig` | 展开区 Descriptions 配置   | `ProFormRenderDescriptionParams` |
| `expandableProFormRender`     | 完全自定义展开区布局       | `ProFormProps['render']`         |
| `expandable`                  | antd Table expandable 配置 | `ExpandableConfig`               |

## 行号列（showDataSourceIndex）

内置行号列，无需手动定义：

```tsx
<ProTable
  showDataSourceIndex // 显示行号
  dataSourceIndexCalcWithPage // 行号跨页累加（如第2页从11开始）
  dataSourceIndexColumnConfig={{
    // 自定义行号列配置
    width: 60,
    fixed: 'left',
    label: '序号',
  }}
/>
```

## 单元格渲染内置捷径（builtIn render）

`column.render` 除了返回 ReactNode，还可以返回一个 `{ builtIn, props? }` 对象，使用内置的渲染模式：

```tsx
columns={{
  状态: {
    label: '状态', name: 'status',
    render: (value) => ({ builtIn: 'tag', props: { color: value === 1 ? 'green' : 'red' } }),
  },
  链接: {
    label: '链接', name: 'url',
    render: (value) => value ? { builtIn: 'link', props: { href: value, target: '_blank' } } : '--',
  },
  头像: {
    label: '头像', name: 'avatar',
    render: (value) => ({ builtIn: 'avatar', props: { src: value } }),
  },
  进度: {
    label: '完成度', name: 'progress',
    render: (value) => ({ builtIn: 'progress', props: { percent: value * 100 } }),
  },
}}
```

**支持的 builtIn 类型：**`text` | `link` | `tag` | `button` | `badge` | `image` | `progress` | `avatar` | `rate` | `field`

## 性能优化

### lazyRenderCell — 单元格懒渲染

ProTable 默认启用了智能懒渲染策略：

| 区域                | 行为                                  |
| ------------------- | ------------------------------------- |
| 前 15 行 × 前 10 列 | 直接渲染（不懒加载）                  |
| 前 15 行的操作列    | 直接渲染                              |
| 其余单元格          | IntersectionObserver + 128ms debounce |

可自定义策略：

```tsx
<ProTable
  lazyRenderCell={({ dataSource, column, item, xIndex, yIndex, isActionColumn }) => {
    if (yIndex <= 30) return false // 前30行都不懒加载
    return { threshold: 0, wait: 64 }
  }}
/>
```

传 `false` 可完全关闭：`lazyRenderCell={false}`

### lightweightRenderCell — 轻量渲染

启用后，非编辑态的单元格使用 `ReadonlyProFieldCore` 渲染（更快，但动态 field hook 失效）：

```tsx
<ProTable lightweightRenderCell />
```

## 样式与布局 Props

ProTable 分层结构：`wrapper > query + main > toolbar + body(table)`，可独立控制每层样式：

| 属性                | 说明                            | 类型            | 默认值                      |
| ------------------- | ------------------------------- | --------------- | --------------------------- |
| `wrapperStyle`      | 最外层容器样式                  | `CSSProperties` | -                           |
| `wrapperClassName`  | 最外层容器 className            | `string`        | -                           |
| `mainStyle`         | 主体区域（toolbar + table）样式 | `CSSProperties` | -                           |
| `mainClassName`     | 主体区域 className              | `string`        | -                           |
| `bodyStyle`         | table 区域样式                  | `CSSProperties` | -                           |
| `bodyClassName`     | table 区域 className            | `string`        | -                           |
| `toolbarStyle`      | 工具栏样式                      | `CSSProperties` | -                           |
| `queryWrapperStyle` | 查询区域包裹样式                | `CSSProperties` | `pure` 时自动 `{padding:0}` |
| `noBackgroundColor` | 去除默认白底（嵌入场景常用）    | `boolean`       | `false`                     |

```tsx
<ProTable
  noBackgroundColor
  wrapperStyle={{ border: '1px solid #f0f0f0' }}
  toolbarStyle={{ padding: '8px 16px' }}
  bodyStyle={{ minHeight: 300 }}
/>
```

## 表格尺寸与表头拖拽

| 属性               | 说明                                            | 类型                             | 默认值  |
| ------------------ | ----------------------------------------------- | -------------------------------- | ------- |
| `defaultSize`      | 默认表格尺寸（`mini` 为 true 时自动 `'small'`） | `'small' \| 'middle' \| 'large'` | -       |
| `defaultTableSize` | 同 `defaultSize`（别名）                        | 同上                             | -       |
| `resizableHeader`  | 表头列宽可拖拽调整（⚠️ 功能不稳定）             | `boolean`                        | `false` |

```tsx
<ProTable defaultSize="small" resizableHeader />
```

## 初始分页参数

除 `defaultPageSize` 外，还可通过对象形式精确控制初始页码与每页数：

```tsx
<ProTable
  initialPaginationParams={{ page: 1, pageSize: 50 }}
  // 或
  defaultPaginationParams={{ page: 1, pageSize: 20 }}
/>
```

两者语义相同（内部合并），优先级：`defaultPaginationParams > initialPaginationParams > defaultPageSize`。

## 其他实用 Props

| 属性                    | 说明                                       | 类型              | 默认值     |
| ----------------------- | ------------------------------------------ | ----------------- | ---------- |
| `hideColumnsWhenNoData` | 数据为空时隐藏所有列（减少空表格视觉噪音） | `boolean`         | `false`    |
| `stickyScrollBar`       | 吸底横向滚动条（随 `sticky` 联动）         | `boolean`         | `!!sticky` |
| `normalizeFieldValue`   | 是否序列化字段值（如 Moment→时间戳）       | `boolean`         | `true`     |
| `noTableHeaderEllipsis` | 表头不折叠省略                             | `boolean`         | -          |
| `noBatchToolbar`        | 隐藏批量操作工具栏                         | `boolean`         | -          |
| `tableExtraRender`      | 表格区域额外渲染                           | `() => ReactNode` | -          |

## 响应数据格式

```typescript
interface ServerResponse<T = any> {
  success: boolean
  data?: T
  total?: number
  message?: string | MessageArgsProps
  notification?: string | NotificationArgsProps // 也支持 notification 提示
}
```

## 字段类型

**输入**：text, password, textarea, digit/number, money, percent **选择**：select, multipleSelect, cascader, treeSelect, multipleTreeSelect, modalSelect, modalMultipleSelect, checkbox, radio, radioButton **日期时间**：date, dateTime, dateWeek, dateMonth, dateQuarter, dateYear, time, fromNow + 对应 Range 系列 **其他**：switch, rate, image, upload, slider, transfer, tree, singleTree

## 国际化

支持 zh-CN、en-US、id-ID，通过 `localeKey` 或 `ConfigProvider` 设置。

## 注意事项

- `refreshAfterEdit` 默认值源码为 `true`（MCP 旧文档标注 `false` 不准确）
- `columns` 支持对象格式，内部自动调用 `defineColumns(columns).getConfigs()`
- `onQuery` 可直接传入 ahooks `useRequest` 的结果对象
- `ref` 与 `tableRef` 指向同一 imperative handle（双写 useImperativeHandle）
- `id` prop 未在类型中声明但有效：内部用作 `queryFieldPersistKey` 默认值
- 插件名 `config`（非 `locale`）负责国际化配置
