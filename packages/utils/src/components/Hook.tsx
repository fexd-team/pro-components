import React, { isValidElement } from 'react'
import { run, isObject } from '@fexd/tools'

export interface HookProps {
  [key: string]: any
  hook?: (...args: any) => React.ReactNode
  children?: React.ReactNode | ((...args: any) => React.ReactNode)
}

export default function Hook({ hook, children, ...props }: HookProps): JSX.Element | null {
  const content = run<JSX.Element>(hook ?? children, undefined, props) ?? null

  if (isObject(content) && !isValidElement(content)) {
    return null
  }

  return content
}
