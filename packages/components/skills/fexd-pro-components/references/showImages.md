---
name: showImages
description: 命令式图片预览工具，支持单图和多图轮播，提供丰富交互功能
---

# showImages 图片预览

## 何时使用

- 单张或多张图片的预览和轮播
- 表格中的图片预览
- 商品图片画廊

## API

```typescript
const controller = showImages(images, options?)
```

### 参数

| 参数    | 说明         | 类型              | 默认值 |
| ------- | ------------ | ----------------- | ------ |
| images  | 图片地址数组 | string[]          | -      |
| options | 预览配置     | ShowImagesOptions | -      |

### ShowImagesOptions

| 属性            | 说明             | 类型                       | 默认值 |
| --------------- | ---------------- | -------------------------- | ------ |
| current         | 初始显示图片索引 | number                     | 0      |
| visible         | 是否显示         | boolean                    | -      |
| zIndex          | 层级             | number                     | -      |
| maskClosable    | 点击遮罩关闭     | boolean                    | -      |
| keyboard        | 键盘操作         | boolean                    | -      |
| onVisibleChange | 可见性变化回调   | (visible: boolean) => void | -      |
| onCurrentChange | 当前图片变化回调 | (current: number) => void  | -      |
| toolbarRender   | 自定义工具栏     | (actions) => ReactNode     | -      |

### 返回值

| 属性    | 说明               | 类型                       |
| ------- | ------------------ | -------------------------- |
| promise | 预览关闭时 resolve | Promise\<void\>            |
| close   | 手动关闭           | () => void                 |
| update  | 更新图片和配置     | (images, options?) => void |

## 代码示例

### 单张图片预览

```tsx
import { showImages } from '@fexd/pro-components'

const handleClick = (imageUrl) => {
  showImages([imageUrl])
}
```

### 多图画廊

```tsx
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg']
showImages(images, { current: 1 }) // 从第2张开始
```

### 表格中的图片预览

```tsx
{
  title: '商品图片',
  dataIndex: 'images',
  render: (images) => (
    <div>
      {images.slice(0, 3).map((img, i) => (
        <img key={i} src={img} width={40} height={40}
          style={{ marginRight: 4, cursor: 'pointer' }}
          onClick={() => showImages(images, { current: i })} />
      ))}
      {images.length > 3 && (
        <span onClick={() => showImages(images)} style={{ cursor: 'pointer', color: '#1890ff' }}>
          +{images.length - 3}
        </span>
      )}
    </div>
  ),
}
```

### Promise 模式

```tsx
const controller = showImages(images, { current: 0 })
await controller.promise
console.log('预览已关闭')
```

### 动态更新图片

```tsx
const controller = showImages(initialImages)
setTimeout(() => {
  controller.update([...initialImages, ...newImages], { current: initialImages.length })
}, 2000)
```

## 注意事项

1. 调用前检查数组是否有效：`images?.length > 0 && showImages(images)`
2. 大量图片注意内存管理，及时清理
3. 大图建议渐进式加载或压缩
4. 支持方向键切换、ESC 关闭
