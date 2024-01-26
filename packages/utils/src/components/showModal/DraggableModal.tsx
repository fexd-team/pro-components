/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, isValidElement } from 'react'
import { Modal, Space, ConfigProvider } from 'antd'
import { ModalProps } from 'antd/es/modal'
import { FullscreenOutlined, FullscreenExitOutlined, CloseOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { clamp, classnames, run } from '@fexd/tools'
import { useGetState, useSafeState, useUnmount } from 'ahooks'
import hoist from 'hoist-non-react-statics'

class Drag {
  disX: any
  disY: any
  draggableElement: any
  box: any
  onStyleChange: any
  m: any
  u: any
  constructor({ draggableElement, moveElement, onStyleChange }: any) {
    this.disX = 0
    this.disY = 0
    this.draggableElement = draggableElement
    this.box = moveElement // document.getElementsByClassName(id)[0]
    this.onStyleChange = onStyleChange
    this.m = this.move.bind(this)
    this.u = this.up.bind(this)
  }

  init() {
    if (!this.draggableElement) return
    this.draggableElement.addEventListener('mousedown', this.down.bind(this))
    // this.onStyleChange({
    //   position: 'absolute',
    //   left: this.box.offsetLeft ?? (window.innerWidth - this.box.offsetWidth) / 2,
    //   top: this.box.offsetTop ?? (window.innerHeight - this.box.offsetHeight) / 2,
    // })
  }

  down(ev: any) {
    this.disX = ev.pageX - this.box.offsetLeft
    this.disY = ev.pageY - this.box.offsetTop
    document.addEventListener('mousemove', this.m)
    document.addEventListener('mouseup', this.u)
    document.body.classList.add('draggable-none-select')
  }

  move(ev: any) {
    const minVisableSize = 200 // 可拖到屏幕外的最小剩余尺寸
    this.onStyleChange({
      position: 'absolute',
      // left: clamp(ev.pageX - this.disX, 0, window.innerWidth - this.box.offsetWidth),
      // top: clamp(ev.pageY - this.disY, 0, window.innerHeight - this.box.offsetHeight),
      left: clamp(ev.pageX - this.disX, minVisableSize - this.box.offsetWidth, window.innerWidth - minVisableSize),
      top: clamp(ev.pageY - this.disY, 0, window.innerHeight - minVisableSize),
    })
  }

  up() {
    document.removeEventListener('mousemove', this.m)
    document.removeEventListener('mouseup', this.u)
    document.body.classList.remove('draggable-none-select')
  }
}

export interface DraggableModalProps extends Omit<ModalProps, 'content'> {
  content?: any
  /* 是否可拖拽，默认 true */
  draggable?: boolean
  /* 是否可全屏，默认 true */
  fullscreenable?: boolean
  /* 是否可半透明，默认 true */
  translucent?: boolean
  /* 全屏默认值，默认为 true */
  defaultFullscreen?: boolean
}

const DraggableModal: React.FC<DraggableModalProps> = hoist(
  React.forwardRef(function DraggableModal(
    {
      wrapClassName,
      visible,
      style,
      draggable,
      fullscreenable,
      translucent,
      defaultFullscreen,
      onCancel,
      closable,
      closeIcon,
      ...props
    }: DraggableModalProps,
    forwardedRef,
  ) {
    const size = useContext(ConfigProvider.SizeContext)
    const [draggableClassName] = useSafeState(() => `draggable-modal-${Math.floor(Math.random() * 100000)}`)
    const [draggableStyle, setDraggableStyle] = useSafeState({})
    const [fullscreen, setFullscreen, getFullscreen] = useGetState(defaultFullscreen)
    // const [translucent, setTranslucent, getTranslucent] = useGetState(false)
    const styleRef = React.useRef(style)
    styleRef.current = style

    React.useEffect(() => {
      if (!draggable || !visible) return () => undefined

      const timer = setTimeout(() => {
        const modalNode = document.querySelector(`.${draggableClassName} .ant-modal`)! as any

        new Drag({
          moveElement: document.querySelector(`.${draggableClassName} .ant-modal`),
          draggableElement: document.querySelector(`.${draggableClassName} .ant-modal-header`),
          onStyleChange: (nextStyle: any) => {
            if (getFullscreen()) {
              return
            }

            if (!!styleRef.current) {
              setDraggableStyle(nextStyle)
              return
            }

            modalNode.style.position = nextStyle.position
            modalNode.style.left = `${nextStyle.left}px`
            modalNode.style.top = `${nextStyle.top}px`
          },
        }).init()
      }, 100)

      return () => clearTimeout(timer)
    }, [visible, draggable])

    const FullscreenIcon = fullscreen ? FullscreenExitOutlined : FullscreenOutlined

    useUnmount(() => {
      run(document.querySelector(`.${draggableClassName}`)?.parentNode, 'classList.remove', 'translucent-modal')
    })

    return (
      <Modal
        wrapClassName={classnames(wrapClassName, {
          [draggableClassName]: true,
          'draggable-modal': !fullscreen && draggable,
          'f-pro-utils-custom-action-modal': translucent || fullscreenable,
          'fullscreening-modal': fullscreen,
          'small-modal': size === 'small',
          // 'translucent-modal': translucent,
        })}
        visible={visible}
        {...props}
        onCancel={onCancel}
        closeIcon={
          (translucent || fullscreenable) && (
            <div
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Space size="middle">
                {translucent && (
                  <EyeInvisibleOutlined
                    onClick={() => {
                      run(
                        document.querySelector(`.${draggableClassName}`)?.parentNode,
                        'classList.add',
                        'translucent-modal',
                      )
                    }}
                    onMouseLeave={() => {
                      run(
                        document.querySelector(`.${draggableClassName}`)?.parentNode,
                        'classList.remove',
                        'translucent-modal',
                      )
                    }}
                  />
                )}
                {fullscreenable && <FullscreenIcon onClick={() => setFullscreen((value) => !value)} />}
                {closable &&
                  isValidElement(closeIcon) &&
                  React.cloneElement(closeIcon, {
                    onClick: onCancel,
                  } as any)}
              </Space>
            </div>
          )
        }
        style={{
          ...(style ?? {}),
          ...draggableStyle,
        }}
        // @ts-ignore
        ref={forwardedRef}
      />
    )
  }),
  Modal,
)

DraggableModal.defaultProps = {
  draggable: true,
  fullscreenable: true,
  translucent: false,
  defaultFullscreen: false,
  closable: true,
  closeIcon: <CloseOutlined />,
}

export default DraggableModal
