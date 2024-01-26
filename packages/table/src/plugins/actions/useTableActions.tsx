import React, { useMemo } from 'react'
import { useSetState, useMemoizedFn, useLatest } from 'ahooks'
import { SetState } from 'ahooks/es/useSetState'

import { useProps } from '../../utils'
import { ProTableBuiltInActionType, ProTableTableActionType } from '../../types'
import Actions from './Actions'

// 表格动作
export default function useTableActions(): {
  tableActions: Record<string, ProTableBuiltInActionType>
  tableActionConfigs: ProTableTableActionType<'add'>[]
  setTableActions: SetState<Record<string, ProTableBuiltInActionType>>
  renderTableActions: () => JSX.Element
} {
  const { actions: tableActionConfigs, builtInActions } = useProps()
  const latestTableActionConfigs = useLatest(tableActionConfigs)
  const [tableActions, setTableActions] = useSetState<Record<string, ProTableBuiltInActionType>>({
    // export: <Button>导出</Button>,
    // print: <Button>打印</Button>,
    ...(builtInActions?.actions ?? {}),
  })
  const latestTableActions = useLatest(tableActions)

  const renderTableActions = useMemoizedFn(() => (
    <Actions configs={() => latestTableActionConfigs.current} getBuiltInActions={() => latestTableActions.current} />
  ))

  return {
    tableActions,
    tableActionConfigs: useMemo(
      () => (tableActionConfigs ?? []).filter((action) => (action as any)?.hidden !== false),
      [tableActionConfigs],
    ),
    setTableActions,
    renderTableActions,
  }
}
