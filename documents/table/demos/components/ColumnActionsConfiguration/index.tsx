import React, { useEffect } from 'react'
import ConfigurationAreaContainer from '../ConfigurationAreaContainer'
import DraggableFormListTable from '../DraggableFormListTable'
import OtherFields from '../OtherFields'
import { ProForm, ProTableBuiltInActionType, ProTableButtonActionType } from '@fexd/pro-components'
import { debounce, run } from '@fexd/tools'

interface ColumnActionsConfigurationProps {
  onColumnActionsChange?: (values: Record<string, ProTableBuiltInActionType>) => void
  onColumnActionsConfigChange?: (values: { fixColumnActions?: boolean; align?: 'string'; width?: string }) => void
}
interface dataItemType {
  idx?: number
  label?: string
  type?: string
  required?: boolean[] | false
}
interface FormProps {
  data: dataItemType[]
}

const defaultBuiltInOptions = [
  { builtIn: 'view', content: '详情' },
  { builtIn: 'edit', content: '编辑' },
  { builtIn: 'table-edit', content: '编辑' },
  { builtIn: 'delete', content: '删除' },
  { builtIn: '', content: '' },
]
const defaultItem = {
  builtIn: undefined,
  content: '',
}

function ColumnActionsConfiguration({
  onColumnActionsChange,
  onColumnActionsConfigChange,
}: ColumnActionsConfigurationProps) {
  const [form] = ProForm.useForm()

  const debounceOnColumnActionsChange = debounce((data: ProTableButtonActionType[]) => {
    const columnActions = data?.map((item: ProTableButtonActionType) => ({
      builtIn: item?.builtIn,
      content: item?.content,
    }))
    // console.log(columnActions, 'columnActions------------')
    run(onColumnActionsChange, undefined, columnActions)
  }, 300)
  const debounceOnColumnActionsConfigChange = debounce((data: any) => {
    console.log(data, 'data---')
    run(onColumnActionsConfigChange, undefined, data)
  }, 300)

  const onValuesChange = (changedValues: FormProps, allValues?: FormProps) => {
    const changedKeys = Object.keys(changedValues)
    if (changedKeys?.includes('fixColumnActions') || changedKeys?.includes('align') || changedKeys?.includes('width')) {
      const { fixColumnActions, align, width } = form?.getFieldsValue()
      debounceOnColumnActionsConfigChange({ fixColumnActions, align, width })
      return
    }
    const data = form.getFieldValue('data')?.filter((item: any) => item?.builtIn || item?.content)
    if (!data.length) {
      return
    }
    debounceOnColumnActionsChange(data)
  }

  useEffect(() => {
    form.setFieldsValue({
      // data: [{ ...defaultItem, builtIn: 'view', content: '查看详情', idx: 0 }, { ...defaultItem, builtIn: 'delete', content: '删除', idx: 1 }],
      data: [{ ...defaultItem, idx: 0 }],
      fixColumnActions: 'right',
      align: 'center',
      width: undefined,
    })
  }, [form])

  return (
    <ConfigurationAreaContainer title="表格行操作配置区">
      <ProForm form={form} onValuesChange={onValuesChange}>
        <>
          <DraggableFormListTable
            name="data"
            form={form}
            defaultItem={defaultItem}
            columns={[
              {
                title: '动作类型',
                // @ts-ignore
                name: 'builtIn',
                type: 'select',
                width: '150px',
                options: [
                  { label: '查看详情', value: 'view' },
                  { label: '编辑（弹窗）', value: 'edit' },
                  { label: '编辑（表格内）', value: 'table-edit' },
                  { label: '删除', value: 'delete' },
                  { label: '自定义', value: '' },
                ],
                props: {
                  onChange: (builtIn: string, ...props: any) => {
                    const index = props?.[props?.length - 1]
                    const defaultItem = defaultBuiltInOptions?.find((item) => item.builtIn === builtIn)
                    const data = form?.getFieldValue('data')
                    const result = data?.map((item: any, idx: number) => {
                      if (idx === index) {
                        return {
                          ...defaultItem,
                          idx,
                        }
                      }
                      return {
                        ...item,
                        idx,
                      }
                    })
                    form.setFieldsValue({
                      data: result,
                    })
                    onValuesChange(result)
                  },
                },
              },
              {
                title: '文本',
                // @ts-ignore
                name: 'content',
              },
            ]}
            onSort={onValuesChange}
            // onSetting={onSetting}
          />
          {/* columnActionConfigs */}
          <OtherFields
            fields={[
              {
                label: '固定右侧：',
                name: 'fixColumnActions',
                // @ts-ignore
                type: 'switch',
                valuePropName: 'checked',
              },
              {
                label: '对齐方式：',
                name: 'align',
                // @ts-ignore
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
              {
                label: '列的宽度：',
                name: 'width',
              },
            ]}
          />
        </>
      </ProForm>
    </ConfigurationAreaContainer>
  )
}

export default ColumnActionsConfiguration
