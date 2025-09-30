# ProTable 查询功能示例

## 基础查询功能

展示最基本的查询表单与表格联动功能。

```tsx
import React from 'react'
import { message } from 'antd'
import { ProTable } from '@fexd/pro-components'
import { delay } from '@fexd/tools'

const mockOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
]

const generateMockData = (params = {}) => {
  const { name, department, current = 1, pageSize = 10 } = params

  let data = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30) + 20,
    department: mockOptions[Math.floor(Math.random() * 3)].value,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }))

  // 模拟筛选
  if (name) {
    data = data.filter((item) => item.name.includes(name))
  }
  if (department) {
    data = data.filter((item) => item.department === department)
  }

  // 模拟分页
  const start = (current - 1) * pageSize
  const end = start + pageSize

  return {
    data: data.slice(start, end),
    total: data.length,
  }
}

export default () => {
  return (
    <ProTable
      title="用户管理"
      onQuery={async (params) => {
        await delay(500) // 模拟网络请求
        const result = generateMockData(params)
        message.success(`查询成功，共 ${result.total} 条数据`)

        return {
          success: true,
          data: result.data,
          total: result.total,
        }
      }}
      columns={[
        {
          label: 'ID',
          name: 'id',
          width: 80,
        },
        {
          label: '姓名',
          name: 'name',
          queryField: {
            type: 'text',
            placeholder: '请输入姓名',
          },
        },
        {
          label: '年龄',
          name: 'age',
          width: 80,
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
          queryField: {
            type: 'select',
            placeholder: '请选择部门',
          },
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
        },
      ]}
    />
  )
}
```

## 单独配置查询表单

使用 `queryFields` 单独配置查询表单，不依赖列配置。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { delay, sample } from '@fexd/tools'

const statusOptions = [
  { label: '启用', value: 'active' },
  { label: '禁用', value: 'inactive' },
  { label: '待审核', value: 'pending' },
]

const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
  { label: '市场部', value: 'marketing' },
]

export default () => {
  return (
    <ProTable
      title="员工管理系统"
      queryFields={[
        {
          label: '员工姓名',
          name: 'name',
          type: 'text',
          placeholder: '请输入员工姓名',
        },
        {
          label: '员工编号',
          name: 'employeeId',
          type: 'text',
          placeholder: '请输入员工编号',
        },
        {
          label: '所属部门',
          name: 'department',
          type: 'select',
          options: departmentOptions,
          placeholder: '请选择部门',
        },
        {
          label: '账户状态',
          name: 'status',
          type: 'select',
          options: statusOptions,
          placeholder: '请选择状态',
        },
        {
          label: '入职时间',
          name: 'joinDateRange',
          type: 'dateRange',
        },
        {
          label: '年龄范围',
          name: 'ageRange',
          type: 'slider',
          defaultValue: [20, 60],
        },
      ]}
      onQuery={async (params) => {
        await delay(800)

        // 模拟根据查询参数生成数据
        const count = Math.floor(Math.random() * 50) + 10
        const data = Array.from({ length: count }, (_, index) => ({
          id: index + 1,
          name: `员工${index + 1}`,
          employeeId: `E${(index + 1).toString().padStart(4, '0')}`,
          department: sample(departmentOptions)?.value,
          status: sample(statusOptions)?.value,
          joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          age: Math.floor(Math.random() * 30) + 25,
        }))

        return {
          success: true,
          data,
          total: data.length,
        }
      }}
      columns={[
        {
          label: '员工编号',
          name: 'employeeId',
          width: 120,
        },
        {
          label: '姓名',
          name: 'name',
          width: 100,
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: departmentOptions,
          width: 120,
        },
        {
          label: '状态',
          name: 'status',
          type: 'select',
          options: statusOptions,
          width: 100,
        },
        {
          label: '年龄',
          name: 'age',
          width: 80,
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
          width: 120,
        },
      ]}
    />
  )
}
```

## 查询表单布局和样式

展示不同的查询表单布局配置。

```tsx
import React, { useState } from 'react'
import { ProTable } from '@fexd/pro-components'
import { Radio, Switch } from 'antd'
import { delay } from '@fexd/tools'

const mockData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `产品${index + 1}`,
  category: ['电子产品', '服装', '食品'][Math.floor(Math.random() * 3)],
  price: Math.floor(Math.random() * 1000) + 100,
  status: Math.random() > 0.5 ? 'active' : 'inactive',
}))

export default () => {
  const [layout, setLayout] = useState('vertical')
  const [columns, setColumns] = useState(3)
  const [hideQueryFields, setHideQueryFields] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 16, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
        <div style={{ marginBottom: 12 }}>
          <strong>布局方式：</strong>
          <Radio.Group value={layout} onChange={(e) => setLayout(e.target.value)} style={{ marginLeft: 12 }}>
            <Radio.Button value="vertical">垂直</Radio.Button>
            <Radio.Button value="horizontal">水平</Radio.Button>
            <Radio.Button value="inline">内联</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: 12 }}>
          <strong>列数配置：</strong>
          <Radio.Group value={columns} onChange={(e) => setColumns(e.target.value)} style={{ marginLeft: 12 }}>
            <Radio.Button value={2}>2列</Radio.Button>
            <Radio.Button value={3}>3列</Radio.Button>
            <Radio.Button value={4}>4列</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <strong>隐藏查询：</strong>
          <Switch checked={hideQueryFields} onChange={setHideQueryFields} style={{ marginLeft: 12 }} />
        </div>
      </div>

      <ProTable
        title="产品管理"
        hideQueryFields={hideQueryFields}
        queryFieldLayout={layout}
        queryFieldColumns={columns}
        queryFieldGutter={16}
        queryFields={[
          {
            label: '产品名称',
            name: 'name',
            type: 'text',
            placeholder: '请输入产品名称',
          },
          {
            label: '产品分类',
            name: 'category',
            type: 'select',
            options: [
              { label: '电子产品', value: '电子产品' },
              { label: '服装', value: '服装' },
              { label: '食品', value: '食品' },
            ],
            placeholder: '请选择分类',
          },
          {
            label: '价格范围',
            name: 'priceRange',
            type: 'slider',
            defaultValue: [100, 1000],
          },
          {
            label: '产品状态',
            name: 'status',
            type: 'radio',
            options: [
              { label: '启用', value: 'active' },
              { label: '禁用', value: 'inactive' },
            ],
          },
          {
            label: '上架时间',
            name: 'dateRange',
            type: 'dateRange',
          },
          {
            label: '是否推荐',
            name: 'recommended',
            type: 'switch',
          },
        ]}
        onQuery={async (params) => {
          await delay(500)
          console.log('查询参数:', params)

          return {
            success: true,
            data: mockData,
            total: mockData.length,
          }
        }}
        columns={[
          {
            label: 'ID',
            name: 'id',
            width: 60,
          },
          {
            label: '产品名称',
            name: 'name',
          },
          {
            label: '分类',
            name: 'category',
            width: 100,
          },
          {
            label: '价格',
            name: 'price',
            type: 'money',
            width: 100,
          },
          {
            label: '状态',
            name: 'status',
            type: 'select',
            options: [
              { label: '启用', value: 'active' },
              { label: '禁用', value: 'inactive' },
            ],
            width: 80,
          },
        ]}
      />
    </div>
  )
}
```

## 参数持久化

展示查询参数的持久化功能。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { message } from 'antd'
import { delay } from '@fexd/tools'

export default () => {
  return (
    <ProTable
      title="带参数持久化的查询"
      queryFieldPersistKey="product-search"
      queryFieldPersistType="localStorage"
      queryFieldFilterEmptyParam={true}
      queryFieldRefreshAfterReset={true}
      queryFields={[
        {
          label: '关键词',
          name: 'keyword',
          type: 'text',
          placeholder: '请输入关键词搜索',
        },
        {
          label: '分类',
          name: 'category',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '数码产品', value: 'digital' },
            { label: '家居用品', value: 'home' },
            { label: '服装配饰', value: 'fashion' },
          ],
        },
        {
          label: '价格区间',
          name: 'priceRange',
          type: 'select',
          options: [
            { label: '全部', value: '' },
            { label: '0-100', value: '0-100' },
            { label: '100-500', value: '100-500' },
            { label: '500-1000', value: '500-1000' },
            { label: '1000以上', value: '1000+' },
          ],
        },
        {
          label: '上架日期',
          name: 'dateRange',
          type: 'dateRange',
        },
      ]}
      onQuery={async (params) => {
        await delay(600)

        message.info(`查询参数已保存到本地存储: ${JSON.stringify(params)}`)

        const mockData = Array.from({ length: 15 }, (_, index) => ({
          id: index + 1,
          name: `商品${index + 1}`,
          category: ['数码产品', '家居用品', '服装配饰'][Math.floor(Math.random() * 3)],
          price: Math.floor(Math.random() * 2000) + 50,
          publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        }))

        return {
          success: true,
          data: mockData,
          total: mockData.length,
        }
      }}
      columns={[
        {
          label: '商品ID',
          name: 'id',
          width: 80,
        },
        {
          label: '商品名称',
          name: 'name',
        },
        {
          label: '分类',
          name: 'category',
          width: 120,
        },
        {
          label: '价格',
          name: 'price',
          type: 'money',
          width: 100,
        },
        {
          label: '上架日期',
          name: 'publishDate',
          type: 'date',
          width: 120,
        },
      ]}
    />
  )
}
```

## 高级查询配置

展示复杂的查询表单配置。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { delay } from '@fexd/tools'

export default () => {
  return (
    <ProTable
      title="高级查询示例"
      queryFieldDefaultLines={2}
      queryFieldTriggerOnEnter={true}
      queryFieldOrder={['name', 'status', 'department', 'dateRange', 'salary', 'skills']}
      queryFields={[
        {
          label: '员工姓名',
          name: 'name',
          type: 'text',
          placeholder: '支持模糊搜索',
          span: 6,
        },
        {
          label: '在职状态',
          name: 'status',
          type: 'select',
          options: [
            { label: '在职', value: 'active' },
            { label: '离职', value: 'inactive' },
            { label: '试用期', value: 'probation' },
          ],
          defaultValue: 'active',
          span: 6,
        },
        {
          label: '所属部门',
          name: 'department',
          type: 'cascader',
          options: [
            {
              label: '技术部',
              value: 'tech',
              children: [
                { label: '前端组', value: 'frontend' },
                { label: '后端组', value: 'backend' },
                { label: '测试组', value: 'qa' },
              ],
            },
            {
              label: '产品部',
              value: 'product',
              children: [
                { label: '产品策划', value: 'planning' },
                { label: '产品设计', value: 'design' },
              ],
            },
          ],
          span: 6,
        },
        {
          label: '入职时间',
          name: 'dateRange',
          type: 'dateRange',
          span: 6,
        },
        {
          label: '薪资范围',
          name: 'salary',
          type: 'slider',
          defaultValue: [8000, 30000],
          span: 12,
        },
        {
          label: '技能标签',
          name: 'skills',
          type: 'multipleSelect',
          options: [
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Node.js', value: 'nodejs' },
            { label: 'Python', value: 'python' },
            { label: 'Java', value: 'java' },
            { label: 'UI设计', value: 'ui' },
            { label: '产品分析', value: 'analysis' },
          ],
          placeholder: '可多选技能标签',
          span: 12,
        },
      ]}
      onQuery={async (params) => {
        await delay(1000)

        console.log('高级查询参数:', params)

        const mockData = Array.from({ length: 12 }, (_, index) => ({
          id: index + 1,
          name: `员工${index + 1}`,
          status: ['active', 'inactive', 'probation'][Math.floor(Math.random() * 3)],
          department: ['前端组', '后端组', '产品策划'][Math.floor(Math.random() * 3)],
          joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          salary: Math.floor(Math.random() * 20000) + 10000,
          skills: ['React', 'Vue', 'Node.js'].slice(0, Math.floor(Math.random() * 3) + 1),
        }))

        return {
          success: true,
          data: mockData,
          total: mockData.length,
        }
      }}
      columns={[
        {
          label: '姓名',
          name: 'name',
          width: 100,
        },
        {
          label: '状态',
          name: 'status',
          type: 'select',
          options: [
            { label: '在职', value: 'active' },
            { label: '离职', value: 'inactive' },
            { label: '试用期', value: 'probation' },
          ],
          width: 100,
        },
        {
          label: '部门',
          name: 'department',
          width: 120,
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
          width: 120,
        },
        {
          label: '薪资',
          name: 'salary',
          type: 'money',
          width: 120,
        },
        {
          label: '技能',
          name: 'skills',
          type: 'text',
          render: (value) => (Array.isArray(value) ? value.join(', ') : value),
        },
      ]}
    />
  )
}
```
