import React, { Component, useRef } from 'react'
import { run } from '@fexd/tools'
import { ReloadOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Result, Button } from 'antd'
import { useHover } from 'ahooks'

import Hook from './Hook'
import Action from './Action'

export interface ErrorBoundaryProps {
  mode?: 'page' | 'inline'
  console?: boolean
  onError?: (error: Error) => void
  children?: React.ReactNode
  fallback?: ((error: Error, retry: () => void) => React.ReactNode) | React.ReactNode
}

export interface ErrorBoundaryState {
  error?: Error
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    console: false,
    mode: 'page',
    fallback: (error: Error, retry: () => void, boundaryProps: ErrorBoundaryProps) =>
      boundaryProps?.mode === 'page' ? (
        <Result
          className="f-pro-utils-error-boundary-result"
          status="error"
          title={error?.stack}
          extra={
            <Button type="primary" onClick={retry}>
              Retry
            </Button>
          }
        />
      ) : (
        <Hook>
          {() => {
            const ref = useRef(null)
            const isHovering = useHover(ref)

            return (
              <span ref={ref}>
                <Action
                  size="large"
                  icon={isHovering ? <ReloadOutlined /> : <ExclamationCircleFilled />}
                  tooltip={error?.message}
                  onClick={retry}
                  danger={!isHovering}
                  type="link"
                />
              </span>
            )
          }}
        </Hook>
      ),
  }

  state = {
    error: undefined,
  }

  componentDidCatch(error: Error) {
    const { onError } = this.props

    run(onError, undefined, error)

    this.setState({
      error,
    })
  }

  retry = () => {
    this.setState({
      error: undefined,
    })
  }

  render() {
    const { children, fallback } = this.props
    const { error } = this.state

    return (error ? run(fallback, undefined, error, this.retry, this.props) : children) as JSX.Element
  }
}
