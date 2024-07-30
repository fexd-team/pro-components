---
title: 命令式方法
order: 2
---

# 放大图片

## showImages

```tsx | pure
import React from 'react'
import { Action, showImages } from '@fexd/pro-utils'

export default () => {
  return (
    <Action
      onClick={async () => {
        const controller = showImages([
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          'https://ecommerce-business-rd1-goods-service-test.oss-cn-hongkong.aliyuncs.com/kugpt/e9434da9c3b746aaac24fb9272af58b21380.png',
        ])

        await controller.promise
      }}
    >
      展示图片
    </Action>
  )
}
```

```tsx
import React from 'react'
import { Action, showImages } from '@fexd/pro-utils'

export default () => {
  return (
    <Action
      onClick={async () => {
        const controller = showImages([
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          'https://ecommerce-business-rd1-goods-service-test.oss-cn-hongkong.aliyuncs.com/kugpt/e9434da9c3b746aaac24fb9272af58b21380.png',
        ])

        await controller.promise
      }}
    >
      展示图片
    </Action>
  )
}
```
