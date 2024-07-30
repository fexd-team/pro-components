import { Form as AntdForm, FormInstance } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { flatten } from '@fexd/tools'

import { ProFormInstance } from './types'

const useAntdForm = AntdForm.useForm

export async function validateFormGroups<T>(form: FormInstance<T> | ProFormInstance<T>, groups: string[]) {
  // @ts-ignore
  const groupRegisterMap = form.groupRegisterMap as any
  const fieldNames = flatten(groups.map((group) => Object.values(groupRegisterMap?.[group] ?? {}) ?? []))

  return await form.validateFields(fieldNames)
}

export default function useForm<Values = any>(form?: ProFormInstance<Values>) {
  const [interalForm] = useAntdForm<Values>(form)

  const validateGroups = useMemoizedFn((groups: string[]) => validateFormGroups<Values>(interalForm, groups))

  return [
    Object.assign(interalForm, {
      validateGroups,
    }) as ProFormInstance,
  ] as [ProFormInstance]
}
