---
group:
  title: 全局规范
  order: 2

title: 按钮
---

## 默认规则图示

将位置、顺序、类型三项变量组合，可以得到一个最基础的 **「默认规则」**，可用于覆盖大部分场景

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/6q9DpFWl1HsKYiDqS113.png"></ZoomImage>

## 三步原则

1. 先确认按钮**位置**
1. 再确认按钮**顺序**和分组
1. 为按钮添加**类型**

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/jPVheMWC1g6LpeQqYhW0.png"></ZoomImage>

## 位置

结合[古腾堡图、Z-pattern 布局和 F-pattern 布局](https://zhuanlan.zhihu.com/p/563999941)，我们推导出以下的按钮摆放规则

- Header、Footer 操作栏中：按钮应**靠右**摆放，且顺序为（←←←←←）**由右向左**
- Body 内容区中：按钮应**跟随内容**摆放，且顺序为（→→→→→）**由左向右**

此规则几乎收敛了大部分下图左侧中的位置设计不一致问题。这套位置规则与 Fiori、Predix、QuickBooks 等企业级产品设计体系中都相近

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/duQHEqPlJxWqFoQPbbbC.png"></ZoomImage>

同时，每个位置有一定行为意义，我们据此提供了 **「使用建议」** 来指导设计

- Header 中放置影响全局变更的操作，如：新建、切换浏览与编辑、返回
- Body 中放置对其跟随内容生效的操作，如：表单项相关的操作
- Footer 中放置 “完结” 类含义的操作

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/KGtufo3GDoP2eodayLr4.png"></ZoomImage>

## 顺序

### 1. 风险操作

可能造成损失的操作，特别是破坏性操作，如果不是用户期望点击的按钮，**应该尽量远离常用按钮**

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message, notification } from 'antd'
import { t, ProTable, ConfigProvider, ProField, Action } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { DeleteOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    // size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '风险操作的顺序',
          bad: (data) => ({
            title: '危险动作离常用按钮太接近，易误点',
            content: (
              <Space>
                <Action type="primary">查看详情</Action>
                <Action
                  confirm="数据删除后将不可恢复，确定要删除吗？"
                  danger
                  onClick={async () => {
                    await delay(1000)
                    notification.success({ message: '删除成功！', placement: 'bottom' })
                  }}
                >
                  删除
                </Action>
                <Action>新增</Action>
                <Action>编辑</Action>
              </Space>
            ),
          }),
          good: (data) => ({
            title: '危险动作原理常用按钮，不易误点',
            content: (
              <Space>
                <Action type="primary">查看详情</Action>
                <Action>编辑</Action>
                <Action>新增</Action>
                <Action
                  confirm="数据删除后将不可恢复，确定要删除吗？"
                  danger
                  onClick={async () => {
                    await delay(1000)
                    notification.success({ message: '删除成功！', placement: 'bottom' })
                  }}
                >
                  删除
                </Action>
              </Space>
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

- 参考[全局规范 / 引导与提示 / 危险动作](/rules/global-guide#危险动作)

### 2. 方向性含义

什么是方向性含义？就是**按钮顺序需要符合用户的认知习惯**

例如：具有返回意义的按钮，应该放在左侧，暗示其方向是回到之前。

如以下错误示例非常容易误操作，方向错乱挑战用户的认知习惯，因为不论是在网页还是移动端界面，我们已经都习惯了返回在左侧的模式。

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message, notification } from 'antd'
import { t, ProTable, ConfigProvider, ProField, Action } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { DeleteOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    // size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '按钮的方向性',
          bad: (data) => ({
            title: '方向性与常规逻辑不符',
            content: (
              <Space>
                <Action>下一步</Action>
                <Action>上一步</Action>
              </Space>
            ),
          }),
          good: (data) => ({
            title: '方向性与常规逻辑相符',
            content: (
              <Space>
                <Action>上一步</Action>
                <Action>下一步</Action>
              </Space>
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

### 3. 对话习惯

按照对话习惯排列按钮，**不推荐的操作靠后放**。界面中的按钮阅读顺序类似于一个用户和电脑的对话过程，按照日常对话的顺序设计按钮阅读顺序更自然，同时让电脑尽量显得礼貌一点。

例如，日常对话中，我们一般不会先问负面性的问题，当用户修改了一项设置，用户最有可能的行为是保存这项变更，如果电脑一上来就问用户是否要取消变更会显得不太礼貌。因此，不推荐的操作，自然会排列在靠后的顺序。

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/WDdHR6yw9BSddUupyFsK.png"></ZoomImage>

### 4. 响应式规则

指的是按钮如何在响应式环境中优雅的溢出。这一项条件对规则设计的影响是，我们把溢出按钮“…”统一放置在最右侧。

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/a4Ymh08vNBhPEkUN0yoP.gif"></ZoomImage>

### 5. Antd 的设计规则

参考 Antd 按钮设计规则，左对齐从左往右阅读，右对齐从右往左阅读

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/yO9o2NpOFY1CrUueSVo5.png"></ZoomImage>

## 类型

调整按钮的样式变量，呈现不同的视觉重量，达到分级强调目的。

我们将按钮视觉强调程度分为四级，了解其原理后，可以根据样式变量和按钮类型组合出需要的按钮。

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/HE1XshXTd8XzbMqqXG08.png"></ZoomImage>

### 1. 主按钮

一级按钮通常是主按钮，突出“完成”、“推荐”的操作。

- 一个按钮区最多应该使用一个主按钮

一个按钮区最多应该使用一个主按钮。那么一个页面可以有多个主按钮吗？因为没有足够的反面案例支撑一个页面不能有多个主按钮，比较建议在一个焦点任务中，最多一个主按钮，也可以没有主按钮。

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message, notification } from 'antd'
import { t, ProTable, ConfigProvider, ProField, Action } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { DeleteOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    // size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '主按钮的数量',
          bad: (data) => ({
            title: '主按钮数量过多',
            content: (
              <Space>
                <Action type="primary">新建</Action>
                <Action type="primary">导出</Action>
                <Action type="primary">导入</Action>
                <Action type="primary">历史</Action>
              </Space>
            ),
          }),
          good: (data) => ({
            title: '只有一个主按钮',
            content: (
              <Space>
                <Action type="primary">新建</Action>
                <Action>导出</Action>
                <Action>导入</Action>
                <Action>历史</Action>
              </Space>
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

### 2. 普通按钮

也称之为次要按钮、二级按钮，可用于所有次要的按钮行动，如果我们有许多具有相似重要性的行动在一个屏幕上，或不确定要选择哪种按钮，次要按钮永远是最安全的选择。

目前二级按钮的视觉强调程度有些偏弱，后续我们也会考虑调优此问题。

### 3. 文字按钮

也就是三级按钮，没有外边框，用链接色突出，例如文字按钮。比较适合诸如“取消”、“还原”等无需强调的操作。文首提到的表格操作列这类无需强调的操作也推荐使用。

### 4. 图标按钮

也就是不强调按钮，并不是非常规范的按钮，用于满足复杂的个性化需求，当按钮数量特别多，并且保证用户直识别的情况。

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
        name: '我的按钮究竟该放哪儿？',
        link: 'https://www.yuque.com/u1003394/fn574a/e43b82ce-a02c-47fd-b0e9-d87dbf526c38',
      },
      {
        name: '按钮设计指南',
        link: 'https://www.yuque.com/u1003394/fn574a/11ba4798-bc72-4de9-ad5f-6f5d388159fa',
      },
    ]}
  />
)
```
