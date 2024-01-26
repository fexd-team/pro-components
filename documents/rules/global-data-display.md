---
group:
  title: 全局规范
  order: 1
---

# 数据展示

## 数字 / 金额

- 必须做**千分位格式化展示**，金额展示参考此[规范](https://modao.cc/app/6T4T8vWEr9hxngEWvX8lyN#screen=sl27bxw2edruq1k)
- 数值与文案混合时，数值**左右侧需预留 1 个空格**
- 数值与文案混合时，关键数值建议**突出显示**
- 表格中，数值类型**右对齐**
- 数值展示如果为小数，则默认保留 2 位小数，小数位不足时补零，小数超过 2 位时四舍五入

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space } from 'antd'
import { t, ProTable, ConfigProvider } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'

export default () => (
  <ConfigProvider>
    <RuleDemos
      demos={[
        {
          name: '文案中的数字',
          refresh: true,
          bad: (data) => ({
            title: '数值不突出，未做格式化，且左右侧未预留空间',
            content: `已选择数据中，总计金额为${data?.number}元`,
          }),
          good: (data) => ({
            title: '数值突出展示，格式化，且左右预留 1 个空格',
            content: (
              <>
                已选择数据中，总计金额为{' '}
                <span>
                  ￥
                  <span className="text-lg font-bold">
                    {t(`${data?.number}@number`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </span>{' '}
                元
              </>
            ),
          }),
        },
        {
          name: '表格内的数字',
          refresh: true,
          bad: (data) => ({
            title: '部分数值居左，小数位数不统一，且未做格式化，',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '数值',
                    dataIndex: 'number',
                    align: 'right',
                  },
                  {
                    title: '百分比',
                    dataIndex: 'percent',
                  },
                  {
                    title: '金额',
                    dataIndex: 'price',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '数值右对齐，小数位统一，且做格式化',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '百分比',
                    dataIndex: 'percent',
                    valueType: 'percent',
                  },
                  {
                    title: '金额',
                    dataIndex: 'price',
                    valueType: 'money',
                    unit: '￥',
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

## 时间

- 应注意[时区问题](/rules/timezone)
- 必须做时间展示，参考[规范](https://modao.cc/app/6T4T8vWEr9hxngEWvX8lyN#screen=sl27bzb71ltro02)
- 时间与文案混合时，时间**左右侧需预留 1 个空格**
- 指向时间展示时，建议提示与当前时间的差距，如 “1 天前”
  > 使用 `<ProField />` 的时间类型，自带与当前时间差距的提示

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space } from 'antd'
import { t, ProTable, ConfigProvider, ProField } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
  >
    <RuleDemos
      demos={[
        {
          name: '文案中的时间',
          refresh: true,
          bad: (data) => ({
            title: '时间格式不明显，未做提示，且左右侧未留空间',
            content: `数据已于${data?.dayjs1.format('YYYYMMDD HH:mm:ss')}发生更新`,
          }),
          good: (data) => ({
            title: '时间格式明显，有提示，且左右侧留出空间',
            content: (
              <>
                数据已于 <ProField mode="view" value={data?.dayjs1.valueOf()} type="dateTime" noStyle /> 发生更新
              </>
            ),
          }),
        },
        {
          name: '表格内的时间',
          refresh: true,
          bad: (data) => ({
            title: '时间格式不明显或未做提示',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '不明显的日期',
                    dataIndex: 'dayjs1_YYYYMMDD',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_YYYY-MM-DD',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '时间格式明显，有提示',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                  {
                    title: '日期 + 时间',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'dateTime',
                  },
                  {
                    title: '距今',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'fromNow',
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

## 敏感信息

- 有可能存在信息泄露的系统中，敏感数据需做脱敏展示，参考[规范](https://modao.cc/app/6T4T8vWEr9hxngEWvX8lyN#screen=sl27btcgpndxvbg)
