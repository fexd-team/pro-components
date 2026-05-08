# Skills 质量评估

评估 @fexd/pro-components Skills 文档对 AI Agent 生成代码质量的影响。

## 评估流程

### 1. 准备

确保 Cursor 已加载 `fexd-pro-components` Skill（通过 `skills-npm` 或手动软链接）。

### 2. 执行测试 Prompts

使用 `prompts.json` 中的测试用例，在 Cursor 中逐一测试。每个 prompt 包含：

- `id`：测试用例标识
- `prompt`：输入给 AI 的提示
- `expected`：期望的关键行为/输出
- `category`：测试类别

### 3. 评分

按 `rubric.md` 中的评分标准对每次生成进行打分。

### 4. 记录结果

将结果记录到 `baseline/report.md`，包含：

- 测试日期和环境
- 每个 prompt 的得分
- 发现的问题和改进建议

## 目录结构

```
evals/
├── README.md          # 本文件
├── prompts.json       # 测试用例
├── rubric.md          # 评分标准
└── baseline/
    └── report.md      # 基准测试报告
```
