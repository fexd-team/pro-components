# ProField 组件示例

## 基础用法

ProField 可以独立使用，不需要依赖表单上下文。

```tsx
import React, { useState } from 'react'
import { Space } from 'antd'
import { ProField } from '@fexd/pro-components'

export default () => {
  const [value, setValue] = useState('Hello ProField')

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ProField label="文本字段" type="text" value={value} onChange={setValue} />

        <div>当前值: {value}</div>
      </Space>
    </div>
  )
}
```

## 字段模式切换

展示编辑模式和查看模式的区别。

```tsx
import React, { useState } from 'react'
import { Space, Button } from 'antd'
import { ProField } from '@fexd/pro-components'

export default () => {
  const [mode, setMode] = useState<'edit' | 'view'>('edit')
  const [values, setValues] = useState({
    text: 'ProField 示例文本',
    money: 12345.67,
    date: '2023-12-01',
    select: 'option2',
    switch: true,
    rate: 4,
  })

  const options = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
  ]

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
          切换到{mode === 'edit' ? '查看' : '编辑'}模式
        </Button>

        <ProField
          label="文本"
          type="text"
          mode={mode}
          value={values.text}
          onChange={(value) => setValues((prev) => ({ ...prev, text: value }))}
        />

        <ProField
          label="金额"
          type="money"
          unit="¥"
          mode={mode}
          value={values.money}
          onChange={(value) => setValues((prev) => ({ ...prev, money: value }))}
        />

        <ProField
          label="日期"
          type="date"
          mode={mode}
          value={values.date}
          onChange={(value) => setValues((prev) => ({ ...prev, date: value }))}
        />

        <ProField
          label="选择器"
          type="select"
          options={options}
          mode={mode}
          value={values.select}
          onChange={(value) => setValues((prev) => ({ ...prev, select: value }))}
        />

        <ProField
          label="开关"
          type="switch"
          mode={mode}
          value={values.switch}
          onChange={(value) => setValues((prev) => ({ ...prev, switch: value }))}
        />

        <ProField
          label="评分"
          type="rate"
          mode={mode}
          value={values.rate}
          onChange={(value) => setValues((prev) => ({ ...prev, rate: value }))}
        />
      </Space>
    </div>
  )
}
```

## 无样式模式

使用 noStyle 属性去除默认样式，只渲染字段控件本身。

```tsx
import React, { useState } from 'react'
import { Space, Typography } from 'antd'
import { ProField } from '@fexd/pro-components'

const { Title, Text } = Typography

export default () => {
  const [readonlyMode, setReadonlyMode] = useState(false)

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4}>自定义布局示例</Title>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text>启用只读模式：</Text>
          <ProField noStyle type="switch" value={readonlyMode} onChange={setReadonlyMode} />
        </div>

        <div
          style={{
            padding: 16,
            border: '1px solid #d9d9d9',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text strong>自定义控件样式：</Text>
          <ProField noStyle type="rate" mode={readonlyMode ? 'view' : 'edit'} defaultValue={3} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <Text>姓名：</Text>
          <ProField
            noStyle
            type="text"
            placeholder="请输入姓名"
            mode={readonlyMode ? 'view' : 'edit'}
            defaultValue="张三"
          />

          <Text>年龄：</Text>
          <ProField
            noStyle
            type="digit"
            placeholder="请输入年龄"
            mode={readonlyMode ? 'view' : 'edit'}
            defaultValue={25}
          />
        </div>
      </Space>
    </div>
  )
}
```

## 各种字段类型展示

展示 ProField 支持的所有字段类型。

```tsx
import React from 'react'
import { Space, Divider } from 'antd'
import { ProField } from '@fexd/pro-components'

const selectOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
]

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake' }],
      },
    ],
  },
]

const treeOptions = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{ title: 'Child Node1', value: '0-0-0', key: '0-0-0' }],
  },
]

export default () => {
  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Divider orientation="left">输入类型</Divider>

        <ProField label="文本输入" type="text" placeholder="请输入文本" defaultValue="示例文本" />

        <ProField label="密码输入" type="password" placeholder="请输入密码" />

        <ProField label="数字输入" type="digit" placeholder="请输入数字" defaultValue={100} />

        <ProField label="金额输入" type="money" unit="¥" defaultValue={1234.56} />

        <ProField label="百分比" type="percent" defaultValue={0.85} />

        <ProField
          label="文本域"
          type="textarea"
          placeholder="请输入多行文本"
          props={{ rows: 3 }}
          defaultValue="这是一个多行文本示例"
        />

        <Divider orientation="left">选择类型</Divider>

        <ProField
          label="单选下拉"
          type="select"
          options={selectOptions}
          placeholder="请选择城市"
          defaultValue="beijing"
        />

        <ProField
          label="多选下拉"
          type="multipleSelect"
          options={selectOptions}
          placeholder="请选择城市"
          defaultValue={['beijing', 'shanghai']}
        />

        <ProField label="级联选择" type="cascader" options={cascaderOptions} placeholder="请选择地区" />

        <ProField label="树形选择" type="treeSelect" options={treeOptions} placeholder="请选择节点" />

        <Divider orientation="left">日期时间类型</Divider>

        <ProField label="日期选择" type="date" defaultValue="2023-12-01" />

        <ProField label="日期时间" type="dateTime" defaultValue="2023-12-01 14:30:00" />

        <ProField label="日期范围" type="dateRange" defaultValue={['2023-12-01', '2023-12-07']} />

        <ProField label="时间选择" type="time" defaultValue="14:30:00" />

        <Divider orientation="left">其他类型</Divider>

        <ProField
          label="开关"
          type="switch"
          defaultValue={true}
          props={{
            checkedChildren: '开启',
            unCheckedChildren: '关闭',
          }}
        />

        <ProField label="评分" type="rate" defaultValue={4} />

        <ProField label="滑块" type="slider" defaultValue={60} props={{ min: 0, max: 100 }} />
      </Space>
    </div>
  )
}
```

## 受控与非受控

ProField 支持受控和非受控两种使用方式。

```tsx
import React, { useState } from 'react'
import { Space, Button, Typography } from 'antd'
import { ProField } from '@fexd/pro-components'

const { Title, Text } = Typography

export default () => {
  const [controlledValue, setControlledValue] = useState('受控组件值')

  const handleReset = () => {
    setControlledValue('重置后的值')
  }

  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4}>受控组件</Title>
        <ProField label="受控输入" type="text" value={controlledValue} onChange={setControlledValue} />
        <Text>当前值: {controlledValue}</Text>
        <Button onClick={handleReset}>重置受控值</Button>

        <Title level={4}>非受控组件</Title>
        <ProField
          label="非受控输入"
          type="text"
          defaultValue="默认值"
          onChange={(value) => console.log('非受控组件值变化:', value)}
        />

        <ProField
          label="非受控选择器"
          type="select"
          options={[
            { label: '选项A', value: 'a' },
            { label: '选项B', value: 'b' },
            { label: '选项C', value: 'c' },
          ]}
          defaultValue="b"
          onChange={(value) => console.log('选择器值变化:', value)}
        />

        <Text type="secondary">查看浏览器控制台可以看到非受控组件的值变化</Text>
      </Space>
    </div>
  )
}
```

## 自定义属性传递

通过 props 属性向底层组件传递自定义属性。

```tsx
import React from 'react'
import { Space } from 'antd'
import { ProField } from '@fexd/pro-components'

export default () => {
  return (
    <div style={{ padding: 24, background: 'white' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ProField
          label="自定义输入框"
          type="text"
          defaultValue="带前缀和后缀"
          props={{
            prefix: '📝',
            suffix: '.txt',
            maxLength: 20,
            showCount: true,
          }}
        />

        <ProField
          label="自定义数字输入"
          type="digit"
          defaultValue={50}
          props={{
            min: 0,
            max: 100,
            step: 5,
            formatter: (value) => `${value}%`,
            parser: (value) => value?.replace('%', ''),
          }}
        />

        <ProField
          label="自定义选择器"
          type="select"
          options={[
            { label: '小', value: 'small' },
            { label: '中', value: 'medium' },
            { label: '大', value: 'large' },
          ]}
          defaultValue="medium"
          props={{
            size: 'large',
            allowClear: true,
            showSearch: true,
            optionFilterProp: 'label',
          }}
        />

        <ProField
          label="自定义开关"
          type="switch"
          defaultValue={false}
          props={{
            checkedChildren: '✅',
            unCheckedChildren: '❌',
            size: 'default',
            loading: false,
          }}
        />

        <ProField
          label="自定义评分"
          type="rate"
          defaultValue={3}
          props={{
            count: 10,
            character: '⭐',
            allowHalf: true,
            tooltips: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
          }}
        />
      </Space>
    </div>
  )
}
```
