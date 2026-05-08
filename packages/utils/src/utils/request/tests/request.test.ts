import request from '../index'
import { cloneAxiosInstance, builtInRequestConfig } from '../index'

describe('request 实例', () => {
  test('存在且可用', () => {
    expect(request).toBeDefined()
  })

  test('具备扩展方法', () => {
    expect(request.clone).toBeInstanceOf(Function)
    expect(request.define).toBeInstanceOf(Function)
    expect(request.coverable).toBeInstanceOf(Function)
    expect(request.setConfig).toBeInstanceOf(Function)
  })

  test('默认开启 bigIntJSONParsing', () => {
    // @ts-ignore
    expect(request.defaults.bigIntJSONParsing).toBe(true)
  })

  test('默认超时 60s', () => {
    expect(request.defaults.timeout).toBe(60000)
  })

  test('setConfig 可修改默认配置', () => {
    const originalTimeout = request.defaults.timeout
    request.setConfig({ timeout: 30000 })
    expect(request.defaults.timeout).toBe(30000)
    request.setConfig({ timeout: originalTimeout })
  })

  test('拦截器已注册', () => {
    // @ts-ignore
    const responseHandlers = request.interceptors.response.handlers
    expect(responseHandlers.length).toBeGreaterThan(0)
  })
})

describe('cloneAxiosInstance', () => {
  test('克隆实例与原实例不同', () => {
    const cloned = request.clone()
    expect(cloned).not.toBe(request)
  })

  test('克隆实例具备 define 方法', () => {
    const cloned = request.clone()
    expect(cloned.define).toBeInstanceOf(Function)
  })

  test('克隆实例具备 clone 方法（支持链式克隆）', () => {
    const cloned = request.clone()
    expect(cloned.clone).toBeInstanceOf(Function)
    const cloned2 = cloned.clone()
    expect(cloned2).not.toBe(cloned)
  })

  test('keepInterceptors=false 拦截器少于原实例', () => {
    const cloned = request.clone({ keepInterceptors: false })
    // @ts-ignore
    const clonedHandlers = cloned.interceptors.response.handlers.length
    // @ts-ignore
    const originalHandlers = request.interceptors.response.handlers.length
    expect(clonedHandlers).toBeLessThan(originalHandlers)
  })
})

describe('响应拦截器集成', () => {
  test('builtInRequestConfig.responseInterceptors 已注册到 request', () => {
    expect(builtInRequestConfig.responseInterceptors.onFulfilled).toBeInstanceOf(Function)
    expect(builtInRequestConfig.responseInterceptors.onRejected).toBeInstanceOf(Function)
  })
})
