/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useUpdate } from 'ahooks'
import { EventBus } from '@fexd/tools'

import { ProFormValueTypeMapConfig } from './types-define'
import type_input_box from './type-input-box'
import type_input_number_box from './type-input-number-box'
import type_select_box from './type-select-box'
import type_select_button from './type-select-button'
import type_date_time from './type-date-time'
import type_date_time_range from './type-date-time-range'
import type_other from './type-other'

const mergedBuiltInTypes: typeof type_input_box &
  typeof type_input_number_box &
  typeof type_select_box &
  typeof type_select_button &
  typeof type_date_time &
  typeof type_date_time_range &
  typeof type_other = {
  ...type_input_box,
  ...type_input_number_box,
  ...type_select_box,
  ...type_select_button,
  ...type_date_time,
  ...type_date_time_range,
  ...type_other,
}

export type BuiltInValueTypeKeys = keyof typeof mergedBuiltInTypes

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface ValueTypes extends Record<BuiltInValueTypeKeys, ProFormValueTypeMapConfig> {
  [key: string]: ProFormValueTypeMapConfig | undefined
}

const defaultTypeConfig = {
  ...type_input_box.input,
  normalizeValue: (value: any) => value,
  normalizeFieldValue: (value: any) => value,
}

const valueTypes = Object.fromEntries(
  Object.entries(mergedBuiltInTypes).map(([key, value]) => [
    key,
    {
      ...defaultTypeConfig,
      ...(value as any),
    },
  ]),
) as ValueTypes

export const valueTypeEventBus = new EventBus()
export function useUpdateAfterValueTypeAdd() {
  const update = useUpdate()

  useEffect(() => {
    const listener = () => {
      update()
    }
    valueTypeEventBus.on('add', listener)

    return () => {
      valueTypeEventBus.off('add', listener)
    }
  }, [])
}

export function registerValueType(key: string, config: ProFormValueTypeMapConfig) {
  Object.assign(valueTypes, {
    [key]: {
      ...defaultTypeConfig,
      ...config,
    },
  })

  valueTypeEventBus.emit('add', valueTypes)
}

export default valueTypes
export * from './types-define'
export * from './type-input-box'
export * from './type-input-number-box'
export * from './type-select-box'
export * from './type-select-button'
export * from './type-date-time'
export * from './type-date-time-range'
export * from './type-other'
