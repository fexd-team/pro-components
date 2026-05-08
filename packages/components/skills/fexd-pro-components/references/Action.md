---
name: Action
description: 增强的按钮组件，集成加载状态管理、确认操作、异步处理等功能
---

# Action 操作按钮

## 何时使用

- 异步操作按钮（自动 loading）
- 危险操作需要确认
- 防重复点击

## API

继承 antd Button 的所有属性，额外支持：

| 属性           | 说明               | 类型                          | 默认值     |
| -------------- | ------------------ | ----------------------------- | ---------- |
| loading        | 手动控制加载状态   | boolean                       | false      |
| confirm        | 确认提示           | boolean \| string             | false      |
| confirmTitle   | 确认弹窗标题       | string                        | '确认操作' |
| confirmContent | 确认弹窗内容       | React.ReactNode               | -          |
| onClick        | 点击回调，支持异步 | () => void \| Promise\<void\> | -          |
| onError        | 错误处理回调       | (error: Error) => void        | -          |

## 代码示例

### 异步操作按钮

```tsx
import { Action } from '@fexd/pro-components'
import { message } from 'antd'
;<Action
  type="primary"
  onClick={async () => {
    await submitForm()
    message.success('提交成功')
  }}
>
  提交
</Action>
```

### 确认操作

```tsx
<Action
  danger
  confirm="确定要删除这条记录吗？"
  onClick={async () => {
    await deleteRecord(id)
    message.success('删除成功')
  }}
>
  删除
</Action>
```

### 自定义确认内容

```tsx
<Action
  confirm
  confirmTitle="危险操作"
  confirmContent={
    <div>
      <p>此操作不可逆！</p>
    </div>
  }
  onClick={async () => {
    await dangerousAction()
  }}
>
  危险操作
</Action>
```

### 错误处理

```tsx
<Action
  onClick={async () => {
    await riskyOperation()
  }}
  onError={(error) => {
    message.error(error?.message || '操作失败，请重试')
  }}
>
  提交
</Action>
```

> `onError` 在 `onClick` 抛出异常（reject）时触发，接收标准 `Error` 对象。

### 表单提交

```tsx
<Action
  type="primary"
  onClick={async () => {
    const values = await form.validateFields()
    await api.submit(values)
    message.success('提交成功')
  }}
  onError={(error) => message.error(`提交失败: ${error.message}`)}
>
  提交表单
</Action>
```

### 批量操作

```tsx
<Action
  danger
  disabled={selectedIds.length === 0}
  confirm={`确定要删除选中的 ${selectedIds.length} 条记录吗？`}
  onClick={async () => {
    await batchDelete(selectedIds)
    message.success(`删除 ${selectedIds.length} 条成功`)
  }}
>
  批量删除
</Action>
```

## 注意事项

1. 异步 `onClick` 自动管理 loading，无需手动 useState
2. 自动防止重复点击
3. 只对真正有风险的操作使用 `confirm`
4. 向用户显示易懂的错误信息
