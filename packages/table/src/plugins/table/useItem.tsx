import { createContext, useContext } from 'react'

export const itemContext = createContext<any>(undefined)

const useItem = function useItem<T>() {
  return useContext(itemContext) as T
}

useItem.Provider = itemContext.Provider

export default useItem
