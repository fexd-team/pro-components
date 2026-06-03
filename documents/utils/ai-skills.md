---
title: AI Skills
order: 1.2
---

## 🤖 AI Skills —— 让 AI 编辑器理解 @fexd/pro-components

`@fexd/pro-components` 随 npm 包发布了完整的 **AI Agent Skills** 文档。安装组件库后，可以通过 `fexd-tools skills install` 统一发现并安装这些文档，让 AI 在生成页面、查 API、改表格/表单时优先读取组件库的真实用法。

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

### 🚀 推荐：使用 fexd-tools 统一安装

`pro-components` CLI 不再维护自己的 skill 安装逻辑。`@fexd/tools` 提供了集中式安装入口，会扫描当前项目 `node_modules` 和 workspace 包中的 `skills/*/SKILL.md`：

```bash
fexd-tools skills install @fexd/pro-components
```

在消费项目里建议加一个脚本，团队成员安装依赖后手动跑一次即可：

```json
{
  "scripts": {
    "prepare:skills": "fexd-tools skills install @fexd/pro-components"
  }
}
```

然后执行：

```bash
npm run prepare:skills
```

如果希望安装当前项目依赖和 workspace 包中所有可发现的 skills，可以直接执行：

```bash
fexd-tools skills install
```

### 发现规则

`fexd-tools skills install` 会：

- 扫描当前项目 `node_modules` 中包的 `skills/*/SKILL.md`
- 扫描 workspace 包中的 `skills/*/SKILL.md`
- 始终包含 `@fexd/tools` 自身的内置 skill
- 以 `SKILL.md` frontmatter 里的 `name` 作为安装目录名
- 忽略缺少 `name` 或 `description` 的 skill

### 指定安装范围

只想安装 `@fexd/pro-components` 时，可以使用裸参数或 `--include`：

```bash
fexd-tools skills install @fexd/pro-components
fexd-tools skills install --include @fexd/pro-components
```

多个规则用逗号分隔，也可以排除某些包：

```bash
fexd-tools skills install @risk-bc/*,@fexd/pro-components
fexd-tools skills install --exclude @risk-bc/legacy-skill
fexd-tools skills install --exclude @fexd/pro-components
```

### 指定 Agent

```bash
fexd-tools skills install @fexd/pro-components --agents cursor
fexd-tools skills install @fexd/pro-components --agents cursor,codex,claude-code,opencode
fexd-tools skills install @fexd/pro-components --agents codex --scope global
```

支持的 agent：`common`、`cursor`、`codex`、`claude-code`、`opencode`。

### 配置黑白名单

简单规则可以写在消费项目 `package.json` 的 `skills-install` 字段里：

```json
{
  "skills-install": {
    "include": ["@risk-bc/*", "@fexd/pro-components"],
    "exclude": ["@risk-bc/legacy-skill"]
  }
}
```

规则较多时，也可以放到 `skills.config.js` / `skills.config.cjs` / `skills.config.json`：

```js
module.exports = {
  include: ['@risk-bc/*', '@fexd/pro-components'],
  exclude: ['@risk-bc/legacy-skill'],
}
```

### 常用参数

| 参数               | 作用                                                        |
| ------------------ | ----------------------------------------------------------- |
| `--include <list>` | 白名单，包名 / skill 名 / `package:skill`，支持 `*`         |
| `--exclude <list>` | 黑名单，包名 / skill 名 / `package:skill`，支持 `*`         |
| `--agents <list>`  | 指定 agent，支持 `common,cursor,codex,claude-code,opencode` |
| `--scope <scope>`  | 安装范围，支持 `project,global,both`，默认 `project`        |
| `--cwd <path>`     | 指定消费项目目录，适合 monorepo 或脚本从子目录执行          |
| `--config <path>`  | 指定配置文件                                                |
| `--no-config`      | 临时跳过配置文件和 `package.json` 配置                      |
| `--copy`           | 直接复制 skill 目录，不创建链接                             |
| `--force`          | 目标已存在普通文件/目录时强制覆盖                           |
| `--dry-run`        | 只打印安装计划，不写文件                                    |
| `--no-gitignore`   | 不自动更新 `.gitignore`                                     |

先预览安装计划：

```bash
fexd-tools skills install @fexd/pro-components --dry-run
```

Windows 环境如果链接权限受限，可以使用复制模式：

```bash
fexd-tools skills install @fexd/pro-components --copy
```

`pro-components skills install` 旧命令只会输出迁移提示，不再创建链接、复制目录或修改 `.gitignore`。

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

> 默认安装方式使用链接，更新依赖后内容会跟随 `node_modules` 更新。如果使用了 `--copy`，需要重新执行 `fexd-tools skills install @fexd/pro-components --copy --force`。

**monorepo 怎么配置？**

> 在 workspace 根目录运行 `fexd-tools skills install @fexd/pro-components`。如果脚本从子目录执行，可以加 `--cwd <workspace-root>` 明确指定根目录。

**为什么默认不安装全局目录？**

> 项目级目录更适合团队共享，也不会改动用户环境。Codex 等工具如果需要用户级 skill，可以显式执行 `fexd-tools skills install @fexd/pro-components --agents codex --scope global`。

**支持哪些 AI 编辑器？**

> `fexd-tools skills install` 支持 Cursor、Codex、Claude Code、OpenCode。其他工具如果兼容这些 skills 目录，也可以通过 `--agents` / `--scope` 或手动链接接入。
