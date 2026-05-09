---
title: showDrawer - 命令式抽屉
order: 6
---

# showDrawer 命令式抽屉

命令式抽屉组件，基于 antd Drawer，支持 Promise 和动态内容。无需维护 `open` 状态，一行代码打开侧边面板。

## 何时使用

- 侧边面板展示详情或表单
- 命令式调用，无需状态管理
- 需要 Promise 等待抽屉关闭

## API

```tsx | pure
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

### 返回值 controller

| 属性    | 说明                         | 类型                                   |
| ------- | ---------------------------- | -------------------------------------- |
| promise | 抽屉关闭时 resolve           | Promise\<void\>                        |
| close   | 关闭抽屉                     | () => void                             |
| destroy | 销毁抽屉                     | () => void                             |
| update  | 更新配置                     | (props: Record\<string, any\>) => void |
| open    | 重新打开已关闭抽屉（极少用） | () => void                             |

## 在线演示

<code src="./demos/showDrawer-basic.tsx"></code>

## 代码示例

### 详情抽屉

```tsx | pure
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

```tsx | pure
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

```tsx | pure
await showDrawer({ title: '配置', content: <Settings /> }).promise
console.log('抽屉已关闭')
```

## 💡 与 showModal 的区别

| 特性     | showModal      | showDrawer             |
| -------- | -------------- | ---------------------- |
| 展示位置 | 屏幕中央       | 侧边滑出               |
| 适合场景 | 确认/表单/详情 | 详情面板/编辑表单/配置 |
| 拖拽支持 | ✅ `draggable` | ❌                     |
| 内容区域 | 受限于弹窗尺寸 | 纵向可无限滚动         |
