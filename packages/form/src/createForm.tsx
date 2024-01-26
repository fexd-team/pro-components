import React from 'react'
import { FormInstance } from 'antd'
import { NamePath, InternalNamePath } from 'antd/es/form/interface'
import { getFieldId, toArray } from 'antd/es/form/util'
import scrollIntoView from 'scroll-into-view-if-needed'
import { FormStore } from 'rc-field-form/es/useForm'

function toNamePathStr(name: NamePath) {
  const namePath = toArray(name)
  return namePath.join('_')
}

export default function createForm<T = any>(form?: FormInstance<T>): FormInstance<T> {
  if (form) {
    return form
  }

  const formStore = new FormStore(() => {})

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
        })
      }
    },
    getFieldInstance: (name: NamePath) => {
      const namePathStr = toNamePathStr(name)
      return itemsRef.current[namePathStr]
    },
  }

  return wrapForm
}
