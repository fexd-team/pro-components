const { execSync } = require('child_process')

const DEFAULT_REGISTRY = 'https://registry.npmjs.org'

/**
 * 解析 registry：--registry=<url> > 环境变量 NPM_REGISTRY > 默认值
 */
function getRegistry(argv = process.argv) {
  const arg = argv.find((a) => a.startsWith('--registry='))
  if (arg) return arg.split('=').slice(1).join('=')
  if (process.env.NPM_REGISTRY) return process.env.NPM_REGISTRY
  return DEFAULT_REGISTRY
}

function getRemoteVersion(packageName, registry) {
  try {
    const result = execSync(`npm view ${packageName} version --registry=${registry}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 15000,
    }).trim()
    return result || null
  } catch {
    return null
  }
}

function compareVersions(a, b) {
  const [aMaj, aMin, aPat] = a.split('.').map(Number)
  const [bMaj, bMin, bPat] = b.split('.').map(Number)
  if (aMaj !== bMaj) return aMaj - bMaj
  if (aMin !== bMin) return aMin - bMin
  return aPat - bPat
}

function patchUp(version) {
  const [major, minor, patch] = version.split('.').map(Number)
  return `${major}.${minor}.${patch + 1}`
}

/**
 * 以线上版本为基准计算新版本，保证幂等：
 * - 取 max(本地, 线上) 为基准 patch +1
 * - 若本地已 >= 目标版本则返回 null（无需更新）
 */
function calculateNewVersion(localVersion, remoteVersion) {
  const base = remoteVersion && compareVersions(remoteVersion, localVersion) > 0 ? remoteVersion : localVersion
  const target = patchUp(base)
  if (compareVersions(localVersion, target) >= 0) return null
  return target
}

/**
 * 打印格式化表格行
 */
function printTableRow(cols, widths) {
  console.log(cols.map((c, i) => String(c).padEnd(widths[i])).join(''))
}

function printDivider(width) {
  console.log('─'.repeat(width || 80))
}

module.exports = {
  DEFAULT_REGISTRY,
  getRegistry,
  getRemoteVersion,
  compareVersions,
  patchUp,
  calculateNewVersion,
  printTableRow,
  printDivider,
}
