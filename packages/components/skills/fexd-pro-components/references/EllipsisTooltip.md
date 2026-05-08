---
name: EllipsisTooltip
description: 超出省略 + 悬浮提示，仅在文本被截断时显示 Tooltip
---

# EllipsisTooltip 省略提示

## 何时使用

- 长文本需要单行省略
- 只在文本被截断时才显示完整内容的 Tooltip

## API

继承 antd Tooltip 属性，额外支持：

| 属性           | 说明                  | 类型           | 默认值   |
| -------------- | --------------------- | -------------- | -------- |
| children       | 文本内容              | ReactNode      | -        |
| tooltipContent | Tooltip 显示内容      | ReactNode      | children |
| wrapperProps   | 外层 span 的 DOM 属性 | HTMLAttributes | -        |

## 代码示例

```tsx
import { EllipsisTooltip } from '@fexd/pro-components'

<EllipsisTooltip>
  这是一段很长很长的文本，当宽度不够时会省略并在悬浮时显示完整内容
</EllipsisTooltip>

// 自定义 Tooltip 内容
<EllipsisTooltip tooltipContent={<div>详细说明...</div>}>
  简短文本
</EllipsisTooltip>
```

## 工作原理

通过 `mouseenter` 事件比较 `scrollWidth > offsetWidth` 判断是否发生了省略。未省略时强制不显示 Tooltip。
