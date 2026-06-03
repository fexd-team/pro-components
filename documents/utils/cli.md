---
title: CLI - 命令行工具
order: 1.1
---

# CLI 命令行工具

`@fexd/pro-components` 内置了 `pro-components` 命令，安装组件库后即可在项目中快速查文档、搜索组件用法。

```bash
pro-components help
```

在 npm scripts 中可以直接使用：

```json
{
  "scripts": {
    "pro:list": "pro-components list",
    "pro:skills": "fexd-tools skills install @fexd/pro-components"
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

`pro-components` CLI 不再内置 skill 安装能力。请使用 `@fexd/tools` 提供的集中式入口，它会扫描当前项目 `node_modules` 和 workspace 包中的 `skills/*/SKILL.md`：

```bash
fexd-tools skills install @fexd/pro-components
```

如需安装当前项目依赖里所有可发现的 skills，可以不传 include：

```bash
fexd-tools skills install
```

在 npm scripts 中推荐这样配置：

```json
{
  "scripts": {
    "prepare:skills": "fexd-tools skills install @fexd/pro-components"
  }
}
```

### 指定范围

```bash
fexd-tools skills install @fexd/pro-components --agents cursor,codex,claude-code,opencode
fexd-tools skills install @fexd/pro-components --scope global
fexd-tools skills install --include @fexd/pro-components
fexd-tools skills install --exclude @fexd/pro-components
```

`install` 后面的裸参数会被当作 include 白名单，多个规则可以用逗号分隔。黑白名单也可以写在 `package.json` 的 `skills-install` 字段或 `skills.config.js` / `skills.config.cjs` / `skills.config.json` 中。

### 旧命令迁移

如果执行旧命令：

```bash
pro-components skills install
```

CLI 只会输出迁移提示，不再创建链接、复制目录或修改 `.gitignore`。

更多 AI Skills 配置说明见 [AI Skills](/utils/ai-skills)。
