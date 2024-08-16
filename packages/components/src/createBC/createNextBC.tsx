/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useMemo, useRef } from 'react'
import { run } from '@fexd/tools'
import { request, ServerRequest, Hook } from '@fexd/pro-utils'
import { useLatest, useMount, useUpdate } from 'ahooks'
import { ConfigurableProps, createConfigurable } from './configurable'

const propsContext = React.createContext<any>(null)

export function useConfigurable<T>(config: T | (({ getConfig }: { getConfig: () => any }) => T)) {
  const configRef = useLatest(config)
  const _getFinalConfig = useRef<any>(undefined)
  const getConfig: any = () => run(_getFinalConfig.current)
  const useInnerConfigurable = useMemo(
    () =>
      createConfigurable(() => {
        const update = useUpdate()
        useMount(update) // 让 getConfig 可生效

        return run(configRef.current, undefined, { getConfig }) as T
      }),
    [],
  )

  const props = useContext(propsContext) ?? {}
  const realConfig = useInnerConfigurable(props)
  _getFinalConfig.current = () => realConfig
  const render = (render?: JSX.Element | null | (() => JSX.Element | null)) => ({
    render,
    config: run(configRef.current, undefined, { getConfig }) as T,
  })
  // @ts-ignore
  realConfig.render = render

  return realConfig as typeof realConfig & { render: typeof render }
}

export default function createNextBC<Props extends object, CProps extends object>(
  useComponentConfig: (
    props: Props,
    forwardRef: React.ForwardedRef<any>,
  ) => {
    configurable?: CProps
    config?: CProps
    render?: JSX.Element | null | (() => JSX.Element | null)
    content?: JSX.Element | null
  },
  {
    defaultProps,
    propsAreEqual,
  }: {
    defaultProps?: Props
    propsAreEqual?: Parameters<typeof React.memo>['1']
  } = {},
) {
  type BCProps = ConfigurableProps<() => CProps> & Props

  const Comp: React.FC<BCProps> & {
    propTypes: BCProps
  } = React.memo(
    React.forwardRef((props: BCProps, forwardRef) => (
      <propsContext.Provider value={props}>
        <Hook>
          {() => {
            const { render, content } = useComponentConfig(props, forwardRef)
            return content ?? run(render) ?? null
          }}
        </Hook>
      </propsContext.Provider>
    )),
    propsAreEqual,
  ) as any

  Comp.displayName = useComponentConfig.name
  Comp.defaultProps = { ...defaultProps } as any

  return Comp
}

createNextBC.useConfigurable = useConfigurable
export { createNextBC }
