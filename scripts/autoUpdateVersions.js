const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const glob = require('glob')

// 检查包的src目录是否有改动
function hasSourceChanged(packagePath) {
  const srcPath = path.join(path.dirname(packagePath), 'src')
  try {
    // 检查暂存区和工作区的改动
    const statusResult = execSync(`git status --porcelain "${srcPath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()

    // 解析 git status 的输出，处理文件状态
    const changedFiles = statusResult
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const status = line.slice(0, 2)
        const filePath = line.slice(3)
        return {
          status,
          path: filePath
        }
      })

    const hasChanges = changedFiles.length > 0
    if (hasChanges) {
      console.log(`\n检测到 ${path.dirname(packagePath)} 有源码改动:`)
      changedFiles.forEach(file => {
        const status = file.status.trim()
        let statusText = ''
        if (status === 'M') statusText = '修改'
        else if (status === 'A') statusText = '新增'
        else if (status === 'D') statusText = '删除'
        else if (status === '??') statusText = '未跟踪'
        else statusText = status

        console.log(`  ${statusText}: ${file.path}`)
      })
    }

    return {
      hasChanges,
      changedFiles: changedFiles.map(f => f.path)
    }
  } catch (error) {
    console.error(`检查 ${srcPath} 改动时发生错误:`, error.message)
    return {
      hasChanges: false,
      changedFiles: []
    }
  }
}

// 检查包的依赖是否有变更
function hasDependenciesChanged(packagePath) {
  try {
    // 检查暂存区和工作区的改动
    const statusResult = execSync(`git status --porcelain "${packagePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()

    // 解析 git status 的输出，处理文件状态
    const changedFiles = statusResult
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const status = line.slice(0, 2)
        const filePath = line.slice(3)
        return {
          status,
          path: filePath
        }
      })

    const hasChanges = changedFiles.length > 0
    if (hasChanges) {
      console.log(`\n检测到 ${packagePath} 有 package.json 改动:`)
      changedFiles.forEach(file => {
        const status = file.status.trim()
        let statusText = ''
        if (status === 'M') statusText = '修改'
        else if (status === 'A') statusText = '新增'
        else if (status === 'D') statusText = '删除'
        else if (status === '??') statusText = '未跟踪'
        else statusText = status

        console.log(`  ${statusText}: ${file.path}`)
      })
    }

    return {
      hasChanges,
      changedFiles: changedFiles.map(f => f.path)
    }
  } catch (error) {
    console.error(`检查 ${packagePath} 改动时发生错误:`, error.message)
    return {
      hasChanges: false,
      changedFiles: []
    }
  }
}

// 获取所有包的信息
function getAllPackagesInfo() {
  const packagesPath = path.join(__dirname, '../packages/*/package.json')
  const packageFiles = glob.sync(packagesPath)
  const packagesInfo = {}

  packageFiles.forEach((packagePath) => {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))

    // 检查 package.json 是否有未提交的改动
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

    // 如果 package.json 有未提交的改动，提示用户
    if (hasPackageJsonChanged) {
      console.warn(`警告: ${pkg.name} 的 package.json 有未提交的改动，这可能会影响版本更新`)
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

// 构建依赖关系图
function buildDependencyGraph(packagesInfo) {
  const graph = {}
  const packageNames = new Set(Object.keys(packagesInfo))

  Object.entries(packagesInfo).forEach(([pkgName, info]) => {
    graph[pkgName] = {
      dependencies: [],
      dependents: [],
      level: 0,
    }

    // 只从 dependencies 中收集依赖关系
    Object.entries(info.dependencies).forEach(([depName, depVersion]) => {
      if (packageNames.has(depName)) {
        graph[pkgName].dependencies.push(depName)
        if (!graph[depName]) {
          graph[depName] = { dependencies: [], dependents: [], level: 0 }
        }
        graph[depName].dependents.push(pkgName)
      }
    })
  })

  // 计算每个包的依赖层级
  function calculateLevel(pkgName, visited = new Set()) {
    if (visited.has(pkgName)) return graph[pkgName].level
    visited.add(pkgName)

    const deps = graph[pkgName].dependencies
    if (deps.length === 0) {
      graph[pkgName].level = 0
    } else {
      const maxDepLevel = Math.max(...deps.map((dep) => calculateLevel(dep, visited)))
      graph[pkgName].level = maxDepLevel + 1
    }

    return graph[pkgName].level
  }

  Object.keys(graph).forEach((pkgName) => calculateLevel(pkgName))

  return graph
}

// 可视化依赖关系图
function visualizeDependencyGraph(graph, packagesInfo) {
  console.log('\n依赖关系图谱：')
  console.log('─'.repeat(50))

  // 按层级排序
  const sortedPackages = Object.entries(graph)
    .sort(([, a], [, b]) => a.level - b.level)
    .map(([name, info]) => ({
      name,
      ...info,
      version: packagesInfo[name].version,
    }))

  // 输出每个包的信息
  sortedPackages.forEach((pkg) => {
    const indent = '  '.repeat(pkg.level)
    console.log(`${indent}${pkg.name}@${pkg.version} (层级: ${pkg.level})`)

    if (pkg.dependencies.length > 0) {
      console.log(`${indent}  依赖:`)
      pkg.dependencies.forEach((dep) => {
        console.log(`${indent}    - ${dep}@${packagesInfo[dep].version}`)
      })
    }

    if (pkg.dependents.length > 0) {
      console.log(`${indent}  被依赖:`)
      pkg.dependents.forEach((dep) => {
        console.log(`${indent}    - ${dep}`)
      })
    }
    console.log()
  })

  console.log('─'.repeat(50))
  return sortedPackages.map((pkg) => pkg.name)
}

// 计算新版本号
function calculateNewVersion(version) {
  const [major, minor, patch] = version.split('.').map(Number)
  return `${major}.${minor}.${patch + 1}`
}

// 主处理函数
function processVersionUpdates() {
  const packagesInfo = getAllPackagesInfo()

  // 检查是否有未提交的 package.json 改动
  const hasUncommittedChanges = Object.values(packagesInfo).some((info) => info.hasPackageJsonChanged)
  if (hasUncommittedChanges) {
    console.log('\n警告: 检测到未提交的 package.json 改动')
    console.log('建议先提交或回滚这些改动，以确保版本更新的准确性')
    console.log('是否继续？(按 Ctrl+C 取消)\n')
  }

  const graph = buildDependencyGraph(packagesInfo)
  const updateOrder = visualizeDependencyGraph(graph, packagesInfo)

  console.log('\n开始检查和更新版本...')
  console.log('─'.repeat(50))

  // 第一轮：检查源码改动和依赖变更
  Object.entries(packagesInfo).forEach(([pkgName, info]) => {
    const sourceChanges = hasSourceChanged(info.path)
    const dependencyChanges = hasDependenciesChanged(info.path)
    
    if (sourceChanges.hasChanges || dependencyChanges.hasChanges) {
      info.hasChanged = true
      info.changedFiles = [...sourceChanges.changedFiles, ...dependencyChanges.changedFiles]
    }
  })

  // 计算所有包的最终版本和依赖更新
  const versionUpdates = new Map() // 存储所有需要更新的包信息
  const processedPackages = new Set()

  // 计算单个包的更新信息
  function calculatePackageUpdates(pkgName) {
    const info = packagesInfo[pkgName]

    // 如果已经处理过，直接返回计算好的版本
    if (processedPackages.has(pkgName)) {
      return versionUpdates.get(pkgName)?.newVersion || info.version
    }

    // 标记为已处理
    processedPackages.add(pkgName)

    // 先处理所有依赖
    const depVersions = {}
    let hasUpdatedDeps = false

    // 处理所有依赖，并检查是否有依赖更新了版本
    for (const dep of graph[pkgName].dependencies) {
      const depVersion = calculatePackageUpdates(dep)
      const originalVersion = packagesInfo[dep].version

      // 只有当依赖的版本真的发生变化时，才记录更新
      if (depVersion !== originalVersion) {
        depVersions[dep] = depVersion
        hasUpdatedDeps = true
      }
    }

    // 当源码改动或依赖版本更新时都需要更新版本
    const needsUpdate = info.hasChanged || hasUpdatedDeps

    if (needsUpdate) {
      const newVersion = calculateNewVersion(info.version)
      versionUpdates.set(pkgName, {
        pkgName,
        path: info.path,
        currentVersion: info.version,
        newVersion,
        reason: info.hasChanged 
          ? `源码改动 (变更文件: ${info.changedFiles.join(', ')})` 
          : `依赖更新 (${Object.entries(depVersions).map(([dep, ver]) => `${dep}@${ver}`).join(', ')})`,
        depVersions,
      })
      return newVersion
    }

    return info.version
  }

  // 按顺序计算每个包的更新
  updateOrder.forEach((pkgName) => {
    calculatePackageUpdates(pkgName)
  })

  // 如果没有需要更新的包，直接返回
  if (versionUpdates.size === 0) {
    console.log('\n没有检测到需要更新版本的包')
    return
  }

  // 统一更新所有需要更新的包
  console.log('\n开始更新文件...')
  for (const update of versionUpdates.values()) {
    const pkg = JSON.parse(fs.readFileSync(update.path, 'utf-8'))
    pkg.version = update.newVersion

    // 更新依赖版本
    if (Object.keys(update.depVersions).length > 0) {
      if (pkg.dependencies) {
        Object.entries(update.depVersions).forEach(([depName, version]) => {
          if (pkg.dependencies[depName]) {
            pkg.dependencies[depName] = `^${version}`
          }
        })
      }
      if (pkg.devDependencies) {
        Object.entries(update.depVersions).forEach(([depName, version]) => {
          if (pkg.devDependencies[depName]) {
            pkg.devDependencies[depName] = `^${version}`
          }
        })
      }
    }

    // 写入文件
    fs.writeFileSync(update.path, JSON.stringify(pkg, null, 2) + '\n')

    // 输出更新信息
    console.log(`\n更新 ${update.pkgName}:`)
    console.log(`  当前版本: ${update.currentVersion}`)
    console.log(`  新版本: ${update.newVersion}`)
    console.log(`  更新原因: ${update.reason}`)

    if (Object.keys(update.depVersions).length > 0) {
      console.log('  更新的依赖:')
      Object.entries(update.depVersions).forEach(([depName, version]) => {
        console.log(`    ${depName}: ^${version}`)
      })
    }
  }

  console.log('\n─'.repeat(50))
  console.log('版本更新完成！')
  console.log('更新的包：')
  for (const { pkgName, newVersion } of versionUpdates.values()) {
    console.log(`  ${pkgName}@${newVersion}`)
  }
}

// 执行版本更新
processVersionUpdates()
