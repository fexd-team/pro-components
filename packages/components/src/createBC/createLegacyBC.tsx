// translateModules:["@risk-bc/review"]

import React from 'react'
import { run } from '@fexd/tools'
import { ProTable } from '@fexd/pro-table'
import { request, ServerRequest } from '@fexd/pro-utils'

import createNextBC, { useConfigurable } from './createNextBC'

export default function createLegacyBC<Props extends object, CProps extends object>({
  defaultProps,
  configurable: useUserConfigurable,
  render,
  propsAreEqual,
}: {
  defaultProps?: Props
  configurable?: (
    props: Props,
    helpers: {
      // createConfig: typeof createConfig
      createApi: typeof request.define
      defineProTableColumns: typeof ProTable.defineColumns
      getFinalConfig: () => Record<string, any>
    },
  ) => CProps
  render: (
    props: Props & {
      config: CProps & {
        request: ServerRequest
      }
    },
    forwardRef: React.ForwardedRef<any>,
  ) => JSX.Element | null
  propsAreEqual?: Parameters<typeof React.memo>['1']
}) {
  let _getFinalConfig
  const getConfig: any = () => run(_getFinalConfig)
  const Comp = createNextBC<Props, CProps>(
    (props: Props) => {
      const configurable = useUserConfigurable?.(props, {
        createApi: request.define,
        defineProTableColumns: ProTable.defineColumns,
        getFinalConfig: getConfig as any,
      })
      const config = useConfigurable((helpers, ...args) => {
        _getFinalConfig = () => helpers.getConfig()
        return run(configurable, undefined, helpers, ...args)
      })

      return {
        content: render(
          {
            ...props,
            config,
          },
          null,
        ),
      }
    },
    {
      defaultProps,
      propsAreEqual,
    },
  )

  return Comp
}
createLegacyBC.createApi = request.define
export { createLegacyBC }
