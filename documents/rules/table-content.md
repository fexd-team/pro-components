---
group: 表格
order: 3
---

# 表格内容

## 对齐

- 常规类型默认居左对齐
- 单枚举类型默认居中对齐
- 数值类型应居右对齐
- 金额类数据有条件，可带上货币单位
- 金额类数据必须做金额展示，右对齐

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space } from 'antd'
import { t, ProTable, ConfigProvider } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'

export default () => (
  <ConfigProvider
  // numberLocale={{ minimumFractionDigits: 2 }}
  >
    <RuleDemos
      demos={[
        {
          name: '表格内的数字、金额',
          refresh: true,
          bad: (data) => ({
            title: '数值居中或居左，且未做格式化',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '数值',
                    dataIndex: 'number',
                  },
                  {
                    title: '百分比',
                    dataIndex: 'percent',
                  },
                  {
                    title: '金额',
                    dataIndex: 'price',
                    align: 'center',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '数值右对齐，且做格式化',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '数值',
                    dataIndex: 'number',
                    valueType: 'number',
                  },
                  {
                    title: '百分比',
                    dataIndex: 'percent',
                    valueType: 'percent',
                  },
                  {
                    title: '金额',
                    dataIndex: 'price',
                    valueType: 'money',
                    unit: '￥',
                  },
                ]}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

## 尺寸

- 过长的数据（大于 `300px`）建议限定宽度，并做 “...” 溢出省略，省略后通过气泡提示查看全文
- 列宽度应按照数据长度实际情况合理分配，尽可能确保宽度均衡，确保横向扫视易读性
- 表格产生横向滚动时，横向滚动条应吸附在底部，随时可见

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message } from 'antd'
import { t, ProTable, ConfigProvider, ProField } from '@fexd/pro-components'
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
          name: '尺寸演示',
          // vertical: true,
          refresh: true,
          bad: (data) => ({
            title: '未规范尺寸',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '长句子',
                    dataIndex: 'paragraph',
                    // ellipsis: true,
                    // width: 300,
                  },
                  {
                    title: '短句子',
                    dataIndex: 'title',
                    // ellipsis: true,
                    // width: 300,
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '合理分配尺寸',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '长句子',
                    dataIndex: 'paragraph',
                    ellipsis: true,
                    width: 300,
                  },
                  {
                    title: '短句子',
                    dataIndex: 'title',
                    ellipsis: true,
                    width: 300,
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
        },
        {
          name: '横向滚动条的可见性',
          vertical: true,
          refresh: false,
          mockDataLength: 10,
          bad: (data) => ({
            title: '横向滚动条不可见，需要滚动到底部',
            content: (
              <MockTable
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '长句子',
                    dataIndex: 'paragraph',
                    // ellipsis: true,
                    // width: 300,
                  },
                  {
                    title: '短句子',
                    dataIndex: 'title',
                    // ellipsis: true,
                    // width: 300,
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '横向滚动条可见',
            content: (
              <MockTable
                sticky
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '长句子',
                    dataIndex: 'paragraph',
                  },
                  {
                    title: '短句子',
                    dataIndex: 'title',
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

## 排序

- 按数据项重要性、优先级从左往右排序（F 型扫视原则）
- 可标识唯一性的重要数据建议吸附在左侧

## 分页

- 每页条数应提供 5、10、20、50 几个选项
- 默认每页 10 条数据，默认每页条数最大不超过 50 条
- 如后端提供了 total 总页数，使用常规分页功能，应包含 “数据总数”、“页数控制器”、“每页条数”、“指定跳页”
- 后端未提供 total 时，仅保留 “上一页” 与 “下一页” 按钮
- 表格作为页面主体时，上下滚动过程中，分页器应吸附在底部

```jsx
/**
 * inline: true
 */
import React from 'react'
import { Space, message } from 'antd'
import { t, ProTable, ConfigProvider, ProField } from '@fexd/pro-components'
import { BadOrGood, MockTable, RuleDemos } from '@docs/components'
import { delay } from '@fexd/tools'
import { SettingOutlined, UploadOutlined, CloudDownloadOutlined } from '@ant-design/icons'

export default () => (
  <ConfigProvider
    // numberLocale={{ minimumFractionDigits: 2 }}
    localeKey="zh_CN"
  >
    <RuleDemos
      mockDataLength={160}
      demos={[
        {
          name: '提供了总数量的分页控制',
          // vertical: true,
          refresh: true,
          bad: (data) => ({
            title: '仅提供了页数控制，不好操作',
            content: (
              <MockTable
                pagination={{
                  showQuickJumper: false,
                  showSizeChanger: false,
                  showTotal: false,
                }}
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '提供了充足的页数控制功能',
            content: (
              <MockTable
                pagination={{}}
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
        },

        {
          name: '未提供总数量',
          // vertical: true,
          refresh: true,
          content: (mockData) => (
            <MockTable
              defaultPageSize={5}
              pagination={{}}
              unknownDataLength
              mock={false}
              // dataSource={mockData?.list}
              onQuery={(params) => {
                const { page, pageSize } = params
                const data = mockData?.list.slice((page - 1) * pageSize, page * pageSize)

                return {
                  success: true,
                  data,
                }
              }}
              columns={[
                {
                  title: '名称',
                  dataIndex: 'name',
                },
                {
                  title: '金额',
                  dataIndex: 'money',
                  valueType: 'money',
                },
                {
                  title: '日期',
                  dataIndex: 'dayjs1_timestamp',
                  valueType: 'date',
                },
              ]}
            />
          ),
        },
        {
          name: '每页条数',
          // vertical: true,
          refresh: true,
          bad: (data) => ({
            title: '每页条数过大',
            content: (
              <MockTable
                defaultPageSize={50}
                pagination={{}}
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '每页条数适当',
            content: (
              <MockTable
                defaultPageSize={10}
                pagination={{}}
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
        },
        {
          name: '分页器吸附',
          vertical: true,
          refresh: true,
          bad: (data) => ({
            title: '分页器未吸附在底部，想进行分页操作需要滚动到最底部',
            content: (
              <MockTable
                defaultPageSize={20}
                pagination={{}}
                dataSource={data?.list}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
          good: (data) => ({
            title: '分页器吸附在底部，可随时进行分页操作',
            content: (
              <MockTable
                defaultPageSize={20}
                pagination={{}}
                dataSource={data?.list}
                sticky
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '金额',
                    dataIndex: 'money',
                    valueType: 'money',
                  },
                  {
                    title: '日期',
                    dataIndex: 'dayjs1_timestamp',
                    valueType: 'date',
                  },
                ]}
              />
            ),
          }),
        },
      ]}
    />
  </ConfigProvider>
)
```

## 其他

- 枚举类型应使用 tag 或 badge 承载，如有条件，尽可能根据业务区分 tag / badge 颜色
