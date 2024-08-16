/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { delay, isArray, isObject } from '@fexd/tools'
import { useCoverable, CoverableValue } from '@fexd/pro-utils'

import { ProFormProps, ProFieldValueFieldType } from './types'

export default function defineCoverableProps<T extends CoverableProFormProps>(
  value: T & CoverableProFormProps,
): CoverableValue<
  T &
    CoverableProFormProps & {
      getProps: () => ProFormProps
    },
  CoverableProFormConfig<T>
> {
  const getArrayLikeConfig = (config) => (isObject(config) ? Object.values(config) : isArray(config) ? config : config)
  const getProps = (config: any) => ({
    ...config,

    fields: getArrayLikeConfig(config.fields),
  })

  return useCoverable.value({
    default: {
      ...value,
      getProps: (() => getProps(value)) as () => ProFormProps,
    },
    config: value as any as CoverableProFormConfig<T>,
    onCovered(current, config) {
      const nextConfig = useCoverable.merge(current, config)

      return {
        ...nextConfig,
        getProps: () => getProps(nextConfig),
      }
    },
  }) as any as CoverableValue<
    T &
      CoverableProFormProps & {
        getProps: () => ProFormProps
      },
    CoverableProFormConfig<T>
  >
}

type _CoverableProps<T extends Record<string, [any, any]>> = {
  [K in keyof T]?: Record<string, T[K][0]> | T[K][1]
}

type _CoverableConfig<V extends Record<string, [any, any]>, T extends Record<string, any>> = {
  // @ts-ignore
  [K in keyof V]?: CoverableObjectConfig<T[K], V[K][0]> | V[K][1]
}

type CoverableObjectConfig<V, T> = V extends Record<string, any>
  ?
      | Record<keyof V, T>
      | {
          [key: string | number | symbol]: T
        }
  : V

type _CoverableProFormPropsMap = {
  fields: [ProFieldValueFieldType, ProFormProps['fields']]
}

type _CoverableProFormProps = _CoverableProps<_CoverableProFormPropsMap>

export type CoverableProFormProps = _CoverableProFormProps & Omit<ProFormProps, keyof _CoverableProFormPropsMap>

type _CoverableProFormConfig<T extends CoverableProFormProps> = _CoverableConfig<_CoverableProFormPropsMap, T>

export type CoverableProFormConfig<T extends CoverableProFormProps> = Omit<T, keyof _CoverableProFormPropsMap> &
  (Omit<CoverableProFormProps, keyof _CoverableProFormPropsMap> & _CoverableProFormConfig<T>)
