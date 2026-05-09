import React from 'react'
import { showDrawer } from '@fexd/pro-utils'
import { Button, Space, Descriptions, Form, Input, message } from 'antd'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default () => {
  return (
    <Space wrap>
      <Button
        type="primary"
        onClick={() => {
          showDrawer({
            title: '详情信息',
            width: 500,
            content: (
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="订单号">ORD-2026-00001</Descriptions.Item>
                <Descriptions.Item label="客户">张三</Descriptions.Item>
                <Descriptions.Item label="金额">¥ 12,800.00</Descriptions.Item>
                <Descriptions.Item label="状态">已支付</Descriptions.Item>
                <Descriptions.Item label="创建时间">2026-05-09 14:30:00</Descriptions.Item>
              </Descriptions>
            ),
            footer: null,
          })
        }}
      >
        详情抽屉
      </Button>

      <Button
        onClick={() => {
          showDrawer({
            title: '编辑用户',
            width: 450,
            content: (
              <Form layout="vertical">
                <Form.Item label="姓名" required>
                  <Input defaultValue="张三" />
                </Form.Item>
                <Form.Item label="邮箱" required>
                  <Input defaultValue="zhangsan@example.com" />
                </Form.Item>
                <Form.Item label="备注">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Form>
            ),
            onOk: async () => {
              await delay(500)
              message.success('保存成功')
            },
          })
        }}
      >
        表单抽屉
      </Button>

      <Button
        onClick={async () => {
          message.info('抽屉已打开，关闭后继续...')
          await showDrawer({
            title: 'Promise 等待',
            content: <div style={{ padding: 16 }}>关闭此抽屉后，Promise 将 resolve。</div>,
            footer: null,
          }).promise
          message.success('抽屉已关闭，Promise 已完成')
        }}
      >
        Promise 等待
      </Button>
    </Space>
  )
}
