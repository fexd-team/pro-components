import React, { Fragment } from 'react'
import { I18n, run, isNaN, isExist, isNumber, clamp, isBigNumber, isNumberString } from '@fexd/tools'

import BigNumber from 'bignumber.js'

import reactI18nshell from './reactI18nshell'

import zh_CN from './locales/zh-CN.json'
import en_US from './locales/en-US.json'
import id_ID from './locales/id-ID.json'
import ms_MY from './locales/ms-MY.json'
import vi_VN from './locales/vi-VN.json'
import th_TH from './locales/th-TH.json'

export { I18n } from '@fexd/tools'

export const jsxTranslate = (value: any, data: any = {}) => {
  if (!isExist(value)) {
    return null
  }

  return (
    <Fragment>
      {(I18n.template(value, data, { split: true }) as any).map((item: any, idx: any) => (
        <Fragment key={idx}>{item}</Fragment>
      ))}
    </Fragment>
  )
}

// window.isNumberString = isNumberString

export const numberTranslate = (num: any, data: any = {}) => {
  // console.log('numberTranslate num', num)

  const number = Number(num)

  if ((!isNumberString(num) && !isNumber(num)) || !isExist(num) || num === '' || isNaN(number)) {
    return num
  }

  const numberString = String(num).replace(/^0+/, '').replace(/0+$/, '').replace(/\.$/, '')

  const locale = data?.locale ?? 'en'

  const toLocaleStringConfig = {
    maximumFractionDigits: 20,
    ...(isNumber(data?.toFixed)
      ? {
          maximumFractionDigits: data?.toFixed,
          minimumFractionDigits: data?.toFixed,
        }
      : {}),
    ...data,
  }

  // if (isNumber(data?.toFixed)) {
  //   console.log('data?.toFixed', data?.toFixed)
  //   console.log(toLocaleStringConfig, run(number, 'toLocaleString', locale, toLocaleStringConfig))
  // }

  // console.log('toLocaleString', {
  //   toLocaleStringConfig,
  //   number,
  //   num,
  //   // result
  // })

  // 正常范围内数字处理，直接使用 toLocaleString 进行
  if (!isBigNumber(numberString)) {
    const result = run(number, 'toLocaleString', locale, toLocaleStringConfig)
    // console.log('toLocaleString', {
    //   toLocaleStringConfig,
    //   number,
    //   num,
    //   result,
    // })
    return result
  }

  // 超限范围内处理，使用 BigNumber 模拟 toLocaleString 进行
  // bignumber 文档：https://mikemcl.github.io/bignumber.js
  const bigNumber = BigNumber(numberString)
  const formatConfig = run(() => {
    try {
      return {
        decimalSeparator: (0.1).toLocaleString(locale).match(/\D/)?.[0], // 获取 toLocaleString 的小数分隔符
        groupSeparator: (10000).toLocaleString(locale).match(/\D/)?.[0], // 获取 toLocaleString 的整数分隔符
        groupSize: ((1000000).toLocaleString(locale).match(/\D0+$/)?.[0]?.length ?? 4) - 1, // 获取 toLocaleString 的整数分隔位
      }
    } catch (e) {
      return {
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
      }
    }
  })

  const bigNumberFormatResult = run(() => {
    if (/\.\d+$/.test(numberString)) {
      const decimalCount = clamp(
        numberString.split('.')?.[1]?.length ?? 0,
        toLocaleStringConfig?.minimumFractionDigits,
        toLocaleStringConfig?.maximumFractionDigits,
      )

      return bigNumber.toFormat(decimalCount, formatConfig)
    }

    return bigNumber.toFormat(formatConfig)
  })

  // 为确保最大限度模拟 toLocaleString 结果，保留可能存在的货币单位功能等
  // 将 bigNumber 格式化结果填入 toLocaleString 模板
  const localStringTemp = (1010101).toLocaleString('en', toLocaleStringConfig)

  // console.log('bigNumberFormatResult', {
  //   toLocaleStringConfig,
  //   bigNumberFormatResult,
  //   localStringTemp,
  //   result: localStringTemp.replace(/1,010,101(\.0+)?$/, bigNumberFormatResult),
  // })

  try {
    return localStringTemp.replace(/1,010,101(\.0+)?$/, bigNumberFormatResult)
  } catch (e) {
    return bigNumberFormatResult
  }
}

// Object.assign(window, { BigNumber, numberTranslate })

const builtInResources = {
  'zh-CN': zh_CN,
  'en-US': en_US,
  'id-ID': id_ID,
  'ms-MY': ms_MY,
  'vi-VN': vi_VN,
  'th-TH': th_TH,
  zh_CN,
  en_US,
  id_ID,
  ms_MY,
  vi_VN,
  th_TH,
}

const builtInFallbackI18n = new I18n({
  types: {
    default: { resources: builtInResources },
    jsx: { format: jsxTranslate },
    number: {
      resources: false,
      format: numberTranslate,
    },
  },
})

builtInFallbackI18n.applyLanguage('en_US')
builtInFallbackI18n.applyLanguage = () => Promise.resolve()

const builtInI18n = new I18n({
  fallback: [builtInFallbackI18n],
  types: {
    default: { resources: builtInResources },
    jsx: {
      resources: builtInResources,
      format: jsxTranslate,
    },
  },
})

export const fallbackI18n = new I18n({
  fallback: [builtInI18n],
  types: {
    default: {},
    jsx: { format: jsxTranslate },
    number: {
      resources: false,
      format: numberTranslate,
    },
  },
})

export const globalI18n = new I18n({
  fallback: [fallbackI18n],
  types: {
    default: {},
    jsx: { format: jsxTranslate },
    number: {
      resources: false,
      format: numberTranslate,
    },
  },
})

builtInI18n.applyLng('en_US')
fallbackI18n.applyLng('en_US')
globalI18n.applyLng('en_US')

export default globalI18n
export const t = globalI18n.t
export const { withI18n, useI18n, FormattedMessage, useTranslation } = reactI18nshell(globalI18n)
export { reactI18nshell }
