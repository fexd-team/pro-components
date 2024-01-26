import React, { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import ParticlesBg from 'particles-bg'
import { run, sample, isAndroid, isIOS, debounce, throttle } from '@fexd/tools'

const getAnimationConfig = () => {
  const isMobile = isAndroid() || isIOS()
  const type = sample(
    [
      // 'color',
      // isMobile ? undefined : 'cobweb',
      // 'polygon',
      // 'square',
      // 'fountain',
      // 'ball',
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

// function Portal({ children, className, to: appendTo = document.body }) {
//   const container = useMemo(() => document.createElement('div'), [])

//   useEffect(() => {
//     if (className) {
//       container.className = className
//     }
//   }, [className])

//   useEffect(() => {
//     run(appendTo, 'appendChild', container)

//     return () => {
//       run(appendTo, 'removeChild', container)
//     }
//   }, [])

//   return createPortal(children, container)
// }

// function useContainer(selector) {
//   const [container, setContainer] = useState(null)

//   useEffect(() => {
//     const query = throttle(() => {
//       const node = document.querySelector(selector)

//       if (!node) {
//         query()
//         return
//       }

//       setContainer(node)
//     }, 100)
//     query()
//   }, [selector])

//   return container
// }

// https://github.com/lindelof/particles-bg
export default function Background() {
  const [config, setConfig] = useState(getAnimationConfig)
  const [waiting, setWaiting] = useState(true)
  const [renderKey, setRenderKey] = useState(Math.random)
  // const container = useContainer('.__dumi-default-layout-hero')
  // const ready = !container || !waiting

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

  // @ts-ignore
  return <ParticlesBg key={renderKey} bg {...(config as any)} />
}
