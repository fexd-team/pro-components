import React, { useState } from 'react'
import { dayjsTZ } from '@fexd/pro-utils'
import { Card, Select, Space, Typography, Divider } from 'antd'

const { Text } = Typography

const timezoneOptions = [
  { label: '🇨🇳 上海 (UTC+8)', value: 'Asia/Shanghai' },
  { label: '🇮🇩 雅加达 (UTC+7)', value: 'Asia/Jakarta' },
  { label: '🇺🇸 纽约 (UTC-5)', value: 'America/New_York' },
  { label: '🇬🇧 伦敦 (UTC+0)', value: 'Europe/London' },
  { label: '🇯🇵 东京 (UTC+9)', value: 'Asia/Tokyo' },
  { label: '🇦🇺 悉尼 (UTC+10)', value: 'Australia/Sydney' },
]

const locales = [
  { key: 'zh-cn', label: '中文' },
  { key: 'en', label: 'English' },
  { key: 'id', label: 'Indonesia' },
]

export default () => {
  const [timezone, setTimezone] = useState('Asia/Shanghai')
  const [, forceUpdate] = useState(0)

  const now = new Date()
  const localFormatted = dayjsTZ(now).format('YYYY-MM-DD HH:mm:ss')
  const tzFormatted = dayjsTZ(now).tz(timezone).format('YYYY-MM-DD HH:mm:ss')
  const threeDaysAgo = dayjsTZ(now).subtract(3, 'day')

  return (
    <Card size="small" title="dayjsTZ 时区演示">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Text type="secondary">选择时区：</Text>
          <Select
            value={timezone}
            onChange={(v) => {
              setTimezone(v)
              forceUpdate((n) => n + 1)
            }}
            options={timezoneOptions}
            style={{ width: 240 }}
          />
        </Space>

        <Divider style={{ margin: '8px 0' }} />

        <div>
          <Text strong>本地时间：</Text>
          <Text code>{localFormatted}</Text>
        </div>
        <div>
          <Text strong>{timezone}：</Text>
          <Text code>{tzFormatted}</Text>
        </div>

        <Divider style={{ margin: '8px 0' }} />

        <Text type="secondary">相对时间（多语言）：</Text>
        {locales.map(({ key, label }) => (
          <div key={key} style={{ marginBottom: 2 }}>
            <Text style={{ display: 'inline-block', width: 80 }}>{label}:</Text>
            <Text code>{threeDaysAgo.locale(key).fromNow()}</Text>
          </div>
        ))}
      </Space>
    </Card>
  )
}
