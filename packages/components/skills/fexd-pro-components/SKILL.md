---
name: fexd-pro-components
description: >-
  React 管理系统组件库 @fexd/pro-components 的完整使用指南。涵盖 ProTable、ProForm、ProField、ConfigProvider 等核心组件以及 showModal、showImages、useCoverable、Action 等实用工具的用法、API、代码示例和最佳实践。 当用户使用 @fexd/pro-components 开发管理页面、查找组件用法、定制配置、查询 API 时使用。 触发词：fexd、pro-components、@fexd/pro-components、ProTable、ProForm、ProField。


metadata:
  author: FEXD Team
  version: '2026.05.08'
  source: packages/components/src/
---

# @fexd/pro-components 使用指南

> 文档基于 @fexd/pro-components v0.2.99，更新于 2026-05-08。

React 管理系统组件库，基于 Ant Design 4.x + React 16/17，覆盖表格、表单、字段、全局配置、命令式弹窗/图片预览、业务组件化等场景。

## Skill 导览

按任务场景选择对应文档，避免全量阅读：

| 场景 | 应读文件 |
| --- | --- |
| 使用某个组件/工具 | `references/{Name}.md` |
| 选组件 / 了解有哪些组件 | [catalog.md](catalog.md) |
| 查完整 Props / API | `references/{Name}.md` 或 [source-navigation.md](source-navigation.md) → 源码 type |
| 国际化 / 全局配置 | `references/ConfigProvider.md` |
| 开发表格页面 | `references/ProTable.md`（→ [Ref](references/ProTable-ref.md) · [Query](references/ProTable-query.md) · [CRUD](references/ProTable-crud.md) · [Actions](references/ProTable-actions.md) · [Plugins](references/ProTable-plugins.md)） |
| 开发表单页面 | `references/ProForm.md`（→ [Ref](references/ProForm-ref.md) · [Fields](references/ProForm-fields.md) · [Layout](references/ProForm-layout.md) · [Advanced](references/ProForm-advanced.md)） + [ProField](references/ProField.md) |
| 命令式弹窗 / 图片预览 | `references/showModal.md` / `references/showImages.md` / `references/showDrawer.md` |
| 确认操作 | `references/confirmPromise.md`（轻量确认）/ `references/Action.md`（按钮+确认） |
| 业务组件化 | `references/useCoverable.md`（→ [设计指南](references/useCoverable-design.md) · [BC编写](references/useCoverable-bc.md) · [消费指南](references/useCoverable-consume.md) · [request.coverable](references/useCoverable-request.md) · [迁移](references/useCoverable-migration.md)） |
| 理解架构 | [architecture.md](architecture.md) |
| 体验规范 / 最佳实践 | [guide.md](guide.md) |
| 使用 Hooks / 工具函数 | [utilities.md](utilities.md) |
| 源码探索 | [source-navigation.md](source-navigation.md) |
| 终端快速查文档 | `npx pro-components list/docs/search` |

## BC 组件（Business Components）

BC 组件是一种**可覆盖配置的复用业务组件**设计模式，核心理念：将完整的业务页面（含 API 调用、权限控制、表格/表单配置）封装为一个组件，通过 `coverable` prop 暴露所有可定制点，让消费方按需覆盖而无需修改源码。

**核心机制：**

- 组件内部使用 `useCoverable` Hook 定义默认配置（API 地址、权限、列定义、枚举等）
- 消费方通过 `<Component coverable={{ ... }}>` 传入覆盖配置
- `useCoverable` 将默认值与覆盖值**深度合并**（对象递归合并、数组按索引合并）
- 组件通过 `getConfig()` 读取最终合并后的配置

**典型场景：**

- 同一套业务逻辑（如用户列表、权限管理）在多个项目中复用，仅 API 地址、权限、部分 UI 有差异
- BC 组件发布为 npm 包（如 `@my-bc/user-manager`），各业务项目引入后通过 `coverable` 定制

**快速示例：**

```tsx
// BC 组件（封装方）
const UserList = useCoverable.component(({ coverable }) => {
  const apis = useCoverable({ getList: request.coverable({ url: '/api/users' }) }, coverable?.apis)
  const permission = useCoverable({ add: true, delete: true }, coverable?.permission)
  return <ProTable onQuery={() => apis.getConfig().getList()} ... />
})

// 消费方 — 只改 API 地址，禁用删除
<UserList coverable={{ apis: { getList: { url: '/v2/users' } }, permission: { delete: false } }} />
```

详细指南：[useCoverable.md](references/useCoverable.md) → [设计](references/useCoverable-design.md) · [BC编写](references/useCoverable-bc.md) · [消费](references/useCoverable-consume.md)

## 推荐实践

- 所有 `import` 统一从 `@fexd/pro-components` 引入，无需分包导入
- ProTable 的 `onQuery` 返回值必须符合 `{ success, data, total? }` 格式
- 表单提交两种方式：`ProForm.useForm()` → `form.validateFields()`（常用），或 `ProForm.useRef()` → `ref.current.getValues()`（带归一化+过滤空值）
- 命令式弹窗 API（`showModal` / `showImages`）优先于声明式；ProTable 内置 CRUD 弹窗除外（已集成在 actions 中）
- `Action` 组件的异步 `onClick` 自动管理 loading 状态，无需手动 `useState`
- 危险操作（删除等）必须使用 `confirm` 属性进行二次确认
- 国际化通过 `<ConfigProvider localeKey="en-US">` 全局配置
- ProTable ref 按**插件分组**（`ref.current.queryField.refresh()`），非扁平结构
- ProTable 控制器（`ProTable.useController()`）提供扁平化常用操作
- ProForm `preserve` 默认 `false`（非旧文档的 `true`）
- ProForm `hook` 可使用 React Hooks，返回 `false` 隐藏字段
- `useCoverableProps` 自动保护 `ref`/`tableRef`/`formRef`，可安全放在配置中
- 非 ref 的特殊对象（SDK 实例、事件总线等）用 `useCoverable.raw(obj)` 标记保护
- React ref（`{ current: ... }` 单键对象）在 coverable 系统中被自动识别，不会被 clone / merge 破坏

## 需求澄清

当用户需求包含以下模糊词时，先给出选型分析和推荐方案，再编码：

- **"表格"** → 静态数据展示？用 `ProTable` + `dataSource`。带查询？加 `onQuery` + `queryFields`（详见 [ProTable-query](references/ProTable-query.md)）。带 CRUD？加 `actions` + `columnActions` + `onAdd/onEdit/onDelete`（详见 [ProTable-crud](references/ProTable-crud.md)）。需要外部控制？用 `ProTable.useRef()` 或 `ProTable.useController()`（详见 [ProTable-ref](references/ProTable-ref.md)）。
- **"表单"** → 简单表单？用 `ProForm` + `fields` 配置（详见 [ProForm-fields](references/ProForm-fields.md)）。复杂布局？用 `render` 属性（详见 [ProForm-layout](references/ProForm-layout.md)）。字段关联？用 `hook` + `dependencies`（详见 [ProForm-advanced](references/ProForm-advanced.md)）。独立字段？用 `ProField`。
- **"弹窗"** → 确认对话？用 `showModal` + `promise`。表单弹窗？`showModal` 嵌套 `Form`。图片预览？用 `showImages`。
- **"按钮"** → 普通按钮用 antd `Button`。需要异步 loading / 确认操作？用 `Action` 组件。
- **"业务组件"** → 需要可配置/可覆盖的封装？用 `useCoverable` Hook。

## CLI 命令

安装 `@fexd/pro-components` 后可通过 CLI 快速查阅文档：

```bash
# 列出所有组件
npx pro-components list

# 查看某个组件/工具的文档
npx pro-components docs ProTable
npx pro-components docs ProForm
npx pro-components docs showModal
npx pro-components docs request

# 全文搜索文档内容
npx pro-components search "queryField"
npx pro-components search "hook dependencies"
```

## Import 规范

```jsx
import {
  ProTable,
  ProForm,
  ProField,
  ConfigProvider,
  showModal,
  showImages,
  Action,
  useCoverable,
  useDebounce,
  useAutoLoading,
  createBC,
} from '@fexd/pro-components'
```

样式引入：

```less
@import '~@fexd/pro-components/es/style.less';
```

## 多步骤任务

**搭建表格管理页面：**

1. 确认数据结构和字段 → 定义 `columns` 配置
2. 确认查询需求 → 配置 `queryFields` 或在 columns 中设置 `queryField: true`
3. 确认操作需求 → 配置 `actions`、`columnActions`、`batchActions`
4. 实现数据接口 → `onQuery` 返回 `{ success, data, total }`
5. 实现 CRUD → `onAdd`、`onEdit`、`onDelete` 回调

**搭建表单页面：**

1. 确认字段列表和类型 → 定义 `fields` 配置
2. 确认布局 → `gridColumns` 或 `render` 自定义布局
3. 获取表单实例 → `const [form] = ProForm.useForm()`
4. 提交逻辑 → `await form.validateFields()` → 调接口
5. 模式切换 → `mode="edit"` / `mode="view"`

## 分类概览 → [catalog.md](catalog.md)

| 分类     | 导出                                      | 典型组件                        |
| -------- | ----------------------------------------- | ------------------------------- |
| 数据展示 | ProTable                                  | 表格、查询、CRUD、插件系统      |
| 表单     | ProForm, ProField                         | 配置化表单、字段组件、Grid 布局 |
| 全局配置 | ConfigProvider                            | 国际化、尺寸、文案定制          |
| 工具组件 | Action, showModal, showImages             | 操作按钮、命令式弹窗、图片预览  |
| Hooks    | useCoverable, useDebounce, useAutoLoading | 业务组件化、防抖、加载状态      |
| 基础     | createBC                                  | BC 组件创建工厂                 |

## 回复前自检

生成 @fexd/pro-components 相关代码后，检查：

1. **Import 正确**：从 `@fexd/pro-components` 统一导入
2. **响应格式**：`onQuery` / `onAdd` / `onEdit` / `onDelete` 返回 `{ success, data?, total?, message? }`
3. **命令式优先**：弹窗用 `showModal`，图片预览用 `showImages`
4. **确认操作**：删除等危险操作配置了 `confirm`
5. **类型匹配**：字段 `type` 与数据类型匹配
6. **占位文案**：所有表单字段提供明确的 `placeholder`
7. **Ref 结构**：ProTable ref 是按插件分组的对象（`ref.current.queryField.refresh()`），不要写 `ref.current.refresh()`
8. **默认值准确**：`refreshAfterEdit` 默认 `true`（非 `false`）；`preserve` 默认 `false`（非 `true`）
9. **hook 用法**：`hook` 返回对象可修改除 `name` 外的所有配置，返回 `false` 隐藏字段
10. **columns 继承**：`editField: true` / `queryField: true` 从 column 继承 label/name/type/options
11. **Ref 安全**：在 `useCoverableProps` 中传 `ref`/`tableRef`/`formRef` 是安全的（自动提取），非 ref 特殊对象用 `useCoverable.raw()` 保护
