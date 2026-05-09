/**
 * title: 传统组件 vs BC 组件对比
 * description: 同一个「用户列表」需求，对比传统 Props 驱动和 BC Coverable 驱动的消费方体验差异。左侧为传统组件（需要传大量 props），右侧为 BC 组件（只需传差异配置）。
 */
import React, { useState } from 'react'
import { Card, Switch, Divider, Tag, Space, Alert } from 'antd'
import { ProTable, useCoverable, request } from '@fexd/pro-components'

// ============================================================
// 方式一：传统 Props 组件
// ============================================================
function TraditionalUserList({
  title = '用户列表',
  canAdd = true,
  canDelete = true,
  pageSize = 5,
  hideStatusColumn = false,
}: {
  title?: string
  canAdd?: boolean
  canDelete?: boolean
  pageSize?: number
  hideStatusColumn?: boolean
}) {
  const mockData = [
    { id: 1, name: '张三', status: '活跃', department: '技术部' },
    { id: 2, name: '李四', status: '禁用', department: '产品部' },
    { id: 3, name: '王五', status: '活跃', department: '设计部' },
  ]

  return (
    <div>
      <h4>{title}</h4>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
        操作：{canAdd && <Tag color="green">可新增</Tag>}
        {canDelete && <Tag color="red">可删除</Tag>}
        {!canAdd && !canDelete && <Tag>只读</Tag>}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#fafafa' }}>
            <th style={{ padding: '8px', border: '1px solid #eee' }}>姓名</th>
            {!hideStatusColumn && <th style={{ padding: '8px', border: '1px solid #eee' }}>状态</th>}
            <th style={{ padding: '8px', border: '1px solid #eee' }}>部门</th>
          </tr>
        </thead>
        <tbody>
          {mockData.slice(0, pageSize).map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '8px', border: '1px solid #eee' }}>{item.name}</td>
              {!hideStatusColumn && <td style={{ padding: '8px', border: '1px solid #eee' }}>{item.status}</td>}
              <td style={{ padding: '8px', border: '1px solid #eee' }}>{item.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================
// 方式二：BC Coverable 组件
// ============================================================
const BCUserList = useCoverable.component((props, ref) => {
  const permission = useCoverable({
    add: true,
    delete: true,
  })

  const options = useCoverable({
    statusMap: { active: '活跃', disabled: '禁用' },
  })

  const tableConfig = useCoverable({
    title: '用户列表',
    pageSize: 5,
    columns: {
      name: { label: '姓名', visible: true },
      status: { label: '状态', visible: true },
      department: { label: '部门', visible: true },
    },
  })

  return useCoverable.props({ permission, options, tableConfig }).render(() => {
    const perm = permission.getConfig()
    const config = tableConfig.getConfig()
    const cols = config.columns

    const mockData = [
      { id: 1, name: '张三', status: 'active', department: '技术部' },
      { id: 2, name: '李四', status: 'disabled', department: '产品部' },
      { id: 3, name: '王五', status: 'active', department: '设计部' },
    ]

    return (
      <div>
        <h4>{config.title}</h4>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
          操作：{perm.add && <Tag color="green">可新增</Tag>}
          {perm.delete && <Tag color="red">可删除</Tag>}
          {!perm.add && !perm.delete && <Tag>只读</Tag>}
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {cols.name?.visible && <th style={{ padding: '8px', border: '1px solid #eee' }}>{cols.name.label}</th>}
              {cols.status?.visible && (
                <th style={{ padding: '8px', border: '1px solid #eee' }}>{cols.status.label}</th>
              )}
              {cols.department?.visible && (
                <th style={{ padding: '8px', border: '1px solid #eee' }}>{cols.department.label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {mockData.slice(0, config.pageSize).map((item) => (
              <tr key={item.id}>
                {cols.name?.visible && <td style={{ padding: '8px', border: '1px solid #eee' }}>{item.name}</td>}
                {cols.status?.visible && (
                  <td style={{ padding: '8px', border: '1px solid #eee' }}>
                    {options.getConfig().statusMap[item.status] ?? item.status}
                  </td>
                )}
                {cols.department?.visible && (
                  <td style={{ padding: '8px', border: '1px solid #eee' }}>{item.department}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  })
})

// ============================================================
// 对比展示
// ============================================================
export default function DesignComparisonDemo() {
  const [hideStatus, setHideStatus] = useState(false)
  const [readonly, setReadonly] = useState(false)

  return (
    <div>
      <Alert
        type="info"
        showIcon
        message="交互控制"
        description={
          <Space>
            <span>
              隐藏状态列：
              <Switch size="small" checked={hideStatus} onChange={setHideStatus} />
            </span>
            <span>
              只读模式：
              <Switch size="small" checked={readonly} onChange={setReadonly} />
            </span>
          </Space>
        }
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="传统 Props 组件" size="small" extra={<Tag color="orange">需要为每个定制加 prop</Tag>}>
          <TraditionalUserList
            title="用户列表（传统）"
            canAdd={!readonly}
            canDelete={!readonly}
            hideStatusColumn={hideStatus}
          />
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ fontSize: 12, color: '#999' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>消费方代码：</div>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, overflow: 'auto' }}>
              {`<TraditionalUserList
  title="用户列表（传统）"
  canAdd={!readonly}
  canDelete={!readonly}
  hideStatusColumn={hideStatus}
/>`}
            </pre>
          </div>
        </Card>

        <Card title="BC Coverable 组件" size="small" extra={<Tag color="blue">按路径覆盖任意配置</Tag>}>
          <BCUserList
            coverable={{
              permission: readonly ? { add: false, delete: false } : {},
              tableConfig: hideStatus ? { columns: { status: { visible: false } } } : {},
            }}
          />
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ fontSize: 12, color: '#999' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>消费方代码：</div>
            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, overflow: 'auto' }}>
              {`<BCUserList
  coverable={{
    permission: readonly
      ? { add: false, delete: false }
      : {},
    tableConfig: hideStatus
      ? { columns: { status: { visible: false } } }
      : {},
  }}
/>`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  )
}
