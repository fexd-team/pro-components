import { createContext, useContext, createRef } from 'react'
import { useContextSize, useProContext } from '@fexd/pro-provider'
import { isObject, run, isExist } from '@fexd/tools'
import { Required } from 'utility-types'

import { ProTableProps } from './types'

// 静态默认值
export const defaultProps: ProTableProps = {
  lazyRenderCell: ({ dataSource, field, column, item, xIndex, yIndex, isActionColumn }) => {
    if (isActionColumn) {
      // 前 15 行不做懒加载
      if (yIndex <= 14) {
        return false
      }
    }
    // 前 10 列、前 15 行不做懒加载
    if (xIndex! < 9 && yIndex <= 14) {
      return false
    }

    return {
      threshold: 0,
      wait: 128,
    }
  },
  whenToTriggerOnEdit: 'changed',
  editFieldLayout: 'vertical',
  queryFieldPersistType: 'sessionStorage',
  queryFieldLayout: 'vertical',
  rowKey: 'id',
  editFieldColumns: 3,
  defaultPageSize: 10,
  queryFieldColumns: 4,
  queryFieldDefaultLines: 1,
  refreshAfterAdd: true,
  refreshAfterEdit: true,
  normalizeFieldValue: true,
  queryFieldRefreshAfterReset: true,
  dataSourceIndexCalcWithPage: true,
  editFieldFilterEmptyParam: false,
  pure: false,
  resizableHeader: false, // 功能尚不稳定，默认不开启表头宽度可调整
  selectable: false,
  hideColumnsWhenNoData: false,
  showDataSourceIndex: false,
  editFieldGutter: [24, 0],
  columns: [],
  queryFieldPersistPaginationParamsKeyExcludes: [],
  queryFieldPersistFormKeyExcludes: [],
  multipleActions: [],
  columnActions: [],
  iconActions: [],
  actions: [],
  queryFieldOrder: [],
  defaultPaginationParams: {},
  initialPaginationParams: {},
  editFieldModalProps: {},
  dataSourceIndexColumnConfig: {},
  columnActionsConfig: {},
  queryFieldActionSortList: ['query', 'reset', 'fold'],
  noTableHeaderEllipsis: true,
  lightweightRenderCell: false,
  queryAfterPaginationChange: true,
  // expandableDescriptionConfig: {
  //   gridDynamicRender: false,
  // },
}

// window.proTableDefaultProps = defaultProps

export interface ProTablePropsContext extends Required<ProTableProps, keyof typeof defaultProps> {
  wrapperDomRef: React.RefObject<HTMLDivElement>
}

export const propsContext = createContext<ProTablePropsContext>({
  ...defaultProps,
  wrapperDomRef: createRef(),
} as ProTablePropsContext)
export default function useProps<T = ProTablePropsContext>(): T {
  const contextSize = useContextSize()
  const proContext = useProContext()
  const providerLocale = proContext?.locale?.table ?? {}
  const props = useContext(propsContext) as ProTablePropsContext

  // 以下为有逻辑的、动态的默认值
  const {
    mini = contextSize === 'small' ?? false,
    sticky = props?.pure ? false : true,
    selectable,
    rowSelection,
  } = (props ?? {}) as ProTableProps
  const dynamicProps: ProTableProps = {
    mini,
    sticky,
    defaultSize: mini
      ? 'small'
      : run(() => {
          if (contextSize === 'middle') {
            return 'large'
          }

          return contextSize
        }) ?? 'large',
    stickyScrollBar: !!sticky,
    addFieldFilterEmptyParam: props?.editFieldFilterEmptyParam,
    viewFieldLayout: props?.editFieldLayout,
    addFieldLayout: props?.editFieldLayout,
    viewFieldColumns: props?.editFieldColumns,
    addFieldColumns: props?.editFieldColumns,
    viewFieldGutter: props?.editFieldGutter,
    addFieldGutter: props?.editFieldGutter,
    renderModalViewFields: props?.renderModalEditFields,
    renderModalAddFields: props?.renderModalEditFields,
    addFieldFormProps: props?.editFieldFormProps,
    viewFieldFormProps: props?.editFieldFormProps,
    queryFieldPersistPaginationParams: !!props?.queryFieldPersistKey,
    queryFieldPersistForm: !!props?.queryFieldPersistKey,
    batchActions: props?.multipleActions ?? [],
    localeKey: proContext?.localeKey ?? 'en_US',
    locale: providerLocale ?? {},
    addFieldModalProps: props?.editFieldModalProps,
    viewFieldModalProps: props?.editFieldModalProps,
    mainStyle: props?.pure ? { padding: 0 } : {},
    ...(props as any),
    rowSelection: selectable
      ? {
          toggleRowSelectionByClick: (rowSelection as any)?.rowClickable ?? true,
          ...(isObject(rowSelection) ? rowSelection : {}),
        }
      : rowSelection,
    rawProps: props,
  }

  return {
    ...defaultProps,
    ...dynamicProps,
  } as any as T
}

export const setDefaultProps = (configuareDefaultProps: ProTableProps = {}) => {
  Object.assign(defaultProps, configuareDefaultProps)
}
