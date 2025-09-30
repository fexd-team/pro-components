# ProTable 增删改功能示例

## 完整CRUD示例

展示增删改查的完整功能。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { message } from 'antd'
import { delay } from '@fexd/tools'

let mockData = [
  { id: 1, name: '张三', age: 25, email: 'zhang@example.com', department: 'tech' },
  { id: 2, name: '李四', age: 30, email: 'li@example.com', department: 'product' },
  { id: 3, name: '王五', age: 28, email: 'wang@example.com', department: 'operation' },
]

const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operation' },
]

export default () => {
  return (
    <ProTable
      title="用户管理"
      dataSource={mockData}
      actions={[{ builtIn: 'add' }]}
      columnActions={[
        { builtIn: 'view' },
        { builtIn: 'edit' },
        { builtIn: 'delete', confirm: '确定要删除这个用户吗？' },
      ]}
      selectable={true}
      batchActions={[{ builtIn: 'delete', confirm: '确定要批量删除选中的用户吗？' }]}
      columns={[
        {
          label: 'ID',
          name: 'id',
          width: 80,
          editField: false,
        },
        {
          label: '姓名',
          name: 'name',
          editField: {
            type: 'text',
            required: true,
            placeholder: '请输入姓名',
          },
        },
        {
          label: '年龄',
          name: 'age',
          width: 80,
          editField: {
            type: 'digit',
            required: true,
            placeholder: '请输入年龄',
          },
        },
        {
          label: '邮箱',
          name: 'email',
          editField: {
            type: 'text',
            required: true,
            placeholder: '请输入邮箱',
          },
        },
        {
          label: '部门',
          name: 'department',
          type: 'select',
          options: departmentOptions,
          editField: {
            type: 'select',
            options: departmentOptions,
            required: true,
            placeholder: '请选择部门',
          },
        },
      ]}
      onAdd={async (values) => {
        await delay(500)
        const newId = Math.max(...mockData.map((item) => item.id)) + 1
        const newUser = { ...values, id: newId }
        mockData.push(newUser)
        message.success('新增用户成功')
        return { success: true }
      }}
      onEdit={async (values, record) => {
        await delay(500)
        const index = mockData.findIndex((item) => item.id === record.id)
        if (index >= 0) {
          mockData[index] = { ...mockData[index], ...values }
        }
        message.success('编辑用户成功')
        return { success: true }
      }}
      onDelete={async (target) => {
        await delay(500)
        if (Array.isArray(target)) {
          // 批量删除
          const ids = target.map((item) => item.id)
          mockData = mockData.filter((item) => !ids.includes(item.id))
          message.success(`批量删除 ${target.length} 个用户成功`)
        } else {
          // 单个删除
          mockData = mockData.filter((item) => item.id !== target.id)
          message.success('删除用户成功')
        }
        return { success: true }
      }}
      onView={async (record) => {
        await delay(300)
        message.info(`查看用户: ${record.name}`)
        return { success: true }
      }}
      pagination={false}
    />
  )
}
```

## 表格内编辑

展示表格内直接编辑的功能。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { message } from 'antd'
import { delay } from '@fexd/tools'

let productData = [
  { id: 1, name: '产品A', price: 299, stock: 100, status: 'active' },
  { id: 2, name: '产品B', price: 199, stock: 50, status: 'inactive' },
  { id: 3, name: '产品C', price: 399, stock: 200, status: 'active' },
]

export default () => {
  return (
    <ProTable
      title="产品管理 - 表格内编辑"
      dataSource={productData}
      actions={[{ builtIn: 'add' }]}
      columnActions={[{ builtIn: 'table-edit' }, { builtIn: 'delete', confirm: '确定要删除这个产品吗？' }]}
      columns={[
        {
          label: '产品ID',
          name: 'id',
          width: 100,
          editField: false,
        },
        {
          label: '产品名称',
          name: 'name',
          editField: {
            type: 'text',
            required: true,
            placeholder: '请输入产品名称',
          },
        },
        {
          label: '价格',
          name: 'price',
          type: 'money',
          width: 120,
          editField: {
            type: 'digit',
            required: true,
            placeholder: '请输入价格',
          },
        },
        {
          label: '库存',
          name: 'stock',
          type: 'digit',
          width: 100,
          editField: {
            type: 'digit',
            required: true,
            placeholder: '请输入库存',
          },
        },
        {
          label: '状态',
          name: 'status',
          type: 'select',
          options: [
            { label: '启用', value: 'active' },
            { label: '禁用', value: 'inactive' },
          ],
          width: 100,
          editField: {
            type: 'select',
            options: [
              { label: '启用', value: 'active' },
              { label: '禁用', value: 'inactive' },
            ],
            required: true,
          },
        },
      ]}
      onAdd={async (values) => {
        await delay(500)
        const newId = Math.max(...productData.map((item) => item.id)) + 1
        const newProduct = { ...values, id: newId }
        productData.push(newProduct)
        message.success('新增产品成功')
        return { success: true }
      }}
      onEdit={async (values, record) => {
        await delay(500)
        const index = productData.findIndex((item) => item.id === record.id)
        if (index >= 0) {
          productData[index] = { ...productData[index], ...values }
        }
        message.success('编辑产品成功')
        return { success: true }
      }}
      onDelete={async (target) => {
        await delay(500)
        productData = productData.filter((item) => item.id !== target.id)
        message.success('删除产品成功')
        return { success: true }
      }}
      pagination={false}
    />
  )
}
```

## 自定义动作

展示如何添加自定义动作按钮。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { message } from 'antd'
import { delay } from '@fexd/tools'

const orderData = [
  { id: 1, orderNo: 'ORD001', customer: '张三', amount: 299, status: 'pending' },
  { id: 2, orderNo: 'ORD002', customer: '李四', amount: 599, status: 'paid' },
  { id: 3, orderNo: 'ORD003', customer: '王五', amount: 199, status: 'shipped' },
]

export default () => {
  return (
    <ProTable
      title="订单管理"
      dataSource={orderData}
      actions={[
        { builtIn: 'add' },
        {
          content: '批量发货',
          onClick: async (selectedRows) => {
            if (!selectedRows?.length) {
              message.warning('请先选择订单')
              return
            }
            await delay(500)
            message.success(`批量发货 ${selectedRows.length} 个订单成功`)
          },
          hidden: false,
        },
      ]}
      iconActions={[
        { builtIn: 'refresh' },
        {
          content: '导出数据',
          onClick: async () => {
            await delay(300)
            message.success('导出数据成功')
          },
        },
      ]}
      columnActions={[
        { builtIn: 'view' },
        {
          builtIn: 'edit',
          hidden: (record) => record.status === 'shipped',
        },
        {
          content: '发货',
          onClick: async (record) => {
            await delay(500)
            const index = orderData.findIndex((item) => item.id === record.id)
            if (index >= 0) {
              orderData[index].status = 'shipped'
            }
            message.success('发货成功')
          },
          hidden: (record) => record.status !== 'paid',
          confirm: '确定要发货吗？',
        },
        {
          content: '取消订单',
          onClick: async (record) => {
            await delay(500)
            message.success('取消订单成功')
          },
          hidden: (record) => record.status === 'shipped',
          confirm: {
            title: '确定要取消这个订单吗？',
            description: '取消后无法恢复',
          },
        },
      ]}
      selectable={true}
      batchActions={[
        {
          content: '批量取消',
          onClick: async (selectedRows) => {
            await delay(500)
            message.success(`批量取消 ${selectedRows.length} 个订单成功`)
          },
          confirm: '确定要批量取消选中的订单吗？',
        },
      ]}
      columns={[
        {
          label: '订单号',
          name: 'orderNo',
          width: 120,
          copyable: true,
        },
        {
          label: '客户',
          name: 'customer',
          width: 100,
        },
        {
          label: '金额',
          name: 'amount',
          type: 'money',
          width: 120,
        },
        {
          label: '状态',
          name: 'status',
          type: 'select',
          options: [
            { label: '待付款', value: 'pending' },
            { label: '已付款', value: 'paid' },
            { label: '已发货', value: 'shipped' },
            { label: '已完成', value: 'completed' },
          ],
          width: 100,
        },
      ]}
      onAdd={async (values) => {
        await delay(500)
        message.success('新增订单成功')
        return { success: true }
      }}
      onEdit={async (values, record) => {
        await delay(500)
        message.success('编辑订单成功')
        return { success: true }
      }}
      onView={async (record) => {
        await delay(300)
        message.info(`查看订单: ${record.orderNo}`)
        return { success: true }
      }}
      pagination={false}
    />
  )
}
```

## 复杂表单编辑

展示复杂的编辑表单配置。

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { message } from 'antd'
import { delay } from '@fexd/tools'

const employeeData = [
  {
    id: 1,
    name: '张三',
    position: 'frontend',
    department: 'tech',
    skills: ['react', 'vue'],
    joinDate: '2023-01-15',
    salary: 15000,
    bio: '前端开发工程师，专注于React开发',
  },
]

export default () => {
  return (
    <ProTable
      title="员工档案管理"
      dataSource={employeeData}
      actions={[{ builtIn: 'add' }]}
      columnActions={[
        { builtIn: 'view' },
        { builtIn: 'edit' },
        { builtIn: 'delete', confirm: '确定要删除员工档案吗？' },
      ]}
      addFields={[
        {
          label: '姓名',
          name: 'name',
          type: 'text',
          required: true,
          placeholder: '请输入员工姓名',
          span: 12,
        },
        {
          label: '职位',
          name: 'position',
          type: 'select',
          options: [
            { label: '前端工程师', value: 'frontend' },
            { label: '后端工程师', value: 'backend' },
            { label: '产品经理', value: 'pm' },
            { label: 'UI设计师', value: 'designer' },
          ],
          required: true,
          span: 12,
        },
        {
          label: '部门',
          name: 'department',
          type: 'cascader',
          options: [
            {
              label: '技术部',
              value: 'tech',
              children: [
                { label: '前端组', value: 'frontend' },
                { label: '后端组', value: 'backend' },
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
          required: true,
          span: 12,
        },
        {
          label: '入职日期',
          name: 'joinDate',
          type: 'date',
          required: true,
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
          ],
          span: 12,
        },
        {
          label: '薪资',
          name: 'salary',
          type: 'digit',
          required: true,
          placeholder: '请输入薪资',
          span: 12,
        },
        {
          label: '个人简介',
          name: 'bio',
          type: 'textarea',
          placeholder: '请输入个人简介',
          span: 24,
        },
      ]}
      columns={[
        {
          label: '姓名',
          name: 'name',
          width: 100,
        },
        {
          label: '职位',
          name: 'position',
          type: 'select',
          options: [
            { label: '前端工程师', value: 'frontend' },
            { label: '后端工程师', value: 'backend' },
            { label: '产品经理', value: 'pm' },
            { label: 'UI设计师', value: 'designer' },
          ],
          width: 120,
        },
        {
          label: '部门',
          name: 'department',
          width: 100,
        },
        {
          label: '技能',
          name: 'skills',
          render: (skills) => (Array.isArray(skills) ? skills.join(', ') : skills),
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
          width: 100,
        },
      ]}
      onAdd={async (values) => {
        await delay(800)
        console.log('新增员工:', values)
        message.success('新增员工档案成功')
        return { success: true }
      }}
      onEdit={async (values, record) => {
        await delay(800)
        console.log('编辑员工:', values, record)
        message.success('更新员工档案成功')
        return { success: true }
      }}
      onDelete={async (target) => {
        await delay(500)
        message.success('删除员工档案成功')
        return { success: true }
      }}
      onView={async (record) => {
        await delay(300)
        message.info(`查看员工档案: ${record.name}`)
        return { success: true }
      }}
      pagination={false}
    />
  )
}
```
