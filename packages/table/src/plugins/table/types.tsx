import { ReactNode, Ref } from 'react'
import { TableProps, TableColumnType } from 'antd'
import { ProFieldValueFieldType, ProFormProps, ProFormRenderDescriptionParams } from '@fexd/pro-form'
import { ProLocaleValue } from '@fexd/pro-provider'
import { TooltipConfig, ButtonActionType, UniteOmit } from '@fexd/pro-utils'

import { ProTableQueryFieldType } from '../queryField/types'
import { ProTableEditFieldType } from '../editField/types'

export interface ProTableColumnType<R = any>
  extends Pick<
    ProFieldValueFieldType,
    | 'label'
    | 'name'
    | 'type'
    | 'options'
    | 'format'
    | 'unit'
    | 'digits'
    | 'numberLocale'
    | 'currencyLocale'
    | 'builtInRule'
    | 'lazyRender'
    | 'fromNowTooltip'
  > {
  valueType?: ProFieldValueFieldType['type']
  valueEnum?: ProFieldValueFieldType['options']
  queryField?: boolean | ProTableQueryFieldType | ProTableQueryFieldType['hook']
  editField?: boolean | ProTableEditFieldType<R> | ProTableEditFieldType<R>['hook']
  addField?: boolean | ProTableEditFieldType<R> | ProTableEditFieldType<R>['hook']
  viewField?: boolean | ProTableEditFieldType<R> | ProTableEditFieldType<R>['hook']
  expandViewField?: boolean | ProTableEditFieldType<R> | ProTableEditFieldType<R>['hook']
}

export interface ProTableColumnType<R = any> extends TableColumnType<R> {
  // key?: React.Key,
  expandView?: boolean
  tooltip?: TooltipConfig
  copyable?: boolean | Pick<ButtonActionType, 'tooltip' | 'confirm'>
  hidden?: boolean
  children?: ProTableColumnType<R>[]
}

export interface ProTablePluginConfig<R = any>
  extends Omit<TableProps<R>, 'title' | 'locale' | 'sticky' | 'rowSelection'> {
  ref?: Ref<any>

  // Pick<TableProps<R>, 'rowKey' | 'rowSelection' | 'indentSize'> {
  title?: string | ReactNode
  columns?: ProTableColumnType<R>[]

  /** 是否纯表格，将去除外部边框和边距，且默认 sticky=false */
  pure?: boolean

  sticky?: TableProps<R>['sticky'] & {
    offsetBottom?: number
  }

  /** 是否吸底滚动（横向） */
  stickyScrollBar?: boolean

  /** 可选择表格 */
  selectable?: boolean
  rowSelection?: TableProps<R>['rowSelection'] & {
    rowClickable?: boolean
    toggleRowSelectionByClick?: boolean
  }

  expandableDescriptionConfig?: ProFormRenderDescriptionParams
  expandableProFormRender?: ProFormProps['render']

  /** 是否迷你模式 */
  mini?: boolean
  defaultSize?: TableProps<R>['size']
  defaultTableSize?: TableProps<R>['size']

  /** 是否展示数据的序列标识 */
  showDataSourceIndex?: boolean
  /** 数据的序列标识是否按页累加，默认 true */
  dataSourceIndexCalcWithPage?: boolean
  /** 序列标识 column 的列配置项 */
  dataSourceIndexColumnConfig?: ProTableColumnType<R>

  pagination?: TableProps<R>['pagination']
  /** 初始分页参数 */
  initialPaginationParams?: { page?: number; pageSize?: number }
  /** 初始分页参数 */
  defaultPaginationParams?: { page?: number; pageSize?: number }
  defaultPageSize?: number
  /** 未知数据长度，将开启无 total 分页 */
  unknownDataLength?: boolean
  /** 页数改变时调用查询方法 */
  queryAfterPaginationChange?: boolean

  /** 是否序列化 field 值，例如 Moment -> timestamp */
  normalizeFieldValue?: boolean

  /** 表格数据为空时隐藏所有的列，用在 columns 项较多但数据为空时，优化呈现效果 */
  hideColumnsWhenNoData?: boolean

  /** 单元格延迟渲染配置 */
  lazyRenderCell?:
    | ProFieldValueFieldType['lazyRender']
    | ((params: {
        dataSource: R[]
        item: R
        field?: ProTableEditFieldType
        column: ProTableColumnType<R>
        xIndex?: number
        yIndex: number
        isActionColumn?: boolean
      }) => ProFieldValueFieldType['lazyRender'])

  /** 单元格轻量渲染，渲染速度更快，仅使用 ReadonlyProFieldCore 进行渲染，但各类动态 field 钩子将会失效 */
  lightweightRenderCell?: boolean

  /** 暂不稳定！！！！表头是否可改变宽度 */
  resizableHeader?: boolean

  bodyStyle?: React.CSSProperties
  mainStyle?: React.CSSProperties
  toolbarStyle?: React.CSSProperties
  noBackgroundColor?: boolean

  tableExtraRender?: () => ReactNode

  /** 表头不折叠 */
  noTableHeaderEllipsis?: boolean

  queryWrapperStyle?: React.CSSProperties

  /** 不显示批量操作工具栏 */
  noBatchToolbar?: boolean

  /** 渲染控制函数 */
  render?: ({ queryField, tableExtra, table }: any) => JSX.Element

  /** 内置语言包 */
  locale?: TableProps<R>['locale'] & {
    actions?: {
      multipleDeleteConfirm?: ProLocaleValue
      multipleDelete?: ProLocaleValue
      deleteConfirm?: ProLocaleValue
      delete?: ProLocaleValue
      refreshTip?: ProLocaleValue
    }
    editField?: {
      add?: ProLocaleValue
      details?: ProLocaleValue
      edit?: ProLocaleValue
      saveTips?: ProLocaleValue
    }
    queryField?: {
      query?: ProLocaleValue
      reset?: ProLocaleValue
      fold?: ProLocaleValue
      more?: ProLocaleValue
    }
    modal?: {
      confirm?: ProLocaleValue
      okText?: ProLocaleValue
      cancelText?: ProLocaleValue
    }
    table?: {
      selectionTips?: ProLocaleValue
      deselect?: ProLocaleValue
      inverse?: ProLocaleValue
      action?: ProLocaleValue
      totalDataCount?: ProLocaleValue
      edit?: ProLocaleValue
      save?: ProLocaleValue
      cancel?: ProLocaleValue
      cancelConfirm?: ProLocaleValue
      density?: ProLocaleValue
      densityLarger?: ProLocaleValue
      densityMiddle?: ProLocaleValue
      densitySmall?: ProLocaleValue
      index?: ProLocaleValue
    }
    valueType?: {
      inputPassword?: ProLocaleValue
      inputContent?: ProLocaleValue
      chooseContent?: ProLocaleValue
      startTime?: ProLocaleValue
      endTime?: ProLocaleValue
    }
  }

  localeKey?: UniteOmit<
    'zh-CN' | 'zh_CN' | 'en-US' | 'en_US' | 'id-ID' | 'id_ID' | 'ms-MY' | 'ms_MY' | 'th-TH' | 'th_TH'
  >
}