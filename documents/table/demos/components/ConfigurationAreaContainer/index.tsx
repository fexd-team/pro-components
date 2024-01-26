import React, { ReactNode } from 'react'
import { Card } from 'antd'

interface ConfigurationAreaContainerProps {
  title: string
  children: ReactNode
}

function ConfigurationAreaContainer({ title = '标题', children }: ConfigurationAreaContainerProps): any {
  return children
  // return (
  //   <Card size="small" title={title}>
  //     {children}
  //   </Card>
  // )
  // const titleStyle = {
  //   padding: '10px 25px',
  //   background: '#f5f5f5',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   fontSize: '14px',
  //   color: '#101010',
  //   borderBottom: '1px solid #bbbbbb',
  // }
  // const contentStyle = {
  //   padding: '10px',
  //   background: '#fff',
  // }

  // return (
  //   <div>
  //     <div style={{ border: '1px solid #bbbbbb' }}>
  //       <div style={titleStyle}>
  //         <div>{title}</div>
  //       </div>
  //       <div style={contentStyle}>{children}</div>
  //     </div>
  //   </div>
  // )
}

export default ConfigurationAreaContainer
