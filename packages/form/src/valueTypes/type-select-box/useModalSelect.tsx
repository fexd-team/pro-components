/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState } from 'react'
import { run, random, isArray, isObject, isExist } from '@fexd/tools'
import { FullscreenOutlined } from '@ant-design/icons'
import { showModal, ModalStation, ModalControllerType } from '@fexd/pro-utils'
import { useMemoizedFn } from 'ahooks'

export default function useModalSelect({
  getModalConfig,
  value: currentValue,
  onChange,
  multiple = false,
  modalStationId,
  initialOptions,
}: {
  getModalConfig?: any
  value?: any
  onChange: any
  multiple?: boolean
  modalStationId?: string
  initialOptions?: any[]
}) {
  const [options, setOptions] = useState<any[]>(initialOptions ?? [])
  const controllerRef = useRef<ModalControllerType>()
  const destroy = useMemoizedFn(() => {
    run(controllerRef.current, 'destroy')
    // @ts-ignore
    controllerRef.current = null
  })

  return {
    options,
    destroy,
    props: {
      dropdownStyle: { display: 'none' },
      suffixIcon: <FullscreenOutlined style={{ color: '#999' }} />,
      showSearch: false,
      async onClick() {
        // if ((multiple && (currentValue ?? []).filter(Boolean)?.length === 0) || (!multiple && !isExist(currentValue))) {
        //   run(controllerRef.current, 'destroy')
        //   // @ts-ignore
        //   controllerRef.current = null
        // }

        let value: any

        if (!controllerRef.current) {
          const modalConfig = run(getModalConfig, undefined, {
            destroy,
            setValue(targetValue: any | any[]) {
              if (isArray(targetValue)) {
                setOptions(targetValue)
                value = targetValue.map((item: any) => item?.value)

                if (!multiple) {
                  value = value?.[0]
                }
              }

              if (isObject(targetValue)) {
                setOptions([targetValue])
                value = targetValue?.value
              }

              if (!value) {
                console.warn('modalSelect targetValue should seems like { label, value }', targetValue)
                return
              }

              run(onChange, undefined, value)
              run(controllerRef.current, 'close')
            },
          })

          controllerRef.current = await showModal({
            destroyOnClose: false,
            ...modalConfig,
            stationId: modalStationId,
            afterClose(...args) {
              if (modalConfig.destroyOnClose) {
                // @ts-ignore
                controllerRef.current = null
              }
              run(modalConfig, 'afterClose', ...args)
            },
          })
        } else {
          run(controllerRef.current, 'open')
        }

        await controllerRef.current.promise
      },
    },
  }
}
