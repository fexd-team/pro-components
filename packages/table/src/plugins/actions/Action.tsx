import React from 'react'

import { Action, ActionProps } from '@fexd/pro-utils'

import useModalPlugin from '../modal'
import useConfigPlugin from '../config'

export default function ProTableAction({ extraConfirmProps = {}, extraTooltipProps = {}, ...props }: ActionProps) {
  const { modalStationRef } = useModalPlugin(() => [])
  const { t, localeKey } = useConfigPlugin()
  return (
    <Action
      key={(localeKey as any) ?? 'action'}
      extraConfirmProps={{
        placement: (props?.confirm as any)?.placement ?? 'topRight',
        getPopupContainer: () => modalStationRef?.current ?? document?.body,
        okText: t('modal.confirm'),
        cancelText: t('modal.cancelText'),
        ...extraConfirmProps,
      }}
      extraTooltipProps={{
        placement: (props?.tooltip as any)?.placement ?? 'topRight',
        getPopupContainer: () => modalStationRef?.current ?? document?.body,
        ...extraTooltipProps,
      }}
      {...props}
    />
  )
}
