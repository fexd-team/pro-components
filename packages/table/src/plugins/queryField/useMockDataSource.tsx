/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useMemo, useState } from 'react'
import { Table } from 'antd'
import { run, isObject, flatten, isFunction, isNumber, isArray, sample } from '@fexd/tools'
import { Random } from 'mockjs'
import { ProFieldValueTypes } from '@fexd/pro-form'
import { isAhooksUseRequestResult } from '@fexd/pro-utils'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'

import { ProTableColumnType } from '../table/types'
import { getFieldFromColumn } from '../valueType'
import { useProps } from '../../utils'

const randomOptionValue = (options: any) => {
  if (isAhooksUseRequestResult(options)) {
    return Random.name()
  }

  if (isArray(options) && options?.length > 0) {
    const opt = Random.pick(options)
    return opt?.value ?? opt
  }

  if (isObject(options) && Object.values(options)?.length > 0) {
    const opt = Random.pick(Object.values(options))
    return opt?.value ?? opt
  }

  return Random.name()
}

export const builtInMock: Record<ProFieldValueTypes, ProTableColumnType['mock']> = {
  input: ({ Random, viewField }) => Random.name(),
  text: ({ Random, viewField }) => Random.name(),
  password: ({ Random, viewField }) => Random.id(),
  textarea: ({ Random, viewField }) => Random.sentence(),
  digit: ({ Random, viewField }) => Random.float(0, 100000, 0, 3),
  number: ({ Random, viewField }) => Random.float(0, 100000, 0, 3),
  money: ({ Random, viewField }) => Random.float(0, 100000, 0, 3),
  percent: ({ Random, viewField }) => Random.float(0, 1.5, 0, 5),
  select: ({ Random, viewField }) => randomOptionValue(viewField?.options),
  multipleSelect: ({ Random, viewField }) => [
    ...new Set(
      Array(Random.integer(1, 3))
        .fill(0)
        .map((_) => randomOptionValue(viewField?.options)),
    ),
  ],
  treeSelect: ({ Random, viewField }) => randomOptionValue(viewField?.options),
  multipleTreeSelect: ({ Random, viewField }) => [
    ...new Set(
      Array(Random.integer(1, 3))
        .fill(0)
        .map((_) => randomOptionValue(viewField?.options)),
    ),
  ],
  cascader: ({ Random, viewField }) => randomOptionValue(viewField?.options),
  modalSelect: ({ Random, viewField }) => randomOptionValue(viewField?.options),
  modalMultipleSelect: ({ Random, viewField }) => [
    ...new Set(
      Array(Random.integer(1, 3))
        .fill(0)
        .map((_) => randomOptionValue(viewField?.options)),
    ),
  ],
  checkbox: ({ Random, viewField }) => randomOptionValue(viewField?.options),
  rate: ({ Random, viewField }) => Random.integer(0, (viewField?.props as any)?.count ?? 5),
  radio: ({ Random, viewField }) => randomOptionValue(viewField?.options),
  radioButton: ({ Random, viewField }) => randomOptionValue(viewField?.options),
  date: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  dateTime: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  dateWeek: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  dateMonth: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  dateQuarter: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  dateYear: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  time: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  fromNow: ({ Random, viewField }) => dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  dateRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  dateTimeRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  dateWeekRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  dateMonthRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  dateQuarterRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  dateYearRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  timeRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  fromNowRange: ({ Random, viewField }) => [
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
    dayjs(Random.date('yyyy-MM-dd HH:mm:ss')).valueOf(),
  ],
  switch: ({ Random, viewField }) => Random.boolean(),
  slider: ({ Random, viewField }) =>
    Random.integer((viewField?.props as any)?.min ?? 0, (viewField?.props as any)?.max ?? 100),
  transfer: ({ Random, viewField }) => [
    ...new Set(
      Array(Random.integer(0, 10))
        .fill(0)
        .map((_) => randomOptionValue(viewField?.options)),
    ),
  ],
  upload: ({ Random, viewField }) =>
    `${Random.string(7, 10)}.${Random.pick([
      'png',
      'jpeg',
      'mp4',
      'mp4',
      'docx',
      'pdf',
      'ppt',
      'xls',
      'xlsx',
      'zip',
      'rar',
      '7z',
      'txt',
      'md',
      'html',
      'css',
      'js',
      'json',
      'xml',
      'yml',
      'yaml',
      'ts',
      'tsx',
    ])}`,
  image: ({ Random, viewField }) => Random.dataImage(),
}

export default function useMockDataSource() {
  const { mockDataSource: needMockDataSource, columns: propColumns } = useProps()

  const getMockConfig = (column: ProTableColumnType<any>) => {
    if ([Table.EXPAND_COLUMN, Table.SELECTION_COLUMN].some((builtInColumn) => builtInColumn === column)) {
      return []
    }

    if (isArray(column?.children)) {
      return column?.children.map((column) => getMockConfig(column))
    }

    return [
      {
        ...column,
        viewField: getFieldFromColumn(column, 'viewField'),
      },
    ]
  }

  const columnMockConfigs: ProTableColumnType[] = useMemo(
    () =>
      flatten(
        (propColumns ?? [])
          .filter(Boolean)
          .filter((column) => column?.hidden !== true)
          .map((column) => getMockConfig(column)),
      ),
    [propColumns],
  )

  const [mockDataSource, setMockDataSource] = useState<any[]>([])

  const createMockDataSource = useMemoizedFn((mockDataSourceCount = 10): any[] => {
    return Array(mockDataSourceCount)
      .fill('')
      .map(() =>
        columnMockConfigs.reduce(
          (mockData, config) => {
            const getMockData = config.mock ?? builtInMock?.[(config?.viewField as any)?.type ?? 'text']

            return {
              ...mockData,
              [(config?.viewField as any)?.name]: run(getMockData, undefined, { Random, viewField: config?.viewField }),
            }
          },
          {
            id: Random.id(),
          },
        ),
      ) as any
  })

  const [randomCount] = useState(() => Random.integer(51, 251))

  const updateMockDataSource = useMemoizedFn(() => {
    const mockDataSourceCount = isNumber(needMockDataSource) ? needMockDataSource : randomCount
    const nextMockDataSource = needMockDataSource !== false ? createMockDataSource(mockDataSourceCount) : []
    setMockDataSource(nextMockDataSource)

    return nextMockDataSource
  })

  useMemo(updateMockDataSource, [])

  return useMemo(
    () => ({
      mockDataSource,
      updateMockDataSource,
      createMockDataSource,
    }),
    [mockDataSource],
  )
}
