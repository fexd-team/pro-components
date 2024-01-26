---
group: 全局规范
title: 弹窗与抽屉
---

## 什么时候使用

### 弹窗

1. 页面内容较轻，可快速回上级页面
1. 页面相对独立，可不参照上级页面内容
1. 适合解决较为简单一次性操作内容

> Note:
>
> - 尽量避免弹窗上叠加弹窗
> - 弹出弹窗时锁定背景页面禁止跟随弹窗滚动
> - 原路返回，由哪个页面弹出弹窗，关闭弹窗后显示哪个页面

```jsx
/**
 * inline: true
 */
import React, { useMemo } from 'react'
import { Space, message, notification, Button } from 'antd'
import {
  t,
  ProTable,
  ConfigProvider,
  ProField,
  Action,
  showModal,
  showDrawer,
  ModalStation,
  Hook,
  Tooltip,
} from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { DeleteOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider localeKey="zh_CN">
    <RuleDemos
      demos={[
        {
          name: '弹窗演示',
          content: (
            <Space>
              <Action
                type="primary"
                onClick={() => {
                  showModal({
                    title: '普通弹窗',
                    content: <>普通弹窗</>,
                    // drawer: true,
                    // actions: [
                    //   {
                    //     type: 'primary',
                    //     content: 'test',
                    //     async onClick() {
                    //       await delay(1000)
                    //     },
                    //   },
                    //   {
                    //     content: 'test',
                    //     async onClick() {
                    //       await delay(1000)
                    //     },
                    //   },
                    // ],
                    // async onCancel() {
                    //   await delay(1000)
                    // },
                  })
                }}
              >
                普通弹窗
              </Action>
              <Action
                onClick={() => {
                  showModal({
                    title: '默认全屏',
                    content: <>默认全屏</>,
                    defaultFullscreen: true,
                  })
                }}
              >
                默认全屏
              </Action>
              <Action
                onClick={() => {
                  showModal({
                    title: '不可全屏、不可拖拽',
                    content: <>不可全屏、不可拖拽</>,
                    fullscreenable: false,
                    draggable: false,
                    translucent: false,
                  })
                }}
              >
                不可全屏、不可拖拽、不可半透明
              </Action>
            </Space>
          ),
        },
      ]}
    />
  </ConfigProvider>
)
```

### 抽屉

1. 表单较长，或是需要临时展示一些文档
1. 需要附加面板来控制父窗体，这个面板需要时呼出
1. 在当前任务流中插入临时任务，创建或预览附加内容，例如协议条款

> Note:
>
> - 抽屉页面上可以更深一步操作弹出弹窗或再叠加一个抽屉
> - 弹出弹窗时锁定背景页面禁止跟随弹窗滚动
> - 原路返回，由哪个页面弹出弹窗，关闭弹窗后显示哪个页面
> - 避免中间弹窗跳转抽屉弹窗的交互方式

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message, notification } from 'antd'
import {
  t,
  ProTable,
  ConfigProvider,
  ProField,
  Action,
  showModal,
  showDrawer,
  ModalStation,
} from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { DeleteOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider localeKey="zh_CN">
    <RuleDemos
      demos={[
        {
          name: '抽屉演示',
          content: (
            <Space>
              <Action
                type="primary"
                onClick={() => {
                  showModal({
                    drawer: true,
                    title: '右侧弹出的抽屉',
                    content: <>右侧弹出的抽屉</>,
                  })
                }}
              >
                右侧弹出
              </Action>
              <Action
                onClick={() => {
                  showModal({
                    drawer: true,
                    title: '左侧弹出的抽屉',
                    content: <>左侧弹出的抽屉</>,
                    placement: 'left',
                  })
                }}
              >
                左侧弹出
              </Action>
              <Action
                onClick={() => {
                  showModal({
                    drawer: true,
                    title: '下方弹出的抽屉',
                    content: <>下方弹出的抽屉</>,
                    placement: 'bottom',
                  })
                }}
              >
                下方弹出
              </Action>
              <Action
                onClick={() => {
                  showModal({
                    drawer: true,
                    title: '上方弹出的抽屉',
                    content: <>上方弹出的抽屉</>,
                    placement: 'top',
                  })
                }}
              >
                上方弹出
              </Action>
            </Space>
          ),
        },
      ]}
    />
  </ConfigProvider>
)
```

### 页面跳转

1. 当前页面与即将操作的页面关联性弱
1. 当页面承载内容过多，或需要打开新一个网址链接

> Note:
>
> - 跳转新页面时需要有较为明显的返回上级页面的按钮

<!-- > - 注意区分像弹窗的页面，和像页面的弹窗 -->

<!-- <ZoomImage src="https://image.woshipm.com/wp-files/2020/03/46O9XFZpQqO0XXyhZUx7.png"></ZoomImage> -->

## 参考文章

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message } from 'antd'
import { t, ProTable, ConfigProvider, ProField } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'

export default () => (
  <RuleDemos
    demoNamePrefix="参考"
    demos={[
      {
        name: '深入了解弹窗应用（一）',
        link: 'https://www.yuque.com/u1003394/fn574a/9536945b-843e-477a-8fb9-ced027d8103c',
      },
      {
        name: '深入了解弹窗应用（二）',
        link: 'https://www.yuque.com/u1003394/fn574a/a9323045-48dc-4971-848f-eff644849848',
      },
      {
        name: 'B端设计指南-弹窗篇',
        link: 'https://www.yuque.com/u1003394/fn574a/b6c73628-25cd-421a-91cf-513573cc8e1a',
      },
      {
        name: 'web交互中，如何区分弹窗、抽屉、跳转新页面？',
        link: 'https://www.yuque.com/u1003394/fn574a/8ff0c672-d415-40d0-8e16-433f03d3a841',
      },
      {
        name: 'B 类产品设计细节：对话框 vs 抽屉',
        link: 'https://www.yuque.com/u1003394/fn574a/b75b444a-9da5-4a53-bf11-c1481f8e67f4',
      },
      {
        name: '模态窗还是页面：决策模型',
        link: 'https://www.yuque.com/u1003394/fn574a/df65c754-2464-4a6b-a6a1-0c7c4ae61783',
      },
      {
        name: 'B端产品中的浮层组件的设计思考',
        link: 'https://www.yuque.com/u1003394/fn574a/c0102729-5298-4747-adc6-25e0d2529ea2',
      },
    ]}
  />
)
```
