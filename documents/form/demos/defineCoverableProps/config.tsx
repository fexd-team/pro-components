import React from 'react'
import { ProForm } from '@fexd/pro-components'

import CoverableForm from './CoverableForm'

export default () => {
  const formRef = ProForm.useRef()

  // @ts-ignore
  window.formRef = formRef

  return (
    <CoverableForm
      coverable={{
        proFormProps: {
          formRef,
          fields: {
            文本框: {
              type: 'select',
            },
          },
        },
        apis: {
          test: () => {
            console.log('test/api')
          },
        },
      }}
    />
  )
}
