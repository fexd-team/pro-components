---
title: CLI - 命令行工具
order: 1.1
---

# CLI 命令行工具

`@fexd/pro-components` 内置了 `pro-components` 命令，安装组件库后即可在项目中快速查文档、搜索组件用法、注册 AI Skills。

```bash
pro-components help
```

在 npm scripts 中可以直接使用：

```json
{
  "scripts": {
    "pro:list": "pro-components list",
    "pro:skills": "pro-components skills install"
  }
}
```

如果临时执行，也可以使用包管理器的 exec 命令：

```bash
npm exec pro-components -- list
pnpm exec pro-components docs ProTable
yarn pro-components search "queryField"
```

## 列出组件与工具

```bash
pro-components list
```

输出内置组件、Hooks、命令式工具的分类清单，并标记哪些条目有详细文档。

## 查看文档

```bash
pro-components docs ProTable
pro-components docs ProForm
pro-components docs showModal
pro-components docs request
```

`docs` 会读取 npm 包内置的 skill references 文档，适合在终端里快速查 Props、示例和最佳实践。

也可以直接把文档名作为命令：

```bash
pro-components ProTable
```

## 搜索文档

```bash
pro-components search "queryField"
pro-components search "useCoverable"
pro-components search "大数字"
```

`search` 会在内置 skill 文档和 references 中全文搜索，输出命中的文件和行号。

## 安装 AI Skills

```bash
pro-components skills install
```

默认安装到常见 agent 的项目级目录：

```text
.cursor/skills/fexd-pro-components       # Cursor
.agents/skills/fexd-pro-components       # Codex / OpenCode
.claude/skills/fexd-pro-components       # Claude Code
```

这些目录默认链接到：

```text
node_modules/@fexd/pro-components/skills/fexd-pro-components
```

安装后会自动把项目级 skill 目录写入 `.gitignore`。

### 预览安装计划

如果想先确认会写入哪些目录，可以使用 dry-run：

```bash
pro-components skills install --dry-run
pro-components skills install --agents codex,opencode --dry-run
```

当多个 agent 使用同一个目录时，CLI 会合并展示，例如 Codex 和 OpenCode 默认共用 `.agents/skills/fexd-pro-components`。

### 指定 agent

```bash
pro-components skills install --agents cursor
pro-components skills install --agents cursor,claude-code,opencode
pro-components skills install --agents codex --scope global
```

支持的 agent：

| agent         | 说明                    |
| ------------- | ----------------------- |
| `common`      | 常见 agent 集合，默认值 |
| `cursor`      | Cursor                  |
| `codex`       | Codex                   |
| `claude-code` | Claude Code             |
| `opencode`    | OpenCode                |

### 安装范围

```bash
pro-components skills install --scope project
pro-components skills install --scope global
pro-components skills install --scope both
```

| scope     | 说明                       |
| --------- | -------------------------- |
| `project` | 安装到当前项目目录，默认值 |
| `global`  | 安装到用户全局 agent 目录  |
| `both`    | 同时安装 project 和 global |

全局目录规则：

| agent         | global 安装位置                                                                           |
| ------------- | ----------------------------------------------------------------------------------------- |
| `cursor`      | `~/.cursor/skills/fexd-pro-components`                                                    |
| `codex`       | `$CODEX_HOME/skills/fexd-pro-components` 或 `~/.codex/skills/fexd-pro-components`         |
| `claude-code` | `$CLAUDE_CONFIG_DIR/skills/fexd-pro-components` 或 `~/.claude/skills/fexd-pro-components` |
| `opencode`    | `~/.agents/skills/fexd-pro-components`                                                    |

### 其他参数

| 参数             | 说明                              |
| ---------------- | --------------------------------- |
| `--cwd <path>`   | 指定消费项目目录                  |
| `--copy`         | 复制 skill 目录，不创建链接       |
| `--force`        | 目标已存在普通文件/目录时强制覆盖 |
| `--dry-run`      | 只打印安装计划，不写文件          |
| `--no-gitignore` | 不自动更新 `.gitignore`           |

Windows 环境如果创建链接失败，CLI 会自动回退为复制。也可以显式使用复制模式：

```bash
pro-components skills install --copy
pro-components skills install --copy --force
```

使用 `--copy` 后，更新 `@fexd/pro-components` 不会自动刷新已复制的 skill，需要重新执行一次命令。

查看 skills 命令帮助：

```bash
pro-components skills install --help
```

更多 AI Skills 配置说明见 [AI Skills](/utils/ai-skills)。
