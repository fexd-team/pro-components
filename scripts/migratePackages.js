const fs = require('fs')
const path = require('path')
const ignore = require('ignore')

// 获取命令行参数
const targetDir = process.argv[2]
if (!targetDir) {
  console.error('\n错误: 缺少目标目录参数')
  console.error('\n使用方法:')
  console.error('  node scripts/migratePackages.js <目标目录>')
  console.error('\n示例:')
  console.error('  在 Git Bash 中：')
  console.error('    node scripts/migratePackages.js "C:/Projects/my-project"')
  console.error('  在 CMD 或 PowerShell 中：')
  console.error('    node scripts/migratePackages.js "C:\\Projects\\my-project"')
  console.error('\n注意事项:')
  console.error('  1. 目标目录必须是绝对路径')
  console.error('  2. 建议用引号包裹路径，避免空格等特殊字符问题')
  console.error('  3. 路径分隔符可以用正斜杠(/) 或 双反斜杠(\\\\)')
  console.error('  4. 目标目录必须已存在')
  console.error('  5. 如果目标目录已存在，相同的文件会被覆盖')
  process.exit(1)
}

// 规范化路径
const normalizedTargetDir = path.normalize(targetDir)

// 检查目标路径是否是绝对路径
if (!path.isAbsolute(normalizedTargetDir)) {
  console.error('\n错误: 目标目录必须是绝对路径')
  console.error(`当前提供的路径: ${normalizedTargetDir}`)
  process.exit(1)
}

// 检查目标目录是否存在
if (!fs.existsSync(normalizedTargetDir)) {
  console.error('\n错误: 目标目录不存在')
  console.error(`目标目录: ${normalizedTargetDir}`)
  process.exit(1)
}

// 要忽略的文件列表
const additionalIgnores = [
  '**/unpublish.js', // 忽略所有 unpublish.js 文件
  'scripts/unpublish.js', // 明确忽略 scripts 目录下的 unpublish.js
  'node_modules',
  '.git',
  '.DS_Store',
  'lib',
  'es',
  '*.log',
]

// 读取 .gitignore 文件并创建 ignore 实例
function createIgnore(baseDir) {
  const ig = ignore()

  // 添加额外的忽略规则
  ig.add(additionalIgnores)

  // 读取 .gitignore 文件
  const gitignorePath = path.join(baseDir, '.gitignore')
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')
    ig.add(gitignoreContent)
  }

  return ig
}

// 递归获取目录下的所有文件
function getAllFiles(dir, baseDir = '', ig) {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')

    // 特殊处理 unpublish.js
    if (entry.name === 'unpublish.js' && relativePath.includes('scripts/')) {
      continue
    }

    if (entry.isDirectory()) {
      // 如果目录被忽略，跳过整个目录
      if (!ig.ignores(relativePath)) {
        files.push(...getAllFiles(fullPath, baseDir, ig))
      }
    } else {
      // 检查文件是否被忽略
      if (!ig.ignores(relativePath)) {
        files.push(relativePath)
      }
    }
  }

  return files
}

// 确保目标目录存在
function ensureDir(dir) {
  // 只确保子目录存在，不创建第一层目录
  const parentDir = path.dirname(dir)
  if (parentDir !== normalizedTargetDir && !fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true })
  }
}

// 复制文件，确保目标目录存在
function copyFile(source, target) {
  ensureDir(path.dirname(target))
  fs.copyFileSync(source, target)
}

// 迁移指定目录的文件
function migrateDirectory(sourceDir, targetDir, description) {
  console.log(`\n处理${description}...`)

  try {
    // 确保目标目录存在
    ensureDir(targetDir)

    // 创建 ignore 实例
    const ig = createIgnore(sourceDir)

    // 获取所有未被忽略的文件
    const files = getAllFiles(sourceDir, sourceDir, ig)

    // 复制文件
    let copiedCount = 0
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file)
      const targetPath = path.join(targetDir, file)

      try {
        copyFile(sourcePath, targetPath)
        copiedCount++
      } catch (err) {
        console.error(`  无法复制文件 ${file}: ${err.message}`)
      }
    }

    console.log(`  成功迁移 ${copiedCount} 个文件`)
    return copiedCount
  } catch (err) {
    console.error(`  处理${description}时发生错误: ${err.message}`)
    return 0
  }
}

// 主函数
function migrateFiles() {
  // 获取当前工作目录
  const currentDir = process.cwd()

  // 检查源目录是否存在
  if (!fs.existsSync(path.join(currentDir, 'packages'))) {
    console.error('\n错误: 未找到 packages 目录')
    console.error('请确保在项目根目录下运行此脚本')
    process.exit(1)
  }

  // 定义要迁移的目录
  const directories = [
    {
      source: path.join(currentDir, 'packages'),
      target: path.join(normalizedTargetDir, 'packages'),
      description: 'packages 目录',
    },
    {
      source: path.join(currentDir, 'documents'),
      target: path.join(normalizedTargetDir, 'documents'),
      description: 'documents 目录',
    },
    {
      source: path.join(currentDir, 'scripts'),
      target: path.join(normalizedTargetDir, 'scripts'),
      description: 'scripts 目录',
    },
  ]

  console.log('\n开始迁移文件...')
  console.log(`源目录: ${currentDir}`)
  console.log(`目标目录: ${normalizedTargetDir}`)
  console.log('\n忽略的文件模式:')
  additionalIgnores.forEach((pattern) => console.log(`  - ${pattern}`))
  console.log('\n' + '─'.repeat(50))

  try {
    // 检查目标根目录是否存在
    if (!fs.existsSync(normalizedTargetDir)) {
      throw new Error(`目标目录不存在: ${normalizedTargetDir}`)
    }

    // 迁移 packages 目录下的每个包
    const packagesDir = directories[0]
    if (!fs.existsSync(packagesDir.source)) {
      throw new Error('packages 目录不存在')
    }

    const packages = fs.readdirSync(packagesDir.source).filter((item) => {
      const stat = fs.statSync(path.join(packagesDir.source, item))
      return stat.isDirectory()
    })

    if (packages.length === 0) {
      throw new Error('packages 目录为空')
    }

    let totalFiles = 0

    // 处理每个包
    for (const pkg of packages) {
      const packageDir = path.join(packagesDir.source, pkg)
      const targetPackageDir = path.join(packagesDir.target, pkg)
      const count = migrateDirectory(packageDir, targetPackageDir, `包: ${pkg}`)
      if (count === 0) {
        console.warn(`警告: ${pkg} 包没有迁移任何文件`)
      }
      totalFiles += count
    }

    // 处理 documents 和 scripts 目录
    for (let i = 1; i < directories.length; i++) {
      const dir = directories[i]
      if (fs.existsSync(dir.source)) {
        const count = migrateDirectory(dir.source, dir.target, dir.description)
        if (count === 0) {
          console.warn(`警告: ${dir.description} 没有迁移任何文件`)
        }
        totalFiles += count
      } else {
        console.log(`\n${dir.description}不存在，跳过`)
      }
    }

    if (totalFiles === 0) {
      throw new Error('没有迁移任何文件')
    }

    console.log('\n' + '─'.repeat(50))
    console.log(`\n迁移完成！共迁移 ${totalFiles} 个文件`)
    console.log(`目标目录: ${normalizedTargetDir}`)
    console.log('\n你可以检查以下目录:')
    directories.forEach(dir => {
      if (fs.existsSync(dir.target)) {
        console.log(`  - ${dir.target}`)
      }
    })
  } catch (err) {
    console.error('\n迁移失败:', err.message)
    process.exit(1)
  }
}

// 执行迁移
migrateFiles()
