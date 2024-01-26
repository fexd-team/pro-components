---
group: 类型
order: 2
title: 选择
---

# 选择

## 选择框

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
            fields={[
              {
                label: '单选框',
                tooltip: 'type="select"',
                name: 'select',
                type: 'select',
                options: mockOptions,
              },
              {
                label: '多选框',
                tooltip: 'type="multipleSelect"',
                name: 'multipleSelect',
                type: 'multipleSelect',
                options: mockOptions,
              },
              {
                label: '级联',
                tooltip: 'type="cascader"',
                name: 'cascader',
                type: 'cascader',
                options: [
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                          {
                            value: 'xihu',
                            label: 'West Lake',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [
                      {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                          {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: '树形单选框',
                tooltip: 'type="treeSelect"',
                name: 'treeSelect',
                type: 'treeSelect',
                options: mockTreeOptions,
              },
              {
                label: '树形多选框',
                tooltip: 'type="multipleTreeSelect"',
                name: 'multipleTreeSelect',
                type: 'multipleTreeSelect',
                options: mockTreeOptions,
              },
              {
                label: '弹窗单择框',
                tooltip: 'type="modalSelect"',
                name: 'modalSelect',
                type: 'modalSelect',
                props: {
                  getModalConfig: ({ setValue }: any) => {
                    const proTableRef = ProTable.createRef()

                    return {
                      title: '选择内容',
                      actions: null,
                      content: () => (
                        <ProTable
                          ref={proTableRef}
                          pure
                          selectable
                          onQuery={async () => {
                            const mockData = Array(20).fill('').map(getMockjsData)

                            return {
                              success: true,
                              data: mockData,
                              total: mockData?.length,
                            }
                          }}
                          rowSelection={{
                            type: 'radio',
                            onChange(selectedRowKeys, selectedRows) {
                              setValue(
                                selectedRows?.map((item: any) => ({
                                  value: item?.id,
                                  label: item?.name,
                                })),
                              )
                            },
                          }}
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
                            {
                              title: '金额',
                              dataIndex: 'price',
                              valueType: 'money',
                              unit: '￥',
                              editField: true,
                            },
                            {
                              title: '日期',
                              dataIndex: 'dayjs1_timestamp',
                              valueType: 'date',
                              editField: true,
                            },
                            { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
                          ]}
                        />
                      ),
                    }
                  },
                },
              },
              {
                label: '弹窗多择框',
                tooltip: 'type="modalMultipleSelect"',
                name: 'modalMultipleSelect',
                type: 'modalMultipleSelect',
                props: {
                  getModalConfig: ({ setValue }: any) => {
                    const proTableRef = ProTable.createRef()

                    return {
                      title: '选择内容',
                      async onOk() {
                        if (proTableRef.current!?.queryField.selectedItems?.length <= 0) {
                          message.warning('至少选择一项')
                          return false
                        }
                        setValue(
                          proTableRef.current!?.queryField.selectedItems?.map((item: any) => ({
                            value: item?.id,
                            label: item?.name,
                          })),
                        )
                      },
                      // destroyOnClose: true,
                      content: () => (
                        <ProTable
                          ref={proTableRef}
                          pure
                          selectable
                          onQuery={async () => {
                            const mockData = Array(20).fill('').map(getMockjsData)

                            return {
                              success: true,
                              data: mockData,
                              total: mockData?.length,
                            }
                          }}
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
                            {
                              title: '金额',
                              dataIndex: 'price',
                              valueType: 'money',
                              unit: '￥',
                              editField: true,
                            },
                            {
                              title: '日期',
                              dataIndex: 'dayjs1_timestamp',
                              valueType: 'date',
                              editField: true,
                            },
                            { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
                          ]}
                        />
                      ),
                    }
                  },
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

## 选择按钮

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
            fields={[
              {
                label: '多选',
                tooltip: 'type="checkbox"',
                name: 'checkbox',
                type: 'checkbox',
                options: mockOptions,
              },
              {
                label: '单选',
                tooltip: 'type="radio"',
                name: 'radio',
                type: 'radio',
                options: mockOptions,
              },
              {
                label: '单选按钮',
                tooltip: 'type="radioButton"',
                name: 'radioButton',
                type: 'radioButton',
                options: mockOptions,
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

## 选项 options 配置

### 数组

```jsx | pure
import { ProForm } from '@fexd/pro-components'
export default () => (
  <ProForm
    fields={[
      {
        label: '选择框',
        name: 'select',
        type: 'select',
        options: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
          { label: '选项3', value: 3 },
          { label: '选项4', value: 4 },
          { label: '选项5', value: 5 },
        ],
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
          label: '选择框',
          name: 'select',
          type: 'select',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
          ],
        },
        {
          label: '单选按钮',
          name: 'radio',
          type: 'radio',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
          ],
        },
        {
          label: '复选按钮',
          name: 'checkbox',
          type: 'checkbox',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
          ],
        },
      ]}
    />
  </div>
)
```

### 对象

```jsx | pure
import { ProForm } from '@fexd/pro-components'
export default () => (
  <ProForm
    fields={[
      {
        label: '选择框',
        name: 'select',
        type: 'select',
        options: {
          1: '选项1',
          2: '选项2',
          3: '选项3',
          4: '选项4',
          5: '选项5',
        },
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
          label: '选择框',
          name: 'select',
          type: 'select',
          options: {
            1: '选项1',
            2: '选项2',
            3: '选项3',
          },
        },
        {
          label: '单选按钮',
          name: 'radio',
          type: 'radio',
          options: {
            1: '选项1',
            2: '选项2',
            3: '选项3',
          },
        },
        {
          label: '复选按钮',
          name: 'checkbox',
          type: 'checkbox',
          options: {
            1: '选项1',
            2: '选项2',
            3: '选项3',
          },
        },
      ]}
    />
  </div>
)
```

### 异步函数

```jsx | pure
import { ProForm } from '@fexd/pro-components'
import { delay } from '@fexd/tools'
export default () => (
  <ProForm
    fields={[
      {
        label: '选择框',
        name: 'select',
        type: 'select',
        options: async () => {
          await delay(1000)

          return [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
          ]
        },
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
          label: '选择框',
          name: 'select',
          type: 'select',
          options: async () => {
            await delay(1000)

            return [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '选项3', value: 3 },
            ]
          },
        },
        {
          label: '单选按钮',
          name: 'radio',
          type: 'radio',
          options: async () => {
            await delay(1000)

            return [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '选项3', value: 3 },
            ]
          },
        },
        {
          label: '复选按钮',
          name: 'checkbox',
          type: 'checkbox',
          options: async () => {
            await delay(1000)

            return [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '选项3', value: 3 },
            ]
          },
        },
      ]}
    />
  </div>
)
```

### `useRequest` 实例

```jsx | pure
import { ProForm } from '@fexd/pro-components'
import { useRequest } from 'ahooks'
import { delay } from '@fexd/tools'
export default () => {
  const optionService = useRequest(async () => {
    await delay(1000)

    return [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 },
    ]
  })

  return (
    <ProForm
      fields={[
        {
          label: '选择框',
          name: 'select',
          type: 'select',
          options: optionService,
        },
      ]}
    />
  )
}
```

```tsx
import React from 'react'
import { ProForm } from '@fexd/pro-components'
import { message } from 'antd'
import { useRequest } from 'ahooks'
import { delay } from '@fexd/tools'
export default () => {
  const optionService = useRequest(async () => {
    await delay(1000)

    return [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 },
    ]
  })

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <ProForm
        fields={[
          {
            label: '选择框',
            name: 'select',
            type: 'select',
            options: optionService,
          },
          {
            label: '单选按钮',
            name: 'radio',
            type: 'radio',
            options: optionService,
          },
          {
            label: '复选按钮',
            name: 'checkbox',
            type: 'checkbox',
            options: optionService,
          },
        ]}
      />
    </div>
  )
}
```
