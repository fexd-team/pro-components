import { useCoverable, Coverable } from '@fexd/pro-utils'
import { useMemoizedFn } from 'ahooks'

import { ProFormProps } from './types'
import defineCoverableProps, { CoverableProFormProps, CoverableProFormConfig } from './defineCoverableProps'

export default function useCoverableProps<T extends CoverableProFormProps>(
  value: T & CoverableProFormProps,
): Coverable<
  T &
    CoverableProFormProps & {
      getProps: () => ProFormProps
    },
  CoverableProFormConfig<T>
> & {
  getProps: () => ProFormProps
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
