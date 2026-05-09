import isAhooksUseRequestResult from '../isAhooksUseRequest'

describe('isAhooksUseRequestResult', () => {
  it('非对象值返回 false', () => {
    expect(isAhooksUseRequestResult(null)).toBe(false)
    expect(isAhooksUseRequestResult(undefined)).toBe(false)
    expect(isAhooksUseRequestResult(42)).toBe(false)
    expect(isAhooksUseRequestResult('string')).toBe(false)
    expect(isAhooksUseRequestResult(true)).toBe(false)
  })

  it('空对象返回 false', () => {
    expect(isAhooksUseRequestResult({})).toBe(false)
  })

  it('包含 isUseRequest 标记直接返回 true', () => {
    expect(isAhooksUseRequestResult({ isUseRequest: true })).toBe(true)
  })

  it('具备 ahooks useRequest 核心特征的对象返回 true', () => {
    const mockResult = {
      loading: false,
      data: undefined,
      run: () => {},
      refresh: () => {},
      mutate: () => {},
    }
    expect(isAhooksUseRequestResult(mockResult)).toBe(true)
  })

  it('缺少核心属性返回 false', () => {
    expect(isAhooksUseRequestResult({ loading: false, data: null })).toBe(false)
    expect(isAhooksUseRequestResult({ loading: false, data: null, run: () => {}, refresh: () => {} })).toBe(false)
  })

  it('类型不匹配返回 false — loading 非 boolean', () => {
    const mock = {
      loading: 'yes',
      data: undefined,
      run: () => {},
      refresh: () => {},
      mutate: () => {},
    }
    expect(isAhooksUseRequestResult(mock)).toBe(false)
  })

  it('类型不匹配返回 false — run 非 function', () => {
    const mock = {
      loading: false,
      data: undefined,
      run: 'not a function',
      refresh: () => {},
      mutate: () => {},
    }
    expect(isAhooksUseRequestResult(mock)).toBe(false)
  })

  it('类型不匹配返回 false — refresh 非 function', () => {
    const mock = {
      loading: false,
      data: undefined,
      run: () => {},
      refresh: 123,
      mutate: () => {},
    }
    expect(isAhooksUseRequestResult(mock)).toBe(false)
  })

  it('数组不是有效的 useRequest 结果', () => {
    expect(isAhooksUseRequestResult([1, 2, 3])).toBe(false)
  })

  it('完整的 ahooks useRequest 模拟对象识别正确', () => {
    const fullMock = {
      loading: true,
      data: { list: [] },
      error: undefined,
      run: () => {},
      runAsync: () => Promise.resolve(),
      refresh: () => {},
      refreshAsync: () => Promise.resolve(),
      mutate: () => {},
      cancel: () => {},
      params: [],
    }
    expect(isAhooksUseRequestResult(fullMock)).toBe(true)
  })
})
