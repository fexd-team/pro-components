# 组件与工具目录

@fexd/pro-components 的完整导出按功能分为以下几大类。

## 数据展示

| 导出 | 说明 | 何时使用 | 参考文档 |
| --- | --- | --- | --- |
| ProTable | 插件化表格组件，集成数据展示、查询、CRUD、插件系统 | 数据管理页面、列表页、需要查询/编辑的表格 | [ProTable.md](references/ProTable.md)（[Ref](references/ProTable-ref.md) · [Query](references/ProTable-query.md) · [CRUD](references/ProTable-crud.md) · [Actions](references/ProTable-actions.md) · [Plugins](references/ProTable-plugins.md)） |

## 表单

| 导出 | 说明 | 何时使用 | 参考文档 |
| --- | --- | --- | --- |
| ProForm | 配置化表单组件，内置 Grid 布局和丰富字段类型 | 快速生成表单、复杂布局、编辑/只读切换 | [ProForm.md](references/ProForm.md)（[Ref](references/ProForm-ref.md) · [Fields](references/ProForm-fields.md) · [Layout](references/ProForm-layout.md) · [Advanced](references/ProForm-advanced.md)） |
| ProField | 字段组件，可独立使用，支持编辑/查看双模式 | 独立字段渲染、不依赖表单的字段展示 | [ProField.md](references/ProField.md) |

## 全局配置

| 导出 | 说明 | 何时使用 | 参考文档 |
| --- | --- | --- | --- |
| ConfigProvider | 全局配置组件，国际化、主题、尺寸 | 多语言、全局尺寸、自定义文案 | [ConfigProvider.md](references/ConfigProvider.md) |

## 工具组件

| 导出 | 说明 | 何时使用 | 参考文档 |
| --- | --- | --- | --- |
| Action | 增强按钮组件，自动 loading + 确认操作 | 异步操作按钮、危险操作确认 | [Action.md](references/Action.md) |
| showModal | 命令式弹窗，支持拖拽、Promise | 确认对话、表单弹窗、详情查看 | [showModal.md](references/showModal.md) |
| showImages | 命令式图片预览，多图轮播 | 单图/多图预览、画廊 | [showImages.md](references/showImages.md) |
| showDrawer | 命令式抽屉组件 | 侧边面板展示 | [showDrawer.md](references/showDrawer.md) |
| Button | 增强按钮，内置防抖 loading | 基础按钮场景 | [Button.md](references/Button.md) |
| confirmPromise | 确认框 Promise | 确认后执行操作 | [confirmPromise.md](references/confirmPromise.md) |
| Popconfirm | 气泡确认框 | 轻量确认操作 | - |
| Switch | 开关组件 | 开关切换 | - |
| Tooltip | 文字提示 | 悬浮提示 | - |
| EllipsisTooltip | 超出省略 + 提示 | 长文本截断 | [EllipsisTooltip.md](references/EllipsisTooltip.md) |
| Grid | 栅格组件 | 自定义布局 | - |
| Portal | 传送门组件 | DOM 挂载到指定位置 | - |
| ErrorBoundary | 错误边界 | 组件错误捕获 | - |
| PreviewImageGroup | 图片预览组 | 一组图片的声明式预览 | - |

## Hooks

| 导出 | 说明 | 何时使用 | 参考文档 |
| --- | --- | --- | --- |
| useCoverable | 业务组件化 Hook，可覆盖配置体系 | 创建可跨项目复用的业务组件（BC包） | [useCoverable.md](references/useCoverable.md)（→ [设计指南](references/useCoverable-design.md) · [BC编写](references/useCoverable-bc.md) · [消费指南](references/useCoverable-consume.md) · [request.coverable](references/useCoverable-request.md) · [迁移](references/useCoverable-migration.md)） |
| useDebounce | 防抖 Hook | 搜索输入、API 调用优化 | [useDebounce.md](references/useDebounce.md) |
| useAutoLoading | 自动管理异步加载状态 | 异步操作的 loading 管理 | [useAutoLoading.md](references/useAutoLoading.md) |
| useRequest | 请求 Hook（来自 ahooks） | 数据请求与缓存 | - |
| useProState | 增强 state Hook | 组件状态管理 | - |
| useThrottle | 节流 Hook | 滚动/resize 等高频事件 | - |
| useForceUpdate | 强制更新 Hook | 需要手动触发重渲染 | - |
| useLazyRender | 懒渲染 Hook | 延迟渲染优化 | - |

## 工具函数

| 导出                   | 说明                                 | 何时使用       |
| ---------------------- | ------------------------------------ | -------------- | ----------------------------------- |
| request / defineApi    | 请求工具，支持缓存和配置化           | HTTP 请求封装  | [request.md](references/request.md) |
| deepMerge              | 深度合并对象                         | 配置合并       |
| catchPromise           | Promise 异常捕获，返回 [error, data] | 简化 try/catch |
| createSharedHook       | 创建共享 Hook                        | 跨组件共享状态 |
| dayjsTZ                | 带时区的 dayjs                       | 时区处理       |
| filterObjectEmptyValue | 过滤空值                             | 请求参数清理   |

## 基础工厂

| 导出            | 说明        | 何时使用           |
| --------------- | ----------- | ------------------ |
| createBC        | BC 组件工厂 | 创建标准化业务组件 |
| useConfigurable | 配置化 Hook | 组件配置管理       |

## 国际化

内置语言包：`zh-CN`、`en-US`、`id-ID`、`ms_MY`、`th-TH`。通过 `ConfigProvider` 的 `localeKey` 切换。
