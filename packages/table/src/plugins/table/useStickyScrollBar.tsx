/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { run, isNumber } from '@fexd/tools'
import { useSize, useEventListener, useDebounceEffect } from 'ahooks'

import useQueryFieldPlugin from '../queryField'
import { useProps } from '../../utils'

export default function useStickyScrollBar(
  antdTableRef: React.RefObject<HTMLDivElement>,
  internalPaginationConfig: any,
) {
  const { sticky, stickyScrollBar, pagination } = useProps()
  const { dataSource, paginationParams } = useQueryFieldPlugin(({ dataSource, paginationParams }) => [
    dataSource,
    paginationParams,
  ])
  const tableContentSize = useSize(run(antdTableRef?.current, 'querySelector', '.ant-table-body > table') ?? null)
  const lastScrollLeftRef = useRef(0)
  const tableContainerDomRef = useRef<HTMLTableElement>()
  const paginationDomRef = useRef<HTMLUListElement>()

  const [scrollContent] = useState(() => document.createElement('div'))
  const [scrollBar] = useState(() => {
    const scrollBar = document.createElement('div')
    scrollBar.className = 'f-pro-table-sticky-scrollBar'
    scrollBar.appendChild(scrollContent)
    return scrollBar
  })
  const [scrollContainer] = useState(() => {
    const container = document.createElement('div')
    container.className = 'f-pro-table-sticky-scrollBar-container'
    return container
  })

  useEffect(() => {
    const offsetBottom = (sticky as any)?.offsetBottom

    if (isNumber(offsetBottom)) {
      scrollContainer.style.bottom = `${offsetBottom}px`
    }
  }, [(sticky as any)?.offsetBottom])

  useEventListener(
    'scroll',
    () => {
      if (!tableContainerDomRef?.current) return
      if (lastScrollLeftRef.current === scrollBar?.scrollLeft) return
      tableContainerDomRef.current.scrollLeft = scrollBar?.scrollLeft
      lastScrollLeftRef.current = scrollBar?.scrollLeft
    },
    { target: scrollBar },
  )

  useEventListener(
    'scroll',
    () => {
      if (lastScrollLeftRef.current === tableContainerDomRef?.current!?.scrollLeft) return
      if (!!scrollBar) {
        scrollBar.scrollLeft = tableContainerDomRef?.current!?.scrollLeft ?? 0
      }
      lastScrollLeftRef.current = tableContainerDomRef?.current!?.scrollLeft
    },
    { target: tableContainerDomRef.current },
  )

  useDebounceEffect(
    () => {
      if (!stickyScrollBar || !sticky) {
        return
      }

      if (!tableContainerDomRef.current) {
        tableContainerDomRef.current = run<HTMLTableElement>(antdTableRef?.current, 'querySelector', '.ant-table-body')
      }

      paginationDomRef.current = run<HTMLUListElement>(
        antdTableRef?.current,
        'querySelector',
        '.f-pro-table-pagination',
      )

      if (paginationDomRef.current) {
        tryAppendChild(paginationDomRef.current, scrollBar)
      } else {
        const antdSpinContainer = run<HTMLDivElement>(antdTableRef?.current, 'querySelector', '.ant-spin-container')
        tryAppendChild(scrollContainer, scrollBar)
        tryAppendChild(antdSpinContainer, scrollContainer)
      }

      const scrollable = (tableContentSize?.width ?? 0) > tableContainerDomRef?.current!?.offsetWidth
      scrollContent.style.display = scrollable ? 'block' : 'none'
      scrollContent.style.width = `${tableContentSize?.width}px`
    },
    [
      stickyScrollBar,
      sticky,
      !stickyScrollBar ? 0 : tableContentSize?.width,
      pagination,
      dataSource,
      paginationParams,
      internalPaginationConfig,
    ],
    { wait: 100, maxWait: 800 },
  )
}

function tryAppendChild(parent: HTMLElement, child: HTMLElement) {
  if (child?.parentNode === parent) {
    return
  }

  run(parent, 'appendChild', child)
}
