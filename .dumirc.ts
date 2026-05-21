import { defineConfig } from 'dumi'
import path from 'path'

import { version } from './packages/components/package.json'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

const logoPath = process.env.NODE_ENV === 'production' ? '/pro-components/logo.png' : 'logo.png'
const publicPathPrefix = process.env.NODE_ENV === 'production' ? '/pro-components' : ''

const featureIcons = {
  table: `${publicPathPrefix}/feature-icons/pro-table.png`,
  fields: `${publicPathPrefix}/feature-icons/field-engine.png`,
  business: `${publicPathPrefix}/feature-icons/business-component.png`,
  command: `${publicPathPrefix}/feature-icons/command-api.png`,
  timezone: `${publicPathPrefix}/feature-icons/timezone-i18n.png`,
  ai: `${publicPathPrefix}/feature-icons/ai-skills.png`,
}

export default defineConfig({
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  title: 'Pro Components',
  favicons: [logoPath],
  outputPath: './docs',
  // mode: 'site',
  history: { type: 'hash' },
  publicPath: process.env.NODE_ENV === 'production' ? '/pro-components/' : '/',
  resolve: {
    docDirs: ['documents'],
  },
  // more config: https://d.umijs.org/config
  themeConfig: {
    name: 'Pro Components',
    logo: logoPath,
    github: 'https://github.com/fexd-team/pro-components',
    gitlab: 'https://github.com/fexd-team/pro-components',
    npm: {
      url: 'https://www.npmjs.com/package/@fexd/pro-components',
      tooltip: `Npm @${version}`,
    },

    apiHeader: {
      pkg: '@fexd/pro-components',
      docUrl: '{github}/-/tree/master/packages',
      sourceUrl: '{github}/-/tree/master/docs',
    },

    hero: {
      actions: [
        {
          type: 'primary',
          text: '快速上手',
          link: '/table',
        },
        {
          text: '工具函数',
          link: '/utils',
        },
      ],
      features: [
        {
          title: '插件式 ProTable',
          image: featureIcons.table,
          description:
            '基于插件架构的高级表格，内置查询表单、行编辑、选择、展开、分页等插件，按需组合、零冗余。支持 columns 对象式配置，告别样板代码',
          link: '/table',
          imageStyle: { width: 88, height: 88, padding: 0, background: 'transparent', opacity: 1 },
          row: 8,
        },
        {
          title: '统一字段引擎',
          image: featureIcons.fields,
          description:
            'ProForm 与 ProField 共享 30+ 字段类型（input、select、date、treeSelect、upload 等），一套配置同时驱动表单录入与表格展示，保持数据一致性',
          link: '/form',
          imageStyle: { width: 88, height: 88, padding: 0, background: 'transparent', opacity: 1 },
          row: 8,
        },
        {
          title: 'BC 业务组件化',
          image: featureIcons.business,
          description:
            '基于 useCoverable 的配置覆盖体系，将页面拆分为 BC（Business Component）层。上层传入业务配置，底层组件自动合并，实现「一次封装、多处复用、局部覆盖」',
          link: '/utils/use-coverable',
          imageStyle: { width: 88, height: 88, padding: 0, background: 'transparent', opacity: 1 },
          row: 8,
        },
        {
          title: '命令式调用',
          image: featureIcons.command,
          description:
            'showModal / showDrawer / confirmPromise —— 告别繁琐的 visible 状态管理，一行代码打开弹窗，Promise 式等待结果，支持动态更新和可拖拽',
          link: '/utils/show-modal',
          imageStyle: { width: 88, height: 88, padding: 0, background: 'transparent', opacity: 1 },
          row: 6,
        },
        {
          title: '时区与国际化',
          image: featureIcons.timezone,
          description:
            'dayjsTZ 解决前后端时区不一致问题，所有时间字段自动适配。内置 zh-CN、en-US、id-ID、ms-MY、th-TH 五种语言包',
          link: '/utils/dayjs-tz',
          imageStyle: { width: 88, height: 88, padding: 0, background: 'transparent', opacity: 1 },
          row: 6,
        },
        {
          title: 'AI Skills 内置',
          image: featureIcons.ai,
          description:
            '随 npm 发布完整的 AI Agent 文档，内置 CLI 可一键注册到 Cursor / Codex / Claude Code / OpenCode，帮助 AI 读取组件用法、Props 和最佳实践',
          link: '/utils/ai-skills',
          imageStyle: { width: 88, height: 88, padding: 0, background: 'transparent', opacity: 1 },
          row: 6,
        },
      ],
    },

    // apiHeader: {
    //   pkg: name,
    //   sourceUrl: `{github}/tree/master/src/components/{atomId}/index.tsx`,
    //   docUrl: `{github}/tree/master/example/docs/components/{atomId}.{locale}.md`,
    // },
    footer: 'Made with ❤️ by FEXD',
  },
  alias: {
    '@root': process.cwd(),
    '@docs': path.resolve(__dirname, './documents'),
    '@dumiTheme': path.resolve(__dirname, './.dumi/theme'),
    '@fexd/pro-components/es/style.less': '@fexd/pro-components/src/style.less',
    '@fexd/pro-form/es/style.less': '@fexd/pro-form/src/style.less',
    '@fexd/pro-provider/es/style.less': '@fexd/pro-provider/src/style.less',
    '@fexd/pro-table/es/style.less': '@fexd/pro-table/src/style.less',
    '@fexd/pro-utils/es/style.less': '@fexd/pro-utils/src/style.less',
  },
  extraBabelPlugins: ['@emotion'],
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-jsx-css-modules',
  //     {
  //       styleFileReg: [/\.module\.(css|less|scss)$/],
  //       prefer: 'local',
  //       helperImportType: 'esm',
  //     },
  //   ],
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: '@fexd/tools',
  //       camel2DashComponentName: false,
  //       libraryDirectory: 'es',
  //     },
  //     '@fexd/tools',
  //   ],
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: 'antd',
  //       libraryDirectory: 'es',
  //       style: true,
  //     },
  //     'antd',
  //   ],
  // ],
  chainWebpack(config) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin)
  },
})
