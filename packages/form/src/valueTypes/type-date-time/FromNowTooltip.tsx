import React, { memo, useMemo } from 'react'

import { run } from '@fexd/tools'
import { Tooltip, dayjsTZ, Hook } from '@fexd/pro-utils'

import { formatDateValue } from './time-utils'
import useDayjsLocale from './useDayjsLocale'

const FromNowTooltip = memo(function FromNowTooltip({
  value,
  format = 'YYYY-MM-DD',
  enable = true,
}: {
  value: any
  format?: string
  enable?: boolean
}): JSX.Element {
  const localeKey = useDayjsLocale()

  return useMemo(() => {
    const content = formatDateValue(value, format ?? 'YYYY-MM-DD', localeKey) as any

    if (!enable) {
      return <>{content}</>
    }

    return <Tooltip title={<Hook>{() => run(dayjsTZ(value).locale(localeKey), 'fromNow')}</Hook>}>{content}</Tooltip>
  }, [value, format, localeKey, enable])
})

export default FromNowTooltip
