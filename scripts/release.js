const { execSync } = require('child_process')
const { getRegistry } = require('./versionHelpers')

const registry = getRegistry()
const isPublic = process.argv.includes('--public')
const isForce = process.argv.includes('--force')

const accessFlag = isPublic || !process.argv.includes('--private') ? ' --access=public' : ''

function run(cmd, label) {
  console.log(`\n> ${label || cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: process.cwd() })
}

function getExitCode(error) {
  return typeof error?.status === 'number' ? error.status : 1
}

function finishFailure(error) {
  console.error('\n❌ 发布失败\n')
  process.exit(getExitCode(error))
}

console.log(`\n📦 发布目标 registry: ${registry}`)

if (isForce) {
  try {
    run(`pnpm -r publish --no-git-checks --force${accessFlag} --registry=${registry}`, 'pnpm publish (force)')
  } catch (error) {
    finishFailure(error)
  }
} else {
  const registryArg = `--registry=${registry}`
  let failedError = null
  let didBringDocuments = false

  try {
    run(`node ./scripts/checkVersionAndMarkPrivate.js check ${registryArg}`, 'version:check')
    run('node ./scripts/bringDocuments.js', 'bring documents')
    didBringDocuments = true

    run(`pnpm -r publish --no-git-checks --force${accessFlag} --registry=${registry}`, 'pnpm publish')
  } catch (error) {
    failedError = error
  } finally {
    try {
      run(`node ./scripts/checkVersionAndMarkPrivate.js restore ${registryArg}`, 'version:restore')
    } catch (error) {
      failedError = failedError || error
    }

    if (didBringDocuments) {
      try {
        run('node ./scripts/bringDocuments.js --delete', 'clean documents')
      } catch (error) {
        failedError = failedError || error
      }
    }
  }

  if (failedError) {
    finishFailure(failedError)
  }
}

console.log('\n✅ 发布完成\n')
