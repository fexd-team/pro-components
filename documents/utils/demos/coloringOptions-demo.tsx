import React, { useState, useReducer } from 'react'
import { coloringOptions } from '@fexd/pro-form'
import { Button, Tag, Space, Input, Card } from 'antd'

type State = { options: Array<{ label: string; value: number; tag?: string }> }
type ActionType = { type: 'add'; label: string } | { type: 'reset' }

const initialOptions = [
  { label: '待处理', value: 0 },
  { label: '处理中', value: 1 },
  { label: '已完成', value: 2 },
  { label: '已关闭', value: 3 },
]

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'add':
      return {
        options: coloringOptions([...state.options, { label: action.label, value: state.options.length }]),
      }
    case 'reset':
      return { options: coloringOptions(initialOptions) }
    default:
      return state
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    options: coloringOptions(initialOptions),
  })
  const [newLabel, setNewLabel] = useState('')

  return (
    <Card size="small" title="coloringOptions 自动染色演示">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          {state.options.map((opt) => (
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
            onPressEnter={() => {
              if (newLabel.trim()) {
                dispatch({ type: 'add', label: newLabel.trim() })
                setNewLabel('')
              }
            }}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            size="small"
            onClick={() => {
              if (newLabel.trim()) {
                dispatch({ type: 'add', label: newLabel.trim() })
                setNewLabel('')
              }
            }}
          >
            添加选项
          </Button>
          <Button size="small" onClick={() => dispatch({ type: 'reset' })}>
            重置
          </Button>
        </Space>
      </Space>
    </Card>
  )
}
