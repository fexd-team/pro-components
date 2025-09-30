# ProTable 增删改功能

## 功能概述

ProTable 增删改功能提供了完整的数据CRUD操作能力，支持弹窗编辑、表格内编辑、批量操作等多种编辑方式。

## 主要特性

- ✏️ **多种编辑模式**：支持弹窗编辑、表格内编辑、批量编辑
- 🔄 **完整CRUD**：新增、编辑、删除、查看数据的完整操作
- 🎬 **丰富动作**：内置常用动作按钮，支持自定义动作
- 📝 **表单验证**：集成表单验证，确保数据质量
- 🔒 **权限控制**：支持按条件显示/隐藏操作按钮
- ⚡ **自动刷新**：操作成功后可自动刷新表格数据

## 新增功能 API

| 属性            | 说明               | 类型                                         | 默认值 |
| --------------- | ------------------ | -------------------------------------------- | ------ |
| addFields       | 新增表单配置       | AddField[]                                   | -      |
| onAdd           | 新增回调函数       | (params: any) => Promise\<ProTableResponse\> | -      |
| refreshAfterAdd | 新增成功后刷新表格 | boolean                                      | true   |

## 编辑功能 API

| 属性             | 说明               | 类型                                                  | 默认值 |
| ---------------- | ------------------ | ----------------------------------------------------- | ------ |
| editFields       | 编辑表单配置       | EditField[]                                           | -      |
| onEdit           | 编辑回调函数       | (params: any, item: T) => Promise\<ProTableResponse\> | -      |
| refreshAfterEdit | 编辑成功后刷新表格 | boolean                                               | false  |

## 删除功能 API

| 属性     | 说明         | 类型                                              | 默认值 |
| -------- | ------------ | ------------------------------------------------- | ------ |
| onDelete | 删除回调函数 | (target: T \| T[]) => Promise\<ProTableResponse\> | -      |

## 详情查看 API

| 属性       | 说明             | 类型                                     | 默认值 |
| ---------- | ---------------- | ---------------------------------------- | ------ |
| viewFields | 详情查看配置     | ViewField[]                              | -      |
| onView     | 详情查看回调函数 | (item: T) => Promise\<ProTableResponse\> | -      |

## Column 中的编辑配置

| 属性      | 说明                   | 类型                       | 默认值 |
| --------- | ---------------------- | -------------------------- | ------ |
| editField | 此字段在编辑区域的配置 | boolean \| EditFieldConfig | -      |
| viewField | 此字段在详情区域的配置 | boolean \| ViewFieldConfig | -      |

## 动作配置 API

| 属性             | 说明                 | 类型           | 默认值 |
| ---------------- | -------------------- | -------------- | ------ |
| actions          | 表格按钮动作         | Action[]       | -      |
| columnActions    | 表格项动作           | ColumnAction[] | -      |
| batchActions     | 多选动作             | BatchAction[]  | -      |
| iconActions      | 表格图标按钮动作     | IconAction[]   | -      |
| fixColumnActions | 是否固定动作栏到右侧 | boolean        | -      |
| selectable       | 可选择表格           | boolean        | false  |

## 内置动作

### 表格动作 (actions)

- `add` - 新增数据

### 表格项动作 (columnActions)

- `view` - 查看详情
- `edit` - 编辑（弹窗）
- `edit-icon` - 编辑图标
- `table-edit` - 表格内编辑
- `delete` - 删除

### 批量动作 (batchActions)

- `delete` - 批量删除

### 图标动作 (iconActions)

- `refresh` - 刷新表格
- `table-size` - 表格密度切换
- `fullscreen` - 全屏显示

## ButtonAction 动作配置

| 属性    | 说明         | 类型                                | 默认值 |
| ------- | ------------ | ----------------------------------- | ------ |
| builtIn | 内置动作标识 | string                              | -      |
| hidden  | 是否隐藏     | boolean                             | false  |
| content | 按钮内容     | ReactNode                           | -      |
| confirm | 二次确认配置 | string \| PopconfirmProps           | -      |
| tooltip | 提示信息     | string \| ReactNode \| TooltipProps | -      |

## 响应数据格式

CRUD操作期望的响应格式：

```typescript
interface ProTableResponse<T = any> {
  success: boolean
  data?: T
  message?: any
}
```

## 使用场景

- 用户管理系统
- 商品管理系统
- 订单管理系统
- 内容管理系统
- 配置管理界面
