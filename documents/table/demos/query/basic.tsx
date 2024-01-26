import React from 'react'
import { ProTable, dayjsTZ } from '@fexd/pro-components'
import { Random } from 'mockjs'
import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'

// // dayjsTZ.setDefault('Etc/GMT-7') // 调整为东七区

// window.dayjsTZ = dayjsTZ

const mockOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 },
]

const mockData = getMockData()

export default () => (
  <ProTable
    title="表格"
    iconActions={['refresh']}
    queryFields={[
      { label: '文本', name: 'text', type: 'text' },
      // { label: '文本2', name: 'text2', hook: () => false },
      {
        label: '单选框',
        name: 'select',
        type: 'select',
        options: mockOptions,
      },
    ]}
    onQuery={async (params: any) => {
      await delay(random(300, 1000)) // 模拟查询接口延时

      const { page, pageSize } = params
      const queryData = mockData.filter(
        (item) =>
          (!params?.text || item?.value1?.includes(params?.text ?? '')) && // 模拟文本筛选
          (!params?.select || params?.select === item?.value2), // 模拟单选筛选
      )

      const data = queryData.slice((page - 1) * pageSize, page * pageSize)

      return {
        success: true,
        data: data.map((item) => ({
          ...item,
          date: dayjsTZ('20230503').valueOf(),
        })),
        total: queryData?.length,
      }
    }}
    columns={[
      {
        title: '项目 1',
        dataIndex: 'value1',
        width: 120,
      },
      {
        title: '项目 2',
        dataIndex: 'value2',
        width: 120,
        valueType: 'select',
        valueEnum: mockOptions,
      },
      // {
      //   title: '日期',
      //   dataIndex: 'date',
      //   width: 120,
      //   valueType: 'dateTime',
      // },
      // {
      //   title: '日期',
      //   dataIndex: 'date',
      //   width: 120,
      //   valueType: 'date',
      // },
      // {
      //   title: '日期时间戳',
      //   dataIndex: 'date',
      //   width: 120,
      // },
    ]}
  />
)

function getMockData() {
  return Array(200)
    .fill('')
    .map((_, idx) => ({
      id: `key_${idx + 1}`,
      ...Object.assign(
        {},
        ...Array(2)
          .fill('')
          .map((_, idx) => ({
            [`value${idx + 1}`]: run(() => {
              const valueType = getMockDataType(idx + 1)

              const dataMap = {
                select: sample<any>(mockOptions)?.value,
                text: Random.name(),
              }

              // // 随机数据破缺
              // if (random(0, 10) > 8) {
              //   return undefined
              // }

              if (valueType in dataMap) {
                return dataMap[valueType]
              }

              return Random.name()
            }),
          })),
      ),
    }))
}

function getMockDataType(idx: number) {
  if (idx % 2 === 0) {
    return 'select'
  }

  return 'text'
}
