/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import React, { useEffect } from 'react'
import { Image, ImageProps } from 'antd'
import { useSafeState } from 'ahooks'
import { LoadingOutlined } from '@ant-design/icons'
import { isArray, classnames } from '@fexd/tools'
import { GroupConsumerProps } from 'rc-image/lib/PreviewGroup'
import file2base64 from '../utils/file2base64'

export interface PreviewImageGroupProps {
  srcList?: string[]
  fileList?: any[]
  previewGroupWrapperClassName?: string
  previewGroupWrapperStyle?: React.CSSProperties
  previewGroupProps?: GroupConsumerProps
  imageProps?: ImageProps
  onLoad?: () => void
}

export default function PreviewImageGroup({
  srcList: proSrcList = [],
  fileList,
  previewGroupProps = {},
  imageProps = {},
  previewGroupWrapperClassName,
  previewGroupWrapperStyle,
  onLoad,
}: PreviewImageGroupProps) {
  const [srcList, setSrcList] = useSafeState<string[]>(proSrcList)

  useEffect(() => {
    if (isArray(fileList)) {
      Promise.all(fileList.map((file) => file?.url ?? file2base64(file?.originFileObj ?? file)))
        .then(setSrcList)
        .then(() => {
          onLoad?.()
        })
    } else {
      onLoad?.()
    }
  }, [fileList])

  if (!isArray(srcList)) {
    return <LoadingOutlined />
  }

  return (
    <div
      className={classnames('f-pro-utils-preview-image-group', previewGroupWrapperClassName)}
      style={previewGroupWrapperStyle}
      onClick={(e) => e.stopPropagation()}
    >
      <Image.PreviewGroup {...previewGroupProps}>
        {(srcList ?? []).map((src, index) => (
          <Image key={src} width={100} height={100} src={src} {...imageProps} />
        ))}
      </Image.PreviewGroup>
    </div>
  )
}
