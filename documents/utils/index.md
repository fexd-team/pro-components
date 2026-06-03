---
nav:
  title: 工具
  order: 4

title: 介绍
# contentMaxWidth: 100%
order: 1
---

## 内置工具

`@fexd/pro-components` 提供了丰富的工具函数、Hooks 和命令式组件，全部通过统一入口导出。

### 🖥️ CLI

| 文档              | 说明                                 |
| ----------------- | ------------------------------------ |
| [CLI](/utils/cli) | 终端查文档、搜索用法、安装 AI Skills |

### 🤖 AI Skills

| 文档                          | 说明                                     |
| ----------------------------- | ---------------------------------------- |
| [AI Skills](/utils/ai-skills) | 让 AI 编辑器理解组件库的 Skills 配置指南 |

### 🧩 命令式组件

| 工具                             | 说明                                     |
| -------------------------------- | ---------------------------------------- |
| [showModal](/utils/show-modal)   | 命令式弹窗，支持拖拽、Promise、动态更新  |
| [showDrawer](/utils/show-drawer) | 命令式抽屉，侧边面板展示                 |
| [showImages](/utils/show-images) | 命令式图片预览                           |
| [Action](/utils/action)          | 自动 loading 的操作按钮 + confirmPromise |

### 🪝 Hooks

| Hook                                         | 说明                               |
| -------------------------------------------- | ---------------------------------- |
| [useCoverable](/utils/use-coverable)         | 业务组件化核心 Hook                |
| [useProState](/utils/use-pro-state)          | 跨组件同步 + 持久化 + 对象自动合并 |
| [useDebounce / useAutoLoading](/utils/hooks) | 防抖与自动 loading                 |

### 🌍 i18n 国际化

| 工具                | 说明                                      |
| ------------------- | ----------------------------------------- |
| [i18n](/utils/i18n) | 全局翻译实例、React 集成、数字/JSX 格式化 |

### 🔧 工具函数

| 工具                                  | 说明                                       |
| ------------------------------------- | ------------------------------------------ |
| [request / defineApi](/utils/request) | 请求工具与 API 定义                        |
| [dayjsTZ](/utils/dayjs-tz)            | 时区安全的 dayjs 包装                      |
| [更多工具](/utils/more-utils)         | deepMerge / diffArray / coloringOptions 等 |
