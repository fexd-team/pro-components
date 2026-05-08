---
name: Button
description: 增强按钮组件，基于 antd Button，内置 useAutoLoading 防抖 loading
---

# Button 增强按钮

## 何时使用

- 替代 antd Button，获得自动 loading 能力
- 异步 onClick 自动显示加载状态
- 防抖 loading 避免短时闪烁

## API

继承 antd Button 所有属性，额外支持：

| 属性                 | 说明                             | 类型                          | 默认值 |
| -------------------- | -------------------------------- | ----------------------------- | ------ |
| debouncedAutoLoading | 是否使用防抖 loading（约 100ms） | boolean                       | true   |
| onClick              | 点击回调，支持异步               | () => void \| Promise\<void\> | -      |

## 与 Action 的区别

- **Button**：轻量增强，仅加自动 loading
- **Action**：在 Button 基础上加确认操作、错误处理，功能更丰富

需要确认操作时用 `Action`，只需自动 loading 时用 `Button`。

## 代码示例

```tsx
import { Button } from '@fexd/pro-components'
;<Button
  type="primary"
  onClick={async () => {
    await api.submit(data)
    message.success('提交成功')
  }}
>
  提交
</Button>
```
