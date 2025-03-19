import React from 'react'
import { FormInstance } from 'antd'
import { NamePath, InternalNamePath } from 'antd/es/form/interface'
import { getFieldId, toArray } from 'antd/es/form/util'
import scrollIntoView from 'scroll-into-view-if-needed'
import { flatten } from '@fexd/tools'
import { InternalFormInstance } from 'rc-field-form/es/interface'

import { ProFormInstance } from './types'
import ProFormStore from './ProFormStore'

function toNamePathStr(name: NamePath) {
  const namePath = toArray(name)
  return namePath.join('_')
}

export async function validateFormGroups<T>(form: FormInstance<T> | ProFormInstance<T>, groups: string[]) {
  // @ts-ignore
  const groupRegisterMap = form.groupRegisterMap as any
  const fieldNames = flatten(groups.map((group) => Object.values(groupRegisterMap?.[group] ?? {}) ?? []))

  return await form.validateFields(fieldNames)
}

export default function createForm<T = any>(form?: ProFormInstance<T>): ProFormInstance<T> {
  if (form) {
    return form
  }

  const formStore = new ProFormStore(() => {})

  const itemsRef = {
    current: {},
  } as React.RefObject<any>

  const rcForm = formStore.getForm() as any

  const wrapForm = {
    ...rcForm,
    __INTERNAL__: {
      itemRef: (name: InternalNamePath) => (node: React.ReactElement) => {
        const namePathStr = toNamePathStr(name)
        if (node) {
          itemsRef.current[namePathStr] = node
        } else {
          delete itemsRef.current[namePathStr]
        }
      },
    },
    scrollToField: (name: NamePath, options: ScrollOptions = {}) => {
      const namePath = toArray(name)
      const fieldId = getFieldId(namePath, wrapForm.__INTERNAL__.name)
      const node: HTMLElement | null = fieldId ? document.getElementById(fieldId) : null

      if (node) {
        scrollIntoView(node, {
          scrollMode: 'if-needed',
          block: 'nearest',
          ...options,
        } as any)
      }
    },
    getFieldInstance: (name: NamePath) => {
      const namePathStr = toNamePathStr(name)
      return itemsRef.current[namePathStr]
    },
    validateGroups: (groups: string[]) => validateFormGroups(rcForm, groups),
  }

  return wrapForm
}
