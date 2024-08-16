/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { ProTableBuiltInPlugins } from '../types'

export function createProTableRef<T extends Record<string, any> = {}>() {
  const ref = React.createRef<ProTableBuiltInPlugins & T>()

  return ref!
}

export default createProTableRef
