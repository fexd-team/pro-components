---
title: 业务组件化
order: 6
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
      code: require('!raw-loader?esModule=false!./demos/defineCoverableProps/CoverableForm.tsx'),
      filename: 'CoverableForm.jsx',
    },
  ]

  return <Playground initialFiles={initialFiles} persistKey="pro-form-coverable" />
}
```
