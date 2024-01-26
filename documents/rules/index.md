---
nav:
  title: 体验规范
  order: 1

title: 原则
order: 1
# toc: false
---

# 体验规范

管理系统场景中的体验规范与要求，以保证各类交互场景体验的良好与一致性

本站的交互规范，重在指导，而非约束

在交互体验改善的过程中，最重要的并不是规范，而是站在用户的角度，尝试改善体验的意识

## 设计原则

尼尔森十大可用性原则

1. 系统可见性原则

   - 保持界面的状态可见，变化可见，内容可见。
   - 让用户知道发生了什么，在适当的时间内做出适当的反馈。
   - 不要蒙蔽用户，沟通是所有关系的基础，无论是人还是设备。

1. 贴近场景原则

   - 用用户的语言，用词，短语和用户熟悉的概念，而不是系统术语。
   - 功能操作符合用户的使用用场景。
   - 遵循现实世界的惯例财呈现信息。

1. 可控性原则

   - 用户经常错误地选择系统功能而且需要明确标识离开这个的“出口”。比如支持撤销和重做的功能。

1. 一致性和标准化原则

   - 遵循平台的惯例。也就是，同一用语、功能、操作保持一致。
   - 用户不必怀疑是否不同的语言，不同的情景，或者不同的操作产生的结果实际上是同一件事情。

1. 防错原则

   - 更用心的设计防止这类问题发生，在用户可能犯错时进行提醒，比如删除可能造成的后果。

1. 协助记忆原则

   - 尽量减少用户对操作目标的记忆负荷，动作和选项都应该是可见的。
   - 用户不必记住一个页面到另一个页面的信息。
   - 系统的使用说明应该是可见的或者是容易获取的。

1. 灵活高效原则

   - 允许用户进行频繁的操作。
   - 更加便捷灵活的代码和反馈。
   - 好的产品需要同时兼顾新用户和资深用户的需求，对新用户来说，需要功能明确、清晰，对于老用户需要快捷高效使用高频功能。
   - 不可迎合某一种用户，把不必要的信息占据重要部分。

1. 审美和简约设计原则

   - 不应该包含无关紧要的信息。
   - “快扫”是互联网用户浏览的主要方式。
   - 易扫就意味着突出重点，弱化和剔除无关信息。
   - 拥有靓号的视觉层次结构，降低页面干扰。
   - 减轻用户阅读成本。

1. 容错原则

   - 错误信息应该用语言表达（不要用代码），较准确地反应问题所在，并且提出一个建设性的解决方案，比如：空状态

1. 人性化帮助原则

   - 有必要提供帮助和文档。
   - 任何信息应容易去搜索，专注于用户的任务，列出具体的步骤来进行。
   - 帮助性提示最好的方式是：1、无需提示；2、一次性提示；3、常驻提示；4；帮助文档。

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
        name: 'B 端观止',
        link: 'https://www.yuque.com/u1003394/fn574a',
      },
      // {
      //   name: 'B 端设计指南',
      //   link: 'https://youthce.com/98e0c4c996ca4557974da8d121fe6fde',
      // },
      {
        name: '如何系统性提升中后台产品体验',
        link: 'https://www.woshipm.com/pd/5405349.html',
      },

      {
        name: 'B端产品的交互设计流程探索：乐高设计法和用户体验的二次提升',
        link: 'https://www.woshipm.com/pd/2813354.html',
      },

      {
        name: 'B端产品设计细节分析：数据筛选',
        link: 'https://www.woshipm.com/pd/4884403.html',
      },

      // {
      //   name: '如何做B端体验标准化：以数据可视化场景为例',
      //   link: 'https://mp.weixin.qq.com/s/DtUORsjePtQzk9SUzX6jkA',
      // },

      // {
      //   name: 'B类金融场景下的信任力设计',
      //   link: 'https://mp.weixin.qq.com/s/wdj995FdFBRWx1R8og9WIg',
      // },
    ]}
  />
)
```

<!-- ```jsx
import React from 'react'
import { ErrorBoundary, Hook } from '@fexd/pro-components'

export default () => (
  <div className="w-full flex flex-col items-center">
    <ErrorBoundary>
      <Hook>
        {() => {
          const [state, setState] = React.useState(1)

          React.useEffect(() => {
            setState({ a: 1 })
          }, [])
          return <div>state: {state}</div>
        }}
      </Hook>
    </ErrorBoundary>
    <ErrorBoundary mode="inline">
      <Hook>
        {() => {
          const [state, setState] = React.useState(1)

          React.useEffect(() => {
            setState({ a: 1 })
          }, [])
          return <div>state: {state}</div>
        }}
      </Hook>
    </ErrorBoundary>
  </div>
)
``` -->
