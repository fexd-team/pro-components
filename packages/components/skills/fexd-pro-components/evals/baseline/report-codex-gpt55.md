# 基准测试报告

> 状态说明：本报告记录的是本轮补齐前的基准评估。报告中指出的 `defineFields.from`、轻量 `useCoverable` 示例、独立 `useProState` reference 等缺口，已在后续文档补丁中处理。

## 测试信息

- **日期**：2026.05.14
- **Skills 版本**：2026.05.08 文档基线 + CLI/AI Skills 注册说明更新后
- **测试环境**：Codex + GPT-5.5
- **测试范围**：24 个 eval 用例，覆盖 `prompts.json` 中全部场景
- **评估方式**：基于当前会话已加载/可读取的 skill 文档进行人工静态评估；重点检查 `SKILL.md`、`catalog.md`、`utilities.md`、`references/**` 是否足以引导 AI 生成符合预期的代码
- **说明**：本报告不是自动化代码生成跑分，评分反映 skill 文档对 AI vibe coding 的指导充分度。若信息只存在于 dumi 文档或源码测试、但未进入 skill references，则按 skill 覆盖不足扣分。

## 测试结果总览

| ID                       | 类别           | 导入 | API | 实践 | 格式 | 完整 | 总分  | 等级 |
| ------------------------ | -------------- | ---- | --- | ---- | ---- | ---- | ----- | ---- |
| basic-table              | ProTable       | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| crud-table               | ProTable       | 2    | 2   | 2    | 2    | 1    | 9/10  | A    |
| basic-form               | ProForm        | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| modal-confirm            | showModal      | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| image-preview            | showImages     | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| coverable-component      | useCoverable   | 2    | 2   | 2    | 2    | 1    | 9/10  | A    |
| i18n-config              | ConfigProvider | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| async-action             | Action         | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| request-interceptor      | request        | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| expand-view              | ProTable       | 2    | 2   | 2    | 2    | 1    | 9/10  | A    |
| builtin-render           | ProTable       | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| props-passthrough        | ProField       | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| options-tag-badge        | ProField       | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| useprostate              | Hooks          | 2    | 2   | 2    | 2    | 1    | 9/10  | A    |
| dayjs-timezone           | Utils          | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| bc-component             | useCoverable   | 2    | 2   | 2    | 2    | 1    | 9/10  | A    |
| define-fields-layout     | ProTable       | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| extend-column-field      | ProTable       | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| define-fields-from       | ProTable       | 2    | 1   | 2    | 1    | 2    | 8/10  | B    |
| coloring-options         | Utils          | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| actions-group            | Components     | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| render-fields-freelayout | ProForm        | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| create-value-proxy       | Utils          | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |
| show-tips-response       | Utils          | 2    | 2   | 2    | 2    | 2    | 10/10 | A    |

**平均分：9.63/10，A 级 23/24，B 级 1/24**

## 逐项要点

### 满分项

以下用例在 skill references 中有直接、明确、可执行的文档支撑，足以稳定引导 AI 生成符合预期的代码：

- `basic-table`：`ProTable.md` 和 `ProTable-query.md` 覆盖 columns、queryFields、onQuery 响应格式。
- `basic-form`：`ProForm.md`、`ProForm-fields.md`、`ProForm-layout.md` 覆盖 `gridColumns`、`colSpan`、required、options、placeholder。
- `modal-confirm`：`showModal.md` 覆盖 promise/try-catch 确认模式。
- `image-preview`：`showImages.md` 覆盖缩略图、图片数组、current 索引。
- `request-interceptor`：`request.md` 已明确 `builtInRequestConfig.responseInterceptors`、请求拦截器注入 token、401 处理。
- `builtin-render`：`ProTable.md` 已覆盖 `builtIn: 'tag' | 'link' | 'avatar' | 'progress'`。
- `props-passthrough`：`ProField.md` 与 `ProForm-fields.md` 均强调 `props` 传底层组件、顶层/`fieldItemProps` 传 Form.Item。
- `options-tag-badge`：`ProForm-fields.md` 明确 `tag` / `badge` 选项自动只读着色，无需自定义 `renderView`。
- `dayjs-timezone`：`utilities.md` 覆盖 `dayjsTZ.setDefault('Etc/GMT-7')` 以及 ProField 时间类字段自动适配。
- `define-fields-layout` / `extend-column-field`：`ProTable-ref.md` 对 `defineFields`、`renderFields`、`extendColumn` / `extendField` 的设计意图和示例较完整。
- `coloring-options`、`actions-group`、`render-fields-freelayout`、`create-value-proxy`、`show-tips-response`：`utilities.md` 和 `ProForm-layout.md` 已有直接示例。

### 9 分项

#### crud-table (9/10)

CRUD 的主路径完整，但 `selectable + batchActions` 需要跳到 `ProTable-actions.md` 或 `ProTable-crud.md` 的后段示例。对 vibe coding 来说可达，但不是“一眼命中”。

#### coverable-component (9/10)

`useCoverable.component`、`useCoverable.props().render()`、`getConfig()` 都写清楚了；不过轻量数据面板场景仍需要从 BC/表格型示例中抽象，代码完整性略扣。

#### expand-view (9/10)

`expandView`、`expandViewField`、`expandableProFormRender` 都有说明。扣分点是自定义展开区回调签名和 ProForm render 心智有一定组合成本，模型可能生成可用但不够精简的代码。

#### useprostate (9/10)

`useProState` 在 `utilities.md` 中覆盖同步、持久化、对象自动合并，但它没有独立 reference 文件。对 AI 来说信息足够，但检索路径比核心组件弱。

#### bc-component (9/10)

BC 组件完整链路覆盖很好：`request.coverable`、permission、`ProTable.useCoverableProps`、消费方覆盖都有文档。扣分点是完整 BC 场景代码较长，多配置组组合时 AI 仍容易遗漏少量边界。

### B 级项

#### define-fields-from (8/10)

这是本轮最明确的短板。

`defineFields.from` 在 dumi 文档 `documents/table/define-extend.md` 和源码测试中存在，但当前 skill 正式 references 中没有独立说明；`ProTable-ref.md` 主要覆盖的是 `extendColumn` / `extendField` 组合模式。对于 prompt 中“用最简洁的方式”的要求，AI 若只依赖 skill references，可能会写出可用的 `extendColumn + defineFields`，但不一定主动使用 `defineFields.from(columns, overrides)`。

扣分细节：

- API：1/2，API 未在 skill references 正式文档化。
- 格式：1/2，缺少“source columns + overrides”这种目标格式的直接示例。

## 与已有报告对比

| 报告 | 环境 | 测试范围 | 平均分 | 备注 |
| --- | --- | --- | --- | --- |
| `report-cursor-claude-opus46.md` | Cursor + Claude Opus 4.6 | 24 个 | 9.75 | 偏生成验证；对 `defineFields.from` 给了较乐观评分 |
| `report-opencode-deepseek-v4-pro.md` | opencode + DeepSeek V4 Pro | 9 个 | 9.8 | 偏静态文档审查，范围较早 |
| `report-codex-gpt55.md` | Codex + GPT-5.5 | 24 个 | 9.63 | 对“未进入 skill references 的 API”扣分更严格 |

## 发现的问题

| # | 严重度 | 涉及文档 | 问题描述 |
| --- | --- | --- | --- |
| 1 | 中 | `references/ProTable-ref.md` | 缺少 `defineFields.from(columns, overrides)` 的独立说明和示例。该 API 已进入 dumi 文档/源码测试，但 skill references 未同步。 |
| 2 | 低 | `references/ProTable.md` | 快速 CRUD 示例没有把 `selectable + batchActions` 放在首屏主示例中，批量删除需要跨到子文档查找。 |
| 3 | 低 | `references/useCoverable.md` | 轻量可覆盖组件示例仍偏少，现有示例更偏完整 BC/表格场景。 |
| 4 | 低 | `utilities.md` | `useProState` 信息已覆盖，但没有独立 reference 文件；在 agent 检索时不如核心组件醒目。 |

## 改进建议

1. 在 `references/ProTable-ref.md` 增加 `defineFields.from` 小节，直接搬运/压缩 dumi `documents/table/define-extend.md` 中的派生字段示例。
2. 在 `references/ProTable.md` 的 CRUD 快速示例中补一段 `selectable` + `batchActions={['delete']}`。
3. 在 `references/useCoverable.md` 增加一个 30 行以内的轻量数据面板示例，区别于完整 BC 管理页。
4. 可考虑为 `useProState` 增加独立 `references/useProState.md`，或在 `utilities.md` 顶部索引中更突出它。

## 总结

当前 skill 对 AI vibe coding 的帮助已经很强：核心表格、表单、字段、请求、弹窗、BC 组件化和常用工具基本都能稳定引导到正确 API 与最佳实践。

本轮 Codex + GPT-5.5 的主要结论不是“整体质量不足”，而是发现了一个文档同步问题：`defineFields.from` 已在 dumi/源码侧成熟，但没有进入 skill references。修掉这个点后，预计 24 个用例可回到 9.7+ 的水平。
