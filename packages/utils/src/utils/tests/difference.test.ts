import difference from '../difference'

describe('difference', () => {
  it('计算两个数组的差集', () => {
    const result = difference([1, 2, 3, 4], [2, 4])
    expect(result).toEqual([1, 3])
  })

  it('空数组返回空数组', () => {
    expect(difference([], [1, 2, 3])).toEqual([])
  })

  it('第二个数组为空时返回第一个数组的全部元素', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3])
  })

  it('完全相同的数组返回空数组', () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([])
  })

  it('没有交集时返回第一个数组', () => {
    expect(difference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3])
  })

  it('支持字符串数组', () => {
    expect(difference(['a', 'b', 'c'], ['b'])).toEqual(['a', 'c'])
  })

  it('处理重复元素', () => {
    const result = difference([1, 1, 2, 2, 3], [1, 2])
    expect(result).toEqual([3])
  })
})
