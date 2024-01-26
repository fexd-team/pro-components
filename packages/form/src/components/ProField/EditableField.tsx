import React, { useState, useMemo, isValidElement, memo } from 'react'
import { Space } from 'antd'

import { QuestionCircleOutlined } from '@ant-design/icons'
import {
  run,
  isArray,
  isString,
  isFunction,
  isBoolean,
  isExist,
  classnames,
  random,
  pickBy,
  isUndefined,
} from '@fexd/tools'
import { Tooltip, ModalStation } from '@fexd/pro-utils'

import useLocales from '../../locales'
import FormItem from '../FormItem'
import { ProFieldValueFieldType, ProFieldValueTypes } from '../../types'
import types, { useUpdateAfterValueTypeAdd } from '../../valueTypes'
// import { compare, getObjectValues } from '../../utils'

const EditableProField = memo(
  function EditableProField(props: ProFieldValueFieldType) {
    const {
      // key,
      fromNowTooltip,
      format,
      unit,
      builtInRule,
      numberLocale,
      currencyLocale,
      form,
      tooltip,
      props: fieldProps = {},
      fieldItemProps = {},
      type: fieldTypeName = 'text',
      options: fieldOptions,
      renderField,
      renderView,
      disabled,
      required,
      copyable,
      hook,
      placeholder,
      children,
      valuePropName: propValuePropName,
      lazyRender,
      ...field
    } = props
    const { t } = useLocales(({ t }) => [t])
    const fieldType: any = types?.[fieldTypeName as ProFieldValueTypes] ?? types.text
    const fieldTypeItemProps = fieldType?.fieldItemProps
    const valuePropName = propValuePropName ?? fieldTypeItemProps?.valuePropName ?? 'value'
    const [modalStationId] = useState(() => `station_${random(0, 99999)}`)

    const { defaultValue: rawDefaultValue, ...restFieldProps } = {
      defaultValue: field?.initialValue,
      disabled,
      ...(placeholder ? { placeholder } : {}),
      ...(run<any>(fieldProps) ?? {}),
    } as any

    const defaultValue = isExist(rawDefaultValue)
      ? run(fieldType, 'normalizeFieldValue', rawDefaultValue) ?? rawDefaultValue
      : undefined

    const mergedFormItemProps = {
      ...(isBoolean(required) ? { required } : {}),
      ...(fieldType?.fieldItemProps ?? {}),
      ...fieldItemProps,
      ...field,
    }

    useUpdateAfterValueTypeAdd()

    const builtInRenderFieldProps = {
      fieldProps: {
        defaultValue,
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
        ...(valuePropName in field ? { [valuePropName]: (field as any)?.[valuePropName] } : {}),
        // ...(valuePropName in field ? { [valuePropName]: (field as any)?.[valuePropName] } : {}),
        ...(isExist(fieldOptions) ? { options: fieldOptions } : {}),
        ...restFieldProps,
      },
      field,
      modalStationId,
    }

    const content = (
      <FormItem
        {...(isFunction(children) && !mergedFormItemProps?.dependencies
          ? {
              shouldUpdate: true,
            }
          : {})}
        {...mergedFormItemProps}
        valuePropName={valuePropName}
        className={classnames('f-pro-form-field', mergedFormItemProps?.className)}
        label={
          field?.label && (
            <Space size={6} className="f-pro-form-field-label">
              {field?.label}
              {isExist(tooltip) && (
                <Tooltip config={tooltip} content={isString(tooltip) ? <QuestionCircleOutlined /> : null} />
              )}
            </Space>
          )
        }
        rules={useMemo<ProFieldValueFieldType['rules']>(() => {
          // field?.required 快捷配置
          const requiredShortcut = required
            ? ({
                required: true,
                message: isString(required) ? required : t('form.requiredMessage'),
              } as any)
            : undefined

          if (!isArray(field?.rules)) {
            return requiredShortcut ? [requiredShortcut] : undefined
          }

          // field?.rules 中是否缺乏 required 配置，如果有，则不使用 required 快捷配置
          const noRequiredConfigInRules = !field?.rules.some((item: any) => isBoolean(item?.required))

          return [noRequiredConfigInRules ? requiredShortcut : undefined, ...field?.rules].filter(Boolean)
        }, [field?.rules, required, t])}
        initialValue={defaultValue}
        onClick={(e: any, ...args: any[]) => {
          run(e, 'stopPropagation')
          return run(mergedFormItemProps, 'onClick', e, ...args)
        }}
        {...(isFunction(children)
          ? {
              name: undefined,
            }
          : {})}
      >
        {isValidElement(children) || isFunction(children)
          ? run(children, undefined, builtInRenderFieldProps)
          : run(() => {
              if (isFunction(renderField)) {
                return renderField(builtInRenderFieldProps)
              }

              if (fieldTypeName in types) {
                return types?.[fieldTypeName]!?.renderField!(builtInRenderFieldProps)
              }

              return types?.text?.renderField!(builtInRenderFieldProps)
            })}
      </FormItem>
    )

    return (
      <>
        {content}
        <ModalStation id={modalStationId} />
      </>
    )
  },
  // (prevProps, nextProps) => compare(getObjectValues(prevProps?.field), getObjectValues(nextProps?.field)),
)

export default EditableProField
