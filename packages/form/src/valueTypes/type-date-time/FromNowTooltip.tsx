import React, { memo, useMemo } from 'react'

import { run } from '@fexd/tools'
import { Tooltip, dayjsTZ, Hook } from '@fexd/pro-utils'
import { useProContext } from '@fexd/pro-provider'

import { formatDateValue } from './time-utils'
import useDayjsLocale from './useDayjsLocale'

const FromNowTooltip = memo(function FromNowTooltip({
  value,
  format: propFormat,
  enable = true,
}: {
  value: any
  format?: string
  enable?: boolean
}): JSX.Element {
  const { dayFormat: ctxDayFormat } = useProContext()
  const format = propFormat ?? ctxDayFormat ?? 'YYYY-MM-DD'
  const localeKey = useDayjsLocale()

  return useMemo(() => {
    const content = formatDateValue(value, format, localeKey) as any

    if (!enable) {
      return <>{content}</>
    }

    return <Tooltip title={<Hook>{() => run(dayjsTZ(value).locale(localeKey), 'fromNow')}</Hook>}>{content}</Tooltip>
  }, [value, format, localeKey, enable])
})

export default FromNowTooltip
