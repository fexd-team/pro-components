# @fexd/pro-components

React 管理系统组件库，基于 Ant Design 4.x，提供 ProTable、ProForm、ProField 等核心组件和丰富的工具函数。

## 快速开始

```jsx
import { ProTable, ProForm, showModal } from '@fexd/pro-components'
```

```less
@import '~@fexd/pro-components/es/style.less';
```

## 详细文档

完整 AI 文档位于 `skills/fexd-pro-components/` 目录：

| 文件                                                                    | 内容                                     |
| ----------------------------------------------------------------------- | ---------------------------------------- |
| [SKILL.md](skills/fexd-pro-components/SKILL.md)                         | 主入口、任务路由、推荐实践               |
| [catalog.md](skills/fexd-pro-components/catalog.md)                     | 组件与工具的完整分类目录                 |
| [references/\*.md](skills/fexd-pro-components/references/)              | 每个组件/工具的详细用法、Props、代码示例 |
| [architecture.md](skills/fexd-pro-components/architecture.md)           | 架构设计、插件系统、组件关系             |
| [guide.md](skills/fexd-pro-components/guide.md)                         | 体验规范、设计原则、最佳实践             |
| [utilities.md](skills/fexd-pro-components/utilities.md)                 | Hooks 和工具函数总览                     |
| [source-navigation.md](skills/fexd-pro-components/source-navigation.md) | 源码导航指南                             |

## 组件文档

每个组件的详细文档在 `skills/fexd-pro-components/references/` 目录：

```
skills/fexd-pro-components/references/ProTable.md       # 表格组件
skills/fexd-pro-components/references/ProForm.md        # 表单组件
skills/fexd-pro-components/references/ProField.md       # 字段组件
skills/fexd-pro-components/references/ConfigProvider.md  # 全局配置
skills/fexd-pro-components/references/showModal.md      # 命令式弹窗
skills/fexd-pro-components/references/showImages.md     # 图片预览
skills/fexd-pro-components/references/Action.md         # 操作按钮
skills/fexd-pro-components/references/useCoverable.md   # 业务组件化
skills/fexd-pro-components/references/useDebounce.md    # 防抖 Hook
skills/fexd-pro-components/references/useAutoLoading.md # 加载状态 Hook
```

## 源码导航

npm 包含完整源码，可直接读取详细信息：

```
node_modules/@fexd/pro-components/src/
├── index.tsx        # 聚合入口
└── createBC/        # BC 组件工厂

# 依赖包源码
node_modules/@fexd/pro-table/src/     # ProTable 实现
node_modules/@fexd/pro-form/src/      # ProForm + ProField 实现
node_modules/@fexd/pro-utils/src/     # 工具函数和 Hooks
node_modules/@fexd/pro-provider/src/  # ConfigProvider 实现
```
