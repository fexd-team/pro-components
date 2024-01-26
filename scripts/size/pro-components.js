const fs = require('fs')
const path = require('path')
const glob = require('glob')
const ora = require('ora')

const cost = require('./import-cost')

const spliter = `
`

async function size() {
  const spinner = ora('calculating size...')
  spinner.start()
  const size = await cost(
    'size',
    [
      `require('@fexd/pro-components')`,
      `require('@fexd/pro-form')`,
      `require('@fexd/pro-table')`,
      `require('@fexd/pro-utils')`,
      `require('@fexd/pro-provider')`,
    ].join(spliter),
  )

  spinner.stop()

  fs.writeFileSync(path.resolve(process.cwd(), './public/size.json'), JSON.stringify({ size }), {
    encoding: 'utf-8',
  })
}

module.exports = size
