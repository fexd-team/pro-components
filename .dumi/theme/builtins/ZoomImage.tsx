import React from 'react'
import { classnames } from '@fexd/tools'
import Tooltip from 'antd/es/tooltip'
import Image from 'antd/es/image'
import 'antd/es/image/style'
import 'antd/es/tooltip/style'

export default (props) => (
  <Tooltip title="点击放大图片" mouseEnterDelay={1} placement="topRight">
    <Image
      preview={{
        mask: false,
      }}
      className={classnames('mb-6', props?.className)}
      {...props}
      style={{
        // border: 'solid 1px #f5f5f5',
        cursor: 'zoom-in',
        maxWidth: 1080,
        ...(props?.style ?? {}),
      }}
    />
  </Tooltip>
)
