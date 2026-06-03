#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const SKILLS_DIR = path.join(__dirname, '..', 'skills', 'fexd-pro-components')
const REFS_DIR = path.join(SKILLS_DIR, 'references')

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

function showSkillsHelp() {
  console.log(`
  ${c('bold', c('cyan', '@fexd/pro-components skills'))}

  ${c('yellow', 'pro-components 不再内置 skill 安装能力。')}
  请使用 ${c('green', 'fexd-tools skills install')} 统一发现并安装当前项目依赖包发布的 skills。

  ${c('bold', '推荐命令：')}
    ${c('dim', '$')} fexd-tools skills install @fexd/pro-components
    ${c('dim', '$')} fexd-tools skills install @fexd/pro-components --agents cursor,codex,claude-code,opencode
    ${c('dim', '$')} fexd-tools skills install @fexd/pro-components --scope global

  ${c('bold', '安装全部可发现 skills：')}
    ${c('dim', '$')} fexd-tools skills install

  ${c('dim', '提示：fexd-tools 会扫描 node_modules 和 workspace 包中的 skills/*/SKILL.md。')}
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
    ${c('green', 'fexd-tools skills install')}           安装本库及依赖包 skills
    ${c('green', 'pro-components help')}                 显示帮助信息

  ${c('bold', '示例：')}
    ${c('dim', '$')} pro-components docs ProTable
    ${c('dim', '$')} pro-components docs showModal
    ${c('dim', '$')} pro-components docs guide
    ${c('dim', '$')} pro-components search 分页
    ${c('dim', '$')} pro-components search "查询表单"
    ${c('dim', '$')} fexd-tools skills install @fexd/pro-components
    ${c('dim', '$')} fexd-tools skills install @fexd/pro-components --agents cursor,claude-code,opencode

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
      showSkillsHelp()
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
