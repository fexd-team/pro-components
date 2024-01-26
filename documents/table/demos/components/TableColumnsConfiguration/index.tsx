import React, { useEffect } from 'react'
import ConfigurationAreaContainer from '../ConfigurationAreaContainer'
import DraggableFormListTable from '../DraggableFormListTable'
import OtherFields from '../OtherFields'
import { ProForm, showModal, ProTableColumnType, ProFieldValueFieldType } from '@fexd/pro-components'
import { debounce, run } from '@fexd/tools'
import { Random } from 'mockjs'

interface TableColumnsConfigurationProps {
  onColumnsChange?: (columns: ProTableColumnType[], dataSource: []) => void
  onSelectableChange?: (selectable: boolean) => void
}
interface DataItemType {
  idx?: number
  title?: string
  type?: string
  align?: string
  options?: ProFieldValueFieldType['options']
}
interface FormProps {
  data: DataItemType[]
  selectable: boolean
}

const defaultItem = {
  type: 'text',
  align: 'left',
}

const getMockData = (rules: { field: string; random: () => any; pickOptions?: any[] }[], length = 20) => {
  return Array.from(new Array(length)).map((_, index) => {
    const obj: Record<string, any> = { id: index + 1 }
    rules.forEach((item) => {
      obj[item.field] = run(item.random)
    })
    return obj
  })
}

function TableColumnsConfiguration({ onColumnsChange, onSelectableChange }: TableColumnsConfigurationProps) {
  const [form] = ProForm.useForm()

  const debounceOnColumnsChange = debounce((data) => {
    const columns = data?.map((item: DataItemType) => ({
      title: item.title,
      align: item.align,
      dataIndex: item.title,
      type: item.type,
    }))
    // console.log(columns, 'columns---')
    const mockRules = data?.map((item: DataItemType) => {
      let random
      switch (item.type) {
        case 'text':
          random = () => Random.string(16)
          break
        case 'select':
          random = () =>
            Random.pick(
              (item?.options as any)?.length ? (item?.options as any)?.map((item: any) => item.value) : [1, 2, 3, 4, 5],
            )
          break
        case 'date':
          random = () => Random.datetime()
        default:
          break
      }
      return {
        field: item.title,
        random,
      }
    })
    const mockData = getMockData(mockRules, 33)
    // console.log(mockData, 'mockData-----------')
    run(onColumnsChange, undefined, columns, mockData)
  }, 300)
  const debounceOnSelectableChange = debounce((data) => {
    run(onSelectableChange, undefined, data)
  }, 300)

  const onValuesChange = (changedValues: FormProps, allValues?: FormProps) => {
    const changedKeys = Object.keys(changedValues)
    console.log(changedKeys, 'changedKeys---')
    // 一行显示个数
    if (changedKeys?.includes('selectable')) {
      debounceOnSelectableChange(changedValues?.selectable)
      return
    }
    const data = form.getFieldValue('data')?.filter((item: DataItemType) => item.title)
    if (!data?.length) {
      return
    }
    debounceOnColumnsChange(data)
  }
  const onSetting = async (record: any, index: number) => {
    // console.log(record, index)
    // TODO:
    await showModal({
      width: 1000,
      title: '更多配置',
      content: () => {
        return <ProForm />
      },
    }).promise
  }

  useEffect(() => {
    form.setFieldsValue({
      data: [{ ...defaultItem, idx: 0 }],
      selectable: false,
    })
  }, [form])

  return (
    <ConfigurationAreaContainer title="表格列配置区">
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
                name: 'title',
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
                ],
                props: {
                  allowClear: false,
                },
              },
              {
                title: '对齐',
                // @ts-ignore
                name: 'align',
                type: 'select',
                options: [
                  { label: '左', value: 'left' },
                  { label: '中', value: 'center' },
                  { label: '右', value: 'right' },
                ],
                props: {
                  allowClear: false,
                },
              },
            ]}
            onSort={onValuesChange}
            onSetting={onSetting}
          />
          <OtherFields
            fields={[
              {
                label: '表格可多选：',
                name: 'selectable',
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

export default TableColumnsConfiguration
