/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
// import React, { ReactNode, ReactChild, ReactFragment, ReactPortal } from 'react'

import { delay, isArray, isObject } from '@fexd/tools'
import { useCoverable, CoverableValue } from '@fexd/pro-utils'

import {
  ProTableProps,
  ProTableColumnType,
  ProTableQueryFieldType,
  ProTableEditFieldType,
  ProTableTableActionType,
  ProTableBuiltInActionNames,
  ProTableBuiltInBatchActionNames,
  ProTableBuiltInIconActionNames,
  ProTableBuiltInColumnActionNames,
  ProTableTableActionPureType,
} from '../types'

export default function defineCoverableProps<T extends CoverableProTableProps>(
  value: T & CoverableProTableProps,
): CoverableValue<
  T &
    CoverableProTableProps & {
      getProps: () => ProTableProps
    },
  CoverableProTableConfig<T>
> {
  const getArrayLikeConfig = (config) => (isObject(config) ? Object.values(config) : isArray(config) ? config : config)
  const getProps = (config: any) => ({
    ...config,
    actions: getArrayLikeConfig(config.actions),
    iconActions: getArrayLikeConfig(config.iconActions),
    columnActions: getArrayLikeConfig(config.columnActions),
    batchActions: getArrayLikeConfig(config.batchActions),
    queryFields: getArrayLikeConfig(config.queryFields),
    addFields: getArrayLikeConfig(config.addFields),
    editFields: getArrayLikeConfig(config.editFields),
    viewFields: getArrayLikeConfig(config.viewFields),
  })

  return useCoverable.value({
    default: {
      ...value,
      getProps: (() => getProps(value)) as () => ProTableProps,
    },
    config: value as any as CoverableProTableConfig<T>,
    onCovered(current, config) {
      const nextConfig = useCoverable.merge(current, config)

      return {
        ...nextConfig,
        getProps: () => getProps(nextConfig),
      }
    },
  }) as any as CoverableValue<
    T &
      CoverableProTableProps & {
        getProps: () => ProTableProps
      },
    CoverableProTableConfig<T>
  >
}

type _CoverableProps<T extends Record<string, [any, any]>> = {
  [K in keyof T]?: Record<string, T[K][0]> | T[K][1]
}

type _CoverableConfig<V extends Record<string, [any, any]>, T extends Record<string, any>> = {
  // @ts-ignore
  [K in keyof V]?: CoverableObjectConfig<T[K], V[K][0]> | V[K][1]
}

export type CoverableObjectConfig<V, T> = V extends Record<string, any>
  ?
      | Record<keyof V, T>
      | {
          [key: string | number | symbol]: T
        }
  : V

type _CoverableProTablePropsMap = {
  actions: [ProTableTableActionType<ProTableBuiltInActionNames>, ProTableProps['actions']]
  iconActions: [ProTableTableActionType<ProTableBuiltInIconActionNames>, ProTableProps['iconActions']]
  columnActions: [
    (
      | ProTableTableActionPureType<ProTableBuiltInColumnActionNames>
      | ((item: any, ...args: any[]) => ProTableTableActionPureType<ProTableBuiltInColumnActionNames>)
    ),
    ProTableProps['columnActions'],
  ]
  batchActions: [ProTableTableActionType<ProTableBuiltInBatchActionNames>, ProTableProps['batchActions']]
  queryFields: [ProTableQueryFieldType, ProTableProps['queryFields']]
  addFields: [ProTableEditFieldType, ProTableProps['addFields']]
  editFields: [ProTableEditFieldType, ProTableProps['editFields']]
  viewFields: [ProTableEditFieldType, ProTableProps['viewFields']]
  columns: [ProTableColumnType, ProTableProps['columns']]
}

type _CoverableProTableProps = _CoverableProps<_CoverableProTablePropsMap>

export type CoverableProTableProps = _CoverableProTableProps & Omit<ProTableProps, keyof _CoverableProTablePropsMap>

type _CoverableProTableConfig<T extends CoverableProTableProps> = _CoverableConfig<_CoverableProTablePropsMap, T>

export type CoverableProTableConfig<T extends CoverableProTableProps> = Omit<T, keyof _CoverableProTablePropsMap> &
  (Omit<CoverableProTableProps, keyof _CoverableProTablePropsMap> & _CoverableProTableConfig<T>)
