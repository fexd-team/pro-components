# ProTable 基础表格功能示例

## 最简单的表格

展示最基本的数据表格，使用静态数据源。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'

const mockData = [
  { id: 1, name: '张三', age: 25, department: '技术部' },
  { id: 2, name: '李四', age: 30, department: '产品部' },
  { id: 3, name: '王五', age: 28, department: '运营部' },
]

export default () => {
  return (
    <ProTable
      title="用户列表"
      dataSource={mockData}
      columns={[
        {
          label: 'ID',
          name: 'id',
          width: 80,
        },
        {
          label: '姓名',
          name: 'name',
          width: 120,
        },
        {
          label: '年龄',
          name: 'age',
          width: 80,
        },
        {
          label: '部门',
          name: 'department',
        },
      ]}
      pagination={false}
    />
  )
}
```

## 带分页的表格

展示带有分页功能的表格。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'

const generateMockData = (count = 50) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30) + 20,
    department: ['技术部', '产品部', '运营部'][Math.floor(Math.random() * 3)],
    salary: Math.floor(Math.random() * 20000) + 8000,
  }))
}

export default () => {
  return (
    <ProTable
      title="员工列表"
      dataSource={generateMockData(50)}
      columns={[
        {
          label: 'ID',
          name: 'id',
          width: 80,
        },
        {
          label: '姓名',
          name: 'name',
          width: 120,
        },
        {
          label: '年龄',
          name: 'age',
          width: 80,
        },
        {
          label: '部门',
          name: 'department',
          width: 120,
        },
        {
          label: '薪资',
          name: 'salary',
          type: 'money',
          width: 120,
        },
      ]}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  )
}
```

## 带序号的表格

展示带有序号列的表格，序号可以按页累加。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'

const mockData = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `用户${index + 1}`,
  email: `user${index + 1}@example.com`,
  status: Math.random() > 0.5 ? 'active' : 'inactive',
}))

export default () => {
  return (
    <ProTable
      title="用户管理"
      dataSource={mockData}
      showDataSourceIndex={true}
      dataSourceIndexCalcWithPage={true}
      columns={[
        {
          label: '姓名',
          name: 'name',
        },
        {
          label: '邮箱',
          name: 'email',
        },
        {
          label: '状态',
          name: 'status',
          type: 'switch',
          options: [
            { label: '活跃', value: 'active' },
            { label: '非活跃', value: 'inactive' },
          ],
        },
      ]}
      pagination={{
        pageSize: 10,
      }}
    />
  )
}
```

## 不同字段类型展示

展示ProTable支持的各种字段类型。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'

const mockData = [
  {
    id: 1,
    name: '张三',
    salary: 15000,
    performance: 85,
    joinDate: '2023-01-15',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    avatar: 'https://via.placeholder.com/40x40',
    rating: 4.5,
    isActive: true,
  },
  {
    id: 2,
    name: '李四',
    salary: 18000,
    performance: 92,
    joinDate: '2022-08-20',
    lastLogin: new Date(Date.now() - 30 * 60 * 1000),
    avatar: 'https://via.placeholder.com/40x40',
    rating: 4.8,
    isActive: false,
  },
]

export default () => {
  return (
    <ProTable
      title="员工详细信息"
      dataSource={mockData}
      columns={[
        {
          label: '头像',
          name: 'avatar',
          type: 'image',
          width: 80,
        },
        {
          label: '姓名',
          name: 'name',
          copyable: true,
        },
        {
          label: '薪资',
          name: 'salary',
          type: 'money',
        },
        {
          label: '绩效',
          name: 'performance',
          type: 'percent',
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
        },
        {
          label: '最后登录',
          name: 'lastLogin',
          type: 'fromNow',
        },
        {
          label: '评分',
          name: 'rating',
          type: 'rate',
        },
        {
          label: '状态',
          name: 'isActive',
          type: 'switch',
        },
      ]}
      pagination={false}
    />
  )
}
```

## 自定义样式表格

展示如何自定义表格的样式和大小。

```tsx
import React, { useState } from 'react'
import { ProTable } from '@fexd/pro-components'
import { Radio } from 'antd'

const mockData = [
  { id: 1, product: '产品A', price: 299, stock: 100 },
  { id: 2, product: '产品B', price: 199, stock: 50 },
  { id: 3, product: '产品C', price: 399, stock: 200 },
]

export default () => {
  const [size, setSize] = useState('large')
  const [pure, setPure] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio.Button value="small">小</Radio.Button>
          <Radio.Button value="middle">中</Radio.Button>
          <Radio.Button value="large">大</Radio.Button>
        </Radio.Group>

        <Radio.Group value={pure} onChange={(e) => setPure(e.target.value)} style={{ marginLeft: 16 }}>
          <Radio value={false}>带边框</Radio>
          <Radio value={true}>纯表格</Radio>
        </Radio.Group>
      </div>

      <ProTable
        title="产品列表"
        dataSource={mockData}
        defaultSize={size}
        pure={pure}
        columns={[
          {
            label: 'ID',
            name: 'id',
            width: 80,
          },
          {
            label: '产品名称',
            name: 'product',
          },
          {
            label: '价格',
            name: 'price',
            type: 'money',
          },
          {
            label: '库存',
            name: 'stock',
            type: 'digit',
          },
        ]}
        pagination={false}
      />
    </div>
  )
}
```
