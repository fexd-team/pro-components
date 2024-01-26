---
group: 类型
order: 4
---

# 日期 / 时间

## 单选

```tsx
import React from 'react'
import { Space, Card, Form, Input } from 'antd'
import { t, ProTable, ConfigProvider, ProForm, ProField, Hook, createForm, dayjsTZ } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { getMockData as getMockjsData } from '@docs/components/RuleDemos'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 0 }}
    localeKey="zh-CN"
  >
    <Hook>
      {() => {
        const [readonly, setReadonly] = React.useState(false)
        const ref = React.useRef()

        const formDemo = (
          <ProForm
            ref={(ref) => {
              window.formRef = ref
            }}
            mode={readonly ? 'view' : 'edit'}
            preserve
            fields={[
              {
                label: '日期',
                tooltip: 'type="date"',
                name: 'date',
                type: 'date',
              },
              {
                label: '日期时间',
                tooltip: 'type="dateTime"',
                name: 'dateTime',
                type: 'dateTime',
                // format: 'YYYY-MM-DD HH:mm',
              },
              {
                label: '日期周',
                tooltip: 'type="dateWeek"',
                name: 'dateWeek',
                type: 'dateWeek',
              },
              {
                label: '日期月',
                tooltip: 'type="dateMonth"',
                name: 'dateMonth',
                type: 'dateMonth',
              },
              {
                label: '日期季度',
                tooltip: 'type="dateQuarter"',
                name: 'dateQuarter',
                type: 'dateQuarter',
              },
              {
                label: '日期年',
                tooltip: 'type="dateYear"',
                name: 'dateYear',
                type: 'dateYear',
              },
              {
                label: '时间',
                tooltip: 'type="time"',
                name: 'time',
                type: 'time',
              },
              {
                label: '相对于当前时间',
                tooltip: 'type="fromNow"',
                name: 'fromNow',
                type: 'fromNow',
              },
            ]}
          />
        )

        return (
          <Space size="middle" direction="vertical" className="w-full">
            <ProField
              noStyle
              type="switch"
              props={{
                checked: readonly,
                checkedChildren: '只读',
                unCheckedChildren: '只读',
                onChange: (checked) => {
                  setReadonly(checked)
                },
              }}
            />
            {formDemo}
          </Space>
        )
      }}
    </Hook>
  </ConfigProvider>
)
```

## 范围

```tsx
import React from 'react'
import { Space, Card, Form, Input } from 'antd'
import { t, ProTable, ConfigProvider, ProForm, ProField, Hook, createForm, dayjsTZ } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { getMockData as getMockjsData } from '@docs/components/RuleDemos'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 0 }}
    localeKey="zh-CN"
  >
    <Hook>
      {() => {
        const [readonly, setReadonly] = React.useState(false)
        const ref = React.useRef()

        const formDemo = (
          <ProForm
            ref={(ref) => {
              window.formRef = ref
            }}
            mode={readonly ? 'view' : 'edit'}
            preserve
            fields={[
              {
                label: '日期范围',
                tooltip: 'type="dateRange"',
                name: 'dateRange',
                type: 'dateRange',
                // initialValue: [1672678800000, 1672765199000],
                builtInRule: 'same-month',
              },
              {
                label: '日期时间范围',
                tooltip: 'type="dateTimeRange"',
                name: 'dateTimeRange',
                type: 'dateTimeRange',
              },
              { label: '日期周范围', tooltip: 'type="dateWeekRange"', name: 'dateWeekRange', type: 'dateWeekRange' },
              {
                label: '日期月份范围',
                tooltip: 'type="dateMonthRange"',
                name: 'dateMonthRange',
                type: 'dateMonthRange',
              },
              {
                label: '日期季度范围',
                tooltip: 'type="dateQuarterRange"',
                name: 'dateQuarterRange',
                type: 'dateQuarterRange',
              },
              { label: '日期年份范围', tooltip: 'type="dateYearRange"', name: 'dateYearRange', type: 'dateYearRange' },
              {
                label: '时间范围',
                tooltip: 'type="timeRange"',
                name: 'timeRange',
                type: 'timeRange',
              },
              {
                label: '相对当前时间区间',
                tooltip: 'type="fromNowRange"',
                name: 'fromNowRange',
                type: 'fromNowRange',
              },
            ]}
          />
        )

        return (
          <Space size="middle" direction="vertical" className="w-full">
            <ProField
              noStyle
              type="switch"
              props={{
                checked: readonly,
                checkedChildren: '只读',
                unCheckedChildren: '只读',
                onChange: (checked) => {
                  setReadonly(checked)
                },
              }}
            />
            {formDemo}
          </Space>
        )
      }}
    </Hook>
  </ConfigProvider>
)
```
