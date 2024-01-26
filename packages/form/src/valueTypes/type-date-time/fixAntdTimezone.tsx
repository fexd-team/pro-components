import React, { forwardRef } from 'react'
import { DatePicker, TimePicker } from 'antd'

import hoistStatics from 'hoist-non-react-statics'

import { run, isArray, isExist } from '@fexd/tools'
import moment from 'moment'
import rawDayjs from 'dayjs'
import { dayjsTZ } from '@fexd/pro-utils'

const now = rawDayjs().format('YYYY-MM-DD HH:mm:ss')
function useTimezoneFixer() {
  const timezoneOffset = rawDayjs(now).valueOf() - dayjsTZ(now).valueOf()
  const adaptSingle = (value: any) => (isExist(value) ? moment(run<number>(value, 'valueOf') + timezoneOffset) : value)
  const fixSingle = (value: any) => (isExist(value) ? moment(run<number>(value, 'valueOf') - timezoneOffset) : value)

  return [
    (value: any) => {
      if (isArray(value)) {
        return value.map(adaptSingle)
      }

      return adaptSingle(value)
    },
    (value: any) => {
      if (isArray(value)) {
        return value.map(fixSingle)
      }

      return fixSingle(value)
    },
  ]
}

export default function fixAntdTimezone(Component: any) {
  return hoistStatics(
    forwardRef(function TimezonedDatePicker({ defaultValue, value, onChange, ...props }: any, ref) {
      const [adapt, fix] = useTimezoneFixer()

      return (
        <Component
          // @ts-ignore
          ref={ref}
          {...props}
          defaultValue={adapt(defaultValue)}
          value={adapt(value)}
          onChange={(value: any, ...rest: any[]) => run(onChange, undefined, fix(value), ...rest)}
        />
      )
    }),
    Component,
  )
}

export const TZ_DatePicker: typeof DatePicker = fixAntdTimezone(DatePicker) as any
export const TZ_DatePicker_RangePicker: typeof DatePicker.RangePicker = fixAntdTimezone(DatePicker.RangePicker) as any
export const TZ_TimePicker: typeof TimePicker = fixAntdTimezone(TimePicker) as any
export const TZ_TimePicker_RangePicker: typeof TimePicker.RangePicker = fixAntdTimezone(TimePicker.RangePicker) as any
