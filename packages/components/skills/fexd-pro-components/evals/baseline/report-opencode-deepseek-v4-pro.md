# 基准测试报告

## 测试信息

- **日期**：2026.05.08
- **Skills 版本**：2026.05.08
- **测试环境**：opencode + DeepSeek V4 Pro
- **评估方式**：静态文档审查（对照 prompts.json 逐用例比对文档覆盖度）
- **测试范围**：9 个 eval 用例，覆盖全部核心组件 + 子文档

## 测试结果

### 评分总览

| ID                  | 类别           | 导入 | API | 实践 | 格式 | 完整 | 总分 | 等级 |
| ------------------- | -------------- | ---- | --- | ---- | ---- | ---- | ---- | ---- |
| basic-table         | ProTable       | 2    | 2   | 2    | 2    | 2    | 10   | A    |
| crud-table          | ProTable       | 2    | 2   | 2    | 2    | 1    | 9    | A    |
| basic-form          | ProForm        | 2    | 2   | 2    | 2    | 2    | 10   | A    |
| modal-confirm       | showModal      | 2    | 2   | 2    | 2    | 2    | 10   | A    |
| image-preview       | showImages     | 2    | 2   | 2    | 2    | 2    | 10   | A    |
| async-action        | Action         | 2    | 2   | 2    | 2    | 2    | 10   | A    |
| coverable-component | useCoverable   | 2    | 2   | 2    | 1    | 2    | 9    | A    |
| i18n-config         | ConfigProvider | 2    | 2   | 2    | 2    | 2    | 10   | A    |
| request-api         | request        | 2    | 2   | 2    | 2    | 2    | 10   | A    |

**平均分：9.8/10，全部 A 级**

### 逐用例分析

#### 1. basic-table（ProTable 基础查询表格）

**Prompt**：用 @fexd/pro-components 创建一个用户管理表格，支持查询姓名和部门，展示姓名、年龄、部门、入职日期，数据通过接口获取

| 维度 | 得分 | 依据                                                                               |
| ---- | ---- | ---------------------------------------------------------------------------------- |
| 导入 | 2    | `references/ProTable.md:23` 明确 `import { ProTable } from '@fexd/pro-components'` |
| API  | 2    | `ProTable.md:24-31` 完整示例覆盖 columns、queryField、type、options                |
| 实践 | 2    | `SKILL.md:43` 明确 onQuery 必须返回 `{ success, data, total }` 格式                |
| 格式 | 2    | `ProTable.md:94-101` ServerResponse 接口定义                                       |
| 完整 | 2    | `ProTable.md:22-49` 可运行的完整代码                                               |

**总评**：文档完整覆盖所有 expected 条件，无可挑剔。

---

#### 2. crud-table（ProTable CRUD 操作）

**Prompt**：给上面的表格添加完整的增删改查功能，包括新增、编辑弹窗、删除确认、批量删除

| 维度 | 得分 | 依据                                                                                 |
| ---- | ---- | ------------------------------------------------------------------------------------ |
| 导入 | 2    | 同上                                                                                 |
| API  | 2    | `ProTable.md:30-31` 含 actions、columnActions；`selectable` 在核心 Props 表          |
| 实践 | 2    | `SKILL.md:47` 明确危险操作必须 confirm；`columnActions` 含 'delete'                  |
| 格式 | 2    | 所有回调均示例 `return { success: true }`                                            |
| 完整 | 1    | 概览示例未同时展示 `selectable` + `batchActions`，需查阅子文档 `ProTable-actions.md` |

**总评**：核心 CRUD 操作已覆盖（add / edit / delete / confirm），但 `batchActions` 仅在子文档中出现，概览页 `ProTable.md` 的快速上手示例缺少批量操作部分。扣 1 分完整性。

---

#### 3. basic-form（ProForm 基础表单）

**Prompt**：创建一个用户注册表单，包含姓名、手机号、邮箱、部门选择、入职日期、备注，3列布局，备注跨3列

| 维度 | 得分 | 依据                                                             |
| ---- | ---- | ---------------------------------------------------------------- |
| 导入 | 2    | `ProForm.md:22` 明确导入方式                                     |
| API  | 2    | `gridColumns=3` + `colSpan: 3` + `required` + `options` 全部覆盖 |
| 实践 | 2    | `SKILL.md:44` 推荐 `ProForm.useForm()` + `validateFields()` 路径 |
| 格式 | 2    | N/A（表单无特殊响应格式要求）                                    |
| 完整 | 2    | `ProForm.md:21-50` 完整可运行示例，colSpan 在行 36 精确展示      |

**总评**：文档精确匹配 prompt 需求，colSpan 示例直接就是"备注跨3列"。

---

#### 4. modal-confirm（showModal 确认删除）

**Prompt**：实现一个删除操作，点击按钮后弹出确认框，确认后调接口删除，显示成功提示

| 维度 | 得分 | 依据                                                                |
| ---- | ---- | ------------------------------------------------------------------- |
| 导入 | 2    | `showModal.md:62-63` 同时导入 showModal 和 antd message             |
| API  | 2    | `showModal.md:16-56` 完整 API 表（title/okText/onOk/promise/close） |
| 实践 | 2    | 示例含 `try/catch` + `await .promise` + `message.success` 标准模式  |
| 格式 | 2    | promise 确认→resolve/reject 模式正确                                |
| 完整 | 2    | `showModal.md:61-78` 完整确认对话框示例                             |

**总评**：确认对话框的 try/catch + promise 模式是文档亮点，直接给出生产可用代码。

---

#### 5. image-preview（showImages 图片预览）

**Prompt**：在表格的图片列中，点击缩略图可以预览所有商品图片，支持轮播

| 维度 | 得分 | 依据                                                                   |
| ---- | ---- | ---------------------------------------------------------------------- |
| 导入 | 2    | `showImages.md:53` 明确导入                                            |
| API  | 2    | `showImages(images, { current: index })` 用法完整                      |
| 实践 | 2    | `showImages.md:69-88` 展示了 img 缩略图 + onClick + +N 剩余数量指示器  |
| 格式 | 2    | 参数顺序和类型正确                                                     |
| 完整 | 2    | 示例含 `images?.length > 0` 空值防护（行 109）、多图轮播、Promise 模式 |

**总评**：表格内图片预览示例非常实用，包含缩略图、+N 指示器、空值防护等生产细节。

---

#### 6. coverable-component（useCoverable 业务组件）

**Prompt**：用 useCoverable 创建一个可配置的数据面板组件，默认分页 10 条、3 列布局，使用时可以覆盖

| 维度 | 得分 | 依据                                                                                                  |
| ---- | ---- | ----------------------------------------------------------------------------------------------------- |
| 导入 | 2    | `useCoverable.md:272-273` 完整导入                                                                    |
| API  | 2    | `useCoverable.component` / `.props({}).render()` / `getConfig()` 管线完整                             |
| 实践 | 2    | BC 模式、配置分组、中文 key 命名规范全部说明                                                          |
| 格式 | 1    | 文档偏重 BC 企业级模式（权限/API/表格），简单"数据面板"场景需读者自行提炼；600 行文档对新人有阅读负担 |
| 完整 | 2    | `useCoverable.md:267-338` 完整 PermissionList BC 组件                                                 |

**总评**：useCoverable 是文档中最详尽的一份（572 行），但信息密度高，对"快速做一个可覆盖面板"的简单场景来说略显沉重。扣 1 分格式。

---

#### 7. i18n-config（ConfigProvider 国际化）

**Prompt**：将应用切换为英文界面，并自定义删除确认的文案

| 维度 | 得分 | 依据                                                         |
| ---- | ---- | ------------------------------------------------------------ |
| 导入 | 2    | `ConfigProvider.md:68` 明确导入                              |
| API  | 2    | `localeKey="en-US"` + `proLocale` 完整 API                   |
| 实践 | 2    | `ConfigProvider.md:89-98` 自定义文案示例恰好就是删除确认场景 |
| 格式 | 2    | ProLocale 类型结构完整（`table.actions.deleteConfirm`）      |
| 完整 | 2    | 支持 5 种语言，组合 antd locale，示例齐全                    |

**总评**：唯一拿到 Claude 10 分的用例，文档质量确实标杆。自定义删除文案的示例直接命中 prompt。

---

#### 8. async-action（Action 异步按钮）

**Prompt**：创建一个导出按钮，点击后异步导出数据，导出期间显示 loading，失败时提示错误

| 维度 | 得分 | 依据                                                               |
| ---- | ---- | ------------------------------------------------------------------ |
| 导入 | 2    | `Action.md:32` 明确导入 Action + message                           |
| API  | 2    | onClick（async）、onError、loading 属性全部文档化                  |
| 实践 | 2    | `Action.md:130` "异步 onClick 自动管理 loading，无需手动 useState" |
| 格式 | 2    | `error?.message` 错误处理模式正确                                  |
| 完整 | 2    | 含异步按钮示例 + onError 示例 + 批量操作示例                       |

**总评**：Action 组件的最大卖点（自动 loading）在文档和 SKILL.md 中被反复强调，不会遗漏。

---

#### 9. request-api（request + defineApi + ProTable）

**Prompt**：用 defineApi 定义一组用户管理的 API（列表、创建、更新、删除），并在 ProTable 中使用

| 维度 | 得分 | 依据                                                                                 |
| ---- | ---- | ------------------------------------------------------------------------------------ |
| 导入 | 2    | `request.md:18` + `request.md:56` 分别展示 request 和 defineApi 导入                 |
| API  | 2    | defineApi 完整 API（url/method/handleParams/handleResponse/overrideConfig/override） |
| 实践 | 2    | `request.md:176-245` 完整 ProTable 对接示例，含 onDelete target 类型说明             |
| 格式 | 2    | handleResponse 正确桥接 `total` 字段给 ProTable                                      |
| 完整 | 2    | 4 个 CRUD API 定义 + ProTable 全量对接代码（行 139-245）                             |

**总评**：Claude 评测中唯一 C 级的用例，经修复后现已完整覆盖。defineApi CRUD + ProTable 对接示例直接可用。

---

## 与 Claude Opus 4.6 评分对比

| ID                  | Claude 初始 | Claude 修复后 | DeepSeek V4 Pro |
| ------------------- | ----------- | ------------- | --------------- |
| basic-table         | 8/10 B      | 9/10 A        | 10/10 A         |
| crud-table          | 8/10 B      | 9/10 A        | 9/10 A          |
| basic-form          | 8/10 B      | 9/10 A        | 10/10 A         |
| modal-confirm       | 8/10 B      | 9/10 A        | 10/10 A         |
| image-preview       | 9/10 A      | 9/10 A        | 10/10 A         |
| async-action        | 8/10 B      | 9/10 A        | 10/10 A         |
| coverable-component | 8/10 B      | 8/10 B        | 9/10 A          |
| i18n-config         | 10/10 A     | 10/10 A       | 10/10 A         |
| request-api         | 6/10 C      | 9/10 A        | 10/10 A         |
| **平均分**          | **8.1**     | **9.0**       | **9.8**         |

Claude 详细评估报告见 [report-cursor-claude-opus46.md](./report-cursor-claude-opus46.md)。

### 差异分析

DeepSeek V4 Pro 评分普遍高于 Claude Opus 4.6，主要原因：

1. **文档在 Claude 评测后经修复**：Claude 首轮评测发现 10 个问题并全部修复，本次评估基于修复后的文档
2. **评估方式不同**：Claude 为运行时生成代码评分（可能受模型本身代码生成能力影响），DeepSeek 为静态文档审查（仅评估文档信息覆盖度）
3. **评分风格差异**：Claude 偏严（区分 B/B+/A），DeepSeek 对"文档具备完整信息"即给满分

## 发现的问题

| # | 严重度 | 涉及文档 | 问题描述 |
| --- | --- | --- | --- |
| 1 | 低 | `ProTable.md` | 概览页快速上手示例未展示 `selectable` + `batchActions` 组合（CRUD 常见需求），需查阅子文档 |
| 2 | 低 | `useCoverable.md` | 文档 572 行偏重 BC 企业模式，缺少"轻量可覆盖面板"简化示例，新用户阅读负担较重 |

## 改进建议

1. **ProTable.md 快速上手**：在示例中增加一行 `selectable` + `batchActions` 展示，覆盖最常见的 CRUD 表格场景
2. **useCoverable.md 增加轻量示例**：在"何时使用"后增加一个 30 行以内的纯数据面板示例，降低入门门槛
