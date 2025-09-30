# Utils 工具模块

## 何时使用

Utils 提供了一系列实用的工具函数和 Hooks，用于简化业务开发：

- 🔧 **useCoverable**：业务组件化 Hook，用于快速创建可配置的业务组件
- 🖼️ **showImages**：命令式图片预览工具，支持多图片轮播查看
- 📱 **showModal**：命令式弹窗工具，支持可拖拽模态框
- 🎨 **Action**：通用操作按钮组件，集成加载状态和确认逻辑
- 🔄 **useDebounce**：防抖 Hook，优化用户输入体验
- ⏰ **useAutoLoading**：自动加载状态管理 Hook

## API

### useCoverable

业务组件化 Hook，用于创建可配置的组件实例。

```typescript
const useCoverable = <T extends Record<string, any>>(defaultProps: T, options?: CoverableOptions) => {
  return {
    props: T & CoverableProps,
    Component: React.ComponentType<T>,
  }
}

interface CoverableOptions {
  name?: string
  displayName?: string
}

interface CoverableProps {
  coverable?: boolean
  coverableProps?: Partial<T>
}
```

**参数说明：**

| 参数         | 说明         | 类型             | 默认值 |
| ------------ | ------------ | ---------------- | ------ |
| defaultProps | 默认属性配置 | T                | -      |
| options      | 可选配置     | CoverableOptions | -      |

### showImages

命令式图片预览工具。

```typescript
const showImages = (
  images: string[],
  options?: ShowImagesOptions
) => {
  return {
    promise: Promise<void>,
    close: () => void
  }
}

interface ShowImagesOptions {
  current?: number
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}
```

**参数说明：**

| 参数    | 说明         | 类型              | 默认值 |
| ------- | ------------ | ----------------- | ------ |
| images  | 图片地址数组 | string[]          | -      |
| options | 预览配置     | ShowImagesOptions | -      |

### showModal

命令式模态框工具。

```typescript
const showModal = (
  content: React.ReactNode,
  options?: ShowModalOptions
) => {
  return {
    promise: Promise<any>,
    close: (result?: any) => void,
    update: (newContent: React.ReactNode) => void
  }
}

interface ShowModalOptions {
  title?: React.ReactNode
  width?: number
  draggable?: boolean
  maskClosable?: boolean
  onOk?: () => void | Promise<void>
  onCancel?: () => void
}
```

**参数说明：**

| 参数    | 说明     | 类型             | 默认值 |
| ------- | -------- | ---------------- | ------ |
| content | 弹窗内容 | React.ReactNode  | -      |
| options | 弹窗配置 | ShowModalOptions | -      |

### Action

通用操作按钮组件。

```typescript
interface ActionProps {
  loading?: boolean
  confirm?: boolean | string
  confirmTitle?: string
  onClick?: () => void | Promise<void>
  children?: React.ReactNode
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  danger?: boolean
  disabled?: boolean
}
```

**属性说明：**

| 属性         | 说明                         | 类型                                                   | 默认值     |
| ------------ | ---------------------------- | ------------------------------------------------------ | ---------- |
| loading      | 是否显示加载状态             | boolean                                                | false      |
| confirm      | 是否需要确认，可传入确认文案 | boolean \| string                                      | false      |
| confirmTitle | 确认弹窗标题                 | string                                                 | '确认操作' |
| onClick      | 点击回调，支持异步操作       | () => void \| Promise<void>                            | -          |
| type         | 按钮类型                     | 'primary' \| 'default' \| 'dashed' \| 'text' \| 'link' | 'default'  |
| danger       | 是否为危险按钮               | boolean                                                | false      |
| disabled     | 是否禁用                     | boolean                                                | false      |

### useDebounce

防抖 Hook。

```typescript
const useDebounce = <T>(value: T, delay: number) => T
```

**参数说明：**

| 参数  | 说明             | 类型   | 默认值 |
| ----- | ---------------- | ------ | ------ |
| value | 需要防抖的值     | T      | -      |
| delay | 延迟时间（毫秒） | number | -      |

### useAutoLoading

自动加载状态管理 Hook。

```typescript
const useAutoLoading = <T extends (...args: any[]) => Promise<any>>(asyncFunction: T) => {
  return {
    loading: boolean,
    run: T,
    runAsync: T,
  }
}
```

**参数说明：**

| 参数          | 说明     | 类型                             | 默认值 |
| ------------- | -------- | -------------------------------- | ------ |
| asyncFunction | 异步函数 | (...args: any[]) => Promise<any> | -      |

**返回值：**

| 属性     | 说明                       | 类型    |
| -------- | -------------------------- | ------- |
| loading  | 加载状态                   | boolean |
| run      | 执行函数（不返回 Promise） | T       |
| runAsync | 执行函数（返回 Promise）   | T       |
