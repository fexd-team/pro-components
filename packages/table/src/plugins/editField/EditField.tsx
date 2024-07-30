/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useImperativeHandle, forwardRef, useMemo, memo } from 'react'
import { message, Empty } from 'antd'
import { run, isFunction, isUndefined, isBoolean, isExist } from '@fexd/tools'
import { useMemoizedFn } from 'ahooks'
import { ProForm, ProFieldValueTypes, ProFormProps } from '@fexd/pro-form'

import { useProps } from '../../utils'
import useValueTypePlugin from '../valueType'
import useModalPlugin from '../modal'
import useQueryFieldPlugin from '../queryField'
import useConfigPlugin from '../config'
import { ProTableEditFieldType, ProTableEditFieldsConfig, ProTableEditFieldMode } from '../../types'
import useFieldsConfig from './useFieldsConfig'
import useItem from '../table/useItem'
import useFieldParams from './useFieldParams'
import handleAsyncActionResponse from '../actions/handleAsyncActionResponse'

const EditField = memo(
  forwardRef(function EditField(
    {
      item,
      // readonly: modalReadonly,
      initialValues: propInitialValues = {},
      mode,
    }: { item?: any; initialValues?: any; mode: ProTableEditFieldMode },
    ref,
  ) {
    const {
      onEdit,
      onAdd,
      editFieldFilterEmptyParam,
      addFieldFilterEmptyParam,
      refreshAfterAdd,
      refreshAfterEdit,
      normalizeFieldValue,
      whenToTriggerOnEdit,
      editFieldLayout,
      viewFieldLayout,
      addFieldLayout,
      editFieldColumns,
      viewFieldColumns,
      addFieldColumns,
      editFieldGutter,
      viewFieldGutter,
      addFieldGutter,
      renderModalEditFields,
      renderModalViewFields,
      renderModalAddFields,
      editFieldFormProps,
      addFieldFormProps,
      viewFieldFormProps,
      rawProps,
    } = useProps()

    const fieldFormProps = run<ProFormProps>(
      {
        add: addFieldFormProps,
        edit: editFieldFormProps,
        view: (...args: any[]) => ({
          ...run(viewFieldFormProps, undefined, ...args),
          ...(isExist(rawProps?.viewFieldFormProps)
            ? {}
            : {
                requiredMark: undefined,
              }),
        }),
      },
      mode,
      item,
      mode,
    )

    const { confirmPromise } = useModalPlugin(() => [])
    const queryField = useQueryFieldPlugin()
    const [form] = ProForm.useForm(fieldFormProps?.form)
    const isFieldsChanged = useMemoizedFn(() => run(form, 'isFieldsTouched'))
    const getFieldsConfig = useFieldsConfig()
    const { types } = useValueTypePlugin(() => [])

    const fieldsConfig = getFieldsConfig(item, mode)

    const { fields, isAvailable } = fieldsConfig as ProTableEditFieldsConfig
    const { t } = useConfigPlugin(() => [])

    const fieldsMap = Object.assign(
      {},
      ...fields.map((field: ProTableEditFieldType) => ({
        [String(field?.name)]: isFunction(field?.hook)
          ? {
              ...field,
              hook: () => run(field?.hook, undefined, { item, form, mode }),
            }
          : field,
      })),
    )

    const getField = (fieldName: string): ProTableEditFieldType | undefined => {
      const field = fieldsMap?.[fieldName]
      if (!!field) {
        return { ...field }
      }

      return undefined
    }

    const layout = run<any>(
      {
        add: addFieldLayout,
        edit: editFieldLayout,
        view: viewFieldLayout,
      },
      mode,
      item,
      mode,
    )
    const gridColumns = run<any>(
      {
        add: addFieldColumns,
        edit: editFieldColumns,
        view: viewFieldColumns,
      },
      mode,
      item,
      mode,
    )
    const gridGutter = run<any>(
      {
        add: addFieldGutter,
        edit: editFieldGutter,
        view: viewFieldGutter,
      },
      mode,
      item,
      mode,
    )
    const renderModalFields = {
      add: renderModalAddFields,
      edit: renderModalEditFields,
      view: renderModalViewFields,
    }[mode]

    // 数据格式校验
    const initialValues = useMemo<Record<string, any>>(
      () =>
        Object.assign(
          {},
          ...[
            ...Object.entries(fieldsMap)
              .map(([key, field]: any) => [key, field?.initialValue])
              .filter(([, value]) => !isUndefined(value)),
            ...Object.entries(propInitialValues),
          ].map(([key, value]: any) => ({
            [key]: run(() => {
              const fieldType: any = types?.[getField(key)?.type as ProFieldValueTypes] ?? types.text
              return run(fieldType, 'normalizeFieldValue', value) ?? value
            }),
          })),
        ),
      [fieldsMap],
    )

    const proFormRef = useRef<any>()

    // window.proFormRef = proFormRef

    const submit = useMemoizedFn(async () => {
      if (mode === 'view') {
        return
      }

      if (mode === 'add') {
        try {
          const params = await proFormRef?.current?.getValues()

          let response = (await run(onAdd, undefined, params)) as any

          if (isBoolean(response)) {
            response = {
              success: response,
            }
          }

          handleAsyncActionResponse(response)

          const { success } = response ?? {
            success: true,
          }

          if (!success) {
            return false
          }

          if (refreshAfterAdd) {
            setTimeout(queryField.refresh, 300)
          }

          return true
        } catch (err) {
          console.error(err)
          return false
        }
      }

      // edit 模式下如果没有改变就直接退出
      if (whenToTriggerOnEdit === 'changed' && isFieldsChanged() === false) {
        return
      }

      try {
        const params = await proFormRef?.current?.getValues()

        let response = (await run(onEdit, undefined, params, item)) as any

        if (isBoolean(response)) {
          response = {
            success: response,
          }
        }

        handleAsyncActionResponse(response)

        const { success } = response ?? {
          success: true,
        }

        if (!success) {
          return false
        }

        if (refreshAfterEdit) {
          setTimeout(queryField.refresh, 300)
        }

        return true
      } catch (err) {
        console.error(err)
        return false
      }
    })

    const cancel = useMemoizedFn(() => {
      if (mode === 'view') {
        return
      }

      if (isFieldsChanged() && Object.values(form.getFieldsValue()).filter(isExist)?.length > 0) {
        return confirmPromise(t('editField.saveTips'), {})
      }

      return true
    })

    useImperativeHandle(ref, () => ({ submit, cancel, proFormRef, form }))

    const defaultRenderFields = ({ renderDescriptions, renderFields }: any) => {
      if (!isAvailable) {
        return <Empty />
      }

      if (mode === 'view') {
        return renderDescriptions()
      }

      return renderFields()
    }

    return (
      <useItem.Provider value={item}>
        <useFieldParams.Provider value={useMemo(() => ({ mode, viewType: 'field', form }), [])}>
          <ProForm
            key={mode}
            ref={proFormRef}
            normalizeFieldValue={normalizeFieldValue}
            filterEmptyParam={mode === 'add' ? addFieldFilterEmptyParam : editFieldFilterEmptyParam}
            initialValues={initialValues}
            fields={
              Object.values(fieldsMap).map((field: any) => ({
                ...field,
                mode: field?.mode ?? (field?.readonly || mode === 'view' ? 'view' : 'edit'),
                initialValue: initialValues?.[String(field?.name)] ?? form.getFieldValue(field?.name),
              })) as any
            }
            form={form}
            layout={layout}
            gridColumns={gridColumns}
            gridGutter={gridGutter}
            gridDynamicRender={mode === 'view'}
            render={({ renderField, renderFields, renderDescriptions, renderGroupFields, ...rest }) =>
              run(renderModalFields ?? defaultRenderFields, undefined, {
                ...rest,
                fieldsMap,
                fieldsConfig,
                getField,
                renderField,
                renderFields,
                renderDescriptions,
                renderGroupFields,
                form,
                item,
                mode,
              })
            }
            {...(fieldFormProps ?? {})}
          />
        </useFieldParams.Provider>
      </useItem.Provider>
    )
  }),
)

export default EditField
