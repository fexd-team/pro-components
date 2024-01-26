import React, { memo, useMemo, FC } from 'react'

import {
  // @ts-ignore
  useLocation,
  useSiteData,
} from 'dumi'
import { ArrowDownOutlined, MenuOutlined } from '@ant-design/icons'
import { Anchor, Collapse, ConfigProvider } from 'antd'
import { useResponsive } from 'antd-style'
import useControlledState from 'use-merge-value'

import { AnchorItem } from 'dumi-theme-antd-style/dist/types'
import { useStyles } from 'dumi-theme-antd-style/dist/components/Toc/style'

export interface TocProps {
  items: AnchorItem[]
  activeKey?: string
  onChange?: (activeKey: string) => void
}

const Toc: FC<TocProps> = memo(({ items, activeKey, onChange }) => {
  const [activeLink, setActiveLink] = useControlledState<string>('', {
    value: activeKey,
    onChange,
  })
  const { styles } = useStyles()
  const { mobile } = useResponsive()
  const location = useLocation()
  // const siteData = useSiteData()

  // console.log(location, items)

  const activeAnchor = items.find((item) => item.id === activeLink)

  const linkItems = useMemo(
    () =>
      items.map((item) => ({
        href: `#${location.pathname}#${item.id}`,
        title: item.title,
        key: item.id,
        children: item.children?.map((child) => ({
          href: `#${location.pathname}#${child.id}`,
          title: child?.title,
          key: child.id,
        })),
      })),
    [items],
  )

  return (
    (items?.length === 0 ? null : mobile ? (
      <ConfigProvider theme={{ token: { fontSize: 12, sizeStep: 3 } }}>
        <div className={styles.mobileCtn}>
          <Collapse
            bordered={false}
            ghost
            expandIconPosition={'end'}
            expandIcon={({ isActive }) => (isActive ? <ArrowDownOutlined /> : <MenuOutlined />)}
            className={styles.expand}
          >
            <Collapse.Panel forceRender key={'toc'} header={!activeAnchor ? '目录' : activeAnchor.title}>
              <ConfigProvider theme={{ token: { fontSize: 14, sizeStep: 4 } }}>
                <Anchor
                  onChange={(currentLink) => {
                    setActiveLink(currentLink.replace('#', ''))
                  }}
                  items={linkItems}
                />
              </ConfigProvider>
            </Collapse.Panel>
          </Collapse>
        </div>
      </ConfigProvider>
    ) : (
      <div className={styles.container}>
        <h4>内容章节</h4>
        <Anchor items={linkItems} />
      </div>
    )) || null
  )
})

export default Toc
