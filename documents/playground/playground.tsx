/**
 * inline: true
 */

import * as React from 'react'
import { Playground, setup, useMonaco } from 'code-kitchen'
import 'code-kitchen/styles.css'

import monokaiTheme from 'monaco-themes/themes/Monokai.json'

import * as antdIcons from '@ant-design/icons'
import * as proComponents from '@fexd/pro-components'
import * as fexdTools from '@fexd/tools'
import * as antd from 'antd'
import * as ahooks from 'ahooks'
import * as lodash from 'lodash'
import dayjs from 'dayjs'
import mockjs from 'mockjs'

// import allTypes from './types-defined'

// @ts-ignore
import styles from './playground.module.scss'

setup({
  esbuildWasmPath: 'https://unpkg.com/esbuild-wasm@0.14.54', // 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.14.54',
})

const dependencies = {
  react: React,
  '@fexd/pro-components': proComponents,
  dayjs,
  antd,
  mockjs,
  '@ant-design/icons': antdIcons,
  '@fexd/tools': fexdTools,
  ahooks,
  lodash,
}

const customRequire = (key: string) => {
  const res = (dependencies as any)[key]

  if (res) {
    return res
  }

  throw new Error('DEP: ' + key + ' not found')
}

// Two files for the demo playground

let typesLoaded = false

export default function Demo() {
  const monaco = useMonaco()
  React.useEffect(() => {
    if (typesLoaded || !monaco) {
      return
    }

    // monaco.editor.defineTheme('monokai', monokaiTheme as any)
    // monaco.editor.setTheme('monokai')
    // monaco.editor.setModelLanguage('jsx')

    // // Dispose?
    // allTypes.map(([path, content]) => {
    //   return monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path)
    // })

    typesLoaded = true
  }, [monaco])

  return (
    <div className={styles.wrapper}>
      <Playground
        id="pro-components-playground"
        require={customRequire}
        style={{ minHeight: '70vh' }}
        initialFiles={[
          {
            code: require('!raw-loader?esModule=false!./initialFiles/App.tsx'),
            filename: 'App.jsx',
          },
          {
            code: require('!raw-loader?esModule=false!./initialFiles/data.tsx'),
            filename: 'data.js',
          },
        ]}
      />
    </div>
  )
}
