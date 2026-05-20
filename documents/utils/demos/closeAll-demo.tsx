import React from 'react'
import { showModal, showDrawer } from '@fexd/pro-components'
import { closeAll } from '@fexd/pro-utils/src/components/showModal/controller'
import { Button, Space, Card, message } from 'antd'

export default () => {
  return (
    <Card size="small" title="closeAll 批量关闭演示">
      <Space wrap>
        <Button
          onClick={() => {
            showModal({ title: '弹窗 1', content: '第一个弹窗', footer: null })
            showModal({ title: '弹窗 2', content: '第二个弹窗', footer: null })
            showModal({ title: '弹窗 3', content: '第三个弹窗', footer: null })
            message.info('已打开 3 个弹窗')
          }}
        >
          打开 3 个弹窗
        </Button>

        <Button
          onClick={() => {
            showDrawer({ title: '抽屉 1', content: '第一个抽屉', footer: null })
            showDrawer({ title: '抽屉 2', content: '第二个抽屉', footer: null })
            message.info('已打开 2 个抽屉')
          }}
        >
          打开 2 个抽屉
        </Button>

        <Button
          danger
          type="primary"
          onClick={() => {
            closeAll()
            message.success('已关闭所有弹窗和抽屉')
          }}
        >
          closeAll() 一键关闭
        </Button>
      </Space>
    </Card>
  )
}
