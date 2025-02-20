/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react'
import { Checkbox, Popover } from 'antd'
import { SettingOutlined, HolderOutlined } from '@ant-design/icons'
import { useMount } from 'ahooks'
import { Hook, Action, useProState } from '@fexd/pro-utils'
import { ProField } from '@fexd/pro-form'
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
  arrayMove,
} from 'react-sortable-hoc'

import { useProps } from '../../../utils'
import useActionsPlugin from '../../actions'
import { I18nText } from '../../config'

const SortableContainer = sortableContainer(({ children }) => {
  return <div className="f-pro-table-column-setting-dragable-container">{children}</div>
})

const DragHandle = sortableHandle(() => <HolderOutlined className="f-pro-table-column-setting-dragable-item-icon" />)

const SortableCheckbox = sortableElement(({ ...props }) => {
  return (
    <div className="f-pro-table-column-setting-dragable-item">
      <DragHandle />
      <Checkbox {...props} disabled={props?.checkboxDisabled} />
    </div>
  )
})

export default function useColumnSettings({ allColumns }) {
  const { id: tableId, columnSettingPersistType } = useProps()
  const { setIconActions } = useActionsPlugin(({}) => [])

  const persistColumnSettingProState = useProState<any>(
    {
      hiddenColumns: [],
      columnSort: allColumns.map((column: any) => column?.columnSettingKey),
    },
    {
      key: tableId ? `t@${tableId}:column-setting` : undefined,
      persist: columnSettingPersistType,
      autoMergeObject: true,
      sync: false,
    },
  )

  const allColumnsRef = React.useRef(allColumns)
  allColumnsRef.current = allColumns

  useMount(() => {
    setIconActions({
      settings: (
        <Popover
          title={<I18nText text="table.columnSetting" />}
          trigger="click"
          overlayClassName="f-pro-table-column-setting-popover"
          destroyTooltipOnHide
          content={
            <Hook>
              {() => {
                const allColumns = allColumnsRef.current
                const [{ hiddenColumns, columnSort: initialColumnSort }] = useState(() =>
                  persistColumnSettingProState.getState(),
                )
                const [columnSort, setColumnSort] = useState(initialColumnSort)

                return (
                  <SortableContainer
                    useDragHandle
                    axis="y"
                    lockAxis="y"
                    // distance={5}
                    transitionDuration={100}
                    helperClass="f-pro-table-column-setting-dragable-item-helper"
                    helperContainer={() => document.querySelector('.f-pro-table-column-setting-popover') as any}
                    lockToContainerEdges
                    onSortEnd={({ oldIndex, newIndex }) => {
                      const nextColumnSort = arrayMove(columnSort, oldIndex, newIndex)
                      setColumnSort(nextColumnSort)
                      persistColumnSettingProState.setState({
                        columnSort: nextColumnSort,
                      })
                    }}
                  >
                    <ProField
                      noStyle
                      initialValue={
                        allColumns
                          .map((col: any) => col.columnSettingKey)
                          .filter((idx) => !hiddenColumns.includes(idx)) as any
                      }
                      props={{
                        renderOption: (option, index) => (
                          <SortableCheckbox
                            index={index}
                            key={option?.value}
                            value={option?.value}
                            checkboxDisabled={option?.disabled}
                          >
                            {option?.label}
                          </SortableCheckbox>
                        ),
                        onChange: (value) => {
                          const nextHiddenColumns = allColumns
                            .map((col: any) => col.columnSettingKey)
                            .filter((idx) => !value.includes(idx))
                          persistColumnSettingProState.setState({
                            hiddenColumns: nextHiddenColumns,
                          })
                        },
                      }}
                      type="checkbox"
                      options={allColumns
                        .sort(
                          (a: any, b: any) =>
                            columnSort.indexOf(a?.columnSettingKey) - columnSort.indexOf(b?.columnSettingKey),
                        )
                        .map((column, idx) => ({
                          label: column.title ?? column.label,
                          value: (column as any)?.columnSettingKey,
                          disabled: !(column?.hideable ?? true),
                        }))}
                    />
                  </SortableContainer>
                )
              }}
            </Hook>
          }
          placement="bottomRight"
        >
          <Action actionType="button" icon={<SettingOutlined />} type="text" />
        </Popover>
      ),
    })
  })

  const applyColumnSettings = useCallback(
    (allColumns) =>
      (allColumns ?? [])
        .filter(
          (column: any) => !persistColumnSettingProState.state.hiddenColumns?.includes?.(column?.columnSettingKey),
        )
        .sort(
          (a: any, b: any) =>
            persistColumnSettingProState.state.columnSort.indexOf(a?.columnSettingKey) -
            persistColumnSettingProState.state.columnSort.indexOf(b?.columnSettingKey),
        ),
    [persistColumnSettingProState.state.hiddenColumns, persistColumnSettingProState.state.columnSort],
  )

  return applyColumnSettings
}
