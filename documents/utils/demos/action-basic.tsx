import React from 'react'
import { Action, confirmPromise } from '@fexd/pro-utils'
import { Space, message } from 'antd'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default () => {
  return (
    <Space wrap>
      <Action
        type="primary"
        onClick={async () => {
          await delay(1500)
          message.success('保存成功')
        }}
      >
        保存（自动 loading）
      </Action>

      <Action
        danger
        onClick={async () => {
          const confirmed = await confirmPromise('确定要删除这条记录吗？')
          if (confirmed) {
            await delay(1000)
            message.success('删除成功')
          }
        }}
      >
        删除（带确认）
      </Action>

      <Action
        onClick={async () => {
          await delay(2000)
          message.info('操作完成')
        }}
      >
        普通操作
      </Action>
    </Space>
  )
}
