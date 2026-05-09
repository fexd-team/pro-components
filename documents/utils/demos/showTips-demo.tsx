import React from 'react'
import { showTipsWithResponse } from '@fexd/pro-utils'
import { Button, Space, Card, Typography } from 'antd'

const { Text } = Typography

export default () => {
  return (
    <Card size="small" title="showTipsWithResponse 响应自动提示">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary">根据 response 的 success/message/notification 字段自动显示提示：</Text>
        <Space wrap>
          <Button type="primary" onClick={() => showTipsWithResponse({ success: true, message: '操作成功！' })}>
            成功 message
          </Button>
          <Button danger onClick={() => showTipsWithResponse({ success: false, message: '参数校验失败' })}>
            失败 message
          </Button>
          <Button
            onClick={() =>
              showTipsWithResponse({
                success: true,
                notification: {
                  message: '导出完成',
                  description: '数据导出已完成，请在下载中心查看',
                },
              })
            }
          >
            成功 notification
          </Button>
          <Button
            onClick={() =>
              showTipsWithResponse({
                success: false,
                notification: {
                  message: '系统错误',
                  description: '服务器内部异常，请稍后重试',
                },
              })
            }
          >
            失败 notification
          </Button>
        </Space>
        <Text type="secondary" style={{ fontSize: 12 }}>
          message 字段 → antd message 提示 | notification 字段 → antd notification 通知
        </Text>
      </Space>
    </Card>
  )
}
