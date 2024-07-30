import { get, isFunction, run } from '@fexd/tools'
import React, { forwardRef, useMemo, useRef } from 'react'
// import ReactDOM from 'react-dom/server'

import { deepMap, useMemoizedFn, useUpdate } from './helpers'
import { CoverableMark, CoverableProps, DefaultCoverableConfig } from './types'

export default function createComponent<Props extends Record<string, any> & { coverable?: never }, Ref, T>(
  useContent: (
    props: Props,
    ref: Ref,
  ) => {
    getDefaultCoverableConfig?: () => any
    coverableConfig: T
    content: any
  },
  {
    defaultProps,
    propsAreEqual,
  }: {
    defaultProps?: Props
    propsAreEqual?: Parameters<typeof React.memo>['1']
  } = {},
) {
  const Comp = React.memo(
    forwardRef(({ coverable: getCoverableProps, ...props }: any, ref: any) => {
      const triggerRender = useUpdate()
      const updateKeyPathMapRef = useRef<any>([])
      const getCoverableConfigRef = useRef<any>(() => null)
      const getDefaultCoverableConfigRef = useRef<any>(() => null)
      const updateConfig = useMemoizedFn(() => {
        const defaultCoverableConfig = run(getDefaultCoverableConfigRef.current)
        const fullCoverableConfig = run(getCoverableConfigRef.current)
        if ([defaultCoverableConfig, fullCoverableConfig].includes(null)) {
          return
        }
        const coverableProps = run(getCoverableProps, undefined, defaultCoverableConfig)

        updateKeyPathMapRef.current.map((keyPath) => {
          const coverableConfig = keyPath?.length === 0 ? fullCoverableConfig : get(fullCoverableConfig, keyPath)

          const overrideConfig = get(coverableProps, keyPath)
          if (overrideConfig) {
            run(coverableConfig, '__cover', overrideConfig)
          }
        })
      })
      React.useMemo(updateConfig, [getCoverableProps])
      const { content, coverableConfig, getDefaultCoverableConfig } = useContent(props as Props, ref)

      useMemo(() => {
        let isConfigReaded = false
        deepMap(coverableConfig, (item, key, keyPath) => {
          if (key && item?.__isCoverableProps) {
            updateKeyPathMapRef.current.push(keyPath)
            if (run(item?.__isConfigReaded)) {
              isConfigReaded = true
            }
          }

          return [true, item]
        })

        if ((coverableConfig as any)?.__isCoverableProps) {
          updateKeyPathMapRef.current.push([])
          if (run((coverableConfig as any)?.__isConfigReaded)) {
            isConfigReaded = true
          }
        }

        getDefaultCoverableConfigRef.current = getDefaultCoverableConfig
        getCoverableConfigRef.current = () => coverableConfig
        updateConfig()
        if (!isFunction(content) || isConfigReaded) {
          triggerRender()
        }
      }, [])

      return <>{run(content)}</>
    }),
    propsAreEqual,
  ) as any

  Comp.displayName = useContent?.name
  Comp.defaultProps = { ...defaultProps } as any

  // if (!stableExec) {
  //   try {
  //     ReactDOM.renderToString(<Comp __prevRender__ />)
  //     prevRenderSuccess = true
  //     console.log({
  //       prevRender__updateKeyPathMapRef,
  //       prevRender__getCoverableConfigRef,
  //       prevRender__getDefaultCoverableConfigRef,
  //     })
  //   } catch (e) {
  //     // console.log(e)
  //   }
  // }

  type CurrentCoverableProps = CoverableProps<T extends CoverableMark<any> ? T['__T__'] & T : T>
  type DefaultConfig = Omit<
    DefaultCoverableConfig<T extends CoverableMark<any> ? T['__T__'] & T : T>,
    'getConfig' | '__T__'
  >

  return Comp as React.FC<
    Omit<Props, 'coverable'> & {
      ref?: Ref
      coverable?: CurrentCoverableProps | ((defaultConfig: DefaultConfig) => CurrentCoverableProps)
    }
  > & {
    defaultProps: Omit<Props, 'coverable'> & {
      coverable?: CurrentCoverableProps
    }
    coverableProps: CurrentCoverableProps
  }
}
