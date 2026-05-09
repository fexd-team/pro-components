---
name: useCoverable-design
description: useCoverable 设计指南——传统组件 vs BC 组件的对比，何时选择 coverable 模式，以及 BC 包的设计优势
---

# useCoverable 设计指南

## 传统组件 vs BC 组件

### 问题场景

假设有一个「用户管理」页面需要在 3 个项目中复用，但每个项目的 API 路径、权限体系、部分列配置不同。

### 传统做法：Props 驱动

```tsx
interface UserManagerProps {
  apiBaseUrl?: string
  listApi?: string
  deleteApi?: string
  canAdd?: boolean
  canEdit?: boolean
  canDelete?: boolean
  extraColumns?: ColumnType[]
  hideStatusColumn?: boolean
  pageSize?: number
  title?: string
  onQueryTransform?: (params: any) => any
  onResponseTransform?: (response: any) => any
  // ... 随需求增长，props 会越来越多
}

function UserManager({
  apiBaseUrl = '/api',
  listApi = '/user/list',
  deleteApi = '/user/delete',
  canAdd = true,
  canEdit = true,
  canDelete = true,
  extraColumns = [],
  hideStatusColumn = false,
  pageSize = 10,
  title = '用户管理',
  onQueryTransform,
  onResponseTransform,
}: UserManagerProps) {
  return (
    <ProTable
      title={title}
      columns={[
        { label: '姓名', name: 'name' },
        !hideStatusColumn && { label: '状态', name: 'status', type: 'select' },
        ...extraColumns,
      ].filter(Boolean)}
      actions={canAdd ? ['add'] : []}
      columnActions={[canEdit && 'edit', canDelete && 'delete'].filter(Boolean)}
      pagination={{ pageSize }}
      onQuery={async (params) => {
        const transformedParams = onQueryTransform?.(params) ?? params
        const response = await request.get(apiBaseUrl + listApi, transformedParams)
        return onResponseTransform?.(response) ?? response
      }}
      onDelete={async (item) => {
        return await request.post(apiBaseUrl + deleteApi, { id: item.id })
      }}
    />
  )
}
```

**传统做法的问题**：

1. **Props 爆炸**：每新增一个定制需求就要加 prop，接口越来越庞大
2. **粒度不够**：想改某列的 `width` 或 `queryField`？得加更多 props 或用 `columnOverrides` 这种怪异设计
3. **逻辑分散**：`onQueryTransform` / `onResponseTransform` 等回调让 API 配置散落各处
4. **深层定制困难**：想换掉删除弹窗的文案？想给编辑弹窗加个字段？传统 props 很难优雅支持
5. **消费方代码重复**：3 个项目各写一大段 props，大部分是相同的

### BC 做法：Coverable 驱动

```tsx
const UserManager = useCoverable.component((props, ref) => {
  const apis = useCoverable({
    getList: request.coverable({
      url: '/api/user/list',
      method: 'get',
      handleParams: (params) => ({
        page: params?.page,
        page_size: params?.pageSize,
      }),
    }),
    delete: request.coverable({
      url: '/api/user/delete',
      method: 'post',
      handleParams: (item) => ({ id: item.id }),
    }),
  })

  const permission = useCoverable({
    search: true,
    add: true,
    edit: true,
    delete: true,
  })

  const tableProps = ProTable.useCoverableProps({
    title: '用户管理',
    columns: {
      姓名: { label: '姓名', name: 'name', queryField: true },
      状态: { label: '状态', name: 'status', type: 'select', options: [...] },
      创建时间: { label: '创建时间', name: 'created_at', type: 'dateTime' },
    },
    pagination: { pageSize: 10 },
    actions: permission.getConfig().add ? ['add'] : [],
    columnActions: {
      edit: permission.getConfig().edit ? 'edit' : (undefined as any),
      delete: permission.getConfig().delete ? 'delete' : (undefined as any),
    },
    onQuery: async (params) => apis.getConfig().getList(params),
    onDelete: async (item) => apis.getConfig().delete(item),
  })

  return useCoverable
    .props({ apis, permission, tableProps })
    .render(() => <ProTable {...tableProps.getProps()} />)
})
```

**消费方 A**（只需改权限）：

```tsx
<UserManager coverable={{ permission: { add: false, delete: false } }} />
```

**消费方 B**（API 路径不同）：

```tsx
<UserManager coverable={{ apis: { getList: { url: '/api/v2/users' } } }} />
```

**消费方 C**（隐藏某列 + 改分页）：

```tsx
<UserManager
  coverable={{
    tableProps: {
      columns: { 状态: { hidden: true } },
      pagination: { pageSize: 20 },
    },
  }}
/>
```

## BC 模式的设计优势

| 维度         | 传统 Props                 | BC Coverable                     |
| ------------ | -------------------------- | -------------------------------- |
| 定制粒度     | 预设的 props 级别          | 任意深度配置节点                 |
| 接口膨胀     | 需求增加 → props 增加      | 配置结构固定，覆盖无限扩展       |
| 消费方代码量 | 大量 props 传递            | 只传差异部分                     |
| API 定制能力 | 通常只能改 URL             | URL + 参数 + 响应 + 完全接管     |
| 维护性       | props 变更需通知所有消费方 | 内部重构不影响覆盖路径           |
| 类型安全     | 需手动维护                 | 自动从内部配置推导               |
| 新增需求     | 改组件接口 + 改所有消费方  | 只改组件内部配置（已有覆盖路径） |

## 设计决策：何时用传统组件，何时用 BC

### 适合传统 Props 组件

- 纯 UI 组件（Button、Card、Modal 等）
- 配置项少且固定
- 不存在「同一组件跨项目差异化使用」的需求
- 组件足够轻量，不涉及 API/权限/复杂逻辑

### 适合 BC Coverable 组件

- **整页级功能组件**：一个组件 = 一个完整的管理页面
- **跨项目复用**：多个工程使用同一套业务逻辑
- **配置项深且多**：涉及 API、权限、表格列、表单字段、业务逻辑等多层配置
- **差异化需求频繁**：不同项目经常需要微调某些细节
- **需要「默认就能用」**：消费方零配置即可渲染完整页面

### 判断标准

问自己：**这个组件是否需要在至少 2 个项目中以不同配置复用？**

- 是 → 考虑 BC 模式
- 否 → 传统组件即可

## BC 包的设计思维

### 思维转换：从「暴露接口」到「暴露配置路径」

传统组件思维：

> "用户可能需要定制 X，所以我加一个 `customX` prop"

BC 思维：

> "我把 X 作为配置写入 coverable，用户需要定制时自然能覆盖"

这意味着 BC 组件**不需要预测所有定制需求**——只要配置结构合理，任何节点都自动可覆盖。

### 配置分组设计原则

1. **按关注点分离**：APIs 一组、权限一组、UI配置一组、业务逻辑一组
2. **默认值完备**：每个配置都有合理默认值，零配置也能运行
3. **内聚性**：同一主题的配置放在同一组中（不要把权限散落在各处）
4. **粒度适中**：
   - 太粗：整个 tableProps 作为一个值 → 覆盖必须传完整配置
   - 太细：每个 column 单独一个 useCoverable → 管线复杂
   - 适中：tableProps 整体一个 useCoverableProps，内部通过深度合并支持任意粒度覆盖

### API 设计原则

1. **内聚**：所有请求放在同一个 `apis` 配置组中
2. **语义命名**：`getList` / `create` / `remove` 而非 `api1` / `api2`
3. **标准化接口**：所有 API 统一使用 `handleParams` 做格式转换，消费方只需改 URL 即可适配新后端
4. **向后兼容**：新增 API 不影响旧的覆盖配置

### 权限设计原则

1. **默认全开**：BC 组件的权限默认全部为 `true`
2. **消费方关闭**：消费方根据实际权限决定哪些功能关闭
3. **细粒度**：为每个操作独立声明权限标志（`search` / `add` / `edit` / `delete` / `export`）
4. **不做权限判断逻辑**：BC 只做「是否渲染/执行」，不判断具体权限值怎么来

## 渐进式设计

BC 组件可以**渐进式演进**：

### Phase 1：先写好普通组件

```tsx
function UserManager() {
  // 直接写死所有逻辑
  return <ProTable onQuery={...} columns={[...]} />
}
```

### Phase 2：提取为 BC

当需要复用时，用 `useCoverable.component` 包装，将可能变化的部分提取为配置：

```tsx
const UserManager = useCoverable.component(() => {
  const apis = useCoverable({ ... })
  const permission = useCoverable({ ... })
  const tableProps = ProTable.useCoverableProps({ ... })
  return useCoverable.props({ apis, permission, tableProps }).render(...)
})
```

### Phase 3：发布为独立包

当多个项目需要时，将 BC 组件移入独立的 monorepo 包，通过 npm 发布。

## 反模式

### ❌ 过度 coverable

不要让每一个值都变成独立的 coverable 配置组：

```tsx
// 过度：为每个属性创建独立的 useCoverable
const title = useCoverable({ value: '用户管理' })
const pageSize = useCoverable({ value: 10 })
const bordered = useCoverable({ value: true })
```

正确做法是放在一个有意义的组中：

```tsx
const tableProps = ProTable.useCoverableProps({
  title: '用户管理',
  pagination: { pageSize: 10 },
  bordered: true,
})
```

### ❌ 在 BC 内做权限判断来源

```tsx
// 错误：BC 不应该知道权限怎么来的
const permission = useCoverable({
  add: localStorage.getItem('role') === 'admin', // ❌
})
```

正确做法：BC 只声明默认值，权限判断由消费方负责：

```tsx
// BC 内
const permission = useCoverable({ add: true }) // ✅ 默认开启

// 消费方
<UserManager coverable={{ permission: { add: hasPermission('user:create') } }} />
```

### ❌ 滥用 functions

不要把所有逻辑都塞进 `functions` coverable：

```tsx
// 不好：把 UI 逻辑也放进 functions
const functions = useCoverable({
  getButtonColor: () => '#1890ff',
  formatDate: (date) => dayjs(date).format('YYYY-MM-DD'),
})
```

`functions` 应只放**核心业务逻辑**（数据处理、流程控制、算法等），普通 UI 逻辑保持在组件内部即可。
