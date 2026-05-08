const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const glob = require('glob')
const {
  getRegistry,
  getRemoteVersion,
  compareVersions,
  calculateNewVersion,
  printTableRow,
  printDivider,
} = require('./versionHelpers')

function hasSourceChanged(packagePath) {
  const srcPath = path.join(path.dirname(packagePath), 'src')
  try {
    const statusResult = execSync(`git status --porcelain "${srcPath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()

    const changedFiles = statusResult
      .split('\n')
      .filter(Boolean)
      .map((line) => ({ status: line.slice(0, 2), path: line.slice(3) }))

    if (changedFiles.length > 0) {
      console.log(`\n检测到 ${path.dirname(packagePath)} 有源码改动:`)
      const statusText = { M: '修改', A: '新增', D: '删除', '??': '未跟踪' }
      changedFiles.forEach((f) => {
        console.log(`  ${statusText[f.status.trim()] || f.status.trim()}: ${f.path}`)
      })
    }

    return { hasChanges: changedFiles.length > 0, changedFiles: changedFiles.map((f) => f.path) }
  } catch (error) {
    console.error(`检查 ${srcPath} 改动时发生错误:`, error.message)
    return { hasChanges: false, changedFiles: [] }
  }
}

function hasDependenciesChanged(packagePath) {
  try {
    const statusResult = execSync(`git status --porcelain "${packagePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()

    const changedFiles = statusResult
      .split('\n')
      .filter(Boolean)
      .map((line) => ({ status: line.slice(0, 2), path: line.slice(3) }))

    if (changedFiles.length > 0) {
      console.log(`\n检测到 ${packagePath} 有 package.json 改动:`)
      const statusText = { M: '修改', A: '新增', D: '删除', '??': '未跟踪' }
      changedFiles.forEach((f) => {
        console.log(`  ${statusText[f.status.trim()] || f.status.trim()}: ${f.path}`)
      })
    }

    return { hasChanges: changedFiles.length > 0, changedFiles: changedFiles.map((f) => f.path) }
  } catch (error) {
    console.error(`检查 ${packagePath} 改动时发生错误:`, error.message)
    return { hasChanges: false, changedFiles: [] }
  }
}

function getAllPackagesInfo() {
  const packagesPath = path.join(__dirname, '../packages/*/package.json')
  const packageFiles = glob.sync(packagesPath)
  const packagesInfo = {}

  packageFiles.forEach((packagePath) => {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))

    let hasPackageJsonChanged = false
    try {
      const result = execSync(`git status --porcelain "${packagePath}"`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim()
      hasPackageJsonChanged = result.length > 0
    } catch (error) {
      console.error(`检查 ${packagePath} 状态时发生错误:`, error.message)
    }

    if (hasPackageJsonChanged) {
      console.warn(`⚠️  ${pkg.name} 的 package.json 有未提交的改动`)
    }

    packagesInfo[pkg.name] = {
      path: packagePath,
      version: pkg.version,
      dependencies: pkg.dependencies || {},
      devDependencies: pkg.devDependencies || {},
      hasChanged: false,
      newVersion: null,
      isProcessed: false,
      hasPackageJsonChanged,
    }
  })

  return packagesInfo
}

function buildDependencyGraph(packagesInfo) {
  const graph = {}
  const packageNames = new Set(Object.keys(packagesInfo))

  Object.entries(packagesInfo).forEach(([pkgName, info]) => {
    graph[pkgName] = { dependencies: [], dependents: [], level: 0 }

    Object.entries(info.dependencies).forEach(([depName]) => {
      if (packageNames.has(depName)) {
        graph[pkgName].dependencies.push(depName)
        if (!graph[depName]) graph[depName] = { dependencies: [], dependents: [], level: 0 }
        graph[depName].dependents.push(pkgName)
      }
    })
  })

  function calculateLevel(pkgName, visited = new Set()) {
    if (visited.has(pkgName)) return graph[pkgName].level
    visited.add(pkgName)

    const deps = graph[pkgName].dependencies
    if (deps.length === 0) {
      graph[pkgName].level = 0
    } else {
      graph[pkgName].level = Math.max(...deps.map((dep) => calculateLevel(dep, visited))) + 1
    }
    return graph[pkgName].level
  }

  Object.keys(graph).forEach((pkgName) => calculateLevel(pkgName))
  return graph
}

function visualizeDependencyGraph(graph, packagesInfo) {
  console.log('\n📊 依赖关系图谱：')
  printDivider(50)

  const sorted = Object.entries(graph)
    .sort(([, a], [, b]) => a.level - b.level)
    .map(([name, info]) => ({ name, ...info, version: packagesInfo[name].version }))

  sorted.forEach((pkg) => {
    const indent = '  '.repeat(pkg.level)
    console.log(`${indent}${pkg.name}@${pkg.version} (层级: ${pkg.level})`)
    if (pkg.dependencies.length > 0) {
      pkg.dependencies.forEach((dep) => console.log(`${indent}  └─ ${dep}@${packagesInfo[dep].version}`))
    }
  })

  printDivider(50)
  return sorted.map((pkg) => pkg.name)
}

function processVersionUpdates() {
  const registry = getRegistry()
  console.log(`\n📦 registry: ${registry}`)

  const packagesInfo = getAllPackagesInfo()

  const hasUncommittedChanges = Object.values(packagesInfo).some((i) => i.hasPackageJsonChanged)
  if (hasUncommittedChanges) {
    console.log('\n⚠️  检测到未提交的 package.json 改动，建议先提交或回滚')
  }

  const graph = buildDependencyGraph(packagesInfo)
  const updateOrder = visualizeDependencyGraph(graph, packagesInfo)

  console.log('\n🔍 检查源码和依赖变更...')

  Object.entries(packagesInfo).forEach(([, info]) => {
    const sourceChanges = hasSourceChanged(info.path)
    const dependencyChanges = hasDependenciesChanged(info.path)

    if (sourceChanges.hasChanges || dependencyChanges.hasChanges) {
      info.hasChanged = true
      info.changedFiles = [...sourceChanges.changedFiles, ...dependencyChanges.changedFiles]
    }
  })

  const versionUpdates = new Map()
  const skippedPackages = []
  const processedPackages = new Set()

  function calculatePackageUpdates(pkgName) {
    const info = packagesInfo[pkgName]
    if (processedPackages.has(pkgName)) {
      return versionUpdates.get(pkgName)?.newVersion || info.version
    }
    processedPackages.add(pkgName)

    const depVersions = {}
    let hasUpdatedDeps = false

    for (const dep of graph[pkgName].dependencies) {
      const depVersion = calculatePackageUpdates(dep)
      if (depVersion !== packagesInfo[dep].version) {
        depVersions[dep] = depVersion
        hasUpdatedDeps = true
      }
    }

    const needsUpdate = info.hasChanged || hasUpdatedDeps
    if (!needsUpdate) return info.version

    const remoteVersion = getRemoteVersion(pkgName, registry)
    const newVersion = calculateNewVersion(info.version, remoteVersion)
    const reason = info.hasChanged ? '源码改动' : `依赖更新 (${Object.keys(depVersions).join(', ')})`

    if (!newVersion) {
      skippedPackages.push({
        pkgName,
        localVersion: info.version,
        remoteVersion: remoteVersion || '-',
        reason,
      })
      return info.version
    }

    versionUpdates.set(pkgName, {
      pkgName,
      path: info.path,
      currentVersion: info.version,
      newVersion,
      remoteVersion: remoteVersion || '-',
      reason,
      depVersions,
    })
    return newVersion
  }

  updateOrder.forEach((pkgName) => calculatePackageUpdates(pkgName))

  // 汇总表格
  const W = [28, 10, 10, 10, 18, 10]
  const totalWidth = W.reduce((a, b) => a + b, 0)

  console.log()
  printDivider(totalWidth)
  printTableRow(['包名', '线上', '本地', '更新后', '原因', '状态'], W)
  printDivider(totalWidth)

  for (const u of versionUpdates.values()) {
    printTableRow([u.pkgName, u.remoteVersion, u.currentVersion, u.newVersion, u.reason, '📤 更新'], W)
  }
  for (const s of skippedPackages) {
    printTableRow([s.pkgName, s.remoteVersion, s.localVersion, '-', s.reason, '⏭️  跳过'], W)
  }

  if (versionUpdates.size === 0 && skippedPackages.length === 0) {
    printTableRow(['（无需要处理的包）', '', '', '', '', ''], W)
  }

  printDivider(totalWidth)

  if (versionUpdates.size === 0) {
    console.log('\n✅ 所有包已是最新，无需更新')
    return
  }

  // 写入文件
  for (const update of versionUpdates.values()) {
    const pkg = JSON.parse(fs.readFileSync(update.path, 'utf-8'))
    pkg.version = update.newVersion

    if (Object.keys(update.depVersions).length > 0) {
      const updateDep = (deps) => {
        if (!deps) return
        Object.entries(update.depVersions).forEach(([depName, version]) => {
          if (deps[depName]) deps[depName] = `^${version}`
        })
      }
      updateDep(pkg.dependencies)
      updateDep(pkg.devDependencies)
    }

    fs.writeFileSync(update.path, JSON.stringify(pkg, null, 2) + '\n')
  }

  console.log(`\n✅ 已更新 ${versionUpdates.size} 个包：`)
  for (const { pkgName, currentVersion, newVersion } of versionUpdates.values()) {
    console.log(`   ${pkgName}: ${currentVersion} → ${newVersion}`)
  }
  console.log()
}

processVersionUpdates()
