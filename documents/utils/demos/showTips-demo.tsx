import React from 'react'
import { showTipsWithResponse } from '@fexd/pro-utils'
import { Button, Space, Card } from 'antd'

export default () => {
  return (
    <Card size="small" title="showTipsWithResponse 响应自动提示">
      <Space wrap>
        <Button
          type="primary"
          onClick={() =>
            showTipsWithResponse({
              success: true,
              message: '操作成功！',
            })
          }
        >
          成功 message
        </Button>
        <Button
          danger
          onClick={() =>
            showTipsWithResponse({
              success: false,
              message: '参数校验失败',
            })
          }
        >
          失败 message
        </Button>
        <Button
          onClick={() =>
            showTipsWithResponse({
              success: true,
              notification: '数据导出已完成，请在下载中心查看',
            })
          }
        >
          成功 notification
        </Button>
        <Button
          onClick={() =>
            showTipsWithResponse({
              success: false,
              notification: { message: '系统错误', description: '服务器内部异常，请稍后重试' },
            })
          }
        >
          失败 notification（对象）
        </Button>
      </Space>
    </Card>
  )
}
