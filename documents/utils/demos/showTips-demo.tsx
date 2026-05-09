import React from 'react'
import { isString, isObject } from '@fexd/tools'
import { Button, Space, Card, Typography, App } from 'antd'

const { Text } = Typography

/**
 * showTipsWithResponse 内部使用 antd 静态 API。
 * dumi 文档站的 antd 版本与 pro-utils 打包的版本可能不一致，
 * 因此 demo 中通过 App.useApp() 获取当前上下文的 message/notification 实例，
 * 复现等价逻辑以确保 demo 演示效果正常。
 */
function useShowTips() {
  const { message, notification } = App.useApp()

  return (response: any) => {
    const { success, message: msg, notification: notify } = response ?? { success: true }
    const messageConfig = isString(msg) && msg !== '' ? { content: msg } : isObject(msg) ? msg : null
    const notifyConfig: any = isObject(notify) ? notify : isString(notify) ? { description: notify } : null
    const toastType = success ? 'success' : 'error'

    if (messageConfig) {
      message?.[toastType]?.(messageConfig)
    }
    if (notify) {
      notification?.[toastType]?.(notifyConfig)
    }
  }
}

export default () => {
  const showTips = useShowTips()

  return (
    <Card size="small" title="showTipsWithResponse 响应自动提示">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary">根据 response 的 success/message/notification 字段自动显示提示：</Text>
        <Space wrap>
          <Button type="primary" onClick={() => showTips({ success: true, message: '操作成功！' })}>
            成功 message
          </Button>
          <Button danger onClick={() => showTips({ success: false, message: '参数校验失败' })}>
            失败 message
          </Button>
          <Button
            onClick={() =>
              showTips({
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
              showTips({
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
