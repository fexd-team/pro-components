import { createContext, useContext } from 'react'
import { ProTableColumnType } from './types'

export const context = createContext<ProTableColumnType>({} as any)

const useColumnConfig = function useColumnConfig() {
  const contextValue = useContext(context)

  return contextValue
}

useColumnConfig.Provider = context.Provider

export default useColumnConfig
