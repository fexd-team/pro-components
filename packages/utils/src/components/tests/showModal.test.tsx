import React from 'react'
import { render } from '@testing-library/react'
import showModal from '../showModal'

jest.mock('../showModal/ModalStation', () => {
  const stationMap: Record<string, any> = {}
  return {
    stationMap,
    default: () => null,
  }
})

describe('showModal', () => {
  let items: Map<any, any>

  beforeEach(() => {
    items = new Map()
    const { stationMap } = require('../showModal/ModalStation')
    stationMap['DEFAULT_STATION'] = {
      add: (id: any, renderer: any) => {
        items.set(id, renderer)
      },
      remove: (id: any) => {
        items.delete(id)
      },
    }
  })

  it('返回 controller 对象', () => {
    const controller = showModal({ content: 'test modal' })
    expect(controller).toBeDefined()
    expect(typeof controller.open).toBe('function')
    expect(typeof controller.close).toBe('function')
    expect(typeof controller.destroy).toBe('function')
    expect(typeof controller.update).toBe('function')
  })

  it('controller.promise 为 Promise', () => {
    const controller = showModal({ content: 'test' })
    expect(controller.promise).toBeInstanceOf(Promise)
  })

  it('destroy 从 station 中移除', () => {
    const controller = showModal({ content: 'test' })
    expect(items.size).toBe(1)

    controller.destroy()
    expect(items.size).toBe(0)
  })

  it('支持 stationId 自定义', () => {
    const { stationMap } = require('../showModal/ModalStation')
    stationMap['CUSTOM_STATION'] = {
      add: jest.fn(),
      remove: jest.fn(),
    }

    showModal({ content: 'custom', stationId: 'CUSTOM_STATION' })
    expect(stationMap['CUSTOM_STATION'].add).toHaveBeenCalled()
  })

  it('drawer 模式调用 showDrawer', () => {
    const { stationMap } = require('../showModal/ModalStation')
    stationMap['DEFAULT_STATION'] = {
      add: jest.fn(),
      remove: jest.fn(),
    }

    const controller = showModal({ content: 'drawer content', drawer: true })
    expect(controller).toBeDefined()
    expect(typeof controller.close).toBe('function')
  })

  it('content 支持函数形式', () => {
    const contentFn = jest.fn(() => <div>modal content</div>)
    showModal({ content: contentFn })
    expect(items.size).toBe(1)
  })

  it('content 支持 ReactNode', () => {
    showModal({ content: <div>简单内容</div> })
    expect(items.size).toBe(1)
  })

  it('tabs 模式生成 Tabs + 多内容', () => {
    const controller = showModal({
      tabs: [
        { title: 'Tab1', content: <div>Content 1</div> },
        { title: 'Tab2', content: <div>Content 2</div> },
      ],
    })
    expect(controller).toBeDefined()
    expect(items.size).toBe(1)
  })

  it('close 不报错', () => {
    const controller = showModal({ content: 'test' })
    expect(() => controller.close()).not.toThrow()
  })

  it('update 不报错', () => {
    const controller = showModal({ content: 'test' })
    expect(() => controller.update({ title: '新标题' })).not.toThrow()
  })

  it('open 重新创建 promise', () => {
    const controller = showModal({ content: 'test' })
    const promise1 = controller.promise

    controller.open()
    const promise2 = controller.promise

    expect(promise1).not.toBe(promise2)
  })
})
