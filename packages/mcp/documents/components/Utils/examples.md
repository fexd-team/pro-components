# Utils 使用示例

## useCoverable 业务组件化

### 基础用法

```jsx
import React from 'react'
import { useCoverable } from '@fexd/pro-utils'
import { ProTable } from '@fexd/pro-components'

// 创建可配置的表格组件
const useCustomTable = useCoverable(
  {
    actions: ['add'],
    iconActions: ['refresh', 'table-size', 'fullscreen'],
    columnActions: ['view', 'edit', 'delete'],
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        editField: true,
        queryField: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        editField: true,
        queryField: true,
      },
    ],
  },
  {
    name: 'CustomTable',
    displayName: '自定义表格',
  },
)

export default () => {
  const { props, Component } = useCustomTable()

  return (
    <Component
      {...props}
      onQuery={async () => {
        // 模拟数据查询
        return {
          data: [
            { id: 1, name: '项目A', status: 1 },
            { id: 2, name: '项目B', status: 0 },
          ],
          total: 2,
        }
      }}
      // 可以通过 coverableProps 覆盖默认配置
      coverableProps={{
        actions: ['add', 'export'],
        columns: [
          ...props.columns,
          {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
          },
        ],
      }}
    />
  )
}
```

## showImages 图片预览

### 单张图片预览

```jsx
import React from 'react'
import { Action, showImages } from '@fexd/pro-utils'

export default () => {
  return (
    <Action
      onClick={async () => {
        const controller = showImages(['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'])

        // 等待用户关闭预览
        await controller.promise
        console.log('图片预览已关闭')
      }}
    >
      预览图片
    </Action>
  )
}
```

### 多张图片轮播

```jsx
import React from 'react'
import { Action, showImages } from '@fexd/pro-utils'

export default () => {
  const images = [
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
  ]

  return (
    <div>
      <Action
        onClick={() => {
          showImages(images, { current: 0 })
        }}
      >
        查看图片集（从第1张开始）
      </Action>

      <Action
        onClick={() => {
          showImages(images, { current: 1 })
        }}
        style={{ marginLeft: 8 }}
      >
        查看图片集（从第2张开始）
      </Action>
    </div>
  )
}
```

## showModal 命令式弹窗

### 基础弹窗

```jsx
import React from 'react'
import { Action, showModal } from '@fexd/pro-utils'
import { Input, Form } from 'antd'

export default () => {
  return (
    <Action
      onClick={async () => {
        const controller = showModal(
          <Form layout="vertical">
            <Form.Item label="用户名" name="username" required>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="邮箱" name="email" required>
              <Input placeholder="请输入邮箱地址" />
            </Form.Item>
          </Form>,
          {
            title: '添加用户',
            width: 400,
            onOk: async () => {
              console.log('确认添加用户')
              // 执行保存逻辑
              await new Promise((resolve) => setTimeout(resolve, 1000))
            },
          },
        )

        try {
          const result = await controller.promise
          console.log('弹窗关闭，结果：', result)
        } catch (error) {
          console.log('用户取消了操作')
        }
      }}
    >
      添加用户
    </Action>
  )
}
```

### 可拖拽弹窗

```jsx
import React from 'react'
import { Action, showModal } from '@fexd/pro-utils'
import { Result } from 'antd'

export default () => {
  return (
    <Action
      onClick={() => {
        showModal(
          <Result status="success" title="操作成功" subTitle="您的操作已成功完成，可以拖拽此弹窗到任意位置。" />,
          {
            title: '可拖拽弹窗',
            width: 500,
            draggable: true,
            maskClosable: true,
          },
        )
      }}
    >
      打开可拖拽弹窗
    </Action>
  )
}
```

## Action 操作按钮

### 基础按钮

```jsx
import React from 'react'
import { Action } from '@fexd/pro-utils'

export default () => {
  return (
    <div>
      <Action
        onClick={() => {
          console.log('默认按钮点击')
        }}
      >
        默认按钮
      </Action>

      <Action
        type="primary"
        onClick={async () => {
          console.log('主要按钮点击，开始异步操作...')
          await new Promise((resolve) => setTimeout(resolve, 2000))
          console.log('异步操作完成')
        }}
        style={{ marginLeft: 8 }}
      >
        主要按钮（异步）
      </Action>

      <Action
        danger
        onClick={() => {
          console.log('危险按钮点击')
        }}
        style={{ marginLeft: 8 }}
      >
        危险按钮
      </Action>
    </div>
  )
}
```

### 确认按钮

```jsx
import React from 'react'
import { Action } from '@fexd/pro-utils'

export default () => {
  return (
    <div>
      <Action
        confirm
        onClick={() => {
          console.log('删除操作执行')
        }}
      >
        删除（默认确认）
      </Action>

      <Action
        confirm="您确定要清空所有数据吗？此操作不可撤销。"
        confirmTitle="危险操作确认"
        danger
        onClick={async () => {
          console.log('清空操作执行')
          await new Promise((resolve) => setTimeout(resolve, 1000))
          console.log('清空完成')
        }}
        style={{ marginLeft: 8 }}
      >
        清空数据（自定义确认）
      </Action>
    </div>
  )
}
```

## useDebounce 防抖

### 搜索输入防抖

```jsx
import React, { useState, useEffect } from 'react'
import { Input, Card } from 'antd'
import { useDebounce } from '@fexd/pro-utils'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  // 对搜索词进行防抖处理
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 模拟搜索API调用
      setLoading(true)
      setTimeout(() => {
        setSearchResults([
          `搜索结果1：${debouncedSearchTerm}`,
          `搜索结果2：${debouncedSearchTerm}`,
          `搜索结果3：${debouncedSearchTerm}`,
        ])
        setLoading(false)
      }, 300)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchTerm])

  return (
    <div>
      <Input
        placeholder="输入搜索关键词（防抖延迟500ms）"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        loading={loading}
      />

      <Card title="搜索结果" style={{ marginTop: 16 }}>
        {loading ? (
          <div>搜索中...</div>
        ) : (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
```

## useAutoLoading 自动加载状态

### API 调用自动加载

```jsx
import React from 'react'
import { useAutoLoading } from '@fexd/pro-utils'
import { Action } from '@fexd/pro-utils'
import { Card, Spin } from 'antd'

// 模拟API函数
const fetchUserData = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    id: userId,
    name: `用户${userId}`,
    email: `user${userId}@example.com`,
  }
}

export default () => {
  const [userData, setUserData] = React.useState(null)

  // 使用 useAutoLoading 包装异步函数
  const { loading, run } = useAutoLoading(fetchUserData)

  const handleFetchUser = async () => {
    const data = await run(Math.floor(Math.random() * 1000))
    setUserData(data)
  }

  return (
    <div>
      <Action type="primary" onClick={handleFetchUser} loading={loading}>
        获取用户数据
      </Action>

      <Card title="用户信息" style={{ marginTop: 16 }}>
        <Spin spinning={loading}>
          {userData ? (
            <div>
              <p>ID: {userData.id}</p>
              <p>姓名: {userData.name}</p>
              <p>邮箱: {userData.email}</p>
            </div>
          ) : (
            <div>点击按钮获取用户数据</div>
          )}
        </Spin>
      </Card>
    </div>
  )
}
```
