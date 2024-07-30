import { builtInMerge } from './helpers'
import { CoverableValue, CoverableValueConfig } from './types'

export default function createValue<V, T>(valueConfig: CoverableValueConfig<V, T>) {
  return {
    onCovered: (current, config) => builtInMerge(current, config),
    ...valueConfig,
    __isCoverableValue: () => true,
  } as CoverableValue<V, T>
}
