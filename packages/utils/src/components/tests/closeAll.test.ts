import { closeAll, modalControllers } from '../showModal/controller'

jest.mock('antd', () => ({
  Modal: {
    destroyAll: jest.fn(),
  },
  message: {
    destroy: jest.fn(),
  },
}))

describe('closeAll', () => {
  beforeEach(() => {
    modalControllers.clear()
  })

  it('调用所有 controller 的 close 方法', async () => {
    const controller1 = { close: jest.fn() }
    const controller2 = { close: jest.fn() }
    modalControllers.add(controller1)
    modalControllers.add(controller2)

    await closeAll()

    expect(controller1.close).toHaveBeenCalledTimes(1)
    expect(controller2.close).toHaveBeenCalledTimes(1)
  })

  it('调用 Modal.destroyAll', async () => {
    const { Modal } = require('antd')
    await closeAll()
    expect(Modal.destroyAll).toHaveBeenCalled()
  })

  it('调用 message.destroy', async () => {
    const { message } = require('antd')
    await closeAll()
    expect(message.destroy).toHaveBeenCalled()
  })

  it('controller 无 close 方法不报错', async () => {
    const badController = {} as any
    modalControllers.add(badController)

    await expect(closeAll()).resolves.toBeUndefined()
  })

  it('没有 controller 时也不报错', async () => {
    await expect(closeAll()).resolves.toBeUndefined()
  })

  it('controller.close 抛出异常不影响流程', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const badController = {
      close: () => {
        throw new Error('close failed')
      },
    }
    modalControllers.add(badController)

    await closeAll()

    consoleSpy.mockRestore()
  })
})
