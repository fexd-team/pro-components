---
nav: 体验规范
order: 100
---

# 时区问题

当后端服务器时区与客户端时区不一致时，可能会产生时区问题

如：

- 用户想查询 2 月 1 日的数据
- 前端传递的时间戳为东八区 2023-02-01 00:00:00
- 后端所在服务器为东七区，会认为此时间戳是 2023-01-31 23:00:00，所以查询了 1 月 31 日的数据
- 用户看到的是 1 月 31 日的数据

在 `pro-components` 中内置了 `dayjsTZ` 时区相关的控制器，可替代 `dayjs` 处理大部分时区问题

```jsx | pure
import { dayjsTZ } from '@fexd/pro-components'

// 将
dayjs()
// 替换为
dayjsTZ()
```

另外，`pro-components` 中的所有时间相关控件的输入和展示，都遵循 `dayjsTZ` 时区控制，使用 `dayjsTZ.setDefault` 调整时区后，各时间相关控件将自动适配时区

```jsx | pure
dayjsTZ.setDefault('Etc/GMT-7') // 调整为东七区
```

```jsx
/**
 * inline: true
 */
import React from 'react'
import { dayjsTZ } from '@fexd/pro-components'
window.dayjsTZ = dayjsTZ
export default () => null
```

经过了时区处理后，案例中的流程如下：

- 用户想查询 2 月 1 日的数据
- 前端传递的时间戳为东八区 2023-02-01 00:00:00，通过时区转换为东七区 2023-02-01 00:00:00
- 后端所在服务器为东七区，查询了 2 月 1 日的数据
- 用户看到的是 2 月 1 日的数据

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message } from 'antd'
import { t, ProTable, ConfigProvider, ProField } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'

export default () => (
  <RuleDemos
    demoNamePrefix="文档"
    demos={[
      {
        name: 'dayjs 时区文档',
        link: 'https://dayjs.fenxianglu.cn/category/timezone.html',
        // defaultShow: true,
      },
      {
        name: '时区名称列表（“TZ database name” 一列）',
        link: 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List',
      },
    ]}
  />
)
```
