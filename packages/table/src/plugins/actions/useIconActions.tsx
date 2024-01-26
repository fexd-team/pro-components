import React, { memo, useMemo } from 'react'
import { message } from 'antd'
import { SettingOutlined, ReloadOutlined } from '@ant-design/icons'
import { useSetState, useMemoizedFn, useLatest } from 'ahooks'
import { SetState } from 'ahooks/es/useSetState'

import { useProps } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import { ProTableBuiltInActionType, ProTableTableActionType } from '../../types'
import Actions from './Actions'
import Action from '../actions/Action'

const RefreshButton = memo(function RefreshButton({ ...props }: any) {
  const queryField = useQueryFieldPlugin(({ loading }) => [loading])
  const { loading, refresh } = queryField

  return (
    <Action
      actionType="button"
      loading={loading}
      icon={<ReloadOutlined />}
      onClick={() => refresh()}
      // tooltip={tooltip}
      {...props}
      type="text"
    />
  )
})

// 图标动作
export default function useIconActions(): {
  iconActions: Record<string, ProTableBuiltInActionType>
  iconActionConfigs: ProTableTableActionType<'refresh' | 'table-size' | 'fullscreen'>[]
  setIconActions: SetState<Record<string, ProTableBuiltInActionType>>
  renderIconActions: () => JSX.Element
} {
  const { iconActions: iconActionConfigs, builtInActions } = useProps()
  const latestIconActionConfigs = useLatest(iconActionConfigs)
  const [iconActions, setIconActions] = useSetState<Record<string, ProTableBuiltInActionType>>({
    refresh: <RefreshButton key="icon-refresh" />,
    settings: {
      key: 'icon-settings',
      icon: <SettingOutlined />,
      onClick: () => message.info('还没做'),
    },
    ...(builtInActions?.iconActions ?? {}),
  } as Record<string, ProTableBuiltInActionType>)
  const latestIconActions = useLatest(iconActions)

  const renderIconActions = useMemoizedFn(() => (
    <Actions
      spaceSize={2}
      configs={() => latestIconActionConfigs?.current}
      getBuiltInActions={() => latestIconActions.current}
      renderActionConfig={({ ...actionProps }: any = {}) => (
        <Action
          extraConfirmProps={{
            placement: 'topRight',
          }}
          {...actionProps}
          type="text"
          content={null}
        />
      )}
    />
  ))

  return {
    iconActions,
    iconActionConfigs: useMemo(
      () => (iconActionConfigs ?? []).filter((action) => (action as any)?.hidden !== false),
      [iconActionConfigs],
    ),
    setIconActions,
    renderIconActions,
  }
}
