import diffArray from '../diffArray'

describe('diffArray', () => {
  describe('基础功能', () => {
    it('计算新增项', () => {
      const { add } = diffArray([1, 2, 3], [1, 2, 3, 4, 5])
      expect(add).toEqual([4, 5])
    })

    it('计算移除项', () => {
      const { remove } = diffArray([1, 2, 3], [2, 3])
      expect(remove).toEqual([1])
    })

    it('同时计算 add/remove/diff', () => {
      const result = diffArray([1, 2, 3], [2, 3, 4, 5])
      expect(result.add).toEqual([4, 5])
      expect(result.remove).toEqual([1])
      expect(result.diff).toEqual([4, 5, 1])
    })
  })

  describe('边界情况', () => {
    it('相同数组：add/remove/diff 都为空', () => {
      const result = diffArray([1, 2, 3], [1, 2, 3])
      expect(result.add).toEqual([])
      expect(result.remove).toEqual([])
      expect(result.diff).toEqual([])
    })

    it('初始为空：所有当前项视为新增', () => {
      const result = diffArray([], [1, 2, 3])
      expect(result.add).toEqual([1, 2, 3])
      expect(result.remove).toEqual([])
    })

    it('当前为空：所有初始项视为移除', () => {
      const result = diffArray([1, 2, 3], [])
      expect(result.add).toEqual([])
      expect(result.remove).toEqual([1, 2, 3])
    })

    it('两个空数组：所有结果为空', () => {
      const result = diffArray([], [])
      expect(result.add).toEqual([])
      expect(result.remove).toEqual([])
      expect(result.diff).toEqual([])
    })

    it('完全不同的数组', () => {
      const result = diffArray([1, 2], [3, 4])
      expect(result.add).toEqual([3, 4])
      expect(result.remove).toEqual([1, 2])
      expect(result.diff).toEqual([3, 4, 1, 2])
    })
  })

  describe('字符串数组', () => {
    it('正确计算字符串差异', () => {
      const result = diffArray(['a', 'b', 'c'], ['b', 'c', 'd'])
      expect(result.add).toEqual(['d'])
      expect(result.remove).toEqual(['a'])
    })
  })

  describe('diff 是 add + remove 的合集', () => {
    it('diff 长度等于 add + remove 长度', () => {
      const result = diffArray([1, 2, 3, 4], [3, 4, 5, 6])
      expect(result.diff.length).toBe(result.add.length + result.remove.length)
      expect(result.diff).toEqual([...result.add, ...result.remove])
    })
  })
})
