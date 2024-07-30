const filePrefix = 'file:///'
const typesPrefix = 'node_modules/@types'

const allTypes = [
  [
    `${filePrefix}/${typesPrefix}/react/index.d.ts`,
    require('!raw-loader?esModule=false!@root/node_modules/@types/react/index.d.ts'),
  ],
  ...require
    // @ts-ignore
    .context('!raw-loader?esModule=false!@root/node_modules/@ant-design/icons/dist', true, /\.d\.ts$/)
    .keys()
    .map((key: string) => {
      const path = key.replace(/\.\//, '')

      return [
        `${filePrefix}/@ant-design/icons/${path}`,
        require(`!raw-loader?esModule=false!@root/node_modules/@ant-design/icons/dist/${path}`),
      ]
    }),

  ...require
    // @ts-ignore
    .context('!raw-loader?esModule=false!@root/node_modules/@fexd/tools/dist', true, /\.d\.ts$/)
    .keys()
    .map((key: string) => {
      const path = key.replace(/\.\//, '')

      return [
        `${filePrefix}/@fexd/tools/${path}`,
        require(`!raw-loader?esModule=false!@root/node_modules/@fexd/tools/dist/${path}`),
      ]
    }),

  ...require
    // @ts-ignore
    .context('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-components/es', true, /\.d\.ts$/)
    .keys()
    .map((key: string) => {
      const path = key.replace(/\.\//, '')

      return [
        `${filePrefix}/@fexd/pro-components/${path}`,
        require(`!raw-loader?esModule=false!@root/node_modules/@fexd/pro-components/es/${path}`),
      ]
    }),
  // [
  //   `${filePrefix}/@fexd/pro-components/index.tsx`,
  //   require('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-components/src/index.tsx'),
  // ],

  ...require
    // @ts-ignore
    .context('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-form/es', true, /\.d\.ts$/)
    .keys()
    .map((key: string) => {
      const path = key.replace(/\.\//, '')

      return [
        `${filePrefix}/@fexd/pro-form/${path}`,
        require(`!raw-loader?esModule=false!@root/node_modules/@fexd/pro-form/es/${path}`),
      ]
    }),
  // [
  //   `${filePrefix}/@fexd/pro-form/index.tsx`,
  //   require('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-form/src/index.tsx'),
  // ],
  [
    `${filePrefix}/@fexd/pro-provider/index.tsx`,
    require('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-provider/src/index.tsx'),
  ],

  ...require
    // @ts-ignore
    .context('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-table/es', true, /\.d\.ts$/)
    .keys()
    .map((key: string) => {
      const path = key.replace(/\.\//, '')

      return [
        `${filePrefix}/@fexd/pro-table/${path}`,
        require(`!raw-loader?esModule=false!@root/node_modules/@fexd/pro-table/es/${path}`),
      ]
    }),
  // [
  //   `${filePrefix}/@fexd/pro-table/index.tsx`,
  //   require('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-table/src/index.tsx'),
  // ],

  // ...require
  //   // @ts-ignore
  //   .context('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-utils/es', true, /\.d\.ts$/)
  //   .keys()
  //   .map((key: string) => {
  //     const path = key.replace(/\.\//, '')

  //     return [
  //       `${filePrefix}/@fexd/pro-utils/${path}`,
  //       require(`!raw-loader?esModule=false!@root/node_modules/@fexd/pro-utils/es/${path}`),
  //     ]
  //   }),
  [
    `${filePrefix}/@fexd/pro-utils/index.tsx`,
    require('!raw-loader?esModule=false!@root/node_modules/@fexd/pro-utils/src/index.tsx'),
  ],
]

export default allTypes
