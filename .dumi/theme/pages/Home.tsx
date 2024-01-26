import {
  // @ts-ignore
  Helmet,
} from 'dumi'
import React, { memo, FC } from 'react'
import { Flexbox } from 'react-layout-kit'

// @ts-ignore
import Features from 'dumi/theme/slots/Features'
// @ts-ignore
import Footer from 'dumi/theme/slots/Footer'
// @ts-ignore
import Header from 'dumi/theme/slots/Header'
// @ts-ignore
import Hero from 'dumi/theme/slots/Hero'

import { siteTitleSel, useSiteStore } from 'dumi-theme-antd-style/dist/store'

const Home: FC = memo(function HomePage() {
  const siteTitle = useSiteStore(siteTitleSel)

  return (
    <>
      <Helmet>
        <title>{siteTitle}</title>
      </Helmet>
      <Flexbox align={'center'} gap={80}>
        <Header />
        <Hero />
        <Features />
        <Footer />
      </Flexbox>
    </>
  )
})

export default Home
