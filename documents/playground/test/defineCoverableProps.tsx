/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import React, { ReactNode, ReactChild, ReactFragment, ReactPortal } from 'react'
import {
  ConfigProvider,
  ProTable,
  ProTableProps,
  ProTableColumnType,
  ProTableQueryFieldType,
  ProTableEditFieldType,
  useProFormLocales,
  ProField,
  ProForm,
  request,
} from '@fexd/pro-components'
import { Space } from 'antd'
import { delay, isArray, isObject } from '@fexd/tools'
import { UploadOutlined } from '@ant-design/icons'

import { useCoverable, CoverableValue } from '@fexd/pro-utils'
// import { useCoverable, CoverableValue } from 'react-coverable'
import { useMemoizedFn } from 'ahooks'
import { ValuesType } from 'utility-types'

import { getMockData } from '..//initialFiles/data'

// import defineProps from './defineProps'

const mockData = Array(260).fill('').map(getMockData)

const Comp = useCoverable.component(() => {
  const proTableProps = ProTable.defineCoverableProps({
    title: '表格标题',
    bordered: true,
    addFieldColumns: 2,
    iconActions: {
      刷新: 'refresh',
      表格尺寸: 'table-size',
      全屏: 'fullscreen',
    },
    actions: {
      新增: 'add',
      导出: { content: '导出', icon: <UploadOutlined /> },
    },
    columnActions: [
      'view',
      'edit',
      'delete',
      {
        content: 'test',
        // ty
        onClick: () => {
          return {
            success: true,
            message: 'test',
          }
        },
      },
    ],
    batchActions: {
      删除: 'delete',
      导出选中数据: { content: '导出选中数据', icon: <UploadOutlined /> },
    },
    selectable: true,
    queryFields: {
      文本框: { label: '文本框', name: 'text', type: 'text' },
      选择框: { label: '选择框', name: 'select', type: 'select', options: ['选项 1', '选项 2'] },
      日期: { label: '日期', name: 'date', type: 'date' },
      日期范围: { label: '日期范围', name: 'dateRange', type: 'dateRange' },
      价格: { label: '价格', name: 'money', type: 'money', unit: '￥' },
      多选框: {
        label: '多选框',
        name: 'multipleSelect',
        type: 'multipleSelect',
        options: ['选项 1', '选项 2'],
      },
      时间: { label: '时间', name: 'time', type: 'time' },
      时间范围: { label: '时间范围', name: 'timeRange', type: 'timeRange' },
    },
    onQuery: async (params, extraParams) => {
      const { page, pageSize } = params
      await delay(1000)

      const data = mockData.slice((page - 1) * pageSize, page * pageSize)

      return {
        success: true,
        data: data as any as { a: number }[],
        total: mockData?.length,
      }
    },
    columns: {
      名称: { title: '名称', dataIndex: 'name', editField: true },
      数字: { title: '数字', dataIndex: 'number', valueType: 'number', editField: true },
      百分比: {
        title: '百分比',
        dataIndex: 'percent',
        valueType: 'percent',
        render: () => ({
          builtIn: 'text',
        }),
        editField: {
          dependencies: ['number'],
          hook: () => {
            const { mode, item, form } = ProTable.useFieldParams()
            const depValue = form?.getFieldValue('number')

            return {
              key: depValue,
              initialValue: depValue,
            }
          },
        },
        numberLocale: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      },
      金额: { title: '金额', dataIndex: 'price', valueType: 'money', unit: '￥', editField: true },
      日期: { title: '日期', dataIndex: 'dayjs1_timestamp', valueType: 'date', editField: true },
      距今: { title: '距今', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
    },
    defaultPageSize: 5,
  })

  const proFormProps = ProForm.defineCoverableProps({
    fields: {
      文本框: { label: '文本框', name: 'text', type: 'text' },
      选择框: { label: '选择框', name: 'select', type: 'select', options: ['选项 1', '选项 2'] },
      日期: { label: '日期', name: 'date', type: 'date' },
      日期范围: { label: '日期范围', name: 'dateRange', type: 'dateRange' },
      价格: { label: '价格', name: 'money', type: 'money', unit: '￥' },
      多选框: {
        label: '多选框',
        name: 'multipleSelect',
        type: 'multipleSelect',
        options: ['选项 1', '选项 2'],
      },
      时间: { label: '时间', name: 'time', type: 'time' },
      时间范围: { label: '时间范围', name: 'timeRange', type: 'timeRange' },
    },
  })

  // const actions = ['add', { content: '导出', icon: <UploadOutlined /> }]
  // type Action = typeof actions
  // type B = Action // extends Array<any> ? ValuesType<Action> : false

  // console.log(proTableProps.config?.queryFields)
  const config = useCoverable({
    proTableProps,
    proFormProps,
    apis: {
      test: request.coverable({
        url: '/api/test',
        method: 'get',
      }),
    },
  })

  React.useEffect(() => {
    console.log('test api', config?.getConfig()?.apis?.test)
    config?.getConfig()?.apis?.test()
    // console.log('props', config?.getConfig()?.proFormProps)
  }, [])

  return useCoverable.props(config).render(() => (
    <>
      <ProTable {...config?.getConfig()?.proTableProps?.getProps()} />
      <ProForm {...config?.getConfig()?.proFormProps?.getProps()} />
    </>
  ))
})

export default () => {
  const controller = ProTable.useController()
  const formRef = ProForm.useRef()

  // // window.controller1 = controller
  // window.formRef = formRef

  return (
    <Comp
      coverable={{
        proFormProps: {
          // formRef,
          fields: {
            文本框: {
              type: 'select',
            },
          },
        },
        proTableProps: {
          ref: controller.ref,
          selectable: false,
          // queryFieldOrder: ['Test'],
          // render: () => ()
          // hideQueryFields: true,
          iconActions: {
            search: 'search',
          },
          actions: {
            新增: {
              builtIn: 'add',
              icon: null,
              onClick: () => {
                alert(1)
              },
            },
            导出: {
              content: '??',
            },
          },
          // iconActions: {
          //   3: 'search',
          // },
          // addFields: [
          //   {
          //     label: '测试',
          //     name: 'test',
          //     type: 'select',
          //     // req
          //     // options: [],
          //   },
          // ],
          // addFields: {
          //   1: {
          //     label: '???',
          //     type: 'date'
          //   }
          // },
          queryFields: {
            文本框: {},
            选择框: {
              label: '文本框',
            },
            Test: {
              label: 'Test',
              name: 'Test',
            },
            // 0: {
            //   required: true,
            // },
          },
          // columns: {
          //   Test: {
          //     title: '图片',
          //     name: 'image',
          //     align: 'center',
          //     render: () => ({
          //       builtIn: 'avatar',
          //     }),
          //   },
          //   百分比: {
          //     render: (value) => ({
          //       builtIn: 'link',
          //     }),
          //     // viewField: false,
          //     // type: 'select',
          //     // editField
          //     // viewField: false
          //   },
          //   // 百分比: {
          //   //   addField: {
          //   //     dependencies: [],
          //   //     hook: undefined
          //   //   }
          //   // }
          // },
        },
        apis: {
          test: () => {
            console.log('test/api')
          },
        },
      }}
    />
  )
}
