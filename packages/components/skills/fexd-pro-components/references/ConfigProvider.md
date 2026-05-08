---
name: ConfigProvider
description: 全局配置组件，提供国际化、主题、尺寸等全局配置功能
---

# ConfigProvider 全局配置

## 何时使用

- 需要国际化配置（多语言切换）
- 全局控制组件尺寸
- 自定义组件内部文案

## API

| 属性      | 说明            | 类型                                                | 默认值  |
| --------- | --------------- | --------------------------------------------------- | ------- |
| localeKey | 快捷国际化配置  | 'zh-CN' \| 'en-US' \| 'id-ID' \| 'ms_MY' \| 'th-TH' | 'zh-CN' |
| size      | 全局组件尺寸    | 'large' \| 'middle' \| 'small'                      | 'large' |
| proLocale | 自定义文案配置  | ProLocale                                           | -       |
| locale    | antd 国际化配置 | Locale                                              | -       |

## ProLocale 文案结构

```typescript
interface ProLocale {
  table?: {
    actions?: {
      multipleDeleteConfirm?: (count: number) => string
      multipleDelete?: string
      deleteConfirm?: string
      delete?: string
      refreshTip?: string
    }
    editField?: { add?: string; details?: string; edit?: string; saveTips?: string }
    queryField?: { query?: string; reset?: string; fold?: string; more?: string }
    modal?: { confirm?: string; okText?: string; cancelText?: string }
    table?: {
      selectionTips?: (count: number) => string
      deselect?: string
      inverse?: string
      action?: string
      totalDataCount?: (total: number) => string
      edit?: string
      save?: string
      cancel?: string
      density?: string
      densityLarger?: string
      densityMiddle?: string
      densitySmall?: string
      index?: string
    }
    valueType?: {
      inputPassword?: string
      inputContent?: string
      chooseContent?: string
      startTime?: string
      endTime?: string
    }
  }
}
```

## 代码示例

### 基础用法（英文）

```tsx
import { ConfigProvider, ProTable } from '@fexd/pro-components'

export default () => (
  <ConfigProvider localeKey="en-US">
    <ProTable ... />
  </ConfigProvider>
)
```

### 小尺寸

```tsx
<ConfigProvider size="small">
  <ProTable ... />
</ConfigProvider>
```

### 自定义文案

```tsx
<ConfigProvider
  proLocale={{
    table: {
      actions: { delete: '移除', deleteConfirm: '确认移除吗？' },
      queryField: { query: '搜索', reset: '清空' },
    },
  }}
>
  <ProTable ... />
</ConfigProvider>
```

### 组合 antd locale

```tsx
import enUS from 'antd/lib/locale/en_US'
;<ConfigProvider localeKey="en-US" locale={enUS}>
  <App />
</ConfigProvider>
```

## 支持的语言

| localeKey     | 语言     |
| ------------- | -------- |
| zh-CN / zh_CN | 简体中文 |
| en-US / en_US | 英文     |
| id-ID / id_ID | 印尼语   |
| ms_MY         | 马来语   |
| th-TH / th_TH | 泰语     |
