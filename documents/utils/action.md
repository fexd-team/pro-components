---
title: Action - 操作按钮
order: 8
---

# Action 操作按钮

自动管理 loading 状态的操作按钮组件。点击后执行异步函数，自动显示加载状态，无需手动维护 `loading` state。

## 何时使用

- 表单提交、数据保存
- 删除/审批等异步操作
- 需要确认对话的危险操作

## API

```tsx | pure
<Action onClick={asyncHandler} {...antdButtonProps}>
  操作文字
</Action>
```

Action 继承 antd Button 的所有属性，额外增强 `onClick`：

| 属性    | 说明                                        | 类型                          | 默认值 |
| ------- | ------------------------------------------- | ----------------------------- | ------ |
| onClick | 点击处理（返回 Promise 时自动管理 loading） | () => void \| Promise\<void\> | -      |

### 自动 loading 行为

- `onClick` 返回 `Promise` 时自动设置 `loading=true`
- Promise 完成后自动恢复 `loading=false`
- 无需手动 `setLoading`

## 在线演示

<code src="./demos/action-basic.tsx"></code>

## 代码示例

### 基础异步按钮

```tsx | pure
import { Action } from '@fexd/pro-components'
;<Action
  type="primary"
  onClick={async () => {
    await api.saveData(formValues)
    message.success('保存成功')
  }}
>
  保存
</Action>
```

### 删除（带确认）

结合 `confirmPromise` 添加确认对话：

```tsx | pure
import { Action, confirmPromise } from '@fexd/pro-components'
;<Action
  danger
  onClick={async () => {
    const confirmed = await confirmPromise('确定要删除吗？')
    if (confirmed) {
      await api.delete(id)
      message.success('已删除')
    }
  }}
>
  删除
</Action>
```

### 表格操作列

```tsx | pure
const columns = [
  {
    title: '操作',
    render: (_, record) => (
      <Space>
        <Action type="link" onClick={() => showDetail(record)}>
          查看
        </Action>
        <Action type="link" onClick={() => handleEdit(record)}>
          编辑
        </Action>
        <Action
          type="link"
          danger
          onClick={async () => {
            await confirmPromise('确认删除？')
            await api.delete(record.id)
            refreshTable()
          }}
        >
          删除
        </Action>
      </Space>
    ),
  },
]
```

---

# confirmPromise 确认 Promise

弹出 Modal.confirm 确认框，以 Promise 形式返回用户选择结果。

## API

```tsx | pure
const confirmed = await confirmPromise(content, config?)
```

| 参数    | 说明                      | 类型                        |
| ------- | ------------------------- | --------------------------- |
| content | 确认内容或完整 Modal 配置 | ReactNode \| ModalFuncProps |
| config  | 其余 Modal 配置           | ModalFuncProps              |

**返回值**：`Promise<boolean>` — `true` 表示确认，`false` 表示取消

## 代码示例

```tsx | pure
import { confirmPromise } from '@fexd/pro-components'

// 简单确认
const ok = await confirmPromise('确定要执行此操作吗？')

// 完整配置
const ok = await confirmPromise({
  title: '警告',
  content: '此操作不可恢复！',
  okText: '确认删除',
  cancelText: '取消',
  okType: 'danger',
})
```

## 💡 与 showModal 的区别

| 对比维度   | confirmPromise | showModal                         |
| ---------- | -------------- | --------------------------------- |
| 返回类型   | boolean        | controller (promise/close/update) |
| 适合场景   | 简单确认       | 复杂弹窗（表单/详情/向导）        |
| 内容自由度 | 文本/简单组件  | 任意 React 组件                   |
