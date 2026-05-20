# @fexd/pro-components 内置 Skills 注册方案

> 状态说明：本文是 CLI skills 注册能力的设计草稿与后续路线图，不完全等同于当前已落地实现。当前代码已实现 `skills install`、`common/cursor/codex/claude-code/opencode`、`project/global/both`、`copy/force/dry-run/gitignore`；`doctor`、`auto/all/universal` 与更多 agent 适配仍属于后续可选增强。

## 背景

`@fexd/pro-components` 已经随 npm 包发布了内置 skill：

```text
node_modules/@fexd/pro-components/skills/fexd-pro-components/SKILL.md
node_modules/@fexd/pro-components/skills/fexd-pro-components/references/**
```

当前项目通过 `skills-npm` 扫描 npm 包并创建 skill 软链接，但通用扫描器存在兼容性成本，例如：

- 需要额外安装 `skills-npm`
- 依赖 `SKILL.md` frontmatter 解析，报错信息较粗
- 需要适配 monorepo、pnpm symlink、Windows junction
- 只能做通用发现，无法针对 `@fexd/pro-components` 给出更清晰的诊断

因为 `@fexd/pro-components` 是自维护组件库，且 skill 目录固定，建议把注册能力内置到组件库 CLI：`pro-components`。

目标效果应接近 `skills-npm`：消费项目运行一条命令后，自动把组件库内置 skill 注册到 agent 可识别的位置。

另一个重要目标是 Node 版本兼容。`skills-npm@1.x` 的部分依赖要求 Node 20+，而 `@fexd/pro-components` 当前消费项目通常仍在 Node 14/16/18 混用。内置实现必须避免 Node 20+ 专属 API，至少兼容 Node 16，最好兼容 Node 14。

## 推荐命令

在 `node_modules/@fexd/pro-components/cli/index.js` 增加命令：

```bash
pro-components skills install
pro-components skills install --agents cursor
pro-components skills install --agents cursor,codex
pro-components skills install --agents auto
pro-components skills install --agents all
pro-components skills install --no-gitignore
pro-components skills doctor
```

建议消费项目脚本：

```json
{
  "scripts": {
    "prepare:pro-skills": "pro-components skills install"
  }
}
```

若后续支持 Codex：

```json
{
  "scripts": {
    "prepare:pro-skills": "pro-components skills install --agents cursor,codex"
  }
}
```

## Node 版本兼容要求

### 目标版本

建议最低兼容：

```text
Node >= 14.18.0
```

至少必须兼容：

```text
Node >= 16.20.2
```

### 实现约束

`cli/index.js` 当前是 CommonJS 脚本，应继续保持：

```js
#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
```

不要引入会提升 Node 版本要求的依赖，也不要使用 Node 20+ API。

避免使用：

- ESM-only 依赖
- top-level await
- `fs.cpSync`，Node 16.7 才引入，Node 14 不可用
- `fs.rmSync` 作为唯一实现，Node 14.14 才引入；如要兼容更低 14，需要 fallback
- `node:` specifier，Node 14 可用但老工具链有时不稳，CLI 里可直接 `require('fs')`
- `Array.prototype.toSorted` / `toReversed` 等新语法
- optional catch binding 没问题，但建议保持简单写法

推荐使用：

- `fs.existsSync`
- `fs.statSync`
- `fs.lstatSync`
- `fs.mkdirSync(path, { recursive: true })`
- `fs.symlinkSync`
- `fs.readlinkSync`
- `fs.unlinkSync`
- 自实现 `copyDirSync`
- 自实现 `removeSync`

### 不依赖 gray-matter

为了避免额外依赖和 Node engine 问题，`SKILL.md` frontmatter 校验只做轻量正则即可：

```js
function parseSkillFrontmatter(content) {
  const match = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/)
  if (!match) return null
  const yaml = match[1]
  return {
    name: (yaml.match(/^\s*name\s*:\s*(.+?)\s*$/m) || [])[1],
    description: /^\s*description\s*:/m.test(yaml),
  }
}
```

这里不需要完整 YAML parser，因为只校验 `name` 和 `description` 是否存在即可。

## Agent 适配设计

不要只硬编码 Cursor 和 Codex。建议参考 `skills-npm` 的思路维护一张 agent adapter 表，每个 agent 只描述：

- `name`
- `displayName`
- `projectSkillsDir`
- `globalSkillsDir`
- `detectInstalled()`
- `defaultScope`，默认安装到 project 还是 global

### 推荐支持的 agents

第一期建议支持这些常用工具：

| agent | 项目级目录 | 全局目录 | 检测方式 |
| --- | --- | --- | --- |
| universal | `.agents/skills` | `%APPDATA%/agents/skills` 或 `~/.config/agents/skills` | 不自动检测，仅显式指定 |
| cursor | `.agents/skills` | `~/.cursor/skills` | `~/.cursor` 存在 |
| codex | `.agents/skills` | `$CODEX_HOME/skills` 或 `~/.codex/skills` | `$CODEX_HOME` / `~/.codex` / `/etc/codex` 存在 |
| claude-code | `.claude/skills` | `$CLAUDE_CONFIG_DIR/skills` 或 `~/.claude/skills` | `$CLAUDE_CONFIG_DIR` / `~/.claude` 存在 |
| windsurf | `.windsurf/skills` | `~/.codeium/windsurf/skills` | `~/.codeium/windsurf` 存在 |
| trae | `.trae/skills` | `~/.trae/skills` | `~/.trae` 存在 |
| qwen-code | `.qwen/skills` | `~/.qwen/skills` | `~/.qwen` 存在 |
| roo | `.roo/skills` | `~/.roo/skills` | `~/.roo` 存在 |
| openhands | `.openhands/skills` | `~/.openhands/skills` | `~/.openhands` 存在 |

说明：

- `universal` 对应通用 `.agents/skills`，适合项目内共享。
- Cursor 在 `skills-npm` 中也使用项目级 `.agents/skills`，同时有全局 `~/.cursor/skills`。当前项目额外使用 `.cursor/skills`，可作为兼容目标保留。
- Codex 当前更推荐用户级 `~/.codex/skills`，项目级 `.agents/skills` 是否生效取决于 Codex 版本和宿主配置，因此 `codex` 默认建议安装到 global。

### adapter 示例

```js
const os = require('os')
const path = require('path')
const fs = require('fs')

const home = os.homedir()
const configHome =
  process.env.XDG_CONFIG_HOME || (process.platform === 'win32' ? process.env.APPDATA : path.join(home, '.config'))

const codexHome = process.env.CODEX_HOME || path.join(home, '.codex')
const claudeHome = process.env.CLAUDE_CONFIG_DIR || path.join(home, '.claude')

const AGENTS = {
  universal: {
    name: 'universal',
    displayName: 'Universal',
    projectSkillsDir: '.agents/skills',
    globalSkillsDir: path.join(configHome, 'agents/skills'),
    defaultScope: 'project',
    detectInstalled: function () {
      return false
    },
  },
  cursor: {
    name: 'cursor',
    displayName: 'Cursor',
    projectSkillsDir: '.agents/skills',
    legacyProjectSkillsDirs: ['.cursor/skills'],
    globalSkillsDir: path.join(home, '.cursor/skills'),
    defaultScope: 'project',
    detectInstalled: function () {
      return fs.existsSync(path.join(home, '.cursor'))
    },
  },
  codex: {
    name: 'codex',
    displayName: 'Codex',
    projectSkillsDir: '.agents/skills',
    globalSkillsDir: path.join(codexHome, 'skills'),
    defaultScope: 'global',
    detectInstalled: function () {
      return fs.existsSync(codexHome) || fs.existsSync('/etc/codex')
    },
  },
  'claude-code': {
    name: 'claude-code',
    displayName: 'Claude Code',
    projectSkillsDir: '.claude/skills',
    globalSkillsDir: path.join(claudeHome, 'skills'),
    defaultScope: 'project',
    detectInstalled: function () {
      return fs.existsSync(claudeHome)
    },
  },
  windsurf: {
    name: 'windsurf',
    displayName: 'Windsurf',
    projectSkillsDir: '.windsurf/skills',
    globalSkillsDir: path.join(home, '.codeium/windsurf/skills'),
    defaultScope: 'project',
    detectInstalled: function () {
      return fs.existsSync(path.join(home, '.codeium/windsurf'))
    },
  },
}
```

### --agents 语义

```text
--agents cursor,codex     安装到指定 agents
--agents auto             自动检测已安装 agents
--agents all              安装到所有已知 agents 的默认目录
未传 --agents             默认 universal
```

建议默认值：

```text
universal
```

原因：`universal` 对应通用项目级 `.agents/skills`，兼容面最好，也不会默认写入用户全局目录。Cursor、Codex 等工具如果支持 `.agents/skills`，可直接复用；如果需要工具专属目录，再由用户显式传 `--agents cursor` 或 `--agents codex`。

### --scope 语义

可选增加：

```text
--scope project
--scope global
--scope both
```

默认值：

```text
project
```

也就是说，不传 `--scope` 时统一安装到项目局部目录，不写用户全局目录。用户显式指定 `--scope global` 或 `--scope both` 时才写全局目录。

如后续确实需要遵循 agent 的推荐默认范围，可增加：

```text
--scope default
```

用于读取 agent 的 `defaultScope`。

对于 `cursor`，当前项目可特殊处理：

```text
project = .agents/skills + .cursor/skills
global = ~/.cursor/skills
```

对于 `codex`：

```text
project = .agents/skills
global = ~/.codex/skills
```

## 注册目标

### Cursor / agents 项目内目录

为了兼容当前项目习惯，`cursor` agent 建议同时维护两处：

```text
<workspace>/.agents/skills/fexd-pro-components
<workspace>/.cursor/skills/fexd-pro-components
```

两处都指向：

```text
<workspace>/node_modules/@fexd/pro-components/skills/fexd-pro-components
```

目标目录名必须与 `SKILL.md` frontmatter 中的 `name` 保持一致：

```text
fexd-pro-components
```

不要沿用 `skills-npm` 的 `npm-<package>-<skill>` 命名。部分 agent 会校验目录名与 `SKILL.md` 中的 `name` 是否一致，不一致时不会载入，例如 opencode。

### Codex 用户级目录

Codex 当前更常见的 skill 目录是用户级：

```text
%USERPROFILE%/.codex/skills/fexd-pro-components
```

或由环境变量指定：

```text
$CODEX_HOME/skills/fexd-pro-components
```

如果实现 `--agents codex`，建议优先读取：

1. `process.env.CODEX_HOME`
2. Windows: `process.env.USERPROFILE + '/.codex'`
3. macOS/Linux: `process.env.HOME + '/.codex'`

Codex 目录同样使用原始 skill name：

```text
fexd-pro-components
```

## 路径发现规则

### 组件库 skill 源目录

CLI 位于：

```text
node_modules/@fexd/pro-components/cli/index.js
```

因此源目录可由 `__dirname` 推导：

```js
const PACKAGE_ROOT = path.resolve(__dirname, '..')
const SKILL_SOURCE = path.join(PACKAGE_ROOT, 'skills', 'fexd-pro-components')
```

### 消费项目 workspace 根目录

从 `process.cwd()` 开始向上查找：

1. `pnpm-workspace.yaml`
2. `lerna.json`
3. 带 `workspaces` 字段的 `package.json`
4. 找不到则使用最近的 `package.json` 所在目录
5. 再找不到则退回 `process.cwd()`

这能覆盖普通项目和 monorepo。

## 安装行为

### 默认策略

1. 校验 `SKILL_SOURCE/SKILL.md` 存在且可读
2. 校验 frontmatter 中存在 `name` 和 `description`
3. 根据 `--agents` 和 `--scope` 计算目标目录
4. 创建目标父目录
5. 如果目标已存在：
   - 是 symlink/junction 且已指向当前源目录：跳过
   - 是 symlink/junction 但指向不同：删除后重建
   - 是普通目录/文件：默认报错，除非传 `--force`
6. 优先创建 symlink/junction
7. 若 symlink 失败，可降级复制目录，并提示用户

### Windows symlink 类型

Windows 下目录链接建议使用 `junction`：

```js
fs.symlinkSync(source, target, 'junction')
```

原因：普通 directory symlink 对权限更敏感，junction 在公司 Windows 环境更稳。

### 非 Windows

macOS/Linux 可使用：

```js
fs.symlinkSync(source, target, 'dir')
```

### 复制 fallback

如果创建链接失败，可复制整个 skill 目录：

```js
copyDir(source, target)
```

但需要提示：

```text
Created a copied skill because symlink failed. Re-run install after package updates to refresh it.
```

## CLI 参数建议

```text
pro-components skills install

Options:
  --agents <list>      universal,cursor,codex,auto,all，默认 universal
  --scope <scope>      project,global,both，默认 project
  --cwd <path>         指定消费项目目录，默认 process.cwd()
  --force              目标已存在普通目录/文件时强制覆盖
  --copy               不创建 symlink，直接复制
  --dry-run            只打印计划，不写文件
  --gitignore          自动写入 .gitignore，默认开启
  --no-gitignore       不修改 .gitignore
  --yes                跳过确认
```

```text
pro-components skills doctor

Options:
  --agents <list>      universal,cursor,codex,auto,all，默认 universal
  --scope <scope>      project,global,both，默认 project
  --cwd <path>         指定消费项目目录
```

## .gitignore 自动维护

安装 project scope skill 后，默认更新 workspace 根目录的 `.gitignore`。

建议实现为“按实际安装目标写入”。默认只安装 `universal` 时，确保 `.gitignore` 至少包含：

```gitignore
# Agent skills installed from npm packages
.agents/skills/fexd-pro-components
```

如果显式安装 Cursor：

```bash
pro-components skills install --agents cursor
```

实际生成 `.agents/skills/**` 和 `.cursor/skills/**` 时，确保 `.gitignore` 至少包含：

```gitignore
# Agent skills installed from npm packages
.agents/skills/fexd-pro-components
.cursor/skills/fexd-pro-components
```

可支持的常见规则包括：

```gitignore
.agents/skills/fexd-pro-components
.cursor/skills/fexd-pro-components
.claude/skills/fexd-pro-components
.windsurf/skills/fexd-pro-components
.trae/skills/fexd-pro-components
.qwen/skills/fexd-pro-components
.roo/skills/fexd-pro-components
.openhands/skills/fexd-pro-components
```

### 行为规则

1. 默认开启 `.gitignore` 维护。
2. 传 `--no-gitignore` 时跳过。
3. `--scope global` 时不需要更新项目 `.gitignore`。
4. `--scope both` 时只针对 project targets 更新 `.gitignore`。
5. 如果 `.gitignore` 不存在则创建。
6. 如果规则已存在则不重复追加。
7. 如果 `--dry-run`，只打印将写入的规则，不落盘。

### gitignore 伪代码

```js
function toGitignorePattern(workspaceRoot, target) {
  var relativePath = path.relative(workspaceRoot, target).replace(/\\/g, '/')
  return relativePath
}

function updateGitignore(workspaceRoot, targets, options) {
  if (options.gitignore === false || options.scope === 'global') return

  var patterns = []
  targets.forEach(function (target) {
    if (target.indexOf(workspaceRoot) !== 0) return
    var pattern = toGitignorePattern(workspaceRoot, target)
    if (patterns.indexOf(pattern) < 0) patterns.push(pattern)
  })

  if (patterns.length === 0) return

  var gitignorePath = path.join(workspaceRoot, '.gitignore')
  var content = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : ''

  var lines = content.split(/\r?\n/)
  var missing = patterns.filter(function (pattern) {
    return lines.indexOf(pattern) < 0
  })

  if (missing.length === 0) return

  var block = ['', '# Agent skills installed from npm packages'].concat(missing).join('\n')

  if (options.dryRun) {
    console.log('[dry-run] append to .gitignore:\n' + block)
    return
  }

  fs.writeFileSync(gitignorePath, content.replace(/\s*$/, '') + block + '\n')
}
```

## doctor 检查项

`pro-components skills doctor` 输出建议包含：

- skill 源目录是否存在
- `SKILL.md` 是否存在
- frontmatter 是否能解析
- `name` / `description` 是否存在
- `references/` 是否存在
- Cursor 目标是否存在
- `.agents/skills` 与 `.cursor/skills` 链接是否指向当前包
- Codex 目标是否存在
- 是否存在指向其他项目 `node_modules` 的旧链接
- 当前 Node 版本是否满足最低要求
- 当前 agent adapter 是否支持

示例输出：

```text
@fexd/pro-components skills doctor

source:
  OK  node_modules/@fexd/pro-components/skills/fexd-pro-components
  OK  SKILL.md frontmatter: name=fexd-pro-components
  OK  references: 32 files

cursor:
  OK  .agents/skills/fexd-pro-components -> current package
  OK  .cursor/skills/fexd-pro-components -> current package

codex:
  SKIP  agent not requested
```

## 伪代码

```js
const fs = require('fs')
const path = require('path')
const os = require('os')

const PACKAGE_ROOT = path.resolve(__dirname, '..')
const SKILL_SOURCE = path.join(PACKAGE_ROOT, 'skills', 'fexd-pro-components')
const SKILL_NAME = 'fexd-pro-components'
const home = os.homedir()

function findWorkspaceRoot(cwd) {
  let current = path.resolve(cwd)
  let nearestPackageRoot = null

  while (true) {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      nearestPackageRoot = nearestPackageRoot || current
      try {
        const pkg = JSON.parse(fs.readFileSync(path.join(current, 'package.json'), 'utf8'))
        if (pkg.workspaces) return current
      } catch {}
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

function validateSkillSource() {
  const skillMd = path.join(SKILL_SOURCE, 'SKILL.md')
  if (!fs.existsSync(skillMd)) {
    throw new Error(`SKILL.md not found: ${skillMd}`)
  }

  const content = fs.readFileSync(skillMd, 'utf8')
  const frontmatter = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/)
  if (!frontmatter) {
    throw new Error('SKILL.md must start with YAML frontmatter')
  }

  if (!/^\s*name\s*:/m.test(frontmatter[1])) {
    throw new Error('SKILL.md frontmatter missing name')
  }

  if (!/^\s*description\s*:/m.test(frontmatter[1])) {
    throw new Error('SKILL.md frontmatter missing description')
  }
}

function removeSync(target) {
  if (!fs.existsSync(target)) return
  const stat = fs.lstatSync(target)
  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    fs.readdirSync(target).forEach(function (name) {
      removeSync(path.join(target, name))
    })
    fs.rmdirSync(target)
  } else {
    fs.unlinkSync(target)
  }
}

function copyDirSync(source, target) {
  fs.mkdirSync(target, { recursive: true })
  fs.readdirSync(source).forEach(function (name) {
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

function ensureLinkOrCopy(source, target, options = {}) {
  const { force = false, copy = false, dryRun = false } = options
  const parent = path.dirname(target)

  if (dryRun) {
    console.log(`[dry-run] install ${target} -> ${source}`)
    return
  }

  fs.mkdirSync(parent, { recursive: true })

  if (fs.existsSync(target)) {
    const stat = fs.lstatSync(target)
    if (stat.isSymbolicLink()) {
      const currentTarget = fs.readlinkSync(target)
      if (
        path.resolve(parent, currentTarget) === path.resolve(source) ||
        path.resolve(currentTarget) === path.resolve(source)
      ) {
        console.log(`OK ${target}`)
        return
      }
      removeSync(target)
    } else if (force) {
      removeSync(target)
    } else {
      throw new Error(`Target exists and is not a link: ${target}. Use --force to replace it.`)
    }
  }

  if (copy) {
    copyDirSync(source, target)
    console.log(`Copied ${target}`)
    return
  }

  try {
    fs.symlinkSync(source, target, process.platform === 'win32' ? 'junction' : 'dir')
    console.log(`Linked ${target} -> ${source}`)
  } catch (error) {
    copyDirSync(source, target)
    console.warn(`Symlink failed, copied instead: ${error.message}`)
  }
}

function getTargetName(agentName) {
  return SKILL_NAME
}

function getTargetsForAgent(agent, workspaceRoot, scope) {
  const targetName = getTargetName(agent.name)
  const normalizedScope = scope || 'project'
  const scopes =
    normalizedScope === 'both'
      ? ['project', 'global']
      : [normalizedScope === 'default' ? agent.defaultScope || 'project' : normalizedScope]
  const targets = []

  scopes.forEach(function (item) {
    if (item === 'project') {
      targets.push(path.join(workspaceRoot, agent.projectSkillsDir, targetName))
      ;(agent.legacyProjectSkillsDirs || []).forEach(function (dir) {
        targets.push(path.join(workspaceRoot, dir, targetName))
      })
    }
    if (item === 'global') {
      targets.push(path.join(agent.globalSkillsDir, targetName))
    }
  })

  return targets
}

function resolveAgents(inputAgents) {
  if (!inputAgents || inputAgents.length === 0) return [AGENTS.universal]
  if (inputAgents.indexOf('all') >= 0) {
    return Object.keys(AGENTS).map(function (key) {
      return AGENTS[key]
    })
  }
  if (inputAgents.indexOf('auto') >= 0) {
    return Object.keys(AGENTS)
      .map(function (key) {
        return AGENTS[key]
      })
      .filter(function (agent) {
        return agent.detectInstalled()
      })
  }

  return inputAgents.map(function (name) {
    if (!AGENTS[name]) throw new Error('Unsupported agent: ' + name)
    return AGENTS[name]
  })
}

function installSkills(options) {
  validateSkillSource()

  const workspaceRoot = findWorkspaceRoot(options.cwd || process.cwd())
  const agents = resolveAgents(options.agents)
  const allTargets = []

  agents.forEach(function (agent) {
    const targets = getTargetsForAgent(agent, workspaceRoot, options.scope)
    targets.forEach(function (target) {
      ensureLinkOrCopy(SKILL_SOURCE, target, options)
      allTargets.push(target)
    })
  })

  updateGitignore(workspaceRoot, allTargets, options)
}
```

## package.json 需要保留的内容

`@fexd/pro-components/package.json` 已有：

```json
{
  "bin": {
    "pro-components": "./cli/index.js"
  },
  "files": ["skills", "cli"]
}
```

需要确保发布包继续包含：

- `skills/**`
- `cli/index.js`

## 与 skills-npm 的差异

保留：

- 从 npm 包内置 skill 注册到 agent 目录
- 目标目录使用 `SKILL.md` frontmatter 中的 `name` 命名
- 已存在且指向正确时跳过
- Windows 下使用 junction
- agent adapter 表，用于适配不同工具

简化：

- 不扫描所有 npm 包
- 不需要 include/exclude
- 不需要缓存扫描结果
- 不依赖 monorepo 全量递归扫描
- 错误信息可以针对 `@fexd/pro-components` 更精确

新增：

- `doctor` 诊断命令
- 可选 Codex 用户级安装
- 可选 copy fallback
- Node 14/16 兼容，不依赖 Node 20+ 生态
- 默认 project scope，默认 universal agent
- 默认自动维护 `.gitignore`

## 实现注意事项

### 不建议复用 skills-npm 代码

可以参考它的 agent 映射和行为，但不建议把 `skills-npm` 作为依赖引入。原因：

- 依赖链可能继续要求 Node 20+
- 组件库 CLI 已经知道唯一 skill 源目录，不需要通用扫描能力
- 内置实现可以提供更清晰的错误提示

### 可以保留项目兼容同步

当前项目有 `.agents/skills` 到 `.cursor/skills` 的同步脚本。新 CLI 可以直接同时写两处，后续就不需要额外同步脚本。

### 命令输出需要稳定

CI 或 prepare 脚本中运行时，建议只输出必要信息：

```text
Linked cursor project skill: .agents/skills/fexd-pro-components
Linked cursor project skill: .cursor/skills/fexd-pro-components
```

如果已经存在：

```text
OK cursor project skill already linked
```

## 验收方式

在消费项目运行：

```bash
pro-components skills install
```

预期生成：

```text
.agents/skills/fexd-pro-components
```

并且指向当前项目的：

```text
node_modules/@fexd/pro-components/skills/fexd-pro-components
```

同时 `.gitignore` 包含：

```gitignore
.agents/skills/fexd-pro-components
```

如果指定 Cursor：

```bash
pro-components skills install --agents cursor
```

预期生成：

```text
.agents/skills/fexd-pro-components
.cursor/skills/fexd-pro-components
```

同时 `.gitignore` 包含：

```gitignore
.agents/skills/fexd-pro-components
.cursor/skills/fexd-pro-components
```

运行：

```bash
pro-components skills doctor
```

预期：

```text
OK source skill
OK SKILL.md frontmatter
OK .agents target
```

如果启用 Codex：

```bash
pro-components skills install --agents codex
```

预期生成：

```text
%USERPROFILE%/.codex/skills/fexd-pro-components
```

新开 Codex 会话后，应能在可用 skill 列表中看到 `fexd-pro-components`。
