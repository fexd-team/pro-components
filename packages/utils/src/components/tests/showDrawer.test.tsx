import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import showDrawer from '../showDrawer'

jest.mock('../showModal/ModalStation', () => {
  const stationMap: Record<string, any> = {}
  return {
    stationMap,
    __setStation: (id: string, station: any) => {
      stationMap[id] = station
    },
  }
})

describe('showDrawer', () => {
  let renderContainer: any

  beforeEach(() => {
    const items = new Map<any, any>()
    const { stationMap } = require('../showModal/ModalStation')
    stationMap['DEFAULT_STATION'] = {
      add: (id: any, renderer: any) => {
        items.set(id, renderer)
        rerender()
      },
      remove: (id: any) => {
        items.delete(id)
        rerender()
      },
    }

    function StationRenderer() {
      return (
        <>
          {[...items.values()].map((Renderer, idx) => (
            <React.Fragment key={idx}>{typeof Renderer === 'function' ? <Renderer /> : Renderer}</React.Fragment>
          ))}
        </>
      )
    }

    const { rerender: _rerender } = render(<StationRenderer />)
    renderContainer = { rerender: _rerender }

    function rerender() {
      renderContainer.rerender?.(<StationRenderer />)
    }
  })

  it('返回 controller 对象', () => {
    const controller = showDrawer({ content: 'test' })
    expect(controller).toBeDefined()
    expect(typeof controller.close).toBe('function')
    expect(typeof controller.open).toBe('function')
    expect(typeof controller.destroy).toBe('function')
    expect(typeof controller.update).toBe('function')
    expect(controller.promise).toBeDefined()
  })

  it('controller.promise 为 Promise 实例', () => {
    const controller = showDrawer({ content: 'test' })
    expect(controller.promise).toBeInstanceOf(Promise)
  })

  it('content 支持函数形式', () => {
    const contentFn = jest.fn(() => <div>函数内容</div>)
    showDrawer({ content: contentFn })
    expect(contentFn).toHaveBeenCalled()
  })

  it('content 支持 ReactNode', () => {
    showDrawer({ content: <div>静态内容</div> })
  })

  it('destroy 不报错', () => {
    const controller = showDrawer({ content: 'test' })
    expect(() => controller.destroy()).not.toThrow()
  })
})
