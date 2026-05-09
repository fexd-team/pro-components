---
name: useCoverable-consume
description: BC（业务组件）消费方使用指南——如何通过 coverable prop 覆盖权限、API、表格列、枚举和业务逻辑
---

# BC 消费方使用指南

## 核心原则

消费 BC 组件时，通过 `coverable` prop 传入要覆盖的配置。只需传变更部分，其余保持 BC 内置默认值。

```tsx
import { SomePageComponent } from '@scope/module-name'
;<SomePageComponent
  coverable={{
    configGroupName: {
      configKey: overrideValue,
    },
  }}
/>
```

`coverable` 的一级 key 对应 BC 内部 `useCoverable.props()` 中注册的配置组名称。

## 覆盖场景大全

### 场景 1：权限控制（最常见）

根据当前用户权限动态控制功能开关：

```tsx
import { DataManager } from '@scope/module-engine'
import { usePermission } from '@/hooks'

export default function Page() {
  const { hasPermission } = usePermission()

  return (
    <DataManager
      coverable={{
        permission: {
          search: true,
          add: hasPermission('module:create'),
          edit: hasPermission('module:update'),
          delete: hasPermission('module:delete'),
          export: hasPermission('module:export'),
        },
      }}
    />
  )
}
```

### 场景 2：覆盖 API 地址

不同部署环境或微服务路由的 API 前缀不同：

```tsx
<DataManager
  coverable={{
    apis: {
      getList: { url: '/api/v2/module/list' },
      getMetadata: { url: '/api/v2/module/metadata' },
    },
  }}
/>
```

### 场景 3：覆盖 API 参数处理

后端参数格式不同时覆盖 `handleParams`：

```tsx
<DataManager
  coverable={{
    apis: {
      getList: {
        handleParams: (params) => ({
          ...params,
          page_num: params?.page,
          page_count: params?.pageSize,
        }),
      },
    },
  }}
/>
```

### 场景 4：完全接管某个 API

用自定义函数替换内置请求逻辑：

```tsx
<DataManager
  coverable={{
    apis: {
      getList: async (params) => {
        const result = await myCustomFetch('/custom/endpoint', params)
        return { success: true, data: result.items, total: result.count }
      },
    },
  }}
/>
```

### 场景 5：覆盖表格列配置

修改列的查询字段、隐藏列、调整宽度等：

```tsx
<DataManager
  coverable={{
    tableProps: {
      columns: {
        名称: {
          queryField: { placeholder: '请输入关键词搜索' },
          width: 250,
        },
        状态: { hidden: true },
        创建时间: {
          queryField: {
            type: 'dateRange',
            name: 'time_range',
          },
        },
      },
    },
  }}
/>
```

### 场景 6：覆盖表格标题/全局属性

```tsx
<DataManager
  coverable={{
    tableProps: {
      title: '自定义标题',
      bordered: false,
      size: 'small',
      pagination: { pageSize: 20 },
    },
  }}
/>
```

### 场景 7：覆盖枚举/选项映射

```tsx
<DataManager
  coverable={{
    options: {
      typeMapping: {
        typeA: '自定义类型A名称',
        typeC: '新增类型C',
      },
    },
  }}
/>
```

### 场景 8：覆盖业务逻辑函数

```tsx
<DataManager
  coverable={{
    functions: {
      filterItems: (key, item) => key !== 'deprecated' && key !== 'hidden',
      formatExportData: (records) => records.map((r) => ({ ...r, extra: 'field' })),
    },
  }}
/>
```

### 场景 9：覆盖表单字段配置

```tsx
<FormPageComponent
  coverable={{
    formProps: {
      fields: {
        审核状态: { hidden: false },
        备注: { required: true },
      },
    },
  }}
/>
```

### 场景 10：函数式 coverable（基于默认配置计算）

当需要基于默认值进行计算时，使用函数形式：

```tsx
<DataManager
  coverable={(defaultConfig) => ({
    tableProps: {
      pagination: {
        pageSize: defaultConfig.tableProps.pagination.pageSize * 2,
      },
    },
  })}
/>
```

### 场景 11：数组按索引覆盖

```tsx
<DataManager
  coverable={{
    options: {
      tabList: { 2: '新标签名称' },
    },
  }}
/>
```

## 嵌套组件的 coverable 传递

某些 BC 是由多个子 BC 组合而成，此时通过顶层 Props 分发：

```tsx
<CompositeManager
  visibleTabs={['组别管理', '队列管理', '自动审核']}
  SubModuleAProps={{
    coverable: {
      access: {
        add: hasPermission('subA:create'),
        edit: hasPermission('subA:update'),
        delete: hasPermission('subA:delete'),
      },
    },
  }}
  SubModuleBProps={{
    coverable: {
      access: {
        add: hasPermission('subB:create'),
        edit: hasPermission('subB:update'),
      },
    },
  }}
/>
```

## 通过 Ref 外部控制

BC 组件如果通过 `useImperativeHandle` 暴露了控制器，消费方可以获取并操作：

```tsx
function Page() {
  const ref = useRef(null)

  const handleRefresh = () => {
    ref.current?.tableController?.refresh?.()
  }

  return (
    <>
      <Button onClick={handleRefresh}>手动刷新</Button>
      <DataManager ref={ref} coverable={{ permission: { search: true } }} />
    </>
  )
}
```

## 消费方极简用法

大多数情况下消费方只需传入权限即可，其余保持默认：

```tsx
import { DataManager } from '@scope/module-name'

export default () => (
  <DataManager
    coverable={{
      permission: {
        search: true,
        add: hasPermission('create'),
        delete: hasPermission('delete'),
      },
    }}
  />
)
```

## 覆盖路径速查

| coverable 路径                     | 对应 BC 内部配置           | 常见覆盖内容                                  |
| ---------------------------------- | -------------------------- | --------------------------------------------- |
| `permission.xxx`                   | 权限开关                   | `true`/`false`                                |
| `apis.apiName`                     | API 请求配置               | `{ url }` / `{ handleParams }` / 函数         |
| `tableProps.columns.columnKey.xxx` | 表格列（key 由 BC 定义）   | `{ hidden }` / `{ queryField }` / `{ width }` |
| `tableProps.title`                 | 表格标题                   | 字符串                                        |
| `tableProps.pagination`            | 分页配置                   | `{ pageSize }`                                |
| `options.optionName`               | 枚举映射                   | 对象/数组                                     |
| `functions.funcName`               | 业务逻辑                   | 新函数                                        |
| `formProps.fields.fieldKey`        | 表单字段（key 由 BC 定义） | `{ hidden }` / `{ required }`                 |

> columns/fields 的 key 由 BC 组件内部定义，可以是中文也可以是英文，具体取决于 BC 的编码风格。覆盖时使用与 BC 内部一致的 key 即可。

## 注意事项

1. **只传差异**：不需要覆盖的字段不要传，BC 会保持默认值
2. **深度合并**：对象类型会递归合并，不是整体替换
3. **数组覆盖**：数组默认不合并，用 `{ index: value }` 语法按索引修改
4. **函数替换**：基本类型和函数是直接替换，不会合并
5. **API 覆盖**：对象形式深度合并配置，函数形式完全接管请求
6. **权限惯例**：BC 默认开启全部权限，消费方按需关闭（而非反过来）
