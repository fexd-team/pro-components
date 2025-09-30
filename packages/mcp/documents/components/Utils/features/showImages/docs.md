# showImages - 命令式图片预览工具

## 功能介绍

showImages 是一个命令式的图片预览工具，支持单图和多图轮播预览，提供丰富的交互功能和自定义选项。

## 核心特性

- 🖼️ **多图支持**：支持单张或多张图片的预览和轮播
- 🎮 **丰富交互**：支持缩放、旋转、切换等操作
- 📱 **响应式设计**：在不同设备上都有良好的显示效果
- ⌨️ **键盘支持**：支持方向键切换、ESC 关闭等快捷键
- 🎨 **自定义配置**：支持初始显示图片、可见性控制等
- 💫 **Promise 支持**：基于 Promise 的异步操作

## API

### showImages

```typescript
const showImages = (
  images: string[],
  options?: ShowImagesOptions
) => {
  return {
    promise: Promise<void>,
    close: () => void,
    update: (newImages: string[], newOptions?: ShowImagesOptions) => void
  }
}
```

### 参数说明

| 参数    | 说明         | 类型              | 默认值 |
| ------- | ------------ | ----------------- | ------ |
| images  | 图片地址数组 | string[]          | -      |
| options | 预览配置选项 | ShowImagesOptions | -      |

### ShowImagesOptions

```typescript
interface ShowImagesOptions {
  current?: number // 初始显示的图片索引
  visible?: boolean // 是否显示预览
  zIndex?: number // 层级
  maskClosable?: boolean // 点击遮罩是否关闭
  keyboard?: boolean // 是否支持键盘操作
  onVisibleChange?: (visible: boolean) => void // 可见性变化回调
  onCurrentChange?: (current: number) => void // 当前图片变化回调
  toolbarRender?: (actions: ToolbarAction[]) => React.ReactNode // 自定义工具栏
}
```

### 返回值

| 属性    | 说明                             | 类型                                                    |
| ------- | -------------------------------- | ------------------------------------------------------- |
| promise | Promise 对象，预览关闭时 resolve | Promise<void>                                           |
| close   | 手动关闭预览的方法               | () => void                                              |
| update  | 更新图片和配置的方法             | (images: string[], options?: ShowImagesOptions) => void |

## 使用场景

### 1. 单张图片预览

最简单的图片预览场景：

```jsx
import { showImages } from '@fexd/pro-utils'

// 点击图片时预览
const handleImageClick = (imageUrl) => {
  showImages([imageUrl])
}
```

### 2. 图片画廊

多张图片的轮播预览：

```jsx
const images = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg']

// 从第2张图片开始预览
showImages(images, { current: 1 })
```

### 3. 商品图片展示

电商场景中的商品图片预览：

```jsx
const ProductGallery = ({ product }) => {
  const handlePreview = (startIndex = 0) => {
    showImages(product.images, {
      current: startIndex,
      onCurrentChange: (current) => {
        console.log('当前查看第', current + 1, '张图片')
      },
    })
  }

  return (
    <div className="product-gallery">
      {product.images.map((image, index) => (
        <img key={index} src={image} onClick={() => handlePreview(index)} style={{ cursor: 'pointer' }} />
      ))}
    </div>
  )
}
```

### 4. 表格中的图片预览

在数据表格中预览图片：

```jsx
const columns = [
  {
    title: '商品图片',
    dataIndex: 'images',
    render: (images, record) => (
      <div>
        {images.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img}
            width={40}
            height={40}
            style={{ marginRight: 4, cursor: 'pointer' }}
            onClick={() => showImages(images, { current: index })}
          />
        ))}
        {images.length > 3 && (
          <span style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => showImages(images)}>
            +{images.length - 3}
          </span>
        )}
      </div>
    ),
  },
]
```

## 高级功能

### Promise 模式使用

```jsx
const handleImagePreview = async () => {
  const controller = showImages(images, {
    current: 0,
    onCurrentChange: (current) => {
      console.log(`切换到第 ${current + 1} 张图片`)
    },
  })

  try {
    // 等待用户关闭预览
    await controller.promise
    console.log('图片预览已关闭')

    // 执行后续操作
    trackImageViewEvent()
  } catch (error) {
    console.log('预览被取消')
  }
}
```

### 动态更新图片

```jsx
const handleDynamicPreview = () => {
  const controller = showImages(initialImages)

  // 异步加载更多图片
  setTimeout(() => {
    const moreImages = [...initialImages, ...newImages]
    controller.update(moreImages, {
      current: initialImages.length, // 跳转到新加载的第一张图片
    })
  }, 2000)
}
```

### 自定义工具栏

```jsx
showImages(images, {
  toolbarRender: (actions) => (
    <div className="custom-toolbar">
      {actions.map((action) => (
        <button key={action.key} onClick={action.onClick}>
          {action.title}
        </button>
      ))}
      <button onClick={() => downloadImage()}>下载图片</button>
    </div>
  ),
})
```

## 实际应用示例

### 文件管理器

```jsx
const FileManager = ({ files }) => {
  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))

  const handleImagePreview = (file) => {
    const currentIndex = imageFiles.findIndex((f) => f.id === file.id)
    const imageUrls = imageFiles.map((f) => f.url)

    showImages(imageUrls, {
      current: currentIndex,
      onCurrentChange: (current) => {
        // 更新文件选中状态
        setSelectedFile(imageFiles[current])
      },
    })
  }

  return (
    <div className="file-grid">
      {imageFiles.map((file) => (
        <div key={file.id} className="file-item" onClick={() => handleImagePreview(file)}>
          <img src={file.thumbnail} alt={file.name} />
          <span>{file.name}</span>
        </div>
      ))}
    </div>
  )
}
```

### 社交媒体帖子

```jsx
const PostImages = ({ post }) => {
  const handleImageClick = (index) => {
    showImages(post.images, {
      current: index,
      onVisibleChange: (visible) => {
        if (!visible) {
          // 图片预览关闭时，记录浏览统计
          trackPostImageView(post.id, index)
        }
      },
    })
  }

  return (
    <div className="post-images">
      {post.images.length === 1 && (
        <img src={post.images[0]} onClick={() => handleImageClick(0)} className="single-image" />
      )}

      {post.images.length > 1 && (
        <div className="image-grid">
          {post.images.slice(0, 4).map((img, index) => (
            <div key={index} className="grid-item">
              <img src={img} onClick={() => handleImageClick(index)} />
              {index === 3 && post.images.length > 4 && <div className="more-overlay">+{post.images.length - 4}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## 最佳实践

### 1. 图片懒加载

```jsx
// ✅ 支持懒加载的图片预览
const LazyImagePreview = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState([])

  const handlePreview = async (startIndex) => {
    // 预加载当前及相邻图片
    const preloadIndexes = [Math.max(0, startIndex - 1), startIndex, Math.min(images.length - 1, startIndex + 1)]

    const preloadImages = await Promise.all(preloadIndexes.map((index) => preloadImage(images[index])))

    showImages(images, {
      current: startIndex,
      onCurrentChange: (current) => {
        // 预加载下一张图片
        if (current + 1 < images.length) {
          preloadImage(images[current + 1])
        }
      },
    })
  }
}
```

### 2. 错误处理

```jsx
// ✅ 包含错误处理的图片预览
const SafeImagePreview = ({ images }) => {
  const handlePreview = () => {
    const validImages = images.filter((img) => img && typeof img === 'string')

    if (validImages.length === 0) {
      message.warning('没有可预览的图片')
      return
    }

    showImages(validImages, {
      onCurrentChange: (current) => {
        // 检查图片是否加载失败
        const img = new Image()
        img.onerror = () => {
          message.error(`图片 ${current + 1} 加载失败`)
        }
        img.src = validImages[current]
      },
    })
  }
}
```

### 3. 性能优化

```jsx
// ✅ 优化的图片预览
const OptimizedImagePreview = ({ images }) => {
  // 使用缩略图进行快速预览
  const thumbnails = images.map((img) => `${img}?thumbnail=200x200`)
  const fullImages = images

  const handlePreview = (index) => {
    // 先显示缩略图
    const controller = showImages(thumbnails, { current: index })

    // 异步加载高清图片
    loadHighResImage(fullImages[index]).then((highResUrl) => {
      const newImages = [...thumbnails]
      newImages[index] = highResUrl
      controller.update(newImages, { current: index })
    })
  }
}
```

## 注意事项

1. **内存管理**：大量图片预览时注意内存使用，及时清理不需要的图片资源
2. **加载性能**：对于大图片，建议使用渐进式加载或压缩图片
3. **移动端适配**：在移动设备上注意触摸手势的支持
4. **无障碍访问**：为视觉障碍用户添加适当的 alt 文本和 ARIA 标签
5. **网络优化**：在弱网环境下提供降级方案，如显示加载失败的占位图
