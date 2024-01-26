import React, { Fragment } from 'react'

import { isArray, run, isString } from '@fexd/tools'
import { Hook, dayjsTZ, Tooltip } from '@fexd/pro-utils'

import useLocales from '../../locales'

import { TZ_DatePicker_RangePicker, TZ_TimePicker_RangePicker } from '../type-date-time/fixAntdTimezone'
import { formatDateValue, normalizeMomentValue } from '../type-date-time/time-utils'
import { defineTypes } from '../types-define'
import useDateTimeRangeBuiltInRule from './useDateTimeRangeBuiltInRule'
import { normalizeTimeRangeFieldValue, normalizeTimeRangeValue, renderTimeRangeValue } from './time-range-utils'
import useDayjsLocale from '../type-date-time/useDayjsLocale'

const types = defineTypes({
  // 日期区间
  dateRange: {
    renderField: ({ fieldProps: props = {}, field } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const builtInProps = useDateTimeRangeBuiltInRule({
            ...props,
            ...field,
          })

          return (
            <TZ_DatePicker_RangePicker
              placeholder={[t('form.startDate'), t('form.endDate')]}
              {...props}
              {...builtInProps}
            />
          )
        }}
      </Hook>
    ),
    normalizeValue: (value) => {
      if (isArray(value)) {
        const [start, end] = value
        return [normalizeMomentValue(start, '00:00:00:000'), normalizeMomentValue(end, '23:59:59:999')]
      }

      return value
    },
    normalizeFieldValue: normalizeTimeRangeFieldValue,
    renderView: renderTimeRangeValue(),
  },
  // 日期时间区间
  dateTimeRange: {
    renderField: ({ fieldProps: props = {}, field } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const builtInProps = useDateTimeRangeBuiltInRule({
            ...props,
            ...field,
          })

          return (
            <TZ_DatePicker_RangePicker
              placeholder={[t('form.startTime'), t('form.endTime')]}
              showTime
              {...props}
              {...builtInProps}
            />
          )
        }}
      </Hook>
    ),
    normalizeValue: normalizeTimeRangeValue,
    normalizeFieldValue: normalizeTimeRangeFieldValue,
    renderView: renderTimeRangeValue('YYYY-MM-DD HH:mm:ss'),
  },
  // 日期周区间
  dateWeekRange: {
    renderField: ({ fieldProps: props = {}, field } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const builtInProps = useDateTimeRangeBuiltInRule({
            ...props,
            ...field,
          })

          return (
            <TZ_DatePicker_RangePicker
              placeholder={[t('form.startWeek'), t('form.endWeek')]}
              picker="week"
              {...props}
              {...builtInProps}
            />
          )
        }}
      </Hook>
    ),
    normalizeValue: normalizeTimeRangeValue,
    normalizeFieldValue: normalizeTimeRangeFieldValue,
    renderView: renderTimeRangeValue('YYYY-wo'),
  },
  // 日期月区间
  dateMonthRange: {
    renderField: ({ fieldProps: props = {}, field } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const builtInProps = useDateTimeRangeBuiltInRule({
            ...props,
            ...field,
          })

          return (
            <TZ_DatePicker_RangePicker
              placeholder={[t('form.startMonth'), t('form.endMonth')]}
              picker="month"
              {...props}
              {...builtInProps}
            />
          )
        }}
      </Hook>
    ),
    normalizeValue: normalizeTimeRangeValue,
    normalizeFieldValue: normalizeTimeRangeFieldValue,
    renderView: renderTimeRangeValue('YYYY-MM'),
  },
  // 日期季度区间
  dateQuarterRange: {
    renderField: ({ fieldProps: props = {}, field } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const builtInProps = useDateTimeRangeBuiltInRule({
            ...props,
            ...field,
          })

          return (
            <TZ_DatePicker_RangePicker
              placeholder={[t('form.startQuarter'), t('form.endQuarter')]}
              picker="quarter"
              {...props}
              {...builtInProps}
            />
          )
        }}
      </Hook>
    ),
    normalizeValue: normalizeTimeRangeValue,
    normalizeFieldValue: normalizeTimeRangeFieldValue,
    renderView: renderTimeRangeValue('YYYY-[Q]Q'),
  },
  // 日期年份区间
  dateYearRange: {
    renderField: ({ fieldProps: props = {}, field } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const builtInProps = useDateTimeRangeBuiltInRule({
            ...props,
            ...field,
          })

          return (
            <TZ_DatePicker_RangePicker
              placeholder={[t('form.startYear'), t('form.endYear')]}
              picker="year"
              {...props}
              {...builtInProps}
            />
          )
        }}
      </Hook>
    ),
    normalizeValue: normalizeTimeRangeValue,
    normalizeFieldValue: normalizeTimeRangeFieldValue,
    renderView: renderTimeRangeValue('YYYY'),
  },
  // 时间区间
  timeRange: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_TimePicker_RangePicker placeholder={[t('form.startTime'), t('form.endTime')]} {...props} />
        }}
      </Hook>
    ),
    renderView: renderTimeRangeValue('HH:mm:ss'),
    normalizeValue: normalizeTimeRangeValue,
    normalizeFieldValue: normalizeTimeRangeFieldValue,
  },
  // 相对当前时间区间
  fromNowRange: {
    renderField: ({ fieldProps: props = {}, field } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const builtInProps = useDateTimeRangeBuiltInRule({
            ...props,
            ...field,
          })

          return (
            <TZ_DatePicker_RangePicker
              placeholder={[t('form.startTime'), t('form.endTime')]}
              showTime
              {...props}
              {...builtInProps}
            />
          )
        }}
      </Hook>
    ),
    normalizeValue: normalizeTimeRangeValue,
    normalizeFieldValue: normalizeTimeRangeFieldValue,
    renderView: (value, config = {}) => {
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

      const format = config?.format ?? 'YYYY-MM-DD HH:mm:ss'

      return (
        <>
          {[start, end].filter(Boolean).map((value, idx) => (
            <Fragment key={idx}>
              {idx > 0 && ' ~ '}
              {value ? (
                <Hook key={value}>
                  {() => {
                    const localeKey = useDayjsLocale()

                    return (
                      <Tooltip title={<Hook>{() => formatDateValue(value, format, localeKey)}</Hook>}>
                        {run(dayjsTZ(value).locale(localeKey), 'fromNow')}
                      </Tooltip>
                    )
                  }}
                </Hook>
              ) : (
                '--'
              )}
            </Fragment>
          ))}
        </>
      )
    },
  },
})

export default types
