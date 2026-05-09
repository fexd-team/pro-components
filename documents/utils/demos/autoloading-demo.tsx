import React from 'react'
import useAutoLoading from '@fexd/pro-utils/src/hooks/useAutoLoading'
import { Button, Space, Card, Tag, message } from 'antd'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default () => {
  const saveAction = useAutoLoading({
    action: async () => {
      await delay(2000)
      message.success('保存成功！')
    },
  })

  const loadAction = useAutoLoading({
    action: async () => {
      await delay(1500)
      message.info('数据加载完成')
      return { total: 42 }
    },
  })

  return (
    <Card size="small" title="useAutoLoading 自动 loading 演示">
      <Space direction="vertical">
        <Space>
          <Button type="primary" loading={saveAction.loading} onClick={saveAction.onAction}>
            保存数据
          </Button>
          <Tag color={saveAction.loading ? 'processing' : 'default'}>{saveAction.loading ? 'loading...' : '空闲'}</Tag>
        </Space>
        <Space>
          <Button loading={loadAction.loading} onClick={loadAction.onAction}>
            加载数据
          </Button>
          <Tag color={loadAction.loading ? 'processing' : 'default'}>{loadAction.loading ? 'loading...' : '空闲'}</Tag>
        </Space>
      </Space>
    </Card>
  )
}
