import { defineConfig } from 'dumi'
import path from 'path'

import { version } from './packages/components/package.json'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

const logoPath = process.env.NODE_ENV === 'production' ? '/pro-components/logo.png' : 'logo.png'

const svgIcon = (content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
  <rect width="96" height="96" rx="28" fill="url(#bg)" />
  <circle cx="72" cy="22" r="18" fill="url(#glow)" opacity=".55" />
  <circle cx="20" cy="76" r="20" fill="white" opacity=".1" />
  ${content}
  <defs>
    <linearGradient id="bg" x1="12" y1="8" x2="86" y2="90" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1F6FEB" />
      <stop offset=".52" stop-color="#15B8A6" />
      <stop offset="1" stop-color="#F97316" />
    </linearGradient>
    <linearGradient id="glow" x1="56" y1="6" x2="86" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF" />
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>
  </defs>
</svg>`)}`

const featureIcons = {
  table: svgIcon(`
    <rect x="22" y="25" width="52" height="46" rx="8" fill="white" opacity=".95"/>
    <path d="M22 38H74M39 25V71M57 25V71M22 54H74" stroke="#0F766E" stroke-width="4" stroke-linecap="round"/>
    <path d="M68 62L76 70M76 62L68 70" stroke="#F97316" stroke-width="4" stroke-linecap="round"/>
  `),
  fields: svgIcon(`
    <rect x="23" y="21" width="50" height="54" rx="10" fill="white" opacity=".96"/>
    <rect x="32" y="33" width="32" height="7" rx="3.5" fill="#1F6FEB"/>
    <rect x="32" y="47" width="22" height="7" rx="3.5" fill="#15B8A6"/>
    <rect x="32" y="61" width="30" height="7" rx="3.5" fill="#F97316"/>
    <circle cx="66" cy="50" r="5" fill="#111827" opacity=".72"/>
  `),
  business: svgIcon(`
    <rect x="24" y="25" width="20" height="20" rx="6" fill="white" opacity=".95"/>
    <rect x="52" y="25" width="20" height="20" rx="6" fill="white" opacity=".8"/>
    <rect x="24" y="53" width="20" height="20" rx="6" fill="white" opacity=".8"/>
    <rect x="52" y="53" width="20" height="20" rx="6" fill="white" opacity=".95"/>
    <path d="M44 35H52M34 45V53M62 45V53M44 63H52" stroke="#111827" stroke-width="4" stroke-linecap="round" opacity=".65"/>
  `),
  command: svgIcon(`
    <rect x="19" y="25" width="58" height="46" rx="10" fill="#111827" opacity=".86"/>
    <path d="M30 40L39 48L30 56" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M47 57H64" stroke="#15B8A6" stroke-width="5" stroke-linecap="round"/>
    <path d="M62 28L55 45H66L58 66" stroke="#FACC15" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  `),
  timezone: svgIcon(`
    <circle cx="48" cy="48" r="27" fill="white" opacity=".94"/>
    <path d="M24 48H72M48 21C39 30 35 39 35 48C35 57 39 66 48 75M48 21C57 30 61 39 61 48C61 57 57 66 48 75" stroke="#1F6FEB" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M48 35V50L58 56" stroke="#111827" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="48" cy="48" r="27" stroke="#15B8A6" stroke-width="4"/>
  `),
  ai: svgIcon(`
    <rect x="25" y="24" width="46" height="36" rx="10" fill="white" opacity=".95"/>
    <path d="M36 72H60M48 60V72" stroke="white" stroke-width="5" stroke-linecap="round"/>
    <circle cx="39" cy="42" r="4" fill="#1F6FEB"/>
    <circle cx="57" cy="42" r="4" fill="#1F6FEB"/>
    <path d="M39 52C44 56 52 56 57 52" stroke="#15B8A6" stroke-width="4" stroke-linecap="round"/>
    <path d="M24 40H18M78 40H72" stroke="white" stroke-width="5" stroke-linecap="round"/>
  `),
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
          row: 8,
        },
        {
          title: '统一字段引擎',
          image: featureIcons.fields,
          description:
            'ProForm 与 ProField 共享 30+ 字段类型（input、select、date、treeSelect、upload 等），一套配置同时驱动表单录入与表格展示，保持数据一致性',
          link: '/form',
          row: 8,
        },
        {
          title: 'BC 业务组件化',
          image: featureIcons.business,
          description:
            '基于 useCoverable 的配置覆盖体系，将页面拆分为 BC（Business Component）层。上层传入业务配置，底层组件自动合并，实现「一次封装、多处复用、局部覆盖」',
          link: '/utils/use-coverable',
          row: 8,
        },
        {
          title: '命令式调用',
          image: featureIcons.command,
          description:
            'showModal / showDrawer / confirmPromise —— 告别繁琐的 visible 状态管理，一行代码打开弹窗，Promise 式等待结果，支持动态更新和可拖拽',
          link: '/utils/show-modal',
          row: 6,
        },
        {
          title: '时区与国际化',
          image: featureIcons.timezone,
          description:
            'dayjsTZ 解决前后端时区不一致问题，所有时间字段自动适配。内置 zh-CN、en-US、id-ID、ms-MY、th-TH 五种语言包',
          link: '/utils/dayjs-tz',
          row: 6,
        },
        {
          title: 'AI Skills 内置',
          image: featureIcons.ai,
          description:
            '随 npm 发布完整的 AI Agent 文档，内置 CLI 可一键注册到 Cursor / Codex / Claude Code / OpenCode，帮助 AI 读取组件用法、Props 和最佳实践',
          link: '/utils/ai-skills',
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
