import { useCoverable, Coverable } from '@fexd/pro-utils'
import { useMemoizedFn } from 'ahooks'

import { ProTableProps } from '../types'
import defineCoverableProps, { CoverableProTableProps, CoverableProTableConfig } from './defineCoverableProps'

const REF_KEYS = ['ref', 'tableRef', 'formRef'] as const

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
  const extractedRefs: Record<string, any> = {}
  const safeValue = { ...value } as any
  for (const key of REF_KEYS) {
    if (key in safeValue) {
      extractedRefs[key] = safeValue[key]
      delete safeValue[key]
    }
  }

  const config = defineCoverableProps(safeValue)

  const coverableConfig = useCoverable(config) as any
  const raw_getConfig = coverableConfig.getConfig.bind(coverableConfig)

  const getProps = useMemoizedFn(() => {
    const finalConfig = raw_getConfig()
    const props = finalConfig?.getProps?.() ?? {}

    for (const key of REF_KEYS) {
      if (key in extractedRefs && !(key in props)) {
        props[key] = extractedRefs[key]
      }
    }

    return props
  })

  return Object.assign(coverableConfig, {
    getProps,
  })
}
