import { ReactNode } from 'react'
import { FormProps, RowProps, DescriptionsProps } from 'antd'
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'
import {
  ProFieldValueFieldType,
  ProFormRenderParams,
  ProFormProps,
  ProFormRenderDescriptionParams,
  ProFormInstance,
} from '@fexd/pro-form'
import { ShowModalConfig } from '@fexd/pro-utils'

import { ProTableResponse } from '../queryField/types'

export type ProTableEditFieldMode = 'view' | 'add' | 'edit'

export interface ProTableEditFieldParams<R = any> {
  [key: string]: any
  item: R | undefined
  form: ProFormInstance
  mode: ProTableEditFieldMode
  inTable?: boolean
}

export interface ProTableEditFieldType<R = any> extends Omit<ProFieldValueFieldType, 'hook'> {
  readonly?: boolean
  hook?: (
    params: ProTableEditFieldParams<R>,
  ) => Omit<ProTableEditFieldType, 'hook' | 'name'> | void | undefined | null | boolean | ReactNode
}

export interface ProTableEditFieldsConfig {
  isAvailable: boolean
  fields: ProTableEditFieldType[]
}
export interface ProTableEditFieldRenderParams
  extends Omit<ProFormRenderParams<ProTableEditFieldType>, 'renderDescriptions' | 'fieldsMap'> {
  fieldsMap: Record<string, ProTableEditFieldType>
  fieldsConfig: ProTableEditFieldsConfig
  getField: (fieldName: string) => ProTableEditFieldType | undefined
  renderDescriptions: (param?: {
    group?: string
    configs?: ProFormRenderDescriptionParams['configs']
    filter?: (item: ProTableEditFieldType) => boolean
    sort?: (prev: ProTableEditFieldType, next: ProTableEditFieldType) => number | undefined | void
    descriptionsProps?: DescriptionsProps
    descriptionsItemProps?: DescriptionsItemProps | ((field: ProTableEditFieldType) => DescriptionsItemProps)
  }) => ReactNode
  item?: Record<string, any>
  mode: ProTableEditFieldMode
}

export interface ProTableEditFieldModalProps extends Omit<ShowModalConfig, 'content'> {}
// 编辑插件参数
export interface ProTableEditFieldConfig<R = any> {
  /** 详情 */
  onView?: <T = any>(item: R, mode: 'view' | 'edit') => Promise<ProTableResponse<T> | void> | void

  /** 增 */
  onAdd?: <T = any>(params: any) => Promise<ProTableResponse<T> | void | boolean> | void | boolean

  /** 改 */
  onEdit?: <T = any>(params: any, item: R) => Promise<ProTableResponse<T> | void | boolean> | void | boolean

  /** 编辑成功后刷新表格 */
  refreshAfterEdit?: boolean

  /** 新增成功后刷新表格 */
  refreshAfterAdd?: boolean

  /** 何时触发 onEdit */
  whenToTriggerOnEdit?: 'changed' | 'always'

  /** 单独配置编辑表单，此项存在时，columns 内配置将失效 */
  editFields?: ProTableEditFieldType[] | ((item: R | undefined, mode: ProTableEditFieldMode) => ProTableEditFieldType[])
  /** 单独配置新增表单，此项存在时，columns 内配置将失效 */
  addFields?: ProTableEditFieldType[] | ((item: undefined, mode: 'add') => ProTableEditFieldType[])
  /** 单独配置浏览区域，此项存在时，columns 内配置将失效 */
  viewFields?: ProTableEditFieldType[] | ((item: R, mode: 'view') => ProTableEditFieldType[])

  editFieldModalProps?:
    | ProTableEditFieldModalProps
    | ((item: R, mode: ProTableEditFieldMode) => ProTableEditFieldModalProps)
  addFieldModalProps?:
    | ProTableEditFieldModalProps
    | ((item: R, mode: ProTableEditFieldMode) => ProTableEditFieldModalProps)
  viewFieldModalProps?:
    | ProTableEditFieldModalProps
    | ((item: R, mode: ProTableEditFieldMode) => ProTableEditFieldModalProps)

  editFieldFormProps?: ProFormProps | ((item: R, mode: ProTableEditFieldMode) => ProFormProps)
  addFieldFormProps?: ProFormProps | ((item: R, mode: ProTableEditFieldMode) => ProFormProps)
  viewFieldFormProps?: ProFormProps | ((item: R, mode: ProTableEditFieldMode) => ProFormProps)

  editFieldGutter?: RowProps['gutter'] | ((item: R | undefined, mode: ProTableEditFieldMode) => RowProps['gutter'])
  viewFieldGutter?: ProTableEditFieldConfig['editFieldGutter']
  addFieldGutter?: ProTableEditFieldConfig['editFieldGutter']

  /** 是否清空查询表单空参数 */
  editFieldFilterEmptyParam?: boolean

  /** 是否清空查询表单空参数 */
  addFieldFilterEmptyParam?: boolean

  editFieldColumns?: number | ((item: R | undefined, mode: ProTableEditFieldMode) => number)
  editFieldLayout?: FormProps['layout'] | ((item: R | undefined, mode: ProTableEditFieldMode) => FormProps['layout'])
  renderModalEditFields?: (renderParams: ProTableEditFieldRenderParams) => ReactNode

  addFieldLayout?: ProTableEditFieldConfig['editFieldLayout']
  addFieldColumns?: ProTableEditFieldConfig['editFieldColumns']
  renderModalAddFields?: ProTableEditFieldConfig['renderModalEditFields']

  viewFieldLayout?: ProTableEditFieldConfig['editFieldLayout']
  viewFieldColumns?: ProTableEditFieldConfig['editFieldColumns']
  renderModalViewFields?: ProTableEditFieldConfig['renderModalEditFields']
}
