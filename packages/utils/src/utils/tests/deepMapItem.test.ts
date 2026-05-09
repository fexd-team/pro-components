import deepMapItem from '../deepMapItem'

describe('deepMapItem', () => {
  describe('数组处理', () => {
    it('[行为记录] handleItem 在叶值上被双重应用（递归返回 + 父级赋值）', () => {
      const input = [1, 2, 3]
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 2 : value),
      })
      // 叶值 1: deepMapItem(1) → handleItem(1)=2 → 父级 handleItem(2)=4
      expect(result).toEqual([4, 8, 12])
    })

    it('[行为记录] 嵌套数组中叶值也被双重应用', () => {
      const input = [
        [1, 2],
        [3, 4],
      ]
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 10 : value),
      })
      // 叶值 1: deepMapItem(1) → handleItem(1)=10 → 父级 handleItem(10)=100
      expect(result).toEqual([
        [100, 200],
        [300, 400],
      ])
    })

    it('数组处理返回新数组（不修改原数组）', () => {
      const input = [{ x: 1 }, { x: 2 }]
      const original = JSON.parse(JSON.stringify(input))
      deepMapItem(input, {
        handleItem: (value) => value,
      })
      expect(input).toEqual(original)
    })
  })

  describe('对象处理', () => {
    it('[行为记录] 对象叶值也被双重应用 handleItem', () => {
      const input = { a: 1, b: 2, c: 3 }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value + 100 : value),
      })
      // 叶值 1: deepMapItem(1) → handleItem(1)=101 → 父级 handleItem(101)=201
      expect(result.a).toBe(201)
      expect(result.b).toBe(202)
      expect(result.c).toBe(203)
    })

    it('递归处理嵌套对象 — 字符串叶值经过两次 toUpperCase 仍为大写', () => {
      const input = { nested: { x: 'hello', y: 'world' } }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'string' ? value.toUpperCase() : value),
      })
      expect(result.nested.x).toBe('HELLO')
      expect(result.nested.y).toBe('WORLD')
    })

    it('[行为记录] 对象是原地修改的，叶值被双重应用', () => {
      const input = { a: 1, b: 2 }
      deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 2 : value),
      })
      // 1 → handleItem(1)=2 → handleItem(2)=4
      expect(input.a).toBe(4)
      expect(input.b).toBe(8)
    })
  })

  describe('filterItem', () => {
    it('filterItem 返回 false 时跳过该项，但父级仍应用 handleItem', () => {
      const input = [1, 2, 3, 4, 5]
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 10 : value),
        filterItem: (value) => value !== 3,
      })
      // 被 filter 的 3 直接返回原值
      // 其他叶值: deepMapItem(n) → handleItem(n)=n*10 → 父级 handleItem(n*10)=n*100
      expect(result).toEqual([100, 200, 3, 400, 500])
    })

    it('filterItem 返回 false 时跳过该项（对象）', () => {
      const input = { keep: 'yes', skip: 'no', also_keep: 'ok' }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'string' ? value.toUpperCase() : value),
        filterItem: (_value, key) => key !== 'skip',
      })
      expect(result.keep).toBe('YES')
      expect(result.skip).toBe('no')
      expect(result.also_keep).toBe('OK')
    })
  })

  describe('keyPath 追踪', () => {
    it('handleItem 接收正确的 keyPath', () => {
      const paths: any[][] = []
      const input = { a: { b: { c: 'deep' } } }
      deepMapItem(input, {
        handleItem: (value, _key, keyPath) => {
          if (value === 'deep') paths.push([...keyPath])
          return value
        },
      })
      expect(paths).toContainEqual(['a', 'b', 'c'])
    })

    it('数组中的 keyPath 使用数字索引', () => {
      const paths: any[][] = []
      const input = [{ x: 'target' }]
      deepMapItem(input, {
        handleItem: (value, _key, keyPath) => {
          if (value === 'target') paths.push([...keyPath])
          return value
        },
      })
      expect(paths).toContainEqual([0, 'x'])
    })
  })

  describe('实际场景', () => {
    it('将所有 null 转为空字符串', () => {
      const input = { name: 'test', value: null, nested: { data: null, ok: true } }
      const result = deepMapItem(input, {
        handleItem: (value) => (value === null ? '' : value),
      })
      expect(result.value).toBe('')
      expect(result.nested.data).toBe('')
      expect(result.nested.ok).toBe(true)
    })

    it('无 options 时默认 handleItem 为恒等函数', () => {
      const input = { a: 1, b: 2 }
      const result = deepMapItem(input)
      expect(result).toEqual({ a: 1, b: 2 })
    })
  })
})
