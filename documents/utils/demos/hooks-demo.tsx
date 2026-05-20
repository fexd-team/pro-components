import React, { useState, useEffect } from 'react'
import { useDebounce } from '@fexd/pro-components'
import { Input, Card, Space, Tag, Typography } from 'antd'

const { Text } = Typography

export default () => {
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, { wait: 500 })
  const [searchCount, setSearchCount] = useState(0)

  useEffect(() => {
    if (debouncedValue) {
      setSearchCount((c) => c + 1)
    }
  }, [debouncedValue])

  return (
    <Card size="small" title="useDebounce 防抖演示">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="快速输入试试，500ms 后才会触发搜索..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          allowClear
        />
        <div>
          <Text type="secondary">实时输入值：</Text>
          <Tag>{inputValue || '(空)'}</Tag>
        </div>
        <div>
          <Text type="secondary">防抖后的值：</Text>
          <Tag color="blue">{debouncedValue || '(空)'}</Tag>
        </div>
        <div>
          <Text type="secondary">模拟搜索次数：</Text>
          <Tag color="green">{searchCount}</Tag>
        </div>
      </Space>
    </Card>
  )
}
