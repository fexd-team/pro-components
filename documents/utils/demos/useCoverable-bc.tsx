/**
 * title: BC 组件实战：一个完整的 CRUD 管理页
 * description: 展示一个用 useCoverable 封装的完整业务组件，内置 API 配置、权限控制、表格配置。消费方只需传入 coverable 即可定制。下方的开关模拟了不同项目使用同一个 BC 组件时的差异化配置。
 */
import React, { useState } from 'react'
import { Card, Switch, Space, Alert, Divider, Tag, Input } from 'antd'
import { ProTable, useCoverable, request } from '@fexd/pro-components'

// ============================================================
// BC 组件定义（通常放在 @scope/bc-library 包中）
// ============================================================
const ProductManager = useCoverable.component((props, ref) => {
  const permission = useCoverable({
    search: true,
    add: true,
    edit: true,
    delete: true,
  })

  const apis = useCoverable({
    getList: request.coverable({
      url: '/api/product/list',
      method: 'get',
      handleParams: (params) => ({
        page: params?.page,
        page_size: params?.pageSize,
        keyword: params?.keyword,
      }),
    }),
  })

  const options = useCoverable({
    statusList: [
      { label: '上架', value: 'online', badge: 'processing' },
      { label: '下架', value: 'offline', badge: 'warning' },
      { label: '草稿', value: 'draft', badge: 'default' },
    ],
    categoryList: [
      { label: '电子产品', value: 'electronics' },
      { label: '服装', value: 'clothing' },
      { label: '食品', value: 'food' },
    ],
  })

  const tableProps = ProTable.useCoverableProps({
    title: '商品管理',
    bordered: true,
    size: 'small',
    columns: {
      商品名称: {
        label: '商品名称',
        name: 'name',
        queryField: { placeholder: '搜索商品名' },
        editField: { required: true },
      },
      分类: {
        label: '分类',
        name: 'category',
        type: 'select',
        options: options.getConfig().categoryList,
        queryField: { placeholder: '全部分类' },
      },
      价格: {
        label: '价格',
        name: 'price',
        type: 'number',
        editField: { required: true },
        render: (val) => `¥ ${val?.toFixed(2) ?? '-'}`,
      },
      状态: {
        label: '状态',
        name: 'status',
        type: 'select',
        options: options.getConfig().statusList,
      },
    },
    actions: permission.getConfig().add ? ['add'] : [],
    columnActions: {
      编辑: permission.getConfig().edit ? 'edit' : (undefined as any),
      删除: permission.getConfig().delete ? 'delete' : (undefined as any),
    },
    hideQueryFields: !permission.getConfig().search,
    iconActions: ['refresh', 'table-size'],
    dataSource: [
      { id: 1, name: 'MacBook Pro 14"', category: 'electronics', price: 14999, status: 'online' },
      { id: 2, name: '运动T恤', category: 'clothing', price: 199, status: 'online' },
      { id: 3, name: '有机牛奶', category: 'food', price: 45, status: 'offline' },
      { id: 4, name: 'AirPods Pro', category: 'electronics', price: 1899, status: 'draft' },
    ],
    pagination: { pageSize: 10 },
  })

  return useCoverable
    .props({ permission, apis, options, tableProps })
    .render(() => <ProTable {...tableProps.getProps()} />)
})

// ============================================================
// 消费方 Demo
// ============================================================
export default function BCDemo() {
  const [canAdd, setCanAdd] = useState(true)
  const [canEdit, setCanEdit] = useState(true)
  const [canDelete, setCanDelete] = useState(true)
  const [canSearch, setCanSearch] = useState(true)
  const [customTitle, setCustomTitle] = useState('')

  return (
    <div>
      <Alert
        type="info"
        showIcon
        message="模拟「不同项目」对同一 BC 组件的差异化配置"
        description={
          <Space wrap>
            <span>
              查询：
              <Switch size="small" checked={canSearch} onChange={setCanSearch} />
            </span>
            <span>
              新增：
              <Switch size="small" checked={canAdd} onChange={setCanAdd} />
            </span>
            <span>
              编辑：
              <Switch size="small" checked={canEdit} onChange={setCanEdit} />
            </span>
            <span>
              删除：
              <Switch size="small" checked={canDelete} onChange={setCanDelete} />
            </span>
            <span>
              自定义标题：
              <Input
                size="small"
                placeholder="留空使用默认"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                style={{ width: 150 }}
              />
            </span>
          </Space>
        }
        style={{ marginBottom: 16 }}
      />

      <ProductManager
        coverable={{
          permission: {
            search: canSearch,
            add: canAdd,
            edit: canEdit,
            delete: canDelete,
          },
          ...(customTitle ? { tableProps: { title: customTitle } } : {}),
        }}
      />

      <Divider />
      <Card title="当前 coverable 配置" size="small">
        <pre style={{ fontSize: 12, background: '#f6f6f6', padding: 12, borderRadius: 4 }}>
          {JSON.stringify(
            {
              permission: { search: canSearch, add: canAdd, edit: canEdit, delete: canDelete },
              ...(customTitle ? { tableProps: { title: customTitle } } : {}),
            },
            null,
            2,
          )}
        </pre>
      </Card>
    </div>
  )
}
