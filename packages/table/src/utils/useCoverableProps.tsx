import { useCoverable, Coverable } from '@fexd/pro-utils'
import { useMemoizedFn } from 'ahooks'

import { ProTableProps } from '../types'
import defineCoverableProps, { CoverableProTableProps, CoverableProTableConfig } from './defineCoverableProps'

export default function useCoverableProps<T extends CoverableProTableProps>(
  value: T & CoverableProTableProps,
): Coverable<
  T &
    CoverableProTableProps & {
      getProps: () => ProTableProps
    },
  CoverableProTableConfig<T>
> & {
  getProps: () => ProTableProps
} {
  const config = defineCoverableProps(value)

  const coverableConfig = useCoverable(config) as any
  const raw_getConfig = coverableConfig.getConfig.bind(coverableConfig)

  const getProps = useMemoizedFn(() => {
    const finalConfig = raw_getConfig()

    return finalConfig?.getProps?.()
  })

  return Object.assign(coverableConfig, {
    getProps,
  })
}
