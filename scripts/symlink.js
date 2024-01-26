const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { argv } = require('yargs')

const symlinks = glob.sync(path.resolve(__dirname, '../packages/*/package.json')).map((filepath) => {
  const content = require(filepath)

  return [content.name, filepath.replace(`/package.json`, '')]
})

// console.log(symlinks)
const projectPath = argv.path

if (!projectPath) {
  console.log('请提供测试项目路径，如：--path=c:/Projects/XXX/XXX/XXX')
  process.exit(1)
}

// console.log(path.resolve(projectPath, './**/node_modules'))
symlinks.map(([name, linkpath]) => {
  glob
    .sync(path.resolve(projectPath, './**/node_modules', name))
    .filter((targetPath) => !/legacies/.test(targetPath))
    .map((targetPath) => {
      try {
        fs.rmdirSync(targetPath)
        fs.symlinkSync(linkpath, targetPath, 'dir')
      } catch {}
    })
})

// Object.entries(targetProjects).map(([name, link]) => {
//   const symlinkPath = path.resolve(__dirname, `../node_modules/${name}`)
//   try {
//     fs.rmdirSync(symlinkPath)
//     fs.symlinkSync(link, symlinkPath, 'dir')
//   } catch {}
// })
