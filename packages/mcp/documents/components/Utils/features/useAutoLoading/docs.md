# useAutoLoading - 自动加载状态管理 Hook

## 功能介绍

useAutoLoading 是一个自动管理异步函数加载状态的 Hook，简化了异步操作的状态管理，自动处理 loading 状态的显示和隐藏。

## 核心特性

- ⚡ **自动状态管理**：异步函数执行时自动显示和隐藏加载状态
- 🔄 **Promise 包装**：包装异步函数，保持原有功能不变
- 🎯 **零侵入**：不改变原始异步函数的调用方式
- 🛡️ **错误处理**：统一处理异步操作中的错误
- 📊 **状态暴露**：提供当前加载状态供组件使用

## API

### useAutoLoading

```typescript
const useAutoLoading = <T extends (...args: any[]) => Promise<any>>(asyncFunction: T) => {
  return {
    loading: boolean,
    run: T,
    runAsync: T,
  }
}
```

### 参数说明

| 参数          | 说明               | 类型                             | 默认值 |
| ------------- | ------------------ | -------------------------------- | ------ |
| asyncFunction | 需要包装的异步函数 | (...args: any[]) => Promise<any> | -      |

### 返回值

| 属性     | 说明                               | 类型    |
| -------- | ---------------------------------- | ------- |
| loading  | 当前加载状态                       | boolean |
| run      | 包装后的异步函数（不返回 Promise） | T       |
| runAsync | 包装后的异步函数（返回 Promise）   | T       |

## 使用场景

### 1. API 调用加载状态

```jsx
import React from 'react'
import { useAutoLoading } from '@fexd/pro-utils'
import { Button, Spin, Card } from 'antd'

const UserProfile = ({ userId }) => {
  const [user, setUser] = React.useState(null)

  const { loading, run: fetchUser } = useAutoLoading(async (id) => {
    const response = await api.getUser(id)
    setUser(response.data)
  })

  return (
    <Card>
      <Button type="primary" onClick={() => fetchUser(userId)} loading={loading}>
        加载用户信息
      </Button>

      <Spin spinning={loading}>
        {user && (
          <div style={{ marginTop: 16 }}>
            <p>姓名: {user.name}</p>
            <p>邮箱: {user.email}</p>
          </div>
        )}
      </Spin>
    </Card>
  )
}
```

### 2. 表单提交状态

```jsx
const LoginForm = () => {
  const [form] = Form.useForm()

  const { loading, runAsync: handleSubmit } = useAutoLoading(async (values) => {
    await api.login(values)
    message.success('登录成功')
    // 跳转到首页
    navigate('/')
  })

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="用户名" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
```

### 3. 数据删除确认

```jsx
const DeleteButton = ({ record, onSuccess }) => {
  const { loading, run: handleDelete } = useAutoLoading(async () => {
    await api.deleteRecord(record.id)
    message.success('删除成功')
    onSuccess?.()
  })

  return (
    <Popconfirm title="确定要删除这条记录吗？" onConfirm={handleDelete} okButtonProps={{ loading }}>
      <Button danger loading={loading}>
        删除
      </Button>
    </Popconfirm>
  )
}
```

### 4. 文件上传状态

```jsx
const FileUploader = () => {
  const [fileList, setFileList] = React.useState([])

  const { loading, runAsync: handleUpload } = useAutoLoading(async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.uploadFile(formData)
    return response.data.url
  })

  const uploadProps = {
    beforeUpload: async (file) => {
      try {
        const url = await handleUpload(file)
        setFileList((prev) => [...prev, { name: file.name, url }])
        message.success('上传成功')
      } catch (error) {
        message.error('上传失败')
      }
      return false // 阻止自动上传
    },
    fileList: [],
  }

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} loading={loading}>
          {loading ? '上传中...' : '选择文件'}
        </Button>
      </Upload>

      <div style={{ marginTop: 16 }}>
        {fileList.map((file, index) => (
          <div key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 实际应用示例

### 数据列表组件

```jsx
import React, { useState, useEffect } from 'react'
import { useAutoLoading } from '@fexd/pro-utils'
import { Table, Button, Space, message } from 'antd'

const DataList = () => {
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  // 查询数据
  const { loading: queryLoading, run: fetchData } = useAutoLoading(async (page = 1, size = 10) => {
    const response = await api.getList({ page, size })
    setDataSource(response.data)
    setPagination((prev) => ({ ...prev, total: response.total }))
  })

  // 删除数据
  const { loading: deleteLoading, run: handleDelete } = useAutoLoading(async (id) => {
    await api.deleteItem(id)
    message.success('删除成功')
    fetchData(pagination.current, pagination.pageSize) // 重新加载数据
  })

  // 批量删除
  const { loading: batchDeleteLoading, run: handleBatchDelete } = useAutoLoading(async (ids) => {
    await api.batchDelete(ids)
    message.success(`成功删除 ${ids.length} 条记录`)
    fetchData(pagination.current, pagination.pageSize)
  })

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small">编辑</Button>
          <Button size="small" danger loading={deleteLoading} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={() => fetchData()}>
            刷新
          </Button>
          <Button danger loading={batchDeleteLoading} onClick={() => handleBatchDelete([1, 2, 3])}>
            批量删除
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={queryLoading}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => {
            setPagination((prev) => ({ ...prev, current: page, pageSize }))
            fetchData(page, pageSize)
          },
        }}
        rowKey="id"
      />
    </div>
  )
}
```

### 多步骤操作

```jsx
const MultiStepOperation = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState({})

  const { loading: step1Loading, runAsync: runStep1 } = useAutoLoading(async () => {
    const result = await api.step1()
    setResults((prev) => ({ ...prev, step1: result }))
    setCurrentStep(1)
  })

  const { loading: step2Loading, runAsync: runStep2 } = useAutoLoading(async () => {
    const result = await api.step2(results.step1)
    setResults((prev) => ({ ...prev, step2: result }))
    setCurrentStep(2)
  })

  const { loading: step3Loading, runAsync: runStep3 } = useAutoLoading(async () => {
    const result = await api.step3(results.step2)
    setResults((prev) => ({ ...prev, step3: result }))
    setCurrentStep(3)
    message.success('所有步骤执行完成')
  })

  const executeAllSteps = async () => {
    try {
      await runStep1()
      await runStep2()
      await runStep3()
    } catch (error) {
      message.error('执行失败，请重试')
    }
  }

  return (
    <div>
      <Steps current={currentStep}>
        <Steps.Step title="步骤1" description="初始化" />
        <Steps.Step title="步骤2" description="数据处理" />
        <Steps.Step title="步骤3" description="完成" />
      </Steps>

      <div style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary" onClick={executeAllSteps} loading={step1Loading || step2Loading || step3Loading}>
            执行所有步骤
          </Button>

          <Button onClick={runStep1} loading={step1Loading} disabled={currentStep > 0}>
            执行步骤1
          </Button>

          <Button onClick={runStep2} loading={step2Loading} disabled={currentStep !== 1}>
            执行步骤2
          </Button>

          <Button onClick={runStep3} loading={step3Loading} disabled={currentStep !== 2}>
            执行步骤3
          </Button>
        </Space>
      </div>
    </div>
  )
}
```

## 最佳实践

### 1. 合理使用 run 和 runAsync

```jsx
// ✅ 需要等待结果时使用 runAsync
const handleSubmit = async () => {
  try {
    const result = await runAsync(formData)
    console.log('提交结果:', result)
    navigate('/success')
  } catch (error) {
    console.error('提交失败:', error)
  }
}

// ✅ 不需要等待结果时使用 run
const handleRefresh = () => {
  run() // 简洁的调用方式
}
```

### 2. 错误处理

```jsx
// ✅ 在异步函数中处理错误
const { loading, runAsync } = useAutoLoading(async (data) => {
  try {
    const result = await api.submit(data)
    message.success('操作成功')
    return result
  } catch (error) {
    message.error('操作失败')
    throw error // 重新抛出以便外部处理
  }
})
```

### 3. 避免状态竞争

```jsx
// ✅ 使用取消令牌避免状态竞争
const { loading, runAsync } = useAutoLoading(async (query, signal) => {
  const result = await api.search(query, { signal })
  if (!signal.aborted) {
    setResults(result)
  }
})

useEffect(() => {
  const controller = new AbortController()
  if (searchQuery) {
    runAsync(searchQuery, controller.signal)
  }
  return () => controller.abort()
}, [searchQuery])
```

## 注意事项

1. **状态隔离**：每个 useAutoLoading 实例都有独立的 loading 状态
2. **错误处理**：建议在异步函数内部处理错误，避免未捕获的 Promise 错误
3. **内存泄漏**：组件卸载时进行中的异步操作会自动被忽略
4. **并发控制**：同一个异步函数的多次调用会共享 loading 状态
5. **性能考虑**：避免在高频更新的场景中使用，如滚动事件处理
