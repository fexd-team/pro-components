import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { random } from '@fexd/tools'

const randomKey = () => `key_${random(0, 9999999, true)}`

export default function useForceUpdate(): [() => void, string] {
  const [renderKey, setRenderKey] = useState(randomKey)

  const forceUpdate = useMemoizedFn(() => {
    setRenderKey(randomKey)
  })

  return [forceUpdate, renderKey]
}
