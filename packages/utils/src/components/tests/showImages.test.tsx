import React from 'react'
import { render } from '@testing-library/react'
import showImages from '../showImages'

jest.mock('../showModal/ModalStation', () => {
  const stationMap: Record<string, any> = {}
  return {
    stationMap,
    __setStation: (id: string, station: any) => {
      stationMap[id] = station
    },
  }
})

jest.mock('../showModal/controller', () => ({
  modalControllers: new Set(),
}))

describe('showImages', () => {
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

  it('接收字符串数组参数', () => {
    const controller = showImages(['img1.png', 'img2.png'])
    expect(controller).toBeDefined()
    expect(typeof controller.close).toBe('function')
    expect(typeof controller.update).toBe('function')
  })

  it('接收配置对象参数', () => {
    const controller = showImages({
      srcList: ['img1.png'],
      current: 0,
    })
    expect(controller).toBeDefined()
  })

  it('返回 controller 包含 close 和 update 方法', () => {
    const controller = showImages(['test.jpg'])
    expect(typeof controller.close).toBe('function')
    expect(typeof controller.update).toBe('function')
  })

  it('返回的 promise 可以 await', () => {
    const controller = showImages(['test.jpg'])
    expect(controller.promise).toBeDefined()
    expect(typeof controller.promise.then).toBe('function')
  })

  it('close 不报错', () => {
    const controller = showImages(['test.jpg'])
    expect(() => controller.close()).not.toThrow()
  })

  it('update 接收新 props', () => {
    const controller = showImages(['a.png'])
    expect(() => controller.update({ srcList: ['b.png'] })).not.toThrow()
  })

  it('支持自定义 stationId', () => {
    const { stationMap } = require('../showModal/ModalStation')
    stationMap['CUSTOM'] = {
      add: jest.fn(),
      remove: jest.fn(),
    }
    const controller = showImages({ srcList: ['x.png'], stationId: 'CUSTOM' })
    expect(stationMap['CUSTOM'].add).toHaveBeenCalled()
  })

  it('支持设置初始 current', () => {
    const controller = showImages({
      srcList: ['a.png', 'b.png', 'c.png'],
      current: 2,
    })
    expect(controller).toBeDefined()
  })
})
