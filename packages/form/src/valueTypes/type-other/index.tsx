/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import React, { isValidElement, useEffect } from 'react'
import { Rate, Switch, Slider, Upload, Button, Image } from 'antd'
import { useSafeState } from 'ahooks'
import { UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { isArray, isUndefined, isString, isObject, isExist } from '@fexd/tools'
import { Hook } from '@fexd/pro-utils'

import RemoteTransfer from './RemoteTransfer'
import RemoteOptionsView from '../type-select-box/RemoteOptionsView'
import { defineTypes, ProFormValueTypeMapConfig } from '../types-define'
import useLocales from '../../locales'
import ImageGroup, { getBase64 } from './ImageGroup'

const types = defineTypes({
  // 星级组件
  rate: {
    renderField: ({ fieldProps: props = {} } = {}) => <Rate allowHalf allowClear {...(props as any)} />,
    renderView: (value, config = {}) => <Rate allowHalf allowClear disabled value={value} {...config} />,
  },
  // 开关
  switch: {
    fieldItemProps: {
      valuePropName: 'checked',
    },
    renderField: ({ fieldProps: props = {} } = {}) => <Switch {...(props as any)} />,
    renderView: (value, config = {}) => <Switch checked={value} disabled {...config} />,
  },
  slider: {
    renderField: ({ fieldProps: props = {} } = {}) => <Slider {...(props as any)} />,
    renderView: (value, config = {}) => <Slider value={value} disabled {...(config as any)} />,
  },
  transfer: {
    renderField: ({ fieldProps: props = {} } = {}) => <RemoteTransfer {...(props as any)} />,
    renderView: (value, config = {}) => <RemoteOptionsView {...config} options={config?.options} value={value} />,
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

          return (
            <Upload
              children={
                !isUndefined(children) ? (
                  children
                ) : (props.fileList?.length ?? 0) >= maxCount ? null : (
                  <Button icon={<UploadOutlined />}>{t('form.clickToUpload')}</Button>
                )
              }
              beforeUpload={() => false}
              {...props}
            />
          )
        }}
      </Hook>
    ),
    renderView: (value, config = {}) => (
      <Hook>
        {() => {
          // console.log(value)

          if (isString(value) || isValidElement(value)) {
            return value
          }

          if (isObject(value?.[0]) && 'name' in value?.[0]) {
            return (
              <Upload
                fileList={value}
                showUploadList={{
                  showRemoveIcon: false,
                }}
              >
                {null}
              </Upload>
            )
          }

          return '--'
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
          const [previewUrl, setPreviewUrl] = useSafeState<any>()
          // const [showPreview, setShowPreview] = useSafeState(false)

          return (
            <>
              <Upload
                listType="picture-card"
                children={
                  !isUndefined(children) ? (
                    children
                  ) : (props.fileList?.length ?? 0) >= maxCount ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>{t('form.clickToUpload')}</div>
                    </div>
                  )
                }
                onPreview={async (file) => {
                  console.log('file', file)
                  if (file?.originFileObj) {
                    const base64 = await getBase64(file?.originFileObj)
                    setPreviewUrl(base64)
                  } else {
                    setPreviewUrl(file?.url)
                  }
                }}
                beforeUpload={() => false}
                {...props}
              />
              <div style={{ display: 'none' }}>
                <Image
                  src={previewUrl}
                  preview={{
                    visible: isExist(previewUrl),
                    src: previewUrl,
                    onVisibleChange: (value) => {
                      setPreviewUrl(undefined)
                    },
                  }}
                />
              </div>
            </>
          )
        }}
      </Hook>
    ),
    renderView: (value, config = {}) => (
      <Hook>
        {() => {
          if (isValidElement(value)) {
            return value
          }

          if (isString(value) || isString(value?.[0])) {
            return <ImageGroup srcList={isArray(value) ? value : [value]} />
          }

          if (isObject(value?.[0]) && 'name' in value?.[0]) {
            return <ImageGroup fileList={value} />
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
