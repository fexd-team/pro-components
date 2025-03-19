import React, { isValidElement, forwardRef, useContext } from 'react'
import { Form, FormItemProps } from 'antd'
import { useContextSize } from '@fexd/pro-provider'

import { run, isObject, isFunction, classnames } from '@fexd/tools'
import hoistStatics from 'hoist-non-react-statics'

import { Hook } from '@fexd/pro-utils'

const AntdFormItem = Form.Item

type FormItemType = typeof Form.Item

const FormItem: FormItemType = hoistStatics(
  forwardRef(function FormItem({ className: propClassName, children, ...props }: FormItemProps, ref: any) {
    const size = useContextSize()

    const className = classnames('f-pro-form-item', propClassName, {
      'f-pro-form-item-small': size === 'small',
    })

    if (isFunction(children)) {
      return (
        // @ts-ignore
        <AntdFormItem ref={ref} {...props} className={className}>
          {(...args) => <Hook>{() => run(children, undefined, ...args)}</Hook>}
        </AntdFormItem>
      )
    }

    return (
      // @ts-ignore
      <AntdFormItem ref={ref} {...props} className={className}>
        {children}
      </AntdFormItem>
    )
  }),
  AntdFormItem,
) as FormItemType

export default FormItem
