import { isString, isObject } from '@fexd/tools'
import { message, notification } from 'antd'

export default function handleAsyncActionResponse(response: any) {
  // console.log(response)
  const {
    success,
    message: msg,
    notification: notify,
  } = response ?? {
    success: true,
  }
  const messageConfig = isString(msg) && msg !== '' ? { content: msg } : isObject(msg) ? msg : null
  const notifyConfig: any = isObject(notify) ? notify : isString(notify) ? { description: notify } : null
  const toastType = success ? 'success' : 'error'

  if (messageConfig) {
    message?.[toastType]?.(messageConfig)
  }

  if (notify) {
    notification?.[toastType]?.(notifyConfig)
  }
}
