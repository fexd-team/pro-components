import React, { useReducer } from 'react'
import { dayjsTZ } from '@fexd/pro-utils'
import { Card, Select, Space, Typography, Divider } from 'antd'

const { Text, Title } = Typography

type State = { timezone: string }
type ActionType = { type: 'setTimezone'; payload: string }

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'setTimezone':
      return { timezone: action.payload }
    default:
      return state
  }
}

const timezoneOptions = [
  { label: '🇨🇳 上海 (UTC+8)', value: 'Asia/Shanghai' },
  { label: '🇮🇩 雅加达 (UTC+7)', value: 'Asia/Jakarta' },
  { label: '🇺🇸 纽约 (UTC-5)', value: 'America/New_York' },
  { label: '🇬🇧 伦敦 (UTC+0)', value: 'Europe/London' },
  { label: '🇯🇵 东京 (UTC+9)', value: 'Asia/Tokyo' },
  { label: '🇦🇺 悉尼 (UTC+10)', value: 'Australia/Sydney' },
]

export default () => {
  const [state, dispatch] = useReducer(reducer, { timezone: 'Asia/Shanghai' })

  const now = dayjsTZ()
  const inTimezone = now.tz(state.timezone)

  const localeMap: Record<string, { locale: string; label: string }> = {
    'zh-cn': { locale: 'zh-cn', label: '中文' },
    en: { locale: 'en', label: 'English' },
    id: { locale: 'id', label: 'Indonesia' },
  }

  return (
    <Card size="small" title="dayjsTZ 时区演示">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text type="secondary">选择时区：</Text>
          <Select
            value={state.timezone}
            onChange={(v) => dispatch({ type: 'setTimezone', payload: v })}
            options={timezoneOptions}
            style={{ width: 240 }}
          />
        </div>

        <Divider style={{ margin: '8px 0' }} />

        <div>
          <Text strong>本地时间：</Text>
          <Text code>{now.format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>
        <div>
          <Text strong>{state.timezone}：</Text>
          <Text code>{inTimezone.format('YYYY-MM-DD HH:mm:ss')}</Text>
        </div>

        <Divider style={{ margin: '8px 0' }} />

        <Text type="secondary">相对时间（多语言）：</Text>
        <div>
          {Object.entries(localeMap).map(([key, { locale, label }]) => (
            <div key={key} style={{ marginBottom: 2 }}>
              <Text style={{ display: 'inline-block', width: 80 }}>{label}:</Text>
              <Text code>{dayjsTZ(now.subtract(3, 'day')).locale(locale).fromNow()}</Text>
            </div>
          ))}
        </div>
      </Space>
    </Card>
  )
}
