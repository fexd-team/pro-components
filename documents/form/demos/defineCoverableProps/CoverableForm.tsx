import React from 'react'
import { ProForm, request, useCoverable } from '@fexd/pro-components'

const CoverableForm = useCoverable.component(() => {
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
  const config = useCoverable({
    proFormProps,
    apis: {
      test: request.coverable({
        url: '/api/test',
        method: 'get',
      }),
    },
  })

  React.useEffect(() => {
    config?.getConfig()?.apis?.test()
  }, [])

  return useCoverable.props(config).render(() => (
    <>
      <ProForm {...config?.getConfig()?.proFormProps?.getProps()} />
    </>
  ))
})

export default CoverableForm
