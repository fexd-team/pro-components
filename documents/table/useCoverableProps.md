---
title: 业务组件化
order: 9
toc: false
contentMaxWidth: 100%
---

# useCoverableProps

```tsx
/**
 * inline: true
 */

import * as React from 'react'
import Playground from '@docs/components/Playground'

export default function Demo() {
  const initialFiles = [
    {
      code: require('!raw-loader?esModule=false!./demos/useCoverableProps/config.tsx'),
      filename: 'config.jsx',
    },
    {
      code: require('!raw-loader?esModule=false!./demos/useCoverableProps/CoverableTable.tsx'),
      filename: 'CoverableTable.jsx',
    },
    {
      code: require('!raw-loader?esModule=false!./demos/useCoverableProps/data.tsx'),
      filename: 'data.js',
    },
  ]

  return <Playground initialFiles={initialFiles} persistKey="pro-table-coverable" />
}
```
