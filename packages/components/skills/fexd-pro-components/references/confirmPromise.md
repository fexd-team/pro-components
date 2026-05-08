---
name: confirmPromise
description: 确认框 Promise，弹出 Modal.confirm 并返回 Promise 结果
---

# confirmPromise 确认 Promise

## 何时使用

- 需要用户确认后再执行操作
- 替代手动管理 Modal.confirm 状态

## API

```typescript
const confirmed = await confirmPromise(content, config?)
// confirmed: true（确认） / false（取消）
```

| 参数    | 说明                      | 类型                        |
| ------- | ------------------------- | --------------------------- |
| content | 确认内容或完整 Modal 配置 | ReactNode \| ModalFuncProps |
| config  | 其余 Modal 配置           | ModalFuncProps              |

## 代码示例

```tsx
import { confirmPromise } from '@fexd/pro-components'

const handleDelete = async () => {
  const confirmed = await confirmPromise('确定要删除这条记录吗？')
  if (confirmed) {
    await api.delete(id)
    message.success('删除成功')
  }
}

// 完整配置
await confirmPromise({
  title: '警告',
  content: '此操作不可恢复！',
  okText: '确认删除',
  cancelText: '取消',
  okType: 'danger',
})
```

## 与 showModal 的区别

- **confirmPromise**：轻量确认对话，返回 boolean
- **showModal**：完整弹窗，支持自定义内容、动态更新
