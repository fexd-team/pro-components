---
name: ProForm-layout
description: ProForm 布局系统完整指南——Grid 布局、render 自由布局、二维 fields、colSpan 规则
---

# ProForm 布局系统

## 布局方式概览

| 方式              | 适用场景     | colSpan 语义                 |
| ----------------- | ------------ | ---------------------------- |
| Grid 布局（默认） | 等分字段     | 占几列（gridColumns 中的列） |
| render 布局       | 精确控制位置 | 24 栅格值                    |
| 二维 fields       | 按行分组     | 24 栅格值                    |
| children 函数     | 完全自定义   | 不限                         |

## Grid 布局（默认）

通过 `gridColumns` 和 `gridGutter` 控制。

```tsx
<ProForm
  gridColumns={3} // 每行 3 个字段
  gridGutter={[16, 0]} // 水平间距 16，垂直间距 0
  fields={[
    { label: '姓名', name: 'name', type: 'text' },
    { label: '部门', name: 'dept', type: 'select', options: deptOptions },
    { label: '入职日期', name: 'joinDate', type: 'date' },
    { label: '备注', name: 'remark', type: 'textarea', colSpan: 3 }, // 跨 3 列（占满整行）
  ]}
/>
```

### colSpan 在 Grid 中的含义

`colSpan` 表示占用 `gridColumns` 中的几列：

```tsx
// gridColumns={4} 时
{ label: '地址', name: 'address', colSpan: 2 }  // 占 2/4 = 50%
{ label: '备注', name: 'remark', colSpan: 4 }    // 占 4/4 = 100%（整行）
```

### gridGutter 默认值

- `size === 'small'` 时：`12`
- 其他情况：`16`

## render 自由布局

`render` 接受二维数组，每个子数组为一行。**此模式下 `colSpan` 为 antd 24 栅格系统值。**

```tsx
<ProForm
  form={form}
  fields={[
    { label: '用户名', name: 'username', type: 'text', required: true },
    { label: '密码', name: 'password', type: 'password', required: true },
    { label: '确认密码', name: 'confirmPassword', type: 'password' },
    { label: '邮箱', name: 'email', type: 'text' },
    { label: '手机号', name: 'phone', type: 'text' },
    { label: '部门', name: 'department', type: 'select', options: deptOptions },
  ]}
  render={[
    // 第一行：用户名占 16 格，密码占 8 格
    [
      { name: 'username', colSpan: 16 },
      { name: 'password', colSpan: 8 },
    ],

    // 第二行：确认密码 16 格 + 自定义内容 8 格
    [
      { name: 'confirmPassword', colSpan: 16 },
      {
        colSpan: 8,
        content: (
          <Form.Item label=" ">
            <Space>
              <Action
                type="primary"
                content="提交"
                onClick={async () => {
                  await form.validateFields()
                }}
              />
              <Action content="重置" onClick={() => form.resetFields()} />
            </Space>
          </Form.Item>
        ),
      },
    ],

    // 第三行：三个字段等分（不指定 colSpan 自动等分）
    ['email', 'phone', 'department'],
  ]}
/>
```

### render 项类型

| 格式                                   | 说明                             |
| -------------------------------------- | -------------------------------- |
| `'fieldName'`                          | 字符串，按 name 查找 fields 配置 |
| `{ name: 'fieldName', colSpan: 12 }`   | 指定字段 + 栅格宽度              |
| `{ colSpan: 8, content: <ReactNode> }` | 自定义内容节点                   |
| `<ReactNode>`                          | 直接放 JSX 元素                  |

### render 也可以是函数

```tsx
<ProForm
  render={(params) => {
    // params 包含 ProFormRenderParams 信息
    return [
      ['username', 'password'],
      ['email', 'phone'],
    ]
  }}
/>
```

> 函数返回数组时会再走 `renderFields` 处理。

## 二维 fields 布局

`fields` 支持二维数组，第一维为行：

```tsx
<ProForm
  fields={[
    // 第一行
    [
      { label: '姓名', name: 'name', type: 'text' },
      { label: '年龄', name: 'age', type: 'digit' },
    ],
    // 第二行
    [
      { label: '地址', name: 'address', type: 'text', colSpan: 16 },
      { label: '邮编', name: 'zip', type: 'text', colSpan: 8 },
    ],
    // 第三行（独占一行）
    [{ label: '备注', name: 'remark', type: 'textarea' }],
  ]}
/>
```

> 每行默认等分，可通过 `colSpan`（24 栅格）调整。

## 内联 label

```tsx
<ProForm
  layout="horizontal" // 默认 vertical
  fields={[
    { label: '姓名', name: 'name', type: 'text' },
    { label: '部门', name: 'dept', type: 'select', options: deptOptions },
  ]}
/>
```

> 不建议使用 horizontal。最好保持 vertical 上下结构以保证 label 有充足呈现空间。

## children 函数式布局

`children` 可为函数（等同 render），接收 `ProFormRenderParams`：

```tsx
<ProForm
  form={form}
  fields={[
    { label: '姓名', name: 'name', type: 'text' },
    { label: '部门', name: 'dept', type: 'select', options: deptOptions },
  ]}
>
  {({ renderField, renderFields }) => (
    <div>
      <h3>基本信息</h3>
      {renderField('name')}
      {renderField('dept')}
      <h3>操作</h3>
      <Action type="primary" onClick={() => form.validateFields()}>
        提交
      </Action>
    </div>
  )}
</ProForm>
```

> `children` 函数返回数组时也会走 `renderFields` 处理。

### renderFields 的 useBuiltInGrid 选项

`renderFields` 默认使用内置 Grid 包裹字段。如果你想在自定义布局中调用 `renderFields` 但不要 Grid 容器（只返回纯字段列表），可以传配置对象：

```tsx
render={({ renderFields }) => (
  <div className="my-custom-grid">
    {renderFields(['name', 'email', 'phone'], { useBuiltInGrid: false })}
  </div>
)}
```

| useBuiltInGrid | 行为                                           |
| -------------- | ---------------------------------------------- |
| `true`（默认） | renderFields 输出被 Grid/Row/Col 包裹          |
| `false`        | renderFields 输出为纯 Fragment（字段直接排列） |

### renderFields 的 freeLayout（二维数组自由布局）

当 `configs` 参数传入**二维数组**时，`freeLayout` 自动启用，每行的字段自动平分一行宽度：

```tsx
render={({ renderFields }) => (
  renderFields(
    [
      ['name', 'email'],           // 第一行：2个字段各占 12 栅格
      ['phone', 'dept', 'role'],   // 第二行：3个字段各占 8 栅格
      ['remark'],                  // 第三行：1个字段占满
    ]
  )
)}
```

也可显式启用：

```tsx
renderFields(fieldKeys, { freeLayout: true })
```

`freeLayout` 与 `useBuiltInGrid` 可组合：

- `freeLayout: true` + `useBuiltInGrid: true`（默认）：自动分配每行栅格
- `freeLayout: true` + `useBuiltInGrid: false`：二维结构 flatten，不加 Grid

## 布局对比表

| 特征         | Grid            | render               | 二维 fields     |
| ------------ | --------------- | -------------------- | --------------- |
| colSpan 语义 | 占几列          | 24 栅格              | 24 栅格         |
| 自定义内容   | 不支持          | `{ content: <JSX> }` | 不支持          |
| 行控制       | 自动换行        | 手动分行             | 手动分行        |
| 字段定义     | fields 一维数组 | fields + render 配置 | fields 二维数组 |
| 适用复杂度   | 简单等分        | 精确控制             | 中等            |
