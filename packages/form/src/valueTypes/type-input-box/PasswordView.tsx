import React, { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { clamp } from '@fexd/tools'

export default function PasswordView({ value }: any) {
  const [decrypted, setDecrypt] = useState(false)

  const Icon = decrypted ? EyeOutlined : EyeInvisibleOutlined

  return !value ? (
    <>--</>
  ) : (
    <span>
      {decrypted ? value : Array(clamp(String(value)?.length ?? 0, 0, 8)).fill('*')}
      <Icon style={{ marginLeft: 2, color: '#1890ff' }} onClick={() => setDecrypt((value) => !value)} />
    </span>
  )
}
