---
title: 协作流程
order: 2
---

# 协作流程

不同职能团队，在保障交互体验的过程中，应该遵循的协作流程，主要涉及产品、设计、前端、测试、后端

## 需求协作

```jsx
/**
 * inline: true
 */
import React, { useState } from 'react'
import { Steps } from 'antd'
import { useInterval } from 'ahooks'

export default () => {
  const [current, setCurrent] = useState(0)

  useInterval(() => {
    setCurrent((current + 1) % 6)
  }, 1500)

  return (
    <div className="my-16">
      <Steps current={current} direction="vertical">
        {[
          { title: '方案中', description: '产品出具原型图，设计出具设计稿' },
          { title: '预评审', description: '前端复核原型图（设计稿），提出改进点' },
          { title: '正式评审', description: '在改进原型图（设计稿）的基础上进行正式评审' },
          { title: '需求开发', description: '依照原型图（设计稿）进行开发' },
          { title: '需求测试', description: '依照原型图（设计稿）进行功能（设计）测试' },
          { title: '需求发布', description: '依照原型图（设计稿）进行功能（设计）验收' },
        ].map((item, idx) => (
          <Steps.Step key={idx} title={item?.title} description={item?.description} />
        ))}
      </Steps>
    </div>
  )
}
```

### 产品

涉及前端，**要有原型图**

- 涉及前端的需求，应结合交互规范，出具需求原型图
- 结合设计提出的交互改动，更新原型图
- 结合前端提出的交互改动，更新原型图
- 如果没有原型图，则不对需求的交互部分做测试要求，以本站点的交互规范为参考

### 设计

（项目无设计团队跟进时，主要依据原型图）

- 设计应在预评审前，依据原型图出具设计稿
- 设计应在测试阶段，依据设计稿进行提前验收
- 设计应在发布，依据设计稿进行最终验收

### 前端

正式评审前，**要根据交互规范对原型图（设计稿）做复核**

- 前端应在预评审前，对原型图（设计稿）进行复核，依据交互规范，提出改进点
- 正式评审后，若前端对交互上有调整需求，需要同步产品、设计、测试，讨论一致后，以 **TAPD 配图+评论**形式进行说明

### 测试

测试时，需要依据原型图（设计稿）与**前端的补充材料**

- 原则上，使用本站点的交互规范作为测试依据
- 需求中，依据产品的原型图（设计稿），编写测试用例
- 提测后，结合前端对需求交互的补充材料，进行测试

### 后端

- 结合前端对交互实现的具体需要，提供恰当的接口支持
- 每个页面所需都数据都应有独立接口支持，不要依赖上一个页面接口的数据

## 体验走查

建议各职能部门定期对产品进行体验走查，结合交互规范，筛出未遵循规范的交互项，或者发现规范未覆盖到的体验问题

走查后发现的问题，将转成优化需求进入项目周期，确保交互体验的持续优化

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
        name: '设计师如何推进全员体验走查？',
        link: 'https://www.yuque.com/u1003394/fn574a/b745b063-9c0d-46cd-9389-459f6950266e',
        // defaultShow: true,
      },
    ]}
  />
)
```

## 页面样板

交互与视图的设计与实现，过程上和装修房子类似，细节和选择很多，容易挑花了眼

参考楼盘样板间的思路，如果页面也有样板，产研部门对交互与视觉的把控会由 “思考与设计” 转变为简单地 “选择”，效率和质量都有保障

基于这个思路，后续会补充提供[**页面样板**](/rules/template)展示的专用项目，类似 [Ant-Design Pro](https://preview.pro.ant.design/)

- 提供页面样板间展示的专用站点
- 样板间将会对视觉与功能进行测试，提供各项体验、功能的双重保障
- 样板间内代码一键抄走，提高开发效率
- 样板间原型图一键生成，提高产品效率
- 样板间内提供一定程度的[可编辑配置](/table/configuration)，实现基本的低代码功能

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
        name: 'Ant-Design Pro',
        link: 'https://preview.pro.ant.design/',
      },
    ]}
  />
)
```
