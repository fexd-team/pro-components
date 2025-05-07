import React, { Fragment, isValidElement, memo, useRef } from 'react'
import { Space, SpaceProps } from 'antd'
import { run, isString, isObject, isArray, isFunction } from '@fexd/tools'

import useAutoLoading from '../hooks/useAutoLoading'
import Action, { ActionProps } from './Action'
import { useSafeState } from 'ahooks'

const defaultRenderAction = (actionProps: any = {}) => <Action {...actionProps} />
// import { useWhyDidYouUpdate } from 'ahooks'

export type ActionConfig = ActionProps & {
  builtIn?: string
}

export interface ActionsProps extends SpaceProps {
  loading?: boolean
  disabled?: boolean
  configs: ActionConfig[] | ((...args: any[]) => ActionConfig[])
  shareAutoLoading?: boolean
  debouncedAutoLoading?: boolean
  noWrapper?: boolean
  renderWrapper?: (nodes: React.ReactNode[]) => any
  className?: string
  spaceSize?: SpaceProps['size']
  getBuiltInActions?: () => any
  renderAction?: (actionProps: ActionConfig) => any
  actionParams?: any[] | ((...args: any[]) => any[])
}

export const getActionNodes = (configs: any[], { builtInActions, getActionParams, renderAction }: any) =>
  configs
    .map((getActionConfig: any, idx: any) => {
      const node = run<any>(() => {
        let actionParams: any[] = run(getActionParams)
        if (!isArray(actionParams)) {
          actionParams = [actionParams]
        }
        const actionConfig = run<any>(getActionConfig, undefined, ...actionParams)

        function renderBuiltInAction(builtInActionConfig: any): any {
          const { builtIn: actionName, ...restProps } = builtInActionConfig
          const builtInAction = run<any>(builtInActions, actionName, ...actionParams)

          if (isObject(builtInAction) && 'builtIn' in builtInAction) {
            return renderBuiltInAction({
              ...builtInAction,
              ...restProps,
            })
          }

          if (!!restProps?.content) {
            restProps.children = restProps.content
          }

          if (isValidElement(builtInAction)) {
            return React.cloneElement(builtInAction, restProps)
          }

          if (isObject(builtInAction)) {
            return {
              ...builtInAction,
              ...restProps,
            }
          }

          return builtInAction
        }

        // 尝试获取 builtInAction
        const action = run<any>(() => {
          if (isString(actionConfig)) {
            const builtInAction = run<any>(builtInActions, actionConfig, ...actionParams)
            if (isObject(builtInAction) && 'builtIn' in builtInAction) {
              return renderBuiltInAction(builtInAction)
            }

            return builtInAction
          }

          if (isObject(actionConfig) && 'builtIn' in actionConfig) {
            return renderBuiltInAction(actionConfig)
          }

          return actionConfig
        })

        if (isValidElement(action)) {
          return action
        }

        if (isObject(action)) {
          if (action?.hidden === true) {
            return null
          }

          return renderAction(action)
        }

        return null
      })
      if (!node) {
        return undefined
      }

      return <Fragment key={idx}>{node}</Fragment>
    })
    .filter(Boolean)

const Actions = memo(function Actions({
  loading: propLoading,
  disabled: propDisabled,
  shareAutoLoading = false,
  debouncedAutoLoading = true,
  className,
  spaceSize,
  noWrapper = false,
  renderWrapper = noWrapper ? (nodes) => <>{nodes}</> : undefined,
  configs: getConfigs,
  getBuiltInActions,
  renderAction = defaultRenderAction,
  actionParams: getActionParams,
  ...props
}: ActionsProps) {
  const builtInActions = getBuiltInActions?.() ?? {}

  const {
    onAction,
    loading: debouncedLoading,
    realTimeLoading,
  } = useAutoLoading({
    loading: propLoading,
    action: (onClick: any) => run(onClick),
  })

  const loading = debouncedAutoLoading ? debouncedLoading : realTimeLoading
  const [loadingActionIdx, setLoadingActionIdx] = useSafeState<any>(undefined)

  const configs = run(() => {
    const configs = run<any[]>(getConfigs)

    if (!isArray(configs)) {
      return []
    }

    const filteredConfigs = configs.filter((config) => config?.hidden !== true)

    if (shareAutoLoading) {
      return filteredConfigs.map((config, idx) => ({
        ...config,
        disabled: propDisabled || config?.disabled || (loadingActionIdx !== idx && loading),
        onClick: (...args: any[]) =>
          run(onAction, undefined, async () => {
            setLoadingActionIdx(idx)
            const res = await run(config, 'onClick', ...args)
            setLoadingActionIdx(undefined)
            return res
          }),
      }))
    }
    return filteredConfigs
  })

  if (configs?.length === 0) {
    return null
  }

  const actionNodes = getActionNodes(configs, { builtInActions, getActionParams, renderAction })

  if (isFunction(renderWrapper)) {
    return renderWrapper(actionNodes)
  }

  return (
    <Space {...props} size={spaceSize} className={className}>
      {actionNodes}
    </Space>
  )
})

export default Actions
