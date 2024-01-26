import React, { isValidElement, forwardRef, memo, useMemo, useState } from 'react'
import { Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps } from 'antd'
import { AbstractTooltipProps } from 'antd/es/tooltip'
import { InfoCircleOutlined } from '@ant-design/icons'
import { isObject, isString, isExist, run } from '@fexd/tools'
import hoistStatic from 'hoist-non-react-statics'

export type TooltipConfig = string | React.ReactNode | AntdTooltipProps

export interface TooltipProps extends AbstractTooltipProps {
  title?: AntdTooltipProps['title']
  overlay?: AntdTooltipProps['overlay']
  config?: TooltipConfig
  children?: any
  content?: any
}

const defaultDestroyTooltipOnHide: AntdTooltipProps['destroyTooltipOnHide'] = { keepParent: false }

// const TooltipCore = hoistStatic(
//   memo(
//     forwardRef(function TooltipCore({ children, ...props }: AntdTooltipProps, ref): JSX.Element {
//       const [activated, setActivated] = useState(false)

//       const child = useMemo(() => {
//         if (activated) {
//           return children
//         }

//         // const rawProps = (children as any)?.props ?? {}
//         return (
//           <span
//             onMouseEnter={() => {
//               setActivated(true)
//             }}
//           >
//             {children}
//           </span>
//         )

//         // React.cloneElement(children as any, {
//         //   ...rawProps,
//         //   onMouseEnter(...args: any) {
//         //     setActivated(true)
//         //     return run(rawProps?.onMouseEnter, undefined, ...args)
//         //   },
//         // })
//       }, [children, activated])

//       // console.log(child)

//       if (!activated) {
//         return child as JSX.Element
//       }

//       return (
//         <AntdTooltip ref={ref} defaultVisible {...props}>
//           {child}
//         </AntdTooltip>
//       )
//     }),
//   ),
//   AntdTooltip,
// )

const TooltipCore = AntdTooltip

export const Tooltip = hoistStatic(
  memo(
    forwardRef(function Tooltip(props: TooltipProps, ref) {
      // return <AntdTooltip ref={ref} destroyTooltipOnHide {...props} />

      const { config = props?.title, content: propContent = null, children = propContent, ...extraProps } = props

      // 无 tooltip 时返回 null
      if (!isExist(config)) {
        // return children
        return (
          <TooltipCore
            ref={ref}
            visible={false}
            title=""
            destroyTooltipOnHide={defaultDestroyTooltipOnHide}
            {...extraProps}
          >
            {children}
          </TooltipCore>
        )
      }

      const content = (config as any)?.content ?? (config as any)?.children ?? children ?? <InfoCircleOutlined />

      // return content

      // 快捷内容
      if (isString(config) || isValidElement(config)) {
        return (
          <TooltipCore ref={ref} destroyTooltipOnHide={defaultDestroyTooltipOnHide} title={config} {...extraProps}>
            {content}
          </TooltipCore>
        )
      }

      // 配置式 tooltip
      if (isObject(config)) {
        return (
          <TooltipCore
            ref={ref}
            destroyTooltipOnHide={defaultDestroyTooltipOnHide}
            {...(config as AntdTooltipProps)}
            {...extraProps}
          >
            {content}
          </TooltipCore>
        )
      }

      // 非法内容
      return (
        <TooltipCore ref={ref} visible={false} title="" {...extraProps}>
          {children}
        </TooltipCore>
      )
    }),
  ),
  AntdTooltip,
)

export interface RenderTooltipConfig extends TooltipProps {
  ref?: any
}

export const renderTooltip = (tooltipConfig: RenderTooltipConfig) => {
  return <Tooltip {...tooltipConfig} />
}

export default Tooltip
