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

function parseSemver(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/)
  if (!match) return null
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4] || null,
  }
}

function compareVersions(a, b) {
  const pa = parseSemver(a)
  const pb = parseSemver(b)
  if (!pa || !pb) return 0

  if (pa.major !== pb.major) return pa.major - pb.major
  if (pa.minor !== pb.minor) return pa.minor - pb.minor
  if (pa.patch !== pb.patch) return pa.patch - pb.patch

  if (pa.prerelease && !pb.prerelease) return -1
  if (!pa.prerelease && pb.prerelease) return 1
  if (pa.prerelease && pb.prerelease) {
    const naMatch = pa.prerelease.match(/^(.+?)(\d+)$/)
    const nbMatch = pb.prerelease.match(/^(.+?)(\d+)$/)
    if (naMatch && nbMatch && naMatch[1] === nbMatch[1]) {
      return parseInt(naMatch[2], 10) - parseInt(nbMatch[2], 10)
    }
    return pa.prerelease.localeCompare(pb.prerelease)
  }
  return 0
}

function patchUp(version) {
  const parsed = parseSemver(version)
  if (!parsed) return version

  if (parsed.prerelease) {
    const match = parsed.prerelease.match(/^(.+?)(\d+)$/)
    if (match) {
      return `${parsed.major}.${parsed.minor}.${parsed.patch}-${match[1]}${parseInt(match[2], 10) + 1}`
    }
    return `${parsed.major}.${parsed.minor}.${parsed.patch}-${parsed.prerelease}.1`
  }

  return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`
}

/**
 * 以线上版本为基准计算新版本，保证幂等：
 * - 目标始终是线上版本 patch +1
 * - 若本地已 >= 目标版本则返回 null（无需更新）
 * - 线上没有版本时不自动递增，避免未发布包反复自增
 */
function calculateNewVersion(localVersion, remoteVersion) {
  if (!remoteVersion) return null

  const target = patchUp(remoteVersion)
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
  parseSemver,
  compareVersions,
  patchUp,
  calculateNewVersion,
  printTableRow,
  printDivider,
}
