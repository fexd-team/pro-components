# 开发指南

## 体验规范

管理系统场景中的体验规范与要求，以保证各类交互场景体验的良好与一致性。

本指南重在指导，而非约束。在交互体验改善的过程中，最重要的并不是规范，而是站在用户的角度，尝试改善体验的意识。

## 设计原则

### 尼尔森十大可用性原则

1. **系统可见性原则**

   - 保持界面的状态可见，变化可见，内容可见
   - 让用户知道发生了什么，在适当的时间内做出适当的反馈
   - 不要蒙蔽用户，沟通是所有关系的基础

2. **贴近场景原则**

   - 用用户的语言，用词，短语和用户熟悉的概念，而不是系统术语
   - 功能操作符合用户的使用场景
   - 遵循现实世界的惯例呈现信息

3. **可控性原则**

   - 用户经常错误地选择系统功能而且需要明确标识的"出口"
   - 支持撤销和重做的功能

4. **一致性和标准化原则**

   - 遵循平台的惯例
   - 同一用语、功能、操作保持一致
   - 用户不必怀疑不同语言、情景或操作产生的结果是否为同一件事情

5. **防错原则**

   - 更用心的设计防止问题发生
   - 在用户可能犯错时进行提醒，比如删除可能造成的后果

6. **协助记忆原则**
   - 尽量减少用户对操作目标的记忆负荷
   - 动作和选项都应该是可见的

## 表单开发规范

### 引导与提示

#### 占位文案规范

- ✅ **必须提供**：所有表单项都需提供占位文案，不应空缺
- ✅ **合理明确**：占位文案应合理、好理解
- ✅ **示例引导**：使用具体示例帮助用户理解

```jsx
// ✅ 好的占位文案
<ProForm
  fields={[
    {
      label: '手机号',
      name: 'phone',
      type: 'text',
      placeholder: '请输入11位手机号码'
    },
    {
      label: '时间范围',
      name: 'dateRange',
      type: 'dateRange',
      placeholder: ['开始时间', '结束时间']
    }
  ]}
/>

// ❌ 不好的占位文案
<ProForm
  fields={[
    {
      label: '手机号',
      name: 'phone',
      type: 'text',
      placeholder: '请输入' // 太模糊
    },
    {
      label: '时间范围',
      name: 'dateRange',
      type: 'dateRange',
      placeholder: ['开始', '结束'] // 缺少具体说明
    }
  ]}
/>
```

#### 表单验证

- ✅ **即时反馈**：在用户完成输入后立即进行验证
- ✅ **清晰提示**：错误信息要清晰明确，告知用户如何修复
- ✅ **正确状态**：验证通过时给予正面反馈

```jsx
<ProForm
  fields={[
    {
      label: '邮箱',
      name: 'email',
      type: 'text',
      required: true,
      rules: [
        { required: true, message: '请输入邮箱地址' },
        { type: 'email', message: '请输入正确的邮箱格式' },
      ],
      placeholder: '请输入邮箱地址，如：user@example.com',
    },
  ]}
/>
```

### 布局规范

#### 网格布局

- ✅ **合理列数**：根据字段复杂度选择合适的列数（1-4列）
- ✅ **响应式设计**：在不同屏幕尺寸下保持良好的布局
- ✅ **视觉平衡**：重要字段放在显眼位置

```jsx
// ✅ 合理的网格布局
<ProForm
  gridColumns={3} // 3列布局适合大部分场景
  fields={[
    { label: '姓名', name: 'name', type: 'text' },
    { label: '手机', name: 'phone', type: 'text' },
    { label: '邮箱', name: 'email', type: 'text' },
    {
      label: '备注',
      name: 'remark',
      type: 'textarea',
      colSpan: 3, // 跨列显示
    },
  ]}
/>
```

## 表格开发规范

### 数据展示

#### 状态指示

- ✅ **明确状态**：使用颜色、图标明确表示数据状态
- ✅ **一致性**：同类状态在不同页面中保持一致的表示方法

```jsx
<ProTable
  columns={[
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: [
        { label: '启用', value: 1, color: 'green' },
        { label: '禁用', value: 0, color: 'red' },
        { label: '待审核', value: 2, color: 'orange' },
      ],
    },
  ]}
/>
```

#### 空状态处理

- ✅ **友好提示**：数据为空时提供友好的提示信息
- ✅ **引导操作**：告知用户如何添加数据

```jsx
<ProTable
  locale={{
    emptyText: (
      <div>
        <div>暂无数据</div>
        <div>点击"新增"按钮添加第一条记录</div>
      </div>
    ),
  }}
/>
```

### 操作交互

#### 确认操作

- ✅ **危险操作确认**：删除等危险操作必须有确认提示
- ✅ **批量操作确认**：批量操作要明确影响范围

```jsx
<ProTable
  columnActions={[
    {
      builtIn: 'delete',
      confirm: '确定要删除这条记录吗？删除后无法恢复。',
    },
  ]}
  batchActions={[
    {
      builtIn: 'delete',
      confirm: (count) => `确定要删除选中的 ${count} 条记录吗？删除后无法恢复。`,
    },
  ]}
/>
```

## 全局规范

### 错误处理

#### 接口错误

- ✅ **必须提示**：所有接口错误都需要提示，特殊要求除外
- ✅ **错误信息清晰**：提供具体的错误信息，而不是技术术语
- ✅ **提供解决方案**：在可能的情况下，告知用户如何解决问题

```jsx
// ✅ 好的错误处理
<ProTable
  onQuery={async () => {
    try {
      const result = await api.fetchData()
      return result
    } catch (error) {
      message.error('数据加载失败，请检查网络连接后重试')
      throw error
    }
  }}
/>

// ❌ 不好的错误处理
<ProTable
  onQuery={async () => {
    try {
      const result = await api.fetchData()
      return result
    } catch (error) {
      // 没有任何提示，用户不知道发生了什么
      throw error
    }
  }}
/>
```

### 加载状态

#### 数据加载

- ✅ **显示加载状态**：数据加载时要有明确的加载指示
- ✅ **避免闪烁**：避免短时间的加载状态闪烁
- ✅ **骨架屏**：对于复杂内容，使用骨架屏而不是单纯的 loading

```jsx
// ✅ 好的加载处理
;<ProTable
  onQuery={async (params) => {
    const result = await api.fetchData(params)
    // ProTable 会自动处理 loading 状态
    return result
  }}
/>

// 对于自定义组件
const MyComponent = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await api.fetchData()
      setData(result)
    } finally {
      setLoading(false)
    }
  }

  return <Spin spinning={loading}>{/* 内容 */}</Spin>
}
```

### 响应式设计

#### 移动端适配

- ✅ **触摸友好**：按钮、链接等交互元素要有足够的触摸区域
- ✅ **内容优先**：在小屏幕上优先显示重要内容
- ✅ **简化操作**：减少复杂的鼠标操作，优化为触摸操作

```jsx
// ✅ 移动端友好的表格
<ProTable
  size="small" // 在移动端使用小尺寸
  scroll={{ x: 800 }} // 支持横向滚动
  columnActions={[
    'view', // 在移动端优先保留查看操作
    {
      text: '更多',
      menu: [
        { text: '编辑', action: 'edit' },
        { text: '删除', action: 'delete' },
      ],
    },
  ]}
/>
```

## 性能优化

### 数据处理

- ✅ **分页加载**：大量数据使用分页而不是全量加载
- ✅ **按需加载**：复杂组件使用懒加载
- ✅ **缓存策略**：合理使用缓存减少重复请求

```jsx
// ✅ 好的分页处理
<ProTable
  pagination={{
    defaultPageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条记录`,
  }}
  onQuery={async ({ current, pageSize, ...filters }) => {
    const result = await api.fetchData({
      page: current,
      size: pageSize,
      ...filters,
    })
    return {
      data: result.data,
      total: result.total,
    }
  }}
/>
```

### 用户体验

- ✅ **防抖节流**：对于频繁触发的操作使用防抖或节流
- ✅ **乐观更新**：在可能的情况下使用乐观更新提升体验
- ✅ **渐进增强**：基础功能优先，增强功能渐进加载
