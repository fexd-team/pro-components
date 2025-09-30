# showImages 使用示例

## 基础用法

### 单张图片预览

```jsx
import React from 'react'
import { Action, showImages } from '@fexd/pro-utils'

export default () => {
  return (
    <Action
      type="primary"
      onClick={() => {
        showImages(['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'])
      }}
    >
      预览单张图片
    </Action>
  )
}
```

### 多张图片轮播

```jsx
import React from 'react'
import { Action, showImages } from '@fexd/pro-utils'
import { Space } from 'antd'

const images = [
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
  'https://gw.alipayobjects.com/zos/rmsportal/YiDVLikpJqHTwWn.png',
]

export default () => {
  return (
    <Space>
      <Action onClick={() => showImages(images)}>从第1张开始</Action>

      <Action onClick={() => showImages(images, { current: 1 })}>从第2张开始</Action>

      <Action onClick={() => showImages(images, { current: 2 })}>从第3张开始</Action>
    </Space>
  )
}
```

## 电商场景

### 商品图片展示

```jsx
import React from 'react'
import { showImages } from '@fexd/pro-utils'
import { Card, Row, Col } from 'antd'
import { Random } from 'mockjs'

const products = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: Random.title(2, 4),
  price: Random.float(99, 999, 2, 2),
  images: [
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
  ],
}))

export default () => {
  const handleImagePreview = (product, startIndex = 0) => {
    showImages(product.images, {
      current: startIndex,
      onCurrentChange: (current) => {
        console.log(`正在查看 ${product.name} 的第 ${current + 1} 张图片`)
      },
    })
  }

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8}>
          <Card
            cover={
              <div style={{ position: 'relative' }}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImagePreview(product, 0)}
                />
                {product.images.length > 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    {product.images.length} 张图片
                  </div>
                )}
              </div>
            }
            actions={[
              <span
                key="preview"
                style={{ cursor: 'pointer', color: '#1890ff' }}
                onClick={() => handleImagePreview(product)}
              >
                查看图片
              </span>,
            ]}
          >
            <Card.Meta title={product.name} description={`¥${product.price}`} />
          </Card>
        </Col>
      ))}
    </Row>
  )
}
```

### 表格中的图片预览

```jsx
import React from 'react'
import { ProTable } from '@fexd/pro-components'
import { showImages } from '@fexd/pro-utils'
import { Random } from 'mockjs'
import { delay, sample } from '@fexd/tools'

const productImages = [
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
  'https://gw.alipayobjects.com/zos/rmsportal/YiDVLikpJqHTwWn.png',
]

const mockData = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: Random.title(2, 4),
  price: Random.float(99, 999, 2, 2),
  images: Array.from({ length: Random.integer(1, 4) }, () => sample(productImages)),
  stock: Random.integer(0, 100),
}))

export default () => {
  return (
    <ProTable
      dataSource={mockData}
      columns={[
        {
          title: '商品图片',
          dataIndex: 'images',
          width: 120,
          render: (images, record) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {images.slice(0, 2).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  width={32}
                  height={32}
                  style={{
                    marginRight: 4,
                    cursor: 'pointer',
                    borderRadius: 4,
                    objectFit: 'cover',
                  }}
                  onClick={() => showImages(images, { current: index })}
                />
              ))}
              {images.length > 2 && (
                <span
                  style={{
                    cursor: 'pointer',
                    color: '#1890ff',
                    fontSize: 12,
                  }}
                  onClick={() => showImages(images)}
                >
                  +{images.length - 2}
                </span>
              )}
            </div>
          ),
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          width: 200,
        },
        {
          title: '价格',
          dataIndex: 'price',
          width: 100,
          valueType: 'money',
        },
        {
          title: '库存',
          dataIndex: 'stock',
          width: 80,
        },
      ]}
      pagination={{ pageSize: 5 }}
      onQuery={async () => {
        await delay(300)
        return { data: mockData, total: mockData.length }
      }}
    />
  )
}
```

## 高级功能

### Promise 模式的使用

```jsx
import React, { useState } from 'react'
import { Action, showImages } from '@fexd/pro-utils'
import { message } from 'antd'

const images = [
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
]

export default () => {
  const [viewCount, setViewCount] = useState(0)

  const handlePreview = async () => {
    const controller = showImages(images, {
      current: 0,
      onCurrentChange: (current) => {
        console.log(`切换到第 ${current + 1} 张图片`)
      },
      onVisibleChange: (visible) => {
        if (visible) {
          console.log('图片预览已打开')
        }
      },
    })

    try {
      // 等待用户关闭预览
      await controller.promise

      // 预览关闭后的操作
      setViewCount((prev) => prev + 1)
      message.success('图片预览已关闭')

      // 可以执行数据统计、埋点等操作
      console.log('记录图片浏览事件')
    } catch (error) {
      console.log('预览被取消或发生错误')
    }
  }

  return (
    <div>
      <Action type="primary" onClick={handlePreview}>
        预览图片 (已查看 {viewCount} 次)
      </Action>
    </div>
  )
}
```

### 动态更新图片内容

```jsx
import React, { useState } from 'react'
import { Action, showImages } from '@fexd/pro-utils'
import { Space, message } from 'antd'

const initialImages = [
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
]

const additionalImages = [
  'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
  'https://gw.alipayobjects.com/zos/rmsportal/YiDVLikpJqHTwWn.png',
]

export default () => {
  const [controller, setController] = useState(null)

  const handlePreview = () => {
    const imageController = showImages(initialImages, {
      current: 0,
      onCurrentChange: (current) => {
        console.log(`当前第 ${current + 1} 张图片`)
      },
    })

    setController(imageController)
  }

  const handleAddImages = () => {
    if (controller) {
      const allImages = [...initialImages, ...additionalImages]
      controller.update(allImages, {
        current: initialImages.length, // 跳转到新添加的第一张图片
      })
      message.success('已加载更多图片')
    } else {
      message.warning('请先打开图片预览')
    }
  }

  const handleClose = () => {
    if (controller) {
      controller.close()
      setController(null)
    }
  }

  return (
    <Space>
      <Action type="primary" onClick={handlePreview}>
        预览初始图片
      </Action>

      <Action onClick={handleAddImages} disabled={!controller}>
        加载更多图片
      </Action>

      <Action onClick={handleClose} disabled={!controller}>
        关闭预览
      </Action>
    </Space>
  )
}
```

## 实际应用场景

### 文件管理器

```jsx
import React, { useState } from 'react'
import { showImages } from '@fexd/pro-utils'
import { Card, Row, Col, Input, Select } from 'antd'
import { Random } from 'mockjs'

const fileTypes = ['jpg', 'png', 'gif', 'webp']
const mockFiles = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `${Random.word()}.${Random.pick(fileTypes)}`,
  url: Random.pick([
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
    'https://gw.alipayobjects.com/zos/rmsportal/YiDVLikpJqHTwWn.png',
  ]),
  size: Random.integer(100, 5000) + 'KB',
  type: Random.pick(fileTypes),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
}))

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedFile, setSelectedFile] = useState(null)

  const filteredFiles = mockFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || file.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleImagePreview = (file) => {
    const currentIndex = filteredFiles.findIndex((f) => f.id === file.id)
    const imageUrls = filteredFiles.map((f) => f.url)

    showImages(imageUrls, {
      current: currentIndex,
      onCurrentChange: (current) => {
        setSelectedFile(filteredFiles[current])
        console.log(`正在查看: ${filteredFiles[current].name}`)
      },
      onVisibleChange: (visible) => {
        if (!visible) {
          setSelectedFile(null)
        }
      },
    })
  }

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <Input
          placeholder="搜索文件名"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <Select value={typeFilter} onChange={setTypeFilter} style={{ width: 120 }}>
          <Select.Option value="all">所有类型</Select.Option>
          {fileTypes.map((type) => (
            <Select.Option key={type} value={type}>
              {type.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </div>

      {selectedFile && (
        <div style={{ marginBottom: 16, padding: 12, background: '#f0f0f0', borderRadius: 6 }}>
          <strong>当前选中:</strong> {selectedFile.name} ({selectedFile.size})
        </div>
      )}

      <Row gutter={[16, 16]}>
        {filteredFiles.map((file) => (
          <Col key={file.id} xs={12} sm={8} md={6}>
            <Card
              hoverable
              cover={
                <div
                  style={{
                    height: 120,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImagePreview(file)}
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              }
              size="small"
            >
              <Card.Meta
                title={
                  <div
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {file.name}
                  </div>
                }
                description={
                  <div>
                    <div>{file.size}</div>
                    <div style={{ fontSize: 12, color: '#999' }}>{file.createTime}</div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {filteredFiles.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>没有找到匹配的图片文件</div>
      )}
    </div>
  )
}
```

### 社交媒体帖子图片

```jsx
import React from 'react'
import { showImages } from '@fexd/pro-utils'
import { Card, Avatar } from 'antd'
import { Random } from 'mockjs'

const posts = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  author: {
    name: Random.name(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
  },
  content: Random.sentence(10, 20),
  images: Array.from({ length: Random.integer(1, 6) }, (_, imgIndex) =>
    Random.pick([
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      'https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbOAJVw.png',
      'https://gw.alipayobjects.com/zos/rmsportal/YiDVLikpJqHTwWn.png',
    ]),
  ),
  likes: Random.integer(0, 999),
  createTime: Random.datetime('MM-dd HH:mm'),
}))

export default () => {
  const handleImageClick = (post, index) => {
    showImages(post.images, {
      current: index,
      onVisibleChange: (visible) => {
        if (!visible) {
          // 图片预览关闭时，可以记录浏览统计
          console.log(`用户查看了 ${post.author.name} 的图片`)
        }
      },
    })
  }

  const renderImageLayout = (images, post) => {
    const imageCount = images.length

    if (imageCount === 1) {
      // 单张图片
      return (
        <div style={{ marginTop: 12 }}>
          <img
            src={images[0]}
            style={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 8,
              cursor: 'pointer',
            }}
            onClick={() => handleImageClick(post, 0)}
          />
        </div>
      )
    }

    if (imageCount <= 4) {
      // 2-4张图片，网格布局
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: imageCount === 2 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
            gap: 4,
            marginTop: 12,
          }}
        >
          {images.map((img, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={img}
                style={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                onClick={() => handleImageClick(post, index)}
              />
            </div>
          ))}
        </div>
      )
    }

    // 5张及以上，特殊布局
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          marginTop: 12,
        }}
      >
        {images.slice(0, 4).map((img, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img
              src={img}
              style={{
                width: '100%',
                height: 80,
                objectFit: 'cover',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(post, index)}
            />
            {index === 3 && imageCount > 4 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                onClick={() => handleImageClick(post, 0)}
              >
                +{imageCount - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {posts.map((post) => (
        <Card key={post.id} style={{ marginBottom: 16 }}>
          <Card.Meta
            avatar={<Avatar src={post.author.avatar} />}
            title={post.author.name}
            description={post.createTime}
          />

          <div style={{ marginTop: 12 }}>{post.content}</div>

          {post.images.length > 0 && renderImageLayout(post.images, post)}

          <div
            style={{
              marginTop: 12,
              padding: '8px 0',
              borderTop: '1px solid #f0f0f0',
              color: '#999',
              fontSize: 14,
            }}
          >
            {post.likes} 人点赞 · {post.images.length} 张图片
          </div>
        </Card>
      ))}
    </div>
  )
}
```
