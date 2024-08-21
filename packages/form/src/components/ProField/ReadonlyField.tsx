/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, isValidElement, useMemo, memo, Fragment } from 'react'
import { Space, Form } from 'antd'
import { useSafeState, useMemoizedFn } from 'ahooks'
import { QuestionCircleOutlined, CheckOutlined, CopyOutlined } from '@ant-design/icons'
import { run, isString, isObject, isFunction, copy, isExist, classnames, pickBy, isUndefined } from '@fexd/tools'
import { Action, Hook, Tooltip, useLazyRender } from '@fexd/pro-utils'

import FormItem from '../FormItem'
import { ProFieldValueFieldType, ProFieldValueTypes } from '../../types'
import types, { useUpdateAfterValueTypeAdd } from '../../valueTypes'
// import { compare, getObjectValues } from '../../utils'

export const CopyButton = memo(function CopyButton({ text, ...props }: any) {
  const [done, setDone] = useSafeState(false)

  useEffect(() => {
    if (done) {
      setTimeout(() => setDone(false), 3000)
    }
  }, [done])

  return (
    <Action
      size="small"
      type="link"
      {...props}
      icon={done ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
      onClick={(e: any) => {
        run(e, 'stopPropagation')
        copy(text)
        setDone(true)
      }}
    />
  )
})

interface ReadonlyFieldProps extends ProFieldValueFieldType {
  static?: boolean
}

export function useReadonlyField(props: ReadonlyFieldProps) {
  const {
    // key,
    // @ts-ignore
    ___value___,
    fromNowTooltip,
    format,
    unit,
    builtInRule,
    numberLocale,
    currencyLocale,
    form,
    static: staticMode = false,
    tooltip,
    props: fieldProps = {},
    fieldItemProps = {},
    type: fieldTypeName = 'text',
    options: fieldOptions,
    renderField,
    renderView = (types?.[(fieldTypeName as ProFieldValueTypes) ?? 'text'] as any)?.renderView,
    disabled,
    required,
    copyable,
    hook,
    placeholder,
    children,
    lazyRender,
    labelFontBold,
    labelClassName,
    labelStyle,
    ...field
  } = props

  // const form = Form.useFormInstance()

  const getValue = useMemoizedFn(() => {
    return (
      run(() => {
        if (!isExist(field?.name) || !form) {
          return
        }
        try {
          return form?.getFieldValue(field?.name as any)
        } catch (err) {
          return
        }
      }) ??
      field?.value ??
      field?.initialValue
    )
  })

  const getValueContent = useMemoizedFn(() => {
    const value = getValue()
    const valueContent = run(() => {
      try {
        return (
          run<any>(renderView, undefined, value, {
            options: fieldOptions,

            ...pickBy(
              {
                fromNowTooltip,
                format,
                unit,
                builtInRule,
                numberLocale,
                currencyLocale,
              },
              (value) => !isUndefined(value),
            ),
            ...props,
          }) ?? '--'
        )
      } catch (err) {
        console.error('ProTable.valueType.renderField error!', err, { field })
      }
    })

    if (isObject(valueContent) && !isValidElement(valueContent)) {
      console.warn('ProTable.valueType.renderField error! not a valid element', valueContent, { field })
      return null
    }

    return valueContent
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const lazyContent = useLazyRender({
    forceVisible: !lazyRender,
    content: () => getValueContent(),
    ...(isObject(lazyRender) ? (lazyRender as any) : {}),
  })

  return useMemoizedFn<() => JSX.Element>(() => {
    const value = getValue()
    const content =
      isValidElement(children) || isFunction(children) ? (
        run(children)
      ) : (
        <>
          {!!value && copyable && (
            <CopyButton
              className="f-pro-form-field-copy-button"
              text={String(value)}
              {...((isObject(copyable) ? copyable : {}) as any)}
            />
          )}
          {lazyContent}
        </>
      )

    // 如果不需要展示 label，且不需要 form，则认为是纯粹的内容展示，不需要 form.item 包裹
    if (staticMode || (!form && !field?.name && !field?.label)) {
      if (field?.hidden) {
        return null
      }

      return content
    }

    const mergedFormItemProps = {
      ...fieldItemProps,
      ...field,
    }

    return (
      <FormItem
        {...(isFunction(children) && !mergedFormItemProps?.dependencies
          ? {
              shouldUpdate: true,
            }
          : {})}
        {...mergedFormItemProps}
        label={
          field?.label && (
            <Space direction="horizontal" size={6}>
              <div
                className={classnames(
                  'f-pro-form-field-label',
                  {
                    'f-pro-form-field-label-font-bold': labelFontBold,
                  },
                  labelClassName,
                )}
                style={labelStyle}
              >
                {field?.label}
              </div>
              {isExist(tooltip) && (
                <Tooltip config={tooltip} content={isString(tooltip) ? <QuestionCircleOutlined /> : null} />
              )}
            </Space>
          )
        }
        {...(fieldItemProps ?? {})}
        className={classnames('f-pro-form-field f-pro-form-field-view', mergedFormItemProps?.className)}
        {...(isFunction(children)
          ? {
              name: undefined,
            }
          : {})}
      >
        <>{content}</>
        {/* <Hook>
          {function useNode() {
            React.useEffect(() => {
              console.log('didMount')
            }, [])
            return null
          }}
        </Hook> */}
      </FormItem>
    )
  })

  // return '--'
}

export const ReadonlyField = memo(
  function ReadonlyField(props: ReadonlyFieldProps) {
    const content = useReadonlyField(props)
    useUpdateAfterValueTypeAdd()

    return content()
  },
  // (prevProps, nextProps) => compare(getObjectValues(prevProps?.field), getObjectValues(nextProps?.field)),
)

export default ReadonlyField
