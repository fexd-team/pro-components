import deepMapItem from '../deepMapItem'

describe('deepMapItem', () => {
  describe('数组处理', () => {
    it('handleItem 在叶值上只应用一次', () => {
      const input = [1, 2, 3]
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 2 : value),
      })
      expect(result).toEqual([2, 4, 6])
    })

    it('嵌套数组中叶值也只应用一次', () => {
      const input = [
        [1, 2],
        [3, 4],
      ]
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 10 : value),
      })
      expect(result).toEqual([
        [10, 20],
        [30, 40],
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
    it('对象叶值只应用一次 handleItem', () => {
      const input = { a: 1, b: 2, c: 3 }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value + 100 : value),
      })
      expect(result.a).toBe(101)
      expect(result.b).toBe(102)
      expect(result.c).toBe(103)
    })

    it('递归处理嵌套对象 — 字符串叶值经过两次 toUpperCase 仍为大写', () => {
      const input = { nested: { x: 'hello', y: 'world' } }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'string' ? value.toUpperCase() : value),
      })
      expect(result.nested.x).toBe('HELLO')
      expect(result.nested.y).toBe('WORLD')
    })

    it('对象处理返回新对象（不修改原对象）', () => {
      const input = { a: 1, b: 2 }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 2 : value),
      })
      expect(result.a).toBe(2)
      expect(result.b).toBe(4)
      expect(input.a).toBe(1)
      expect(input.b).toBe(2)
    })
  })

  describe('filterItem', () => {
    it('filterItem 返回 false 时跳过该项', () => {
      const input = [1, 2, 3, 4, 5]
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 10 : value),
        filterItem: (value) => value !== 3,
      })
      expect(result).toEqual([10, 20, 3, 40, 50])
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

  describe('mutable 模式', () => {
    it('mutable=true 时原地修改对象', () => {
      const input = { a: 1, b: 2 }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 2 : value),
        mutable: true,
      })
      expect(result).toBe(input)
      expect(input.a).toBe(2)
      expect(input.b).toBe(4)
    })

    it('mutable=true 时原地修改数组', () => {
      const input = [1, 2, 3]
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value + 10 : value),
        mutable: true,
      })
      expect(result).toBe(input)
      expect(input).toEqual([11, 12, 13])
    })

    it('mutable=true 递归对嵌套对象也原地修改', () => {
      const inner = { x: 1 }
      const input = { nested: inner }
      deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value * 3 : value),
        mutable: true,
      })
      expect(inner.x).toBe(3)
    })

    it('mutable=false（默认）不修改原数据', () => {
      const input = { a: 1 }
      const result = deepMapItem(input, {
        handleItem: (value) => (typeof value === 'number' ? value + 100 : value),
      })
      expect(result).not.toBe(input)
      expect(input.a).toBe(1)
      expect(result.a).toBe(101)
    })
  })
})
