---
hero:
  title: Fexd - <b>Pro Components</b>
  description: 管理系统场景集成组件库
# features:
#   - avatar: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
#     title: 插件式
#     description: 各功能可插件式集成

#   - avatar: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
#     title: 配置式
#     description: 常见功能配置化

#   - avatar: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
#     title: 内置常用场景
#     description: 如表格的增删改查，以及常见数据格式如时间的渲染等

#   - avatar: https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Y_NMQKxw7OgAAAAAAAAAAAAAFl94AQBr
#     title: 预设样式
#     description: 样式风格与 antd 一脉相承，无需魔改，浑然天成

#   - avatar: https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/U3XjS5IA1tUAAAAAAAAAAAAAFl94AQBr
#     title: 预设行为
#     description: 更少的代码，更少的 Bug

#   - avatar: https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg
#     title: TypeScript
#     description: 使用 TypeScript 开发，提供完整的类型定义文件

# footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

# ProComponents

管理系统场景集成组件库

## 安装

```bash
pnpm add @fexd/pro-components
# 或者
yarn add @fexd/pro-components
# 或者
npm install @fexd/pro-components --save
```

<!-- ```jsx
/**
 * style: { display: 'none' }
 */
import React, { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import ParticlesBg from 'particles-bg'
import { run, sample, isAndroid, isIOS, debounce, throttle } from '@fexd/tools'

const getAnimationConfig = () => {
  const isMobile = isAndroid() || isIOS()
  const type = sample(
    [
      // 'color',
      isMobile ? undefined : 'cobweb',
      'polygon',
      'square',
      'fountain',
      'ball',
      'custom',
    ].filter(Boolean),
  )

  const config =
    type === 'custom'
      ? {
          num: [4, 7],
          rps: 0.1,
          radius: [5, 40],
          life: [1.5, 3],
          v: [2, 3],
          tha: [-40, 40],
          alpha: [0.6, 0],
          scale: [0.1, 0.4],
          position: 'all',
          color: ['random', '#ff0000'],
          cross: 'dead',
          // emitter: "follow",
          random: 15,
        }
      : undefined

  return {
    type,
    config,
  }
}

function Portal({ children, className, to: appendTo = document.body }) {
  const container = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (className) {
      container.className = className
    }
  }, [className])

  useEffect(() => {
    run(appendTo, 'appendChild', container)

    return () => {
      run(appendTo, 'removeChild', container)
    }
  }, [])

  return createPortal(children, container)
}

function useContainer(selector) {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const query = throttle(() => {
      const node = document.querySelector(selector)

      if (!node) {
        query()
        return
      }

      setContainer(node)
    }, 100)
    query()
  }, [selector])

  return container
}

// https://github.com/lindelof/particles-bg
function Background() {
  const [config, setConfig] = useState(getAnimationConfig)
  const [waiting, setWaiting] = useState(true)
  const [renderKey, setRenderKey] = useState(Math.random)
  const container = useContainer('.__dumi-default-layout-hero')
  const ready = !container || !waiting

  useEffect(() => {
    const resizeHandler = debounce(() => {
      setRenderKey(Math.random)
      setConfig(getAnimationConfig)
    }, 300)
    setTimeout(() => setWaiting(false), 300)
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <>
      <style>{`
        .__dumi-default-layout-hero {
          position: relative;
        }
        .__dumi-default-layout-hero>* {
          position: relative;
          z-index: 2;
        }
        .particles-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          border-bottom: 1px solid #f8f8f8;
        }
    `}</style>
      {!ready ? null : (
        <Portal className="particles-background" to={container}>
          <ParticlesBg key={renderKey} bg {...config} />
        </Portal>
      )}
    </>
  )
}

export default Background
``` -->
