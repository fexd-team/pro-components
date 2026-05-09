---
title: AI Skills
order: 4
---

## 🤖 AI Skills —— 让 AI 编辑器理解 @fexd/pro-components

`@fexd/pro-components` 随 npm 包发布了完整的 **AI Agent Skills** 文档。安装组件库后，AI 编辑器（Cursor / Windsurf / Claude Code 等）即可通过这些文档精准理解每个组件的用法、Props、架构设计和最佳实践。

### 📦 发布了什么？

`npm install @fexd/pro-components` 后，`node_modules` 中包含以下 AI 文档：

```
node_modules/@fexd/pro-components/
├── AGENTS.md                          # AI 上下文入口
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

### 🚀 方式一：使用 skills-npm 自动配置（推荐）

[skills-npm](https://github.com/antfu/skills-npm) 能自动扫描 `node_modules` 中的 skills 并创建符号链接到 AI 编辑器的 skills 目录。

**1. 安装**

```bash
npm i -D skills-npm
# 或
pnpm add -D skills-npm
```

**2. 在项目 `package.json` 中添加 `prepare` 脚本**

```json
{
  "scripts": {
    "prepare": "skills-npm"
  }
}
```

之后每次 `npm install` 时，skills-npm 会自动扫描 `node_modules/@fexd/pro-components/skills/fexd-pro-components/SKILL.md`，在 `.cursor/skills/`（或 `.claude/skills/` 等）下创建符号链接。

**3. 手动触发一次（如果 `prepare` 尚未执行）**

```bash
npx skills-npm
```

**4. 将符号链接加入 `.gitignore`**

skills-npm 默认会自动更新 `.gitignore`，如果没有，手动添加：

```gitignore
skills/npm-*
```

完成后效果：

```
.cursor/skills/
└── npm-fexd-pro-components-fexd-pro-components/ → node_modules/@fexd/pro-components/skills/fexd-pro-components/
```

> skills-npm 默认从 `package.json` 的 `dependencies` / `devDependencies` 扫描。如需扫描全部 `node_modules`，可配置 `source: 'node_modules'`。详见 [skills-npm 配置文档](https://github.com/antfu/skills-npm#configuration)。

### 🔗 方式二：手动创建符号链接

如果不想引入额外依赖：

```bash
# macOS / Linux
mkdir -p .cursor/skills
ln -s ../../node_modules/@fexd/pro-components/skills/fexd-pro-components .cursor/skills/fexd-pro-components

# Windows (管理员终端)
mklink /D .cursor\skills\fexd-pro-components node_modules\@fexd\pro-components\skills\fexd-pro-components
```

记得在 `.gitignore` 中忽略：

```gitignore
.cursor/skills/fexd-pro-components
```

### 💬 配置完成后

在 AI 编辑器中用自然语言提问即可，AI 会自动加载对应的组件文档：

```
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

**skills-npm 找不到 skills？**

> 确保 `@fexd/pro-components` 版本 >= 0.2.100。该版本起 `package.json` 的 `files` 字段包含 `skills` 目录和 `AGENTS.md`。

**更新 @fexd/pro-components 后文档没变？**

> 符号链接指向 `node_modules`，`npm update` 后内容自动更新。如果使用 skills-npm，执行 `npx skills-npm` 可重新链接。

**monorepo 怎么配置？**

> 在根目录运行 `npx skills-npm --recursive`，会递归扫描所有 workspace 包。

**支持哪些 AI 编辑器？**

> skills-npm 自动检测 Cursor、Windsurf、Claude Code 等，为每个编辑器创建对应的符号链接。手动方式需查阅目标编辑器的 skills 目录位置。
