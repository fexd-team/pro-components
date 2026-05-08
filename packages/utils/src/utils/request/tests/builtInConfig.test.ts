import { builtInRequestConfig, defaultBigIntNumberParser } from '../builtInConfig'

describe('defaultBigIntNumberParser', () => {
  test('普通整数返回 number', () => {
    expect(defaultBigIntNumberParser(undefined, '42')).toBe(42)
    expect(defaultBigIntNumberParser(undefined, '0')).toBe(0)
    expect(defaultBigIntNumberParser(undefined, '-100')).toBe(-100)
  })

  test('普通小数返回 number', () => {
    expect(defaultBigIntNumberParser(undefined, '123.456')).toBe(123.456)
    expect(defaultBigIntNumberParser(undefined, '0.001')).toBe(0.001)
  })

  test('安全范围内的大位数小数保持 number', () => {
    expect(defaultBigIntNumberParser(undefined, '1501338859614.04')).toBe(1501338859614.04)
  })

  test('超出安全整数范围的大数字返回 string', () => {
    expect(defaultBigIntNumberParser(undefined, '9007199254740993')).toBe('9007199254740993')
    expect(defaultBigIntNumberParser(undefined, '99999999999999999')).toBe('99999999999999999')
  })

  test('科学计数法大数字展开为完整字符串', () => {
    expect(defaultBigIntNumberParser(undefined, '1e20')).toBe('100000000000000000000')
  })

  test('key 参数正常传递', () => {
    expect(defaultBigIntNumberParser('price', '99.9')).toBe(99.9)
    expect(defaultBigIntNumberParser(0, '42')).toBe(42)
  })
})

describe('builtInRequestConfig.transformRequest', () => {
  const transform = builtInRequestConfig.transformRequest

  test('application/x-www-form-urlencoded 序列化', () => {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' } as any
    const result = transform({ a: 1, b: 'test' }, headers)
    expect(result).toBe('a=1&b=test')
  })

  test('application/json 字符串直接返回', () => {
    const headers = { 'Content-Type': 'application/json' } as any
    expect(transform('{"a":1}', headers)).toBe('{"a":1}')
  })

  test('application/json 对象自动 stringify', () => {
    const headers = { 'Content-Type': 'application/json' } as any
    expect(transform({ a: 1 }, headers)).toBe('{"a":1}')
  })

  test('multipart/form-data 直接返回', () => {
    const headers = { 'Content-Type': 'multipart/form-data' } as any
    const data = { file: 'mock' }
    expect(transform(data, headers)).toBe(data)
  })

  test('无 Content-Type + 对象参数自动补充 application/json', () => {
    const headers = {} as any
    const result = transform({ x: 1 }, headers)
    expect(result).toBe('{"x":1}')
    expect(headers['Content-Type']).toBe('application/json')
  })

  test('FormData 直接返回', () => {
    const headers = {} as any
    const fd = new FormData()
    expect(transform(fd, headers)).toBe(fd)
  })

  test('原始值直接返回', () => {
    const headers = {} as any
    expect(transform('raw-string', headers)).toBe('raw-string')
  })
})

describe('builtInRequestConfig.transformResponse', () => {
  const transform = builtInRequestConfig.transformResponse

  function callWith(ctx: Record<string, any>, data: any) {
    return transform.call(ctx, data)
  }

  const baseCtx = {
    transitional: { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false },
  }

  test('bigIntJSONParsing 关闭时使用普通 JSON.parse', () => {
    const result = callWith({ ...baseCtx, bigIntJSONParsing: false }, '{"a":1}')
    expect(result).toEqual({ a: 1 })
  })

  test('bigIntJSONParsing 开启时大数字转为字符串', () => {
    const result = callWith({ ...baseCtx, bigIntJSONParsing: true }, '{"id":9007199254740993}')
    expect(result.id).toBe('9007199254740993')
  })

  test('bigIntJSONParsing 开启时普通数字保持 number', () => {
    const result = callWith({ ...baseCtx, bigIntJSONParsing: true }, '{"price":1501338859614.04}')
    expect(result.price).toBe(1501338859614.04)
  })

  test('bigIntJSONParsing 开启时 JSON string 字段不受影响', () => {
    const result = callWith({ ...baseCtx, bigIntJSONParsing: true }, '{"orderId":"12345"}')
    expect(result.orderId).toBe('12345')
  })

  test('自定义 bigIntNumberParser', () => {
    const ctx = {
      ...baseCtx,
      bigIntJSONParsing: true,
      bigIntNumberParser: (_key: any, str: string) => `custom:${str}`,
    }
    const result = callWith(ctx, '{"val":42}')
    expect(result.val).toBe('custom:42')
  })

  test('非 string 数据直接返回', () => {
    const obj = { already: 'parsed' }
    const result = callWith(baseCtx, obj)
    expect(result).toBe(obj)
  })

  test('无效 JSON + silentJSONParsing 不抛异常', () => {
    const result = callWith({ ...baseCtx, bigIntJSONParsing: false }, 'not-json')
    expect(result).toBe('not-json')
  })
})

describe('builtInRequestConfig.responseInterceptors', () => {
  const { onFulfilled, onRejected } = builtInRequestConfig.responseInterceptors

  test('onFulfilled 正常提取响应数据', () => {
    const response = {
      data: { data: { name: 'test' }, success: true, errCode: '0', msg: 'ok' },
    }
    const result = onFulfilled!(response as any)
    expect(result).toMatchObject({ success: true, data: { name: 'test' }, code: '0', message: 'ok' })
  })

  test('onFulfilled Blob 直接返回', () => {
    const blob = new Blob(['test'])
    const response = { data: blob }
    expect(onFulfilled!(response as any)).toBe(blob)
  })

  test('onRejected 提取错误信息', () => {
    const err = {
      response: {
        data: { errCode: '500', msg: 'server error' },
        status: 500,
        statusText: 'Internal Server Error',
      },
      message: 'Request failed',
    }
    const result = onRejected!(err as any)
    expect(result).toMatchObject({ success: false, code: '500', message: 'server error' })
  })

  test('onRejected 无 response 时回退到 err.message', () => {
    const err = { message: 'Network Error' }
    const result = onRejected!(err as any)
    expect(result).toMatchObject({ success: false, message: 'Network Error' })
  })
})
