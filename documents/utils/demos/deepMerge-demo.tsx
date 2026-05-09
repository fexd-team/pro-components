import React, { useReducer } from 'react'
import { deepMerge } from '@fexd/pro-utils'
import { Card, Button, Space, Typography } from 'antd'

const { Text } = Typography

const presetCases = [
  {
    label: '基础合并',
    a: { name: '张三', age: 25 },
    b: { email: 'test@example.com', age: 30 },
  },
  {
    label: '深层嵌套',
    a: { user: { profile: { name: '张三', address: { city: '北京' } } } },
    b: { user: { profile: { age: 25, address: { district: '朝阳' } } } },
  },
  {
    label: '数组合并',
    a: { tags: ['react', 'vue'], count: 1 },
    b: { tags: ['angular'], count: 2, extra: true },
  },
  {
    label: '混合场景',
    a: { config: { theme: 'light', layout: { sidebar: true, header: { height: 64 } } } },
    b: { config: { theme: 'dark', layout: { header: { title: 'Pro' } }, footer: true } },
  },
]

type State = { selectedIndex: number }
type ActionType = { type: 'select'; index: number }

function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'select':
      return { selectedIndex: action.index }
    default:
      return state
  }
}

const JsonBlock = ({ label, data, color }: { label: string; data: any; color: string }) => (
  <div style={{ flex: 1, minWidth: 200 }}>
    <Text strong style={{ color }}>
      {label}
    </Text>
    <pre
      style={{
        background: '#f5f5f5',
        padding: 8,
        borderRadius: 6,
        fontSize: 12,
        marginTop: 4,
        borderLeft: `3px solid ${color}`,
        overflow: 'auto',
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
)

export default () => {
  const [state, dispatch] = useReducer(reducer, { selectedIndex: 0 })
  const current = presetCases[state.selectedIndex]
  const result = deepMerge(current.a, current.b)

  return (
    <Card size="small" title="deepMerge 深度合并演示">
      <Space wrap style={{ marginBottom: 12 }}>
        {presetCases.map((c, i) => (
          <Button
            key={i}
            type={state.selectedIndex === i ? 'primary' : 'default'}
            size="small"
            onClick={() => dispatch({ type: 'select', index: i })}
          >
            {c.label}
          </Button>
        ))}
      </Space>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <JsonBlock label="A (目标)" data={current.a} color="#1677ff" />
        <JsonBlock label="B (源)" data={current.b} color="#52c41a" />
        <JsonBlock label="deepMerge(A, B)" data={result} color="#722ed1" />
      </div>
    </Card>
  )
}
