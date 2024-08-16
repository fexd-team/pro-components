/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

import { ProTableBuiltInPlugins } from '../types'

export function useProTableRef<T extends Record<string, any> = {}>() {
  const ref = React.useRef<ProTableBuiltInPlugins & T>(null)

  return ref!
}

export default useProTableRef
