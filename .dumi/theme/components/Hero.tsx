import { Button, ConfigProvider } from 'antd'
import {
  // @ts-ignore
  Link,
} from 'dumi'
import React, { FC } from 'react'
import { Center, Flexbox } from 'react-layout-kit'
import { classnames } from '@fexd/tools'

import HeroButton from 'dumi-theme-antd-style/dist/components/Hero/HeroButton'
import { useStyles } from 'dumi-theme-antd-style/dist/components/Hero/style'

// import HeroBackground from './HeroBackground'

export interface HeroProps {
  title?: string
  description?: string
  actions?: { text: string; link: string }[]
}

const Hero: FC<HeroProps> = ({ title, description, actions }) => {
  const { styles, cx } = useStyles()

  return (
    <>
      {/* <div className="fixed left-0 top-0 w-screen h-screen blur-[1px]">
        <HeroBackground />
      </div> */}
      <Flexbox horizontal distribution={'center'} className={styles.container}>
        <div className={styles.canvas}></div>
        <Center>
          {title && (
            <div className={styles.titleContainer}>
              <h1 className={classnames(styles.title, 'font-bold')} dangerouslySetInnerHTML={{ __html: title }} />
              <div className={cx(styles.titleShadow)} dangerouslySetInnerHTML={{ __html: title }}></div>
            </div>
          )}
          {description && <p className={styles.desc} dangerouslySetInnerHTML={{ __html: description }} />}
          {Boolean(actions?.length) && (
            <ConfigProvider theme={{ token: { fontSize: 16, controlHeight: 40 } }}>
              <Flexbox horizontal gap={24} className={styles.actions}>
                {actions!.map(({ text, link }, index) => (
                  <Link key={text} to={link}>
                    {index === 0 ? (
                      <HeroButton>{text}</HeroButton>
                    ) : (
                      <Button size={'large'} shape={'round'} type={'default'}>
                        {text}
                      </Button>
                    )}
                  </Link>
                ))}
              </Flexbox>
            </ConfigProvider>
          )}
        </Center>
      </Flexbox>
    </>
  )
}

export default Hero
