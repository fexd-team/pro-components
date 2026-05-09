import { compare, getObjectValues } from '../utils'

describe('ProForm utils', () => {
  describe('compare — deps 变化检测', () => {
    it('相同数组返回 false（无变化）', () => {
      expect(compare([1, 2, 3], [1, 2, 3])).toBe(false)
    })

    it('长度不同返回 true', () => {
      expect(compare([1, 2], [1, 2, 3])).toBe(true)
      expect(compare([1, 2, 3], [1, 2])).toBe(true)
    })

    it('值不同返回 true', () => {
      expect(compare([1, 2, 3], [1, 2, 4])).toBe(true)
    })

    it('空数组相同返回 false', () => {
      expect(compare([], [])).toBe(false)
    })

    it('引用相等的对象不触发变化', () => {
      const obj = { a: 1 }
      expect(compare([obj], [obj])).toBe(false)
    })

    it('结构相同但引用不同的对象触发变化', () => {
      expect(compare([{ a: 1 }], [{ a: 1 }])).toBe(true)
    })

    it('undefined 和 null 视为不同', () => {
      expect(compare([undefined], [null])).toBe(true)
    })

    it('混合类型比较', () => {
      expect(compare(['a', 1, true], ['a', 1, true])).toBe(false)
      expect(compare(['a', 1, true], ['a', 1, false])).toBe(true)
    })
  })

  describe('getObjectValues — 安全取值', () => {
    it('普通对象返回 values 数组', () => {
      expect(getObjectValues({ a: 1, b: 2 })).toEqual([1, 2])
    })

    it('空对象返回空数组', () => {
      expect(getObjectValues({})).toEqual([])
    })

    it('非对象返回空数组', () => {
      expect(getObjectValues(null)).toEqual([])
      expect(getObjectValues(undefined)).toEqual([])
      expect(getObjectValues(42)).toEqual([])
      expect(getObjectValues('str')).toEqual([])
      expect(getObjectValues(true)).toEqual([])
    })

    it('数组输入返回空数组（isObject 对数组返回 false）', () => {
      expect(getObjectValues([1, 2, 3])).toEqual([])
    })
  })
})
