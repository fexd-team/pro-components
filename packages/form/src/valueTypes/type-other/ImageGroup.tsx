/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import React, { useEffect } from 'react'
import { Image } from 'antd'
import { useSafeState } from 'ahooks'
import { LoadingOutlined } from '@ant-design/icons'
import { isArray } from '@fexd/tools'

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function ImageGroup({ srcList: proSrcList, fileList }: any) {
  const [srcList, setSrcList] = useSafeState<string[]>(proSrcList)

  useEffect(() => {
    if (isArray(fileList)) {
      Promise.all(fileList.map((file) => file?.url ?? getBase64(file?.originFileObj ?? file))).then(setSrcList)
    }
  }, [fileList])

  if (!isArray(srcList)) {
    return <LoadingOutlined />
  }

  return (
    <Image.PreviewGroup>
      {(srcList ?? []).map((src, index) => (
        <Image key={src} width={160} src={src} />
      ))}
    </Image.PreviewGroup>
  )
}
