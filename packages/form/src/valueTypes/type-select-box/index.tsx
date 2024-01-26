import React from 'react'
import { Cascader } from 'antd'
import { run } from '@fexd/tools'
import { Hook } from '@fexd/pro-utils'

import useLocales from '../../locales'
import { defineTypes, ProFormValueTypeMapConfig } from '../types-define'
import RemoteOptionsView from './RemoteOptionsView'
import RemoteCascaderView from './RemoteCascaderView'
import RemoteSelect from './RemoteSelect'
import RemoteTreeSelect from './RemoteTreeSelect'
import useModalSelect from './useModalSelect'

const types = defineTypes({
  // 下拉框
  select: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <RemoteSelect allowClear showSearch showArrow optionFilterProp="label" {...(props as any)} />
    ),
    renderView: (value, config = {}) => <RemoteOptionsView {...config} options={config?.options} value={value} />,
  },
  // 下拉框
  multipleSelect: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <RemoteSelect allowClear showSearch showArrow optionFilterProp="label" mode="multiple" {...(props as any)} />
    ),
    renderView: (value, config = {}) => <RemoteOptionsView {...config} options={config?.options} value={value} />,
  },
  // 树形下拉框
  treeSelect: {
    renderField: ({ fieldProps: props = {} } = {}) => <RemoteTreeSelect {...(props as any)} />,
    renderView: (value, config = {}) => <RemoteOptionsView {...config} options={config?.options} value={value} />,
  },
  // 树形下拉框
  multipleTreeSelect: {
    renderField: ({ fieldProps: props = {} } = {}) => <RemoteTreeSelect treeCheckable {...(props as any)} multiple />,
    renderView: (value, config = {}) => <RemoteOptionsView {...config} options={config?.options} value={value} />,
  },

  // 级联选择器
  cascader: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <Cascader placeholder={t('form.pleaseSelect')} {...props} />
        }}
      </Hook>
    ),
    renderView: (value, config = {}) => <RemoteCascaderView {...config} options={config?.options} value={value} />,
  },
  // 弹窗单选框
  modalSelect: {
    renderField: ({ fieldProps: props = {}, field, modalStationId } = {}) => (
      <Hook {...props}>
        {(props) => {
          const {
            props: modalSelectProps,
            options,
            destroy,
          } = useModalSelect({
            value: props?.value,
            getModalConfig: props?.getModalConfig,
            onChange: props?.onChange,
            modalStationId,
            initialOptions: props?.options,
          })
          const mergedProps = {
            ...modalSelectProps,
            ...props,
          }

          return (
            <RemoteSelect
              allowClear
              showArrow
              optionFilterProp="label"
              {...mergedProps}
              onClear={(...args) => {
                run(destroy)
                run(mergedProps, 'onClear', ...args)
              }}
              options={props?.options ?? options}
            />
          )
        }}
      </Hook>
    ),
    renderView: (value, config = {}) => <RemoteOptionsView {...config} options={config?.options} value={value} />,
  },
  // 弹窗多选框
  modalMultipleSelect: {
    renderField: ({ fieldProps: props = {}, field, modalStationId } = {}) => (
      <Hook {...props}>
        {(props) => {
          const {
            props: modalSelectProps,
            options,
            destroy,
          } = useModalSelect({
            value: props?.value,
            getModalConfig: props?.getModalConfig,
            onChange: props?.onChange,
            modalStationId,
            multiple: true,
            initialOptions: props?.options,
          })
          const mergedProps = {
            ...modalSelectProps,
            ...props,
          }

          return (
            <RemoteSelect
              allowClear
              showArrow
              optionFilterProp="label"
              mode="multiple"
              {...mergedProps}
              onClear={(...args) => {
                run(destroy)
                run(mergedProps, 'onClear', ...args)
              }}
              options={props?.options ?? options}
            />
          )
        }}
      </Hook>
    ),
    renderView: (value, config = {}) => <RemoteOptionsView {...config} options={config?.options} value={value} />,
  },
})

export default types
export { default as RemoteOptionsView } from './RemoteOptionsView'
export { default as RemoteCascaderView } from './RemoteCascaderView'
export { default as RemoteSelect } from './RemoteSelect'
export { default as RemoteTreeSelect } from './RemoteTreeSelect'
export * from './RemoteTreeSelect'
