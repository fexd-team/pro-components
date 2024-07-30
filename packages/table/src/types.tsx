import editField from './plugins/editField'
import queryField from './plugins/queryField'
import table from './plugins/table'
import valueType from './plugins/valueType'
import actions from './plugins/actions'
import config from './plugins/config'
import modal from './plugins/modal'

import { ProTableQueryFieldPluginConfig } from './plugins/queryField/types'
export * from './plugins/queryField/types'

import { ProTableEditFieldConfig } from './plugins/editField/types'
export * from './plugins/editField/types'

import { ProTableActionPluginConfig } from './plugins/actions/types'
export * from './plugins/actions/types'

import { ProTablePluginConfig } from './plugins/table/types'
export * from './plugins/table/types'

export * from './utils/enhanceConfigs.types'

export interface ProTableBuiltInPlugins {
  [key: string]: any
  editField: ReturnType<typeof editField>
  queryField: ReturnType<typeof queryField>
  table: ReturnType<typeof table>
  valueType: ReturnType<typeof valueType>
  actions: ReturnType<typeof actions>
  config: ReturnType<typeof config>
  modal: ReturnType<typeof modal>
}

export interface ProTableProps<R = any> extends ProTableActionPluginConfig<R> {}
export interface ProTableProps<R = any> extends ProTableQueryFieldPluginConfig<R> {}
export interface ProTableProps<R = any> extends ProTableEditFieldConfig<R> {}
export interface ProTableProps<R = any> extends ProTablePluginConfig<R> {}
export interface ProTableProps<R = any> {
  rawProps?: ProTableProps<R>
  tableRef?: React.Ref<ProTableBuiltInPlugins> | undefined
}
