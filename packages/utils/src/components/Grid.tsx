import React from 'react'
import { Row, Col, RowProps, ColProps } from 'antd'
import { isArray, run } from '@fexd/tools'

import Hook from './Hook'

export interface GridConfig extends Omit<ColProps, 'content'> {
  key?: any
  content?: React.ReactNode
}

export interface GridProps extends RowProps {
  columns?: number
  layout?: GridConfig[] | GridConfig[][]
}

const renderCols = (colConfigs: any[], span?: number) => {
  const configs = colConfigs.filter((config) => {
    return 'content' in config || !!config.span
  })
  const defaultSpan = span ?? 24 / configs?.length

  return configs.map(({ content = null, ...config }: any, idx: number) => (
    <Col key={config?.key ?? idx} {...config} span={config?.span ?? defaultSpan}>
      {content}
    </Col>
  ))
}

export default function Grid({ columns = 3, gutter = [16, 0], layout, ...props }: any) {
  return (
    <Row gutter={gutter} align="top" {...props}>
      {run(() => {
        if (!isArray(layout)) {
          return null
        }

        if (isArray(layout?.[0])) {
          return layout.map((configs) => renderCols(configs))
        }

        return renderCols(layout, 24 / columns)
      })}
    </Row>
  )
}
