import React from 'react'
import { Input } from 'antd'
import { isExist } from '@fexd/tools'
import { Hook } from '@fexd/pro-utils'

import useLocales from '../../locales'
import { defineTypes, ProFormValueTypeMapConfig } from '../types-define'
import PasswordView from './PasswordView'

const input: ProFormValueTypeMapConfig = {
  renderField: ({ fieldProps: { options = [], ...props } = {}, field } = {}) => (
    <Hook {...props}>
      {(props) => {
        const { t } = useLocales(({ t }) => [t])

        return <Input placeholder={t('form.pleaseEnter')} allowClear autoComplete="off" {...props} />
      }}
    </Hook>
  ),
  renderView: (value) => {
    if (!isExist(value) || value === '') {
      return '--'
    }

    return value
  },
}

const types = defineTypes({
  // 文本框
  input,
  text: input,
  // 密码输入框
  password: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <Input.Password placeholder={t('form.pleaseEnter')} allowClear {...props} />
        }}
      </Hook>
    ),
    renderView: (value) => <PasswordView value={value} />,
  },
  // 文本域
  textarea: {
    renderField: ({ fieldProps: props = {} } = {}) => (
      <Hook {...props}>
        {(props) => {
          const { t } = useLocales(({ t }) => [t])

          return <Input.TextArea placeholder={t('form.pleaseEnter')} allowClear {...props} />
        }}
      </Hook>
    ),
    renderView: (value) => <span className="f-pro-form-textarea-content">{value ?? '--'}</span>,
  },
})

export default types
