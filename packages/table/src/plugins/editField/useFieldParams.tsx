import { createContext, useContext } from 'react'
import { Form, FormInstance } from 'antd'
import { UniteOmit } from '@fexd/pro-utils'

import useItem from '../table/useItem'

export const context = createContext<{
  [key: string]: any
  mode?: UniteOmit<'view' | 'edit' | 'add' | 'query'>
  viewType?: UniteOmit<'field' | 'table' | 'expand'>
  form?: FormInstance
  item?: any
}>({} as any)

const useFieldParams = function useFieldParams() {
  const contextValue = useContext(context)
  const item = useItem()
  // const ctxForm = Form.useFormInstance()

  return {
    ...contextValue,
    item: item ?? contextValue?.item,
    // form: contextValue?.form || ctxForm,
  }
}

useFieldParams.Provider = context.Provider

export default useFieldParams
