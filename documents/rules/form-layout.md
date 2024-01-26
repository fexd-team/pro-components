---
group:
  title: 表单
  order: 2

order: 1
---

# 布局

## 按钮位置

可优先参考[全局规范 / 按钮 / 默认规则](/rules/global-button#默认规则图示)，其他细节待补充

<ZoomImage src="https://image.woshipm.com/wp-files/2021/06/6q9DpFWl1HsKYiDqS113.png"></ZoomImage>

## 表单对齐

- 无特殊情况，默认使用纵向布局（顶对齐）

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Space } from 'antd'
import { ConfigProvider, ProForm, Action, Tooltip } from '@fexd/pro-components'

export default () => (
  <ConfigProvider localeKey="zh-CN">
    <div className="flex gap-6 p-6 bg-gray-100">
      <div className="p-6 flex-1 bg-white">
        <h2 className="mb-6">
          顶对齐{' '}
          <Tooltip
            title={
              <ul className="m-0 p-2 pl-7">
                <li>适配国际化长文案</li>
                <li>观感整齐、舒适</li>
              </ul>
            }
            config={{
              color: '#87d068',
            }}
            className="text-base"
          >
            ✔️
          </Tooltip>
        </h2>
        <ProForm
          gridColumns={1}
          fields={[
            { label: '长标签', name: 'test1' },
            { label: '标签', name: 'test2' },
          ]}
        />
      </div>
      <div className="p-6 flex-1 bg-white">
        <h2 className="mb-6">右对齐</h2>
        <ProForm
          gridColumns={1}
          fields={[
            { label: '长标签', name: 'test1' },
            { label: '标签', name: 'test2' },
            { label: '标签', name: 'test3' },
          ]}
          layout="horizontal"
          colon={false}
          labelCol={{ span: 5 }}
          labelAlign="right"
        />
      </div>
      <div className="p-6 flex-1 bg-white">
        <h2 className="mb-6">左对齐</h2>
        <ProForm
          gridColumns={1}
          fields={[
            { label: '长标签', name: 'test1' },
            { label: '标签', name: 'test2' },
            { label: '标签', name: 'test3' },
          ]}
          layout="horizontal"
          colon={false}
          labelCol={{ span: 5 }}
          labelAlign="left"
        />
      </div>
    </div>
  </ConfigProvider>
)
```

|              | 顶对齐  | 右对齐   | 左对齐   |
| ------------ | ------- | -------- | -------- |
| 浏览速度     | 快 ✔️   | 适中     | 慢 ❌    |
| 水平空间占用 | 少 ✔️   | 适中     | 多 ❌    |
| 垂直空间占用 | 多 ❌   | 适中     | 少 ✔️    |
| 标签可用空间 | 多 ✔️   | 适中     | 少 ❌    |
| 输入框接近度 | 最近 ✔️ | 适中     | 最远 ❌  |
| 用户眼动路径 | 向下    | 向下向右 | 向下向右 |
| 眼动时间     | 50ms✔️  | 240ms    | 500ms❌  |

### 顶对齐

- 适用场景：不同长短标签且字数很长的标签，有**国际化**需求。
- ✔️ 优点：浏览和处理效率较高，标签长度弹性大，多栏下不影响信息的清晰度。
- ❌ 缺点：占纵向空间。

### 左对齐

- 适用场景：50%左右标签字数 8 字以下；适用于平台中即有复杂数据场景也有小容器的简单数据场景的统一体验。
- ✔️ 优点：文字按阅读视线对齐，符合阅读习惯，节约纵向空间。
- ❌ 缺点：填写速度慢，标签长度和输入框长短弹性相对较小。

> “这里要注意的是，B 端业务设计中，【缓慢完成率】并不总是一件坏事如果表单数据复杂且安全性高，可以故意减缓用户的填写速度，来确保填写的准确性。”

### 右对齐

- 适用场景：仅适用于**标签简短**且内容较少的情况，如数据过滤区。
- ✔️ 优点：标签和输入框之间距离固定，有明确的关联，节约纵向空间。
- ❌ 缺点：左边缘参差不齐，整体可读性低，标签长度和输入框弹性小。

## 表单布局

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message } from 'antd'
import { t, ProTable, ProForm, ConfigProvider, ProField, Action } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { SettingOutlined, UploadOutlined, CloudDownloadOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
    size="small"
  >
    <RuleDemos
      demos={[
        {
          name: '简单表单使用单列布局',
          content: (
            <div className="p-6 bg-gray-100">
              {' '}
              <div style={{ width: 600 }} className="p-6 bg-white mx-auto">
                <ProForm
                  fields={[{ label: 'Label', name: 'test' }]}
                  gridColumns={1}
                  render={['test', 'test', 'test']}
                />
                <Space>
                  <Action type="primary">提交</Action>
                  <Action>重置</Action>
                </Space>
              </div>
            </div>
          ),
        },
        {
          name: '较复杂表单使用多列布局',
          content: (
            <div className="p-6 bg-gray-100">
              <div style={{ width: 600 }} className="p-6 bg-white mx-auto">
                <ProForm
                  fields={[{ label: 'Label', name: 'test' }]}
                  render={[
                    ['test', 'test'],
                    ['test'],
                    [
                      { name: 'test', colSpan: 6 },
                      { name: 'test', colSpan: 6 },
                      { name: 'test', colSpan: 12 },
                    ],
                    [{ name: 'test', colSpan: 12 }],
                    [
                      <Space>
                        <Action type="primary">提交</Action>
                        <Action>重置</Action>
                      </Space>,
                    ],
                  ]}
                />
              </div>
            </div>
          ),
        },
        {
          name: '复杂表单使用标题分组布局',
          content: (
            <div className="p-6 bg-gray-100">
              <div style={{ width: 600 }} className="p-6 bg-white mx-auto">
                <ProForm
                  fields={[{ label: 'Label', name: 'test' }]}
                  render={[
                    [<h2 className="mb-6">Group 1</h2>],
                    ['test', 'test'],
                    ['test'],
                    [<h2 className="mb-6">Group 2</h2>],
                    [{ name: 'test', colSpan: 12 }],
                    [
                      { name: 'test', colSpan: 6 },
                      { name: 'test', colSpan: 6 },
                      { name: 'test', colSpan: 12 },
                    ],
                    [
                      <Space>
                        <Action type="primary">提交</Action>
                        <Action>重置</Action>
                      </Space>,
                    ],
                  ]}
                />
              </div>
            </div>
          ),
        },
        {
          name: '高复杂表单使用卡片分组布局',
          content: (
            <div className="p-6 bg-gray-100">
              <ProForm
                fields={[{ label: 'Label', name: 'test' }]}
                render={({ renderFields }) => (
                  <Space direction="vertical" size={16}>
                    <div style={{ width: 600 }} className="p-6 bg-white mx-auto">
                      {renderFields([
                        [<h2 className="mb-6">Group 1</h2>],
                        [{ name: 'test', colSpan: 8 }, { name: 'test', colSpan: 6 }, { colSpan: 10 }],
                        ['test', 'test', 'test'],
                      ])}
                    </div>
                    <div style={{ width: 600 }} className="p-6 bg-white mx-auto">
                      {renderFields([
                        [<h2 className="mb-6">Group 2</h2>],
                        [
                          { name: 'test', colSpan: 8 },
                          { name: 'test', colSpan: 8 },
                        ],
                        [{ name: 'test', colSpan: 16 }],
                      ])}
                    </div>
                    <div style={{ width: 600 }} className="p-6 bg-white mx-auto">
                      <Space>
                        <Action type="primary">提交</Action>
                        <Action>重置</Action>
                      </Space>
                    </div>
                  </Space>
                )}
              />
            </div>
          ),
        },
      ]}
    />
  </ConfigProvider>
)
```
