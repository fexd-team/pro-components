/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { useProps } from '../../utils'

export default function useSizeControl() {
  const { mini, size: propSize, defaultSize } = useProps()

  const [innerSize, setInnerSize] = useState(defaultSize)
  const size = propSize ?? innerSize

  useEffect(() => {
    setInnerSize(mini ? 'small' : defaultSize)
  }, [mini])

  return [size, setInnerSize] as [typeof size, typeof setInnerSize]
}
