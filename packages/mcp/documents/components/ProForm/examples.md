# ProForm 组件示例

## 基础用法

最基本的表单配置，展示各种字段类型的使用。

```tsx
import React from 'react'
import { Space } from 'antd'
import { ProForm } from '@fexd/pro-components'
import { Action } from '@fexd/pro-utils'

export default () => {
  const [form] = ProForm.useForm()

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space className="w-full" direction="vertical">
        <ProForm
          form={form}
          fields={[
            {
              required: true,
              tooltip: '请输入用户名',
              label: '用户名',
              name: 'username',
              type: 'text',
            },
            {
              required: true,
              label: '密码',
              name: 'password',
              type: 'password',
            },
            {
              label: '邮箱',
              name: 'email',
              type: 'text',
            },
            {
              label: '年龄',
              name: 'age',
              type: 'digit',
            },
            {
              label: '性别',
              name: 'gender',
              type: 'select',
              options: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' },
              ],
            },
            {
              label: '生日',
              name: 'birthday',
              type: 'date',
            },
          ]}
        />

        <Space className="w-full" style={{ justifyContent: 'flex-end' }}>
          <Action
            type="primary"
            content="提交"
            onClick={() => {
              form.validateFields().then((values) => {
                console.log('表单值:', values)
              })
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
  )
}
```

## Grid 布局

使用内置的 Grid 布局系统控制表单字段的排列。

```tsx
import React, { useState } from 'react'
import { Space, Slider } from 'antd'
import { ProForm } from '@fexd/pro-components'
import { Action } from '@fexd/pro-utils'

const gutters: Record<string, number> = {}
const colCounts: Record<string, number> = {}
;[0, 8, 16, 24, 32, 40, 48].forEach((value, i) => {
  gutters[i] = value
})
;[2, 3, 4, 6, 8, 12].forEach((value, i) => {
  colCounts[i] = value
})

export default () => {
  const [form] = ProForm.useForm()
  const [gutterKey, setGutterKey] = useState(2)
  const [colCountKey, setColCountKey] = useState(1)

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }}>
        <div>
          <span>水平间距 (px): </span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(gutters).length - 1}
              value={gutterKey}
              onChange={setGutterKey}
              marks={gutters}
              step={null}
              tipFormatter={(value) => value && gutters[value]}
            />
          </div>
        </div>

        <div>
          <span>列数:</span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(colCounts).length - 1}
              value={colCountKey}
              onChange={setColCountKey}
              marks={colCounts}
              step={null}
              tipFormatter={(value) => value && colCounts[value]}
            />
          </div>
        </div>
      </Space>

      <ProForm
        form={form}
        gridGutter={[gutters[gutterKey], 0]}
        gridColumns={colCounts[colCountKey]}
        fields={[
          {
            required: true,
            label: '姓名',
            name: 'name',
            type: 'text',
          },
          {
            required: true,
            label: '部门',
            name: 'department',
            type: 'select',
            options: [
              { label: '技术部', value: 'tech' },
              { label: '产品部', value: 'product' },
              { label: '运营部', value: 'operation' },
            ],
          },
          {
            required: true,
            label: '入职日期',
            name: 'joinDate',
            type: 'date',
          },
          {
            label: '工资',
            name: 'salary',
            type: 'money',
            unit: '¥',
          },
          {
            label: '工作年限',
            name: 'experience',
            type: 'digit',
          },
          {
            label: '技能',
            name: 'skills',
            type: 'multipleSelect',
            options: [
              { label: 'React', value: 'react' },
              { label: 'Vue', value: 'vue' },
              { label: 'Angular', value: 'angular' },
            ],
          },
        ]}
      />
    </div>
  )
}
```

## 输入类型字段

展示各种输入类型字段的使用方式。

```tsx
import React, { useState } from 'react'
import { Space } from 'antd'
import { ProForm, ProField } from '@fexd/pro-components'

export default () => {
  const [form] = ProForm.useForm()
  const [readonly, setReadonly] = useState(false)

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space size="middle" direction="vertical" className="w-full">
        <ProField
          noStyle
          type="switch"
          props={{
            checked: readonly,
            checkedChildren: '只读',
            unCheckedChildren: '编辑',
            onChange: setReadonly,
          }}
        />

        <ProForm
          form={form}
          mode={readonly ? 'view' : 'edit'}
          fields={[
            {
              label: '文本',
              tooltip: 'type="text"',
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
              tooltip: 'type="digit"',
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
      </Space>
    </div>
  )
}
```

## 选择类型字段

展示各种选择类型字段的使用方式。

```tsx
import React, { useState } from 'react'
import { Space } from 'antd'
import { ProForm, ProField } from '@fexd/pro-components'

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
    ],
  },
]

export default () => {
  const [form] = ProForm.useForm()
  const [readonly, setReadonly] = useState(false)

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space size="middle" direction="vertical" className="w-full">
        <ProField
          noStyle
          type="switch"
          props={{
            checked: readonly,
            checkedChildren: '只读',
            unCheckedChildren: '编辑',
            onChange: setReadonly,
          }}
        />

        <ProForm
          form={form}
          mode={readonly ? 'view' : 'edit'}
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
              label: '级联选择',
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
              label: '树形单选',
              tooltip: 'type="treeSelect"',
              name: 'treeSelect',
              type: 'treeSelect',
              options: mockTreeOptions,
            },
            {
              label: '树形多选',
              tooltip: 'type="multipleTreeSelect"',
              name: 'multipleTreeSelect',
              type: 'multipleTreeSelect',
              options: mockTreeOptions,
            },
          ]}
        />
      </Space>
    </div>
  )
}
```

## 日期时间字段

展示各种日期时间类型字段的使用方式。

```tsx
import React, { useState } from 'react'
import { Space } from 'antd'
import { ProForm, ProField } from '@fexd/pro-components'

export default () => {
  const [form] = ProForm.useForm()
  const [readonly, setReadonly] = useState(false)

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space size="middle" direction="vertical" className="w-full">
        <ProField
          noStyle
          type="switch"
          props={{
            checked: readonly,
            checkedChildren: '只读',
            unCheckedChildren: '编辑',
            onChange: setReadonly,
          }}
        />

        <ProForm
          form={form}
          mode={readonly ? 'view' : 'edit'}
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
            },
            {
              label: '日期范围',
              tooltip: 'type="dateRange"',
              name: 'dateRange',
              type: 'dateRange',
              builtInRule: 'same-month',
            },
            {
              label: '日期时间范围',
              tooltip: 'type="dateTimeRange"',
              name: 'dateTimeRange',
              type: 'dateTimeRange',
            },
            {
              label: '时间',
              tooltip: 'type="time"',
              name: 'time',
              type: 'time',
            },
            {
              label: '时间范围',
              tooltip: 'type="timeRange"',
              name: 'timeRange',
              type: 'timeRange',
            },
          ]}
        />
      </Space>
    </div>
  )
}
```

## 自定义布局

通过 render 属性完全控制表单布局。

```tsx
import React from 'react'
import { Space, Form } from 'antd'
import { ProForm, ProField } from '@fexd/pro-components'
import { Action } from '@fexd/pro-utils'

export default () => {
  const [form] = ProForm.useForm()

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <ProForm
        form={form}
        fields={[
          {
            required: true,
            label: '用户名',
            name: 'username',
            type: 'text',
          },
          {
            required: true,
            label: '密码',
            name: 'password',
            type: 'password',
          },
          {
            required: true,
            label: '确认密码',
            name: 'confirmPassword',
            type: 'password',
          },
          {
            label: '邮箱',
            name: 'email',
            type: 'text',
          },
          {
            label: '手机号',
            name: 'phone',
            type: 'text',
          },
          {
            label: '部门',
            name: 'department',
            type: 'select',
            options: [
              { label: '技术部', value: 'tech' },
              { label: '产品部', value: 'product' },
            ],
          },
        ]}
        render={[
          // 第一行：用户名占16列，密码占8列
          [
            {
              name: 'username',
              colSpan: 16,
            },
            {
              name: 'password',
              colSpan: 8,
            },
          ],
          // 第二行：确认密码占16列，操作按钮占8列
          [
            {
              name: 'confirmPassword',
              colSpan: 16,
            },
            {
              colSpan: 8,
              content: (
                <Form.Item label=" ">
                  <Space>
                    <Action
                      type="primary"
                      content="提交"
                      onClick={async () => {
                        await form.validateFields()
                      }}
                    />
                    <Action
                      content="重置"
                      onClick={() => {
                        form.resetFields()
                      }}
                    />
                  </Space>
                </Form.Item>
              ),
            },
          ],
          // 第三行：每个字段占8列
          ['email', 'phone', 'department'],
        ]}
      />
    </div>
  )
}
```

## 其他字段类型

展示开关、评分、滑块等其他类型字段。

```tsx
import React, { useState } from 'react'
import { Space } from 'antd'
import { ProForm, ProField } from '@fexd/pro-components'

export default () => {
  const [form] = ProForm.useForm()
  const [readonly, setReadonly] = useState(false)

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space size="middle" direction="vertical" className="w-full">
        <ProField
          noStyle
          type="switch"
          props={{
            checked: readonly,
            checkedChildren: '只读',
            unCheckedChildren: '编辑',
            onChange: setReadonly,
          }}
        />

        <ProForm
          form={form}
          mode={readonly ? 'view' : 'edit'}
          fields={[
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
            {
              label: '滑块',
              tooltip: 'type="slider"',
              name: 'slider',
              type: 'slider',
            },
            {
              label: '上传',
              tooltip: 'type="upload"',
              name: 'upload',
              type: 'upload',
            },
          ]}
        />
      </Space>
    </div>
  )
}
```
