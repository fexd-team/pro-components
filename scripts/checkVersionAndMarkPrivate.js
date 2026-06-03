const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const glob = require('glob')
const { getRegistry, getRemoteVersion, compareVersions } = require('./versionHelpers')

const rootDir = path.resolve(__dirname, '..')
const statePath = path.join(rootDir, 'node_modules', '.cache', 'fexd-release-private-state.json')
const registry = getRegistry()

function readJson(filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

function writeJson(filepath, content) {
  fs.writeFileSync(filepath, `${JSON.stringify(content, null, 2)}\n`)
}

function writeState(markedPackages) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true })
  writeJson(statePath, {
    packages: markedPackages.map(({ packagePath, content }) => ({
      path: path.relative(rootDir, packagePath),
      content,
    })),
  })
}

function readState() {
  if (!fs.existsSync(statePath)) return []

  try {
    return readJson(statePath).packages.map((entry) => {
      if (typeof entry === 'string') {
        return { packagePath: path.resolve(rootDir, entry), content: null }
      }

      return {
        packagePath: path.resolve(rootDir, entry.path),
        content: entry.content,
      }
    })
  } catch {
    return []
  }
}

function clearState() {
  if (fs.existsSync(statePath)) {
    fs.unlinkSync(statePath)
  }
}

function isVersionPublished(packageName, version) {
  try {
    const result = execSync(`npm view ${packageName}@${version} version --registry=${registry}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 15000,
    }).trim()
    return result === version
  } catch {
    return false
  }
}

// 检查单个包的version字段是否有变更
function hasPackageVersionChanged(packagePath) {
  try {
    // 首先检查 package.json 是否有改动
    const statusResult = execSync(`git status --porcelain "${packagePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()

    if (!statusResult) {
      return false // 如果文件没有改动，直接返回 false
    }

    // 如果文件有改动，检查是否修改了 version 行
    const diffResult = execSync(`git diff HEAD "${packagePath}" | grep -E '^[+-]\\s*"version":'`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()

    return diffResult.length > 0
  } catch (error) {
    // 如果 grep 没有找到匹配项，会返回错误，这种情况说明没有version变更
    if (error.status === 1 && !error.stdout && !error.stderr) {
      return false
    }
    console.error(`检查 ${packagePath} 版本变更时发生错误:`, error.message)
    return false // 出错时保守处理，返回 false
  }
}

// 修改单个包的private字段
function setPackagePrivate(packagePath, isPrivate) {
  const originalContent = fs.readFileSync(packagePath, 'utf-8')
  const pkg = JSON.parse(originalContent)
  const packageName = path.basename(path.dirname(packagePath))
  const hadPrivate = pkg.private === true

  if (isPrivate) {
    if (!hadPrivate) {
      pkg.private = true
      writeJson(packagePath, pkg)
      console.log(`已标记 ${packageName} 为 private (版本未更新)`)
      return { packagePath, content: originalContent }
    }
  } else {
    if (hadPrivate) {
      delete pkg.private // 移除private字段而不是设置为false
      writeJson(packagePath, pkg)
      console.log(`已取消 ${packageName} 的 private 标记`)
      return { packagePath, content: originalContent }
    }
  }

  return null
}

// 处理所有包的版本检查和private标记
function processPackages(shouldCheck = true) {
  const packagesPath = path.join(__dirname, '../packages/*/package.json')
  const packageFiles = glob.sync(packagesPath)
  let hasUnchangedPackages = false
  const markedPackages = []
  const invalidPackages = []

  packageFiles.forEach((packagePath) => {
    if (shouldCheck) {
      const hasChanged = hasPackageVersionChanged(packagePath)
      if (!hasChanged) {
        const pkg = readJson(packagePath)
        const published = isVersionPublished(pkg.name, pkg.version)
        if (published) {
          const markedPackage = setPackagePrivate(packagePath, true)
          if (markedPackage) {
            markedPackages.push(markedPackage)
          }
          hasUnchangedPackages = true
          return
        } else {
          console.log(`  ${pkg.name}@${pkg.version} 版本未变更但远端未发布，仍需发布`)
        }
      }

      const pkg = readJson(packagePath)
      const remoteVersion = getRemoteVersion(pkg.name, registry)
      if (remoteVersion) {
        console.log(`  ${pkg.name}@${pkg.version} 远端 latest: ${remoteVersion}`)
        if (compareVersions(pkg.version, remoteVersion) <= 0) {
          invalidPackages.push({
            name: pkg.name,
            localVersion: pkg.version,
            remoteVersion,
          })
        }
        return
      }

      console.log(`  ${pkg.name}@${pkg.version} 远端 latest: (首次发布)`)
    } else {
      setPackagePrivate(packagePath, false)
    }
  })

  return { hasUnchangedPackages, markedPackages, invalidPackages }
}

function restoreMarkedPackages() {
  const markedPackages = readState()

  markedPackages.forEach(({ packagePath, content }) => {
    if (fs.existsSync(packagePath)) {
      if (content) {
        fs.writeFileSync(packagePath, content)
        console.log(`已恢复 ${readJson(packagePath).name} 的 package.json`)
      } else {
        setPackagePrivate(packagePath, false)
      }
    }
  })

  clearState()
}

// 根据命令行参数执行不同的操作
const action = process.argv[2]

function exitIfInvalidVersions(invalidPackages) {
  if (invalidPackages.length === 0) return

  console.error('\n❌ 以下包本地版本不高于远端 latest，请先升版本：')
  invalidPackages.forEach(({ name, localVersion, remoteVersion }) => {
    console.error(`  ${name}: local ${localVersion} <= remote ${remoteVersion}`)
  })
  restoreMarkedPackages()
  process.exit(1)
}

if (action === 'check') {
  const { hasUnchangedPackages, markedPackages, invalidPackages } = processPackages(true)
  writeState(markedPackages)
  exitIfInvalidVersions(invalidPackages)
  if (hasUnchangedPackages) {
    console.log('存在未变更版本的包，已将其标记为 private。')
    process.exit(0)
  }
  console.log('没有需要临时标记为 private 的包，继续发布流程。')
} else if (action === 'mark-private') {
  const { markedPackages, invalidPackages } = processPackages(true)
  writeState(markedPackages)
  exitIfInvalidVersions(invalidPackages)
  console.log('已完成包的 private 标记。')
} else if (action === 'restore') {
  restoreMarkedPackages()
  console.log('已恢复所有包的发布设置。')
} else {
  console.log('无效的命令。可用命令: check, mark-private, restore')
  process.exit(1)
}
