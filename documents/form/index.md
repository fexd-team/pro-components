---
nav:
  title: 表单
  order: 3

title: 预览
contentMaxWidth: 100%
order: 1
---

## 功能演示

```jsx | pure
import { ProForm } from '@fexd/pro-components'
import '@fexd/pro-components/lib/style.less'
```

```tsx
/**
 * inline: false
 * defaultShowCode: true
 */
import React, { useState, useEffect } from 'react'
import { message, Drawer, Space, Form, Radio } from 'antd'
import { isObject, random, run, sample } from '@fexd/tools'
import dayjs from 'dayjs'
import { useDebounce, useLocalStorageState, useDebounceFn } from 'ahooks'
import { ConfigProvider, ProForm } from '@fexd/pro-components'
import { Action } from '@fexd/pro-utils'

export default () => {
  const [form] = ProForm.useForm()

  return (
    <ConfigProvider localeKey="zh-CN">
      <div style={{ padding: 24, background: 'white' }}>
        <Space className="w-full" direction="vertical">
          <ProForm
            form={form}
            fields={[
              {
                required: true,
                tooltip: '???',
                label: 'test',
                name: ['data', 'test'],
                type: 'dateRange',
              },
              {
                required: true,
                label: 'test2',
                name: 'test2',
                type: 'select',
              },
              {
                required: true,
                label: 'test3',
                name: 'test3',
                type: 'date',
              },
              {
                required: true,
                label: 'test4',
                name: 'test4',
                type: 'text',
              },
              {
                required: true,
                label: 'test5',
                name: 'test5',
                type: 'dateRange',
                builtInRule: 'same-month',
              },
              {
                required: true,
                label: 'test6',
                name: 'test6',
                type: 'select',
              },
            ]}
          />

          <Space className="w-full" style={{ justifyContent: 'flex-end' }}>
            <Action
              type="primary"
              content="提交"
              onClick={() => {
                form.validateFields()
              }}
            />
            <Action
              content="重置"
              onClick={() => {
                form.resetFields()
              }}
            />
          </Space>
        </Space>
      </div>
    </ConfigProvider>
  )
}
```
