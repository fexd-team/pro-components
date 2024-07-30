import React, { useState } from 'react'

import { useUpdateEffect } from 'ahooks'
import { run, enhancePromise, isArray, isObject, delay } from '@fexd/tools'

import { stationMap } from './showModal/ModalStation'
import { modalControllers } from './showModal/controller'
import Hook from './Hook'
import PreviewImageGroup, { PreviewImageGroupProps } from './PreviewImageGroup'

export interface ShowImagesConfig extends PreviewImageGroupProps {
  current?: number
  stationId?: string
}

export default function showImages(options: string[] | ShowImagesConfig, restOptions: ShowImagesConfig = {}) {
  const {
    stationId = 'DEFAULT_STATION',
    current: initialCurrent = 0,
    ...initialProps
  }: ShowImagesConfig = isArray(options)
    ? {
        ...restOptions,
        srcList: options,
      }
    : isObject(options)
      ? {
          ...restOptions,
          ...options,
        }
      : restOptions
  const id = Math.random()
  const promise = enhancePromise()
  let _setVisible: (value: boolean) => void
  let _setProps: (...args: any) => void

  const controller = {
    close() {
      run(_setVisible, undefined, false)
    },
    update(updateProps: PreviewImageGroupProps & { current?: number } = {}) {
      run(_setProps, undefined, updateProps)
    },
    promise,
  }

  run(stationMap[stationId], 'add', id, () => (
    <Hook>
      {() => {
        const [visible, setVisible] = useState(false)
        const [{ current, ...props }, setProps] = useState({
          current: initialCurrent,
          ...initialProps,
        })
        _setProps = setProps as any
        _setVisible = setVisible as any

        useUpdateEffect(() => {
          if (visible === false) {
            modalControllers.delete(controller)
            promise.resolve()
            delay(500).then(() => {
              run(stationMap[stationId], 'remove', id)
            })
          }
        }, [visible])

        return (
          <div style={{ display: 'none' }}>
            <PreviewImageGroup
              {...props}
              onLoad={() => {
                setVisible(true)
              }}
              previewGroupProps={{
                preview: {
                  visible: visible,
                  current,
                  onVisibleChange: (visible, prevVisible) => {
                    setVisible(visible)
                  },
                },
              }}
            />
          </div>
        )
      }}
    </Hook>
  ))

  return controller
}
// @ts-ignore
window.showImages = showImages
