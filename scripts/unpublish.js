const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { argv } = require('yargs')
const child = require('child_process')

const symlinks = glob.sync(path.resolve(__dirname, '../packages/*/package.json')).map((filepath) => {
  const content = require(filepath)

  return [content.name, filepath.replace(`/package.json`, '')]
})

const pkgs = (argv.pkgs || '').split(',').filter(Boolean)

const dropCommands = pkgs.map((pkg) => {
  const { name, version } = require(`../packages/${pkg}/package.json`)
  return `npm unpublish ${name}@${version}`
})

console.log(
  dropCommands.join(`
`),
)

const childProcess = child.exec(dropCommands.join(' && '))
childProcess.stdout.pipe(process.stdout)
childProcess.stderr.pipe(process.stderr)
// pkgs
