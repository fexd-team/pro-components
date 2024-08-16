import React, { memo, useMemo } from 'react'
import { message, Popover, ConfigProvider as AntdConfigProvider } from 'antd'
import { SettingOutlined, ReloadOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons'
import { useSetState, useMemoizedFn, useLatest } from 'ahooks'
import { delay, classnames } from '@fexd/tools'
import { SetState } from 'ahooks/es/useSetState'

import { useProps } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import useModalPlugin from '../modal'
import useConfigPlugin from '../config'
import QueryFieldForm from '../queryField/QueryField'
import { ProTableBuiltInActionType, ProTableTableActionType, ProTableBuiltInIconActionNames } from './types'
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
      type="text"
      {...props}
    />
  )
})

const QueryButton = memo(function QueryButton({ ...props }: any) {
  const queryField = useQueryFieldPlugin(() => [])
  const modal = useModalPlugin(() => [])
  const { t } = useConfigPlugin(() => [])
  const { queryFieldTriggerOnEnter } = useProps()

  return (
    <Popover
      title={t('queryField.query')}
      trigger="click"
      overlayClassName="f-pro-table-query-action-popover"
      content={
        <AntdConfigProvider.SizeContext.Provider value="small">
          <QueryFieldForm
            showAllFields
            queryFieldColumns={1}
            form={queryField.form}
            proFormRef={queryField.proFormRef}
            renderQueryFields={({ renderFields, rawActions }) => (
              <>
                <div
                  className={classnames('f-pro-table-query-action-popover-content', props?.className)}
                  style={props?.style}
                >
                  {renderFields()}
                </div>
                <div className="f-pro-table-query-action-popover-footer">{rawActions}</div>
              </>
            )}
            // 聚焦状态下，回车键时刷新
            onEnterDown={async () => {
              if (!queryFieldTriggerOnEnter) {
                return
              }
              queryField.setPaginationParams({ page: 1 })
              await delay(100)
              queryField.refresh({
                page: 1,
              })
            }}
          />
        </AntdConfigProvider.SizeContext.Provider>
      }
      placement="bottomRight"
    >
      <Action actionType="button" icon={<SearchOutlined />} type="text" {...props} />
    </Popover>
  )
})

// 图标动作
export default function useIconActions(): {
  iconActions: Record<string, ProTableBuiltInActionType>
  iconActionConfigs: ProTableTableActionType<ProTableBuiltInIconActionNames>[]
  setIconActions: SetState<Record<string, ProTableBuiltInActionType>>
  renderIconActions: () => JSX.Element
} {
  const { iconActions: iconActionConfigs, builtInActions } = useProps()
  const latestIconActionConfigs = useLatest(iconActionConfigs)
  const [iconActions, setIconActions] = useSetState<Record<string, ProTableBuiltInActionType>>({
    refresh: <RefreshButton key="icon-refresh" />,
    search: <QueryButton key="icon-query" />,
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
      () =>
        (iconActionConfigs ?? [])
          .filter(Boolean)
          .filter(
            (action) => (action as any)?.hidden !== false,
          ) as ProTableTableActionType<ProTableBuiltInIconActionNames>[],
      [iconActionConfigs],
    ),
    setIconActions,
    renderIconActions,
  }
}
