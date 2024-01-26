---
group: 表格
title: 动作
order: 2
---

# 动作

规范参考[全局规范 / 按钮](/rules/global-button)

## 按钮动作

- 表格按钮动作不多于 3 个，若超出，使用 “...” 更多标识承载额外的动作
- 关键动作使用 primary 类型并带有图标，如 “新增”
- 次要动作使用 primary + ghost 类型
- 动作默认使用 default 类型
- 危险动作使用 danger 标红

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
          name: '关键功能类型演示',
          // vertical: true,
          bad: (data) => ({
            title: '关键动作没有明确区分，看不出与其他动作的差别',
            content: (
              <MockTable
                mock={false}
                actions={[{ builtIn: 'add', icon: null, type: 'default' }, { content: '功能1' }, { content: '功能2' }]}
              />
            ),
          }),
          good: (data) => ({
            title: '关键动作有明确区分，且有图标',
            content: <MockTable mock={false} actions={['add', { content: '功能1' }, { content: '功能2' }]} />,
          }),
        },
        {
          name: '按钮数量演示',
          // vertical: true,
          bad: (data) => ({
            title: '展示的动作太多',
            content: (
              <MockTable
                mock={false}
                actions={[
                  'add',
                  { content: '功能1' },
                  { content: '功能2' },
                  { content: '功能3' },
                  { content: '功能4' },
                  { content: '功能5' },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '最多 3 个，超出折叠',
            content: (
              <MockTable
                mock={false}
                actions={[
                  'add',
                  { content: '功能1' },
                  { content: '功能2' },
                  {
                    menu: [{ label: '功能3' }, { label: '功能4' }, { label: '功能5' }],
                  },
                ]}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

## 图标动作

- 应至少提供 1 个图标按钮，默认展示表格的 “刷新” 图标按钮
- 图标动作不多于 4 个，若超出，使用 “...” 更多标识承载额外的动作
- 图标动作一律使用 text 类型
- 图标动作应有 tooltip 对功能进行说明，参考[全局规范 / 引导与提示 / 图标性按钮](/rules/global-guide#图标型按钮)

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message } from 'antd'
import { t, ProTable, ConfigProvider, ProField } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { SettingOutlined, UploadOutlined, CloudDownloadOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '按钮数量演示',
          // vertical: true,
          bad: (data) => ({
            title: '展示的动作太多',
            content: (
              <MockTable
                mock={false}
                iconActions={[
                  'refresh',
                  'table-size',
                  'fullscreen',
                  { icon: <SettingOutlined /> },
                  { icon: <UploadOutlined /> },
                  { icon: <CloudDownloadOutlined /> },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '最多 4 个，超出折叠',
            content: (
              <MockTable
                mock={false}
                iconActions={[
                  'refresh',
                  'table-size',
                  'fullscreen',
                  { icon: <SettingOutlined /> },
                  // { icon: <UploadOutlined /> },
                  // { icon: <CloudDownloadOutlined /> },
                  {
                    menu: [{ label: '上传' }, { label: '下载' }],
                  },
                ]}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

## 表格列动作

- 表格行动作不多于 3 个，若超出，使用 “...” 更多标识承载额外的动作
- 行动作默认使用 link 类型并带有图标
- 危险动作使用 danger 标红
- 行动作居右，横向空间不足，产生滚动时，应吸附于右侧

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message } from 'antd'
import { t, ProTable, ConfigProvider, ProField } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { SettingOutlined, UploadOutlined, CloudDownloadOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '按钮数量演示',
          // vertical: true,
          bad: (data) => ({
            title: '展示的动作太多',
            content: (
              <MockTable
                columnActions={['view', 'edit', 'delete', { content: '功能1' }, { content: '功能2' }]}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '最多 3 个，超出折叠',
            content: (
              <MockTable
                columnActions={['view', 'edit', 'delete', { menu: [{ label: '功能1' }, { label: '功能2' }] }]}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
        },
        {
          name: '吸附演示',
          // vertical: true,
          bad: (data) => ({
            title: '产生了横向滚动但未吸附，只能滚动到右侧才能操作列',
            content: (
              <MockTable
                columnActions={['view', 'edit']}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '操作列吸附于右侧，随时可以操作',
            content: (
              <MockTable
                fixColumnActions
                columnActions={['view', 'edit']}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```
