import component from './component'
import * as helpers from './helpers'
import props from './props'
import rawUseCoverable from './useCoverable'
import value from './value'

export const useCoverable = Object.assign(rawUseCoverable, {
  component,
  props,
  value,
  merge: helpers.builtInMerge,
  helpers,
})
export * from './types'
export default useCoverable
