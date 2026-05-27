# 测试过程中发现的源码问题

> 本文件记录测试编写过程中发现的源码行为异常或设计问题。仅记录不修改源码。

## 1. `deepMapItem` — handleItem 双重应用（已修复）

**严重度：** 中（功能可用但容易误用）

**文件：** `packages/utils/src/utils/deepMapItem.tsx`

**已修复：** 通过两处改动消除双重应用：

1. 对象分支处理完子项后直接 `return object`，不再走底部的 `handleItem`
2. 底部的 `handleItem` 仅在顶层直接传入叶值时生效（`prefixKeys.length === 0`），被父级递归调用的叶节点由父级容器的循环统一处理

---

## 2. `deepMapItem` — 数组不可变 vs 对象原地修改（已修复）

**严重度：** 低（不一致但已在使用中）

**已修复：** 默认不可变（数组和对象都返回新副本），并新增 `mutable: true` 选项支持原地修改场景。

---

## 3. `createValueProxy` — `prop in obj` 包含原型链（已修复）

**严重度：** 低

**文件：** `packages/utils/src/utils/createValueProxy.tsx`

**已修复：** 实现替换为 `@fexd/tools@0.2.1` 新增的 `createProxyGetter`，使用 `Object.prototype.hasOwnProperty.call` + `Reflect.get` 正确处理原型链属性和 Symbol。

---

## 4. `getFieldFromColumn` — `false` 值与 `undefined` 不可区分

**严重度：** 低

**文件：** `packages/table/src/plugins/valueType/helpers.tsx`

**问题描述：**

```ts
if (propKey !== 'viewField' && !(column as any)?.[propKey]) {
  return // 返回 undefined
}
```

当 `column.editField = false` 时，`!false` 为 `true`，触发早期返回 `undefined`。后续的 `if (propConfig === false) { return null }` 永远不会执行。

这意味着语义上 "显式禁用字段" (`false`) 与 "未配置" (`undefined`) 对外表现相同，都是 `undefined`。虽然在 `defineColumns` 的上层逻辑中通过 `isExist` 检查（`undefined` 和 `null` 都不存在），实际行为一致，但语义区分丢失了。

---

## 5. 预存基础设施问题 — 集成测试 ESM 模块解析（已修复）

**严重度：** 低（仅影响集成测试）

**文件：** `jest.config.js`

**问题描述：** 原有 `moduleNameMapper` 配置不完整，导致：

1. `moment/dist/locale/*.js`（ESM）未被正确映射到 CJS 版本
2. `rc-field-form/es/useForm` 等子路径未被正确捕获

**已修复：** 在 `jest.config.js` 中补充了完整的 moduleNameMapper 规则：

- `'^moment/dist/locale/(.*)$'` → `'<rootDir>/node_modules/moment/locale/$1'`
- `'^antd/es/(.*)$'`、`'^ahooks/es/(.*)$'`、`'^rc-field-form/es/(.*)$'` 加子路径匹配

---

## 6. `dayjsTZ` — customParseFormat 参数冲突（已修复）

**严重度：** 低（设计限制）

**文件：** `packages/utils/src/utils/dayjsTZ.tsx`

**问题描述：** `dayjsTZ(date, ...args)` 内部调用 `rawDayjs.tz(date, ...args)`，第二个参数会被 `dayjs/plugin/timezone` 当作时区而非格式字符串。因此通过 `dayjsTZ` 无法使用 `customParseFormat` 插件的格式化语法。

**已修复：** 通过 `Intl.DateTimeFormat` 自动检测第二参数是否为合法 IANA 时区名：

- 不是合法时区 → 视为 customParseFormat 格式串，自动推断默认时区
- 是合法时区 → 保持原有行为不变
- 三参数形式 `(date, format, timezone)` 不受影响

---

## 7. `genMemoizedFetch` — SAS 锁机制在错误恢复时导致 Jest Worker 崩溃

**严重度：** 中（影响测试环境）

**文件：** `packages/utils/src/utils/genMemoizedFetch.tsx`

**问题描述：** `genMemoizedFetch` 内部使用 `@fexd/tools` 的 SAS（Serialize Async Sequential）锁机制。当 fetch 函数抛出异常时，SAS 的 `disable` 回调中的 `throw e` 会导致未捕获的 Promise rejection，使整个 Jest worker 进程崩溃。

在测试中无法安全地测试错误恢复场景（如 fetch 失败后重试）。

---

## 8. 预存测试 — `multipleTreeSelect.test.tsx` onChange 参数不匹配（已恢复）

**严重度：** 低（预存测试问题）

**文件：** `packages/form/src/valueTypes/type-select-box/tests/multipleTreeSelect.test.tsx`

**问题描述：** 测试期望 `onChange` 被调用时传入 `[2, '2-1']`，但实际参数格式与预期不一致。可能是 antd TreeSelect 版本更新导致回调参数变化。

**当前状态：** 已恢复通过，可能为偶发时序问题。

---

## 9. 预存测试 — `dateTime.test.tsx` 日期选择器 cell 未出现（已恢复）

**严重度：** 低（预存测试问题）

**文件：** `packages/form/src/valueTypes/type-date-time/tests/dateTime.test.tsx`

**问题描述：** 测试尝试查找 `.ant-picker-cell[title="${date}"]` 元素但返回 null。可能是 antd DatePicker 渲染时机问题，日历面板尚未完全展开时断言已执行。

**当前状态：** 已恢复通过，可能为偶发时序问题。
