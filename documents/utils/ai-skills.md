---
title: AI Skills
order: 1.2
---

## 🤖 AI Skills —— 让 AI 编辑器理解 @fexd/pro-components

`@fexd/pro-components` 随 npm 包发布了完整的 **AI Agent Skills** 文档。安装组件库后，可以通过内置 CLI 一键把这些文档注册到 Cursor、Codex、Claude Code、OpenCode 等常见 AI Agent 的 skills 目录，让 AI 在生成页面、查 API、改表格/表单时优先读取组件库的真实用法。

### 📦 发布了什么？

`npm install @fexd/pro-components` 后，`node_modules` 中包含以下 AI 文档：

```text
node_modules/@fexd/pro-components/
├── AGENTS.md                          # AI 上下文入口
├── cli/                               # pro-components 命令行工具
└── skills/
    └── fexd-pro-components/
        ├── SKILL.md                   # 主入口：任务路由 + 架构速览
        ├── catalog.md                 # 组件分类目录
        ├── architecture.md            # 插件式架构 / BC 分层设计
        ├── utilities.md               # Hooks / 工厂函数 / 命令式 API
        ├── guide.md                   # 使用指引
        ├── source-navigation.md       # 源码导航指南
        └── references/                # 组件详细文档
            ├── ProTable.md
            ├── ProTable-query.md
            ├── ProTable-crud.md
            ├── ProForm.md
            ├── ProField.md
            ├── request.md
            ├── useCoverable.md
            └── ...
```

### 🚀 推荐：使用内置 CLI 自动配置

组件库已经内置 skills 安装命令，不需要额外安装 `skills-npm`：

```bash
pro-components skills install
```

在消费项目里建议加一个脚本，团队成员安装依赖后手动跑一次即可：

```json
{
  "scripts": {
    "prepare:pro-skills": "pro-components skills install"
  }
}
```

然后执行：

```bash
npm run prepare:pro-skills
```

默认会把 `fexd-pro-components` skill 安装到常见 agent 的项目级目录，并自动把这些链接写入 `.gitignore`：

```text
.cursor/skills/fexd-pro-components       # Cursor 项目目录
.agents/skills/fexd-pro-components       # Codex / OpenCode 通用项目目录
.claude/skills/fexd-pro-components       # Claude Code 项目目录
```

这些目录默认都是指向当前项目 `node_modules/@fexd/pro-components/skills/fexd-pro-components` 的链接。更新 `@fexd/pro-components` 后，skill 内容会随 `node_modules` 自动更新。

### 指定 Agent

只想配置某几个 agent 时，使用 `--agents`：

```bash
pro-components skills install --agents cursor
pro-components skills install --agents cursor,claude-code,opencode
```

可选值：

| agent         | project 安装位置                     |
| ------------- | ------------------------------------ |
| `cursor`      | `.cursor/skills/fexd-pro-components` |
| `codex`       | `.agents/skills/fexd-pro-components` |
| `claude-code` | `.claude/skills/fexd-pro-components` |
| `opencode`    | `.agents/skills/fexd-pro-components` |
| `common`      | 以上常见 agent 的集合，默认值        |

> OpenCode 官方也支持 `.opencode/skills/<name>/SKILL.md`、`.claude/skills/<name>/SKILL.md` 等目录；这里默认使用其 agent-compatible 目录 `.agents/skills`，便于和通用项目级 skill 约定对齐。

### 安装到全局目录

默认只写项目目录，不会修改用户目录。需要给某个工具配置全局 skill 时，显式指定 `--scope global`：

```bash
pro-components skills install --agents codex --scope global
pro-components skills install --agents claude-code --scope global
```

全局目录规则：

| agent         | global 安装位置                                                                           |
| ------------- | ----------------------------------------------------------------------------------------- |
| `cursor`      | `~/.cursor/skills/fexd-pro-components`                                                    |
| `codex`       | `$CODEX_HOME/skills/fexd-pro-components` 或 `~/.codex/skills/fexd-pro-components`         |
| `claude-code` | `$CLAUDE_CONFIG_DIR/skills/fexd-pro-components` 或 `~/.claude/skills/fexd-pro-components` |
| `opencode`    | `~/.agents/skills/fexd-pro-components`                                                    |

如需项目目录和全局目录都安装：

```bash
pro-components skills install --agents codex --scope both
```

### 常用参数

| 参数              | 作用                                                        |
| ----------------- | ----------------------------------------------------------- |
| `--agents <list>` | 指定 agent，支持 `common,cursor,codex,claude-code,opencode` |
| `--scope <scope>` | 安装范围，支持 `project,global,both`，默认 `project`        |
| `--cwd <path>`    | 指定消费项目目录，适合 monorepo 或脚本从子目录执行          |
| `--copy`          | 直接复制 skill 目录，不创建链接                             |
| `--force`         | 目标已存在普通文件/目录时强制覆盖                           |
| `--dry-run`       | 只打印安装计划，不写文件                                    |
| `--no-gitignore`  | 不自动更新 `.gitignore`                                     |

先预览安装计划：

```bash
pro-components skills install --dry-run
```

Windows 环境如果链接权限受限，可以使用复制模式：

```bash
pro-components skills install --copy
```

### 备选：使用 skills-npm

如果你的项目希望统一扫描多个 npm 包里的 skills，而不只是 `@fexd/pro-components`，仍然可以使用 [skills-npm](https://github.com/antfu/skills-npm)：

```bash
pnpm add -D skills-npm
```

```json
{
  "scripts": {
    "prepare": "skills-npm"
  }
}
```

`skills-npm` 适合做通用发现；`pro-components skills install` 则只处理本组件库，依赖更少、诊断更明确、对 Node 14/16 项目更友好。

### 🔗 手动创建符号链接

如果不想通过 CLI，也可以手动创建链接：

```bash
# macOS / Linux
mkdir -p .agents/skills
ln -s ../../node_modules/@fexd/pro-components/skills/fexd-pro-components .agents/skills/fexd-pro-components

# Windows
mklink /J .agents\skills\fexd-pro-components node_modules\@fexd\pro-components\skills\fexd-pro-components
```

记得在 `.gitignore` 中忽略：

```gitignore
.agents/skills/fexd-pro-components
```

### 💬 配置完成后

在 AI 编辑器中用自然语言提问即可，AI 会自动加载对应的组件文档：

```text
👤 "用 ProTable 做一个带查询的增删改查表格"
🤖 → 读取 references/ProTable.md + ProTable-query.md + ProTable-crud.md，给出完整示例

👤 "表单字段怎么配置联动？"
🤖 → 读取 references/ProForm.md + ProForm-fields.md，给出 relates 配置方案

👤 "如何自定义 request 的大数字处理？"
🤖 → 读取 references/request.md，给出 bigIntJSONParsing 配置

👤 "useCoverable 怎么实现配置覆盖？"
🤖 → 读取 references/useCoverable.md，给出 BC 分层覆盖方案

👤 "这个库有哪些组件？"
🤖 → 读取 catalog.md，列出完整组件清单
```

### ❓ 常见问题

**执行命令后 AI 没有加载 skill？**

> 先确认目标目录下存在 `fexd-pro-components/SKILL.md`，然后重启对应 AI 编辑器或新开一个会话。部分工具只在启动时扫描 skills。

**更新 @fexd/pro-components 后文档没变？**

> 默认安装方式使用链接，更新依赖后内容会跟随 `node_modules` 更新。如果使用了 `--copy`，需要重新执行 `pro-components skills install --copy --force`。

**monorepo 怎么配置？**

> 在 workspace 根目录运行 `pro-components skills install`。如果脚本从子目录执行，可以加 `--cwd <workspace-root>` 明确指定根目录。

**为什么默认不安装全局目录？**

> 项目级目录更适合团队共享，也不会改动用户环境。Codex 等工具如果需要用户级 skill，可以显式执行 `pro-components skills install --agents codex --scope global`。

**支持哪些 AI 编辑器？**

> 内置 CLI 支持 Cursor、Codex、Claude Code、OpenCode。其他工具如果兼容 `.agents/skills` 或 Claude/OpenCode 的 skills 目录，也可以通过手动链接接入。
