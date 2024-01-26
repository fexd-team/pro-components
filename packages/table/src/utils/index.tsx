/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef } from 'react'
import { classnames, flatten } from '@fexd/tools'
import { ErrorBoundary, createSharedHook, createSharedContext, SharedHook, UseSharedHook, Merge } from '@fexd/pro-utils'

import useProps, { defaultProps, propsContext, ProTablePropsContext } from '../useProps'
import { ProTableProps } from '../types'

export { default as useProps } from '../useProps'

const sharedContext = createSharedContext()

export interface TablePlugin<P, T = any> extends UseSharedHook<T> {
  props: P
}

export class ChainableTablePlugins<T = {}> {
  plugins: TablePlugin<any>[] = []
  constructor(extendPlugins: TablePlugin<any>[] = []) {
    this.plugins = [...extendPlugins]
  }
  add<P extends TablePlugin<any>>(plugin: P) {
    // @ts-ignore
    return new ChainableTablePlugins<Merge<T, P['props']>>([...this.plugins, plugin])
  }
  // @ts-ignore
  getPropsType(): T {}
  get(): TablePlugin<any>[] {
    return [...this.plugins]
  }
}

export function createPlugin<P, T extends any = any>(
  usePluginHook: SharedHook<T, P>,
  name?: string,
): TablePlugin<P, T> {
  const useHook = () => {
    const props = useProps<P>()

    return usePluginHook(props)
  }

  Object.defineProperty(useHook, 'name', {
    value: name ?? usePluginHook.name,
  })

  const useSharedHook = createSharedHook(useHook, {
    context: sharedContext,
  })

  Object.defineProperty(useSharedHook, 'name', {
    value: name ?? usePluginHook.name,
  })

  return Object.assign(useSharedHook, {
    props: {},
  }) as TablePlugin<P, T>
}

interface TableWrapperProps extends ProTableProps {
  plugins?: any[]
}

export const TableWrapper = ({ plugins = [], children, ...props }: TableWrapperProps) => {
  const wrapperDomRef = useRef<HTMLDivElement>(null)
  const noBackgroundColor = props.noBackgroundColor ?? (props?.pure ? true : false)

  return (
    <ErrorBoundary>
      <propsContext.Provider
        value={
          {
            ...defaultProps,
            ...props,
            wrapperDomRef,
          } as ProTablePropsContext
        }
      >
        <sharedContext.Provider value={props} filter={(model: any) => plugins.includes(model.hook)}>
          <div
            className={classnames('f-pro-table-wrapper', {
              ['f-pro-table-grey-body']: !noBackgroundColor,
            })}
            ref={wrapperDomRef}
          >
            {children}
          </div>
        </sharedContext.Provider>
      </propsContext.Provider>
    </ErrorBoundary>
  )
}

export function flattenChildren(array: any[]): any {
  return flatten([...array, ...array.map((item) => flattenChildren(item?.children ?? []))])
}
