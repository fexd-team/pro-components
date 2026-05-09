const path = require('path')

let fexdToolsLibPath = '<rootDir>/node_modules/@fexd/tools/lib'
try {
  const proUtilsDir = path.dirname(require.resolve('@fexd/pro-utils/package.json'))
  const toolsPkgPath = require.resolve('@fexd/tools/package.json', { paths: [proUtilsDir] })
  fexdToolsLibPath = path.dirname(toolsPkgPath).replace(/\\/g, '/') + '/lib'
} catch {}

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  maxWorkers: '50%',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['packages/*/src/**/*.{ts,tsx}', '!packages/*/src/**/style.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
        },
      },
    ],
  },
  setupFiles: ['<rootDir>/jest-setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^antd/es/(.*)$': '<rootDir>/node_modules/antd/lib/$1',
    '^antd/es$': '<rootDir>/node_modules/antd/lib',
    '^ahooks/es/(.*)$': '<rootDir>/node_modules/ahooks/lib/$1',
    '^ahooks/es$': '<rootDir>/node_modules/ahooks/lib',
    '^rc-field-form/es/(.*)$': '<rootDir>/node_modules/rc-field-form/lib/$1',
    '^rc-field-form/es$': '<rootDir>/node_modules/rc-field-form/lib',
    '^@fexd/tools/es/(.*)$': fexdToolsLibPath + '/$1',
    '^@fexd/tools/es$': fexdToolsLibPath,
    '^dayjs/esm/(.*)$': '<rootDir>/node_modules/dayjs/$1',
    '^moment/dist/locale/(.*)$': '<rootDir>/node_modules/moment/locale/$1',
  },
}
