#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')

const SKILLS_DIR = path.join(__dirname, '..', 'skills', 'fexd-pro-components')
const REFS_DIR = path.join(SKILLS_DIR, 'references')
const SKILL_NAME = 'fexd-pro-components'
const COMMON_AGENTS = ['cursor', 'codex', 'claude-code', 'opencode']

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
}

function c(color, text) {
  return `${COLORS[color]}${text}${COLORS.reset}`
}

function readMarkdown(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

function normalizeSlash(filePath) {
  return filePath.replace(/\\/g, '/')
}

function getHomeDir() {
  return os.homedir() || process.env.USERPROFILE || process.env.HOME || ''
}

function getConfigHome() {
  const home = getHomeDir()
  return (
    process.env.XDG_CONFIG_HOME ||
    (process.platform === 'win32' ? process.env.APPDATA : '') ||
    path.join(home, '.config')
  )
}

function getAgents() {
  const home = getHomeDir()
  const codexHome = process.env.CODEX_HOME || path.join(home, '.codex')
  const claudeHome = process.env.CLAUDE_CONFIG_DIR || path.join(home, '.claude')

  return {
    cursor: {
      name: 'cursor',
      displayName: 'Cursor',
      projectSkillsDirs: ['.cursor/skills'],
      globalSkillsDir: path.join(home, '.cursor', 'skills'),
    },
    codex: {
      name: 'codex',
      displayName: 'Codex',
      projectSkillsDirs: ['.agents/skills'],
      globalSkillsDir: path.join(codexHome, 'skills'),
    },
    'claude-code': {
      name: 'claude-code',
      displayName: 'Claude Code',
      projectSkillsDirs: ['.claude/skills'],
      globalSkillsDir: path.join(claudeHome, 'skills'),
    },
    opencode: {
      name: 'opencode',
      displayName: 'OpenCode',
      projectSkillsDirs: ['.agents/skills'],
      globalSkillsDir: path.join(home, '.agents', 'skills'),
    },
  }
}

function parseOptions(args) {
  const options = {
    agents: COMMON_AGENTS.slice(),
    scope: 'project',
    cwd: process.cwd(),
    force: false,
    copy: false,
    dryRun: false,
    gitignore: true,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const next = args[i + 1]

    if (arg === '--agents' && next) {
      options.agents = next
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
      i++
    } else if (arg.indexOf('--agents=') === 0) {
      options.agents = arg
        .slice('--agents='.length)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    } else if (arg === '--scope' && next) {
      options.scope = next
      i++
    } else if (arg.indexOf('--scope=') === 0) {
      options.scope = arg.slice('--scope='.length)
    } else if (arg === '--cwd' && next) {
      options.cwd = next
      i++
    } else if (arg.indexOf('--cwd=') === 0) {
      options.cwd = arg.slice('--cwd='.length)
    } else if (arg === '--force') {
      options.force = true
    } else if (arg === '--copy') {
      options.copy = true
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--no-gitignore') {
      options.gitignore = false
    } else if (arg === '--gitignore') {
      options.gitignore = true
    } else {
      throw new Error(`未知参数：${arg}`)
    }
  }

  if (!options.agents.length || options.agents.indexOf('common') >= 0) {
    options.agents = COMMON_AGENTS.slice()
  }

  if (['project', 'global', 'both'].indexOf(options.scope) < 0) {
    throw new Error(`不支持的 scope：${options.scope}。可选值：project, global, both`)
  }

  return options
}

function findWorkspaceRoot(cwd) {
  let current = path.resolve(cwd)
  let nearestPackageRoot = null

  while (true) {
    const packageJsonPath = path.join(current, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      nearestPackageRoot = nearestPackageRoot || current
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
        if (pkg.workspaces) return current
      } catch {
        // ignore invalid package.json and continue walking upward
      }
    }

    if (fs.existsSync(path.join(current, 'pnpm-workspace.yaml')) || fs.existsSync(path.join(current, 'lerna.json'))) {
      return current
    }

    const parent = path.dirname(current)
    if (parent === current) break
    current = parent
  }

  return nearestPackageRoot || path.resolve(cwd)
}

function parseSkillFrontmatter(content) {
  const match = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/)
  if (!match) return null

  const yaml = match[1]
  return {
    name: (yaml.match(/^\s*name\s*:\s*(.+?)\s*$/m) || [])[1],
    hasDescription: /^\s*description\s*:/m.test(yaml),
  }
}

function validateSkillSource() {
  const skillMdPath = path.join(SKILLS_DIR, 'SKILL.md')
  if (!fs.existsSync(skillMdPath)) {
    throw new Error(`未找到 SKILL.md：${skillMdPath}`)
  }

  const frontmatter = parseSkillFrontmatter(fs.readFileSync(skillMdPath, 'utf8'))
  if (!frontmatter) {
    throw new Error('SKILL.md 必须以 YAML frontmatter 开头')
  }

  if (frontmatter.name !== SKILL_NAME) {
    throw new Error(`SKILL.md name 应为 ${SKILL_NAME}，当前为 ${frontmatter.name || '空'}`)
  }

  if (!frontmatter.hasDescription) {
    throw new Error('SKILL.md frontmatter 缺少 description')
  }
}

function removeSync(target) {
  if (!fs.existsSync(target)) return

  const stat = fs.lstatSync(target)
  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    fs.readdirSync(target).forEach((name) => removeSync(path.join(target, name)))
    fs.rmdirSync(target)
  } else {
    fs.unlinkSync(target)
  }
}

function copyDirSync(source, target) {
  fs.mkdirSync(target, { recursive: true })
  fs.readdirSync(source).forEach((name) => {
    const sourcePath = path.join(source, name)
    const targetPath = path.join(target, name)
    const stat = fs.lstatSync(sourcePath)

    if (stat.isDirectory()) {
      copyDirSync(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

function isSameLinkTarget(source, target) {
  const parent = path.dirname(target)
  const currentTarget = fs.readlinkSync(target)
  return (
    path.resolve(parent, currentTarget) === path.resolve(source) || path.resolve(currentTarget) === path.resolve(source)
  )
}

function ensureLinkOrCopy(source, target, options) {
  const relativeTarget = normalizeSlash(path.relative(options.workspaceRoot, target))
  const action = options.copy ? 'copy' : 'link'

  if (options.dryRun) {
    console.log(`  ${c('dim', '[dry-run]')} ${action} ${c('cyan', relativeTarget)}`)
    return
  }

  fs.mkdirSync(path.dirname(target), { recursive: true })

  if (fs.existsSync(target)) {
    const stat = fs.lstatSync(target)
    if (stat.isSymbolicLink()) {
      if (isSameLinkTarget(source, target)) {
        console.log(`  ${c('green', 'OK')} ${relativeTarget}`)
        return
      }
      removeSync(target)
    } else if (options.force) {
      removeSync(target)
    } else {
      throw new Error(`目标已存在且不是链接：${target}。如需覆盖，请添加 --force`)
    }
  }

  if (options.copy) {
    copyDirSync(source, target)
    console.log(`  ${c('green', 'Copied')} ${relativeTarget}`)
    return
  }

  try {
    fs.symlinkSync(source, target, process.platform === 'win32' ? 'junction' : 'dir')
    console.log(`  ${c('green', 'Linked')} ${relativeTarget}`)
  } catch (error) {
    copyDirSync(source, target)
    console.log(`  ${c('yellow', 'Copied')} ${relativeTarget} ${c('dim', `(symlink failed: ${error.message})`)}`)
  }
}

function resolveAgents(agentNames) {
  const agents = getAgents()
  const names = []

  agentNames.forEach((agentName) => {
    if (agentName === 'common') {
      COMMON_AGENTS.forEach((name) => names.push(name))
    } else {
      names.push(agentName)
    }
  })

  return names
    .filter((name, index) => names.indexOf(name) === index)
    .map((name) => {
      if (!agents[name]) {
        throw new Error(`不支持的 agent：${name}。可选值：${COMMON_AGENTS.join(', ')}, common`)
      }
      return agents[name]
    })
}

function getTargetsForAgent(agent, workspaceRoot, scope) {
  const scopes = scope === 'both' ? ['project', 'global'] : [scope]
  const targets = []

  scopes.forEach((item) => {
    if (item === 'project') {
      agent.projectSkillsDirs.forEach((dir) => {
        targets.push({
          agent,
          scope: item,
          path: path.join(workspaceRoot, dir, SKILL_NAME),
        })
      })
    }

    if (item === 'global') {
      targets.push({
        agent,
        scope: item,
        path: path.join(agent.globalSkillsDir, SKILL_NAME),
      })
    }
  })

  return targets
}

function uniqueTargets(targets) {
  const seen = {}
  const result = []

  targets.forEach((target) => {
    const key = path.resolve(target.path).toLowerCase()
    if (seen[key]) {
      seen[key].agents.push(target.agent)
      return
    }

    const mergedTarget = Object.assign({}, target, { agents: [target.agent] })
    seen[key] = mergedTarget
    result.push(mergedTarget)
  })

  return result
}

function getTargetDisplayName(target) {
  return (target.agents || [target.agent])
    .map((agent) => agent.displayName)
    .filter((name, index, list) => list.indexOf(name) === index)
    .join(' / ')
}

function toGitignorePattern(workspaceRoot, target) {
  return normalizeSlash(path.relative(workspaceRoot, target))
}

function updateGitignore(workspaceRoot, targets, options) {
  if (!options.gitignore || options.scope === 'global') return

  const patterns = targets
    .filter((target) => target.scope === 'project')
    .map((target) => toGitignorePattern(workspaceRoot, target.path))
    .filter((pattern) => pattern && pattern.indexOf('..') !== 0)
    .filter((pattern, index, list) => list.indexOf(pattern) === index)

  if (!patterns.length) return

  const gitignorePath = path.join(workspaceRoot, '.gitignore')
  const content = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : ''
  const lines = content.split(/\r?\n/)
  const missing = patterns.filter((pattern) => lines.indexOf(pattern) < 0)

  if (!missing.length) return

  const block = ['', '# Agent skills installed from npm packages'].concat(missing).join('\n')

  if (options.dryRun) {
    console.log(`\n  ${c('dim', '[dry-run]')} update .gitignore:`)
    missing.forEach((pattern) => console.log(`    ${pattern}`))
    return
  }

  fs.writeFileSync(gitignorePath, content.replace(/\s*$/, '') + block + '\n')
  console.log(`\n  ${c('green', 'Updated')} .gitignore`)
}

function installSkills(args) {
  const options = parseOptions(args)
  const workspaceRoot = findWorkspaceRoot(options.cwd)
  const agents = resolveAgents(options.agents)
  const targets = uniqueTargets(
    agents.reduce((list, agent) => list.concat(getTargetsForAgent(agent, workspaceRoot, options.scope)), []),
  )

  validateSkillSource()

  console.log(`\n${c('bold', c('cyan', '  @fexd/pro-components skills'))}\n`)
  console.log(`  ${c('dim', 'workspace:')} ${workspaceRoot}`)
  console.log(`  ${c('dim', 'source:')} ${SKILLS_DIR}`)
  console.log()

  targets.forEach((target) => {
    const scope = target.scope === 'global' ? c('magenta', 'global') : c('cyan', 'project')
    console.log(`  ${c('bold', getTargetDisplayName(target))} ${scope}`)
    ensureLinkOrCopy(SKILLS_DIR, target.path, Object.assign({}, options, { workspaceRoot }))
  })

  updateGitignore(workspaceRoot, targets, options)
  console.log()
}

function showSkillsHelp() {
  console.log(`
  ${c('bold', c('cyan', '@fexd/pro-components skills'))}

  ${c('bold', '用法：')}
    ${c('green', 'pro-components skills install')}                         安装到常见 agent 的项目目录
    ${c('green', 'pro-components skills install --agents cursor,codex')}    指定 agent
    ${c('green', 'pro-components skills install --scope global')}           安装到用户全局目录

  ${c('bold', 'Options：')}
    ${c('cyan', '--agents <list>')}      common, cursor, codex, claude-code, opencode；默认 common
    ${c('cyan', '--scope <scope>')}      project, global, both；默认 project
    ${c('cyan', '--cwd <path>')}         指定消费项目目录；默认当前目录
    ${c('cyan', '--force')}              目标已存在普通文件/目录时强制覆盖
    ${c('cyan', '--copy')}               复制 skill 目录，不创建链接
    ${c('cyan', '--dry-run')}            只打印计划，不写文件
    ${c('cyan', '--no-gitignore')}       不自动更新项目 .gitignore

  ${c('bold', '示例：')}
    ${c('dim', '$')} pro-components skills install
    ${c('dim', '$')} pro-components skills install --agents cursor,claude-code,opencode
    ${c('dim', '$')} pro-components skills install --agents codex --scope global
    ${c('dim', '$')} pro-components skills install --copy

  ${c('bold', '默认项目目录：')}
    ${c('dim', 'Cursor')}      .cursor/skills
    ${c('dim', 'Codex')}       .agents/skills
    ${c('dim', 'Claude Code')} .claude/skills
    ${c('dim', 'OpenCode')}    .agents/skills
`)
}

function listComponents() {
  console.log(`\n${c('bold', c('cyan', '  @fexd/pro-components'))} ${c('dim', '— 组件与工具列表')}\n`)

  const componentMap = {
    数据展示: ['ProTable'],
    表单: ['ProForm', 'ProField'],
    全局配置: ['ConfigProvider'],
    工具组件: [
      'Action',
      'Actions',
      'DropdownButton',
      'showModal',
      'showImages',
      'showDrawer',
      'Button',
      'Popconfirm',
      'Switch',
      'Tooltip',
      'EllipsisTooltip',
      'Grid',
      'Portal',
      'ErrorBoundary',
      'PreviewImageGroup',
      'confirmPromise',
      'showTipsWithResponse',
      'closeAll',
    ],
    Hooks: [
      'useCoverable',
      'useDebounce',
      'useAutoLoading',
      'useRequest',
      'useProState',
      'useThrottle',
      'useForceUpdate',
      'useLazyRender',
      'useGetLatest',
      'usePreferredDark',
      'useInitializeTasks',
    ],
    工具函数: [
      'request',
      'defineApi',
      'deepMerge',
      'catchPromise',
      'createSharedHook',
      'dayjsTZ',
      'filterObjectEmptyValue',
    ],
    基础工厂: ['createBC', 'useConfigurable'],
  }

  for (const [category, items] of Object.entries(componentMap)) {
    console.log(`  ${c('yellow', '■')} ${c('bold', category)}`)
    for (const item of items) {
      const refPath = path.join(REFS_DIR, `${item}.md`)
      const exists = fs.existsSync(refPath)
      const icon = exists ? c('green', '●') : c('dim', '○')
      console.log(`    ${icon} ${item}${exists ? '' : c('dim', ' (无文档)')}`)
    }
    console.log()
  }

  console.log(`  ${c('dim', '使用')} ${c('cyan', 'pro-components docs <name>')} ${c('dim', '查看详细文档')}`)
  console.log()
}

function showDocs(name) {
  const refPath = path.join(REFS_DIR, `${name}.md`)
  let content = readMarkdown(refPath)

  if (!content) {
    const skillFiles = ['catalog', 'architecture', 'guide', 'utilities', 'source-navigation']
    if (skillFiles.includes(name.toLowerCase())) {
      content = readMarkdown(path.join(SKILLS_DIR, `${name.toLowerCase()}.md`))
    }
  }

  if (!content) {
    const files = fs.existsSync(REFS_DIR) ? fs.readdirSync(REFS_DIR) : []
    const match = files.find((f) => f.toLowerCase() === `${name.toLowerCase()}.md`)
    if (match) {
      content = readMarkdown(path.join(REFS_DIR, match))
    }
  }

  if (!content) {
    console.log(`\n  ${c('red', '✗')} 未找到 "${name}" 的文档\n`)
    console.log(`  ${c('dim', '可用的文档：')}`)
    if (fs.existsSync(REFS_DIR)) {
      const files = fs.readdirSync(REFS_DIR).map((f) => f.replace('.md', ''))
      console.log(`  ${c('cyan', files.join(', '))}`)
    }
    console.log(`  ${c('dim', '以及：')} ${c('cyan', 'catalog, architecture, guide, utilities, source-navigation')}`)
    console.log()
    return
  }

  console.log()
  console.log(content)
}

function searchDocs(query) {
  const lowerQuery = query.toLowerCase()
  const results = []

  const searchDir = (dir, prefix = '') => {
    if (!fs.existsSync(dir)) return
    const files = fs.readdirSync(dir)
    for (const file of files) {
      if (!file.endsWith('.md')) continue
      const filePath = path.join(dir, file)
      const content = readMarkdown(filePath)
      if (!content) continue

      const lines = content.split('\n')
      const matches = []
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(lowerQuery)) {
          matches.push({ line: i + 1, text: lines[i].trim() })
        }
      }

      if (matches.length > 0) {
        results.push({ file: `${prefix}${file}`, matches })
      }
    }
  }

  searchDir(SKILLS_DIR)
  searchDir(REFS_DIR, 'references/')

  if (results.length === 0) {
    console.log(`\n  ${c('red', '✗')} 未找到包含 "${query}" 的内容\n`)
    return
  }

  console.log(`\n  ${c('bold', c('green', '✓'))} 找到 ${results.length} 个文件包含 "${c('cyan', query)}"\n`)

  for (const result of results) {
    console.log(`  ${c('yellow', '■')} ${c('bold', result.file)}`)
    const shown = result.matches.slice(0, 3)
    for (const match of shown) {
      const highlighted = match.text.replace(new RegExp(query, 'gi'), (m) => c('cyan', c('bold', m)))
      console.log(`    ${c('dim', `L${match.line}:`)} ${highlighted}`)
    }
    if (result.matches.length > 3) {
      console.log(`    ${c('dim', `... 还有 ${result.matches.length - 3} 处匹配`)}`)
    }
    console.log()
  }
}

function showHelp() {
  console.log(`
  ${c('bold', c('cyan', '@fexd/pro-components CLI'))}

  ${c('bold', '用法：')}
    ${c('green', 'pro-components list')}                 列出所有组件和工具
    ${c('green', 'pro-components docs <name>')}          查看组件/工具文档
    ${c('green', 'pro-components search <query>')}       搜索文档内容
    ${c('green', 'pro-components skills install')}       安装内置 agent skill
    ${c('green', 'pro-components help')}                 显示帮助信息

  ${c('bold', '示例：')}
    ${c('dim', '$')} pro-components docs ProTable
    ${c('dim', '$')} pro-components docs showModal
    ${c('dim', '$')} pro-components docs guide
    ${c('dim', '$')} pro-components search 分页
    ${c('dim', '$')} pro-components search "查询表单"
    ${c('dim', '$')} pro-components skills install
    ${c('dim', '$')} pro-components skills install --agents cursor,claude-code,opencode
    ${c('dim', '$')} pro-components skills install --agents codex --scope global

  ${c('bold', '别名：')}
    ${c('dim', '$')} npx @fexd/pro-components list
    ${c('dim', '$')} npx @fexd/pro-components docs ProTable
`)
}

const [, , command, ...args] = process.argv

const commandMap = {
  list: listComponents,
  ls: listComponents,
  docs: () => (args[0] ? showDocs(args[0]) : showHelp()),
  doc: () => (args[0] ? showDocs(args[0]) : showHelp()),
  search: () => (args.length > 0 ? searchDocs(args.join(' ')) : showHelp()),
  find: () => (args.length > 0 ? searchDocs(args.join(' ')) : showHelp()),
  skills: () => {
    if (args[0] === 'install') {
      if (args.indexOf('--help') >= 0 || args.indexOf('-h') >= 0) {
        showSkillsHelp()
        return
      }
      installSkills(args.slice(1))
      return
    }
    showSkillsHelp()
  },
  help: showHelp,
  '-h': showHelp,
  '--help': showHelp,
}

const handler = commandMap[command]
try {
  if (handler) {
    handler()
  } else if (command) {
    showDocs(command)
  } else {
    showHelp()
  }
} catch (error) {
  console.error(`\n  ${c('red', '✗')} ${error.message}\n`)
  process.exit(1)
}
