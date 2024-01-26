import { ProFieldItemProps, ProFieldValueFieldType } from '../types'

export interface ProFormValueTypeMapConfig
  extends Pick<Omit<ProFieldValueFieldType, 'type'>, 'renderField' | 'renderView'> {
  normalizeValue?: (value: any) => any
  normalizeFieldValue?: (value: any) => any
  fieldItemProps?: ProFieldItemProps
}

export const defineTypes = <T extends string>(
  types: Record<T, ProFormValueTypeMapConfig>,
): Record<T, ProFormValueTypeMapConfig> => {
  return types
}
