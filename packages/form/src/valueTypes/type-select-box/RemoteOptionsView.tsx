import React from 'react'
import { Tag, Space, Badge } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { isArray, isString, isObject, flatten, isExist } from '@fexd/tools'

import useRemoteOptions from './useRemoteOptions'

const flattenChildren = (arr: any[]): any[] => arr.map((item) => [item, flattenChildren(item?.children ?? [])])

export default function RemoteOptionsView(props: any): any {
  const { loading, options: remoteOptions, isRemote } = useRemoteOptions(props?.options)

  if (!isExist(props?.value)) {
    return '--'
  }

  const options = flatten<any>(flattenChildren([...remoteOptions, ...(props.extraOptions ?? [])]))
    ?.filter(Boolean)
    ?.map((item: any) => ({
      ...item,
      label: item?.label ?? item?.title,
    }))

  if (isRemote && loading) {
    return <LoadingOutlined />
  }

  if (isArray(props?.value)) {
    // const targets = props?.value.map((value: any) => options.find((item: any) => item?.value === value))

    // if (targets?.length === 0) {
    //   return '--'
    // }

    return (
      <Space wrap size={3}>
        {props?.value.filter(isExist).map((value: any, idx: number) => {
          const target: any = options.find((item: any) => String(item?.value) === String(value))

          return (
            <Tag
              style={{ margin: 0 }}
              color={isString(target?.tag) ? target?.tag : undefined}
              {...(isObject(target?.tag) ? target?.tag : {})}
              key={idx}
            >
              {target?.label ?? value ?? '--'}
            </Tag>
          )
        })}
      </Space>
    )

    // if (options.some((item: any) => !!item?.tag)) {
    //   return (
    //     <Space wrap size={3}>
    //       {targets.map((target: any, idx: number) => (
    //         <Tag
    //           style={{ margin: 0 }}
    //           color={isString(target?.tag) ? target?.tag : undefined}
    //           {...(isObject(target?.tag) ? target?.tag : {})}
    //           key={idx}
    //         >
    //           {target?.label}
    //         </Tag>
    //       ))}
    //     </Space>
    //   )
    // }

    // return targets?.length > 0
    //   ? targets
    //       .map((target: any) => target?.label)
    //       .filter(Boolean)
    //       .join(', ')
    //   : '--'
  }

  const target = options.find((item: any) => String(item?.value) === String(props?.value))

  // if (!target?.label) {
  //   return '--'
  // }

  if (target?.badge) {
    const isStatus = ['success', 'processing', 'default', 'error', 'warning'].includes(target?.badge)

    return (
      <Badge
        text={target?.label}
        status={isStatus ? target?.badge : undefined}
        color={!isStatus && isString(target?.badge) ? target?.badge : undefined}
        {...(isObject(target?.badge) ? target?.badge : {})}
      />
    )
  }

  return (
    <Tag
      style={{ margin: 0 }}
      color={isString(target?.tag) ? target?.tag : undefined}
      {...(isObject(target?.tag) ? target?.tag : {})}
    >
      {target?.label ?? props?.value ?? '--'}
    </Tag>
  )
}
