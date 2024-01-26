import isEqual from 'fast-deep-equal'
import React, { memo, FC } from 'react'

import { tocAnchorItemSel, useSiteStore } from 'dumi-theme-antd-style/dist/store'

import TOC from '../components/Toc'

const Toc: FC = memo(function Toc() {
  const items = useSiteStore(tocAnchorItemSel, isEqual)

  return <TOC items={items} />
})

export default Toc
