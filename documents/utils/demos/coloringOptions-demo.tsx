import React, { useState } from 'react'
import { coloringOptions } from '@fexd/pro-form'
import { Button, Tag, Space, Input, Card } from 'antd'

const initialOptions = [
  { label: '待处理', value: 0 },
  { label: '处理中', value: 1 },
  { label: '已完成', value: 2 },
  { label: '已关闭', value: 3 },
]

export default () => {
  const [options, setOptions] = useState(() => coloringOptions(initialOptions))
  const [newLabel, setNewLabel] = useState('')

  const handleAdd = () => {
    if (!newLabel.trim()) return
    const next = [...options, { label: newLabel.trim(), value: options.length }]
    setOptions(coloringOptions(next))
    setNewLabel('')
  }

  return (
    <Card size="small" title="coloringOptions 自动染色演示">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          {options.map((opt: any) => (
            <Tag key={opt.value} color={opt.tag} style={{ marginBottom: 4 }}>
              {opt.label}
            </Tag>
          ))}
        </div>
        <Space>
          <Input
            placeholder="输入新选项名称"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onPressEnter={handleAdd}
            style={{ width: 200 }}
          />
          <Button type="primary" size="small" onClick={handleAdd}>
            添加选项
          </Button>
          <Button size="small" onClick={() => setOptions(coloringOptions(initialOptions))}>
            重置
          </Button>
        </Space>
      </Space>
    </Card>
  )
}
