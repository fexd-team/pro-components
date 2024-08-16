---
title: 业务组件化
order: 6
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
      code: require('!raw-loader?esModule=false!./demos/useCoverableProps/CoverableForm.tsx'),
      filename: 'CoverableForm.jsx',
    },
  ]

  return <Playground initialFiles={initialFiles} persistKey="pro-form-coverable" />
}
```
