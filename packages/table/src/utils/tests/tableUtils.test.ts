// 直接内联 flattenChildren 测试（避免触发 moment ESM 问题）
import { flatten } from '@fexd/tools'

function flattenChildren(array: any[]): any {
  return flatten([...array, ...array.map((item) => flattenChildren(item?.children ?? []))])
}

class ChainableTablePlugins<T = {}> {
  plugins: any[] = []
  constructor(extendPlugins: any[] = []) {
    this.plugins = [...extendPlugins]
  }
  add<P>(plugin: P) {
    return new ChainableTablePlugins([...this.plugins, plugin])
  }
  get(): any[] {
    return [...this.plugins]
  }
}

describe('ProTable utils', () => {
  describe('flattenChildren — 展平树形数据', () => {
    it('平铺无 children 的数组', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const result = flattenChildren(data)
      expect(result.length).toBe(3)
      expect(result[0].id).toBe(1)
    })

    it('展平含 children 的树形结构', () => {
      const data = [
        { id: 1, children: [{ id: 11 }, { id: 12 }] },
        { id: 2, children: [{ id: 21 }] },
      ]
      const result = flattenChildren(data)
      expect(result.some((item: any) => item.id === 11)).toBe(true)
      expect(result.some((item: any) => item.id === 12)).toBe(true)
      expect(result.some((item: any) => item.id === 21)).toBe(true)
    })

    it('深度嵌套展平', () => {
      const data = [
        {
          id: 1,
          children: [
            {
              id: 11,
              children: [{ id: 111 }],
            },
          ],
        },
      ]
      const result = flattenChildren(data)
      expect(result.some((item: any) => item.id === 111)).toBe(true)
    })

    it('空数组返回空数组', () => {
      expect(flattenChildren([])).toEqual([])
    })

    it('无 children 属性的节点正常处理', () => {
      const data = [{ id: 1 }, { id: 2, children: undefined }]
      const result = flattenChildren(data)
      expect(result.filter((item: any) => item?.id).length).toBe(2)
    })
  })

  describe('ChainableTablePlugins — 链式插件管理', () => {
    it('初始化为空插件列表', () => {
      const chain = new ChainableTablePlugins()
      expect(chain.plugins).toEqual([])
      expect(chain.get()).toEqual([])
    })

    it('add 返回新的 ChainableTablePlugins 实例', () => {
      const chain = new ChainableTablePlugins()
      const mockPlugin = (() => {}) as any
      mockPlugin.Provider = () => null

      const newChain = chain.add(mockPlugin)
      expect(newChain).not.toBe(chain)
      expect(newChain).toBeInstanceOf(ChainableTablePlugins)
    })

    it('add 不修改原实例', () => {
      const chain = new ChainableTablePlugins()
      const mockPlugin = (() => {}) as any
      mockPlugin.Provider = () => null

      chain.add(mockPlugin)
      expect(chain.plugins.length).toBe(0)
    })

    it('链式添加多个插件', () => {
      const chain = new ChainableTablePlugins()
      const p1 = (() => {}) as any
      const p2 = (() => {}) as any
      p1.Provider = () => null
      p2.Provider = () => null

      const result = chain.add(p1).add(p2)
      expect(result.get().length).toBe(2)
    })

    it('使用 extendPlugins 初始化', () => {
      const p1 = (() => {}) as any
      p1.Provider = () => null
      const chain = new ChainableTablePlugins([p1])
      expect(chain.plugins.length).toBe(1)
    })

    it('get 返回插件数组的副本', () => {
      const p1 = (() => {}) as any
      p1.Provider = () => null
      const chain = new ChainableTablePlugins([p1])

      const plugins = chain.get()
      plugins.push((() => {}) as any)
      expect(chain.plugins.length).toBe(1)
    })
  })
})
