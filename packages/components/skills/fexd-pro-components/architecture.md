# 架构设计

## 包结构

@fexd/pro-components 是一个 monorepo 聚合包，由以下子包组成：

```
@fexd/pro-components    ← 聚合入口，re-export 所有子包
├── @fexd/pro-table     ← ProTable 表格组件
├── @fexd/pro-form      ← ProForm 表单 + ProField 字段
├── @fexd/pro-utils     ← Hooks、工具组件、工具函数、i18n
└── @fexd/pro-provider  ← ConfigProvider 全局配置
```

用户只需安装 `@fexd/pro-components`，所有子包的导出都会通过聚合入口暴露。

## ProTable 插件系统

ProTable 基于插件系统构建，所有功能模块化：

```
ProTable
├── queryField 插件    → 查询表单
├── editField 插件     → 编辑表单（弹窗/行内）
├── table 插件         → 表格核心
├── valueType 插件     → 字段类型渲染
├── actions 插件       → 动作按钮管理
├── locale 插件        → 国际化
└── modal 插件         → 弹窗管理
```

通过 `createProTable` 可以自定义插件组合。

## ProForm 与 ProField 的关系

```
ProForm（配置化表单容器）
  └── 每个 field 配置 → ProField（字段渲染）
        └── antd 底层组件（Input, Select, DatePicker 等）
```

- ProForm 负责布局（Grid）、验证、数据收集
- ProField 负责单个字段的渲染，支持 edit/view 双模式
- ProField 可独立使用，不依赖 ProForm 上下文

## 响应数据契约

所有 ProTable 回调（onQuery、onAdd、onEdit、onDelete）遵循统一的响应格式：

```typescript
interface ProTableResponse<T = any> {
  success: boolean // 操作是否成功
  data?: T // 返回数据
  total?: number // 分页总数（仅 onQuery）
  message?: any // 提示信息
}
```

## ConfigProvider 上下文

```
<ConfigProvider localeKey="en-US" size="middle">
  └── ProConfigContext（React Context）
        ├── ProTable 读取 locale、size
        ├── ProForm 读取 locale、size
        └── 子组件通过 useProContext() 访问
</ConfigProvider>
```

## useCoverable 组件化模式

useCoverable 提供"默认配置 + 运行时覆盖"的组件化模式：

```
组件作者                         组件使用者
┌───────────────────┐           ┌──────────────────────┐
│ useCoverable({    │           │ <MyComponent          │
│   layout: {...},  │  ──合并→  │   coverable={{         │
│   pagination: {}  │           │     config: { ... }   │
│ })                │           │   }}                  │
└───────────────────┘           │ />                    │
                                └──────────────────────┘
```

核心 API：

- `useCoverable(config)` — 声明默认配置
- `useCoverable.component(fn)` — 包装为带 coverable prop 的组件
- `useCoverable.props({...}).render(fn)` — 连接配置到渲染
- `useCoverable.value({...})` — 自定义合并策略

## 字段类型系统

ProTable、ProForm、ProField 共享统一的字段类型系统（ValueType）：

| 分类 | 类型 |
| --- | --- |
| 输入 | text, password, textarea, digit, money, percent |
| 选择 | select, multipleSelect, cascader, treeSelect, multipleTreeSelect, modalSelect, checkbox, radio, radioButton |
| 日期时间 | date, dateTime, dateWeek, dateMonth, dateQuarter, dateYear, time, fromNow |
| 范围 | dateRange, dateTimeRange, dateWeekRange, dateMonthRange, dateQuarterRange, dateYearRange, timeRange, fromNowRange |
| 其他 | switch, rate, image, upload, slider, transfer |

## createBC 工厂

createBC（Business Component）是创建标准化业务组件的工厂函数，支持 Legacy 和 Next 两种模式：

- `createLegacyBC` — 传统 HOC 模式
- `createNextBC` — 新版 Hook 模式
- `configurable` — 配置化 HOC 包装
