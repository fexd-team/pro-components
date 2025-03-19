import { useRef } from 'react'

import { ProFormInstance } from './types'
import createForm from './createForm'

export default function useForm<Values = any>(form?: ProFormInstance<Values>): [ProFormInstance<Values>] {
  const formRef = useRef<ProFormInstance<Values>>()

  if (!formRef.current) {
    formRef.current = createForm(form)
  }

  return [formRef.current]
}
