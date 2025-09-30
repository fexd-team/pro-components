import React from 'react'
import { ProForm, ProField } from '@fexd/pro-components'
import { Form, Switch, Select } from 'antd'

/**
  问题，在嵌套 Form 中同时使用了同一个 form，父级 FormItem 如果设置了 preserve={false}，子 Form 卸载再重建后，会把父级 preserve false 的 FormItem 重置
  具体代码位置：
  FormStore 中关于 prevWithoutPreserves 的逻辑：https://github.dev/react-component/field-form/blob/v1.27.4/src/useForm.tsx
  Form 中卸载时会调用 destroyForm 方法，触发 prevWithoutPreserves

  Form 上设置 preserve 不会有这个问题
 */

function Good() {
  const [form] = ProForm.useForm()

  // window.form = form

  const ctxKey = 'test'

  return (
    <ProForm form={form}>
      <ProForm.Item shouldUpdate noStyle>
        {() => {
          const selected = form.getFieldValue([ctxKey, 'isNeed'])

          return (
            <>
              <ProField noStyle name={[ctxKey, 'isNeed']} initialValue={false} type="switch" />
              {selected && (
                <ProForm preserve form={form}>
                  <ProForm.Item noStyle name={[ctxKey, 'type']}>
                    <Select
                      options={[1, 2, 3, 4, 5]?.map((type: any) => ({
                        value: type,
                        label: type,
                      }))}
                    />
                  </ProForm.Item>
                </ProForm>
              )}
            </>
          )
        }}
      </ProForm.Item>
    </ProForm>
  )
}

function Bad() {
  const [form] = Form.useForm()

  // window.form = form

  const ctxKey = 'test'

  return (
    <Form form={form}>
      <Form.Item shouldUpdate noStyle>
        {() => {
          const selected = form.getFieldValue([ctxKey, 'isNeed'])

          return (
            <>
              <Form.Item noStyle name={[ctxKey, 'isNeed']} preserve={false} initialValue={false}>
                <Switch />
              </Form.Item>
              {selected && (
                <Form preserve form={form}>
                  <Form.Item noStyle name={[ctxKey, 'type']}>
                    <Select
                      options={[1, 2, 3, 4, 5]?.map((type: any) => ({
                        value: type,
                        label: type,
                      }))}
                    />
                  </Form.Item>
                </Form>
              )}
            </>
          )
        }}
      </Form.Item>
    </Form>
  )
}

export default Bad
