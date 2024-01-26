import { defineConfig } from 'father'

export default defineConfig({
  cjs: {
    output: 'lib',
    platform: 'browser',
    transformer: 'babel',
  },
  esm: {
    output: 'es',
    platform: 'browser',
    transformer: 'babel',
  },
  extraBabelPlugins: [
    'react-node-key/babel',
    [
      'babel-plugin-import',
      {
        libraryName: '@fexd/tools',
        camel2DashComponentName: false,
        libraryDirectory: 'es',
      },
      '@fexd/tools',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: false,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@ant-design/icons',
        camel2DashComponentName: false,
        libraryDirectory: '',
      },
      '@ant-design/icons',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'ahooks',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
      },
      'ahooks',
    ],
  ],
})
