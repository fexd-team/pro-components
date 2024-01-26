import React, { memo, FC } from 'react'
import { Flexbox } from 'react-layout-kit'

// @ts-ignore
import LangSwitch from 'dumi/theme/slots/LangSwitch'
// @ts-ignore
import Logo from 'dumi/theme/slots/Logo'
// @ts-ignore
import Navbar from 'dumi/theme/slots/Navbar'
// @ts-ignore
import SearchBar from 'dumi/theme/slots/SearchBar'

import Burger from 'dumi-theme-antd-style/dist/components/Burger'
import GithubButton from 'dumi-theme-antd-style/dist/components/GithubButton'
import ThemeSwitch from 'dumi-theme-antd-style/dist/components/ThemeSwitch'

import { useResponsive } from 'antd-style'
import { useSiteStore } from 'dumi-theme-antd-style/dist/store/useSiteStore'
import { useStyle } from 'dumi-theme-antd-style/dist/slots/Header/style'

import { Button, Tooltip } from 'antd'

import { GitlabOutlined } from '@ant-design/icons'

const NpmButton: FC = () => {
  const npmConfig = useSiteStore((s) => s.siteData.themeConfig?.npm)
  const repoUrl = npmConfig?.url ?? npmConfig

  return !repoUrl ? null : (
    <Tooltip arrow={false} title={npmConfig?.tooltip ?? 'Npm'}>
      <a href={repoUrl} target={'_blank'} rel="noreferrer">
        <Button icon={<MdiNpmVariantOutline />} />
      </a>
    </Tooltip>
  )
}

const GitlabButton: FC = () => {
  const repoUrl = useSiteStore((s) => s.siteData.themeConfig?.gitlab)

  return !repoUrl ? null : (
    <Tooltip arrow={false} title={'Gitlab'}>
      <a href={repoUrl} target={'_blank'} rel="noreferrer">
        <Button icon={<GitlabOutlined />} />
      </a>
    </Tooltip>
  )
}

function MdiNpmVariantOutline(props) {
  return (
    <span className="anticon">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path d="M3 3v18h18V3H3m3 3h12v12h-3V9h-3v9H6V6z" fill="currentColor"></path>
      </svg>
    </span>
  )
}

const Header: FC = () => {
  const hasHeader = useSiteStore((s) => !!s.routeMeta.frontmatter)

  const { mobile } = useResponsive()
  const { styles } = useStyle()

  return !hasHeader ? null : (
    <div className={styles.header}>
      <Flexbox horizontal distribution={'space-between'} align={'center'} width={'auto'} className={styles.content}>
        {mobile ? (
          <>
            <Flexbox>
              <Burger />
            </Flexbox>
            <Flexbox horizontal className={styles.left}>
              <Logo />
            </Flexbox>
            <Flexbox>
              <ThemeSwitch />
            </Flexbox>
          </>
        ) : (
          <>
            <Flexbox horizontal className={styles.left}>
              <Logo />
            </Flexbox>
            <Flexbox style={{ marginLeft: 48, alignSelf: 'end' }}>
              <Navbar />
            </Flexbox>
            <section className={styles.right}>
              <div />
              <Flexbox gap={16} horizontal align={'center'} className="dumi-default-header-right-aside">
                <SearchBar />
                <LangSwitch />
                <GithubButton />
                <NpmButton />
                <ThemeSwitch />
              </Flexbox>
            </section>
          </>
        )}
      </Flexbox>
    </div>
  )
}

export default memo(Header)
