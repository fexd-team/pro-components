import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { run } from '@fexd/tools'
import { useSafeState } from 'ahooks'

export default function reactI18nshell(i18n: any) {
  const genT =
    () =>
    (key: string = '', ...args: any[]) =>
      i18n.t(key, ...args)

  function useI18n() {
    const [t, setT] = useState(genT)
    const jsxT = useCallback((key: string = '', ...args: any[]) => t(`${key}@jsx`, ...args), [t])

    useEffect(() => {
      const listener = () => {
        setT(genT)
      }
      i18n.eventBus.on('change', listener)

      return () => i18n.eventBus.off('change', listener)
    }, [])

    return {
      t,
      jsxT,
    }
  }

  const withI18n =
    ({ fallback = null }: { fallback?: React.ReactNode | null } = {}) =>
    (Component: any): React.Component => {
      function WrappedComponent({ forwardedRef, ...props }: any): JSX.Element {
        const [ready, setReady] = useSafeState(() => {
          const ready = !!i18n.lng

          if (!ready) {
            i18n.eventBus.once('change', () => setReady(true))
          }

          return ready
        })

        const { t } = useI18n()

        return ready ? <Component {...props} t={t} ref={forwardedRef} /> : run(fallback)
      }

      const ForwardedRefHOC = forwardRef((props, ref) => <WrappedComponent {...props} forwardedRef={ref} />)

      return (hoistStatics as any)(ForwardedRefHOC, Component) as React.Component
    }

  function FormattedMessage({ value, config }: { value: string; config?: Record<string, any> }) {
    const { t } = useI18n()

    return t(value, config)
  }

  return { withI18n, useI18n, FormattedMessage, useTranslation: useI18n }
}
