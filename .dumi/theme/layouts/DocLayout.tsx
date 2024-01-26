import React from 'react'
import animateScrollTo from 'animated-scroll-to'
// @ts-ignore
import { Helmet, useIntl, useLocation } from 'dumi'
import isEqual from 'fast-deep-equal'
import { memo, StrictMode, useEffect, FC } from 'react'

import SiteProvider from '../components/DumiSiteProvider'
import { isHeroPageSel, useSiteStore } from 'dumi-theme-antd-style/dist/store'
import { GlobalStyle } from 'dumi-theme-antd-style/dist/layouts/DocLayout/styles'

import Home from 'dumi-theme-antd-style/dist/pages/Home'

import Docs from '../pages/Docs'
import { StoreUpdater } from 'dumi-theme-antd-style/dist/components/StoreUpdater'

import '@fexd/pro-components/src/style.less'
import '@fexd/pro-form/src/style.less'
import '@fexd/pro-provider/src/style.less'
import '@fexd/pro-table/src/style.less'
import '@fexd/pro-utils/src/style.less'
import './customer.less'

const DocLayout: FC = memo(() => {
  const intl = useIntl()
  const { hash } = useLocation()
  const fm = useSiteStore((s) => s.routeMeta.frontmatter, isEqual)
  const isHomePage = useSiteStore(isHeroPageSel)
  const loading = useSiteStore((s) => s.siteData.loading)

  // handle hash change or visit page hash after async chunk loaded
  useEffect(() => {
    const id = hash.replace('#', '')

    if (id) {
      setTimeout(() => {
        const elm = document.getElementById(decodeURIComponent(id))

        if (elm) {
          // animated-scroll-to instead of native scroll
          animateScrollTo(elm.offsetTop - 80, {
            maxDuration: 300,
          })
        }
      }, 1)
    }
  }, [loading, hash])

  return (
    <>
      <Helmet>
        <html lang={intl.locale.replace(/-.+$/, '')} />
        {fm.title && <meta property="og:title" content={fm.title} />}
        {fm.description && <meta name="description" content={fm.description} />}
        {fm.description && <meta property="og:description" content={fm.description} />}
        {fm.keywords && <meta name="keywords" content={fm.keywords.join(',')} />}
        {fm.keywords && <meta property="og:keywords" content={fm.keywords.join(',')} />}
      </Helmet>

      {isHomePage ? <Home /> : <Docs />}
    </>
  )
})

export default () => {
  const fm = useSiteStore((s) => s.routeMeta.frontmatter, isEqual)

  return (
    <StrictMode>
      <SiteProvider {...fm}>
        <StoreUpdater />
        <GlobalStyle />
        <DocLayout />
      </SiteProvider>
    </StrictMode>
  )
}
