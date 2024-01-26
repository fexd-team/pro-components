import React, { useEffect } from 'react'
import ConfigurationAreaContainer from '../ConfigurationAreaContainer'
import DraggableFormListTable from '../DraggableFormListTable'
import OtherFields from '../OtherFields'
import { ProForm, ProTableQueryFieldType } from '@fexd/pro-components'
import { debounce, run } from '@fexd/tools'

interface QueryFieldsConfigurationProps {
  onQueryFieldsChange: (value: ProTableQueryFieldType[]) => void
  onQueryFieldColumnsChange: (value: number) => void
  onQueryFieldDefaultLinesChange: (value: number) => void
  onQueryFieldRefreshAfterResetChange: (value: boolean) => void
}
interface dataItemType {
  idx?: number
  label?: string
  type?: string
  required?: boolean[] | false
}
interface FormProps {
  data: dataItemType[]
  queryFieldColumns: number
  queryFieldDefaultLines: number
  queryFieldRefreshAfterReset: boolean
}

const defaultItem = {
  type: 'text',
  required: false,
}

function QueryFieldsConfiguration({
  onQueryFieldsChange,
  onQueryFieldColumnsChange,
  onQueryFieldDefaultLinesChange,
  onQueryFieldRefreshAfterResetChange,
}: QueryFieldsConfigurationProps) {
  const [form] = ProForm.useForm()

  const debounceOnQueryFieldColumnsChange = debounce((...props) => {
    run(onQueryFieldColumnsChange, undefined, ...props)
  }, 300)
  const debounceOnQueryFieldDefaultLinesChange = debounce((...props) => {
    run(onQueryFieldDefaultLinesChange, undefined, ...props)
  }, 300)
  const debounceOnQueryFieldRefreshAfterResetChange = debounce((...props) => {
    run(onQueryFieldRefreshAfterResetChange, undefined, ...props)
  }, 300)
  const debounceQueryFieldsChange = debounce((data) => {
    const queryFields = data?.map((item: dataItemType) => ({
      label: item.label,
      name: item.label,
      type: item.type,
      rules: item?.required && item?.required?.length > 0 ? [{ required: true }] : [],
    }))
    run(onQueryFieldsChange, undefined, queryFields)
  }, 300)

  const onValuesChange = (changedValues: FormProps, allValues?: FormProps) => {
    const changedKeys = Object.keys(changedValues)
    // 一行显示个数
    if (changedKeys?.includes('queryFieldColumns')) {
      debounceOnQueryFieldColumnsChange(changedValues?.queryFieldColumns)
      return
    }
    // 默认显示行数
    if (changedKeys?.includes('queryFieldDefaultLines')) {
      debounceOnQueryFieldDefaultLinesChange(changedValues?.queryFieldDefaultLines)
      return
    }
    // 重置是否查询
    if (changedKeys?.includes('queryFieldRefreshAfterReset')) {
      debounceOnQueryFieldRefreshAfterResetChange(changedValues?.queryFieldRefreshAfterReset)
      return
    }
    // 配置列
    const data = form.getFieldValue('data')?.filter((item: dataItemType) => item.label)
    if (!data?.length) {
      return
    }
    debounceQueryFieldsChange(data)
  }

  useEffect(() => {
    form.setFieldsValue({
      data: [{ ...defaultItem, idx: 0 }],
      queryFieldColumns: 4,
      queryFieldDefaultLines: 1,
      queryFieldRefreshAfterReset: true,
    })
  }, [form])

  return (
    <ConfigurationAreaContainer title="查询区">
      <ProForm form={form} onValuesChange={onValuesChange}>
        <>
          <DraggableFormListTable
            name="data"
            form={form}
            defaultItem={defaultItem}
            columns={[
              {
                title: '名称',
                // @ts-ignore
                name: 'label',
              },
              {
                title: '类型',
                // @ts-ignore
                name: 'type',
                type: 'select',
                options: [
                  { label: '文本', value: 'text' },
                  { label: '单选', value: 'select' },
                  { label: '日期', value: 'date' },
                  { label: '金额', value: 'money' },
                  { label: '文本域', value: 'textarea' },
                  { label: '数字', value: 'digit' },
                  { label: '多选框', value: 'multipleSelect' },
                  { label: '多选', value: 'checkbox' },
                  { label: '单选', value: 'radio' },
                  { label: '单选按钮', value: 'radioButton' },
                  { label: '日期', value: 'date' },
                  { label: '日期时间', value: 'dateTime' },
                  { label: '日期周', value: 'dateWeek' },
                  { label: '日期月', value: 'dateMonth' },
                  { label: '日期季度', value: 'dateQuarter' },
                  { label: '日期年', value: 'dateYear' },
                  { label: '日期范围', value: 'dateRange' },
                  { label: '日期时间范围', value: 'dateTimeRange' },
                  { label: '时间', value: 'time' },
                  { label: '时间范围', value: 'timeRange' },
                  { label: '开关', value: 'switch' },
                  { label: '评分', value: 'rate' },
                  { label: '级联', value: 'cascader' },
                ],
                props: {
                  allowClear: false,
                },
              },
              {
                title: '是否必填',
                // @ts-ignore
                name: 'required',
                type: 'checkbox',
                options: [{ label: '', value: true }],
              },
            ]}
            onSort={onValuesChange}
            // onSetting={onSetting}
          />
          <OtherFields
            fields={[
              {
                label: '一行显示几个：',
                name: 'queryFieldColumns',
                type: 'number',
              },
              {
                label: '默认显示几行：',
                name: 'queryFieldDefaultLines',
                type: 'number',
              },
              {
                label: '重置是否查询：',
                name: 'queryFieldRefreshAfterReset',
                type: 'switch',
                valuePropName: 'checked',
              },
            ]}
          />
        </>
      </ProForm>
    </ConfigurationAreaContainer>
  )
}

export default QueryFieldsConfiguration
