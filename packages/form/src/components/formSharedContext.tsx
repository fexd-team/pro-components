import React, { createContext, useContext } from 'react'
import { ProFieldValueFieldType } from '../types'

export const formSharedContext = createContext<{
  sharedFieldProps?: ProFieldValueFieldType
  groupRegisterMap: {
    current: Record<string, Record<string, any>>
  }
}>({
  sharedFieldProps: {},
  groupRegisterMap: {
    current: {},
  },
})

export default function useFormSharedContext() {
  return useContext(formSharedContext) ?? {}
}
