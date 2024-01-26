import { ReactNode } from 'react'
import { FormProps, FormInstance, RowProps, message } from 'antd'
import { ArgsProps as NotificationArgsProps } from 'antd/es/notification'
import { ArgsProps as MessageArgsProps } from 'antd/es/message'
import { Options as UseRequestOptions, Result as UseRequestResult } from 'ahooks/es/useRequest/src/types'
import { ProFieldValueFieldType, ProFormRenderParams } from '@fexd/pro-form'
import { UseProStateOptions, ButtonActionType } from '@fexd/pro-utils'

export interface ProTableResponse<T = any> {
  [key: string]: any
  success: boolean
  data?: T
  message?: string | MessageArgsProps
  notification?: string | NotificationArgsProps
}

export interface ProTableQueryFieldType extends ProFieldValueFieldType {
  hook?: (params: {
    [key: string]: any
    form: FormInstance
  }) => Omit<ProTableQueryFieldType, 'hook'> | void | undefined | null | boolean | ReactNode
}

export interface ProTableQueryFieldRenderParams extends ProFormRenderParams<ProTableQueryFieldType> {
  rawActions: ReactNode
  actions: ReactNode
  fold: ReactNode
  query: ReactNode
  reset: ReactNode
  showMore: boolean
}

// 查询插件参数
export interface ProTableQueryFieldPluginConfig<R = any> {
  /** 查询动作 */
  onQuery?:
    | (<T = any>(params: any, extraParams: any) => Promise<ProTableResponse<R[]> | R[] | void>)
    | UseRequestResult<any, any>

  /** 是否手动请求，默认为 false */
  manualQuery?: boolean

  /** 查询表单一行 N 个，默认值 4, */
  queryFieldColumns?: number
  queryFieldGutter?: RowProps['gutter']
  queryFieldLayout?: FormProps['layout']
  /** 是否清空查询表单空参数 */
  queryFieldFilterEmptyParam?: boolean
  /** 重置查询表单后是否刷新 */
  queryFieldRefreshAfterReset?: boolean

  /** 查询表单默认展示前 N 行，默认值 1, */
  queryFieldDefaultLines?: number

  /** 查询表单默认展示前 N 个, 无默认值，如果使用此项将覆盖 queryFieldDefaultLines 行为 */
  queryFieldDefaultLength?: number

  /** 单独配置搜索表单，此项存在时，columns 内配置将失效 */
  queryFields?: ProTableQueryFieldType[] | ProTableQueryFieldType[][]

  /** 搜索表单项的排序 */
  queryFieldOrder?: string[]

  /** 是否隐藏查询表单 */
  hideQueryFields?: boolean
  /** 是否回车键触发表单查询 */
  queryFieldTriggerOnEnter?: boolean

  /** 查询表单服务的配置，见 https://ahooks.js.org/zh-CN/hooks/use-request/basic#options */
  queryFieldServiceOptions?: UseRequestOptions<any, any>

  renderQueryFields?: (params: ProTableQueryFieldRenderParams) => ReactNode
  /** 参数持久化 key 值 */
  queryFieldPersistKey?: string

  /** 参数持久化类型，默认为 sessionStorage */
  queryFieldPersistType?: UseProStateOptions<any>['persist']

  /** 参数持久化 Form 部分排除项的 value key 名 */
  queryFieldPersistFormKeyExcludes?: string[]

  /** 参数持久化分页部分排除项的 value key 名 */
  queryFieldPersistPaginationParamsKeyExcludes?: ('page' | 'pageSize' | Omit<string, 'page' | 'pageSize'>)[]

  /** 是否持久化分页部分，默认存在 queryFieldPersistKey 则持久化 */
  queryFieldPersistPaginationParams?: boolean

  /** 是否持久化 Form 部分，默认存在 queryFieldPersistKey 则持久化 */
  queryFieldPersistForm?: boolean
  /** 当重置按钮点击时的回调 */
  onQueryFieldReset?: (...args: any) => any
  /** 查询区域按钮排序 */
  queryFieldActionSortList?: ('query' | 'reset' | 'fold' | 'text-fold')[]

  queryFieldFoldActionProps?: ButtonActionType
  queryFieldTextFoldActionProps?: ButtonActionType
  queryFieldQueryActionProps?: ButtonActionType
  queryFieldResetActionProps?: ButtonActionType
}
