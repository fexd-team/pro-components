/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, useRef, useState, ReactNode } from 'react'
import { isObject, FrameProcess, debounce } from '@fexd/tools'
import { useInViewport, useUnmount, useDebounceFn, useSafeState } from 'ahooks'
import { Options as UseInViewportOptions } from 'ahooks/es/useInViewport'
import { DebounceOptions } from 'ahooks/es/useDebounce/debounceOptions'

import { Hook } from '../components'

export interface UseLazyRenderOptions extends UseInViewportOptions {}
export interface UseLazyRenderOptions extends DebounceOptions {}
export interface UseLazyRenderOptions {
  forceVisible?: boolean
  placeholder?: ReactNode
  placeholderWrapperClassName?: string
  content?: ReactNode
  debugLog?: boolean
}

let times = 0
const logRenderTimes = debounce(() => {
  console.log('lazy-render times:', times)
  times = 0
}, 128)

/**
  这段代码是导出一个自定义的 React Hook useLazyRender，可以用于实现组件的懒加载。它接受一些可选的配置参数，包括：

  - forceVisible: 强制显示内容，即不进行懒加载，直接渲染组件的内容。
  - placeholder: 懒加载时显示的占位组件。
  - placeholderWrapperClassName: 占位组件的样式类名。
  - content: 组件的内容。
  - debugLog: 是否启用调试模式，用于记录懒加载次数。

  该 Hook 内部使用了 ahooks 库中的 useInViewport 和 useDebounceFn 钩子来判断组件是否进入视口并进行防抖处理，以此实现懒加载。
  如果配置了 forceVisible，则直接渲染 content，否则渲染 placeholder。
  同时，该 Hook 也提供了一个可选的调试模式，用于记录组件被懒加载的次数。
*/

export default function useLazyRender({
  forceVisible,
  placeholder: placeholderNode,
  placeholderWrapperClassName,
  content,
  debugLog = false,
  ...lazyRenderConfig
}: UseLazyRenderOptions): ReactNode {
  const [visible, setVisible] = useSafeState(!!lazyRenderConfig ? false : true)

  useMemo(() => {
    if (!debugLog) {
      return
    }
    if (visible) {
      times++
      logRenderTimes()
    }
  }, [debugLog, visible])

  const placeholder = (
    <Hook>
      {() => {
        const ref = useRef<any>(null)
        const [inViewport] = useInViewport(ref, {
          threshold: 0,
          ...(isObject(lazyRenderConfig) ? (lazyRenderConfig as any) : {}),
        })
        const show = useDebounceFn(() => FrameProcess.defaultProcess.once(() => setVisible(true)), {
          wait: 128,
          ...(isObject(lazyRenderConfig) ? (lazyRenderConfig as any) : {}),
        })

        useMemo(() => {
          show.cancel()
          if (!inViewport) {
            return
          }
          show.run()
        }, [inViewport])

        useUnmount(show.run)

        return (
          <span className={placeholderWrapperClassName} ref={ref}>
            {placeholderNode}
          </span>
        )
      }}
    </Hook>
  )

  return visible || forceVisible ? content : placeholder
}
