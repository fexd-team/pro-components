/**
 * inline: true
 *
 */
import React, { useState } from 'react'
import { ProTable, ProTableQueryFieldType, ProTableColumnType, ConfigProvider } from '@fexd/pro-components'
import TitleConfiguration from './components/TitleConfiguration'
import TableColumnsConfiguration from './components/TableColumnsConfiguration'
import QueryFieldsConfiguration from './components/QueryFieldsConfiguration'
import ColumnActionsConfiguration from './components/ColumnActionsConfiguration'
import { Row, Col, Collapse } from 'antd'

export default () => {
  const [title, setTitle] = useState<string>()
  // 查询
  const [queryFields, setQueryFields] = useState<ProTableQueryFieldType[]>([])
  const [queryFieldColumns, setQueryFieldColumns] = useState<number>()
  const [queryFieldDefaultLines, setQueryFieldDefaultLines] = useState<number>()
  const [queryFieldRefreshAfterReset, setQueryFieldRefreshAfterReset] = useState<boolean>(true)
  // 表格列
  const [tableColumns, setTableColumns] = useState<any>([])
  const [selectable, setSelectable] = useState<boolean>()
  const [dataSource, setDataSource] = useState([])
  const onColumnsChange = (columns: ProTableColumnType, mockData: []) => {
    // console.log(columns, mockData, 'onColumnsChange---')
    setTableColumns(columns || [])
    setDataSource(mockData || [])
  }
  // 表格行操作
  const [columnActions, setColumnActions] = useState([])
  const [columnActionsConfig, setColumnActionsConfig] = useState({})

  return (
    <div className="p-6 bg-gray-100">
      <ConfigProvider localeKey="zh-CN">
        <Row gutter={24}>
          <Col span={16}>
            {/* <div>目标表格：</div> */}
            <ProTable
              title={title}
              queryFields={queryFields}
              queryFieldColumns={queryFieldColumns}
              queryFieldDefaultLines={queryFieldDefaultLines}
              queryFieldRefreshAfterReset={queryFieldRefreshAfterReset}
              // ---
              columnActions={columnActions}
              columnActionsConfig={columnActionsConfig}
              // ---
              selectable={selectable}
              columns={tableColumns}
              dataSource={dataSource}
              // dataSource={[{ id: 1 }]}
              // onQuery={(params: any) => {
              //   console.log(params, '---')
              //   return {
              //     success: true,
              //     data: [],
              //     total: 0
              //   }
              // }}
            />
          </Col>
          <Col span={8}>
            <Collapse defaultActiveKey={'标题配置区'}>
              <Collapse.Panel key="标题配置区" header="标题配置区">
                <TitleConfiguration onTitleChange={(value: string) => setTitle(value)} />
              </Collapse.Panel>
              <Collapse.Panel key="查询区" header="查询区">
                <QueryFieldsConfiguration
                  onQueryFieldsChange={(values: ProTableQueryFieldType[]) => setQueryFields(values)}
                  onQueryFieldColumnsChange={(value: number) => setQueryFieldColumns(value)}
                  onQueryFieldDefaultLinesChange={(value: number) => setQueryFieldDefaultLines(value)}
                  onQueryFieldRefreshAfterResetChange={(value: boolean) => setQueryFieldRefreshAfterReset(value)}
                />
              </Collapse.Panel>
              <Collapse.Panel key="表格行操作配置区" header="表格行操作配置区">
                <ColumnActionsConfiguration
                  onColumnActionsChange={(value: any) => setColumnActions(value)}
                  onColumnActionsConfigChange={(value: any) => setColumnActionsConfig(value)}
                />
              </Collapse.Panel>
              <Collapse.Panel key="表格列配置区" header="表格列配置区">
                <TableColumnsConfiguration
                  onColumnsChange={onColumnsChange as any}
                  onSelectableChange={(value: boolean) => setSelectable(value)}
                />
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </ConfigProvider>
    </div>
  )
}
