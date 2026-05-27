---
name: useCoverable-bc
description: BC（Business Component）编写指南——如何用 useCoverable 封装可跨项目复用的业务页面组件
---

# BC（业务组件）编写指南

## 什么是 BC

BC (Business Component) 是基于 `useCoverable` 封装的**整页级可复用业务组件**。一个 BC 通常是一整个 CRUD 管理页面，内部包含完整的 API 调用、权限控制、表格/表单配置和业务逻辑，但全部以「可覆盖配置」形式暴露，让不同项目只需传入差异化的 `coverable` prop 即可完成定制。

### 适用场景

- 多个项目/国家/业务线共享同一套管理后台功能
- 核心逻辑相同，但 API 路径、权限体系、部分 UI/文案 不同
- 希望统一维护升级，避免代码 copy

### 典型架构

```
┌─ @scope/bc-library（业务组件库，monorepo 多包）─────────────┐
│  packages/                                                  │
│    module-a/   → @scope/module-a   (如：审核模块)           │
│    module-b/   → @scope/module-b   (如：引擎模块)           │
│    shared/     → @scope/shared     (公共资源/国际化)         │
│                                                             │
│  每个组件文件即一个完整页面：                                  │
│    BusinessProcess.tsx                                       │
│    InterfaceManager.tsx                                      │
│    PermissionList.tsx                                        │
└─────────────────────────────────────────────────────────────┘
        ↓ npm install
┌─ project-a ──────┐  ┌─ project-b ──────┐
│ <InterfaceManager │ │ <InterfaceManager  │
│  coverable={{     │ │  coverable={{      │
│    permission:{…} │ │    apis:{…}        │
│  }}/>             │ │  }}/>              │
└──────────────────┘ └───────────────────┘
```

## 编写一个完整的 BC 组件

### 组件骨架

```tsx
import React from 'react'
import { ProTable, useTranslation, request, useCoverable, coloringOptions } from '@fexd/pro-components'
import { useRequest } from 'ahooks'

const MyPageComponent = useCoverable.component((props, ref) => {
  const { t } = useTranslation()

  // ① apis —— 接口请求配置
  const apis = useCoverable({
    /* ... */
  })

  // ② permission —— 权限开关
  const permission = useCoverable({
    /* ... */
  })

  // ③ options —— 枚举/选项映射
  const options = useCoverable({
    /* ... */
  })

  // ④ functions —— 可覆盖业务逻辑
  const functions = useCoverable({
    /* ... */
  })

  // ⑤ tableProps —— ProTable 配置
  const tableProps = ProTable.useCoverableProps({
    /* ... */
  })

  // ⑥ 注册并渲染
  return useCoverable
    .props({ apis, permission, options, functions, tableProps })
    .render(() => <ProTable {...tableProps.getProps()} />)
})

export default MyPageComponent
```

### columns key 说明

在示例项目中 columns 使用了中文 key（如 `'名称'`、`'状态'`），这是该项目的业务惯例而非强制规范。是否使用中文 key 取决于项目约定：

- **中文 key**：语义直观，覆盖时可读性好，适合纯中文团队
- **英文 key**：编码规范性好，适合国际化团队或要求英文编码的项目

选择哪种风格与 coverable 机制无关，只要覆盖方和被覆盖方 key 一致即可。

### 配置分组详解

#### ① apis — 接口请求

使用 `request.coverable()` 包裹每个 API，使外部能覆盖 URL、参数处理、响应处理等。

```tsx
const apis = useCoverable({
  getList: request.coverable({
    url: '/api/module/list',
    method: 'post',
    handleParams: (params) => ({
      ...params,
      page_size: params?.pageSize,
      current_page: params?.page,
    }),
    handleResponse: (response) => ({
      ...response,
      data: {
        list: response?.data?.records ?? [],
        total: response?.data?.total ?? 0,
      },
    }),
  }),
  create: request.coverable({
    url: '/api/module/create',
    method: 'post',
  }),
  update: request.coverable({
    url: '/api/module/update',
    method: 'post',
  }),
  remove: request.coverable({
    url: '/api/module/delete',
    method: 'post',
    handleParams: (item) => ({ id: item.id }),
  }),
  getMetadata: request.coverable({
    url: '/api/module/metadata',
    method: 'get',
    cache: { ttl: 1000 * 5 },
  }),
})
```

**要点**：

- 每个 API 独立命名，语义清晰
- `handleParams` 负责将标准参数格式转换为后端期望的格式
- `handleResponse` 负责将后端响应标准化
- 可配置 `cache` 实现请求缓存

#### ② permission — 权限控制

```tsx
const permission = useCoverable({
  search: true,
  add: true,
  edit: true,
  delete: true,
  export: false,
})
```

**要点**：

- 默认给 `true`（开放全部权限），消费方按需关闭
- 在 tableProps 中读取权限来控制按钮显隐

#### ③ options — 枚举/选项

```tsx
const options = useCoverable({
  statusList: [
    { label: t('启用'), value: '1', badge: 'processing' },
    { label: t('禁用'), value: '0', badge: 'warning' },
  ],
  typeMapping: {
    typeA: t('类型A'),
    typeB: t('类型B'),
  },
})
```

**要点**：

- 使用 `t()` 包裹文案，支持国际化
- 需要 coloring 的选项用 `coloringOptions()` 包裹

#### ④ functions — 可覆盖业务逻辑

```tsx
const functions = useCoverable({
  filterItems: (key, item) => key !== 'deprecated',
  formatExportData: (records) => records.map(/* ... */),
  computeStatistics: (data) => ({ total: data.length }),
})
```

**要点**：

- 复杂逻辑放入 functions，允许消费方替换算法
- 通过 `functions.getConfig().methodName()` 调用

#### ⑤ tableProps — ProTable 配置

```tsx
const tableProps = ProTable.useCoverableProps({
  title: t('数据管理'),
  bordered: true,
  iconActions: ['refresh', 'table-size', 'fullscreen'],
  columns: {
    名称: {
      label: t('名称'),
      name: 'name',
      queryField: { placeholder: t('请输入名称') },
      editField: { required: true },
    },
    状态: {
      label: t('状态'),
      name: 'status',
      type: 'select',
      options: options.getConfig().statusList,
      queryField: { placeholder: t('全部') },
    },
    创建时间: {
      label: t('创建时间'),
      name: 'created_at',
      type: 'dateTime',
      sorter: true,
    },
  },
  hideQueryFields: !permission.getConfig().search,
  actions: permission.getConfig().add ? ['add'] : [],
  columnActions: {
    编辑: permission.getConfig().edit ? 'edit' : (undefined as any),
    删除: permission.getConfig().delete ? 'delete' : (undefined as any),
  },
  onQuery: async (params) => {
    if (!permission.getConfig().search) {
      return { success: true, data: [], total: 0 }
    }
    return await apis.getConfig().getList(params)
  },
  onAdd: async (params) => apis.getConfig().create(params),
  onEdit: async (params, item) => apis.getConfig().update({ ...params, id: item.id }),
  onDelete: async (item) => apis.getConfig().remove(item),
})
```

**要点**：

- columns key 保持语义清晰（此处示例使用中文 key，实际风格按项目约定）
- 权限控制按钮显隐：`permission.getConfig().add ? ['add'] : []`
- onQuery 等回调中通过 `apis.getConfig()` 读取（确保覆盖后的配置生效）
- 无权限时直接返回空数据，不发请求

#### ⑥ 注册配置并渲染

```tsx
return useCoverable
  .props({ apis, permission, options, functions, tableProps })
  .render(() => <ProTable ref={tableController.ref} {...tableProps.getProps()} />)
```

**关键规则**：`useCoverable.props()` 中注册的 key 名称，即为消费方 `coverable` prop 中的路径。

## BC 包的项目组织

### 推荐 monorepo 结构

```
bc-library/
├── packages/
│   ├── module-a/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── PageA.tsx      ← useCoverable.component
│   │   │   │   └── PageB.tsx
│   │   │   ├── index.ts           ← 统一导出
│   │   │   └── style.css
│   │   └── package.json           ← @scope/module-a
│   ├── module-b/
│   │   └── ...
│   └── shared/                    ← 公共工具/国际化
├── pnpm-workspace.yaml
└── turbo.json
```

### package.json 示例

```json
{
  "name": "@scope/module-a",
  "version": "0.1.0",
  "main": "src/index.ts",
  "module": "src/index.ts",
  "publishConfig": {
    "main": "lib/index.js",
    "module": "es/index.js",
    "types": "types.d.ts"
  },
  "dependencies": {
    "@fexd/pro-components": "^0.2.101",
    "@fexd/tools": "^0.2.2",
    "ahooks": "^3.8.1",
    "antd": "^4.24.10"
  }
}
```

### 导出方式

```tsx
// src/index.ts
export { default as PageA } from './components/PageA'
export { default as PageB } from './components/PageB'
```

## 进阶模式

### 嵌套 BC 组合

一个顶层组件可以组合多个子 BC 组件，通过 props 分发配置：

```tsx
function CompositeManager(props: {
  SubPageAProps?: { coverable?: any }
  SubPageBProps?: { coverable?: any }
  visibleTabs?: string[]
}) {
  const groups = {
    tabA: { label: 'Tab A', content: <SubPageA {...props.SubPageAProps} /> },
    tabB: { label: 'Tab B', content: <SubPageB {...props.SubPageBProps} /> },
  }

  return <Tabs>{/* 根据 visibleTabs 渲染 */}</Tabs>
}
```

消费方可以这样使用：

```tsx
<CompositeManager
  visibleTabs={['tabA', 'tabB']}
  SubPageAProps={{
    coverable: {
      permission: { add: hasPermission(101) },
    },
  }}
  SubPageBProps={{
    coverable: {
      apis: { getList: { url: '/api/v2/custom-list' } },
    },
  }}
/>
```

### 使用 ProTable.useController 暴露控制能力

```tsx
const MyPage = useCoverable.component((props, ref) => {
  const tableController = ProTable.useController()

  React.useImperativeHandle(ref, () => ({ tableController }))

  // ... 配置逻辑

  return useCoverable
    .props({
      /* ... */
    })
    .render(() => <ProTable ref={tableController.ref} {...tableProps.getProps()} />)
})
```

消费方可通过 ref 获取 tableController 来外部控制表格刷新等。

### 多 ProTable 页面

一个页面中有多个表格时，每个表格独立声明 useCoverableProps：

```tsx
const mainTableProps = ProTable.useCoverableProps({
  /* 主表格 */
})
const detailTableProps = ProTable.useCoverableProps({
  /* 详情子表格 */
})

return useCoverable.props({ mainTableProps, detailTableProps /* ... */ }).render(() => (
  <div>
    <ProTable {...mainTableProps.getProps()} />
    {/* 在弹窗中 */}
    <ProTable {...detailTableProps.getProps()} />
  </div>
))
```

消费方按 key 分别覆盖：`coverable={{ mainTableProps: {...}, detailTableProps: {...} }}`

## 检查清单

编写 BC 组件前，确认：

- [ ] 所有 API 用 `request.coverable()` 包裹
- [ ] 权限默认全部开启，消费方按需关闭
- [ ] columns key 语义清晰，消费方可据此定位覆盖
- [ ] 回调中通过 `.getConfig()` 读取配置
- [ ] `useCoverable.props()` 注册了所有配置组
- [ ] 文案用 `t()` 包裹，支持国际化
- [ ] 导出组件类型（`export type XxxProps = typeof Xxx.defaultProps`）
