---
group:
  title: 表格
  order: 3

title: 布局
order: 1
---

## 标准布局

- 新增、编辑、查看等行为默认使用弹窗或者抽屉承载，仅必要时（数据量大、交付复杂）使用独立页面承载
- 表格名称必须提供

```jsx
/**
 * inline: true
 */
import React from 'react'
import introjs from 'intro.js'
import 'intro.js/introjs.css'
import { Tooltip } from 'antd'
import { useSessionStorageState } from 'ahooks'

// window.introjs = introjs

const introController = introjs()

const intro = () => {
  introController
    .setOptions({
      nextLabel: '下一个',
      prevLabel: '上一个',
      doneLabel: '好的',
      steps: [
        {
          element: document.querySelector('.f-pro-table-query'),
          title: '查询区域',
          intro: '用来放查询条件表单',
        },
        {
          element: document.querySelector('.f-pro-table-query-form-actions'),
          title: '查询动作',
          intro: '如果存在更多查询项，可通过此处折叠按钮展开',
        },
        {
          element: document.querySelector('.f-pro-table-toolbar'),
          title: '表格操作栏',
          intro: '用来放表格标题、表格动作等',
        },
        {
          element: document.querySelector('.f-pro-table-toolbar-right'),
          title: '动作区域',
          intro: '表格的各种相关动作放在此处',
        },
        {
          element: document.querySelector('.f-pro-table-actions'),
          title: '按钮动作',
          intro: '表格的按钮类型动作',
        },
        {
          element: document.querySelector('.f-pro-table-icon-actions'),
          title: '图标动作',
          intro: '表格的图标类型动作',
        },
        {
          element: document.querySelector('.f-pro-table-batch-toolbar'),
          title: '多选操作栏',
          intro: '只在表格项可选择，且有选中项时出现',
        },
        {
          element: document.querySelector('.f-pro-table-batch-actions'),
          title: '多选动作',
          intro: '用来对选中的数据进行操作',
        },
        {
          element: document.querySelector('.f-pro-table-main .ant-table-container'),
          title: '表格内容主体',
          intro: '用来展示表格数据',
        },
        {
          element: document.querySelector('.f-pro-table-columns-actions'),
          title: '表格项动作',
          intro: '对当前行数据进行操作',
        },
        {
          element: document.querySelector('.f-pro-table-pagination'),
          title: '表格的分页器',
          intro: '表格上下滚动时，需要保持吸附在底部',
        },
        {
          element: document.querySelector('.intro-button'),
          title: '重新观看指引',
          intro: '指引说明结束啦，可以点击此处重新观看',
        },
      ],
    })
    .start()
}

export default () => {
  const [allreadyTips, setAllreadyTips] = useSessionStorageState('rules-table-layout-allreadyTips', {
    defaultValue: false,
  })
  React.useEffect(() => {
    if (allreadyTips) {
      return
    }
    const timeout = setTimeout(() => {
      setAllreadyTips(true)
      intro()
    }, 2000)

    window.introController = introController

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="markdown mb-8">
      <p>
        当表格作为整个页面主体时，所采用的标准布局，主要分为查询区域、内容区域，
        <Tooltip title="可通过键盘 “左右” 方向键切换引导">
          <a onClick={intro} className="intro-button">
            点击查看区域指引
          </a>
        </Tooltip>
      </p>
    </div>
  )
}
```

```jsx
import React, { useEffect } from 'react'
import { ProTable } from '@fexd/pro-components'
import { getMockData } from '@docs/components/RuleDemos'
import { delay } from '@fexd/tools'
import { UploadOutlined } from '@ant-design/icons'
import { Table } from 'antd'

const mockData = Array(260).fill('').map(getMockData)

export default () => {
  return (
    <ProTable
      title="表格标题"
      tableKey="test-rule-table"
      bordered
      iconActions={['search', 'refresh', 'table-size', 'fullscreen', 'settings']}
      actions={['add', { content: '导出', icon: <UploadOutlined /> }]}
      columnActions={['view', 'edit', 'delete']}
      batchActions={['delete', { content: '导出选中数据', icon: <UploadOutlined /> }]}
      selectable
      onQuery={async (params, extraParams) => {
        const { page, pageSize } = params
        await delay(1000)

        const data = mockData.slice((page - 1) * pageSize, page * pageSize)

        return {
          success: true,
          data,
          total: mockData?.length,
        }
      }}
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
      columns={[
        { title: '名称', dataIndex: 'name', editField: true },
        { title: '数字', dataIndex: 'number', valueType: 'number', editField: true },
        {
          title: '百分比',
          dataIndex: 'percent',
          valueType: 'percent',
          editField: true,
          numberLocale: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
        },
        { title: '金额', dataIndex: 'price', valueType: 'money', unit: '￥', editField: true },
        { title: '日期', dataIndex: 'dayjs1_timestamp', valueType: 'date', editField: true },
        { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
      ]}
      defaultPageSize={5}
      rowSelection={{
        defaultSelectedRowKeys: [mockData?.[1]?.id],
      }}
    />
  )
}
```

## 查询区域

- 表格查询区域默认一行 4 项，默认展示前 1 行

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
    // size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '查询项演示（隐藏了内容区域）',
          vertical: true,
          bad: (data) => ({
            title: '一行显示了太多，一口气全部展示，用户压力很大',
            content: (
              <MockTable
                queryFieldColumns={6}
                queryFieldDefaultLines={3}
                queryFields={[
                  { label: 'Label', name: 'test1' },
                  { label: 'Label', name: 'test2' },
                  { label: 'Label', name: 'test3' },
                  { label: 'Label', name: 'test4' },
                  { label: 'Label', name: 'test5' },
                  { label: 'Label', name: 'test6' },
                  { label: 'Label', name: 'test7' },
                  { label: 'Label', name: 'test8' },
                  { label: 'Label', name: 'test9' },
                  { label: 'Label', name: 'test10' },
                  { label: 'Label', name: 'test11' },
                  { label: 'Label', name: 'test12' },
                  { label: 'Label', name: 'test13' },
                  { label: 'Label', name: 'test14' },
                  { label: 'Label', name: 'test15' },
                  { label: 'Label', name: 'test16' },
                  { label: 'Label', name: 'test17' },
                  { label: 'Label', name: 'test18' },
                ]}
                render={({ queryField }) => queryField}
              />
            ),
          }),
          good: (data) => ({
            title: '一行 4 项，默认展示前 1 行，仅展示最常用的搜索项',
            content: (
              <MockTable
                queryFieldColumns={4}
                queryFieldDefaultLines={1}
                queryFields={[
                  { label: 'Label', name: 'test1' },
                  { label: 'Label', name: 'test2' },
                  { label: 'Label', name: 'test3' },
                  { label: 'Label', name: 'test4' },
                  { label: 'Label', name: 'test5' },
                  { label: 'Label', name: 'test6' },
                  { label: 'Label', name: 'test7' },
                  { label: 'Label', name: 'test8' },
                  { label: 'Label', name: 'test9' },
                  { label: 'Label', name: 'test10' },
                  { label: 'Label', name: 'test11' },
                  { label: 'Label', name: 'test12' },
                  { label: 'Label', name: 'test13' },
                  { label: 'Label', name: 'test14' },
                  { label: 'Label', name: 'test15' },
                  { label: 'Label', name: 'test16' },
                  { label: 'Label', name: 'test17' },
                  { label: 'Label', name: 'test18' },
                ]}
                render={({ queryField }) => queryField}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

## 按钮位置

- 表格的标准布局中，常用的操作按钮全部都靠右放置
-

其余待补充，请先参考[全局规范 / 按钮](/rules/global-button)

## 表单内的表格

- 仅在多条数据时使用表格展示，如果只有 1 条数据，应该使用描述列表而不是表格
