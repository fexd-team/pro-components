/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, memo, useState } from 'react'
import { TooltipProps } from 'antd'
import { run, classnames } from '@fexd/tools'
import { AbstractTooltipProps } from 'antd/es/tooltip'
import { Optional } from 'utility-types'

import Tooltip from './Tooltip'

export interface EllipsisTooltipProps extends AbstractTooltipProps {
  children: any
  tooltipContent?: any
  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
}

const EllipsisTooltip = memo(function EllipsisTooltip({
  children,
  tooltipContent = children,
  wrapperProps,
  ...props
}: EllipsisTooltipProps & Optional<TooltipProps>) {
  const [isEllipsis, setIsEllipsis] = useState(false)

  return (
    <Tooltip
      placement="top"
      title={<div onClick={(e) => run(e, 'stopPropagation')}>{tooltipContent}</div>}
      {...props}
      visible={!isEllipsis ? false : undefined}
    >
      <span
        {...wrapperProps}
        className={classnames('f-pro-utils-ellipsis-tooltip', wrapperProps?.className)}
        onMouseEnter={(e) => {
          const element = e?.target as HTMLSpanElement
          setIsEllipsis(element?.scrollWidth > element?.offsetWidth + 0)
        }}
      >
        {children}
      </span>
    </Tooltip>
  )
})

export default EllipsisTooltip
