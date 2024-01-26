---
group: 全局规范
---

# 引导与提示

### 接口错误

- 所有接口错误都需要提示，特殊要求除外

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
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '表格查询接口有错误时（请点击 “查询” 或 “重置” 查看效果）',
          bad: (data) => ({
            title: '查询接口报了错，但没有任何提示，还以为是没数据',
            content: (
              <MockTable
                queryFieldColumns={2}
                mock={false}
                manualQuery
                queryFieldLayout="horizontal"
                queryFields={[
                  {
                    label: null,
                    name: 'test',
                  },
                ]}
                onQuery={async () => {
                  await delay(500)
                  try {
                    throw new Error('503: 服务器重启中，请稍后再试')
                  } catch (error) {
                    //
                  }
                }}
              />
            ),
          }),
          good: (data) => ({
            title: '查询接口报了错，提供提示',
            content: (
              <MockTable
                queryFieldColumns={2}
                mock={false}
                manualQuery
                queryFieldLayout="horizontal"
                queryFields={[
                  {
                    label: null,
                    name: 'test',
                  },
                ]}
                onQuery={async () => {
                  await delay(500)

                  try {
                    throw new Error('503: 服务器重启中，请稍后再试')
                  } catch (error) {
                    message.error(error.message)
                  }

                  return {
                    success: false,
                  }
                }}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

### 危险动作

- 按钮需要标红
- 需要做二次确认

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message, notification } from 'antd'
import { t, ProTable, ConfigProvider, ProField, Action } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    // size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '涉及数据删除的动作',
          bad: (data) => ({
            title: '未标红，且无确认提示，误点之后可能导致用户血压飙升',
            content: (
              <Space>
                <Action
                  // confirm="确定删除吗？"
                  icon={<PlusOutlined />}
                  type="primary"
                >
                  新增
                </Action>
                <Action
                  // confirm="确定删除吗？"
                  icon={<DeleteOutlined />}
                  // danger
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
          good: (data) => ({
            title: '标红，有二次确认，用户安心又舒适',
            content: (
              <Space>
                <Action
                  // confirm="确定删除吗？"
                  icon={<PlusOutlined />}
                  type="primary"
                >
                  新增
                </Action>
                <Action
                  confirm="数据删除后将不可恢复，确定要删除吗？"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={async () => {
                    await delay(1000)
                    notification.success({ message: '删除成功！', placement: 'bottom' })
                  }}
                >
                  删除
                </Action>
                <Action
                  // confirm="数据删除后将不可恢复，确定要删除吗？"
                  // icon={<DeleteOutlined />}
                  tooltip="弹窗确认：按钮周围的确认框不适用时，使用弹窗确认"
                  menu={[
                    {
                      content: '删除',
                      confirm: '数据删除后将不可恢复，确定要删除吗？',
                      async onClick() {
                        // await confirmPromise({
                        //   content: '数据删除后将不可恢复，确定要删除吗？',
                        // })
                        await delay(1000)
                        notification.success({ message: '删除成功！', placement: 'bottom' })
                      },
                    },
                  ]}
                />
              </Space>
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

### 图标型按钮

- 选用与行为契合度最高的按钮
- 尽可能都提供 tooltip 提示

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message, notification } from 'antd'
import { t, ProTable, ConfigProvider, ProField, Action } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import {
  DeleteOutlined,
  SettingOutlined,
  AimOutlined,
  LikeOutlined,
  ApiOutlined,
  UserAddOutlined,
} from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    // size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '有无提示',
          bad: (data) => ({
            title: '没有任何提示，看不出是要干啥',
            content: (
              <Action
                size="large"
                icon={<UserAddOutlined />}
                type="text"
                onClick={async () => {
                  await delay(1000)
                  notification.success({ message: '好友申请已发送！', placement: 'bottom' })
                }}
              />
            ),
          }),
          good: (data) => ({
            title: '标红，有二次确认，用户安心又舒适',
            content: (
              <Action
                size="large"
                icon={<UserAddOutlined />}
                tooltip="发送好友申请"
                type="text"
                onClick={async () => {
                  await delay(1000)
                  notification.success({ message: '好友申请已发送！', placement: 'bottom' })
                }}
              />
            ),
          }),
        },
        {
          name: '图标与行为',
          bad: (data) => ({
            title: '图标与行为不符',
            content: (
              <Action
                size="large"
                tooltip="点一下试试"
                icon={<LikeOutlined />}
                type="text"
                onClick={async () => {
                  await delay(1000)
                  notification.success({ message: '删除成功！', placement: 'bottom' })
                }}
              />
            ),
          }),
          good: (data) => ({
            title: '图标与行为相符',
            content: (
              <Space size={1}>
                <Action
                  size="large"
                  tooltip="删除该项目"
                  icon={<DeleteOutlined />}
                  type="text"
                  onClick={async () => {
                    await delay(1000)
                    notification.success({ message: '删除成功！', placement: 'bottom' })
                  }}
                />
                <Action
                  size="large"
                  tooltip="点赞"
                  icon={<LikeOutlined />}
                  type="text"
                  onClick={async () => {
                    await delay(1000)
                    notification.success({ message: '点赞成功！', placement: 'bottom' })
                  }}
                />
              </Space>
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

### 复杂交互引导

- 建议提供用法引导说明，如[表格 / 布局 / 标准布局](/rules/table-layout)

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
        name: '引导弹窗的管理与提效',
        link: 'https://www.yuque.com/u1003394/fn574a/3761c8d2-c024-4f84-8cf5-68590199dd96',
      },
    ]}
  />
)
```
