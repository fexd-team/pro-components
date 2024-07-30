---
title: 模拟数据
order: 8
---

# 模拟数据 <Badge type="warning">0.2.56+</Badge>

表格内置了 [mock-js](http://mockjs.com/) 生成模拟数据的功能，可通过 `mockDataSource={true}` 来启用该功能

需要配合 `columns` 属性使用，表格会根据 `column` 的类型来生成不同类型的模拟数据

```jsx | pure
import { ProTable } from '@fexd/pro-components'
export default () => (
  <ProTable
    mockDataSource
    columns={[
      {
        label: '文本',
        name: 'text',
      },
      {
        label: '选择',
        name: 'select',
        type: 'select',
      },
      {
        label: '图片',
        name: 'image',
        type: 'image',
      },
    ]}
  />
)
```

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'

export default () => (
  <ProTable
    mockDataSource
    columns={[
      {
        label: '文本',
        name: 'text',
      },
      {
        label: '选择',
        name: 'select',
        type: 'select',
      },
      {
        label: '图片',
        name: 'image',
        type: 'image',
      },
    ]}
    fixColumnActions
    columnActions={['view', 'edit']}
  />
)
```

## 配置 mock 数据量

通过给 `mockDataSource` 传递 `number` 数字类型来定义数据量，不传递的话默认是随机 51 ~ 251 条数据

如 `mockDataSource={2}` 为创建 2 条数据

```jsx | pure
import { ProTable } from '@fexd/pro-components'
export default () => (
  <ProTable
    mockDataSource={2}
    columns={[
      {
        label: '名称',
        name: 'text',
      },
    ]}
  />
)
```

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'

export default () => (
  <ProTable
    mockDataSource={2}
    columns={[
      {
        label: '名称',
        name: 'text',
      },
    ]}
  />
)
```

## 配置特定 column 的模拟数据规则

通过 `column.mock` 字段调整模拟数据的生成规则

其中，`mock` 函数的类型如下：

```ts
type MockProp = (options: { Random: typeof import('mock-js').Random; viewField: ProTableEditFieldType<R> }) => any
```

```jsx | pure
import { ProTable } from '@fexd/pro-components'
export default () => (
  <ProTable
    mockDataSource={2}
    columns={[
      {
        label: '中文名',
        name: 'text',
        mock: ({ Random }) => Random.cname(),
      },
    ]}
  />
)
```

```tsx
import { ProTable } from '@fexd/pro-components'
export default () => (
  <ProTable
    mockDataSource={2}
    columns={[
      {
        label: '中文名',
        name: 'text',
        mock: ({ Random }) => Random.cname(),
      },
    ]}
  />
)
```

具体 `Random` 功能是使用可参考此处文档 https://github.com/nuysoft/Mock/wiki

## 全部类型的模拟数据预览

```tsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { builtInMock } from '@fexd/pro-table/src/plugins/queryField/useMockDataSource'

const {
  // image, // image 的懒加载有样式问题，单独拿出来摆最前边，免得破坏视图效果
  ...rest_builtInMock
} = builtInMock

export default () => (
  <ProTable
    bordered
    size="small"
    mockDataSource
    columns={[...Object.keys(rest_builtInMock)].map((key) => ({
      label: key,
      name: key,
      type: key,
      viewField: {
        hook: ({ item }) => ({
          options: [item?.[key]],
        }),
      },
      onCell: () => ({
        style: {
          maxWidth: 200,
        },
      }),
      editField: true,
    }))}
    fixColumnActions
    columnActions={['view', 'table-edit']}
  />
)
```

```jsx
/**
 * inline: true
 */
import React from 'react'
import { RuleDemos } from '@docs/components'

export default () => (
  <RuleDemos
    demoNamePrefix="参考"
    demos={[
      {
        name: 'MockJs 官网',
        link: 'http://mockjs.com/',
      },
    ]}
  />
)
```
