/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { storage } from '@fexd/tools'

export default function useInitializeTasks(initializeTasks: Record<string, () => void>) {
  useMemo(() => {
    const allStorageKeys: string[] = Array(localStorage.length)
      .fill(undefined)
      .map((_, index) => localStorage.key(index))
      .filter(Boolean) as string[]
    const avalidTaskKeys = Object.keys(initializeTasks ?? {}).map((key) => `useInitializeTasks@${key}`)

    allStorageKeys.map((key) => {
      const expired = /^useInitializeTasks\@/.test(key) && !avalidTaskKeys.includes(key)

      if (expired) {
        storage.remove(key)
      }
    })

    Object.entries(initializeTasks ?? {}).forEach(([key, fn]) => {
      const storageKey = `useInitializeTasks@${key}`
      const inited = storage.get(storageKey)

      if (!inited) {
        try {
          fn?.()
          storage.set(storageKey, true)
        } catch (error) {
          console.error(`[ERROR useInitializeTasks] ${key}`, error)
        }
      }
    })
  }, [])
}
