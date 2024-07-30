/**
 * inline: true
 */

import * as React from 'react'
import Playground from '@docs/components/Playground'

export default function Demo() {
  const initialFiles = [
    {
      code: require('!raw-loader?esModule=false!./initialFiles/App.tsx'),
      filename: 'App.jsx',
    },
    // {
    //   code: require('!raw-loader?esModule=false!./initialFiles/data.tsx'),
    //   filename: 'data.js',
    // },
  ]

  return <Playground initialFiles={initialFiles} persistKey="playground" />
}
