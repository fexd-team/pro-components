/**
 * inline: false
 * defaultShowCode: false
 */
import React, { useState, useEffect } from 'react'
import { message, Drawer, Space, Form, Radio } from 'antd'
import { isObject, random, run, sample } from '@fexd/tools'
import * as globalTools from '@fexd/tools/es'
import dayjs from 'dayjs'
import { ProTable, showDrawer } from '@fexd/pro-components'
import { Action, Hook } from '@fexd/pro-utils'
import MonacoEditor from './components/MonacoEditor'
import { useDebounce, useLocalStorageState, useDebounceFn, useUpdateEffect, useRequest } from 'ahooks'

// @ts-ignore
window.dayjs = dayjs

export default () => {
  const defaultCode = useDefaultCode()
  const [editorVisible, setEditorVisible] = useState(false)
  const [code, setCode] = useLocalStorageState('preview-demo-code', {
    defaultValue: defaultCode,
  })
  const debouncedSetCode = useDebounceFn(setCode, { wait: 1000 })
  const debouncedCode = useDebounce(code, { wait: 120 })
  const [config, setConfig] = useState(() => {
    try {
      const props = new Function(code)()
      return props
    } catch (err) {
      console.warn('代码有问题', err)
      const props = new Function(defaultCode)()
      return props
    }
  })

  useUpdateEffect(() => {
    try {
      const props = new Function(debouncedCode)()

      if (!isObject(props)) {
        console.log(props)
        console.warn('返回内容并非对象，忽略')
        return
      }

      setConfig(props)
      message.info('配置已更新')
    } catch (err) {
      console.warn(err)
      console.warn('语法解析错误，忽略')
      message.warning('语法解析错误，请结合 F12 工具排查错误或重置代码')
    }
  }, [debouncedCode])

  return (
    <div>
      <ProTable
        localeKey="zh_CN"
        {...config}
        iconActions={[
          ...(config?.iconActions ?? []),
          {
            builtIn: 'settings',
            onClick: () => {
              showDrawer({
                content: (
                  <MonacoEditor
                    width="100%"
                    height="100%"
                    language="javascript"
                    // theme="monokai"
                    value={code}
                    onChange={debouncedSetCode.run}
                    options={{
                      tabSize: 2,
                    }}
                  />
                ),
                actions: null,
                title: (
                  <Space>
                    写完后 1s 生效，语法有错误的话不生效，写完后会做本地持久化
                    <Action
                      tooltip={{
                        title: '将编辑器的代码还原为默认状态',
                        placement: 'bottom',
                      }}
                      confirm={{
                        title: '确定要重置吗？你的自定义配置将全部丢失',
                        placement: 'bottom',
                      }}
                      onClick={() => {
                        setCode(defaultCode)
                        message.info('配置已重置')
                      }}
                    >
                      重置
                    </Action>
                  </Space>
                ),
                width: '80vw',
                contentWrapperStyle: { maxWidth: 1280 },
                bodyStyle: { padding: 0, overflow: 'hidden' },
              })
            },
            tooltip: {
              title: '点我！实时编辑表格的配置',
              placement: 'topRight',
              color: 'volcano',
            },
          },
        ]}
      />
    </div>
  )
}

const mockData = getMockData()

Object.assign(window, {
  message,
  dayjs,
  globalTools,
  mockData,
  getMockDataType,
})

const defaultCode = `const { mockData, message, dayjs, getMockDataType } = window
const { delay, memoize } = window.globalTools

const getOptions = memoize(async () => {
  await delay(1000)

  return [
    { label: 'test', value: 1, tag: 'green' },
    { label: 'test2', value: 2, badge: 'processing' },
  ]
})

const props = {
  title: '表格示例（可在线编辑配置）',
  bordered: true,
  selectable: true,
  actions: ['add', { content: '导出' }], // 表格按钮动作，目前内置了新增动作
  iconActions: ['refresh', 'table-size', 'fullscreen'], // 目前内置了刷新、表格尺寸、全屏动作
  batchActions: ['delete'], // 多选动作，目前内置了批量删除动作
  columnActions: ['table-edit', 'delete'], // 表格项动作，目前内置了查看详情、编辑、删除动作
  fixColumnActions: true, // 是否固定动作栏到右侧
  columns: [
    ...Array(20)
      .fill('')
      .map((_, idx) => ({
        title: \`条目\${idx + 1}\`,
        dataIndex: \`value\${idx}\`,
        tooltip: idx % 2 === 0 ? \`条目\${idx + 1} 的提示\` : null,
        valueType: getMockDataType(idx),
        valueEnum: getOptions,
        expandView: idx > 10,
        hidden: idx > 10,
        copyable: getMockDataType(idx) === 'text',
        queryField: true,
        editField: true,
      })),
  ],
  // 查询方法，将在表格进行查询行为时触发，将获得查询区域的 form + 分页相关数据，需要返回 { success, data, total } 格式数据
  onQuery: async (params, extraParams) => {
    const { page, pageSize } = params
    console.log('onQuery', params, extraParams)
    await delay(1000)

    const data = mockData.slice((page - 1) * pageSize, page * pageSize)

    return {
      success: true,
      data: data.map(item => ({ ...item })),
      total: mockData?.length,
    }
  },
  // 新增方法，将在新增表单填写完毕，点击确认后触发，获得表单数据
  onAdd: async params => {
    console.log('add', params)

    await delay(1000)

    return {
      success: true,
    }
  },
  // 详情查询方法，将在编辑按钮、查看详情按钮点击时触发，获得点击的 item，返回的 data 将作为编辑表单的初始数据
  onView: async item => {
    await delay(500)

    return {
      success: true,
      data: {
        ...item,
      },
    }
  },
  // 编辑方法，将在编辑表单填写完毕，点击确认后触发，获得表单数据
  onEdit: async (params, item) => {
    console.log('edit', params, item)

    const targetIndex = mockData.findIndex(data => data.id === item.id)
    const target = mockData[targetIndex]

    Object.assign(target, params) // 模拟数据变更
    console.log('更新后的数据', target, mockData[targetIndex])

    await delay(1000)

    return {
      success: true,
    }
  },
  // 删除方法，将在删除/批量删除点击时触发，获得需要删除的 item，可能为多个
  onDelete: async target => {
    if (Array.isArray(target)) {
      message.info('删除多个')

      await delay(1000)

      return {
        success: true,
      }
    }

    message.info('删除单个')

    await delay(1000)

    return {
      success: true,
    }
  },
}

return props
`

function useDefaultCode() {
  return defaultCode
}

function getMockData() {
  return Array(2000)
    .fill('')
    .map((_, idx) => ({
      id: `key_${idx + 1}`,
      ...Object.assign(
        {},
        ...Array(20)
          .fill('')
          .map((_, idx) => ({
            [`value${idx}`]: run(() => {
              const valueType = getMockDataType(idx)

              const dataMap = {
                date: dayjs().add(random(0, 10), 'day').valueOf(),
                dateRange: [
                  dayjs().add(random(0, 10), 'day').valueOf(),
                  dayjs().add(random(0, 10), 'day').valueOf(),
                ].sort((prev, next) => (prev > next ? -1 : 1)),
                select: sample([1, 2]),
                multipleSelect: [...new Set([1, 2])],
                text: random(0, 999999999999999),
              }

              // 随机数据破缺
              if (random(0, 10) > 8) {
                return undefined
              }

              if (valueType in dataMap) {
                return dataMap[valueType]
              }

              return random(0, 999999999999999)
            }),
          })),
      ),
    }))
}

function getMockDataType(idx: number) {
  if (idx % 3 === 0) {
    return 'date'
  }

  if (idx % 4 === 0) {
    return 'dateRange'
  }

  if (idx % 2 === 0) {
    return 'multipleSelect'
  }

  if (idx % 5 === 0) {
    return 'select'
  }

  return 'text'
}
