import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { isArray } from '@fexd/tools'

import useRemoteOptions from './useRemoteOptions'

export default function RemoteCascaderView(props: any) {
  const { loading, options, isRemote } = useRemoteOptions(props?.options)

  if (isRemote && loading) {
    return <LoadingOutlined />
  }

  if (!isArray(props?.value)) {
    return props?.value ?? '--'
  }

  return props?.value
    .reduce(
      ({ result, currentList }: any, item: any) => {
        const target = currentList.find((option: any) => option.value === item)

        if (target) {
          result.push(target?.label ?? target?.value)
          // eslint-disable-next-line no-param-reassign
          currentList = target?.children ?? []
        }

        return {
          result,
          currentList,
        }
      },
      {
        result: [],
        currentList: options,
      },
    )
    ?.result?.join(' / ')
}
