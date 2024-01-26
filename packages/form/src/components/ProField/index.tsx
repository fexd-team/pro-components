import React, { memo, isValidElement, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Form } from 'antd'
import { random, run, isString, isObject, isFunction, isExist, isNumber } from '@fexd/tools'
import { ConfigProvider } from '@fexd/pro-provider'
import { ErrorBoundary } from '@fexd/pro-utils'

import useLocales from '../../locales'
import FormItem from '../FormItem'
import { ProFieldValueFieldType } from '../../types'
import FieldSwitch from './FieldSwitch'
import useFormSharedContext from '../formSharedContext'
export interface ProFieldProps extends ProFieldValueFieldType {
  ref?: any
}

// let renderTimes = 0
// let globalRenderTime = 0

// Object.assign(window, {
//   getFieldTime() {
//     return `平均时间：${(globalRenderTime / renderTimes).toFixed(2)}ms，总计渲染次数：${renderTimes}`
//   },
// })

export const ProField: React.FC<ProFieldProps> = memo(
  forwardRef(function ProField(props: ProFieldProps = {}, ref: any) {
    const { form: propForm, ...propField } = props
    const ctxLocales = useLocales()
    const withLocales = !!ctxLocales
    const { sharedFieldProps = {} } = useFormSharedContext() ?? {}

    const {
      hook,
      dependencies,
      shouldUpdate = !dependencies,
      ...field
    } = {
      ...sharedFieldProps,
      ...props,
    } as ProFieldValueFieldType
    const fieldRef = useRef(field)

    // const startRenderTime = React.useRef(0)
    // startRenderTime.current = Date.now()
    // React.useEffect(() => {
    //   const currentTime = Date.now()
    //   const timeSpend = currentTime - startRenderTime.current

    //   globalRenderTime += timeSpend
    //   renderTimes++
    // })

    // return '--'

    useImperativeHandle(ref, () => fieldRef)
    const rawContent = run(() => {
      if (isFunction(hook)) {
        return (
          <FormItem shouldUpdate={shouldUpdate} dependencies={dependencies} noStyle>
            {(form, ...args) => {
              let dynamicField: any = hook({ form } as any, ...args)!

              if (dynamicField === undefined || dynamicField === true) {
                dynamicField = {}
              }

              fieldRef.current = field

              if (!isExist(dynamicField) || dynamicField === false) {
                return null
              }

              if (isValidElement(dynamicField) || isString(dynamicField) || isNumber(dynamicField)) {
                return dynamicField
              }

              if (isObject(dynamicField) && !isValidElement(dynamicField)) {
                dynamicField = { ...dynamicField }
                // @ts-ignore
                delete dynamicField.name
                // @ts-ignore
                delete dynamicField.hook

                const mergedField = {
                  ...field,
                  ...dynamicField,
                }

                fieldRef.current = mergedField

                return <FieldSwitch key={mergedField?.key} {...mergedField} />
              }

              return null
            }}
          </FormItem>
        )
      }

      return <FieldSwitch key={props?.key} {...props} />
    })
    let content = rawContent ?? (
      <ErrorBoundary mode="inline">
        <ConfigProvider parentContextFirst numberLocale={{ toFixed: 2 }}>
          {rawContent}
        </ConfigProvider>
      </ErrorBoundary>
    )

    if (!withLocales) {
      content = <useLocales.Provider>{content}</useLocales.Provider>
    }

    if (!!propForm) {
      return (
        // 指定 form 内部时
        <Form form={propForm} component={false}>
          {content}
        </Form>
      )
    }

    return content
  }),
)

export default ProField
export { default as EditableProField } from './EditableField'
export { default as ReadonlyProField, CopyButton } from './ReadonlyField'
