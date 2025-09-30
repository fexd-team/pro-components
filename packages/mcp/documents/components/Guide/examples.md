# 开发指南示例

## 表单最佳实践

### 良好的占位文案

```jsx
import React from 'react'
import { ProForm } from '@fexd/pro-components'

export default () => {
  return (
    <div>
      <h4>✅ 推荐的占位文案</h4>
      <ProForm
        gridColumns={2}
        fields={[
          {
            label: '手机号',
            name: 'phone',
            type: 'text',
            placeholder: '请输入11位手机号码',
            rules: [
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' },
            ],
          },
          {
            label: '邮箱地址',
            name: 'email',
            type: 'text',
            placeholder: '请输入邮箱地址，如：user@example.com',
            rules: [
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ],
          },
          {
            label: '公司名称',
            name: 'company',
            type: 'text',
            placeholder: '请输入完整的公司名称',
          },
          {
            label: '联系地址',
            name: 'address',
            type: 'textarea',
            placeholder: '请输入详细的联系地址，包括省市区街道门牌号',
            colSpan: 2,
          },
        ]}
        onFinish={(values) => {
          console.log('表单提交:', values)
        }}
      />
    </div>
  )
}
```

### 表单验证最佳实践

```jsx
import React from 'react'
import { ProForm } from '@fexd/pro-components'
import { message } from 'antd'

export default () => {
  return (
    <div>
      <h4>✅ 完善的表单验证</h4>
      <ProForm
        gridColumns={1}
        fields={[
          {
            label: '用户名',
            name: 'username',
            type: 'text',
            placeholder: '请输入用户名，3-20个字符，支持中英文和数字',
            rules: [
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              { max: 20, message: '用户名最多20个字符' },
              { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message: '用户名只能包含中英文和数字' },
            ],
          },
          {
            label: '密码',
            name: 'password',
            type: 'password',
            placeholder: '请输入密码，至少8位，包含字母和数字',
            rules: [
              { required: true, message: '请输入密码' },
              { min: 8, message: '密码至少8位' },
              { pattern: /^(?=.*[a-zA-Z])(?=.*\d)/, message: '密码必须包含字母和数字' },
            ],
          },
          {
            label: '确认密码',
            name: 'confirmPassword',
            type: 'password',
            placeholder: '请再次输入密码确认',
            dependencies: ['password'],
            rules: [
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('两次输入的密码不一致')
                },
              }),
            ],
          },
        ]}
        onFinish={async (values) => {
          try {
            // 模拟API调用
            await new Promise((resolve) => setTimeout(resolve, 1000))
            message.success('注册成功！')
            console.log('注册成功:', values)
          } catch (error) {
            message.error('注册失败，请重试')
          }
        }}
      />
    </div>
  )
}
```

## 表格最佳实践

### 完善的状态指示

```jsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const statusOptions = [
  { label: '正常', value: 'normal', color: 'green' },
  { label: '警告', value: 'warning', color: 'orange' },
  { label: '错误', value: 'error', color: 'red' },
  { label: '禁用', value: 'disabled', color: 'gray' },
]

const mockData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: Random.name(),
  status: sample(statusOptions)?.value,
  email: Random.email(),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
}))

export default () => {
  return (
    <div>
      <h4>✅ 清晰的状态指示</h4>
      <ProTable
        size="small"
        columns={[
          {
            title: '用户名',
            dataIndex: 'name',
            width: 120,
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            width: 200,
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            valueType: 'select',
            valueEnum: statusOptions,
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 180,
            valueType: 'dateTime',
          },
        ]}
        actions={['add']}
        iconActions={['refresh']}
        columnActions={['view', 'edit', 'delete']}
        onQuery={async () => {
          await delay(500)
          return {
            data: mockData,
            total: mockData.length,
          }
        }}
        onAdd={async () => {
          await delay(500)
        }}
        onEdit={async () => {
          await delay(500)
        }}
        onDelete={async () => {
          await delay(500)
        }}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  )
}
```

### 友好的错误处理

```jsx
import React, { useState } from 'react'
import { ProTable } from '@fexd/pro-components'
import { message, Button, Alert } from 'antd'
import { delay } from '@fexd/tools'

export default () => {
  const [simulateError, setSimulateError] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Alert message="错误处理演示" description="点击下方按钮模拟网络错误，观察错误提示效果" type="info" showIcon />
        <Button style={{ marginTop: 8 }} onClick={() => setSimulateError(!simulateError)}>
          {simulateError ? '恢复正常' : '模拟网络错误'}
        </Button>
      </div>

      <h4>✅ 完善的错误处理</h4>
      <ProTable
        size="small"
        columns={[
          {
            title: '商品名称',
            dataIndex: 'name',
            width: 150,
          },
          {
            title: '价格',
            dataIndex: 'price',
            width: 100,
            valueType: 'money',
          },
          {
            title: '库存',
            dataIndex: 'stock',
            width: 80,
          },
        ]}
        actions={['add']}
        iconActions={['refresh']}
        columnActions={['edit', 'delete']}
        onQuery={async () => {
          await delay(1000)

          if (simulateError) {
            // 模拟网络错误
            message.error('网络连接失败，请检查网络设置后重试')
            throw new Error('Network Error')
          }

          return {
            data: [
              { id: 1, name: '商品A', price: 99.99, stock: 100 },
              { id: 2, name: '商品B', price: 199.99, stock: 50 },
              { id: 3, name: '商品C', price: 299.99, stock: 0 },
            ],
            total: 3,
          }
        }}
        onAdd={async () => {
          await delay(500)
          if (simulateError) {
            message.error('添加失败，服务器暂时无法响应，请稍后重试')
            throw new Error('Server Error')
          }
          message.success('添加成功')
        }}
        onEdit={async () => {
          await delay(500)
          if (simulateError) {
            message.error('保存失败，请检查网络连接')
            throw new Error('Save Error')
          }
          message.success('保存成功')
        }}
        onDelete={async () => {
          await delay(500)
          if (simulateError) {
            message.error('删除失败，请稍后重试')
            throw new Error('Delete Error')
          }
          message.success('删除成功')
        }}
      />
    </div>
  )
}
```

## 操作确认最佳实践

### 危险操作确认

```jsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { message } from 'antd'
import { Random } from 'mockjs'
import { delay } from '@fexd/tools'

const mockData = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `项目${index + 1}`,
  description: Random.sentence(5),
  status: index % 2 === 0 ? 'active' : 'inactive',
}))

export default () => {
  return (
    <div>
      <h4>✅ 危险操作需要确认</h4>
      <ProTable
        size="small"
        dataSource={mockData}
        columns={[
          {
            title: '项目名称',
            dataIndex: 'name',
            width: 120,
          },
          {
            title: '描述',
            dataIndex: 'description',
            ellipsis: true,
          },
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
        ]}
        actions={['add']}
        selectable
        batchActions={[
          {
            builtIn: 'delete',
            confirm: (count) => `确定要删除选中的 ${count} 个项目吗？\n\n删除后所有相关数据将无法恢复，请谨慎操作。`,
          },
        ]}
        columnActions={[
          'view',
          'edit',
          {
            builtIn: 'delete',
            confirm: '确定要删除这个项目吗？\n\n删除后所有相关数据将无法恢复，此操作不可撤销。',
          },
          {
            text: '重置',
            danger: true,
            confirm: '确定要重置项目配置吗？\n\n重置后所有自定义配置将丢失，需要重新设置。',
            onClick: async (record) => {
              await delay(500)
              message.success(`项目 "${record.name}" 已重置`)
            },
          },
        ]}
        onAdd={async () => {
          await delay(500)
          message.success('项目创建成功')
        }}
        onEdit={async (record) => {
          await delay(500)
          message.success(`项目 "${record.name}" 编辑成功`)
        }}
        onDelete={async (record) => {
          await delay(1000)
          message.success(`项目 "${record.name}" 已删除`)
        }}
      />
    </div>
  )
}
```

## 响应式设计示例

### 移动端友好的表格

```jsx
import React from 'react'
import { ProTable, ConfigProvider } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const categoryOptions = [
  { label: '电子产品', value: 'electronics' },
  { label: '服装鞋帽', value: 'clothing' },
  { label: '家居用品', value: 'home' },
  { label: '运动户外', value: 'sports' },
]

const mockData = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: Random.title(2, 4),
  category: sample(categoryOptions)?.value,
  price: Random.float(10, 1000, 2, 2),
  sales: Random.integer(0, 999),
  description: Random.sentence(8, 15),
}))

export default () => {
  return (
    <div>
      <h4>✅ 移动端友好的表格布局</h4>
      <ConfigProvider size="small">
        <ProTable
          scroll={{ x: 600 }} // 支持横向滚动
          columns={[
            {
              title: '商品',
              dataIndex: 'name',
              width: 150,
              fixed: 'left', // 重要列固定
            },
            {
              title: '分类',
              dataIndex: 'category',
              width: 100,
              valueType: 'select',
              valueEnum: categoryOptions,
            },
            {
              title: '价格',
              dataIndex: 'price',
              width: 100,
              valueType: 'money',
            },
            {
              title: '销量',
              dataIndex: 'sales',
              width: 80,
            },
            {
              title: '描述',
              dataIndex: 'description',
              width: 200,
              ellipsis: true,
              hideInTable: true, // 在小屏幕下隐藏次要信息
            },
          ]}
          actions={['add']}
          iconActions={[
            'refresh',
            'table-size',
            {
              icon: 'FullscreenOutlined',
              tooltip: '全屏显示',
              onClick: () => {
                // 全屏逻辑
              },
            },
          ]}
          columnActions={[
            'view',
            {
              text: '操作',
              menu: [
                // 使用菜单形式减少按钮数量
                { text: '编辑', action: 'edit' },
                { text: '复制', onClick: (record) => console.log('复制', record) },
                { text: '删除', action: 'delete', danger: true },
              ],
            },
          ]}
          onQuery={async () => {
            await delay(500)
            return {
              data: mockData,
              total: mockData.length,
            }
          }}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / 共 ${total} 条`,
            simple: false, // 在移动端可考虑使用 simple: true
          }}
        />
      </ConfigProvider>
    </div>
  )
}
```

## 性能优化示例

### 大数据量处理

```jsx
import React, { useState } from 'react'
import { ProTable } from '@fexd/pro-components'
import { Button, Space, InputNumber } from 'antd'
import { Random } from 'mockjs'
import { delay } from '@fexd/tools'

// 模拟大量数据
const generateMockData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: Random.name(),
    department: Random.pick(['技术部', '市场部', '财务部', '人事部']),
    position: Random.pick(['经理', '主管', '专员', '助理']),
    salary: Random.integer(5000, 50000),
    hireDate: Random.date('yyyy-MM-dd'),
    email: Random.email(),
  }))
}

export default () => {
  const [totalCount, setTotalCount] = useState(1000)
  const [allData] = useState(() => generateMockData(10000)) // 预生成大量数据

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <span>模拟数据总量：</span>
          <InputNumber min={100} max={10000} step={100} value={totalCount} onChange={setTotalCount} />
          <span>条记录</span>
        </Space>
      </div>

      <h4>✅ 大数据量分页处理</h4>
      <ProTable
        columns={[
          {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
          },
          {
            title: '部门',
            dataIndex: 'department',
            width: 100,
            valueType: 'select',
            valueEnum: [
              { label: '技术部', value: '技术部' },
              { label: '市场部', value: '市场部' },
              { label: '财务部', value: '财务部' },
              { label: '人事部', value: '人事部' },
            ],
          },
          {
            title: '职位',
            dataIndex: 'position',
            width: 100,
          },
          {
            title: '薪资',
            dataIndex: 'salary',
            width: 120,
            valueType: 'money',
          },
          {
            title: '入职日期',
            dataIndex: 'hireDate',
            width: 120,
            valueType: 'date',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            width: 200,
            ellipsis: true,
          },
        ]}
        onQuery={async ({ current = 1, pageSize = 20, ...filters }) => {
          // 模拟网络延迟
          await delay(300)

          // 模拟服务端分页和筛选
          let filteredData = allData.slice(0, totalCount)

          // 简单的筛选逻辑
          if (filters.department) {
            filteredData = filteredData.filter((item) => item.department === filters.department)
          }
          if (filters.name) {
            filteredData = filteredData.filter((item) => item.name.toLowerCase().includes(filters.name.toLowerCase()))
          }

          // 分页
          const start = (current - 1) * pageSize
          const end = start + pageSize
          const pageData = filteredData.slice(start, end)

          return {
            data: pageData,
            total: filteredData.length,
            // 返回额外的统计信息
            summary: {
              totalSalary: pageData.reduce((sum, item) => sum + item.salary, 0),
              avgSalary: pageData.reduce((sum, item) => sum + item.salary, 0) / pageData.length,
            },
          }
        }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
          pageSizeOptions: ['10', '20', '50', '100'],
          defaultPageSize: 20,
        }}
        queryField={{
          columns: 3,
          fields: [
            {
              label: '姓名',
              name: 'name',
              type: 'text',
              placeholder: '请输入姓名关键词',
            },
            {
              label: '部门',
              name: 'department',
              type: 'select',
              options: [
                { label: '技术部', value: '技术部' },
                { label: '市场部', value: '市场部' },
                { label: '财务部', value: '财务部' },
                { label: '人事部', value: '人事部' },
              ],
            },
          ],
        }}
      />
    </div>
  )
}
```
