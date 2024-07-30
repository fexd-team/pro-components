/**
 * inline: true
 */

import * as React from 'react'
import { Playground as KitchenPlayground, setup, useMonaco } from 'code-kitchen'
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
import { useMount, useLocalStorageState, useDebounceFn } from 'ahooks'

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

export default function Playground(props: { persistKey: string; initialFiles: { code: string; filename: string }[] }) {
  const monaco = useMonaco()
  const initialFiles = props.initialFiles
  // // [
  //   {
  //     code: require('!raw-loader?esModule=false!./initialFiles/App.tsx'),
  //     filename: 'App.jsx',
  //   },
  //   {
  //     code: require('!raw-loader?esModule=false!./initialFiles/data.tsx'),
  //     filename: 'data.js',
  //   },
  // ]
  const [persistFiles, raw_setPersistFiles] = useLocalStorageState(`user:persistFiles:${props.persistKey}`, {
    defaultValue: initialFiles,
  })

  const setPersistFiles = useDebounceFn((value) => raw_setPersistFiles(value), { wait: 500 })

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

  const playgroundRef = React.useRef<any>()

  useMount(async () => {
    // console.log('persistFiles', persistFiles)
    await fexdTools.delay(500)
    playgroundRef?.current?.setFiles?.(persistFiles)
  })

  // window.playgroundRef = playgroundRef

  return (
    <div className={styles.wrapper}>
      <KitchenPlayground
        // @ts-ignore
        ref={playgroundRef}
        id="pro-components-playground"
        require={customRequire}
        style={{ minHeight: '70vh' }}
        initialFiles={initialFiles}
        onChange={(files) => {
          console.log('onChange', files)
          try {
            setPersistFiles.run(files)
          } catch (e) {
            console.error(e)
          }
        }}
      />
    </div>
  )
}
