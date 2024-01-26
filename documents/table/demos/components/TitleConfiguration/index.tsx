import React from 'react'
import ConfigurationAreaContainer from '../ConfigurationAreaContainer'
import { ProForm, ProField } from '@fexd/pro-components'
import { debounce, run } from '@fexd/tools'

interface TitleConfigurationProps {
  onTitleChange?: (title: string) => void
}
interface FormProps {
  title: string
}

function TitleConfiguration({ onTitleChange }: TitleConfigurationProps) {
  const [form] = ProForm.useForm()

  const debounceOnTitleChange = debounce((title: string) => {
    run(onTitleChange, undefined, title)
  }, 300)

  const onValuesChange = (changedValues: FormProps, allValues?: FormProps) => {
    const { title } = changedValues
    debounceOnTitleChange(title)
  }

  return (
    <ConfigurationAreaContainer title="标题配置区">
      <ProForm form={form} onValuesChange={onValuesChange}>
        <ProField label="标题" name="title" />
      </ProForm>
    </ConfigurationAreaContainer>
  )
}

export default TitleConfiguration
