# ConfigProvider 使用示例

## 国际化配置

### 英文界面

```jsx
import React from 'react'
import { ConfigProvider, ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const mockOptions = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
]

const dataSource = [
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
]

export default () => (
  <ConfigProvider localeKey="en-US">
    <ProTable
      actions={['add']}
      iconActions={['refresh', 'table-size', 'fullscreen']}
      columnActions={['view', 'edit', 'delete']}
      columns={[
        {
          title: 'Text',
          dataIndex: 'text',
          editField: true,
          queryField: true,
        },
        {
          title: 'Select',
          dataIndex: 'select',
          valueType: 'select',
          valueEnum: mockOptions,
          editField: true,
          queryField: true,
        },
      ]}
      onQuery={async () => {
        await delay(500)
        return { data: dataSource, total: dataSource.length }
      }}
    />
  </ConfigProvider>
)
```

### 马来文界面

```jsx
import React from 'react'
import { ConfigProvider, ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const mockOptions = [
  { label: 'Pilihan 1', value: 1 },
  { label: 'Pilihan 2', value: 2 },
  { label: 'Pilihan 3', value: 3 },
]

const dataSource = [
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
]

export default () => (
  <ConfigProvider localeKey="ms_MY">
    <ProTable
      actions={['add']}
      iconActions={['refresh', 'table-size', 'fullscreen']}
      columnActions={['view', 'edit', 'delete']}
      columns={[
        {
          title: 'Teks',
          dataIndex: 'text',
          editField: true,
          queryField: true,
        },
        {
          title: 'Pilihan',
          dataIndex: 'select',
          valueType: 'select',
          valueEnum: mockOptions,
          editField: true,
          queryField: true,
        },
      ]}
      onQuery={async () => {
        await delay(500)
        return { data: dataSource, total: dataSource.length }
      }}
    />
  </ConfigProvider>
)
```

## 尺寸配置

### 小尺寸表格

```jsx
import React from 'react'
import { ConfigProvider, ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const mockOptions = [
  { label: '选项 1', value: 1 },
  { label: '选项 2', value: 2 },
  { label: '选项 3', value: 3 },
]

const dataSource = [
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
]

export default () => (
  <ConfigProvider localeKey="zh-CN" size="small">
    <ProTable
      actions={['add']}
      iconActions={['refresh', 'table-size', 'fullscreen']}
      columnActions={['view', 'edit', 'delete']}
      columns={[
        {
          title: '文本',
          dataIndex: 'text',
          editField: true,
          queryField: true,
        },
        {
          title: '选择框',
          dataIndex: 'select',
          valueType: 'select',
          valueEnum: mockOptions,
          editField: true,
          queryField: true,
        },
      ]}
      onQuery={async () => {
        await delay(500)
        return { data: dataSource }
      }}
      pagination={false}
    />
  </ConfigProvider>
)
```

## 文案自定义

### 自定义删除确认文案

```jsx
import React from 'react'
import { ConfigProvider, ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const mockOptions = [
  { label: '选项 1', value: 1 },
  { label: '选项 2', value: 2 },
  { label: '选项 3', value: 3 },
]

const dataSource = [
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
  {
    id: Random.id(),
    text: Random.name(),
    select: sample(mockOptions)?.value,
  },
]

export default () => (
  <ConfigProvider
    proLocale={{
      table: {
        actions: {
          multipleDeleteConfirm: (count = 0) => `您确定要移除已选中的 ${count} 条记录吗？`,
          multipleDelete: '批量移除',
          deleteConfirm: '您确定要移除这条记录吗？',
          delete: '移除',
          refreshTip: '点击刷新数据',
        },
        editField: {
          add: '创建新记录',
          details: '查看详细信息',
          edit: '修改记录',
          saveTips: '未保存的修改将会丢失，您确定要继续吗？',
        },
        queryField: {
          query: '搜索',
          reset: '清空',
          fold: '隐藏',
          more: '显示更多',
        },
      },
    }}
  >
    <ProTable
      actions={['add']}
      iconActions={['refresh', 'table-size', 'fullscreen']}
      columnActions={['view', 'edit', 'delete']}
      selectable
      batchActions={['delete']}
      rowSelection={{
        defaultSelectedRowKeys: dataSource?.map((item) => item.id),
      }}
      columns={[
        {
          title: '文本',
          dataIndex: 'text',
          editField: true,
          queryField: true,
        },
        {
          title: '选择框',
          dataIndex: 'select',
          valueType: 'select',
          valueEnum: mockOptions,
          editField: true,
          queryField: true,
        },
      ]}
      onQuery={async () => {
        await delay(500)
        return { data: dataSource }
      }}
      onAdd={async () => {
        await delay(500)
      }}
      onView={async () => {
        await delay(500)
      }}
      onEdit={async () => {
        await delay(500)
      }}
      onDelete={async () => {
        await delay(500)
      }}
    />
  </ConfigProvider>
)
```

## 表单中的配置

### 表单国际化

```jsx
import React from 'react'
import { ConfigProvider, ProForm } from '@fexd/pro-components'

export default () => (
  <ConfigProvider localeKey="en-US">
    <ProForm
      fields={[
        {
          label: 'Username',
          name: 'username',
          type: 'text',
          required: true,
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
          required: true,
        },
        {
          label: 'Country',
          name: 'country',
          type: 'select',
          options: [
            { label: 'China', value: 'cn' },
            { label: 'Indonesia', value: 'id' },
            { label: 'Malaysia', value: 'my' },
          ],
        },
      ]}
      onFinish={(values) => {
        console.log('Form values:', values)
      }}
    />
  </ConfigProvider>
)
```
