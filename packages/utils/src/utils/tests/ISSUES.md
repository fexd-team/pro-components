# 测试过程中发现的源码问题

> 本文件记录测试编写过程中发现的源码行为异常或设计问题。仅记录不修改源码。

## 1. `deepMapItem` — handleItem 双重应用

**严重度：** 中（功能可用但容易误用）

**文件：** `packages/utils/src/utils/deepMapItem.tsx`

**问题描述：** 对于叶节点（原始值），`handleItem` 会被调用**两次**：

1. 递归底部 `return run(handleItem, undefined, object, undefined, prefixKeys)` — 第一次
2. 父级容器中 `return run(handleItem, undefined, nextItem, index, nextPrefixKeys)` — 第二次

**影响：**

```ts
// 用户期望 [1, 2, 3] → [2, 4, 6]
// 实际结果 [1, 2, 3] → [4, 8, 12]（每个值被 *2 两次）
deepMapItem([1, 2, 3], { handleItem: (v) => (typeof v === 'number' ? v * 2 : v) })
```

对于幂等操作（如 `null → ''`、`toUpperCase`）不受影响，但对累积操作（`+100`、`*2`）会产生非预期结果。

**建议修复方向：**

- 方案 A：移除最底部的 `handleItem` 调用，仅在容器层应用
- 方案 B：区分叶节点和容器节点，叶节点只应用一次

---

## 2. `deepMapItem` — 数组不可变 vs 对象原地修改

**严重度：** 低（不一致但已在使用中）

**问题描述：**

- **数组**：`object.map(...)` 返回新数组，原数组不变
- **对象**：`object[key] = ...` 直接修改原对象

这种不对称行为可能导致使用者困惑。

---

## 3. `createValueProxy` — `prop in obj` 包含原型链

**严重度：** 低

**文件：** `packages/utils/src/utils/createValueProxy.tsx`

**问题描述：** `if (prop in obj)` 检查包含原型链上的属性（如 `toString`、`valueOf`）。这意味着 `valueHandler` 也会处理这些原型链属性。

如果用户的 `valueHandler` 对所有非 `label` 的 key 返回 `undefined`，可能导致 `toString()` 等内置方法失效。

**可能的改进：**

```ts
if (Object.prototype.hasOwnProperty.call(obj, prop)) {
  return valueHandler?.(obj?.[prop], prop) ?? obj?.[prop]
}
return obj[prop] // 原型链属性直接返回
```

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

## 6. `dayjsTZ` — customParseFormat 参数冲突

**严重度：** 低（设计限制）

**文件：** `packages/utils/src/utils/dayjsTZ.ts`

**问题描述：** `dayjsTZ(date, ...args)` 内部调用 `rawDayjs.tz(date, ...args)`，第二个参数会被 `dayjs/plugin/timezone` 当作时区而非格式字符串。因此通过 `dayjsTZ` 无法使用 `customParseFormat` 插件的格式化语法。

```ts
// 期望：按 'DD/MM/YYYY' 解析
// 实际：'DD/MM/YYYY' 被当作时区名
dayjsTZ('15/01/2024', 'DD/MM/YYYY')
```

**建议：** 在文档或 JSDoc 中注明此限制，或提供一个 `dayjsTZ.parse(date, format)` 工具方法。

---

## 7. `genMemoizedFetch` — SAS 锁机制在错误恢复时导致 Jest Worker 崩溃

**严重度：** 中（影响测试环境）

**文件：** `packages/utils/src/utils/genMemoizedFetch.tsx`

**问题描述：** `genMemoizedFetch` 内部使用 `@fexd/tools` 的 SAS（Serialize Async Sequential）锁机制。当 fetch 函数抛出异常时，SAS 的 `disable` 回调中的 `throw e` 会导致未捕获的 Promise rejection，使整个 Jest worker 进程崩溃。

在测试中无法安全地测试错误恢复场景（如 fetch 失败后重试）。

---

## 8. 预存测试 — `multipleTreeSelect.test.tsx` onChange 参数不匹配

**严重度：** 低（预存测试问题）

**文件：** `packages/form/src/valueTypes/type-select-box/tests/multipleTreeSelect.test.tsx`

**问题描述：** 测试期望 `onChange` 被调用时传入 `[2, '2-1']`，但实际参数格式与预期不一致。可能是 antd TreeSelect 版本更新导致回调参数变化。

---

## 9. 预存测试 — `dateTime.test.tsx` 日期选择器 cell 未出现

**严重度：** 低（预存测试问题）

**文件：** `packages/form/src/valueTypes/type-date-time/tests/dateTime.test.tsx`

**问题描述：** 测试尝试查找 `.ant-picker-cell[title="${date}"]` 元素但返回 null。可能是 antd DatePicker 渲染时机问题，日历面板尚未完全展开时断言已执行。
