import { isString, isObject, isNumber } from '@fexd/tools'
import { useProContext } from '@fexd/pro-provider'
import { globalI18n } from '@fexd/pro-utils'

export const numberFormat = (value: any, ...args: any[]) => {
  if (!isString(value) && !isNumber(value)) {
    return value
  }

  return globalI18n.t(`${value}@number`, ...args)
}
export function parseNumberFormatConfig(config: any = {}, isCurrency = false) {
  const { numberLocale, currencyLocale = numberLocale, digits } = config
  const digitsConfig = isNumber(digits) ? { toFixed: digits } : {}
  const locale = isCurrency ? currencyLocale : numberLocale

  if (isString(locale)) {
    return {
      locale,
      ...digitsConfig,
    }
  }

  if (isObject(locale)) {
    return {
      ...locale,
      ...digitsConfig,
    }
  }

  return {
    ...digitsConfig,
  }
}
export function useNumberFormatConfig(isCurrency = false) {
  const proCtx = useProContext()

  return parseNumberFormatConfig(proCtx, isCurrency)
}

export default function useNumberFormat(config: any = {}, isCurrency = false) {
  const userConfig = parseNumberFormatConfig(config, isCurrency)
  const builtInConfig = useNumberFormatConfig(isCurrency)

  return (num: any) =>
    numberFormat(num, {
      ...builtInConfig,
      ...userConfig,
    })
}
