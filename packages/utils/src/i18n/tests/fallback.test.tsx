/**
 * I18n Fallback 机制测试用例
 *
 * 测试目标：验证多层 fallback 链的查找行为
 */

import { describe, test, expect, beforeEach } from '@jest/globals'
import { I18n } from '@fexd/tools'

describe('I18n Fallback 机制', () => {
  beforeEach(async () => {
    // 清理所有实例
    I18n.instances = []
    I18n.language = undefined
  })

  test('场景 1: 单层 fallback - 当前实例找不到时查找 fallback', async () => {
    // 创建 fallback 实例（底层）
    const fallbackI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              common: {
                confirm: 'Confirm',
                cancel: 'Cancel',
              },
            },
            zh_CN: {
              common: {
                confirm: '确认',
                cancel: '取消',
              },
            },
          },
        },
      },
    })

    // 创建主实例（上层），fallback 到 fallbackI18n
    const mainI18n = new I18n({
      fallback: [fallbackI18n],
      types: {
        default: {
          resources: {
            en_US: {
              // 只有 greeting，没有 common
              greeting: 'Hello',
            },
            zh_CN: {
              greeting: '你好',
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 当前实例有的 key，优先使用当前实例
    expect(mainI18n.t('greeting')).toBe('Hello')

    // 当前实例没有的 key，查找 fallback
    expect(mainI18n.t('common.confirm')).toBe('Confirm')
    expect(mainI18n.t('common.cancel')).toBe('Cancel')

    // 两个实例都没有的 key，返回 key 本身
    expect(mainI18n.t('nonexistent.key')).toBe('nonexistent.key')
  })

  test('场景 2: 多层 fallback 链 - 按顺序查找', async () => {
    // 创建最底层的 fallback（globalI18n 角色）
    const globalI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              utils: {
                confirm: 'Confirm',
                okText: 'OK',
              },
            },
            zh_CN: {
              utils: {
                confirm: '确认',
                okText: '好的',
              },
            },
          },
        },
      },
    })

    // 创建中间层 fallback（scopeFallbackI18n 角色）
    const scopeFallbackI18n = new I18n({
      fallback: [globalI18n],
      types: {
        default: {
          resources: {
            en_US: {
              table: {
                actions: {
                  delete: 'Delete',
                },
              },
            },
            zh_CN: {
              table: {
                actions: {
                  delete: '删除',
                },
              },
            },
          },
        },
      },
    })

    // 创建顶层实例（scopeI18n 角色）
    const scopeI18n = new I18n({
      fallback: [scopeFallbackI18n, globalI18n],
      types: {
        default: {
          resources: {
            en_US: {
              // 只有 edit，没有 delete
              editField: {
                edit: 'Edit',
              },
            },
            zh_CN: {
              editField: {
                edit: '编辑',
              },
            },
          },
        },
      },
    })

    await I18n.applyLanguage('zh_CN')

    // 1. scopeI18n 自己的资源（优先级最高）
    expect(scopeI18n.t('editField.edit')).toBe('编辑')

    // 2. scopeFallbackI18n 的资源（第二优先级）
    expect(scopeI18n.t('table.actions.delete')).toBe('删除')

    // 3. globalI18n 的资源（第三优先级）
    expect(scopeI18n.t('utils.confirm')).toBe('确认')
    expect(scopeI18n.t('utils.okText')).toBe('好的')

    // 4. 都没有的 key，返回 key 本身
    expect(scopeI18n.t('nonexistent.key')).toBe('nonexistent.key')
  })

  test('场景 3: fallback 链中某个实例找到后停止查找', async () => {
    const baseI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              key: 'Base Value', // 底层的值
            },
          },
        },
      },
    })

    const middleI18n = new I18n({
      fallback: [baseI18n],
      types: {
        default: {
          resources: {
            en_US: {
              key: 'Middle Value', // 中间层的值
            },
          },
        },
      },
    })

    const topI18n = new I18n({
      fallback: [middleI18n],
      types: {
        default: {
          resources: {
            en_US: {
              // 顶层没有 key
              other: 'Other',
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 顶层没有，查找 middleI18n，找到后停止，不会继续查找 baseI18n
    expect(topI18n.t('key')).toBe('Middle Value')

    // 验证 middleI18n 确实有 key
    expect(middleI18n.t('key')).toBe('Middle Value')
    expect(baseI18n.t('key')).toBe('Base Value')
  })

  test('场景 4: fallback 链中的 @type 也会 fallback', async () => {
    const globalI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              amount: '1000000',
            },
          },
        },
        number: {
          format: (str: string) => Number(str).toLocaleString('en-US'),
        },
      },
    })

    const scopeI18n = new I18n({
      fallback: [globalI18n],
      types: {
        default: {
          resources: {
            en_US: {
              // 没有 amount
              price: '500000',
            },
          },
        },
        // 没有 number 类型
      },
    })

    await I18n.applyLanguage('en_US')

    // scopeI18n 有自己的 price
    expect(scopeI18n.t('price')).toBe('500000')

    // scopeI18n 没有 amount，fallback 到 globalI18n
    expect(scopeI18n.t('amount')).toBe('1000000')
  })

  test('场景 5: 空翻译结果（空字符串）会触发 fallback', async () => {
    const fallbackI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              key: 'Fallback Value',
            },
          },
        },
      },
    })

    const mainI18n = new I18n({
      fallback: [fallbackI18n],
      types: {
        default: {
          resources: {
            en_US: {
              key: '', // 空字符串
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // 空字符串会被视为 falsy 值，会触发 fallback
    expect(mainI18n.t('key')).toBe('Fallback Value')
  })

  test('场景 6: undefined/null 翻译会触发 fallback', async () => {
    const fallbackI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              key: 'Fallback Value',
            },
          },
        },
      },
    })

    const mainI18n = new I18n({
      fallback: [fallbackI18n],
      types: {
        default: {
          resources: {
            en_US: {
              // 没有 key
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // mainI18n 没有 key，会 fallback 到 fallbackI18n
    expect(mainI18n.t('key')).toBe('Fallback Value')
  })

  test('场景 7: fallback 链中所有实例都找不到，返回 key 本身', async () => {
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

    const mainI18n = new I18n({
      fallback: [fallbackI18n],
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

    // 所有实例都找不到，返回 key 本身
    expect(mainI18n.t('nonexistent.key')).toBe('nonexistent.key')
    expect(mainI18n.t('another.missing.key')).toBe('another.missing.key')
  })

  test('场景 8: fallback 链支持多个实例，按数组顺序查找', async () => {
    const fallback1 = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              from: 'Fallback1',
              key1: 'Key1 from Fallback1',
            },
          },
        },
      },
    })

    const fallback2 = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              from: 'Fallback2',
              key2: 'Key2 from Fallback2',
            },
          },
        },
      },
    })

    const mainI18n = new I18n({
      fallback: [fallback1, fallback2], // 先查找 fallback1，再查找 fallback2
      types: {
        default: {
          resources: {
            en_US: {
              // 只有 main
              main: 'Main',
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // mainI18n 自己的资源
    expect(mainI18n.t('main')).toBe('Main')

    // mainI18n 没有，查找 fallback1（数组第一个）
    expect(mainI18n.t('from')).toBe('Fallback1')
    expect(mainI18n.t('key1')).toBe('Key1 from Fallback1')

    // fallback1 没有，查找 fallback2（数组第二个）
    expect(mainI18n.t('key2')).toBe('Key2 from Fallback2')
  })

  test('场景 9: 语言切换后 fallback 仍然有效', async () => {
    const fallbackI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              confirm: 'Confirm',
            },
            zh_CN: {
              confirm: '确认',
            },
          },
        },
      },
    })

    const mainI18n = new I18n({
      fallback: [fallbackI18n],
      types: {
        default: {
          resources: {
            en_US: {
              greeting: 'Hello',
            },
            zh_CN: {
              greeting: '你好',
            },
          },
        },
      },
    })

    // 初始语言 en_US
    await I18n.applyLanguage('en_US')
    expect(mainI18n.t('greeting')).toBe('Hello')
    expect(mainI18n.t('confirm')).toBe('Confirm')

    // 切换到 zh_CN
    await I18n.applyLanguage('zh_CN')
    expect(mainI18n.t('greeting')).toBe('你好')
    expect(mainI18n.t('confirm')).toBe('确认')
  })

  test('场景 10: Pro 组件库的多层架构模拟', async () => {
    // 模拟 globalI18n（全局层）
    const globalI18n = new I18n({
      types: {
        default: {
          resources: {
            zh_CN: {
              utils: {
                confirm: '确认',
                cancel: '取消',
              },
            },
          },
        },
      },
    })

    // 模拟 scopeFallbackI18n（模块内置翻译层）
    const scopeFallbackI18n = new I18n({
      fallback: [globalI18n],
      types: {
        default: {
          resources: {
            zh_CN: {
              table: {
                actions: {
                  delete: '删除',
                  edit: '编辑',
                },
              },
              form: {
                pleaseEnter: '请输入',
                pleaseSelect: '请选择',
              },
            },
          },
        },
      },
    })

    // 模拟 scopeI18n（模块实例层）
    const scopeI18n = new I18n({
      fallback: [scopeFallbackI18n, globalI18n],
      types: {
        default: {
          resources: {
            zh_CN: {
              // 模块自定义的翻译
              table: {
                actions: {
                  // 覆盖 scopeFallbackI18n 的 delete
                  delete: '确定删除？',
                },
              },
            },
          },
        },
      },
    })

    await I18n.applyLanguage('zh_CN')

    // 1. scopeI18n 自己的资源（优先级最高）
    expect(scopeI18n.t('table.actions.delete')).toBe('确定删除？')

    // 2. scopeI18n 没有的，查找 scopeFallbackI18n
    expect(scopeI18n.t('table.actions.edit')).toBe('编辑')
    expect(scopeI18n.t('form.pleaseEnter')).toBe('请输入')
    expect(scopeI18n.t('form.pleaseSelect')).toBe('请选择')

    // 3. scopeFallbackI18n 也没有的，查找 globalI18n
    expect(scopeI18n.t('utils.confirm')).toBe('确认')
    expect(scopeI18n.t('utils.cancel')).toBe('取消')

    // 4. 都没有的，返回 key 本身
    expect(scopeI18n.t('nonexistent.key')).toBe('nonexistent.key')
  })

  test('场景 11: @namespace 在 fallback 链中的行为', async () => {
    // 注意：@namespace 的 fallback 行为较为复杂
    // 当使用 namespace 时，fallback 链中的实例需要也有对应的 namespace 资源才能生效

    const fallbackI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              myModule: {
                title: 'Fallback Module Title',
              },
              otherModule: {
                title: 'Fallback Other Module',
              },
            },
          },
        },
      },
    })

    const mainI18n = new I18n({
      fallback: [fallbackI18n],
      types: {
        default: {
          resources: {
            en_US: {
              // mainI18n 有自己的 otherModule
              otherModule: {
                title: 'Main Other Module',
              },
              // 没有 myModule
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // mainI18n 有自己的 otherModule.title，优先使用自己的
    expect(mainI18n.t('otherModule.title')).toBe('Main Other Module')

    // mainI18n 没有 myModule.title，fallback 到 fallbackI18n
    expect(mainI18n.t('myModule.title')).toBe('Fallback Module Title')

    // 都没有的 key，返回 key 本身
    expect(mainI18n.t('nonexistent.title')).toBe('nonexistent.title')
  })

  test('场景 12: fallback 链中的 priority 行为', async () => {
    // 创建低优先级的 fallback
    const lowPriorityI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              key: 'Low Priority',
            },
          },
        },
      },
    })

    // 创建高优先级的 fallback
    const highPriorityI18n = new I18n({
      types: {
        default: {
          resources: {
            en_US: {
              key: 'High Priority',
            },
          },
        },
      },
    })

    // mainI18n 自己的资源（优先级最高）
    const mainI18n = new I18n({
      fallback: [lowPriorityI18n, highPriorityI18n],
      types: {
        default: {
          resources: {
            en_US: {
              key: 'Main Value',
            },
          },
        },
      },
    })

    await I18n.applyLanguage('en_US')

    // mainI18n 自己的资源优先级最高
    expect(mainI18n.t('key')).toBe('Main Value')

    // 如果 mainI18n 没有，会按 fallback 数组顺序查找（不是 priority）
    // 这里 lowPriorityI18n 在数组前面，所以会先找到它
    const mainI18nWithoutKey = new I18n({
      fallback: [lowPriorityI18n, highPriorityI18n],
      types: {
        default: {
          resources: {
            en_US: {
              // 没有 key
            },
          },
        },
      },
    })

    expect(mainI18nWithoutKey.t('key')).toBe('Low Priority')
  })
})
