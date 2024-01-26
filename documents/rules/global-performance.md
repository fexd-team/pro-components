---
group: 全局规范
title: 性能
---

# 性能

## 避免不必要的请求阻塞展示

系统中各部分展示仅受所依赖的远程数据阻塞

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message, notification } from 'antd'
import { t, ProTable, ConfigProvider, ProField, Hook } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay, run } from '@fexd/tools'
import { useRequest } from 'ahooks'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '对远程数据 A 的请求不应阻塞区域 B 的展示，区域 B 仅依赖远程数据 B 的请求',
          refresh: true,
          bad: (data) => ({
            title: '先统一请求了数据，再进行页面展示',
            content: (
              <Hook>
                {() => {
                  const service = useRequest(async () => {
                    await Promise.all([
                      run(async () => {
                        await delay(1000)
                        notification.success({
                          message: '表格 A 加载完成',
                          placement: 'bottomLeft',
                        })
                      }),
                      run(async () => {
                        await delay(3000)
                        notification.success({
                          message: '表格 B 加载完成',
                          placement: 'bottomLeft',
                        })
                      }),
                    ])

                    return data?.list.slice(0, 2)
                  })

                  return (
                    <Space direction="vertical" className="w-full">
                      <MockTable
                        mock={false}
                        loading={service?.loading}
                        dataSource={service?.data}
                        columns={[
                          { title: '名称', dataIndex: 'name' },
                          { title: '数字', dataIndex: 'number', valueType: 'number' },
                          { title: '百分比', dataIndex: 'percent', valueType: 'percent' },
                        ]}
                      />
                      <MockTable
                        mock={false}
                        loading={service?.loading}
                        dataSource={service?.data}
                        columns={[
                          { title: '日期', dataIndex: 'dayjs1_timestamp', valueType: 'date' },
                          { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
                          { title: '金额', dataIndex: 'price', valueType: 'money', unit: '￥' },
                        ]}
                      />
                    </Space>
                  )
                }}
              </Hook>
            ),
          }),
          good: (data) => ({
            title: '各自有序加载，互不影响',
            content: (
              <Space direction="vertical" className="w-full">
                <MockTable
                  mock={false}
                  onQuery={async () => {
                    await delay(1000)
                    notification.success({
                      message: '表格 A 加载完成',
                      placement: 'bottomRight',
                    })

                    return {
                      success: true,
                      data: data?.list.slice(0, 2),
                    }
                  }}
                  columns={[
                    { title: '名称', dataIndex: 'name' },
                    { title: '数字', dataIndex: 'number', valueType: 'number' },
                    { title: '百分比', dataIndex: 'percent', valueType: 'percent' },
                  ]}
                />
                <MockTable
                  mock={false}
                  onQuery={async () => {
                    await delay(3000)
                    notification.success({
                      message: '表格 B 加载完成',
                      placement: 'bottomRight',
                    })

                    return {
                      success: true,
                      data: data?.list.slice(0, 2),
                    }
                  }}
                  columns={[
                    { title: '日期', dataIndex: 'dayjs1_timestamp', valueType: 'date' },
                    { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
                    { title: '金额', dataIndex: 'price', valueType: 'money', unit: '￥' },
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
