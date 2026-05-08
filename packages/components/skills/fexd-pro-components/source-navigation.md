# 源码导航

npm 包含完整源码，当组件文档不够详尽时可直接在 `node_modules` 中读取源码补充。

## 源码结构

```
node_modules/@fexd/pro-components/
├── src/
│   ├── index.tsx              # 聚合入口（re-export 所有子包）
│   └── createBC/              # BC 组件工厂
│       ├── index.tsx
│       ├── createLegacyBC.tsx
│       ├── createNextBC.tsx
│       └── configurable.tsx

node_modules/@fexd/pro-table/
├── src/
│   ├── index.tsx              # ProTable 入口
│   ├── ProTable/              # 主组件
│   ├── plugins/               # 插件目录
│   │   ├── queryField/        # 查询表单插件
│   │   ├── editField/         # 编辑表单插件
│   │   ├── actions/           # 动作插件
│   │   ├── valueType/         # 字段类型插件
│   │   └── locale/            # 国际化插件
│   └── types/                 # 类型定义

node_modules/@fexd/pro-form/
├── src/
│   ├── index.tsx              # ProForm + ProField 入口
│   ├── ProForm/               # 表单组件
│   ├── ProField/              # 字段组件
│   └── valueTypes/            # 字段类型实现

node_modules/@fexd/pro-utils/
├── src/
│   ├── index.tsx              # 入口
│   ├── hooks/                 # 所有 Hooks
│   │   ├── _useCoverable/     # useCoverable 实现
│   │   └── ...
│   ├── components/            # 工具组件
│   │   ├── showModal/
│   │   ├── showImages/
│   │   ├── Action/
│   │   └── ...
│   ├── utils/                 # 工具函数
│   │   ├── request/           # 请求工具
│   │   ├── deepMerge.tsx
│   │   └── ...
│   └── i18n/                  # 国际化
│       ├── zh-CN/
│       ├── en-US/
│       └── ...

node_modules/@fexd/pro-provider/
├── src/
│   ├── index.tsx              # ConfigProvider 入口
│   ├── ConfigProvider.tsx
│   └── context.tsx            # ProConfigContext
```

## 查找技巧

### 查找组件 Props 类型

每个组件的 Props 类型通常定义在组件同级目录下：

- `types.ts` 或 `type.tsx` — 类型定义文件
- `index.tsx` — 导出入口

### 查找 ValueType 实现

字段类型渲染器在 `@fexd/pro-form/src/valueTypes/` 目录下，按类型名命名。

### 查找插件实现

ProTable 的插件在 `@fexd/pro-table/src/plugins/` 目录下，每个插件一个子目录。

### 查找国际化文案

语言包在 `@fexd/pro-utils/src/i18n/{locale}/` 目录下，JSON 格式。
