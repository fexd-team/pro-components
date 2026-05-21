import { ArrowRightOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { history, Link } from 'dumi'
import React, { FC } from 'react'
import { Center, Flexbox } from 'react-layout-kit'
import { shallow } from 'zustand/shallow'

import { featuresSel, useSiteStore } from 'dumi-theme-antd-style/dist/store'
import { useStyles } from 'dumi-theme-antd-style/dist/components/Features/Item.style'
import { useStyles as useContainerStyles } from 'dumi-theme-antd-style/dist/components/Features/style'

const isImageUrl = (image?: string) => Boolean(image && (/^(https?:)?\/\//.test(image) || image.startsWith('/')))

const FeatureImage: FC<{ image?: string; className?: string; title: string }> = ({ image, className, title }) => {
  if (!image) return null

  return isImageUrl(image) ? (
    <img
      className={className}
      src={image}
      alt={title}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ) : (
    <Center className={className}>{image}</Center>
  )
}

const FeatureItem: FC<any> = ({ imageType, row, column, hero, description, image, title, link, imageStyle }) => {
  const rowNum = row || 7
  const { styles, theme } = useStyles({ rowNum, hasLink: !!link })

  return (
    <div
      className={styles.container}
      style={{
        gridRow: `span ${rowNum}`,
        gridColumn: `span ${column || 1}`,
        cursor: link ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (link) history.push(link)
      }}
    >
      <div className={styles.cell}>
        {image && (
          <Center image-style={imageType} className={styles.imgContainer} style={imageStyle}>
            <FeatureImage className={styles.img} image={image} title={title} />
          </Center>
        )}
        {title && (
          <Flexbox as="h3" horizontal gap={8} align="center" className={styles.title}>
            {title}
            {imageType === 'soon' ? <Tag color={theme.isDarkMode ? 'pink-inverse' : 'cyan-inverse'}>SOON</Tag> : null}
          </Flexbox>
        )}
        {description && <p dangerouslySetInnerHTML={{ __html: description }} className={styles.desc} />}
        {link && (
          <div className={styles.link}>
            <Link to={link}>
              立即了解 <ArrowRightOutlined />
            </Link>
          </div>
        )}
      </div>
      {hero && <div className={styles.blur} />}
    </div>
  )
}

const Features: FC = () => {
  const features = useSiteStore(featuresSel, shallow)
  const { styles } = useContainerStyles()

  if (!features?.length) return null

  return (
    <div className={styles.container} style={{ margin: '0 16px' }}>
      {features.map((item: any) => (
        <FeatureItem key={item.title} {...item} />
      ))}
    </div>
  )
}

export default Features
