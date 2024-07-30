/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, memo, useState } from 'react'
import { useUpdate, useUpdateEffect } from 'ahooks'
import { isString, isExist, run, random } from '@fexd/tools'
import { Form, FormInstance } from 'antd'

import { ProFieldValueFieldType } from '../../types'
import EditableField, { useEditableField } from './EditableField'
import ReadonlyField, { useReadonlyField } from './ReadonlyField'
import { useUpdateAfterValueTypeAdd } from '../../valueTypes'
import FormItem from '../FormItem'

const genFieldKey = (field: ProFieldValueFieldType) =>
  isString(field?.key) ? `${field?.key}:${field?.type}` : field?.key ?? field?.type

const FieldSwitch = memo(function FieldSwitch({
  legacyRender = false,
  ...props
}: ProFieldValueFieldType & { legacyRender?: boolean }) {
  const { mode = 'edit' } = props!
  const [randomKey] = useState(() => random(0, 999999))
  const fieldKey = genFieldKey(props!) ?? '(?)'
  const key = `pf_${randomKey}_${fieldKey}`

  const Field = mode === 'view' ? ReadonlyField : EditableField
  const update = useUpdate()

  useUpdateEffect(() => {
    update() // key 变化后多触发一次渲染，修复 rc-field-form 未能及时应用最新值的问题
  }, [key])

  const readonlyFieldNode = useReadonlyField(props)
  const editableFieldNode = useEditableField(props)
  useUpdateAfterValueTypeAdd(!legacyRender)

  const content = legacyRender ? (
    <Field key={key} {...props} />
  ) : (
    <Fragment key={key}>{mode === 'view' ? readonlyFieldNode : editableFieldNode}</Fragment>
  )

  // if (props?.name) {
  //   console.log('props?.name', props?.name)
  //   return (
  //     <FormItem noStyle dependencies={[props?.name]}>
  //       {() => {
  //         console.log('cahnge')
  //         return <Field key={key} {...props} />
  //       }}
  //     </FormItem>
  //   )
  // }

  return content
})

const ProFieldSwitch = memo(function ProFieldSwitch({ form: propForm, ...props }: ProFieldValueFieldType): JSX.Element {
  const ctxForm = Form.useFormInstance()
  const form = (propForm ?? ctxForm) as any as FormInstance

  if (!isExist(form)) {
    return <FieldSwitch {...props} />
  }

  return (
    <FormItem dependencies={[props?.name as any]} noStyle>
      {(itemForm) => {
        const value = run(form || itemForm, 'getFieldValue', props?.name as any)

        return (
          <FieldSwitch
            {...props}
            form={form}
            // 以下代码仅触发更新
            // @ts-ignore
            ___value___={value}
          />
        )
      }}
    </FormItem>
  )
})

export default ProFieldSwitch
