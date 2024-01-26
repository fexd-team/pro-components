/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useRef, useState } from 'react'
import { FormInstance } from 'antd'
import { createForm, ProFieldValueTypes } from '@fexd/pro-form'
import { run, set, EventBus } from '@fexd/tools'
import { useSafeState, useMemoizedFn } from 'ahooks'

import { useProps } from '../../../utils'
import useValueTypePlugin from '../../valueType'

// const useEditableRow = createPlugin(, 'editableTableRow')

export default function useEditableRow() {
  const { normalizeFieldValue } = useProps()
  // const [editableRowKey, setEditableRowKey] = useSetState<Record<string, any>>({})
  const { types } = useValueTypePlugin(() => [])
  const editableRowKeyRef = useRef<Record<string, any>>({})
  const tableFormConfigRef = useRef<any>({})
  const itemFormsRef = useRef<any>({})
  const getForm = useMemoizedFn((rowKey: string) => {
    const form = itemFormsRef.current?.[rowKey] ?? createForm()
    itemFormsRef.current[rowKey] = form

    return form as FormInstance<any>
  })

  const isEditable = useMemoizedFn((rowKey: any) => !!editableRowKeyRef.current?.[rowKey])
  const eventBus = useMemo(() => new EventBus(), [])

  // useMemo(() => {
  //   eventBus.emit('update')
  // }, [editableRowKeyRef])

  return {
    editableRowKeyRef,
    tableFormConfigRef,
    isEditable,
    useEditable(rowKey: any) {
      const [editable, setEditable] = useSafeState<boolean>(isEditable(rowKey))

      useEffect(() => {
        const listener = () => {
          setEditable(isEditable(rowKey))
        }
        eventBus.on('update', listener)

        return () => {
          eventBus.off('update', listener)
        }
      }, [rowKey])

      return editable
    },
    setRowEditable: (rowKey: any, value: boolean) => {
      editableRowKeyRef.current[rowKey] = value
      eventBus.emit('update')
    },
    getForm,
    setFieldConfig: (rowKey: any, fieldKey: any, config: { type: any; name: any }) => {
      tableFormConfigRef.current = set(tableFormConfigRef.current, [rowKey, String(fieldKey)], config)
    },
    normalizeValues: (rowKey: any, values: any) =>
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
          key,
          !normalizeFieldValue
            ? value
            : run(
                types?.[tableFormConfigRef.current?.[rowKey]?.[key]?.type as ProFieldValueTypes],
                'normalizeValue',
                value,
              ) ?? value,
        ]),
      ),
  }
}
