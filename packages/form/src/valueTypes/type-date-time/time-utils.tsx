import { run, isString, isNumber } from '@fexd/tools'
import moment from 'moment'
import { dayjsTZ } from '@fexd/pro-utils'

export function toValidMomentValue(value: any) {
  if (!value) {
    return undefined
  }

  // if (isString(value)) {
  //   // console.log(value)
  // }

  if (isString(value) && /^\d+$/.test(value)) {
    // eslint-disable-next-line no-param-reassign
    value = Number(value)
  }

  const momentValue = moment(value)
  if (momentValue.format() === 'Invalid date') {
    return undefined
  }

  return momentValue
}

export const formatDateValue = (dateValue: any, format: string = 'YYYY-MM-DD', locale: string = 'en') => {
  if (!dateValue) {
    return '--'
  }

  const momentValue = toValidMomentValue(dateValue)

  if (!momentValue) {
    return '--'
  }

  const timestamp = momentValue.valueOf()

  return dayjsTZ(timestamp).locale(locale).format(format)
}

export const normalizeMomentValue = (value: any, targetTime?: string) => {
  const timestamp = run(() => {
    if (run(moment, 'isMoment', value) ?? false) {
      return run(value, 'valueOf') ?? value
    }

    return run(value, 'valueOf') ?? value
  })

  if (isNumber(timestamp) && isString(targetTime)) {
    const momentValue = dayjsTZ(timestamp)
    if (momentValue.format() === 'Invalid Date') {
      return timestamp
    }
    return dayjsTZ(momentValue.format(`YYYY-MM-DD ${targetTime}`)).valueOf()
  }

  return timestamp
}
