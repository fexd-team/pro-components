import { ProTableEditFieldType, ProTableQueryFieldType, ProTableColumnType } from '../types'

export type DefinedProTableColumns<
  T extends Record<string, ProTableColumnType | ((...args: any[]) => ProTableColumnType)> = Record<
    string,
    ProTableColumnType | ((...args: any[]) => ProTableColumnType)
  >,
> = {
  getConfigs: () => ProTableColumnType[]
  getRawConfig: () => T
  getViewFieldKeys: () => string[]
  getQueryFieldKeys: () => string[]
  getAddFieldKeys: () => string[]
  getEditFieldKeys: () => string[]
  getExpandViewFieldKeys: () => string[]
  getViewFields: () => Record<string, ProTableEditFieldType>
  getQueryFields: () => Record<string, ProTableQueryFieldType>
  getAddFields: () => Record<string, ProTableEditFieldType>
  getEditFields: () => Record<string, ProTableEditFieldType>
  getExpandViewFields: () => Record<string, ProTableEditFieldType>
  __isProTableColumns: true
}

export type DefinedProTableFields<
  T extends Record<string, ProTableEditFieldType | ((...args: any[]) => ProTableEditFieldType)> = Record<
    string,
    ProTableEditFieldType | ((...args: any[]) => ProTableEditFieldType)
  >,
> = {
  getConfigs: () => ProTableEditFieldType[]
  getRawConfig: () => T
  __isProTableFields: true
}
