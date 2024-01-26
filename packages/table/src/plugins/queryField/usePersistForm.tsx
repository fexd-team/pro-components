/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { FormInstance } from 'antd'
import { isObject } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'
import { useProState } from '@fexd/pro-utils'

import { useProps } from '../../utils'

export default function usePersistForm(form: FormInstance) {
  const { queryFieldPersistKey, queryFieldPersistType, queryFieldPersistFormKeyExcludes, queryFieldPersistForm } =
    useProps()
  const excludePersistFormKey = useMemoizedFn((params: any) => {
    if (!isObject(params)) {
      return params
    }

    return Object.fromEntries(Object.entries(params).filter(([key]) => !queryFieldPersistFormKeyExcludes.includes(key)))
  })

  const persistFormProState = useProState<any>(
    {},
    {
      key: queryFieldPersistForm && queryFieldPersistKey ? `qf@${queryFieldPersistKey}:form` : undefined,
      persist: queryFieldPersistType,
      autoMergeObject: false,
      sync: false,
      beforeStatePersist: excludePersistFormKey,
      beforeStateRecovery: excludePersistFormKey,
    },
  )

  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...persistFormProState.getState(),
    })
  }, [])

  return persistFormProState
}
