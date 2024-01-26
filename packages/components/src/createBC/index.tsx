import { isFunction, run } from '@fexd/tools'
import { request, ServerRequest } from '@fexd/pro-utils'
import createLegacyBC from './createLegacyBC'
import createNextBC, { useConfigurable } from './createNextBC'

// import './configurable'
export * from './configurable'
export * from './createNextBC'
export * from './createLegacyBC'

function createBC<Props extends object, CProps extends object>(
  ...args: Parameters<typeof createLegacyBC<Props, CProps>>
): ReturnType<typeof createLegacyBC<Props, CProps>>

function createBC<Props extends object, CProps extends object>(
  ...args: Parameters<typeof createNextBC<Props, CProps>>
): ReturnType<typeof createNextBC<Props, CProps>>

function createBC<Props extends object, CProps extends object>(param1: any, param2?: any) {
  if (!isFunction(param1)) {
    return createLegacyBC<Props, CProps>(param1)
  }
  return createNextBC<Props, CProps>(param1, param2)
}
createBC.createApi = request.define
createBC.useConfigurable = useConfigurable
export { createBC, useConfigurable }
export default createBC
