---
title: dayjsTZ - 时区安全
order: 10
---

# dayjsTZ 时区安全的 dayjs

解决前后端时区不一致的核心工具。`dayjsTZ` 是 dayjs 的时区感知包装，所有 ProForm / ProField 的时间类字段（date、dateTime、time、fromNow 等）内部均使用 `dayjsTZ`。

## 为什么需要

当用户浏览器时区与后端服务器时区不一致时：

| 场景              | 不用 dayjsTZ         | 用 dayjsTZ             |
| ----------------- | -------------------- | ---------------------- |
| 用户选择 2/1      | 传**东八区**的时间戳 | 传**后端时区**的时间戳 |
| 后端(东七区) 收到 | 识别为 1/31 23:00 ❌ | 识别为 2/1 00:00 ✅    |
| 用户看到的数据    | 1/31（错误）         | 2/1（正确）            |

## 在线演示

<code src="./demos/dayjsTZ-demo.tsx"></code>

## API

```tsx | pure
import { dayjsTZ } from '@fexd/pro-components'
```

### 基础用法

```tsx | pure
const now = dayjsTZ()
const parsed = dayjsTZ('2024-01-01 12:00:00')
const formatted = dayjsTZ().format('YYYY-MM-DD HH:mm:ss')
```

### 设置默认时区

```tsx | pure
dayjsTZ.setDefault('Etc/GMT-7') // 东七区
dayjsTZ.setDefault('Asia/Jakarta') // 雅加达时区
dayjsTZ.setDefault('Asia/Shanghai') // 上海时区
dayjsTZ.setDefault() // 恢复浏览器本地时区
```

> 设置后，所有 ProField 时间类字段的输入 / 展示会自动适配该时区。

### 时区转换

```tsx | pure
const jakartaTime = dayjsTZ('2024-06-01 08:00:00').tz('Asia/Jakarta')
const shanghaiTime = dayjsTZ('2024-06-01 08:00:00').tz('Asia/Shanghai')
```

## 内置插件

`dayjsTZ` 已预装以下 dayjs 插件，无需重复引入：

| 插件              | 说明              |
| ----------------- | ----------------- |
| utc               | UTC 模式          |
| timezone          | 时区支持          |
| relativeTime      | 相对时间（3天前） |
| advancedFormat    | 高级格式化        |
| weekOfYear        | 年中第几周        |
| customParseFormat | 自定义解析格式    |

## 内置 Locale

支持语言：`zh-cn`、`en`、`id`（印尼）、`ms-my`（马来西亚）

```tsx | pure
dayjsTZ().locale('zh-cn').fromNow() // "3 天前"
dayjsTZ().locale('en').fromNow() // "3 days ago"
dayjsTZ().locale('id').fromNow() // "3 hari yang lalu"
```

## 典型场景

### 应用初始化时设置时区

```tsx | pure
import { dayjsTZ } from '@fexd/pro-components'

const initApp = async () => {
  const config = await fetchAppConfig()
  dayjsTZ.setDefault(config.timezone)
}
```

### 与 ProTable 时间列配合

```tsx | pure
// ProTable 的 dateTime 类字段自动使用 dayjsTZ
const columns = {
  创建时间: { label: '创建时间', name: 'createdAt', type: 'dateTime' },
  更新时间: { label: '更新时间', name: 'updatedAt', type: 'fromNow' },
}
```

### 手动格式化展示

```tsx | pure
const formatTime = (timestamp: string) => {
  return dayjsTZ(timestamp).format('YYYY-MM-DD HH:mm:ss')
}
```

## 源码位置

`packages/utils/src/utils/dayjsTZ.tsx`
