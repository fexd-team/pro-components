---
title: 业务组件化
order: 9
toc: false
contentMaxWidth: 100%
---

# defineCoverableProps

```tsx
/**
 * inline: true
 */

import * as React from 'react'
import Playground from '@docs/components/Playground'

export default function Demo() {
  const initialFiles = [
    {
      code: require('!raw-loader?esModule=false!./demos/defineCoverableProps/config.tsx'),
      filename: 'config.jsx',
    },
    {
      code: require('!raw-loader?esModule=false!./demos/defineCoverableProps/CoverableTable.tsx'),
      filename: 'CoverableTable.jsx',
    },
    {
      code: require('!raw-loader?esModule=false!./demos/defineCoverableProps/data.tsx'),
      filename: 'data.js',
    },
  ]

  return <Playground initialFiles={initialFiles} persistKey="pro-table-coverable" />
}
```
