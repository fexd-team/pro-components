import React from 'react'
import { ProForm, ProField } from '@fexd/pro-components'
import { Button } from 'antd'

export default function ModeTrigger() {
  const [mode, setMode] = React.useState<'edit' | 'view'>('view')

  return (
    <>
      <ProForm
        mode={mode}
        initialValues={{ name: '123' }}
        fields={[
          {
            name: 'name',
            type: 'text',
          },
        ]}
      >
        {/* <></> */}
      </ProForm>
      <Button
        onClick={() => {
          setMode(mode === 'edit' ? 'view' : 'edit')
        }}
      >
        切换模式
      </Button>
    </>
  )
}
