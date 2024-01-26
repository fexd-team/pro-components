import React from 'react'
import { ProField, ConfigProvider, Button, ProTableProps } from '@fexd/pro-components'
import { ProFieldValueFieldType } from '@fexd/pro-form'
import { Form, Table, Space, TableProps } from 'antd'
import { FormInstance } from 'antd/es/form'
import { MenuOutlined, SettingOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { SortableContainerProps, SortEnd } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import { run } from '@fexd/tools/es'
import './style.less'

interface DraggableFormListTableProps {
  form: FormInstance
  name: string
  defaultItem: any
  columns: TableProps<any>['columns']
  onSort?: any
  onSetting?: any
}

const sortByIdx = (arr: any[]) => {
  return arr?.map((item: any, index: number) => ({
    ...item,
    idx: index,
  }))
}

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />)
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />)

function DraggableFormListTable({
  form,
  name = 'data',
  defaultItem = {},
  columns,
  onSort,
  onSetting,
}: DraggableFormListTableProps) {
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const dataSource = form.getFieldValue(name) || []
      const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter((el) => !!el)
      // console.log('Sorted items: ', newData);
      form.setFieldsValue({
        [name]: newData,
      })
      run(onSort, undefined, { [name]: newData })
    }
  }

  const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)
  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  )
  const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    const dataSource = form.getFieldValue(name) || []
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x: any) => x.idx === restProps['data-row-key'])
    return <SortableItem index={index} {...restProps} />
  }

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        const dataSource = form?.getFieldValue(name) || []
        return (
          <ConfigProvider size="small">
            <Table
              rowKey="idx"
              pagination={false}
              dataSource={dataSource}
              columns={[
                {
                  title: '排序',
                  width: '60px',
                  align: 'center',
                  render: (_, record, index) => {
                    const field = fields[index]
                    return <ProField style={{ marginBottom: 0 }} {...field} renderField={() => <DragHandle />} />
                  },
                },
                ...(columns as any)?.map((item: ProFieldValueFieldType) => ({
                  ...item,
                  render: (text: any, record: any, index: number) => {
                    const field = fields[index]
                    if (!item?.name) {
                      return null
                    }
                    return (
                      <ProField
                        style={{ marginBottom: 0 }}
                        {...item}
                        {...field}
                        initialValue={form.getFieldValue(name)[index]?.[String(item?.name)]}
                        name={[field.name, String(item?.name)]}
                        props={{
                          onChange: (...props: any) => {
                            if (!(item?.props as any)?.onChange) {
                              return
                            }
                            run((item?.props as any)?.onChange, undefined, ...props, index)
                          },
                        }}
                      />
                    )
                  },
                })),
                {
                  title: '更多',
                  render: (_, record, index) => (
                    <ProField
                      style={{ marginBottom: 0 }}
                      renderField={() => (
                        <Space size={0}>
                          <Button
                            icon={<SettingOutlined />}
                            type="link"
                            onClick={async () => {
                              await run(onSetting, undefined, record, index)
                            }}
                          />
                          <Button
                            icon={<DeleteOutlined />}
                            danger
                            type="link"
                            onClick={() => {
                              remove(index)
                            }}
                          />
                        </Space>
                      )}
                    />
                  ),
                },
              ]}
              components={{
                body: {
                  wrapper: DraggableContainer,
                  row: DraggableBodyRow,
                },
              }}
            />
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={async () => {
                const data = form.getFieldValue(name)
                // 重新排序
                await form.setFieldsValue({
                  [name]: sortByIdx(data),
                })
                add({ ...defaultItem, idx: data?.length })
              }}
            >
              添加一行数据
            </Button>
          </ConfigProvider>
        )
      }}
    </Form.List>
  )
}

export default DraggableFormListTable
