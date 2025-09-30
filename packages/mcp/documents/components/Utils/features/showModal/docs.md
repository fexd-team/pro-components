# showModal - 命令式弹窗工具

## 功能介绍

showModal 是一个命令式的模态框工具，支持灵活的内容渲染、可拖拽、Promise 异步操作等功能，适用于各种对话框场景。

## 核心特性

- 🎯 **命令式调用**：无需状态管理，直接调用即可显示弹窗
- 🖱️ **可拖拽移动**：支持拖拽标题栏移动弹窗位置
- 💫 **Promise 支持**：基于 Promise 的异步操作，支持确认/取消流程
- 🎨 **灵活内容**：支持任意 React 组件作为弹窗内容
- 🔄 **动态更新**：支持动态更新弹窗内容和配置
- 📱 **响应式设计**：自适应不同屏幕尺寸

## API

### showModal

```typescript
const showModal = (
  content: React.ReactNode,
  options?: ShowModalOptions
) => {
  return {
    promise: Promise<any>,
    close: (result?: any) => void,
    update: (newContent: React.ReactNode, newOptions?: ShowModalOptions) => void
  }
}
```

### 参数说明

| 参数    | 说明         | 类型             | 默认值 |
| ------- | ------------ | ---------------- | ------ |
| content | 弹窗内容     | React.ReactNode  | -      |
| options | 弹窗配置选项 | ShowModalOptions | -      |

### ShowModalOptions

```typescript
interface ShowModalOptions {
  title?: React.ReactNode // 弹窗标题
  width?: number // 弹窗宽度
  height?: number // 弹窗高度
  draggable?: boolean // 是否可拖拽
  maskClosable?: boolean // 点击遮罩是否关闭
  keyboard?: boolean // 是否支持键盘 ESC 关闭
  centered?: boolean // 是否垂直居中
  zIndex?: number // 层级
  className?: string // 自定义样式类名
  style?: React.CSSProperties // 自定义样式
  destroyOnClose?: boolean // 关闭时是否销毁内容
  okText?: string // 确认按钮文字
  cancelText?: string // 取消按钮文字
  okButtonProps?: ButtonProps // 确认按钮属性
  cancelButtonProps?: ButtonProps // 取消按钮属性
  footer?: React.ReactNode | null // 自定义底部内容
  onOk?: () => void | Promise<void> // 确认回调
  onCancel?: () => void // 取消回调
  afterClose?: () => void // 关闭后回调
}
```

### 返回值

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| promise | Promise 对象，确认时 resolve，取消时 reject | Promise<any> |
| close | 手动关闭弹窗的方法 | (result?: any) => void |
| update | 更新弹窗内容和配置的方法 | (content: React.ReactNode, options?: ShowModalOptions) => void |

## 使用场景

### 1. 确认对话框

最简单的确认场景：

```jsx
import { showModal } from '@fexd/pro-utils'

const handleDelete = async () => {
  try {
    await showModal('确定要删除这条记录吗？删除后无法恢复。', {
      title: '确认删除',
      okText: '删除',
      cancelText: '取消',
    }).promise

    // 用户点击确认后执行删除
    console.log('执行删除操作')
  } catch {
    // 用户点击取消
    console.log('取消删除')
  }
}
```

### 2. 表单弹窗

包含表单的对话框：

```jsx
const showUserForm = (user = {}) => {
  return showModal(
    <Form initialValues={user}>
      <Form.Item label="姓名" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="邮箱" name="email" required>
        <Input type="email" />
      </Form.Item>
    </Form>,
    {
      title: user.id ? '编辑用户' : '添加用户',
      width: 500,
      onOk: async () => {
        // 表单验证和提交逻辑
        const values = await form.validateFields()
        await saveUser(values)
      },
    },
  )
}
```

### 3. 详情查看弹窗

展示详细信息的对话框：

```jsx
const showDetails = (record) => {
  showModal(
    <Descriptions column={2} bordered>
      <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
      <Descriptions.Item label="名称">{record.name}</Descriptions.Item>
      <Descriptions.Item label="状态">{record.status}</Descriptions.Item>
      <Descriptions.Item label="创建时间">{record.createTime}</Descriptions.Item>
    </Descriptions>,
    {
      title: '详细信息',
      width: 600,
      footer: null, // 不显示底部按钮
    },
  )
}
```

### 4. 可拖拽弹窗

支持拖拽移动的弹窗：

```jsx
const showDraggableModal = () => {
  showModal(
    <div>
      <p>这是一个可拖拽的弹窗</p>
      <p>你可以拖拽标题栏来移动弹窗位置</p>
    </div>,
    {
      title: '可拖拽弹窗',
      draggable: true,
      width: 400,
    },
  )
}
```

## 高级功能

### 动态内容更新

```jsx
const showProgressModal = () => {
  const controller = showModal(<div>准备开始处理...</div>, {
    title: '处理进度',
    footer: null,
  })

  // 模拟进度更新
  let progress = 0
  const timer = setInterval(() => {
    progress += 10
    controller.update(
      <div>
        <Progress percent={progress} />
        <p>正在处理第 {progress / 10} 步...</p>
      </div>,
    )

    if (progress >= 100) {
      clearInterval(timer)
      setTimeout(() => {
        controller.close('完成')
      }, 1000)
    }
  }, 500)
}
```

### 多步骤向导

```jsx
const showWizard = () => {
  let currentStep = 0
  const steps = ['基本信息', '详细配置', '确认提交']

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <div>步骤1：填写基本信息</div>
      case 1:
        return <div>步骤2：配置详细选项</div>
      case 2:
        return <div>步骤3：确认并提交</div>
    }
  }

  const controller = showModal(renderStep(currentStep), {
    title: `向导 - ${steps[currentStep]}`,
    okText: currentStep === steps.length - 1 ? '完成' : '下一步',
    cancelText: currentStep === 0 ? '取消' : '上一步',
    onOk: () => {
      if (currentStep < steps.length - 1) {
        currentStep++
        controller.update(renderStep(currentStep), {
          title: `向导 - ${steps[currentStep]}`,
          okText: currentStep === steps.length - 1 ? '完成' : '下一步',
        })
        return false // 阻止关闭
      }
      return true // 允许关闭
    },
    onCancel: () => {
      if (currentStep > 0) {
        currentStep--
        controller.update(renderStep(currentStep), {
          title: `向导 - ${steps[currentStep]}`,
          cancelText: currentStep === 0 ? '取消' : '上一步',
        })
        return false // 阻止关闭
      }
      return true // 允许关闭
    },
  })
}
```

### 异步确认处理

```jsx
const showAsyncConfirm = () => {
  showModal('确定要执行这个耗时操作吗？', {
    title: '异步确认',
    onOk: async () => {
      // 显示加载状态
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('异步操作完成')
          resolve()
        }, 2000)
      })
    },
  })
}
```

## 实际应用示例

### 用户管理弹窗

```jsx
const UserModal = ({ user, onSave }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      await onSave(values)
      return true // 允许关闭
    } catch (error) {
      console.error('保存失败:', error)
      return false // 阻止关闭
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form form={form} initialValues={user} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
        <Select>
          <Select.Option value="admin">管理员</Select.Option>
          <Select.Option value="user">普通用户</Select.Option>
          <Select.Option value="guest">访客</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

const showUserModal = (user = {}) => {
  return showModal(
    <UserModal
      user={user}
      onSave={async (values) => {
        // 保存用户逻辑
        await saveUser(values)
      }}
    />,
    {
      title: user.id ? '编辑用户' : '添加用户',
      width: 500,
      onOk: async () => {
        // 触发表单提交
        return await handleSave()
      },
    },
  )
}
```

### 图片裁剪弹窗

```jsx
const ImageCropModal = ({ imageUrl, onCrop }) => {
  const [cropResult, setCropResult] = useState(null)

  return (
    <div>
      <ImageCropper src={imageUrl} onCropComplete={(result) => setCropResult(result)} />

      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Button type="primary" onClick={() => onCrop(cropResult)} disabled={!cropResult}>
          应用裁剪
        </Button>
      </div>
    </div>
  )
}

const showImageCropModal = (imageUrl) => {
  return showModal(
    <ImageCropModal
      imageUrl={imageUrl}
      onCrop={(result) => {
        console.log('裁剪结果:', result)
        // 处理裁剪结果
      }}
    />,
    {
      title: '图片裁剪',
      width: 800,
      height: 600,
      footer: null,
    },
  )
}
```

## 最佳实践

### 1. 合理的弹窗尺寸

```jsx
// ✅ 根据内容设置合适的尺寸
const showFormModal = () => {
  showModal(content, {
    width: 600, // 表单弹窗适中宽度
    centered: true, // 垂直居中显示
  })
}

// ✅ 大内容使用最大化
const showDetailModal = () => {
  showModal(content, {
    width: '90vw', // 响应式宽度
    height: '80vh', // 响应式高度
    style: { top: 20 }, // 留出顶部空间
  })
}
```

### 2. 错误处理

```jsx
// ✅ 包含完整的错误处理
const showSafeModal = () => {
  showModal(content, {
    onOk: async () => {
      try {
        await dangerousOperation()
        message.success('操作成功')
        return true
      } catch (error) {
        message.error(`操作失败: ${error.message}`)
        return false // 阻止关闭
      }
    },
  })
}
```

### 3. 内存管理

```jsx
// ✅ 及时清理资源
const showResourceModal = () => {
  const controller = showModal(content, {
    afterClose: () => {
      // 清理定时器、事件监听等
      cleanup()
    },
  })

  // 组件卸载时关闭弹窗
  useEffect(() => {
    return () => {
      controller.close()
    }
  }, [])
}
```

## 注意事项

1. **避免嵌套弹窗**：多层弹窗会影响用户体验，建议使用步骤向导替代
2. **合理的 z-index**：确保弹窗显示在正确的层级上
3. **移动端适配**：在小屏幕设备上注意弹窗尺寸和交互方式
4. **键盘导航**：支持 Tab 键在弹窗内元素间切换
5. **无障碍访问**：添加适当的 ARIA 标签和焦点管理
