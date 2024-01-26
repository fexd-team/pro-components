---
title: 关联
order: 4
---

# 表单关联

通过 `hook` 配置项实现动态关联，可以写 react 的 hooks 来存储一些中间状态

<!-- prettier-ignore -->
```jsx | pure
import { ProForm } from '@fexd/pro-components'
export default () => (
  <ProForm
    fields={[
      { label: '文本', name: 'text' },
      {
        label: '单选框',
        name: 'select',
        type: 'select',
        hook: ({ form }) => { 
          const textValue = form.getFieldValue('text') // 获取 text 字段

          useEffect(() => { // 可以写 react 的 hooks，来存储一些中间状态
            console.log('text 发生了变化', textValue)
          }, [textValue])

          return { // hook 函数可以动态修改除了 name 之外的所有属性
            options: textValue ? [{ label: textValue, value: textValue }] : [],
          }
        },
        dependencies: ['text'], // 显式声明依赖 text，可以不指定，不指定时候，任何值变化都会重新计算
      },
    ]}
  />
)
```

```tsx
import React from 'react'
import { ProForm, ProField } from '@fexd/pro-components'
import { useDebounceEffect } from 'ahooks'
import { message, Tag, Space } from 'antd'
import { delay } from '@fexd/tools'

const mockOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 },
]

export default () => (
  <div style={{ padding: 24, background: 'white' }}>
    <ProForm
      fields={[
        { label: '文本', name: 'text' },
        {
          label: '单选框',
          name: 'select',
          type: 'select',
          dependencies: ['text'],
          hook: ({ form }) => {
            const textValue = form.getFieldValue('text')

            const disabled = !textValue

            useDebounceEffect(
              () => {
                if (textValue) {
                  message.info(`text 发生了变化：${textValue}`)
                }

                form.setFieldsValue({
                  select: undefined,
                })
              },
              [textValue],
              { wait: 500 },
            )

            // if (disabled) {
            //   return false
            // }

            const overrideConfig: any = {
              tooltip: !disabled && `选项会根据文本框变化，当前内容：${textValue}`,
              disabled,
              options: textValue ? [{ label: textValue, value: textValue }] : [],
            }

            if (disabled) {
              overrideConfig.label = (
                <Space>
                  单选框
                  <Tag color="orange">文本框需要先写点儿啥</Tag>
                </Space>
              )
            }

            return overrideConfig
          },
        },
        { label: '文本2', name: 'text2' },
      ]}
    />
  </div>
)
```

```tsx
import React from 'react'
import { ProForm, ProField } from '@fexd/pro-components'
import { useDebounceEffect } from 'ahooks'
import { message, Tag, Space } from 'antd'
import { delay } from '@fexd/tools'

export default () => (
  <ProForm
    gridColumns={2}
    fields={[
      {
        label: '单选框-2',
        name: 'select-2',
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
        ],
      },

      {
        label: '单选框-3',
        name: 'select-3',
        type: 'select',
        dependencies: ['select-2'],
        hook: ({ form }) => {
          const depValue = form.getFieldValue('select-2')
          const disabled = !depValue

          // useEffect(() => {
          //   form.setFieldsValue({
          //     productCode: undefined,
          //   })
          // }, [depValue])

          return {
            key: depValue,
            disabled,
            options:
              depValue === '1'
                ? [
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                  ]
                : [
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                  ],
          }
        },
      },
    ]}
  />
)
```

<!-- ```tsx
import React from 'react'
import { ProForm, ProField } from '@fexd/pro-components'
import { useDebounceEffect } from 'ahooks'
import { message, Tag, Space } from 'antd'
import { delay } from '@fexd/tools'

export default () => (
  <ProForm
    ref={form => {
      window.form = form
    }}
  >
    <ProField label="test" name="test" />
    <ProField label="test2" name="test2" />
  </ProForm>
)
``` -->
