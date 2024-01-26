---
group: 类型
order: 5
---

# 其他

```tsx
import React from 'react'
import { Space, Card, Form, Input } from 'antd'
import { t, ProTable, ConfigProvider, ProForm, ProField, Hook, createForm, dayjsTZ } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { getMockData as getMockjsData } from '@docs/components/RuleDemos'

const mockOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 },
]

const mockTreeOptions = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
]

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
              [
                {
                  label: '开关',
                  tooltip: 'type="switch"',
                  name: 'switch',
                  type: 'switch',
                },
                {
                  label: '评分',
                  tooltip: 'type="rate"',
                  name: 'rate',
                  type: 'rate',
                },
              ],
              [
                {
                  label: '图片',
                  tooltip: 'type="image"',
                  name: 'image',
                  type: 'image',
                },
                {
                  label: '上传',
                  tooltip: 'type="upload"',
                  name: 'upload',
                  type: 'upload',
                },
              ],
              [
                {
                  label: '滑块',
                  tooltip: 'type="slider"',
                  name: 'slider',
                  type: 'slider',
                },
              ],
              [
                {
                  label: '穿梭框',
                  tooltip: 'type="transfer"',
                  name: 'transfer',
                  type: 'transfer',
                  options: [
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                    { label: '选项3', value: 3 },
                    { label: '选项4', value: 4 },
                    { label: '选项5', value: 5 },
                  ],
                },
              ],
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

## 自定义类型

使用 `renderField` 配置项自定义表单类型，将会作为 `Form.Item` 的直接子节点使用

```jsx | pure
import { ProForm } from '@fexd/pro-components'
export default () => (
  <ProForm
    fields={[
      {
        label: '自定义文本框',
        name: 'text1',
        renderField: ({ fieldProps }) => <input placeholder="input text" {...fieldProps} />,
      },
    ]}
  />
)
```

```tsx
import React from 'react'
import { ProForm } from '@fexd/pro-components'
import { message } from 'antd'
import { delay } from '@fexd/tools'
export default () => (
  <div style={{ padding: 24, background: 'white' }}>
    <ProForm
      fields={[
        {
          label: '自定义文本框',
          name: 'text1',
          renderField: ({ fieldProps }) => <input placeholder="input text" {...fieldProps} />,
        },
      ]}
    />
  </div>
)
```
