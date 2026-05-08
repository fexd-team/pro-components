const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { getRegistry, getRemoteVersion, compareVersions, printTableRow, printDivider } = require('./versionHelpers')

function run() {
  const registry = getRegistry()
  const packagesPath = path.join(__dirname, '../packages/*/package.json')
  const packageFiles = glob.sync(packagesPath)

  const W = [30, 15, 15, 12]
  const totalWidth = W.reduce((a, b) => a + b, 0)

  console.log(`\n📦 查询 registry: ${registry}`)
  printDivider(totalWidth)
  printTableRow(['包名', '本地版本', '线上版本', '状态'], W)
  printDivider(totalWidth)

  const results = []

  packageFiles.forEach((pkgPath) => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    if (pkg.private) return

    const remoteVersion = getRemoteVersion(pkg.name, registry)
    const localVersion = pkg.version

    const statusMap = {
      same: '✅ 一致',
      ahead: '⚡ 本地更新',
      behind: '⬇️  线上更新',
      unpublished: '🆕 未发布',
    }

    let status = 'same'
    if (!remoteVersion) {
      status = 'unpublished'
    } else if (localVersion !== remoteVersion) {
      status = compareVersions(localVersion, remoteVersion) > 0 ? 'ahead' : 'behind'
    }

    results.push({ name: pkg.name, localVersion, remoteVersion, status })
    printTableRow([pkg.name, localVersion, remoteVersion || '-', statusMap[status]], W)
  })

  printDivider(totalWidth)

  const behind = results.filter((r) => r.status === 'behind')
  if (behind.length > 0) {
    console.log(`\n⚠️  有 ${behind.length} 个包的本地版本落后于线上：`)
    behind.forEach((r) => console.log(`   ${r.name}: 本地 ${r.localVersion} → 线上 ${r.remoteVersion}`))
    console.log('\n💡 建议先执行 git pull 或手动同步版本后再 auto-update')
  }

  const ahead = results.filter((r) => r.status === 'ahead')
  if (ahead.length > 0) {
    console.log(`\n📤 有 ${ahead.length} 个包的本地版本超前于线上（待发布）：`)
    ahead.forEach((r) => console.log(`   ${r.name}: 本地 ${r.localVersion} → 线上 ${r.remoteVersion}`))
  }

  const unpublished = results.filter((r) => r.status === 'unpublished')
  if (unpublished.length > 0) {
    console.log(`\n🆕 有 ${unpublished.length} 个包尚未发布到 registry：`)
    unpublished.forEach((r) => console.log(`   ${r.name}@${r.localVersion}`))
  }

  if (results.every((r) => r.status === 'same')) {
    console.log('\n✅ 所有包版本均与线上一致')
  }

  console.log()
}

run()
