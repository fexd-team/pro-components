---
group: 类型
order: 1
---

# 输入

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
        const formDemo = (
          <ProForm
            mode={readonly ? 'view' : 'edit'}
            preserve
            ref={(ref) => {
              window.form = ref
            }}
            fields={[
              {
                label: '文本',
                tooltip: 'type="text" | type="input"',
                name: 'text',
                type: 'text',
              },
              {
                label: '密码',
                tooltip: 'type="password"',
                name: 'password',
                type: 'password',
              },
              {
                label: '金额',
                tooltip: 'type="money"',
                name: 'money',
                type: 'money',
                unit: '¥',
              },
              {
                label: '文本域',
                tooltip: 'type="textarea"',
                name: 'textarea',
                type: 'textarea',
              },
              {
                label: '数字',
                tooltip: 'type="digit" | type="number"',
                name: 'digit',
                type: 'digit',
              },
              {
                label: '百分比',
                tooltip: 'type="percent"',
                name: 'percent',
                type: 'percent',
                props: {
                  min: 0.01,
                  max: 1,
                },
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
