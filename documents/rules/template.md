---
title: 页面样板
order: 99
---

# 页面样板

交互与视图的设计与实现，过程上和装修房子类似，细节和选择很多，容易挑花了眼

参考楼盘样板间的思路，如果页面也有样板，产研部门对交互与视觉的把控会由 “思考与设计” 转变为简单地 “选择”，效率和质量都有保障

基于这个思路，后续会补充提供**页面样板间**展示的专用项目，类似 [Ant-Design Pro](https://preview.pro.ant.design/)

### 待办事项

1. [ ] 提供页面样板间展示的专用站点
1. [ ] 样板间将会对视觉与功能进行测试，提供各项体验、功能的双重保障
1. [ ] 样板间内代码一键抄走，提高开发效率
1. [ ] 样板间原型图一键生成，提高产品效率
1. [ ] 样板间内提供一定程度的[可编辑配置](/table/configuration)，实现基本的低代码功能

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
        defaultShow: true,
      },
    ]}
  />
)
```

## 表格页

```jsx
import React, { useEffect } from 'react'
import { ConfigProvider, ProTable } from '@fexd/pro-components'
import { delay } from '@fexd/tools'
import { UploadOutlined } from '@ant-design/icons'

export default () => {
  return (
    <ProTable
      title="表格标题"
      bordered
      iconActions={['refresh', 'table-size', 'fullscreen']}
      actions={['add', { content: '导出', icon: <UploadOutlined /> }]}
      columnActions={['view', 'edit', 'delete']}
      batchActions={['delete', { content: '导出选中数据', icon: <UploadOutlined /> }]}
      selectable
      mockDataSource
      queryFields={[
        { label: '文本框', name: 'text', type: 'text' },
        { label: '选择框', name: 'select', type: 'select', options: ['选项 1', '选项 2'] },
        { label: '日期', name: 'date', type: 'date' },
        { label: '日期范围', name: 'dateRange', type: 'dateRange' },
        { label: '价格', name: 'money', type: 'money', unit: '￥' },
        { label: '多选框', name: 'multipleSelect', type: 'multipleSelect', options: ['选项 1', '选项 2'] },
        { label: '时间', name: 'time', type: 'time' },
        { label: '时间范围', name: 'timeRange', type: 'timeRange' },
      ]}
      queryFieldColumns={4}
      queryFieldDefaultLines={1}
      columns={[
        { title: '名称', dataIndex: 'name', editField: true },
        { title: '数字', dataIndex: 'number', valueType: 'number', editField: true },
        { title: '百分比', dataIndex: 'percent', valueType: 'percent', editField: true },
        { title: '金额', dataIndex: 'price', valueType: 'money', unit: '￥', editField: true },
        { title: '日期', dataIndex: 'dayjs1_timestamp', valueType: 'date', editField: true },
        { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
      ]}
      defaultPageSize={5}
    />
  )
}
```

## 表单页（详情）

待补充
