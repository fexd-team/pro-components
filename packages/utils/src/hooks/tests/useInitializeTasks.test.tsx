import { renderHook } from '@testing-library/react-hooks'
import useInitializeTasks from '../useInitializeTasks'

describe('useInitializeTasks', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('首次渲染执行所有任务', () => {
    const taskA = jest.fn()
    const taskB = jest.fn()

    renderHook(() => useInitializeTasks({ taskA, taskB }))

    expect(taskA).toHaveBeenCalledTimes(1)
    expect(taskB).toHaveBeenCalledTimes(1)
  })

  it('执行过的任务不会重复执行', () => {
    const taskA = jest.fn()

    renderHook(() => useInitializeTasks({ taskA }))
    expect(taskA).toHaveBeenCalledTimes(1)

    renderHook(() => useInitializeTasks({ taskA }))
    expect(taskA).toHaveBeenCalledTimes(1)
  })

  it('任务执行后在 localStorage 中标记', () => {
    const task = jest.fn()
    renderHook(() => useInitializeTasks({ myTask: task }))

    expect(localStorage.getItem('useInitializeTasks@myTask')).toBeDefined()
  })

  it('新增任务在下次渲染时执行', () => {
    const taskA = jest.fn()
    const taskB = jest.fn()

    renderHook(() => useInitializeTasks({ taskA }))
    expect(taskA).toHaveBeenCalledTimes(1)
    expect(taskB).not.toHaveBeenCalled()

    renderHook(() => useInitializeTasks({ taskA, taskB }))
    expect(taskA).toHaveBeenCalledTimes(1)
    expect(taskB).toHaveBeenCalledTimes(1)
  })

  it('移除的任务 key 从 localStorage 中清除', () => {
    const taskA = jest.fn()
    const taskB = jest.fn()

    renderHook(() => useInitializeTasks({ taskA, taskB }))
    expect(localStorage.getItem('useInitializeTasks@taskA')).toBeDefined()
    expect(localStorage.getItem('useInitializeTasks@taskB')).toBeDefined()

    renderHook(() => useInitializeTasks({ taskA }))
    expect(localStorage.getItem('useInitializeTasks@taskA')).toBeDefined()
    expect(localStorage.getItem('useInitializeTasks@taskB')).toBeNull()
  })

  it('任务抛出异常不影响其他任务执行', () => {
    const errorTask = jest.fn(() => {
      throw new Error('task error')
    })
    const normalTask = jest.fn()
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    renderHook(() => useInitializeTasks({ errorTask, normalTask }))

    expect(errorTask).toHaveBeenCalledTimes(1)
    expect(normalTask).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('任务抛出异常后不标记为已完成', () => {
    const errorTask = jest.fn(() => {
      throw new Error('fail')
    })
    jest.spyOn(console, 'error').mockImplementation()

    renderHook(() => useInitializeTasks({ errorTask }))

    expect(localStorage.getItem('useInitializeTasks@errorTask')).toBeNull()

    jest.restoreAllMocks()
  })

  it('空任务对象不报错', () => {
    expect(() => {
      renderHook(() => useInitializeTasks({}))
    }).not.toThrow()
  })
})
