# ProTable 组件示例

## 基础用法

最基本的表格配置，展示数据列表功能。

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

## 内置查询功能

展示查询表单与表格数据联动的功能。

```tsx
import React from 'react'
import { message } from 'antd'
import { ProTable } from '@fexd/pro-components'
import { delay, sample } from '@fexd/tools'

const mockOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
]

const generateMockData = (count = 20) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户${index + 1}`,
    age: Math.floor(Math.random() * 30) + 20,
    department: sample(mockOptions)?.value,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }))
}

export default () => {
  return (
    <ProTable
      title="用户管理"
      queryFields={[
        {
          label: '姓名',
          name: 'name',
          type: 'text',
          placeholder: '请输入姓名',
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
          placeholder: '请选择部门',
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'dateRange',
        },
      ]}
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
          type: 'digit',
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
        },
      ]}
      onQuery={async (params) => {
        console.log('查询参数:', params)
        await delay(500) // 模拟接口延迟

        let data = generateMockData()

        // 根据查询参数过滤数据
        if (params.name) {
          data = data.filter((item) => item.name.includes(params.name))
        }
        if (params.department) {
          data = data.filter((item) => item.department === params.department)
        }

        return {
          success: true,
          data,
          total: data.length,
        }
      }}
    />
  )
}
```

## 内置动作功能

展示表格的各种内置动作：新增、编辑、删除、查看详情等。

```tsx
import React from 'react'
import { message } from 'antd'
import { ProTable } from '@fexd/pro-components'
import { delay, sample } from '@fexd/tools'

const mockOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
]

export default () => {
  return (
    <ProTable
      title="用户管理（完整功能）"
      bordered
      selectable
      actions={['add']} // 新增按钮
      iconActions={['refresh', 'table-size', 'fullscreen']} // 图标按钮
      columnActions={['view', 'edit', 'delete']} // 行操作按钮
      batchActions={['delete']} // 批量操作
      fixColumnActions // 固定操作栏
      // 查询表单配置
      queryFields={[
        { label: '姓名', name: 'name', type: 'text' },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
        },
      ]}
      // 新增表单配置
      addFields={[
        { label: '姓名', name: 'name', type: 'text', required: true },
        { label: '年龄', name: 'age', type: 'digit', required: true },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
          required: true,
        },
        { label: '入职日期', name: 'joinDate', type: 'date', required: true },
      ]}
      // 编辑表单配置
      editFields={[
        { label: '姓名', name: 'name', type: 'text', required: true },
        { label: '年龄', name: 'age', type: 'digit', required: true },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
          required: true,
        },
        { label: '入职日期', name: 'joinDate', type: 'date', required: true },
      ]}
      // 详情查看配置
      viewFields={[
        { label: '姓名', name: 'name' },
        { label: '年龄', name: 'age' },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
        },
        { label: '入职日期', name: 'joinDate', type: 'date' },
      ]}
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
          type: 'digit',
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: mockOptions,
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
        },
      ]}
      onQuery={async (params) => {
        await delay(500)

        const data = Array.from({ length: 10 }, (_, index) => ({
          id: index + 1,
          name: `用户${index + 1}`,
          age: Math.floor(Math.random() * 30) + 20,
          department: sample(mockOptions)?.value,
          joinDate: new Date().toISOString().split('T')[0],
        }))

        return { success: true, data, total: data.length }
      }}
      onAdd={async (params) => {
        await delay(500)
        message.success(`新增成功: ${JSON.stringify(params)}`)
        return { success: true, message: '新增成功' }
      }}
      onEdit={async (params, item) => {
        await delay(500)
        message.success(`编辑成功: ${JSON.stringify(params)}`)
        return { success: true, message: '编辑成功' }
      }}
      onView={async (item) => {
        await delay(500)
        return { success: true, data: item }
      }}
      onDelete={async (target) => {
        await delay(500)
        const ids = Array.isArray(target) ? target.map((t) => t.id) : [target.id]
        message.success(`删除成功，ID: ${ids.join(', ')}`)
        return { success: true, message: '删除成功' }
      }}
    />
  )
}
```

## 字段类型展示

展示 ProTable 支持的各种字段类型。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'

const mockData = [
  {
    id: 1,
    text: '文本内容',
    money: 12345.67,
    percent: 0.85,
    date: '2023-12-01',
    dateTime: '2023-12-01 14:30:00',
    select: 'option1',
    switch: true,
    rate: 4,
    status: 'success',
  },
  {
    id: 2,
    text: '另一条数据',
    money: 98765.43,
    percent: 0.92,
    date: '2023-12-02',
    dateTime: '2023-12-02 16:45:00',
    select: 'option2',
    switch: false,
    rate: 5,
    status: 'error',
  },
]

const statusOptions = [
  { label: '成功', value: 'success', tag: 'green' },
  { label: '失败', value: 'error', tag: 'red' },
  { label: '处理中', value: 'processing', tag: 'blue' },
]

const selectOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
]

export default () => {
  return (
    <ProTable
      title="字段类型展示"
      dataSource={mockData}
      columns={[
        {
          label: 'ID',
          name: 'id',
          width: 80,
        },
        {
          label: '文本',
          name: 'text',
          type: 'text',
          copyable: true,
        },
        {
          label: '金额',
          name: 'money',
          type: 'money',
          width: 120,
        },
        {
          label: '百分比',
          name: 'percent',
          type: 'percent',
          width: 100,
        },
        {
          label: '日期',
          name: 'date',
          type: 'date',
          width: 120,
        },
        {
          label: '日期时间',
          name: 'dateTime',
          type: 'dateTime',
          width: 160,
        },
        {
          label: '选择器',
          name: 'select',
          type: 'select',
          options: selectOptions,
          width: 100,
        },
        {
          label: '开关',
          name: 'switch',
          type: 'switch',
          width: 80,
        },
        {
          label: '评分',
          name: 'rate',
          type: 'rate',
          width: 120,
        },
        {
          label: '状态',
          name: 'status',
          type: 'select',
          options: statusOptions,
          width: 100,
        },
      ]}
      pagination={false}
    />
  )
}
```

## 从 columns 继承配置

展示如何从表格列配置中继承查询和编辑表单的配置。

```tsx
import React from 'react'
import { message } from 'antd'
import { ProTable } from '@fexd/pro-components'
import { delay, sample } from '@fexd/tools'

const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
]

export default () => {
  return (
    <ProTable
      title="从 columns 继承配置"
      actions={['add']}
      columnActions={['edit', 'delete']}
      columns={[
        {
          label: '姓名',
          name: 'name',
          queryField: true, // 继承到查询表单
          editField: { required: true }, // 继承到编辑表单，并设置必填
        },
        {
          label: '年龄',
          name: 'age',
          type: 'digit',
          editField: { required: true },
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: departmentOptions,
          queryField: true, // 继承查询配置
          editField: true, // 继承编辑配置
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
          editField: true,
        },
        {
          label: '备注',
          name: 'remark',
          type: 'textarea',
          editField: true,
          queryField: false, // 不在查询中显示
          hidden: true, // 在表格中隐藏，仅用于表单
        },
      ]}
      onQuery={async (params) => {
        await delay(500)

        const data = Array.from({ length: 5 }, (_, index) => ({
          id: index + 1,
          name: `员工${index + 1}`,
          age: Math.floor(Math.random() * 20) + 25,
          department: sample(departmentOptions)?.value,
          joinDate: new Date().toISOString().split('T')[0],
          remark: `备注信息${index + 1}`,
        }))

        return { success: true, data, total: data.length }
      }}
      onAdd={async (params) => {
        await delay(500)
        message.success('新增成功')
        return { success: true }
      }}
      onEdit={async (params, item) => {
        await delay(500)
        message.success('编辑成功')
        return { success: true }
      }}
      onDelete={async (target) => {
        await delay(500)
        message.success('删除成功')
        return { success: true }
      }}
    />
  )
}
```

## 自定义动作配置

展示如何自定义和修改内置动作。

```tsx
import React from 'react'
import { message } from 'antd'
import { ProTable } from '@fexd/pro-components'
import { PlusOutlined, ExportOutlined } from '@ant-design/icons'

export default () => {
  return (
    <ProTable
      title="自定义动作"
      // 自定义表格动作
      actions={[
        {
          builtIn: 'add',
          icon: <PlusOutlined />,
          content: '创建新用户',
          type: 'primary',
        },
        {
          content: '导出数据',
          icon: <ExportOutlined />,
          onClick: () => {
            message.info('导出功能')
          },
        },
      ]}
      // 自定义图标动作
      iconActions={[
        'refresh',
        {
          builtIn: 'fullscreen',
          tooltip: '全屏显示表格',
        },
        {
          content: '自定义',
          onClick: () => message.info('自定义动作'),
          tooltip: '这是一个自定义动作',
        },
      ]}
      // 自定义行动作
      columnActions={[
        'view',
        {
          builtIn: 'edit',
          content: '修改',
        },
        {
          content: '复制',
          onClick: (item) => {
            message.success(`复制用户: ${item.name}`)
          },
        },
        {
          builtIn: 'delete',
          confirm: '确定要删除这个用户吗？',
        },
      ]}
      dataSource={[
        { id: 1, name: '张三', age: 25 },
        { id: 2, name: '李四', age: 30 },
      ]}
      columns={[
        { label: '姓名', name: 'name', editField: true },
        {
          label: '年龄',
          name: 'age',
          type: 'digit',
          editField: true,
        },
      ]}
      onAdd={async (params) => {
        message.success('新增成功')
        return { success: true }
      }}
      onEdit={async (params, item) => {
        message.success('编辑成功')
        return { success: true }
      }}
      onView={async (item) => {
        return { success: true, data: item }
      }}
      onDelete={async (target) => {
        message.success('删除成功')
        return { success: true }
      }}
    />
  )
}
```

## 表格内编辑

展示表格内直接编辑的功能。

```tsx
import React from 'react'
import { message } from 'antd'
import { ProTable } from '@fexd/pro-components'

const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
]

export default () => {
  return (
    <ProTable
      title="表格内编辑"
      columnActions={['table-edit']} // 启用表格内编辑
      dataSource={[
        { id: 1, name: '张三', age: 25, department: 'tech', active: true },
        { id: 2, name: '李四', age: 30, department: 'product', active: false },
        { id: 3, name: '王五', age: 28, department: 'operation', active: true },
      ]}
      columns={[
        {
          label: 'ID',
          name: 'id',
          width: 80,
        },
        {
          label: '姓名',
          name: 'name',
          editField: true, // 支持编辑
        },
        {
          label: '年龄',
          name: 'age',
          type: 'digit',
          editField: true,
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: departmentOptions,
          editField: true,
        },
        {
          label: '状态',
          name: 'active',
          type: 'switch',
          editField: true,
        },
      ]}
      onEdit={async (params, item) => {
        console.log('编辑参数:', params)
        console.log('编辑项:', item)
        message.success('保存成功')
        return { success: true, message: '更新成功' }
      }}
      pagination={false}
    />
  )
}
```
