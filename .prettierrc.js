const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  // plugins: [
  //   require.resolve('prettier-plugin-organize-imports'),
  //   require.resolve('prettier-plugin-packagejson'),
  // ],
  tabWidth: 2,
  useTabs: false,
  semi: false,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  overrides: [
    {
      files: ['*.json', '.babelrc', '.prettierrc'],
      options: {
        parser: 'json',
        tabWidth: 2,
      },
    },
  ],
}
