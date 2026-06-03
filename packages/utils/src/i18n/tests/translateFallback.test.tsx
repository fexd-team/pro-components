/**
 * I18n translateFallback 兜底回调测试
 *
 * 测试目标：验证 config.translateFallback 的调用时机
 */

import { describe, test, expect, beforeEach } from '@jest/globals'
import { I18n } from '@fexd/tools'

describe('I18n translateFallback 兜底回调', () => {
  beforeEach(async () => {
    I18n.instances = []
    I18n.language = undefined
  })

  test('场景 1: translateFallback 在所有 fallback 实例都找不到时调用', async () => {
    const fallbackI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              existing: 'Existing Key',
            },
          },
        },
      },
    })

    const translateFallbackMock = jest.fn((key) => `[Fallback: ${key}]`)

    const mainI18n = new I18n({
      fallback: [fallbackI18n],
      translateFallback: translateFallbackMock,
      types: {
        default: {
          resources: {
            en_US: {
              // 只有 other
              other: 'Other',
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 当前实例有的 key，不调用 translateFallback
    expect(mainI18n.t('other')).toBe('Other')
    expect(translateFallbackMock).not.toHaveBeenCalled()

    // fallbackI18n 有的 key，不调用 translateFallback
    expect(mainI18n.t('existing')).toBe('Existing Key')
    expect(translateFallbackMock).not.toHaveBeenCalled()

    // 所有实例都没有的 key，调用 translateFallback
    expect(mainI18n.t('nonexistent.key')).toBe('[Fallback: nonexistent.key]')
    expect(translateFallbackMock).toHaveBeenCalledTimes(1)
    expect(translateFallbackMock).toHaveBeenCalledWith('nonexistent.key', {})
  })

  test('场景 2: translateFallback 返回 undefined 时，返回 key 本身', async () => {
    const translateFallbackMock = jest.fn((key) => undefined)

    const mainI18n = new I18n({
      translateFallback: translateFallbackMock,
      types: {
        default: {
          resources: {
            en_US: {
              // 没有任何 key
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // translateFallback 返回 undefined，返回 key 本身
    expect(mainI18n.t('missing.key')).toBe('missing.key')
    expect(translateFallbackMock).toHaveBeenCalledTimes(1)
  })

  test('场景 3: translateFallback 可以返回自定义格式', async () => {
    const translateFallbackMock = jest.fn((key, options) => {
      // 可以解析 key 并返回友好的提示
      const parts = key.split('.')
      return `[Missing translation: ${parts[parts.length - 1]}]`
    })

    const mainI18n = new I18n({
      translateFallback: translateFallbackMock,
      types: {
        default: {
          resources: {
            en_US: {
              // 空
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    expect(mainI18n.t('table.actions.delete')).toBe('[Missing translation: delete]')
    expect(mainI18n.t('form.pleaseEnter')).toBe('[Missing translation: pleaseEnter]')
  })

  test('场景 4: translateFallback 可以处理 options 参数', async () => {
    const translateFallbackMock = jest.fn((key, options) => {
      // 根据 options 返回不同的提示
      if (options?.isError) {
        return `[Error: ${key}]`
      }
      return `[Missing: ${key}]`
    })

    const mainI18n = new I18n({
      translateFallback: translateFallbackMock,
      types: {
        default: {
          resources: {
            en_US: {
              // 空
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    expect(mainI18n.t('error.network', { isError: true })).toBe('[Error: error.network]')
    expect(mainI18n.t('normal.text')).toBe('[Missing: normal.text]')
  })

  test('场景 5: 没有配置 translateFallback 时，返回 key 本身', async () => {
    const mainI18n = new I18n({
      // 没有配置 translateFallback
      types: {
        default: {
          resources: {
            en_US: {
              // 空
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 没有 translateFallback，返回 key 本身
    expect(mainI18n.t('missing.key')).toBe('missing.key')
  })

  test('场景 6: translateFallback 在 @type 翻译失败时也会调用', async () => {
    const translateFallbackMock = jest.fn((key) => `[Fallback: ${key}]`)

    const mainI18n = new I18n({
      translateFallback: translateFallbackMock,
      types: {
        default: {
          resources: {
            en_US: {
              // 没有 amount
            },
          },
        },
        number: {
          format: (str: string) => {
            // 如果 str 不是数字，返回 undefined
            if (isNaN(Number(str))) {
              return undefined
            }
            return Number(str).toLocaleString('en-US')
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 数字格式化失败，调用 translateFallback
    expect(mainI18n.t('not-a-number', { '@type': 'number' })).toBe('[Fallback: not-a-number]')
    expect(translateFallbackMock).toHaveBeenCalledTimes(1)
  })

  test('场景 7: translateFallback 不会在翻译成功时调用', async () => {
    const translateFallbackMock = jest.fn((key) => `[Fallback: ${key}]`)

    const mainI18n = new I18n({
      translateFallback: translateFallbackMock,
      types: {
        default: {
          resources: {
            en_US: {
              greeting: 'Hello',
              // 注意：空字符串会被视为 falsy，会触发 translateFallback
              // 所以这里不测试空字符串
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 翻译成功，不调用 translateFallback
    expect(mainI18n.t('greeting')).toBe('Hello')
    expect(translateFallbackMock).not.toHaveBeenCalled()

    // 缺失的 key 会调用 translateFallback
    expect(mainI18n.t('missing.key')).toBe('[Fallback: missing.key]')
    expect(translateFallbackMock).toHaveBeenCalledTimes(1)
  })

  test('场景 8: 有 fallback 实例时，translateFallback 在所有实例都失败后调用', async () => {
    const fallbackI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              fromFallback: 'From Fallback',
            },
          },
        },
      },
    })

    const translateFallbackMock = jest.fn((key) => `[Final Fallback: ${key}]`)

    const mainI18n = new I18n({
      fallback: [fallbackI18n],
      translateFallback: translateFallbackMock,
      types: {
        default: {
          resources: {
            en_US: {
              // 空
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // fallbackI18n 有的 key，不调用 translateFallback
    expect(mainI18n.t('fromFallback')).toBe('From Fallback')
    expect(translateFallbackMock).not.toHaveBeenCalled()

    // 所有实例都没有的 key，调用 translateFallback
    expect(mainI18n.t('missing.key')).toBe('[Final Fallback: missing.key]')
    expect(translateFallbackMock).toHaveBeenCalledTimes(1)
  })

  test('场景 9: translateFallback 可以返回 JSX（当 @type 为 jsx 时）', async () => {
    const React = require('react')
    const translateFallbackMock = jest.fn((key) => {
      return React.createElement('span', { className: 'fallback' }, `[Missing: ${key}]`)
    })

    const mainI18n = new I18n({
      translateFallback: translateFallbackMock,
      types: {
        jsx: {
          resources: {
            en_US: {
              // 空
            },
          },
          format: (str: string, options: any) => {
            // JSX 格式化
            return str
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    const result = mainI18n.t('missing.jsx', { '@type': 'jsx' })
    // translateFallback 返回了 JSX 元素
    expect(result).toBeDefined()
    expect((result as any).props.className).toBe('fallback')
  })

  test('场景 10: 生产环境常用实践 - 返回带警告的 key', async () => {
    // 模拟生产环境的 translateFallback
    const isDevelopment = process.env.NODE_ENV === 'development'

    const translateFallback = (key: string) => {
      if (isDevelopment) {
        // 开发环境：返回带警告标记的文本，方便发现缺失的翻译
        console.warn(`[i18n] Missing translation key: ${key}`)
        return `[⚠️ ${key}]`
      }
      // 生产环境：直接返回 key，避免暴露内部结构
      return key
    }

    const mainI18n = new I18n({
      translateFallback,
      types: {
        default: {
          resources: {
            en_US: {
              existing: 'Existing',
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 开发环境会输出警告
    expect(mainI18n.t('missing.key')).toBe(isDevelopment ? '[⚠️ missing.key]' : 'missing.key')
  })
})
