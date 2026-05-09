import showTipsWithResponse from '../showTipsWithResponse'
import { message, notification } from 'antd'

jest.mock('antd', () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('showTipsWithResponse', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('message 提示', () => {
    it('success=true + message 字符串 → message.success', () => {
      showTipsWithResponse({ success: true, message: '操作成功' })
      expect(message.success).toHaveBeenCalledWith({ content: '操作成功' })
      expect(message.error).not.toHaveBeenCalled()
    })

    it('success=false + message 字符串 → message.error', () => {
      showTipsWithResponse({ success: false, message: '操作失败' })
      expect(message.error).toHaveBeenCalledWith({ content: '操作失败' })
      expect(message.success).not.toHaveBeenCalled()
    })

    it('message 为对象时直接传递', () => {
      const msgConfig = { content: '自定义', duration: 5 }
      showTipsWithResponse({ success: true, message: msgConfig })
      expect(message.success).toHaveBeenCalledWith(msgConfig)
    })

    it('message 为空字符串时不触发', () => {
      showTipsWithResponse({ success: true, message: '' })
      expect(message.success).not.toHaveBeenCalled()
      expect(message.error).not.toHaveBeenCalled()
    })

    it('无 message 字段时不触发', () => {
      showTipsWithResponse({ success: true })
      expect(message.success).not.toHaveBeenCalled()
    })
  })

  describe('notification 提示', () => {
    it('notification 字符串 → notification.success', () => {
      showTipsWithResponse({ success: true, notification: '任务完成' })
      expect(notification.success).toHaveBeenCalledWith({ description: '任务完成' })
    })

    it('notification 对象 → 直接传递', () => {
      const config = { message: '标题', description: '详情' }
      showTipsWithResponse({ success: false, notification: config })
      expect(notification.error).toHaveBeenCalledWith(config)
    })

    it('无 notification 字段时不触发', () => {
      showTipsWithResponse({ success: true, message: '仅 message' })
      expect(notification.success).not.toHaveBeenCalled()
      expect(notification.error).not.toHaveBeenCalled()
    })
  })

  describe('同时有 message 和 notification', () => {
    it('两者都触发', () => {
      showTipsWithResponse({
        success: true,
        message: '操作成功',
        notification: '详细信息',
      })
      expect(message.success).toHaveBeenCalledWith({ content: '操作成功' })
      expect(notification.success).toHaveBeenCalledWith({ description: '详细信息' })
    })
  })

  describe('异常输入', () => {
    it('response 为 null/undefined 时不报错', () => {
      expect(() => showTipsWithResponse(null)).not.toThrow()
      expect(() => showTipsWithResponse(undefined)).not.toThrow()
    })

    it('response 为空对象时默认 success=true 但无提示', () => {
      showTipsWithResponse({})
      expect(message.success).not.toHaveBeenCalled()
      expect(message.error).not.toHaveBeenCalled()
    })
  })
})
