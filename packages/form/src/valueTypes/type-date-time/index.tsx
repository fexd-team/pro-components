import React from 'react'
import { run, isExist } from '@fexd/tools'
import { Tooltip, Hook, dayjsTZ } from '@fexd/pro-utils'

import useLocales from '../../locales'
import { defineTypes } from '../types-define'
import useDayjsLocale from './useDayjsLocale'
import { formatDateValue, toValidMomentValue, normalizeMomentValue } from './time-utils'
import { TZ_DatePicker, TZ_TimePicker } from './fixAntdTimezone'
import FromNowTooltip from './FromNowTooltip'

const types = defineTypes({
  // 日期
  date: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_DatePicker placeholder={t('form.selectDate')} {...props} />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <FromNowTooltip value={value} format={config?.format ?? 'YYYY-MM-DD'} enable={config?.fromNowTooltip} />
      ),
  },
  // 日期时间
  dateTime: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_DatePicker placeholder={t('form.selectDate')} showTime {...props} />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <FromNowTooltip
          value={value}
          format={config?.format ?? 'YYYY-MM-DD HH:mm:ss'}
          enable={config?.fromNowTooltip}
        />
      ),
  },
  // 周
  dateWeek: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_DatePicker placeholder={t('form.selectWeek')} {...props} picker="week" />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <FromNowTooltip value={value} format={config?.format ?? 'YYYY-wo'} enable={config?.fromNowTooltip} />
      ),
  },
  // 月
  dateMonth: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_DatePicker placeholder={t('form.selectMonth')} {...props} picker="month" />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <FromNowTooltip value={value} format={config?.format ?? 'YYYY-MM'} enable={config?.fromNowTooltip} />
      ),
  },
  // 季度输入
  dateQuarter: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_DatePicker placeholder={t('form.selectQuarter')} {...props} picker="quarter" />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <FromNowTooltip value={value} format={config?.format ?? 'YYYY-[Q]Q'} enable={config?.fromNowTooltip} />
      ),
  },
  // 年份输入
  dateYear: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_DatePicker placeholder={t('form.selectYear')} {...props} picker="year" />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <FromNowTooltip value={value} format={config?.format ?? 'YYYY'} enable={config?.fromNowTooltip} />
      ),
  },
  // 时间
  time: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_TimePicker placeholder={t('form.selectTime')} {...props} />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <FromNowTooltip value={value} format={config?.format ?? 'HH:mm:ss'} enable={config?.fromNowTooltip} />
      ),
  },

  // 相对于当前时间
  fromNow: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <TZ_DatePicker placeholder={t('form.selectTime')} showTime {...props} />
        }}
      </Hook>
    ),
    normalizeValue: (value) => normalizeMomentValue(value),
    normalizeFieldValue: (value) => toValidMomentValue(value),
    renderView: (value, config = {}) =>
      !isExist(value) ? (
        '--'
      ) : (
        <Hook key={value}>
          {() => {
            const localeKey = useDayjsLocale()

            return (
              <Tooltip
                title={<Hook>{() => formatDateValue(value, config?.format ?? 'YYYY-MM-DD HH:mm:ss', localeKey)}</Hook>}
              >
                {run(dayjsTZ(value).locale(localeKey), 'fromNow')}
              </Tooltip>
            )
          }}
        </Hook>
      ),
  },
})

export default types
export { formatDateValue, toValidMomentValue, normalizeMomentValue } from './time-utils'
