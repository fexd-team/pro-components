import React, { Fragment, isValidElement, memo } from 'react'
import { Actions, ActionsProps } from '@fexd/pro-utils'
// import { useWhyDidYouUpdate } from 'ahooks'

import Action from './Action'
import useActionPlugin from './index'

const defaultRenderAction = (actionProps: any = {}) => <Action {...actionProps} />

const ProTableActions = memo(function ProTableActions({ renderAction = defaultRenderAction, ...props }: ActionsProps) {
  const ActionPlugin = useActionPlugin(({ builtInActions }) => [builtInActions]) // 监听 action 配置变化

  return <Actions {...props} renderAction={renderAction} />
})

export default ProTableActions
