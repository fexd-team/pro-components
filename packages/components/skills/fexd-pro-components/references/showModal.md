---
name: showModal
description: 命令式模态框工具，支持灵活内容渲染、可拖拽、Promise 异步操作
---

# showModal 命令式弹窗

## 何时使用

- 确认对话框、表单弹窗、详情查看
- 需要 Promise 式的异步确认流程
- 动态内容更新、多步骤向导

## API

```typescript
const controller = showModal(content, options?)
```

### 参数

| 参数    | 说明     | 类型             | 默认值 |
| ------- | -------- | ---------------- | ------ |
| content | 弹窗内容 | React.ReactNode  | -      |
| options | 弹窗配置 | ShowModalOptions | -      |

### ShowModalOptions

| 属性           | 说明                    | 类型                          | 默认值 |
| -------------- | ----------------------- | ----------------------------- | ------ |
| title          | 弹窗标题                | React.ReactNode               | -      |
| width          | 宽度                    | number                        | -      |
| height         | 高度                    | number                        | -      |
| draggable      | 是否可拖拽              | boolean                       | false  |
| maskClosable   | 点击遮罩关闭            | boolean                       | -      |
| keyboard       | ESC 关闭                | boolean                       | -      |
| centered       | 垂直居中                | boolean                       | -      |
| zIndex         | 层级                    | number                        | -      |
| className      | 样式类名                | string                        | -      |
| style          | 自定义样式              | CSSProperties                 | -      |
| destroyOnClose | 关闭时销毁内容          | boolean                       | -      |
| okText         | 确认按钮文字            | string                        | -      |
| cancelText     | 取消按钮文字            | string                        | -      |
| footer         | 自定义底部（null 隐藏） | ReactNode \| null             | -      |
| onOk           | 确认回调                | () => void \| Promise\<void\> | -      |
| onCancel       | 取消回调                | () => void                    | -      |
| afterClose     | 关闭后回调              | () => void                    | -      |

### 返回值

| 属性    | 说明                          | 类型                        |
| ------- | ----------------------------- | --------------------------- |
| promise | 确认时 resolve，取消时 reject | Promise\<any\>              |
| close   | 手动关闭                      | (result?) => void           |
| update  | 更新内容和配置                | (content, options?) => void |

## 代码示例

### 确认对话框

```tsx
import { showModal } from '@fexd/pro-components'
import { message } from 'antd'

const handleDelete = async (id: string) => {
  try {
    await showModal('确定要删除这条记录吗？', {
      title: '确认删除',
      okText: '删除',
      cancelText: '取消',
    }).promise

    await api.delete(id)
    message.success('删除成功')
  } catch {
    // 用户取消，无需处理
  }
}
```

### 表单弹窗

```tsx
const showUserForm = (user = {}) => {
  showModal(
    <Form initialValues={user}>
      <Form.Item label="姓名" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="邮箱" name="email" required>
        <Input />
      </Form.Item>
    </Form>,
    {
      title: user.id ? '编辑用户' : '添加用户',
      width: 500,
      onOk: async () => {
        const values = await form.validateFields()
        await saveUser(values)
      },
    },
  )
}
```

### 详情查看（无底部按钮）

```tsx
showModal(
  <Descriptions column={2} bordered>
    <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
    <Descriptions.Item label="名称">{record.name}</Descriptions.Item>
  </Descriptions>,
  { title: '详细信息', width: 600, footer: null },
)
```

### 可拖拽弹窗

```tsx
showModal(<div>可拖拽内容</div>, { title: '可拖拽弹窗', draggable: true })
```

### 动态更新内容

```tsx
const controller = showModal(<div>准备中...</div>, { title: '进度', footer: null })

let progress = 0
const timer = setInterval(() => {
  progress += 10
  controller.update(<Progress percent={progress} />)
  if (progress >= 100) {
    clearInterval(timer)
    controller.close('完成')
  }
}, 500)
```

### 多步骤向导

```tsx
let step = 0
const controller = showModal(renderStep(0), {
  title: '步骤 1',
  okText: '下一步',
  onOk: () => {
    if (step < 2) {
      step++
      controller.update(renderStep(step), { title: `步骤 ${step + 1}`, okText: step === 2 ? '完成' : '下一步' })
      return false // 阻止关闭
    }
    return true
  },
})
```

## 注意事项

1. 避免嵌套弹窗，用步骤向导替代
2. 合理设置弹窗尺寸（表单 500-600px，详情 600-800px）
3. `onOk` 返回 `false` 可阻止弹窗关闭
4. 使用 `afterClose` 清理定时器、事件监听等资源
