import React from 'react'
import { Rate } from 'antd'

import RemoteOptionsView from '../type-select-box/RemoteOptionsView'
import RemoteCheckbox from './RemoteCheckbox'
import RemoteRadio from './RemoteRadio'
import { defineTypes, ProFormValueTypeMapConfig } from '../types-define'

const types = defineTypes({
  // 多选框
  checkbox: {
    renderField: ({ fieldProps: props = {} } = {}) => <RemoteCheckbox {...(props as any)} />,
    renderView: (value, config = {}) => (
      <RemoteOptionsView {...((config?.props as any) ?? {})} options={config?.options} value={value} />
    ),
  },
  // 星级组件
  rate: {
    renderField: ({ fieldProps: props = {} } = {}) => <Rate allowHalf allowClear {...(props as any)} />,
    renderView: (value, config = {}) => <Rate {...((config?.props as any) ?? {})} disabled value={value} />,
  },
  // 单选框
  radio: {
    renderField: ({ fieldProps: props = {} } = {}) => <RemoteRadio {...(props as any)} />,
    renderView: (value, config = {}) => (
      <RemoteOptionsView {...((config?.props as any) ?? {})} options={config?.options} value={value} />
    ),
  },
  // 按钮单选框
  radioButton: {
    renderField: ({ fieldProps: props = {} } = {}) => <RemoteRadio {...(props as any)} optionType="button" />,
    renderView: (value, config = {}) => (
      <RemoteOptionsView {...((config?.props as any) ?? {})} options={config?.options} value={value} />
    ),
  },
})

export default types
export { default as RemoteCheckbox } from './RemoteCheckbox'
export { default as RemoteRadio } from './RemoteRadio'
export * from './RemoteCheckbox'
export * from './RemoteRadio'
