import { ReactChild, ReactElement, ReactNode, ReactPortal } from 'react'
import { Required, ValuesType } from 'utility-types'

export type ToPrimitive<T> = T extends (...args: any) => any
  ? T
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends any[]
        ? T
        : T extends boolean
          ? boolean
          : T extends object
            ? ToPrimitiveObject<T>
            : T

export type ToPrimitiveObject<T> = {
  [K in keyof T]: T[K] extends object ? ToPrimitiveObject<T[K]> : ToPrimitive<T[K]>
}

export type CoverableMark<T> = {
  __T__?: T
}

export interface CoverableValueConfig<V, T> {
  default?: V
  config?: T
  onCovered?: (current: V, config: T) => any
}

export interface CoverableValue<V, T> extends CoverableValueConfig<V, T> {
  __isCoverableValue: () => true
}

type BasicPrimitiveTypes =
  | ((...args: any) => any)
  // | any[]
  // | null
  // | undefined
  | number
  | string
  | boolean

export type ExcludeCoverableTypes =
  | BasicPrimitiveTypes
  | symbol
  | bigint
  | ReactChild
  | ReactPortal
  | Iterable<ReactNode>
  | JSX.Element
  | ReactElement

export type DeepCoverable<T> = {
  [K in keyof T]: T[K] extends ExcludeCoverableTypes
    ? T[K]
    : T[K] extends CoverableValue<any, any>
      ? Required<T[K]>['default']
      : T[K] extends object
        ? DeepCoverable<T[K]>
        : T[K]
}

export type Coverable<T> = {
  getConfig: () => DeepCoverable<T>
} & CoverableMark<T>

export type CoverableProps<T> = {
  // @ts-ignore
  [K in keyof T]?: T[K]['__isCoverableProps'] extends boolean
    ? T[K]
    : T[K] extends any[]
      ? T[K] | Record<number, CoverableProps<ValuesType<T[K]>>>
      : T[K] extends BasicPrimitiveTypes
        ? ToPrimitive<T[K]>
        : T[K] extends ExcludeCoverableTypes
          ? T[K]
          : T[K] extends CoverableMark<any>
            ? CoverableProps<T[K]['__T__']>
            : T[K] extends CoverableValue<any, any>
              ? CoverableProps<T[K]['config']>
              : T[K] extends object
                ? CoverableProps<T[K]>
                : T[K]
} & {
  __isCoverableProps?: true
}

export type DefaultCoverableConfig<T> = {
  readonly [K in keyof T]: T[K] extends ExcludeCoverableTypes
    ? T[K]
    : T[K] extends CoverableMark<any>
      ? DefaultCoverableConfig<Required<T[K]>['__T__']>
      : T[K] extends CoverableValue<any, any>
        ? Readonly<Required<T[K]>['default']>
        : T[K] extends object
          ? DefaultCoverableConfig<T[K]>
          : T[K]
}

// export type CurrentCoverableProps<T> = CoverableProps<T extends CoverableMark<any> ? T & T['__T__'] : T>
// export type DefaultConfig<T> = DefaultCoverableConfig<T extends CoverableMark<any> ? T & T['__T__'] : T>
