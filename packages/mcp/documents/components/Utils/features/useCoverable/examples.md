# useCoverable 使用示例

## 基础用法

### 创建标准表格组件

```jsx
import React from 'react'
import { useCoverable } from '@fexd/pro-utils'
import { ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

// 定义标准表格配置
const useStandardTable = useCoverable(
  {
    actions: ['add'],
    iconActions: ['refresh', 'table-size', 'fullscreen'],
    columnActions: ['view', 'edit', 'delete'],
    pagination: {
      defaultPageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条记录`,
    },
  },
  {
    name: 'StandardTable',
    displayName: '标准表格',
  },
)

const mockData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: Random.name(),
  email: Random.email(),
  status: sample(['active', 'inactive']),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
}))

export default () => {
  const { props, Component } = useStandardTable()

  return (
    <Component
      {...props}
      columns={[
        { title: '姓名', dataIndex: 'name', width: 120 },
        { title: '邮箱', dataIndex: 'email', width: 200 },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          valueType: 'select',
          valueEnum: [
            { label: '活跃', value: 'active', color: 'green' },
            { label: '非活跃', value: 'inactive', color: 'gray' },
          ],
        },
        { title: '创建时间', dataIndex: 'createTime', width: 180 },
      ]}
      onQuery={async () => {
        await delay(500)
        return {
          data: mockData,
          total: mockData.length,
        }
      }}
    />
  )
}
```

## 配置覆盖

### 动态权限控制

```jsx
import React, { useState } from 'react'
import { useCoverable } from '@fexd/pro-utils'
import { ProTable } from '@fexd/pro-components'
import { Switch, Space } from 'antd'
import { Random } from 'mockjs'
import { delay } from '@fexd/tools'

const useUserTable = useCoverable(
  {
    columns: [
      { title: '用户名', dataIndex: 'username', editField: true },
      { title: '邮箱', dataIndex: 'email', editField: true },
      { title: '角色', dataIndex: 'role', valueType: 'select', editField: true },
    ],
    actions: ['add'],
    iconActions: ['refresh'],
    columnActions: ['view', 'edit'],
  },
  {
    name: 'UserTable',
  },
)

const mockUsers = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  username: Random.name(),
  email: Random.email(),
  role: Random.pick(['admin', 'user', 'guest']),
}))

export default () => {
  const { props, Component } = useUserTable()
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <span>管理员权限:</span>
          <Switch checked={isAdmin} onChange={setIsAdmin} />
        </Space>
      </div>

      <Component
        {...props}
        // 根据权限动态覆盖配置
        coverableProps={
          isAdmin
            ? {
                actions: ['add', 'export', 'import'],
                columnActions: ['view', 'edit', 'delete', 'resetPassword'],
                batchActions: ['delete', 'export'],
                selectable: true,
              }
            : {
                actions: [],
                columnActions: ['view'],
              }
        }
        onQuery={async () => {
          await delay(300)
          return {
            data: mockUsers,
            total: mockUsers.length,
          }
        }}
      />
    </div>
  )
}
```

## 业务场景定制

### 商品管理表格

```jsx
import React from 'react'
import { useCoverable } from '@fexd/pro-utils'
import { ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const categoryOptions = [
  { label: '电子产品', value: 'electronics' },
  { label: '服装鞋帽', value: 'clothing' },
  { label: '家居用品', value: 'home' },
]

const statusOptions = [
  { label: '上架', value: 'online', color: 'green' },
  { label: '下架', value: 'offline', color: 'red' },
  { label: '草稿', value: 'draft', color: 'orange' },
]

// 创建商品管理专用表格
const useProductTable = useCoverable(
  {
    columns: [
      {
        title: '商品名称',
        dataIndex: 'name',
        editField: true,
        queryField: true,
        width: 150,
      },
      {
        title: '分类',
        dataIndex: 'category',
        valueType: 'select',
        valueEnum: categoryOptions,
        editField: true,
        queryField: true,
        width: 120,
      },
      {
        title: '价格',
        dataIndex: 'price',
        valueType: 'money',
        editField: true,
        width: 100,
      },
      {
        title: '库存',
        dataIndex: 'stock',
        editField: true,
        width: 80,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: statusOptions,
        editField: true,
        queryField: true,
        width: 100,
      },
    ],
    actions: ['add'],
    iconActions: ['refresh', 'table-size'],
    columnActions: ['view', 'edit', 'delete'],
    selectable: true,
    batchActions: ['delete', 'updateStatus'],
    queryField: {
      columns: 3,
      fields: [
        { label: '商品名称', name: 'name', type: 'text' },
        { label: '分类', name: 'category', type: 'select', options: categoryOptions },
        { label: '状态', name: 'status', type: 'select', options: statusOptions },
      ],
    },
  },
  {
    name: 'ProductTable',
    displayName: '商品管理表格',
  },
)

const mockProducts = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  name: Random.title(2, 4),
  category: sample(categoryOptions)?.value,
  price: Random.float(10, 1000, 2, 2),
  stock: Random.integer(0, 100),
  status: sample(statusOptions)?.value,
}))

export default () => {
  const { props, Component } = useProductTable()

  return (
    <Component
      {...props}
      onQuery={async (params) => {
        await delay(500)

        // 模拟筛选逻辑
        let filteredData = mockProducts
        if (params.name) {
          filteredData = filteredData.filter((item) => item.name.includes(params.name))
        }
        if (params.category) {
          filteredData = filteredData.filter((item) => item.category === params.category)
        }
        if (params.status) {
          filteredData = filteredData.filter((item) => item.status === params.status)
        }

        return {
          data: filteredData,
          total: filteredData.length,
        }
      }}
      onAdd={async () => {
        await delay(300)
        console.log('添加商品')
      }}
      onEdit={async (record) => {
        await delay(300)
        console.log('编辑商品:', record)
      }}
      onDelete={async (record) => {
        await delay(300)
        console.log('删除商品:', record)
      }}
    />
  )
}
```

## 表单组件定制

### 标准表单布局

```jsx
import React from 'react'
import { useCoverable } from '@fexd/pro-utils'
import { ProForm } from '@fexd/pro-components'

const useStandardForm = useCoverable(
  {
    gridColumns: 2,
    gridGutter: [16, 16],
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  {
    name: 'StandardForm',
    displayName: '标准表单',
  },
)

export default () => {
  const { props, Component } = useStandardForm()

  return (
    <Component
      {...props}
      fields={[
        {
          label: '姓名',
          name: 'name',
          type: 'text',
          required: true,
          placeholder: '请输入姓名',
        },
        {
          label: '邮箱',
          name: 'email',
          type: 'text',
          required: true,
          placeholder: '请输入邮箱地址',
        },
        {
          label: '手机号',
          name: 'phone',
          type: 'text',
          placeholder: '请输入手机号码',
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: [
            { label: '技术部', value: 'tech' },
            { label: '市场部', value: 'marketing' },
            { label: '财务部', value: 'finance' },
          ],
        },
        {
          label: '备注',
          name: 'remark',
          type: 'textarea',
          colSpan: 2,
          placeholder: '请输入备注信息',
        },
      ]}
      onFinish={(values) => {
        console.log('表单提交:', values)
      }}
    />
  )
}
```

## 继承与扩展

### 基于标准组件的扩展

```jsx
import React from 'react'
import { useCoverable } from '@fexd/pro-utils'
import { ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay } from '@fexd/tools'

// 先定义基础表格
const useBaseTable = useCoverable(
  {
    actions: ['add'],
    iconActions: ['refresh'],
    columnActions: ['view', 'edit', 'delete'],
    pagination: { defaultPageSize: 10 },
  },
  {
    name: 'BaseTable',
  },
)

// 基于基础表格扩展管理员表格
const useAdminTable = useCoverable(
  {
    ...useBaseTable().props, // 继承基础配置
    actions: ['add', 'export', 'import'], // 扩展管理员功能
    iconActions: ['refresh', 'table-size', 'fullscreen'],
    columnActions: ['view', 'edit', 'delete', 'audit'],
    selectable: true,
    batchActions: ['delete', 'export'],
  },
  {
    name: 'AdminTable',
    displayName: '管理员表格',
  },
)

const mockData = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: Random.title(3, 6),
  author: Random.name(),
  status: Random.pick(['published', 'draft', 'archived']),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
}))

export default () => {
  const { props: baseProps } = useBaseTable()
  const { props: adminProps, Component: AdminComponent } = useAdminTable()

  const [useAdmin, setUseAdmin] = React.useState(false)

  const currentProps = useAdmin ? adminProps : baseProps
  const CurrentComponent = useAdmin ? AdminComponent : useBaseTable().Component

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setUseAdmin(!useAdmin)}>切换到{useAdmin ? '基础' : '管理员'}表格</button>
      </div>

      <CurrentComponent
        {...currentProps}
        columns={[
          { title: '标题', dataIndex: 'title', width: 200 },
          { title: '作者', dataIndex: 'author', width: 120 },
          {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            valueType: 'select',
            valueEnum: [
              { label: '已发布', value: 'published', color: 'green' },
              { label: '草稿', value: 'draft', color: 'orange' },
              { label: '已归档', value: 'archived', color: 'gray' },
            ],
          },
          { title: '创建时间', dataIndex: 'createTime', width: 180 },
        ]}
        onQuery={async () => {
          await delay(300)
          return {
            data: mockData,
            total: mockData.length,
          }
        }}
      />
    </div>
  )
}
```
