import React, { useMemo } from 'react'
import { isBoolean, run } from '@fexd/tools'
import { DeleteOutlined } from '@ant-design/icons'
import { useSetState, useMemoizedFn, useLatest } from 'ahooks'
import { SetState } from 'ahooks/es/useSetState'

import { useProps } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import { ProTableBuiltInActionType, ProTableTableActionType, ProTableBuiltInColumnActionNames } from '../../types'
import { I18nText } from '../config'
import Actions, { getActionNodes } from './Actions'
import Action from '../actions/Action'
import handleAsyncActionResponse from '../actions/handleAsyncActionResponse'

// 表格项动作
export default function useColumnActions(): {
  columnActions: Record<string, ProTableBuiltInActionType>
  columnActionConfigs: ProTableTableActionType<ProTableBuiltInColumnActionNames>[]
  setColumnActions: SetState<Record<string, ProTableBuiltInActionType>>
  renderColumnsActions: (this: any, record: any, idx: number, dataSource: any[], actionConfigs?: any[]) => JSX.Element
  hasColumnsActions: (dataSource: any[], actionConfigs?: any[]) => boolean
  hasColumnActions: (record: any, idx: number, dataSource: any[], actionConfigs?: any[]) => boolean
} {
  const { columnActions: columnActionConfigs, onDelete, builtInActions } = useProps()
  const latestColumnActionConfigs = useLatest(columnActionConfigs)
  const queryField = useQueryFieldPlugin(() => [])

  const [columnActions, setColumnActions] = useSetState<Record<string, ProTableBuiltInActionType>>({
    delete: (item: any) => ({
      key: 'column-delete',
      icon: <DeleteOutlined />,
      danger: true,
      confirm: <I18nText text="actions.deleteConfirm" />,
      content: <I18nText text="actions.delete" />,
      async onClick() {
        let response = ((await run(onDelete, undefined, item)) as any) ?? {}

        if (isBoolean(response)) {
          response = {
            success: response,
          }
        }

        handleAsyncActionResponse(response)

        const { success, message: msg } = response ?? {
          success: true,
        }

        if (success) {
          queryField.search()
        }
      },
    }),
    'delete-icon': {
      key: 'column-delete-icon',
      builtIn: 'delete',
      tooltip: <I18nText text="actions.delete" />,
      content: null,
    },
    ...(builtInActions?.columnActions ?? {}),
  } as Record<string, ProTableBuiltInActionType>)
  const latestColumnActions = useLatest(columnActions)

  const renderColumnsActions = useMemoizedFn((record, idx: number, dataSource: any[], actionConfigs?: any[]) => (
    <Actions
      className="f-pro-table-columns-actions"
      configs={() => actionConfigs ?? latestColumnActionConfigs?.current}
      getBuiltInActions={() => latestColumnActions.current}
      actionParams={[record, idx, dataSource]}
      onClick={(e: any) => run(e, 'stopPropagation')}
      renderActionConfig={({ onClick, actionType = 'button', ...actionProps }: any = {}) => (
        <Action
          key={actionProps?.key}
          size={actionType === 'button' ? 'small' : undefined}
          type="link"
          extraConfirmProps={{
            placement: 'topRight',
          }}
          {...actionProps}
          actionType={actionType}
          onClick={async (...args: any[]) => {
            let response = await run(onClick, undefined, record, idx, dataSource, ...args)

            if (isBoolean(response)) {
              response = {
                success: response,
              }
            }

            handleAsyncActionResponse(response)

            const { success, message: msg } = response ?? {}

            if (success) {
              queryField.search()
            }
          }}
        />
      )}
    />
  ))

  const hasColumnActions = useMemoizedFn((record: any, idx: any, dataSource: any[], actionConfigs?: any[]) => {
    const configs = run<any[]>(() => actionConfigs ?? latestColumnActionConfigs?.current)
    const nodes = getActionNodes(configs, {
      builtInActions: latestColumnActions.current,
      getActionParams: [record, idx, dataSource],
      renderActionConfig: () => <></>,
    })

    return (nodes?.length ?? 0) > 0
  })

  const hasColumnsActions = useMemoizedFn((dataSource: any[], actionConfigs?: any[]) => {
    return dataSource.some((record, idx) => hasColumnActions(record, idx, dataSource, actionConfigs))
  })

  return {
    columnActions,
    columnActionConfigs: useMemo(
      () =>
        (columnActionConfigs ?? [])
          .filter(Boolean)
          .filter(
            (action) => (action as any)?.hidden !== false,
          ) as ProTableTableActionType<ProTableBuiltInColumnActionNames>[],
      [columnActionConfigs],
    ),
    setColumnActions,
    renderColumnsActions,
    hasColumnsActions,
    hasColumnActions,
  }
}
