import React, { createContext, useContext } from 'react'
import { ProFieldValueFieldType } from '../types'

export const formSharedContext = createContext<{
  sharedFieldProps?: ProFieldValueFieldType
}>({
  sharedFieldProps: {},
})

export default function useFormSharedContext() {
  return useContext(formSharedContext) ?? {}
}
