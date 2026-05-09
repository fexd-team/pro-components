import React from 'react'
import { DropdownButton } from '@fexd/pro-utils'
import { Card, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default () => {
  return (
    <Card size="small" title="DropdownButton 下拉按钮（主按钮自动 loading）">
      <DropdownButton
        type="primary"
        icon={<DownOutlined />}
        onClick={async () => {
          await delay(1500)
          message.success('主操作完成')
        }}
        menu={{
          items: [
            { key: 'export', label: '导出 CSV' },
            { key: 'print', label: '打印' },
          ],
          onClick: ({ key }) => message.info(`点击了：${key}`),
        }}
      >
        操作
      </DropdownButton>
    </Card>
  )
}
