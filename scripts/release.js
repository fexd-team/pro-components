const { execSync } = require('child_process')
const { getRegistry } = require('./versionHelpers')

const registry = getRegistry()
const isPublic = process.argv.includes('--public')
const isForce = process.argv.includes('--force')

const accessFlag = isPublic ? ' --access=public' : ''

function run(cmd, label) {
  console.log(`\n> ${label || cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: process.cwd() })
}

console.log(`\n📦 发布目标 registry: ${registry}`)

if (isForce) {
  run(`pnpm -r publish --no-git-checks --force${accessFlag} --registry=${registry}`, 'pnpm publish (force)')
} else {
  run('npm run version:check', 'version:check')
  run('node ./scripts/bringDocuments.js', 'bring documents')

  run(`pnpm -r publish --no-git-checks --force${accessFlag} --registry=${registry}`, 'pnpm publish')

  run('npm run version:restore', 'version:restore')
  run('node ./scripts/bringDocuments.js --delete', 'clean documents')
}

console.log('\n✅ 发布完成\n')
