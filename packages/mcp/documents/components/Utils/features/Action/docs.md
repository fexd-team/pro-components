# Action - 通用操作按钮组件

## 功能介绍

Action 是一个增强的按钮组件，集成了加载状态管理、确认操作、异步处理等功能，简化了日常开发中的按钮交互逻辑。

## 核心特性

- ⚡ **自动加载状态**：异步操作时自动显示加载状态
- ✅ **确认操作**：危险操作自动弹出确认对话框
- 🎨 **样式继承**：完全兼容 antd Button 的所有样式和属性
- 🔄 **Promise 支持**：支持异步函数的自动状态管理
- 🛡️ **错误处理**：内置错误捕获和提示机制
- 🎯 **防重复点击**：自动防止重复提交

## API

### Action

```typescript
interface ActionProps extends ButtonProps {
  loading?: boolean // 手动控制加载状态
  confirm?: boolean | string // 确认提示，true 使用默认文案
  confirmTitle?: string // 确认弹窗标题
  confirmContent?: React.ReactNode // 确认弹窗内容
  onClick?: () => void | Promise<void> // 点击回调，支持异步函数
  onError?: (error: Error) => void // 错误处理回调
}
```

### 属性说明

| 属性           | 说明                         | 类型                        | 默认值     |
| -------------- | ---------------------------- | --------------------------- | ---------- |
| loading        | 手动控制加载状态             | boolean                     | false      |
| confirm        | 是否需要确认，可传入确认文案 | boolean \| string           | false      |
| confirmTitle   | 确认弹窗标题                 | string                      | '确认操作' |
| confirmContent | 确认弹窗内容                 | React.ReactNode             | -          |
| onClick        | 点击回调，支持异步操作       | () => void \| Promise<void> | -          |
| onError        | 错误处理回调                 | (error: Error) => void      | -          |

继承 antd Button 的所有属性：`type`、`size`、`disabled`、`danger`、`ghost`、`shape`、`icon` 等。

## 使用场景

### 1. 基础按钮

```jsx
import { Action } from '@fexd/pro-utils'
;<Action onClick={() => console.log('点击')}>基础按钮</Action>
```

### 2. 异步操作按钮

```jsx
<Action
  type="primary"
  onClick={async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('异步操作完成')
  }}
>
  异步操作
</Action>
```

### 3. 确认操作按钮

```jsx
<Action
  danger
  confirm="确定要删除这条记录吗？"
  onClick={() => {
    console.log('执行删除操作')
  }}
>
  删除
</Action>
```

### 4. 自定义确认内容

```jsx
<Action
  confirm
  confirmTitle="危险操作警告"
  confirmContent={
    <div>
      <p>此操作将永久删除数据，无法恢复！</p>
      <p>请确认您要继续执行此操作。</p>
    </div>
  }
  onClick={async () => {
    await deleteData()
  }}
>
  危险操作
</Action>
```

## 实际应用示例

### 表单提交按钮

```jsx
const SubmitButton = ({ form, onSubmit }) => {
  return (
    <Action
      type="primary"
      onClick={async () => {
        const values = await form.validateFields()
        await onSubmit(values)
        message.success('提交成功')
      }}
      onError={(error) => {
        message.error(`提交失败: ${error.message}`)
      }}
    >
      提交表单
    </Action>
  )
}
```

### 数据导出按钮

```jsx
const ExportButton = ({ filters }) => {
  return (
    <Action
      icon={<DownloadOutlined />}
      onClick={async () => {
        const data = await exportData(filters)
        downloadFile(data, 'export.xlsx')
        message.success('导出完成')
      }}
    >
      导出数据
    </Action>
  )
}
```

### 批量操作按钮

```jsx
const BatchDeleteButton = ({ selectedIds }) => {
  return (
    <Action
      danger
      disabled={selectedIds.length === 0}
      confirm={`确定要删除选中的 ${selectedIds.length} 条记录吗？`}
      onClick={async () => {
        await batchDelete(selectedIds)
        message.success(`成功删除 ${selectedIds.length} 条记录`)
      }}
    >
      批量删除
    </Action>
  )
}
```

## 高级功能

### 错误处理

```jsx
<Action
  onClick={async () => {
    throw new Error('模拟错误')
  }}
  onError={(error) => {
    // 自定义错误处理
    notification.error({
      message: '操作失败',
      description: error.message,
      duration: 5,
    })
  }}
>
  会出错的操作
</Action>
```

### 条件确认

```jsx
const ConditionalConfirmButton = ({ isRisky, data }) => {
  return (
    <Action
      confirm={isRisky ? '这是一个高风险操作，确定继续吗？' : false}
      onClick={async () => {
        await processData(data)
      }}
    >
      处理数据
    </Action>
  )
}
```

### 复杂异步流程

```jsx
const ComplexFlowButton = () => {
  return (
    <Action
      onClick={async () => {
        // 第一步：验证
        await validatePermission()

        // 第二步：预处理
        await preprocessData()

        // 第三步：执行主要操作
        await mainOperation()

        // 第四步：后处理
        await postProcess()

        message.success('所有步骤完成')
      }}
      onError={(error) => {
        console.error('流程执行失败:', error)
        message.error('执行失败，请重试')
      }}
    >
      执行复杂流程
    </Action>
  )
}
```

## 最佳实践

### 1. 合理使用确认功能

```jsx
// ✅ 危险操作使用确认
<Action
  danger
  confirm="确定要删除吗？"
  onClick={handleDelete}
>
  删除
</Action>

// ✅ 批量操作提醒影响范围
<Action
  confirm={(count) => `确定要处理 ${count} 条数据吗？`}
  onClick={handleBatch}
>
  批量处理
</Action>

// ❌ 普通操作不需要确认
<Action confirm onClick={handleView}>查看</Action>
```

### 2. 适当的错误处理

```jsx
// ✅ 提供用户友好的错误信息
<Action
  onClick={handleSubmit}
  onError={(error) => {
    if (error.code === 'NETWORK_ERROR') {
      message.error('网络连接失败，请检查网络设置')
    } else if (error.code === 'VALIDATION_ERROR') {
      message.error('数据验证失败，请检查输入')
    } else {
      message.error('操作失败，请重试')
    }
  }}
>
  提交
</Action>

// ❌ 直接显示技术错误信息
<Action
  onClick={handleSubmit}
  onError={(error) => {
    message.error(error.message) // 可能显示技术细节
  }}
>
  提交
</Action>
```

### 3. 按钮状态管理

```jsx
// ✅ 合理的禁用逻辑
const SubmitButton = ({ form, hasChanges }) => {
  return (
    <Action
      type="primary"
      disabled={!hasChanges}
      onClick={async () => {
        await submitForm(form)
      }}
    >
      {hasChanges ? '提交更改' : '没有更改'}
    </Action>
  )
}

// ✅ 根据权限控制按钮
const PermissionButton = ({ hasPermission }) => {
  if (!hasPermission) {
    return (
      <Tooltip title="您没有执行此操作的权限">
        <Action disabled>受限操作</Action>
      </Tooltip>
    )
  }

  return <Action onClick={handleAction}>执行操作</Action>
}
```

## 注意事项

1. **避免过度使用确认**：只对真正有风险的操作使用确认功能
2. **错误信息要友好**：向用户显示易懂的错误信息，而不是技术错误
3. **加载状态自动管理**：异步操作的加载状态由组件自动管理，无需手动控制
4. **防重复点击**：组件自动防止异步操作期间的重复点击
5. **性能考虑**：避免在 onClick 中进行复杂的同步计算
