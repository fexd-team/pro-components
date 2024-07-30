import { pickBy, isUndefined, memoize, run, isExist } from '@fexd/tools'

import { getAllFieldFromColumn } from '../plugins/valueType/helpers'
import { ProTableEditFieldType, ProTableQueryFieldType, ProTableColumnType, ProTableProps } from '../types'
import { DefinedProTableColumns, DefinedProTableFields } from './enhanceConfigs.types'

export { default as defineCoverableProps } from './defineCoverableProps'

export const extendColumn = (
  columnValue: any, // ProTableColumnType | ((...args: any[]) => ProTableColumnType),
  ...args: any[]
): ProTableColumnType => {
  const column: ProTableColumnType = run(columnValue, undefined, ...args)

  return pickBy(
    {
      label: column?.label ?? column?.title,
      name: column?.name ?? (column?.dataIndex as string),
      type: column?.type ?? column?.valueType,
      options: column?.options ?? column?.valueEnum,
      tooltip: column?.tooltip,
      format: column?.format,
      unit: column?.unit,
      fromNowTooltip: column?.fromNowTooltip,
      numberLocale: column?.numberLocale,
      currencyLocale: column?.currencyLocale,
      builtInRule: column?.builtInRule,
      copyable: column?.copyable,
      lazyRender: column?.lazyRender,
    },
    (value) => !isUndefined(value),
  )
}

export const extendField = (
  fieldValue: ProTableEditFieldType | (() => ProTableEditFieldType),
  ...args: any[]
): ProTableEditFieldType => {
  const field: ProTableEditFieldType = run(fieldValue, undefined, ...args)

  return pickBy(field, (value) => !isUndefined(value))
}

export const defineColumns = <T extends Record<string, ProTableColumnType | ((...args: any[]) => ProTableColumnType)>>(
  value: T | (() => T),
): DefinedProTableColumns<T> => {
  const getComputedValue = memoize(() => run(value))
  const getAllEntries = memoize(() =>
    Object.entries(getComputedValue()).map(([key, getColumn]) => [key, run(getColumn)]),
  ) as any as () => [string, any][]
  const getConfigs = memoize(() => getAllEntries().map(([, column]) => column)) as any as () => ProTableColumnType[]
  const getAllFieldConfigs = memoize(() =>
    getAllEntries().map(([key, column]) => [key, getAllFieldFromColumn(column)]),
  ) as any as () => [string, ReturnType<typeof getAllFieldFromColumn>][]
  const getExpandViewFields = memoize(() =>
    getAllFieldConfigs().reduce(
      (fields, [key, allFields]) =>
        isExist(allFields?.expandViewField)
          ? {
              ...fields,
              [key]: allFields?.expandViewField,
            }
          : fields,
      {},
    ),
  ) as any as () => Record<string, ProTableEditFieldType>
  const getQueryFields = memoize(() =>
    getAllFieldConfigs().reduce(
      (fields, [key, allFields]) =>
        isExist(allFields?.queryField)
          ? {
              ...fields,
              [key]: allFields?.queryField,
            }
          : fields,
      {},
    ),
  ) as any as () => Record<string, ProTableQueryFieldType>
  const getEditFields = memoize(() =>
    getAllFieldConfigs().reduce(
      (fields, [key, allFields]) =>
        isExist(allFields?.editField)
          ? {
              ...fields,
              [key]: allFields?.editField,
            }
          : fields,
      {},
    ),
  ) as any as () => Record<string, ProTableEditFieldType>

  const getViewFields = memoize(() =>
    getAllFieldConfigs().reduce(
      (fields, [key, allFields]) =>
        isExist(allFields?.viewField)
          ? {
              ...fields,
              [key]: allFields?.viewField,
            }
          : fields,
      {},
    ),
  ) as any as () => Record<string, ProTableEditFieldType>
  const getAddFields = memoize(() =>
    getAllFieldConfigs().reduce(
      (fields, [key, allFields]) =>
        isExist(allFields?.addField) ||
        (isExist(allFields?.editField) && (allFields?.column?.addField as any) !== false)
          ? {
              ...fields,
              [key]: allFields?.addField ?? allFields?.editField,
            }
          : fields,
      {},
    ),
  ) as any as () => Record<string, ProTableEditFieldType>

  const getExpandViewFieldKeys = memoize(() => Object.keys(getExpandViewFields())) as any as () => string[]
  const getQueryFieldKeys = memoize(() => Object.keys(getQueryFields())) as any as () => string[]
  const getEditFieldKeys = memoize(() => Object.keys(getEditFields())) as any as () => string[]
  const getViewFieldKeys = memoize(() => Object.keys(getViewFields())) as any as () => string[]
  const getAddFieldKeys = memoize(() => Object.keys(getAddFields())) as any as () => string[]
  const getRawConfig = () => run(value)

  const extendMethod = {
    getConfigs,
    getRawConfig,
    getViewFieldKeys,
    getQueryFieldKeys,
    getAddFieldKeys,
    getEditFieldKeys,
    getExpandViewFieldKeys,
    getViewFields,
    getQueryFields,
    getAddFields,
    getEditFields,
    getExpandViewFields,
    __isProTableColumns: true as true,
  }

  return Object.assign(extendMethod, run(value)) as any as typeof extendMethod & T
}

export const defineFields = <
  T extends Record<string, ProTableEditFieldType | ((...args: any[]) => ProTableEditFieldType)>,
>(
  value: T | (() => T),
): DefinedProTableFields<T> => {
  const getRawConfig = () => run(value)
  const getConfigs = () => Object.values(run(value)).map((item) => run(item))

  const extendMethod = {
    getConfigs,
    getRawConfig,
    __isProTableFields: true as true,
  }

  return Object.assign(extendMethod, run(value)) as any as typeof extendMethod & T
}

export const defineColumn = <T extends ProTableColumnType>(value: T | (() => T)) => run(value) as T
export const defineField = <T extends ProTableEditFieldType>(value: T | (() => T)) => run(value) as T
