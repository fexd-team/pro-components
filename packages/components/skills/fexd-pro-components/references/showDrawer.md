---
name: showDrawer
description: 命令式抽屉组件，基于 antd Drawer，支持 Promise 和动态内容
---

# showDrawer 命令式抽屉

## 何时使用

- 侧边面板展示详情或表单
- 命令式调用，无需状态管理
- 需要 Promise 等待抽屉关闭

## API

```typescript
const controller = showDrawer(config)
```

### ShowDrawerConfig

继承 antd Drawer 属性，额外支持：

| 属性           | 说明                                | 类型                                           | 默认值 |
| -------------- | ----------------------------------- | ---------------------------------------------- | ------ |
| content        | 抽屉内容（可传函数接收 controller） | ReactNode \| (controller) => ReactNode         | -      |
| title          | 抽屉标题                            | ReactNode                                      | -      |
| width          | 宽度                                | number                                         | -      |
| destroyOnClose | 关闭时销毁                          | boolean                                        | true   |
| footer         | 底部内容                            | ReactNode \| null \| (controller) => ReactNode | -      |
| okText         | 确认按钮文字                        | string                                         | -      |
| cancelText     | 取消按钮文字                        | string                                         | -      |
| onOk           | 确认回调                            | () => void \| Promise\<void\>                  | -      |
| onCancel       | 取消回调                            | () => void                                     | -      |
| afterClose     | 关闭后回调                          | () => void                                     | -      |

### 返回值

| 属性    | 说明               | 类型            |
| ------- | ------------------ | --------------- |
| promise | 抽屉关闭时 resolve | Promise\<void\> |
| open    | 打开抽屉           | () => void      |
| close   | 关闭抽屉           | () => void      |
| destroy | 销毁抽屉           | () => void      |
| update  | 更新配置           | (props) => void |

## 代码示例

### 详情抽屉

```tsx
import { showDrawer } from '@fexd/pro-components'

const showDetail = (record) => {
  showDrawer({
    title: '详细信息',
    width: 600,
    content: (
      <Descriptions column={1}>
        <Descriptions.Item label="名称">{record.name}</Descriptions.Item>
        <Descriptions.Item label="状态">{record.status}</Descriptions.Item>
      </Descriptions>
    ),
    footer: null,
  })
}
```

### 表单抽屉

```tsx
showDrawer({
  title: '编辑用户',
  width: 500,
  content: (controller) => (
    <Form
      onFinish={async (values) => {
        await saveUser(values)
        controller.close()
      }}
    >
      <Form.Item label="姓名" name="name">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  ),
  footer: null,
})
```

### Promise 等待

```tsx
await showDrawer({ title: '配置', content: <Settings /> }).promise
console.log('抽屉已关闭')
```
