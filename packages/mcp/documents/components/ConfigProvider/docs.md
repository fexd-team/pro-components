# ConfigProvider 全局配置组件

## 何时使用

ConfigProvider 提供全局配置功能，用于统一管理应用的国际化、主题、尺寸等配置：

- 🌍 **国际化支持**：快捷配置多语言，支持中文、英文、印尼文、马来文
- 📏 **尺寸配置**：全局控制组件尺寸，支持 large、middle、small 三种尺寸
- 🎨 **文案自定义**：支持自定义组件内部文案，满足个性化需求
- 🔧 **样式主题**：继承 antd ConfigProvider 的所有功能

## API

### ConfigProvider

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| localeKey | 快捷国际化配置 | 'zh-CN' \| 'zh_CN' \| 'en-US' \| 'en_US' \| 'id-ID' \| 'id_ID' \| 'ms_MY' \| 'th-TH' \| 'th_TH' | 'zh-CN' |
| size | 全局组件尺寸 | 'large' \| 'middle' \| 'small' | 'large' |
| proLocale | 自定义文案配置 | ProLocale | - |
| locale | antd 国际化配置 | Locale | - |

### ProLocale 文案配置

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
    editField?: {
      add?: string
      details?: string
      edit?: string
      saveTips?: string
    }
    queryField?: {
      query?: string
      reset?: string
      fold?: string
      more?: string
    }
    modal?: {
      confirm?: string
      okText?: string
      cancelText?: string
    }
    table?: {
      selectionTips?: (count: number) => string
      deselect?: string
      inverse?: string
      action?: string
      totalDataCount?: (total: number) => string
      edit?: string
      save?: string
      cancel?: string
      cancelConfirm?: string
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

## 使用示例

### 基础用法

```jsx
import { ConfigProvider, ProTable } from '@fexd/pro-components'

export default () => (
  <ConfigProvider localeKey="en-US">
    <ProTable />
  </ConfigProvider>
)
```

### 小尺寸配置

```jsx
import { ConfigProvider, ProTable } from '@fexd/pro-components'

export default () => (
  <ConfigProvider size="small">
    <ProTable />
  </ConfigProvider>
)
```

### 自定义文案

```jsx
import { ConfigProvider, ProTable } from '@fexd/pro-components'

export default () => (
  <ConfigProvider
    proLocale={{
      table: {
        actions: {
          delete: '移除',
          deleteConfirm: '确认移除吗？',
        },
      },
    }}
  >
    <ProTable />
  </ConfigProvider>
)
```
