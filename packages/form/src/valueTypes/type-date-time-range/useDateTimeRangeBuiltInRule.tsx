import { useMemo, useState } from 'react'
import { run, isString, isNumber } from '@fexd/tools'
import rawDayjs from 'dayjs'

export default function useDateTimeRangeBuiltInRule(props: any) {
  const builtInRuleName = isString(props?.builtInRule) ? props?.builtInRule : props?.builtInRule?.name
  const [dates, setDates] = useState<any>()
  const datesFormat = useMemo(
    () => [run(dates, '0.format', 'YYYY-MM-DD HH:mm:ss'), run(dates, '1.format', 'YYYY-MM-DD HH:mm:ss')],
    [dates],
  )
  const [open, setOpen] = useState(false)
  const isValidRule = ['same-month', 'days-span'].includes(builtInRuleName)

  return isValidRule
    ? {
        ...(open && !props?.disabledDate && isValidRule ? { value: dates } : {}),
        onCalendarChange: (value: any, ...args: any[]) => {
          setDates(value)
          run(props?.onCalendarChange, undefined, value, ...args)
        },
        onOpenChange: (open: boolean, ...args: any[]) => {
          setOpen(open)
          setDates([])
          run(props?.onOpenChange, undefined, open, ...args)
        },
        disabledDate:
          props?.disabledDate ??
          ((current: any) => {
            if (!datesFormat.some(Boolean)) {
              return false
            }

            if (builtInRuleName === 'same-month') {
              const date = current.format('YYYY-MM-DD HH:mm:ss')
              const avaliable = rawDayjs(date).isSame(datesFormat?.[0] ?? datesFormat?.[1], 'month')

              return !avaliable
            }

            if (builtInRuleName === 'days-span' && isNumber(props?.builtInRule?.span)) {
              const date = current.format('YYYY-MM-DD HH:mm:ss')
              const tooLate =
                datesFormat?.[0] &&
                rawDayjs(date).diff(rawDayjs(datesFormat?.[0]), 'days') > props?.builtInRule?.span - 1
              const tooEarly =
                datesFormat?.[1] &&
                rawDayjs(datesFormat?.[1]).diff(rawDayjs(date), 'days') > props?.builtInRule?.span - 1

              return !!tooEarly || !!tooLate
            }
          }),
      }
    : {}
}
