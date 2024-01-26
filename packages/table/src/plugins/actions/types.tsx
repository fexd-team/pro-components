import { ReactNode } from 'react'
import { ButtonActionType, SwitchActionType, UniteOmit } from '@fexd/pro-utils'

import { ProTableResponse } from '../queryField/types'
import { ProTableColumnType } from '../table/types'

export interface ProTableButtonActionType<T extends string = string> extends ButtonActionType {
  builtIn?: T
  hidden?: boolean
}

export interface ProTableTableSwitchActionType<T extends string = string> extends SwitchActionType {
  builtIn?: T
}

export type ProTableTableActionPureType<T extends string = string> =
  | UniteOmit<T>
  | ProTableButtonActionType<T>
  | ProTableTableSwitchActionType<T>
  | Omit<ReactNode, T>

export type ProTableTableActionType<T extends string = string> =
  | ProTableTableActionPureType<T>
  | ((...args: any[]) => ProTableTableActionPureType<T>)

export type ProTableBuiltInActionType = ReactNode | ((...args: any[]) => ReactNode)

// 动作插件参数
export interface ProTableActionPluginConfig<R = any> {
  /** 表格按钮动作，目前内置了新增动作 */
  actions?: ProTableTableActionType<'add'>[]

  /** 表格项动作，目前内置了查看详情、编辑、删除动作 */
  columnActions?: (
    | ProTableTableActionPureType<'view' | 'edit' | 'edit-icon' | 'table-edit'>
    | ((item: R, ...args: any[]) => ProTableTableActionPureType<'view' | 'edit' | 'edit-icon' | 'table-edit'>)
  )[]

  /** 表格 icon 按钮动作，目前内置了刷新、列设置动作 */
  iconActions?: ProTableTableActionType<'refresh' | 'table-size' | 'fullscreen'>[]

  /** 多选动作，目前内置了批量删除动作 */
  batchActions?: ProTableTableActionType<'delete'>[]

  /** 多选动作（废弃），目前内置了批量删除动作 */
  multipleActions?: ProTableActionPluginConfig<R>['batchActions']
  /** 是否固定动作栏到右侧 */
  fixColumnActions?: boolean
  builtInActions?: {
    actions?: Record<string, ProTableBuiltInActionType>
    iconActions?: Record<string, ProTableBuiltInActionType>
    batchActions?: Record<string, ProTableBuiltInActionType>
    columnActions?: Record<string, ProTableBuiltInActionType>
  }
  /** 删 */
  onDelete?: <T = any>(target: R | R[]) => Promise<ProTableResponse<T> | void> | void
  /** 表格项动作 column 的配置 */
  columnActionsConfig?: ProTableColumnType<R>
}
