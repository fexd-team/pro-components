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

## 响应数据格式

```typescript
interface ServerResponse<T = any> {
  success: boolean
  data?: T
  total?: number
  message?: any
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
