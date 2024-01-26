---
group: 表单
order: 2
---

# 引导与提示

#### 占位文案

- 需提供表单项的占位文案，不应空缺
- 占位文案尽可能合理，好理解

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space } from 'antd'
import { t, ProTable, ConfigProvider, ProForm } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh-CN"
  >
    <RuleDemos
      demos={[
        {
          name: '占位文案演示',
          // refresh: true,
          bad: (data) => ({
            title: '占位文案缺失，或意义不明',
            content: (
              <ProForm
                gridColumns={2}
                fields={[
                  {
                    label: 'test',
                    name: 'test',
                    type: 'dateRange',
                    placeholder: ['开始', '结束'],
                  },
                  {
                    label: 'test2',
                    name: 'test2',
                    type: 'select',
                    placeholder: ' ',
                  },
                  {
                    label: 'test3',
                    name: 'test3',
                    type: 'date',
                    placeholder: '',
                  },
                  {
                    label: 'test4',
                    name: 'test4',
                    type: 'text',
                    placeholder: '单行输入',
                  },
                  {
                    label: 'test5',
                    name: 'test5',
                    type: 'dateRange',
                    placeholder: ['', ''],
                  },
                  {
                    label: 'test6',
                    name: 'test6',
                    type: 'select',
                    placeholder: '选中',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '补齐占位文案，文案提示合理',
            content: (
              <ProForm
                gridColumns={2}
                fields={[
                  {
                    label: 'test',
                    name: 'test',
                    type: 'dateRange',
                  },
                  {
                    label: 'test2',
                    name: 'test2',
                    type: 'select',
                  },
                  {
                    label: 'test3',
                    name: 'test3',
                    type: 'date',
                  },
                  {
                    label: 'test4',
                    name: 'test4',
                    type: 'text',
                  },
                  {
                    label: 'test5',
                    name: 'test5',
                    type: 'dateRange',
                  },
                  {
                    label: 'test6',
                    name: 'test6',
                    type: 'select',
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

#### 禁用、关联关系的说明

- 表单项被禁用时，应提供原因说明
- 表单项之间的关联关系，应提供具体说明

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space } from 'antd'
import { t, ProTable, ConfigProvider, ProForm } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { useDebounceEffect } from 'ahooks'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh-CN"
  >
    <RuleDemos
      demos={[
        {
          name: '关联与禁用演示',
          // refresh: true,
          bad: (data) => ({
            title: '禁用原因、关联关系不明确',
            content: (
              <ProForm
                gridColumns={2}
                fields={[
                  { label: '文本框', name: 'text' },
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
                          // if (textValue) {
                          //   message.info(`text 发生了变化：${textValue}`)
                          // }

                          form.setFieldsValue({
                            select: undefined,
                          })
                        },
                        [textValue],
                        { wait: 500 },
                      )

                      const overrideConfig = {
                        disabled,
                        options: textValue ? [{ label: textValue, value: textValue }] : [],
                      }

                      return overrideConfig
                    },
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '说明了禁用原因、关联关系明确',
            content: (
              <ProForm
                gridColumns={2}
                fields={[
                  { label: '文本框', name: 'text' },
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
                          // if (textValue) {
                          //   message.info(`text 发生了变化：${textValue}`)
                          // }

                          form.setFieldsValue({
                            select: undefined,
                          })
                        },
                        [textValue],
                        { wait: 500 },
                      )

                      const overrideConfig = {
                        tooltip: disabled
                          ? '选项会根据文本框变化，请先输入文本框'
                          : `选项会根据文本框变化，当前内容：${textValue}`,
                        disabled,
                        options: textValue ? [{ label: textValue, value: textValue }] : [],
                      }

                      if (disabled) {
                        return {
                          ...overrideConfig,
                          placeholder: '文本框需要先写点儿啥',
                        }
                      }

                      return overrideConfig
                    },
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

#### 对未保存内容进行提示

- 弹窗或抽屉表单，在关闭弹窗前，应对用户进行编辑内容未保存的提示
- 表单页面，在跳转页面前，应对用户进行编辑内容未保存的提示
