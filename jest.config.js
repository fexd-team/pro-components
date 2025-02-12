module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  maxWorkers: '80%',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['packages/*/src/**/*.{ts,tsx}', '!packages/*/src/**/style.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/jest-setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    // '^@fexd/pro-components$': '<rootDir>/packages/components/src/index.tsx',
    // '^@fexd/pro-form$': '<rootDir>/packages/form/src/index.tsx',
    // '^@fexd/pro-provider$': '<rootDir>/packages/provider/src/index.tsx',
    // '^@fexd/pro-table$': '<rootDir>/packages/table/src/index.tsx',
    // '^@fexd/pro-utils$': '<rootDir>/packages/utils/src/index.tsx',
    '^antd/es': '<rootDir>/node_modules/antd/lib',
    '^ahooks/es': '<rootDir>/node_modules/ahooks/lib',
    '^rc-field-form/es': '<rootDir>/node_modules/rc-field-form/lib',
  },
}
