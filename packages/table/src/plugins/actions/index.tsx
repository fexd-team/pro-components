import { useMemo } from 'react'
import { useWhyDidYouUpdate } from 'ahooks'

import { createPlugin } from '../../utils'
import useTableActions from './useTableActions'
import useBatchActions from './useBatchActions'
import useIconActions from './useIconActions'
import useColumnActions from './useColumnActions'

export const useActionsPlugin = createPlugin(() => {
  const { tableActions, tableActionConfigs, setTableActions, renderTableActions } = useTableActions()
  const { iconActions, iconActionConfigs, setIconActions, renderIconActions } = useIconActions()
  const { batchActions, batchActionConfigs, setBatchActions, renderBatchActions } = useBatchActions()
  const {
    columnActions,
    columnActionConfigs,
    setColumnActions,
    renderColumnsActions,
    hasColumnsActions,
    hasColumnActions,
  } = useColumnActions()

  // useWhyDidYouUpdate('builtInActions', {
  //   tableActions,
  //   iconActions,
  //   batchActions,
  //   columnActions,
  //   tableActionConfigs,
  //   iconActionConfigs,
  //   batchActionConfigs,
  //   columnActionConfigs,
  // })

  return {
    builtInActions: useMemo(
      () => ({
        tableActions,
        iconActions,
        batchActions,
        columnActions,
        tableActionConfigs,
        iconActionConfigs,
        batchActionConfigs,
        columnActionConfigs,
      }),
      [
        tableActions,
        iconActions,
        batchActions,
        columnActions,
        tableActionConfigs,
        iconActionConfigs,
        batchActionConfigs,
        columnActionConfigs,
      ],
    ),
    setTableActions,
    setIconActions,
    setBatchActions,
    setColumnActions,
    renderTableActions,
    renderIconActions,
    renderBatchActions,
    renderColumnsActions,
    hasColumnsActions,
    hasColumnActions,
  }
}, 'actions')
export default useActionsPlugin
