import { defaultProps } from '../useProps'
import createProTable, { ProTableType } from './createProTable'
import { builtInPlugins } from './builtInPlugins'

export const ProTable: ProTableType = createProTable(builtInPlugins, defaultProps)
export default ProTable

export * from './addon'
export * from './createProTable'
export * from './builtInPlugins'
export * from './useProTableController'
export * from './useProTableRef'
export * from './createProTableRef'
