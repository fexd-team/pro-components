import { Modal, message } from 'antd'
import { run, delay } from '@fexd/tools'

export const modalControllers = new Set<any>()
export const closeAll = async () => {
  try {
    // @ts-ignore
    ;[...modalControllers.values()].map((controller) => run(controller?.close))
    Modal.destroyAll()
    message.destroy()
    await delay(60)
  } catch (err) {
    console.error(err)
  }
}

export interface ModalControllerType<T = Record<string, any>> {
  promise: Promise<void>
  open: () => void
  close: () => void
  destroy: () => void
  update: (updateProps: T) => void
}
