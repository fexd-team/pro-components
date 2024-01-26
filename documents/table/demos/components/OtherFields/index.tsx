import React from 'react'
import { Space } from 'antd'
import { ProField, ProFieldValueFieldType } from '@fexd/pro-components'

function OtherFields({ fields = [] }: { fields: ProFieldValueFieldType[] }) {
  return (
    <div style={{ padding: '20px 10px' }}>
      {fields?.map((item, index) => (
        <Space key={`${item.name}${index}`} align="center" style={{ padding: '5px 0' }}>
          <label htmlFor={String(item?.name)}>{item.label}</label>
          <ProField
            style={{ marginBottom: 0, width: '180px' }}
            {...item}
            label=""
            props={{
              size: item.type !== 'switch' ? 'small' : undefined,
              ...item?.props,
            }}
          />
        </Space>
      ))}
    </div>
  )
}

export default OtherFields
