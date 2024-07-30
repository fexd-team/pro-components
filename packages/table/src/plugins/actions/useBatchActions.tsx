import React, { useMemo } from 'react'
import { run } from '@fexd/tools'
import { DeleteOutlined } from '@ant-design/icons'
import { useSetState, useMemoizedFn, useLatest } from 'ahooks'
import { SetState } from 'ahooks/es/useSetState'

import { useProps } from '../../utils'
import useQueryFieldPlugin from '../queryField'
import { ProTableBuiltInActionType, ProTableTableActionType, BuiltInBatchActionNames } from '../../types'
import useConfigPlugin, { I18nText } from '../config'
import Actions from './Actions'
import Action from '../actions/Action'

// 多选动作
export default function useBatchActions(): {
  batchActions: Record<string, ProTableBuiltInActionType>
  batchActionConfigs: ProTableTableActionType<BuiltInBatchActionNames>[]
  setBatchActions: SetState<Record<string, ProTableBuiltInActionType>>
  renderBatchActions: () => JSX.Element
} {
  const { batchActions: batchActionConfigs, onDelete, builtInActions } = useProps()
  const latestBatchActionConfigs = useLatest(batchActionConfigs)
  const queryField = useQueryFieldPlugin(({ selectedItems }) => [selectedItems])
  const { t } = useConfigPlugin(() => [])
  // const { confirmPromise } = useModalPlugin(() => [])
  const { setSelectedItems, getSelectedItems } = queryField

  const [batchActions, setBatchActions] = useSetState<Record<string, ProTableBuiltInActionType>>({
    delete: (selectedItems) => ({
      key: 'batch-delete',
      icon: <DeleteOutlined />,
      danger: true,
      content: <I18nText text="actions.multipleDelete" />,
      confirm: t('actions.multipleDeleteConfirm', { count: selectedItems.length }),
      async onClick() {
        const { success } = ((await run(onDelete, undefined, selectedItems)) as any) ?? {}

        if (success) {
          setSelectedItems([])
          queryField.search()
        }
      },
    }),
    ...(builtInActions?.batchActions ?? {}),
  } as Record<string, ProTableBuiltInActionType>)
  const latestBatchActions = useLatest(batchActions)

  const renderBatchActions = useMemoizedFn(() => (
    <Actions
      spaceSize={2}
      configs={() => latestBatchActionConfigs?.current}
      getBuiltInActions={() => latestBatchActions.current}
      actionParams={[getSelectedItems()]}
      renderActionConfig={({ content, onClick, ...actionProps }: any = {}) => (
        <Action
          type="link"
          size="small"
          extraConfirmProps={{
            placement: 'topRight',
          }}
          {...actionProps}
          onClick={async () => {
            const selectedItems = getSelectedItems()
            const { success } = ((await run(onClick, undefined, selectedItems)) as any) ?? {}

            if (success) {
              setSelectedItems([])
            }
          }}
        >
          {content}
        </Action>
      )}
    />
  ))

  return {
    batchActions,
    batchActionConfigs: useMemo(
      () =>
        (batchActionConfigs ?? [])
          .filter(Boolean)
          .filter((action) => (action as any)?.hidden !== false) as ProTableTableActionType<BuiltInBatchActionNames>[],
      [batchActionConfigs],
    ),
    setBatchActions,
    renderBatchActions,
  }
}
