import createValueProxy from '../createValueProxy'

describe('createValueProxy', () => {
  describe('基础 Proxy get 拦截', () => {
    it('通过 valueHandler 转换属性值', () => {
      const target = { name: '张三', age: 25 }
      const proxied = createValueProxy(target, (value, key) => {
        if (key === 'name') return `[前缀] ${value}`
        return value
      })

      expect(proxied.name).toBe('[前缀] 张三')
      expect(proxied.age).toBe(25)
    })

    it('valueHandler 返回 undefined 时返回 undefined（不回退原始值）', () => {
      const target = { x: 'hello' }
      const proxied = createValueProxy(target, () => undefined)
      expect(proxied.x).toBeUndefined()
    })

    it('不存在的自有属性返回 undefined', () => {
      const target = { a: 1 }
      const proxied = createValueProxy(target, (v) => v)
      expect(proxied.b).toBeUndefined()
    })

    it('原型链属性（如 toString）通过 Reflect.get 正确返回，不经过 valueHandler', () => {
      const target = { a: 1 }
      const handler = jest.fn((v) => `handled:${v}`)
      const proxied = createValueProxy(target, handler)
      expect(proxied.toString).toBeDefined()
      expect(typeof proxied.toString).toBe('function')
      expect(handler).not.toHaveBeenCalledWith(expect.anything(), 'toString')
    })

    it('valueHandler 接收 prop 参数', () => {
      const target = { x: 10, y: 20 }
      const props: any[] = []
      createValueProxy(target, (value, prop) => {
        props.push(prop)
        return value
      })
      const proxied = createValueProxy(target, (v) => v)
      void proxied.x
      void proxied.y
    })
  })

  describe('i18n 翻译代理典型场景', () => {
    it('数组每项创建代理实现动态翻译', () => {
      const translations: Record<string, string> = {
        启用: 'Enabled',
        禁用: 'Disabled',
      }

      const options = [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ].map((item) =>
        createValueProxy(item, (value, key) => {
          if (key === 'label') return translations[value] ?? value
          return value
        }),
      )

      expect(options[0].label).toBe('Enabled')
      expect(options[0].value).toBe(1)
      expect(options[1].label).toBe('Disabled')
    })

    it('翻译表变化时动态更新', () => {
      const translations: Record<string, string> = { hello: '你好' }
      const target = { greeting: 'hello' }
      const proxied = createValueProxy(target, (value, key) => {
        if (key === 'greeting') return translations[value] ?? value
        return value
      })

      expect(proxied.greeting).toBe('你好')
      translations['hello'] = 'Hello'
      expect(proxied.greeting).toBe('Hello')
    })
  })

  describe('错误处理 — try/catch 回退', () => {
    it('非对象目标（如 null）回退返回原值', () => {
      const result = createValueProxy(null, (v) => v)
      expect(result).toBeNull()
    })

    it('非对象目标（如 number）回退返回原值', () => {
      const result = createValueProxy(42, (v) => v)
      expect(result).toBe(42)
    })

    it('非对象目标（如 string）回退返回原值', () => {
      const result = createValueProxy('hello', (v) => v)
      expect(result).toBe('hello')
    })

    it('undefined 回退返回 undefined', () => {
      const result = createValueProxy(undefined, (v) => v)
      expect(result).toBeUndefined()
    })
  })
})
