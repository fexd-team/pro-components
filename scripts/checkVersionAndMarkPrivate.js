const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const glob = require('glob')

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
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
  const packageName = path.basename(path.dirname(packagePath))
  const hadPrivate = pkg.private === true

  if (isPrivate) {
    if (!hadPrivate) {
      pkg.private = true
      fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')
      console.log(`已标记 ${packageName} 为 private (版本未更新)`)
    }
  } else {
    if (hadPrivate) {
      delete pkg.private // 移除private字段而不是设置为false
      fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')
      console.log(`已取消 ${packageName} 的 private 标记`)
    }
  }
}

// 处理所有包的版本检查和private标记
function processPackages(shouldCheck = true) {
  const packagesPath = path.join(__dirname, '../packages/*/package.json')
  const packageFiles = glob.sync(packagesPath)
  let hasUnchangedPackages = false

  packageFiles.forEach((packagePath) => {
    if (shouldCheck) {
      const hasChanged = hasPackageVersionChanged(packagePath)
      if (!hasChanged) {
        setPackagePrivate(packagePath, true)
        hasUnchangedPackages = true
      }
    } else {
      setPackagePrivate(packagePath, false)
    }
  })

  return hasUnchangedPackages
}

// 根据命令行参数执行不同的操作
const action = process.argv[2]

if (action === 'check') {
  const hasUnchangedPackages = processPackages(true)
  if (hasUnchangedPackages) {
    console.log('存在未变更版本的包，已将其标记为 private。')
    process.exit(0)
  }
  console.log('所有包都检测到版本变更，继续发布流程。')
} else if (action === 'mark-private') {
  processPackages(true)
  console.log('已完成包的 private 标记。')
} else if (action === 'restore') {
  processPackages(false)
  console.log('已恢复所有包的发布设置。')
} else {
  console.log('无效的命令。可用命令: check, mark-private, restore')
  process.exit(1)
}
