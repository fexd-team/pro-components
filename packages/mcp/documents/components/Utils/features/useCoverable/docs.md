# useCoverable - 业务组件化 Hook

## 功能介绍

useCoverable 是一个用于业务组件化的 Hook，它可以将组件的默认配置和动态配置进行合并，实现组件的可覆盖配置，便于创建标准化的业务组件。

## 核心特性

- 🔧 **配置合并**：支持默认配置与运行时配置的智能合并
- 🎨 **组件标准化**：创建统一标准的业务组件
- 🔄 **配置覆盖**：通过 coverableProps 灵活覆盖默认配置
- 📦 **类型安全**：完整的 TypeScript 类型支持
- 🏷️ **组件命名**：支持自定义组件名称和显示名称

## API

### useCoverable

```typescript
const useCoverable = <T extends Record<string, any>>(defaultProps: T, options?: CoverableOptions) => {
  return {
    props: T & CoverableProps,
    Component: React.ComponentType<T>,
  }
}
```

### 参数说明

| 参数         | 说明         | 类型             | 默认值 |
| ------------ | ------------ | ---------------- | ------ |
| defaultProps | 默认属性配置 | T                | -      |
| options      | 可选配置     | CoverableOptions | -      |

### CoverableOptions

```typescript
interface CoverableOptions {
  name?: string // 组件名称
  displayName?: string // 显示名称
}
```

### CoverableProps

```typescript
interface CoverableProps {
  coverable?: boolean // 是否启用覆盖功能
  coverableProps?: Partial<T> // 覆盖配置
}
```

### 返回值

| 属性      | 说明             | 类型                   |
| --------- | ---------------- | ---------------------- |
| props     | 合并后的属性对象 | T & CoverableProps     |
| Component | 可配置的组件类型 | React.ComponentType<T> |

## 使用场景

### 1. 标准化表格组件

创建符合业务规范的标准表格组件：

```jsx
import { useCoverable } from '@fexd/pro-utils'
import { ProTable } from '@fexd/pro-components'

const useStandardTable = useCoverable(
  {
    actions: ['add'],
    iconActions: ['refresh', 'table-size', 'fullscreen'],
    columnActions: ['view', 'edit', 'delete'],
    pagination: {
      defaultPageSize: 20,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条记录`,
    },
  },
  {
    name: 'StandardTable',
    displayName: '标准表格',
  },
)
```

### 2. 标准化表单组件

创建标准的表单布局：

```jsx
const useStandardForm = useCoverable(
  {
    gridColumns: 3,
    gridGutter: [16, 16],
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  {
    name: 'StandardForm',
    displayName: '标准表单',
  },
)
```

### 3. 业务特定组件

创建特定业务场景的组件：

```jsx
const useUserManagementTable = useCoverable(
  {
    columns: [
      { title: '用户名', dataIndex: 'username', editField: true },
      { title: '邮箱', dataIndex: 'email', editField: true },
      { title: '角色', dataIndex: 'role', valueType: 'select', editField: true },
      { title: '状态', dataIndex: 'status', valueType: 'select' },
    ],
    actions: ['add'],
    columnActions: ['edit', 'delete'],
    selectable: true,
    batchActions: ['delete'],
  },
  {
    name: 'UserManagementTable',
  },
)
```

## 高级用法

### 条件配置覆盖

```jsx
const MyComponent = () => {
  const { props, Component } = useStandardTable()
  const [isManager, setIsManager] = useState(false)

  return (
    <Component
      {...props}
      // 根据用户权限动态覆盖配置
      coverableProps={
        isManager
          ? {
              actions: ['add', 'export', 'import'],
              columnActions: ['view', 'edit', 'delete', 'audit'],
            }
          : {
              actions: ['export'],
              columnActions: ['view'],
            }
      }
      onQuery={handleQuery}
    />
  )
}
```

### 嵌套配置合并

```jsx
const useAdvancedTable = useCoverable({
  ...useStandardTable().props,  // 继承标准配置
  queryField: {
    columns: 4,
    fields: [
      { label: '关键词', name: 'keyword, type: 'text' },
      { label: '状态', name: 'status', type: 'select' }
    ]
  }
}, {
  name: 'AdvancedTable'
})
```

## 最佳实践

### 1. 合理的默认配置

```jsx
// ✅ 好的默认配置
const useProductTable = useCoverable({
  columns: [
    { title: '商品名称', dataIndex: 'name', editField: true, queryField: true },
    { title: '价格', dataIndex: 'price', valueType: 'money', editField: true },
    { title: '库存', dataIndex: 'stock', editField: true },
    { title: '状态', dataIndex: 'status', valueType: 'select', valueEnum: statusOptions },
  ],
  actions: ['add'],
  iconActions: ['refresh'],
  columnActions: ['edit', 'delete'],
  pagination: { defaultPageSize: 20 },
})

// ❌ 过于复杂的默认配置
const useBadTable = useCoverable({
  // 包含了太多业务特定的配置
  onQuery: specificBusinessLogic, // 不应该在默认配置中包含具体业务逻辑
  columns: [
    /* 大量列配置 */
  ], // 太多列会影响组件的通用性
})
```

### 2. 清晰的组件命名

```jsx
// ✅ 清晰的命名
const useUserManagementTable = useCoverable(config, {
  name: 'UserManagementTable',
  displayName: '用户管理表格',
})

// ❌ 模糊的命名
const useTable1 = useCoverable(config, {
  name: 'Table1', // 命名不明确
})
```

### 3. 渐进式配置覆盖

```jsx
const MyTable = () => {
  const { props, Component } = useStandardTable()

  return (
    <Component
      {...props}
      // 只覆盖需要修改的配置
      coverableProps={{
        actions: [...props.actions, 'export'], // 在原有基础上添加
        columns: props.columns.map((col) =>
          col.dataIndex === 'status' ? { ...col, valueEnum: customStatusOptions } : col,
        ),
      }}
      onQuery={handleQuery}
    />
  )
}
```

## 注意事项

1. **避免过度配置**：默认配置应该简洁通用，避免包含过多业务特定逻辑
2. **类型安全**：确保 TypeScript 类型定义准确，便于开发时的类型检查
3. **性能考虑**：配置合并操作要考虑性能，避免在 render 函数中进行复杂的配置计算
4. **文档完整**：为自定义的 coverable 组件提供完整的使用文档
