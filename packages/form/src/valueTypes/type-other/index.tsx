/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import React, { isValidElement, useEffect, useMemo } from 'react'
import { Rate, Switch, Slider, Upload, Button, Image } from 'antd'
import { useSafeState } from 'ahooks'
import { UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { isArray, isUndefined, isString, isObject, isExist } from '@fexd/tools'
import { Hook, PreviewImageGroup, file2base64, showImages } from '@fexd/pro-utils'

import RemoteTransfer from './RemoteTransfer'
import RemoteOptionsView from '../type-select-box/RemoteOptionsView'
import { defineTypes, ProFormValueTypeMapConfig } from '../types-define'
import useLocales from '../../locales'

function useFileList(value) {
  const fileList = useMemo(() => {
    const fileList = isArray(value) ? value : [value]

    return fileList
      .map((file, idx) =>
        isString(file)
          ? {
              uid: idx,
              name: file,
              status: 'done',
              url: file,
            }
          : isObject(file) && 'name' in file
            ? file
            : undefined,
      )
      .filter(Boolean)
  }, [value])

  return fileList
}

const types = defineTypes({
  // 星级组件
  rate: {
    renderField: ({ fieldProps: props = {} } = {}) => <Rate allowHalf allowClear {...(props as any)} />,
    renderView: (value, config = {}) => (
      <Rate allowHalf allowClear disabled value={value} {...((config?.props as any) ?? {})} />
    ),
  },
  // 开关
  switch: {
    fieldItemProps: {
      valuePropName: 'checked',
    },
    renderField: ({ fieldProps: props = {} } = {}) => <Switch {...(props as any)} />,
    renderView: (value, config = {}) => <Switch checked={value} disabled {...((config?.props as any) ?? {})} />,
  },
  slider: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Slider
        // style={{ marginLeft: 12, marginRight: 12 }}
        {...(props as any)}
      />
    ),
    renderView: (value, config = {}) => (
      <Slider
        // style={{ marginLeft: 12, marginRight: 12 }}
        value={value}
        readonly
        {...(config?.props as any)}
      />
    ),
  },
  transfer: {
    renderField: ({ fieldProps: props = {} } = {}) => <RemoteTransfer {...(props as any)} />,
    renderView: (value, config = {}) => (
      <RemoteOptionsView {...((config?.props as any) ?? {})} options={config?.options} value={value} />
    ),
  },
  upload: {
    fieldItemProps: {
      valuePropName: 'fileList',
      getValueFromEvent: (e) => {
        // console.log('Upload event:', e)
        if (isArray(e)) {
          return e
        }
        return e?.fileList
      },
    },
    // @ts-ignore
    renderField: ({ fieldProps: { children, ...props } = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const { maxCount = Infinity } = props

          const fileList = useFileList(props.fileList)

          return (
            <Upload
              multiple={maxCount <= 1 ? false : true}
              children={
                !isUndefined(children) ? (
                  children
                ) : (fileList?.length ?? 0) >= maxCount ? null : (
                  <Button icon={<UploadOutlined />}>{t('form.clickToUpload')}</Button>
                )
              }
              beforeUpload={() => false}
              {...props}
              fileList={fileList}
            />
          )
        }}
      </Hook>
    ),
    renderView: (value, config: any = {}) => (
      <Hook>
        {() => {
          const fileList = useFileList(value)

          if (fileList?.length === 0) {
            return '--'
          }

          return (
            <Upload
              fileList={fileList}
              showUploadList={{
                showRemoveIcon: false,
              }}
              {...((config?.props as any) ?? {})}
            >
              {null}
            </Upload>
          )
        }}
      </Hook>
    ),
  },
  image: {
    fieldItemProps: {
      valuePropName: 'fileList',
      getValueFromEvent: (e) => {
        // console.log('Upload event:', e)
        if (isArray(e)) {
          return e
        }
        return e?.fileList
      },
    },
    // @ts-ignore
    renderField: ({ fieldProps: { children, ...props } = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])
          const { maxCount = Infinity } = props
          // const [showPreview, setShowPreview] = useSafeState(false)
          const fileList = useFileList(props?.fileList)

          return (
            <Upload
              listType="picture-card"
              accept="image/*"
              multiple={maxCount <= 1 ? false : true}
              children={
                !isUndefined(children) ? (
                  children
                ) : (fileList?.length ?? 0) >= maxCount ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>{t('form.clickToUpload')}</div>
                  </div>
                )
              }
              onPreview={async (file) => {
                const imageList = await Promise.all(
                  fileList?.map(async (file) =>
                    file?.originFileObj ? await file2base64(file?.originFileObj) : file?.url,
                  ),
                )

                const previewIndex = fileList?.findIndex((f) => f?.uid === file?.uid)

                await showImages({
                  srcList: imageList,
                  current: previewIndex,
                })
              }}
              beforeUpload={() => false}
              {...props}
              fileList={fileList}
            />
          )
        }}
      </Hook>
    ),
    renderView: (value, config: any = {}) => (
      <Hook>
        {() => {
          if (isValidElement(value)) {
            return value
          }

          if (isString(value) || isString(value?.[0])) {
            return <PreviewImageGroup srcList={isArray(value) ? value : [value]} {...((config?.props as any) ?? {})} />
          }

          if (isObject(value?.[0]) && 'name' in value?.[0]) {
            return <PreviewImageGroup fileList={value} {...((config?.props as any) ?? {})} />
          }

          return '--'
        }}
      </Hook>
    ),
  },
})

export default types
export { default as RemoteTransfer } from './RemoteTransfer'
export * from './RemoteTransfer'
