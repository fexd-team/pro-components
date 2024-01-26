import React, { Fragment } from 'react'
import { run, isString, isArray } from '@fexd/tools'

import { ProFormValueTypeMapConfig } from '../types-define'
import { toValidMomentValue, normalizeMomentValue } from '../type-date-time/time-utils'
import FromNowTooltip from '../type-date-time/FromNowTooltip'

export const normalizeTimeRangeFieldValue = (value: any) => {
  if (isArray(value)) {
    const [start, end] = value
    return [toValidMomentValue(start), toValidMomentValue(end)]
  }
  if (isString(value)) {
    const [start, end] = value.split('-')
    return [toValidMomentValue(start), toValidMomentValue(end)]
  }
  return [toValidMomentValue(value)]
}

export const normalizeTimeRangeValue = (value: any) => {
  if (isArray(value)) {
    const [start, end] = value
    return [normalizeMomentValue(start, 'HH:mm:ss:000'), normalizeMomentValue(end, 'HH:mm:ss:999')]
  }

  return value
}

export const renderTimeRangeValue =
  (defaultFormat: string = 'YYYY-MM-DD'): ProFormValueTypeMapConfig['renderView'] =>
  (value, config = {}) => {
    const format = config?.format ?? defaultFormat

    const [start, end] = run(() => {
      if (isArray(value)) {
        return value
      }
      if (isString(value)) {
        return value.split('-')
      }

      return []
    }) as any

    if ([start, end].filter(Boolean)?.length === 0) {
      return '--'
    }

    return (
      <>
        {[start, end].filter(Boolean).map((value, idx) => (
          <Fragment key={idx}>
            {idx > 0 && ' ~ '}
            {value ? <FromNowTooltip value={value} format={format} enable={config?.fromNowTooltip} /> : '--'}
          </Fragment>
        ))}
      </>
    )
  }
