import React, { useState } from 'react'
import { createValueProxy } from '@fexd/pro-utils'
import { Card, Select, Space, Typography, Tag } from 'antd'

const { Text } = Typography

const translations: Record<string, Record<string, string>> = {
  'zh-cn': { 启用: '启用', 禁用: '禁用', 待审核: '待审核' },
  en: { 启用: 'Enabled', 禁用: 'Disabled', 待审核: 'Pending' },
  id: { 启用: 'Aktif', 禁用: 'Nonaktif', 待审核: 'Menunggu' },
}

const rawOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
  { label: '待审核', value: 2 },
]

export default () => {
  const [lang, setLang] = useState('zh-cn')

  const proxiedOptions = rawOptions.map((item) =>
    createValueProxy(item, (value: any, key: any) => {
      if (key === 'label') return translations[lang]?.[value] ?? value
      return value
    }),
  )

  return (
    <Card size="small" title="createValueProxy 值代理（i18n 翻译示例）">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Text type="secondary">切换语言：</Text>
          <Select
            value={lang}
            onChange={setLang}
            options={[
              { label: '中文', value: 'zh-cn' },
              { label: 'English', value: 'en' },
              { label: 'Indonesia', value: 'id' },
            ]}
            style={{ width: 140 }}
          />
        </Space>
        <div>
          {proxiedOptions.map((opt: any) => (
            <Tag key={opt.value} color="blue" style={{ marginBottom: 4 }}>
              {opt.label}（value: {opt.value}）
            </Tag>
          ))}
        </div>
        <Text type="secondary" style={{ fontSize: 12 }}>
          原始 label 不变，Proxy 读取时自动翻译
        </Text>
      </Space>
    </Card>
  )
}
