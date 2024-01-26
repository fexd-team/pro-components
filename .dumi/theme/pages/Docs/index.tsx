import { useResponsive } from 'antd-style'
import isEqual from 'fast-deep-equal'
import React, { memo, FC, useEffect } from 'react'
import { Center, Flexbox } from 'react-layout-kit'
import { useEventListener } from 'ahooks'

// @ts-ignore
import { Helmet, useOutlet, useLocation } from 'dumi'
// @ts-ignore
import Content from 'dumi/theme/slots/Content'
// @ts-ignore
import Footer from 'dumi/theme/slots/Footer'
// @ts-ignore
import Header from 'dumi/theme/slots/Header'
// @ts-ignore
import Sidebar from 'dumi/theme/slots/Sidebar'
// @ts-ignore
import Toc from 'dumi/theme/slots/Toc'

import { ApiHeader } from 'dumi-theme-antd-style/dist/components/ApiHeader'

import { apiHeaderSel, isApiPageSel, siteTitleSel, useSiteStore } from 'dumi-theme-antd-style/dist/store'
import { useStyles } from './styles'

const Docs: FC = memo(() => {
  const outlet = useOutlet()
  const { mobile } = useResponsive()
  const fm = useSiteStore((s) => s.routeMeta.frontmatter, isEqual)
  const isApiPage = useSiteStore(isApiPageSel)
  const siteTitle = useSiteStore(siteTitleSel)
  const apiHeaderProps = useSiteStore(apiHeaderSel)
  const docsContainer = React.useRef<HTMLDivElement>()
  const location = useLocation()

  const { styles, theme } = useStyles(fm) as any

  useEventListener(
    'mouseenter',
    (e) => {
      const target = e.target
      if (
        target.nodeName === 'A' &&
        target.hasAttribute('aria-hidden') &&
        !target.hasAttribute('data-raw-href') &&
        /^#/.test(target.getAttribute('href'))
      ) {
        const rawHref = target.getAttribute('href')
        target.setAttribute('href', `#${location.pathname}${rawHref}`)
        target.setAttribute('data-raw-href', rawHref)
      }
    },
    { target: docsContainer, capture: true },
  )

  return (
    <div
      className={styles.layout}
      ref={docsContainer as any}
      style={{
        gridTemplateAreas: `
      'head head head'
      '${fm.sidebar === false ? 'title' : 'sidebar'} title .'
      '${fm.sidebar === false ? 'main' : 'sidebar'} main ${fm.toc === false ? 'main' : 'toc'}'
      '${fm.sidebar === false ? 'footer' : 'sidebar'} footer footer'`,
      }}
    >
      <Helmet>
        {fm.title && (
          <title>
            {fm.title} - {siteTitle}
          </title>
        )}
      </Helmet>
      <Header />

      {fm?.toc !== false && <Toc />}

      {fm?.sidebar === false ? null : mobile ? null : <Sidebar />}

      {isApiPage ? (
        <Flexbox style={{ gridArea: 'title', paddingBlock: mobile ? 24 : undefined }}>
          <Center>
            <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%' }}>
              <Flexbox style={{ paddingBlock: 0, paddingInline: mobile ? 16 : 48 }}>
                <ApiHeader {...apiHeaderProps} />
              </Flexbox>
            </Flexbox>
          </Center>
        </Flexbox>
      ) : null}

      <Flexbox
        style={{
          zIndex: 10,
          gridArea: `main / main / main / main`,
          margin: mobile ? 0 : 24,
          marginBottom: mobile ? 0 : 48,
        }}
      >
        <Center width={'100%'}>
          <Flexbox className={styles.content}>
            <Flexbox horizontal>
              <Content>{outlet}</Content>
            </Flexbox>
          </Flexbox>
        </Center>
      </Flexbox>
      <Footer />
    </div>
  )
})

export default Docs
