import React from 'react'
import { InputNumber } from 'antd'
import BigNumber from 'bignumber.js'
import { isString, isExist, isNumber, isBigNumber, isNumberString } from '@fexd/tools'
import { Hook } from '@fexd/pro-utils'

import useLocales from '../../locales'
import { ProFieldValueFieldType } from '../../types'
import { defineTypes, ProFormValueTypeMapConfig } from '../types-define'
import useNumberFormat, { numberFormat } from './useNumberFormat'

const normalizeNumberValue = (value: any) => {
  if (isBigNumber(value)) {
    return BigNumber(value).toFormat({ decimalSeparator: '.' })
  }

  if (isNumberString(value)) {
    return Number(value)
  }

  return value
}

const number: ProFormValueTypeMapConfig = {
  renderField: ({ fieldProps: props = {} } = {}) => (
    <Hook {...props}>
      {(props) => {
        const { t } = useLocales(({ t }) => [t])

        return <InputNumber placeholder={t('form.pleaseEnter')} stringMode {...props} />
      }}
    </Hook>
  ),
  renderView: (value, config: ProFieldValueFieldType) => (
    <Hook>
      {() => {
        const numberFormat = useNumberFormat(config)

        return isExist(value) ? numberFormat(value) : '--'
      }}
    </Hook>
  ),
  normalizeValue: normalizeNumberValue,
}

const types = defineTypes({
  // 数字输入框
  digit: number,
  number,
  // 金额输入框
  money: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          // const numberFormatConfig = useNumberFormatConfig(true)

          return (
            <InputNumber
              stringMode
              placeholder={t('form.pleaseEnter')}
              // prefix={props?.unit}
              addonBefore={props?.unit}
              formatter={(value) =>
                numberFormat(value, {
                  locale: 'en',
                })
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              {...props}
            />
          )
        }}
      </Hook>
    ),
    renderView: (value, config: ProFieldValueFieldType) => (
      <Hook>
        {() => {
          const numberFormat = useNumberFormat(config, true)

          if (!isExist(value)) {
            return '--'
          }

          const formatResult = numberFormat(value)

          // 如果格式化结果与原数据相同，视作格式化失败，不添加单位
          if (formatResult === value) {
            return value
          }

          if (!isExist(config?.unit)) {
            return formatResult
          }

          return (
            <>
              {config?.unit} {formatResult}
            </>
          )
        }}
      </Hook>
    ),
    normalizeValue: normalizeNumberValue,
  },

  percent: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return (
            <InputNumber
              placeholder={t('form.pleaseEnter')}
              addonAfter="%"
              stringMode
              formatter={(value) => {
                const result =
                  !isString(value) || value?.length === 0 || value === '-'
                    ? value
                    : BigNumber(value).multipliedBy(100).toFormat({ decimalSeparator: '.' })

                // console.log('formatter', { value, result })

                return result
              }}
              parser={(value) => {
                const result =
                  !isString(value) || value?.length === 0 || value === '-'
                    ? value
                    : BigNumber(value).div(100).toFormat({ decimalSeparator: '.' })

                // console.log('parser', { value, result })

                return result
              }}
              step={0.01}
              {...props}
            />
          )
        }}
      </Hook>
    ),
    renderView: (value, config: ProFieldValueFieldType) => (
      <Hook>
        {() => {
          const numberFormat = useNumberFormat(config)

          if (!isExist(value)) {
            return '--'
          }

          if (!isString(value) && !isNumber(value)) {
            return value
          }

          return `${numberFormat(BigNumber(value).multipliedBy(100).toFormat({ decimalSeparator: '.' }))} %`
        }}
      </Hook>
    ),
    normalizeValue: normalizeNumberValue,
  },
})

export default types
