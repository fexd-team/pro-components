import { useEffect, useState } from 'react'
import { Form, FormInstance } from 'antd'
import { HOOK_MARK } from 'rc-field-form/es/FieldContext'

import { ProFormInstance } from './types'

type ReturnPromise<T> = T extends Promise<infer ValueType> ? ValueType : never

function useValues<TForm extends FormInstance = any>(form?: TForm): ReturnPromise<ReturnType<TForm['validateFields']>>
function useValues<TForm extends ProFormInstance = any>(
  form?: TForm,
): ReturnPromise<ReturnType<TForm['validateFields']>> {
  const [values, setValues] = useState<any>({})
  const ctxForm = Form.useFormInstance()
  const formInstance = form ?? ctxForm
  // @ts-ignore
  const isValidForm = formInstance && formInstance._init

  useEffect(
    () => {
      // Skip if not exist form instance
      if (!isValidForm) {
        return
      }

      // @ts-ignore
      const { getFieldsValue, getInternalHooks } = formInstance
      const { registerWatch } = getInternalHooks?.(HOOK_MARK)

      const cancelRegister = registerWatch?.(() => {
        const nextValues = getFieldsValue?.()
        setValues(nextValues)
      })

      setValues(getFieldsValue())

      return cancelRegister
    },

    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isValidForm],
  )

  return values as any as ReturnPromise<ReturnType<TForm['validateFields']>>
}

export default useValues
