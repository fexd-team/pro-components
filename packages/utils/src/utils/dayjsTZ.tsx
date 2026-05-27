import rawDayjs, { DayjsTimezone, Dayjs, ConfigType } from 'dayjs'

import dayjs_utc from 'dayjs/plugin/utc'
import 'dayjs/plugin/utc'
import dayjs_timezone from 'dayjs/plugin/timezone'
import 'dayjs/plugin/timezone'
import dayjs_relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/plugin/relativeTime'
import dayjs_advancedFormat from 'dayjs/plugin/advancedFormat'
import 'dayjs/plugin/advancedFormat'
import dayjs_weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/plugin/weekOfYear'
import dayjs_customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/id'
import 'dayjs/locale/ms-my'

rawDayjs.extend(dayjs_utc)
rawDayjs.extend(dayjs_timezone)
rawDayjs.extend(dayjs_relativeTime)
rawDayjs.extend(dayjs_advancedFormat)
rawDayjs.extend(dayjs_weekOfYear)
rawDayjs.extend(dayjs_customParseFormat)

export interface DayjsTZType extends DayjsTimezone {
  (date?: ConfigType): Dayjs
  tz: DayjsTimezone
}

const tzCache = new Map<string, boolean>()
function isValidTimezone(value: string): boolean {
  if (tzCache.has(value)) return tzCache.get(value)!
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value })
    tzCache.set(value, true)
    return true
  } catch {
    tzCache.set(value, false)
    return false
  }
}

const dayjsTZ: DayjsTZType = Object.assign(
  (date = Date.now(), ...args: any[]) => {
    if (rawDayjs.tz) {
      if (args.length === 1 && typeof args[0] === 'string' && !isValidTimezone(args[0])) {
        const defaultTz = rawDayjs.tz.guess()
        // @ts-ignore
        return rawDayjs.tz(date, args[0], defaultTz)
      }
      // @ts-ignore
      return rawDayjs.tz(date, ...args)
    }

    return rawDayjs(date, ...args)
  },
  { tz: rawDayjs.tz },
  rawDayjs.tz,
) as any

export default dayjsTZ
