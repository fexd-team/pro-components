/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  ReactNode,
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
  memo,
  isValidElement,
  Fragment,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { Form, FormProps, RowProps, FormItemProps, Descriptions, Space, DescriptionsProps } from 'antd'
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useDebounceFn, useMemoizedFn, useUpdate, useUpdateEffect } from 'ahooks'
import {
  run,
  flatten,
  isString,
  isArray,
  isFunction,
  isObject,
  classnames,
  pick,
  isUndefined,
  isExist,
  debounce,
} from '@fexd/tools'
import { Hook, ErrorBoundary, Grid, GridProps, GridConfig, Tooltip, filterObjectEmptyValue } from '@fexd/pro-utils'
import { useContextSize, ConfigProvider, useProContext } from '@fexd/pro-provider'
import hoistStatic from 'hoist-non-react-statics'
import { InternalFormInstance } from 'rc-field-form/es/interface'
import { HOOK_MARK } from 'rc-field-form/es/FieldContext'

import useLocales from '../locales'
import ProField from './ProField'
import FormItem from './FormItem'
import createForm from '../createForm'
import useForm from '../useForm'
import { formSharedContext } from './formSharedContext'

import {
  ProFieldValueTypes,
  ProFieldValueFieldType,
  NamePath,
  RenderFieldsConfig,
  // ProFormRenderDescriptionParams,
  ProFormInternalParams,
  // ProFormRenderParams,
  ProFormProps,
  // ProFormRef,
} from '../types'
import types from '../valueTypes'
import defineCoverableProps from '../defineCoverableProps'
import useCoverableProps from '../useCoverableProps'
import coloringOptions from '../coloringOptions'

const CoreProForm = memo(
  forwardRef(function ProForm(
    {
      gridDynamicRender: formPropGridDynamicRender,
      mode,
      form: propForm,
      layout,
      fields: propFields = [],
      gridColumns,
      size: propSize,
      gridGutter: propRridGutter,
      filterEmptyParam,
      normalizeFieldValue,
      children,
      render: propRender, // customizedRenderFields,
      sharedFieldProps = {},
      formRef,
      ...restProps
    }: ProFormProps,
    ref: any,
  ) {
    const contextSize = useContextSize()
    const size = propSize ?? contextSize
    const gridGutter = propRridGutter ?? (size === 'small' ? 12 : 16)
    const [form] = useForm(propForm)
    const fields = flatten<ProFieldValueFieldType>(propFields)
    const groupRegisterMap = useRef({})

    useMemo(() => {
      fields?.map((field) => {
        const groupRegisterInfo = field?.group
        if (isExist(groupRegisterInfo)) {
          try {
            const groupList = (isArray(groupRegisterInfo) ? groupRegisterInfo : [groupRegisterInfo]).filter((group) =>
              isString(group),
            ) as string[]

            groupList.map((group) => {
              const currentGroupInfo = groupRegisterMap?.current?.[group] ?? {}
              const name = (isArray(field?.name) ? field?.name : [field?.name]).join('.')

              currentGroupInfo[name] = isArray(field?.name) ? [...field?.name] : field?.name
              groupRegisterMap.current[group] = currentGroupInfo
            })
          } catch {}
        }
      })

      // @ts-ignore
      form.groupRegisterMap = groupRegisterMap.current
    }, [fields])

    const fieldsMap = useMemo<Record<string, ProFieldValueFieldType>>(
      () =>
        fields.reduce((map: any, field: ProFieldValueFieldType) => {
          const name = String(field?.name)
          return {
            ...map,
            [name]: { mode, ...(map?.[name] ?? {}), ...field },
          }
        }, {}) as any,
      [fields],
    )

    const fieldsMapRef = useRef<any>({})

    const renderField = (
      fieldConfig: ProFieldValueFieldType | NamePath,
      overrideConfig?: Omit<ProFieldValueFieldType, 'name'>,
    ) => {
      const fieldName = String((fieldConfig as ProFieldValueFieldType)?.name ?? fieldConfig)

      if ((isString(fieldConfig) || isArray(fieldConfig)) && !fieldsMap?.[fieldName]) {
        return null
      }

      if (isObject(fieldConfig)) {
        fieldConfig = { ...(fieldConfig as any) }
        delete (fieldConfig as any).name
        delete (fieldConfig as any).type
      }

      const field = {
        ...(fieldsMap?.[fieldName] ?? {}),
        ...(isObject(fieldConfig) ? { ...(fieldConfig as any) } : {}),
        ...(overrideConfig ?? {}),
      }

      if (!field.name) {
        return null
      }

      return (
        <ProField
          {...(isFunction(field?.hook)
            ? {
                ...field,
                hook: () => {
                  let dynamicField = run<any>(field?.hook, undefined, { form })

                  if (dynamicField === undefined || dynamicField === true) {
                    dynamicField = {}
                  }

                  return dynamicField
                },
              }
            : field)}
          ref={(ref: any) => {
            fieldsMapRef.current[fieldName] = ref
          }}
        />
      )
    }

    // 此函数用来应对 hook 动态过滤结果与预留位布局的冲突问题
    const renderDynamicFieldHook = useMemoizedFn(
      ({
        disabled = false,
        // FIXME: Object.values 会对纯数字 key 做默认排序，影响最终渲染，此处待修复
        fields = Object.values(fieldsMap),
        renderContent = () => null,
        updateDelay = 96,
      }: any = {}) => (
        <Hook>
          {() => {
            const setFieldHooksStateRef = useRef<any>()
            const fieldHooksRef = useRef<any>()
            useMemo(() => (fieldHooksRef.current = new Map()), [])

            const fieldHookNodes = disabled
              ? null
              : fields
                  .filter((field: any) => isFunction(field?.hook))
                  .map((field: any, idx: number) => (
                    <FormItem
                      key={`${field?.key ?? field?.type ?? ''}:${idx}`}
                      noStyle
                      dependencies={field?.dependencies}
                      shouldUpdate={field?.shouldUpdate ?? !field?.dependencies}
                    >
                      {() => {
                        const dynamicField: any = run(field?.hook, undefined, { form })

                        useMemo(() => {
                          fieldHooksRef.current.set(field, dynamicField)
                          run(setFieldHooksStateRef, 'current', fieldHooksRef.current)
                        }, [dynamicField])

                        return null
                      }}
                    </FormItem>
                  ))

            const contentNode = (
              <Hook>
                {() => {
                  const [fieldHooksState, setFieldHooksState] = useState()
                  const update = useUpdate()
                  const [ready, setReady] = useState(disabled ? true : false)

                  useMemo(() => {
                    setFieldHooksStateRef.current = debounce((nextState: any) => {
                      setFieldHooksState(nextState)
                      update()
                      setReady(true)
                    }, updateDelay)
                  }, [])

                  const getFieldHook = useMemoizedFn((field) => run(fieldHooksState, 'get', field))
                  return ready ? run(renderContent, undefined, { getFieldHook }) : null
                }}
              </Hook>
            )

            useEffect(() => {
              run(setFieldHooksStateRef, 'current', fieldHooksRef.current)
            }, [])

            return (
              <>
                {fieldHookNodes}
                {contentNode}
              </>
            )
          }}
        </Hook>
      ),
    )

    const renderFields = (
      configs:
        | ((ProFieldValueFieldType | NamePath) | ReactNode)[]
        | ((ProFieldValueFieldType | NamePath) | ReactNode)[][] = Object.keys(fieldsMap),
      {
        gridDynamicRender = formPropGridDynamicRender,
        freeLayout = isArray(configs?.[0]),
        useBuiltInGrid = true,
        ...config
      }: RenderFieldsConfig = {},
    ) => {
      const getFieldConfig = (config: (ProFieldValueFieldType | NamePath) | ReactNode) => {
        if (isObject(config) && isValidElement(config)) {
          return null
        }

        if (isObject(config)) {
          return config as ProFieldValueFieldType
        }

        const fieldName = String((config as ProFieldValueFieldType)?.name ?? config)

        return fieldsMap?.[fieldName]
      }

      const fields = run<ProFieldValueFieldType[]>(() => {
        if (freeLayout) {
          return flatten(configs.map((configs: any) => configs.map(getFieldConfig).filter(Boolean)))
        }

        return configs.map(getFieldConfig).filter(Boolean)
      })

      return renderDynamicFieldHook({
        disabled: !gridDynamicRender,
        renderContent: ({ getFieldHook }: any) => {
          const gridLayout = run(() => {
            const filterConfig = (config: any) => {
              const fieldConfig = getFieldConfig(config)

              if (isFunction(fieldConfig?.hook)) {
                const dynamicField = run(getFieldHook, undefined, fieldConfig)

                return dynamicField !== false
              }

              return true
            }
            const adaptGridConfig = (config: any): GridConfig | undefined => {
              if (
                isValidElement(config) &&
                config?.type === FormItem &&
                isUndefined((config?.props as any)?.label) &&
                layout === 'vertical'
              ) {
                config = React.cloneElement(config, {
                  ...(config?.props as any),
                  label: ' ',
                })
              }

              const content =
                config?.content ??
                (isValidElement(config)
                  ? config
                  : run(() => {
                      const fieldConfig = getFieldConfig(config)

                      if (gridDynamicRender && isFunction(fieldConfig?.hook)) {
                        return renderField({
                          ...fieldConfig,
                          hook: () => run(getFieldHook, undefined, fieldConfig),
                        })
                      }

                      return renderField(config)
                    }))

              const key = run(() => {
                if (isString(config)) {
                  return config
                }

                if (isExist(config?.name)) {
                  return String(config?.name)
                }

                return undefined
              })
              return {
                ...(isObject(config) && !isValidElement(config)
                  ? pick(config, [
                      'flex',
                      'offset',
                      'order',
                      'pull',
                      'push',
                      'span',
                      'xs',
                      'sm',
                      'md',
                      'lg',
                      'xl',
                      'xxl',
                    ])
                  : {}),
                ...(key ? { key } : {}),
                span: config?.colSpan ?? fieldsMap?.[config?.name ?? config]?.colSpan,
                content: isString(content) || isValidElement(content) ? content : null,
              }
            }

            if (freeLayout) {
              return configs.map((configs: any) => configs.filter(filterConfig).map(adaptGridConfig))
            }

            return configs.filter(filterConfig).map(adaptGridConfig)
          })

          return useBuiltInGrid ? (
            <Grid columns={gridColumns} gutter={gridGutter} {...config} layout={gridLayout} />
          ) : (
            <>
              {flatten(gridLayout).map((item) => (
                <Fragment key={item?.key}>{item?.content}</Fragment>
              ))}
            </>
          )
        },
        fields,
        updateDelay: 0,
      })
    }

    const renderDescriptions: ProFormInternalParams['renderDescriptions'] = ({
      gridDynamicRender = formPropGridDynamicRender,
      group,
      configs = group
        ? (Object.values(groupRegisterMap?.current?.[group] ?? {}) ?? [])?.map((names) => String(names))
        : Object.keys(fieldsMap),
      filter = () => true,
      sort = () => undefined, // 火狐浏览器中 sort: () => 1 与 chrome 表现不一致 https://forum.freecodecamp.org/t/the-sort-method-behaves-different-on-different-browsers/237221/4
      descriptionsProps = {},
      descriptionsItemProps = {},
    } = {}) => {
      const getFieldConfig = (config: (ProFieldValueFieldType | NamePath) | ReactNode) => {
        if (isObject(config) && isValidElement(config)) {
          return null
        }

        if (isObject(config)) {
          return config as ProFieldValueFieldType
        }

        const fieldName = String((config as ProFieldValueFieldType)?.name ?? config)

        return fieldsMap?.[fieldName]
      }

      const fieldConfigs = run<ProFieldValueFieldType[]>(() => {
        return configs
          .map(getFieldConfig)
          .filter(filter as any)
          .filter(Boolean)
      })

      return renderDynamicFieldHook({
        disabled: !gridDynamicRender,
        fields: fieldConfigs,
        renderContent: ({ getFieldHook }: any) => (
          <Descriptions
            layout={layout as any}
            bordered
            style={{ width: '100%' }}
            column={gridColumns}
            size="small"
            {...descriptionsProps}
          >
            {fieldConfigs
              .filter((field: any) => {
                if (isFunction(field?.hook)) {
                  const dynamicField = run(getFieldHook, undefined, field)

                  return dynamicField !== false
                }

                return true
              })
              .sort(sort as any)
              .map((field: any, idx: number) => (
                <Descriptions.Item
                  key={`${field?.key ?? field?.name ?? ''}:${field?.type ?? ''}:${idx}`}
                  // span={3}
                  label={run(() => {
                    const dynamicField = run(getFieldHook, undefined, field)
                    const label = dynamicField?.label ?? field?.label
                    const tooltip = dynamicField?.tooltip ?? field?.tooltip

                    return (
                      isExist(label) && (
                        <Space size={6}>
                          {label}
                          <Tooltip config={tooltip} content={isString(tooltip) ? <QuestionCircleOutlined /> : null} />
                        </Space>
                      )
                    )
                  })}
                  span={run(descriptionsItemProps, undefined, field)?.span ?? 1}
                  {...run(descriptionsItemProps, undefined, field)}
                >
                  <ProField
                    {...{
                      ...field,
                      label: null,
                      mode: 'view',
                      fieldItemProps: {
                        style: { marginBottom: 0 },
                      },
                      ...(isFunction(field?.hook)
                        ? {
                            hook: (...args) => {
                              const dynamicField = gridDynamicRender
                                ? run(getFieldHook, undefined, field)
                                : run(field?.hook, undefined, ...args)

                              if (!isValidElement(dynamicField) && isObject(dynamicField)) {
                                return {
                                  ...dynamicField,
                                  label: null,
                                }
                              }

                              return dynamicField
                            },
                          }
                        : {}),
                    }}
                  />
                </Descriptions.Item>
              ))}
          </Descriptions>
        ),
      })
    }

    const renderGroupFields = (group: string, options: RenderFieldsConfig = {}) => {
      const fieldNames = (Object.values(groupRegisterMap?.current?.[group] ?? {}) ?? [])?.map((names) => ({
        name: names,
      }))

      return renderFields(fieldNames, options)
    }

    const defaultRenderFields = () => {
      if (isArray(propFields?.[0])) {
        return renderFields(propFields as any)
      }

      return renderFields()

      // const renderer = mode === 'view' ? renderDescriptions : renderFields

      // return renderer()
    }

    const antdFormRef = useRef<any>()

    const normalizeValues = useMemoizedFn((values: any) => {
      const params = Object.entries(values).reduce(
        (prev: Record<string, any>, [key, value]: [string, any]) => ({
          ...prev,
          [key]:
            run(types?.[fieldsMapRef.current[key]?.current?.type as ProFieldValueTypes], 'normalizeValue', value) ??
            value,
        }),
        {},
      )

      return filterEmptyParam ? filterObjectEmptyValue(params) : params
    })

    const getFieldsValue = useMemoizedFn<typeof form.validateFields>(() => {
      const values = form.getFieldsValue()
      const params = normalizeFieldValue ? normalizeValues(values) : values

      return filterEmptyParam ? filterObjectEmptyValue(params) : params
    })

    const getValues = useMemoizedFn<typeof form.validateFields>(async (...args: any[]) => {
      const values = await form.validateFields(...args)
      const params = normalizeFieldValue ? normalizeValues(values) : values

      return filterEmptyParam ? filterObjectEmptyValue(params) : params
    })

    const getProFormInternalParams = useMemoizedFn(
      () =>
        ({
          fieldsMap,
          antdFormRef,
          fieldsMapRef,
          form,
          getValues,
          getFieldsValue,
          normalizeValues,
          renderField,
          renderFields,
          renderDescriptions,
          renderGroupFields,
        }) as ProFormInternalParams,
    )

    useImperativeHandle(ref, () => getProFormInternalParams())
    useImperativeHandle(formRef, () => getProFormInternalParams())

    const content = (
      <Form
        ref={antdFormRef as any}
        form={form}
        layout={layout}
        preserve={false}
        size={size}
        {...restProps}
        className={classnames('f-pro-form-grid-field', restProps?.className)}
      >
        {isValidElement(children) || isArray(children) ? (
          React.Children.map(children, (child, idx) => child)
        ) : (
          <Hook>
            {() => {
              const customizedRenderFields = isFunction(children) ? children : propRender

              const renderResult = run(
                isArray(customizedRenderFields)
                  ? () => renderFields(customizedRenderFields as any[])
                  : customizedRenderFields ?? defaultRenderFields,
                undefined,
                getProFormInternalParams(),
              )

              if (isArray(renderResult)) {
                return renderFields(renderResult)
              }

              return renderResult
            }}
          </Hook>
        )}
      </Form>
    )

    return (
      <ErrorBoundary>
        <ConfigProvider parentContextFirst numberLocale={{ toFixed: 2 }}>
          <useLocales.Provider>
            <formSharedContext.Provider value={{ sharedFieldProps, groupRegisterMap }}>
              {content}
            </formSharedContext.Provider>
          </useLocales.Provider>
        </ConfigProvider>
      </ErrorBoundary>
    )
  }),
)

export function useProFormRef() {
  const ref = React.useRef<ProFormInternalParams>(null)

  return ref!
}

export function createProFormRef() {
  const ref = React.createRef<ProFormInternalParams>()

  return ref!
}

type CoreProFormType = typeof CoreProForm
type FormType = typeof Form

interface ProFormType extends CoreProFormType {
  useRef: typeof useProFormRef
  createRef: typeof createProFormRef
  createForm: typeof createForm
  defaultProps: ProFormProps
  defineCoverableProps: typeof defineCoverableProps
  useCoverableProps: typeof useCoverableProps
  coloringOptions: typeof coloringOptions
}

interface ProFormType extends Omit<FormType, 'useForm'> {
  ref?: ProFormProps['formRef']
  useForm: typeof useForm
}

const ProForm: ProFormType = hoistStatic(CoreProForm, Form) as ProFormType
Object.assign(ProForm, {
  Item: FormItem,
  useRef: useProFormRef,
  createRef: createProFormRef,
  createForm,
  useForm,
  defineCoverableProps,
  useCoverableProps,
  coloringOptions,
})

ProForm.defaultProps = {
  mode: 'edit',
  layout: 'vertical',
  fields: [],
  gridColumns: 3,
  filterEmptyParam: false,
  normalizeFieldValue: true,
  gridDynamicRender: false,
}

export default ProForm
