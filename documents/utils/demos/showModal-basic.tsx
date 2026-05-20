import React from 'react'
import { showModal } from '@fexd/pro-components'
import { Button, Space, Input, Form, message, Progress } from 'antd'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default () => {
  return (
    <Space wrap>
      <Button
        type="primary"
        onClick={() => {
          showModal({
            title: '确认操作',
            content: '确定要执行此操作吗？这是一个基础弹窗示例。',
            onOk: async () => {
              await delay(500)
              message.success('操作成功')
            },
          })
        }}
      >
        基础弹窗
      </Button>

      <Button
        onClick={() => {
          showModal({
            title: '用户信息',
            content: (
              <Form layout="vertical">
                <Form.Item label="姓名">
                  <Input placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item label="邮箱">
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
              </Form>
            ),
            width: 480,
            onOk: async () => {
              await delay(500)
              message.success('提交成功')
            },
          })
        }}
      >
        表单弹窗
      </Button>

      <Button
        onClick={() => {
          showModal({
            title: '可拖拽弹窗',
            draggable: true,
            content: <div style={{ padding: 16 }}>拖拽标题栏试试！这个弹窗可以随意移动。</div>,
          })
        }}
      >
        可拖拽
      </Button>

      <Button
        onClick={() => {
          const controller = showModal({
            title: '进度演示',
            footer: null,
            content: <Progress percent={0} />,
          })

          let progress = 0
          const timer = setInterval(() => {
            progress += 10
            controller.update({
              content: (
                <div>
                  <Progress percent={progress} />
                  <p style={{ marginTop: 8, color: '#666' }}>{progress < 100 ? '处理中...' : '完成！'}</p>
                </div>
              ),
            })
            if (progress >= 100) {
              clearInterval(timer)
              setTimeout(() => controller.close(), 800)
            }
          }, 400)
        }}
      >
        动态更新
      </Button>
    </Space>
  )
}
