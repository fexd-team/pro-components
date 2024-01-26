/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useState } from 'react'
// import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { run, clamp, isExist, throttle } from '@fexd/tools'
import { Resizable, ResizeCallbackData } from 'react-resizable'

const useResizableColumns = (tableColumns: ColumnsType) => {
  const [columns, setColumns] = useState<ColumnsType<any>>(() =>
    tableColumns.map((col) => (isExist(col?.width) ? { width: col?.width } : {})),
  )

  const handleResize: Function = useCallback(
    (index: number) =>
      throttle((_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
        const newColumns = [...columns]
        newColumns[index] = {
          ...(newColumns?.[index] ?? {}),
          width: clamp(size.width, 40),
        }
        setColumns(newColumns)
      }, 128),
    [],
  )

  const mergeColumns: ColumnsType<any> = tableColumns.map((col, index) => ({
    ...col,
    ...(columns?.[index] ?? {}),
    onHeaderCell: (column: ColumnsType<any>[number]) => {
      const userConfig = run(col, 'onHeaderCell', column) ?? {}

      return {
        width: column.width,
        onResize: handleResize(index) as React.ReactEventHandler<any>,
        ...userConfig,
      }
    },
  }))

  return mergeColumns
}

export default useResizableColumns

export const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void
    width: number
  },
) => {
  const { onResize, width, ...restProps } = props

  // if (!width) {
  //   return <th {...restProps} />
  // }

  return (
    <Resizable
      width={width ?? 40}
      height={0}
      handle={
        <span
          className="f-pro-table-resizable-handle"
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}
