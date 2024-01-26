import { run } from '@fexd/tools'

/**
 * enhancePromise 函数可以将原生 Promise 进行增强，
 * 添加一些判断 Promise 状态的方法。
 * @param promise 一个可选参数，指定需要增强的 Promise。
 * @returns 一个增强的 Promise 对象，该对象具有原生 Promise 的所有方法，
 * 但是增加了一些判断 Promise 状态的方法和属性。
 * 
 * 以下为使用示例

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

const enhancedPromise = enhancePromise(promise)

// 获取当前 Promise 对象的状态
console.log(enhancedPromise.isPending()) // true

setTimeout(() => {
  console.log(enhancedPromise.isFulfilled()) // true
  console.log(enhancedPromise.getValue()) // 'success'
}, 1000)

 */
export default function enhancePromise<T = any>(promise?: Promise<T>) {
  let status: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  let currentValue: T | PromiseLike<T> | undefined
  let currentReason: any
  let outsideResolve: (value?: T | PromiseLike<T>) => void
  let outsideReject: (reason?: any) => void
  const resolve = (value?: T | PromiseLike<T>) => {
    if (status !== 'pending') return // 如果当前状态不是 'pending'，则直接返回。
    currentValue = value
    run(outsideResolve, undefined, value) // 调用 run 函数触发全局的 Promise Resolve 回调。
    status = 'fulfilled' // 修改当前状态为 'fulfilled'。
  }
  const reject = (reason?: any) => {
    if (status !== 'pending') return // 如果当前状态不是 'pending'，则直接返回。
    currentReason = reason
    run(outsideReject, undefined, reason) // 调用 run 函数触发全局的 Promise Reject 回调。
    status = 'rejected' // 修改当前状态为 'rejected'。
  }
  const isPending = () => status === 'pending' // 判断当前状态是否为 'pending'。
  const isNotPending = () => status !== 'pending' // 判断当前状态是否不为 'pending'。
  const isFulfilled = () => status === 'fulfilled' // 判断当前状态是否为 'fulfilled'。
  const isResolved = isFulfilled
  const isRejected = () => status === 'rejected' // 判断当前状态是否为 'rejected'。
  const getValue = () => currentValue // 获取当前 Promise 对象的值。
  const getError = () => currentReason // 获取当前 Promise 对象的错误信息。

  const wrapperredPromise = new Promise<T>((insideResolve, insideReject) => {
    outsideResolve = insideResolve as any
    outsideReject = insideReject

    if (promise) {
      // 如果有传入 promise，则在此异步执行。
      promise.then(resolve).catch(reject) // 在 Promise 对象状态发生变化时，执行相应的回调函数。
    }
  })
  return Object.assign(wrapperredPromise, {
    // 将增加的方法和属性，并原样返回 Promise 对象。
    resolve,
    reject,
    isNotPending,
    isPending,
    isFulfilled,
    isResolved,
    isRejected,
    getValue,
    getError,
  })
}
