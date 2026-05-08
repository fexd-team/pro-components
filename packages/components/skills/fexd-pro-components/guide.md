# 体验规范与最佳实践

管理系统场景中的体验规范，保证交互体验的良好与一致性。

## 设计原则

### 尼尔森十大可用性原则（摘要）

1. **系统可见性** — 让用户知道发生了什么，及时反馈
2. **贴近场景** — 用用户的语言，而不是系统术语
3. **可控性** — 支持撤销和明确的"出口"
4. **一致性** — 同一用语、功能、操作保持一致
5. **防错** — 在用户可能犯错时提醒，如删除后果
6. **协助记忆** — 减少记忆负荷，选项可见

## 表单开发规范

### 占位文案

- 所有表单项必须提供占位文案
- 占位文案应合理、好理解，使用具体示例引导

```jsx
// ✅ 好的占位文案
{ label: '手机号', name: 'phone', type: 'text', placeholder: '请输入11位手机号码' }
{ label: '时间范围', name: 'dateRange', type: 'dateRange', placeholder: ['开始时间', '结束时间'] }

// ❌ 不好的占位文案
{ label: '手机号', name: 'phone', type: 'text', placeholder: '请输入' }
```

### 表单验证

- 即时反馈：用户完成输入后立即验证
- 清晰提示：错误信息告知用户如何修复
- 正确状态：验证通过给予正面反馈

```jsx
{
  label: '邮箱', name: 'email', type: 'text', required: true,
  rules: [
    { required: true, message: '请输入邮箱地址' },
    { type: 'email', message: '请输入正确的邮箱格式' },
  ],
  placeholder: '请输入邮箱地址，如：user@example.com',
}
```

### 布局规范

- 根据字段复杂度选择列数（1-4 列），3 列适合大部分场景
- 重要字段放显眼位置，长内容字段用 `colSpan` 跨列

## 表格开发规范

### 状态指示

- 使用颜色、图标明确表示数据状态
- 同类状态在不同页面保持一致

```jsx
{
  title: '状态', dataIndex: 'status', valueType: 'select',
  valueEnum: [
    { label: '启用', value: 1, color: 'green' },
    { label: '禁用', value: 0, color: 'red' },
  ],
}
```

### 空状态 & 操作交互

- 数据为空时提供友好提示和引导
- 危险操作必须有确认提示，批量操作明确影响范围

```jsx
columnActions={[
  { builtIn: 'delete', confirm: '确定要删除这条记录吗？删除后无法恢复。' },
]}
batchActions={[
  { builtIn: 'delete', confirm: (count) => `确定要删除选中的 ${count} 条记录吗？` },
]}
```

## 全局规范

### 错误处理

- 所有接口错误都需要提示
- 提供具体的错误信息和解决方案
- ProTable 的 `onQuery` 中捕获错误并使用 `message.error` 提示

### 加载状态

- 数据加载时有明确的加载指示（ProTable 自动管理）
- 避免短时间加载状态闪烁
- 自定义组件使用 `useAutoLoading` 或 `Action` 自动管理

### 分页

- 大量数据使用分页，`defaultPageSize` 建议 20
- 配置 `showSizeChanger`、`showQuickJumper`、`showTotal`

### 防抖节流

- 搜索输入使用 `useDebounce`
- 频繁触发的操作使用节流
