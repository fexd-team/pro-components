import React from 'react'
import { Actions, confirmPromise } from '@fexd/pro-utils'
import { Card, message } from 'antd'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default () => {
  return (
    <Card size="small" title="Actions 按钮组（shareAutoLoading：一个 loading 时其余 disabled）">
      <Actions
        shareAutoLoading
        spaceSize="middle"
        configs={[
          {
            type: 'primary',
            children: '保存',
            onClick: async () => {
              await delay(2000)
              message.success('保存成功')
            },
          },
          {
            children: '导出',
            onClick: async () => {
              await delay(1500)
              message.success('导出完成')
            },
          },
          {
            danger: true,
            children: '删除',
            onClick: async () => {
              const ok = await confirmPromise('确定要删除吗？')
              if (ok) {
                await delay(1000)
                message.success('已删除')
              }
            },
          },
        ]}
      />
    </Card>
  )
}
