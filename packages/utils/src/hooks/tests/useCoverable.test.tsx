import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { act } from '@testing-library/react-hooks'

import {
  deepItemFilter,
  deepMap,
  deepMerge,
  shallowMerge,
  cloneDeep,
  isTraversable,
  builtInMerge,
  isReactRef,
  isRaw,
  markRaw,
  isOpaqueValue,
} from '../_useCoverable/helpers'
import createValue from '../_useCoverable/value'
import { useCoverable } from '../_useCoverable'

// ═══════════════════════════════════════════════════════
//  helpers 工具函数
// ═══════════════════════════════════════════════════════

describe('helpers', () => {
  // ─── deepItemFilter ───────────────────────────────
  describe('deepItemFilter', () => {
    it('对普通对象返回 true', () => {
      expect(deepItemFilter({ a: 1 })).toBe(true)
    })

    it('对数组返回 true', () => {
      expect(deepItemFilter([1, 2])).toBe(true)
    })

    it('对基本类型返回 false', () => {
      expect(deepItemFilter(42)).toBe(false)
      expect(deepItemFilter('str')).toBe(false)
      expect(deepItemFilter(null)).toBe(false)
      expect(deepItemFilter(undefined)).toBe(false)
      expect(deepItemFilter(true)).toBe(false)
    })

    it('对 React 元素返回 false', () => {
      const el = React.createElement('div')
      expect(deepItemFilter(el)).toBe(false)
    })

    it('对带 $$typeof 的 React 元素对象返回 false', () => {
      const el = React.createElement('span')
      expect(deepItemFilter(el)).toBe(false)
    })

    it('对 CoverableValue 标记对象返回 false', () => {
      expect(deepItemFilter({ __isCoverableValue: true })).toBe(false)
    })

    it('对函数返回 false', () => {
      expect(deepItemFilter(() => {})).toBe(false)
    })

    it('对空对象返回 true', () => {
      expect(deepItemFilter({})).toBe(true)
    })

    it('对空数组返回 true', () => {
      expect(deepItemFilter([])).toBe(true)
    })
  })

  // ─── isTraversable ───────────────────────────────────
  describe('isTraversable', () => {
    it('对象和数组返回 true', () => {
      expect(isTraversable({})).toBe(true)
      expect(isTraversable([])).toBe(true)
      expect(isTraversable({ a: 1 })).toBe(true)
    })

    it('基本类型返回 false', () => {
      expect(isTraversable(1)).toBe(false)
      expect(isTraversable('str')).toBe(false)
      expect(isTraversable(null)).toBe(false)
      expect(isTraversable(undefined)).toBe(false)
    })
  })

  // ─── cloneDeep ────────────────────────────────────
  describe('cloneDeep', () => {
    it('深拷贝嵌套对象', () => {
      const original = { a: { b: { c: 1 } }, d: [1, 2] }
      const cloned = cloneDeep(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.a).not.toBe(original.a)
      expect(cloned.a.b).not.toBe(original.a.b)
      expect(cloned.d).not.toBe(original.d)
    })

    it('修改克隆对象不影响原始对象', () => {
      const original = { x: { y: 10 } }
      const cloned = cloneDeep(original)
      cloned.x.y = 99

      expect(original.x.y).toBe(10)
    })

    it('正确处理 React 元素', () => {
      const el = React.createElement('span', null, 'hello')
      const obj = { node: el, value: 1 }
      const cloned = cloneDeep(obj)

      expect(React.isValidElement(cloned.node)).toBe(true)
      expect(cloned.value).toBe(1)
    })

    it('深拷贝数组', () => {
      const original = [{ a: 1 }, { b: 2 }]
      const cloned = cloneDeep(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[0]).not.toBe(original[0])
      cloned[0].a = 99
      expect(original[0].a).toBe(1)
    })

    it('处理含有函数属性的对象', () => {
      const fn = () => 42
      const original = { handler: fn, data: { x: 1 } }
      const cloned = cloneDeep(original)

      expect(cloned.handler).toBe(fn)
      expect(cloned.data).not.toBe(original.data)
    })

    it('处理空对象和空数组', () => {
      expect(cloneDeep({})).toEqual({})
      expect(cloneDeep([])).toEqual([])
    })
  })

  // ─── deepMap ──────────────────────────────────────
  describe('deepMap', () => {
    it('遍历对象的每个可迭代子项', () => {
      const visited: string[] = []
      deepMap({ a: 1, b: { c: 2 } }, (item, key, keyPath) => {
        if (typeof key === 'string') visited.push(keyPath.join('.'))
        return [deepItemFilter(item), item]
      })

      expect(visited).toContain('a')
      expect(visited).toContain('b')
      expect(visited).toContain('b.c')
    })

    it('遍历数组并保持索引', () => {
      const visited: (string | number)[] = []
      deepMap([10, 20, 30], (item, key) => {
        visited.push(key)
        return [false, item]
      })

      expect(visited).toEqual([0, 1, 2])
    })

    it('handleItem 返回 [false, item] 时停止递归', () => {
      const visited: string[] = []
      deepMap({ a: { b: { c: 1 } } }, (item, key, keyPath) => {
        if (typeof key === 'string') visited.push(keyPath.join('.'))
        return [false, item]
      })

      expect(visited).toEqual(['a'])
    })

    it('对非可迭代输入直接返回', () => {
      expect(deepMap(42 as any)).toBe(42)
      expect(deepMap('str' as any)).toBe('str')
      expect(deepMap(null as any)).toBe(null)
    })

    it('可以转换叶节点值', () => {
      const result = deepMap({ a: 1, b: { c: 2 } }, (item, key) => {
        if (typeof item === 'number') return [false, item * 10]
        return [true, item]
      })

      expect(result).toEqual({ a: 10, b: { c: 20 } })
    })

    it('处理嵌套数组+对象的混合结构', () => {
      const visited: string[] = []
      deepMap({ list: [{ name: 'a' }, { name: 'b' }] }, (item, key, keyPath) => {
        visited.push(keyPath.join('.'))
        return [deepItemFilter(item), item]
      })

      expect(visited).toContain('list')
      expect(visited).toContain('list.0')
      expect(visited).toContain('list.0.name')
      expect(visited).toContain('list.1')
      expect(visited).toContain('list.1.name')
    })

    it('keyPath 正确传递初始路径', () => {
      const visited: string[] = []
      deepMap(
        { x: 1 },
        (item, key, keyPath) => {
          visited.push(keyPath.join('.'))
          return [false, item]
        },
        ['root', 'sub'],
      )

      expect(visited).toEqual(['root.sub.x'])
    })

    it('遇到 React 元素不继续递归（通过 deepItemFilter）', () => {
      const el = React.createElement('div', null, React.createElement('span'))
      const visited: string[] = []
      deepMap({ node: el, value: 1 }, (item, key, keyPath) => {
        visited.push(keyPath.join('.'))
        return [deepItemFilter(item), item]
      })

      expect(visited).toContain('node')
      expect(visited).toContain('value')
      expect(visited).not.toContain('node.props')
    })
  })

  // ─── deepMerge ────────────────────────────────────
  describe('deepMerge', () => {
    it('深度合并两个对象', () => {
      const target = { a: { b: 1, c: 2 }, d: 3 }
      const source = { a: { b: 10 }, e: 5 }
      const result = deepMerge(target, source)

      expect(result).toEqual({ a: { b: 10, c: 2 }, d: 3, e: 5 })
    })

    it('不修改原始对象', () => {
      const target = { a: { b: 1 } }
      const source = { a: { b: 2 } }
      deepMerge(target, source)

      expect(target.a.b).toBe(1)
    })

    it('source 不存在时返回 target', () => {
      const target = { a: 1 }
      expect(deepMerge(target, undefined as any)).toEqual({ a: 1 })
    })

    it('target 非对象时返回 source', () => {
      expect(deepMerge(42 as any, { a: 1 })).toEqual({ a: 1 })
    })

    it('支持自定义 filter 控制递归', () => {
      const target = { a: { b: 1, c: 2 }, d: [1, 2] }
      const source = { a: { b: 10 }, d: [3] }
      const result = deepMerge(target, source, (value, key) => {
        return key !== 'a'
      })

      expect(result.a).toEqual({ b: 10 })
      expect(result.d).toEqual([3])
    })

    it('合并嵌套数组', () => {
      const target = { list: [1, 2, 3] }
      const source = { list: [4, 5] }
      const result = deepMerge(target, source)

      expect(result.list).toEqual([4, 5])
    })

    it('三层以上深度嵌套合并', () => {
      const target = { a: { b: { c: { d: { e: 1 } } } } }
      const source = { a: { b: { c: { d: { f: 2 } } } } }
      const result = deepMerge(target, source)

      expect(result.a.b.c.d).toEqual({ e: 1, f: 2 })
    })

    it('source 覆盖 target 同名基本类型属性', () => {
      const result = deepMerge({ a: 'old', b: 1 }, { a: 'new', b: 2 })

      expect(result).toEqual({ a: 'new', b: 2 })
    })

    it('source 中新增的 key 会被添加到 target', () => {
      const result = deepMerge({ existing: 1 }, { newKey: 2, another: { deep: 3 } })

      expect(result).toEqual({ existing: 1, newKey: 2, another: { deep: 3 } })
    })

    it('双方都为 undefined/null 时的处理', () => {
      expect(deepMerge(undefined as any, undefined as any)).toBe(undefined)
      expect(deepMerge(null as any, null as any)).toBe(null)
      expect(deepMerge(null as any, { a: 1 })).toEqual({ a: 1 })
    })

    it('数组中包含对象的合并', () => {
      const target = { items: [{ id: 1, name: 'a' }] }
      const source = { items: [{ id: 2, name: 'b' }] }
      const result = deepMerge(target, source)

      expect(result.items).toEqual([{ id: 2, name: 'b' }])
    })
  })

  // ─── shallowMerge ────────────────────────────────
  describe('shallowMerge', () => {
    it('只合并顶层属性', () => {
      const result = shallowMerge({ a: { b: 1, c: 2 } }, { a: { b: 10 } })

      expect(result.a).toEqual({ b: 10 })
    })

    it('合并多个对象', () => {
      const result = shallowMerge({ a: 1 }, { b: 2 }, { c: 3 })

      expect(result).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('后者覆盖前者的同名属性', () => {
      const result = shallowMerge({ x: 'old' }, { x: 'new' })

      expect(result.x).toBe('new')
    })

    it('嵌套对象被整体替换而非递归合并', () => {
      const result = shallowMerge({ config: { a: 1, b: 2, c: 3 } }, { config: { a: 99 } })

      expect(result.config).toEqual({ a: 99 })
      expect(result.config.b).toBeUndefined()
    })

    it('处理 undefined 源不报错', () => {
      const result = shallowMerge({ a: 1 }, undefined)

      expect(result).toEqual({ a: 1 })
    })
  })

  // ─── builtInMerge ─────────────────────────────────
  describe('builtInMerge', () => {
    it('使用 deepItemFilter 作为默认 filter', () => {
      const target = { a: { b: 1 }, c: 2 }
      const source = { a: { b: 10 }, d: 3 }
      const result = builtInMerge(target, source)

      expect(result).toEqual({ a: { b: 10 }, c: 2, d: 3 })
    })

    it('遇到 CoverableValue 标记的对象不递归', () => {
      const coverableObj = { __isCoverableValue: true, default: 42 }
      const target = { item: coverableObj }
      const source = { item: { __isCoverableValue: true, default: 99 } }
      const result = builtInMerge(target, source)

      expect(result.item.default).toBe(99)
    })

    it('支持自定义 filter 参数', () => {
      const target = { a: { deep: 1 }, b: { deep: 2 } }
      const source = { a: { deep: 10, extra: 11 }, b: { deep: 20 } }
      const result = builtInMerge(target, source, (_value, key) => key !== 'a')

      expect(result.a).toEqual({ deep: 10, extra: 11 })
      expect(result.b).toEqual({ deep: 20 })
    })
  })
})

// ═══════════════════════════════════════════════════════
//  循环引用场景
// ═══════════════════════════════════════════════════════

describe('循环引用保护', () => {
  describe('deepMap', () => {
    it('遇到循环引用对象不应无限递归', () => {
      const obj: any = { a: 1, b: { c: 2 } }
      obj.b.self = obj

      const visited: string[] = []
      expect(() => {
        deepMap(obj, (item, key, keyPath) => {
          visited.push(keyPath.join('.'))
          return [deepItemFilter(item), item]
        })
      }).not.toThrow()
    })

    it('遇到循环引用数组不应无限递归', () => {
      const arr: any[] = [1, 2]
      arr.push(arr)

      expect(() => {
        deepMap(arr, (item, key) => {
          return [deepItemFilter(item), item]
        })
      }).not.toThrow()
    })
  })

  describe('deepMerge', () => {
    it('target 含循环引用时不应无限递归', () => {
      const target: any = { a: 1 }
      target.self = target
      const source = { b: 2 }

      expect(() => {
        deepMerge(target, source)
      }).not.toThrow()
    })

    it('source 含循环引用时不应无限递归', () => {
      const target = { a: 1 }
      const source: any = { b: 2 }
      source.self = source

      expect(() => {
        deepMerge(target, source)
      }).not.toThrow()
    })
  })
})

// ═══════════════════════════════════════════════════════
//  useCoverable.value
// ═══════════════════════════════════════════════════════

describe('useCoverable.value (createValue)', () => {
  it('创建的对象带有 __isCoverableValue 标记', () => {
    const val = createValue({ default: 1 })

    expect(val.__isCoverableValue()).toBe(true)
  })

  it('保留传入的 default 值', () => {
    const val = createValue({ default: { a: 1, b: 2 } })

    expect(val.default).toEqual({ a: 1, b: 2 })
  })

  it('未提供 onCovered 时使用内置 deepMerge', () => {
    const val = createValue({
      default: { a: 1, b: 2 },
    })
    const result = val.onCovered?.({ a: 1, b: 2 }, { a: 10 } as any)

    expect(result).toEqual({ a: 10, b: 2 })
  })

  it('使用自定义 onCovered 覆盖默认合并逻辑', () => {
    const val = createValue({
      default: { x: 0 },
      config: {} as { multiplier: number },
      onCovered: (current, config) => ({
        x: current.x * config.multiplier,
      }),
    })
    const result = val.onCovered?.({ x: 5 }, { multiplier: 3 })

    expect(result).toEqual({ x: 15 })
  })

  it('onCovered 可以完全替换默认值', () => {
    const val = createValue({
      default: [1, 2, 3],
      config: {} as number[],
      onCovered: (_current, config) => config,
    })
    const result = val.onCovered?.([1, 2, 3], [4, 5, 6])

    expect(result).toEqual([4, 5, 6])
  })

  it('default 为 undefined 时也能正常工作', () => {
    const val = createValue({})

    expect(val.__isCoverableValue()).toBe(true)
    expect(val.default).toBeUndefined()
  })

  it('onCovered 可以返回与 default 完全不同的类型', () => {
    const val = createValue({
      default: { a: 1 },
      config: {} as { mode: string },
      onCovered: (_current, config) => (config.mode === 'reset' ? null : _current),
    })

    expect(val.onCovered?.({ a: 1 }, { mode: 'reset' })).toBeNull()
    expect(val.onCovered?.({ a: 1 }, { mode: 'keep' })).toEqual({ a: 1 })
  })

  it('默认 onCovered (builtInMerge) 支持嵌套对象合并', () => {
    const val = createValue({
      default: { a: { b: 1, c: 2 }, d: 3 },
    })
    const result = val.onCovered?.({ a: { b: 1, c: 2 }, d: 3 }, { a: { b: 99 } } as any)

    expect(result).toEqual({ a: { b: 99, c: 2 }, d: 3 })
  })
})

// ═══════════════════════════════════════════════════════
//  useCoverable Hook（核心）
// ═══════════════════════════════════════════════════════

describe('useCoverable Hook', () => {
  it('返回包含 getConfig 的对象', () => {
    const { result } = renderHook(() => useCoverable({ a: 1, b: 'hello' }))

    expect(typeof result.current.getConfig).toBe('function')
  })

  it('getConfig 返回默认配置', () => {
    const { result } = renderHook(() => useCoverable({ x: 10, y: { z: 20 } }))
    const config = result.current.getConfig()

    expect(config).toEqual({ x: 10, y: { z: 20 } })
  })

  it('支持嵌套对象配置', () => {
    const { result } = renderHook(() =>
      useCoverable({
        a: { b: { c: { d: 1, e: 2 }, f: 3 } },
      }),
    )
    const config = result.current.getConfig()

    expect(config.a.b.c.d).toBe(1)
    expect(config.a.b.c.e).toBe(2)
    expect(config.a.b.f).toBe(3)
  })

  it('支持数组配置', () => {
    const { result } = renderHook(() => useCoverable({ items: [1, 2, 3, 4] }))
    const config = result.current.getConfig()

    expect(config.items).toEqual([1, 2, 3, 4])
  })

  it('支持 CoverableValue 配置项', () => {
    const { result } = renderHook(() =>
      useCoverable({
        theme: useCoverable.value({
          default: { color: 'blue', size: 14 },
        }),
      }),
    )
    const config = result.current.getConfig()

    expect(config.theme).toEqual({ color: 'blue', size: 14 })
  })

  it('支持函数形式的 config', () => {
    const { result } = renderHook(() =>
      useCoverable(({ getConfig }) => ({
        base: 100,
      })),
    )
    const config = result.current.getConfig()

    expect(config.base).toBe(100)
  })

  it('多次调用 getConfig 返回一致的结果', () => {
    const { result } = renderHook(() => useCoverable({ count: 42 }))

    const config1 = result.current.getConfig()
    const config2 = result.current.getConfig()

    expect(config1).toEqual(config2)
  })

  it('混合普通配置和 CoverableValue', () => {
    const { result } = renderHook(() =>
      useCoverable({
        simple: 'hello',
        nested: { a: 1 },
        custom: useCoverable.value({
          default: { x: 10 },
          config: {} as { factor: number },
          onCovered: (current, config) => ({
            x: current.x * config.factor,
          }),
        }),
      }),
    )
    const config = result.current.getConfig()

    expect(config.simple).toBe('hello')
    expect(config.nested).toEqual({ a: 1 })
    expect(config.custom).toEqual({ x: 10 })
  })

  it('空对象配置正常返回', () => {
    const { result } = renderHook(() => useCoverable({}))
    const config = result.current.getConfig()

    expect(config).toEqual({})
  })

  it('配置中包含 React 元素时不被递归处理', () => {
    const el = React.createElement('div', { className: 'test' }, 'content')
    const { result } = renderHook(() => useCoverable({ icon: el, label: 'btn' }))
    const config = result.current.getConfig()

    expect(React.isValidElement(config.icon)).toBe(true)
    expect(config.label).toBe('btn')
  })

  it('配置中包含函数时保持引用', () => {
    const handler = jest.fn()
    const { result } = renderHook(() => useCoverable({ onClick: handler, text: 'click' }))
    const config = result.current.getConfig()

    expect(config.onClick).toBe(handler)
  })

  it('多个 CoverableValue 独立工作', () => {
    const { result } = renderHook(() =>
      useCoverable({
        val1: useCoverable.value({ default: 10 }),
        val2: useCoverable.value({ default: 'hello' }),
        val3: useCoverable.value({
          default: [1, 2],
          onCovered: (_current, config) => config,
        }),
      }),
    )
    const config = result.current.getConfig()

    expect(config.val1).toBe(10)
    expect(config.val2).toBe('hello')
    expect(config.val3).toEqual([1, 2])
  })

  it('内部 __cover 方法正确应用覆盖', () => {
    const { result } = renderHook(() => useCoverable({ a: 1, b: { c: 2 } }))
    const coverable = result.current as any

    act(() => {
      coverable.__cover({ a: 99 })
    })

    const config = coverable.getConfig()
    expect(config.a).toBe(99)
    expect(config.b.c).toBe(2)
  })

  it('__cover 覆盖嵌套路径', () => {
    const { result } = renderHook(() => useCoverable({ x: { y: { z: 1 }, w: 2 } }))
    const coverable = result.current as any

    act(() => {
      coverable.__cover({ x: { y: { z: 100 } } })
    })

    const config = coverable.getConfig()
    expect(config.x.y.z).toBe(100)
    expect(config.x.w).toBe(2)
  })

  it('CoverableValue 被 __cover 覆盖时触发 onCovered', () => {
    const onCoveredSpy = jest.fn((current, config) => ({
      ...current,
      ...config,
    }))

    const { result } = renderHook(() =>
      useCoverable({
        theme: useCoverable.value({
          default: { color: 'red' },
          config: {} as { color: string },
          onCovered: onCoveredSpy,
        }),
      }),
    )
    const coverable = result.current as any

    act(() => {
      coverable.__cover({ theme: { color: 'blue' } })
    })

    const config = coverable.getConfig()
    expect(onCoveredSpy).toHaveBeenCalled()
    expect(config.theme.color).toBe('blue')
  })
})

// ═══════════════════════════════════════════════════════
//  useCoverable 数据类型与原始数据保护
// ═══════════════════════════════════════════════════════

describe('useCoverable 数据类型与原始数据保护', () => {
  const describeValue = (value: any) => ({
    tag: Object.prototype.toString.call(value),
    ctor: value?.constructor?.name,
    keys: value && typeof value === 'object' ? Object.keys(value) : [],
  })

  it('基础类型、普通对象、数组、函数、React 元素、ref/raw 的当前引用与拷贝行为', () => {
    const fn = jest.fn()
    const element = React.createElement('span', { className: 'icon' }, 'icon')
    const ref = { current: { value: 'ref-value' } }
    const raw = markRaw({ secret: { value: 'raw-value' } })
    const original = {
      text: 'hello',
      count: 1,
      enabled: true,
      empty: null as null,
      missing: undefined as undefined,
      nested: { deep: { value: 1 } },
      list: [{ id: 1, name: 'first' }],
      fn,
      element,
      ref,
      raw,
    }

    const { result } = renderHook(() => useCoverable(original))
    const config = result.current.getConfig()

    expect(config.text).toBe(original.text)
    expect(config.count).toBe(original.count)
    expect(config.enabled).toBe(original.enabled)
    expect(config.empty).toBeNull()
    expect(config.missing).toBeUndefined()
    expect(config.fn).toBe(fn)
    expect(React.isValidElement(config.element)).toBe(true)
    expect(config.ref).toBe(ref)
    expect(config.raw).toBe(raw)

    expect(config.nested).toEqual(original.nested)
    expect(config.nested).not.toBe(original.nested)
    expect(config.nested.deep).not.toBe(original.nested.deep)
    expect(config.list).toEqual(original.list)
    expect(config.list).not.toBe(original.list)
    expect(config.list[0]).not.toBe(original.list[0])

    config.nested.deep.value = 99
    config.list[0].id = 99

    expect(original.nested.deep.value).toBe(1)
    expect(original.list[0].id).toBe(1)
  })

  it('内建特殊对象在 getConfig 后应保持原类型和行为', () => {
    class CustomConfig {
      constructor(public name: string) {}
      getName() {
        return this.name
      }
    }

    const values = {
      regexp: /abc\d+/gi,
      date: new Date('2026-05-20T00:00:00.000Z'),
      map: new Map([
        ['enabled', true],
        ['count', 2],
      ]),
      set: new Set(['read', 'write']),
      error: new Error('boom'),
      url: new URL('https://example.com/path?foo=bar'),
      classInstance: new CustomConfig('demo'),
    }

    const validators = {
      regexp: (value: any) =>
        value instanceof RegExp && value.source === values.regexp.source && value.flags === values.regexp.flags,
      date: (value: any) => value instanceof Date && value.getTime() === values.date.getTime(),
      map: (value: any) => value instanceof Map && value.get('enabled') === true && value.get('count') === 2,
      set: (value: any) => value instanceof Set && value.has('read') && value.has('write'),
      error: (value: any) => value instanceof Error && value.message === values.error.message,
      url: (value: any) => value instanceof URL && value.href === values.url.href,
      classInstance: (value: any) => value instanceof CustomConfig && value.getName() === 'demo',
    }

    const { result } = renderHook(() => useCoverable(values))
    const config = result.current.getConfig()

    const failures = Object.keys(validators)
      .filter((key) => !(validators as any)[key](config[key]))
      .map((key) => ({
        key,
        original: describeValue((values as any)[key]),
        actual: describeValue(config[key]),
        actualValue: config[key],
      }))

    expect(failures).toEqual([])
    Object.keys(values).forEach((key) => {
      expect(config[key]).toBe((values as any)[key])
    })
  })

  it('正则默认值和正则覆盖值都应保持 RegExp 实例', () => {
    const defaultPasswordReg = /^(?=.*[A-Z])(?=.*\d).{8,}$/g
    const overridePasswordReg = /^[a-z]{3,}$/i
    const defaultHook = renderHook(() =>
      useCoverable({
        passwordReg: defaultPasswordReg,
      }),
    )

    expect(defaultHook.result.current.getConfig().passwordReg).toBeInstanceOf(RegExp)

    const overrideHook = renderHook(() =>
      useCoverable({
        passwordReg: defaultPasswordReg,
      }),
    )

    act(() => {
      ;(overrideHook.result.current as any).__cover({ passwordReg: overridePasswordReg })
    })

    const config = overrideHook.result.current.getConfig()
    expect(config.passwordReg).toBeInstanceOf(RegExp)
    expect(config.passwordReg.source).toBe(overridePasswordReg.source)
    expect(config.passwordReg.flags).toBe(overridePasswordReg.flags)
    expect(defaultPasswordReg.source).toBe('^(?=.*[A-Z])(?=.*\\d).{8,}$')
  })

  it('非普通对象可以被 coverable 覆盖为新的非普通对象', () => {
    const defaults = {
      regexp: /default/i,
      date: new Date('2026-05-20T00:00:00.000Z'),
      map: new Map([['from', 'default']]),
      set: new Set(['default']),
    }
    const overrides = {
      regexp: /override/g,
      date: new Date('2027-01-01T00:00:00.000Z'),
      map: new Map([['from', 'override']]),
      set: new Set(['override']),
    }
    const { result } = renderHook(() => useCoverable(defaults))

    act(() => {
      ;(result.current as any).__cover(overrides)
    })

    const config = result.current.getConfig()
    expect(config.regexp).toBe(overrides.regexp)
    expect(config.date).toBe(overrides.date)
    expect(config.map).toBe(overrides.map)
    expect(config.set).toBe(overrides.set)
    expect(defaults.regexp.source).toBe('default')
    expect(defaults.date.getTime()).toBe(new Date('2026-05-20T00:00:00.000Z').getTime())
    expect(defaults.map.get('from')).toBe('default')
    expect(defaults.set.has('default')).toBe(true)
  })

  it('覆盖合并后修改结果，不应回写污染默认配置或覆盖配置中的普通对象', () => {
    const defaultConfig = {
      nested: {
        keep: { value: 1 },
        list: [{ id: 1, name: 'default' }],
      },
    }
    const overrideConfig = {
      nested: {
        keep: { value: 2 },
        added: { value: 3 },
        list: {
          0: { id: 99, extra: true },
        } as any,
      },
    }
    const { result } = renderHook(() => useCoverable(defaultConfig))

    act(() => {
      ;(result.current as any).__cover(overrideConfig)
    })

    const config = result.current.getConfig()
    config.nested.keep.value = 100
    config.nested.added.value = 100
    config.nested.list[0].id = 100

    expect(defaultConfig.nested.keep.value).toBe(1)
    expect(defaultConfig.nested.list[0].id).toBe(1)
    expect(overrideConfig.nested.keep.value).toBe(2)
    expect(overrideConfig.nested.added.value).toBe(3)
    expect(overrideConfig.nested.list[0].id).toBe(99)
  })
})

// ═══════════════════════════════════════════════════════
//  useCoverable.component 集成测试
// ═══════════════════════════════════════════════════════

describe('useCoverable.component', () => {
  const TestComponent = useCoverable.component(function TestContent(props: { label: string }, ref: any) {
    const config = useCoverable({
      a: { b: { c: 1, d: 2 }, e: 3 },
      arr: [10, 20, 30],
      val: useCoverable.value({
        default: { x: 100, y: 200 },
        config: {} as { scale: number },
        onCovered: (current, config) => ({
          x: current.x * config.scale,
          y: current.y * config.scale,
        }),
      }),
    })

    return useCoverable.props({ config }).render(() => {
      const cfg = config.getConfig()
      return (
        <div>
          <span data-testid="label">{props.label}</span>
          <span data-testid="c">{cfg.a.b.c}</span>
          <span data-testid="d">{cfg.a.b.d}</span>
          <span data-testid="e">{cfg.a.e}</span>
          <span data-testid="arr">{JSON.stringify(cfg.arr)}</span>
          <span data-testid="val-x">{cfg.val.x}</span>
          <span data-testid="val-y">{cfg.val.y}</span>
        </div>
      )
    })
  })

  it('渲染默认配置', () => {
    render(<TestComponent label="test" />)

    expect(screen.getByTestId('label').textContent).toBe('test')
    expect(screen.getByTestId('c').textContent).toBe('1')
    expect(screen.getByTestId('d').textContent).toBe('2')
    expect(screen.getByTestId('e').textContent).toBe('3')
    expect(screen.getByTestId('arr').textContent).toBe('[10,20,30]')
    expect(screen.getByTestId('val-x').textContent).toBe('100')
    expect(screen.getByTestId('val-y').textContent).toBe('200')
  })

  it('通过 coverable prop（对象形式）覆盖嵌套配置', () => {
    render(
      <TestComponent
        label="override"
        coverable={{
          config: {
            a: { b: { c: 99 } },
          },
        }}
      />,
    )

    expect(screen.getByTestId('c').textContent).toBe('99')
    expect(screen.getByTestId('d').textContent).toBe('2')
    expect(screen.getByTestId('e').textContent).toBe('3')
  })

  it('覆盖 CoverableValue（自定义 onCovered）', () => {
    render(
      <TestComponent
        label="val-override"
        coverable={{
          config: {
            val: { scale: 2 },
          },
        }}
      />,
    )

    expect(screen.getByTestId('val-x').textContent).toBe('200')
    expect(screen.getByTestId('val-y').textContent).toBe('400')
  })

  it('不传 coverable 时保持默认值', () => {
    render(<TestComponent label="no-cover" />)

    expect(screen.getByTestId('val-x').textContent).toBe('100')
    expect(screen.getByTestId('val-y').textContent).toBe('200')
  })

  it('传空对象 coverable 时保持默认值', () => {
    render(<TestComponent label="empty-cover" coverable={{}} />)

    expect(screen.getByTestId('c').textContent).toBe('1')
    expect(screen.getByTestId('val-x').textContent).toBe('100')
  })

  // ─── 多配置组组件 ─────────────────────────────────
  const MultiConfigComponent = useCoverable.component(function MultiContent(props: { title: string }, ref: any) {
    const header = useCoverable({ height: 48, showLogo: true })
    const body = useCoverable({ padding: 16, bg: '#fff' })

    return useCoverable.props({ header, body }).render(() => {
      const h = header.getConfig()
      const b = body.getConfig()
      return (
        <div>
          <span data-testid="height">{h.height}</span>
          <span data-testid="showLogo">{String(h.showLogo)}</span>
          <span data-testid="padding">{b.padding}</span>
          <span data-testid="bg">{b.bg}</span>
        </div>
      )
    })
  })

  it('支持多配置组独立覆盖', () => {
    render(
      <MultiConfigComponent
        title="multi"
        coverable={{
          header: { showLogo: false },
          body: { bg: '#000' },
        }}
      />,
    )

    expect(screen.getByTestId('height').textContent).toBe('48')
    expect(screen.getByTestId('showLogo').textContent).toBe('false')
    expect(screen.getByTestId('padding').textContent).toBe('16')
    expect(screen.getByTestId('bg').textContent).toBe('#000')
  })

  it('只覆盖一个配置组时，另一组保持默认', () => {
    render(
      <MultiConfigComponent
        title="partial"
        coverable={{
          header: { height: 64 },
        }}
      />,
    )

    expect(screen.getByTestId('height').textContent).toBe('64')
    expect(screen.getByTestId('showLogo').textContent).toBe('true')
    expect(screen.getByTestId('padding').textContent).toBe('16')
    expect(screen.getByTestId('bg').textContent).toBe('#fff')
  })

  // ─── 同时覆盖嵌套配置和 CoverableValue ────────────
  it('同时覆盖嵌套对象 + CoverableValue + 保持其余默认', () => {
    render(
      <TestComponent
        label="combo"
        coverable={{
          config: {
            a: { b: { d: 88 } },
            val: { scale: 3 },
          },
        }}
      />,
    )

    expect(screen.getByTestId('c').textContent).toBe('1')
    expect(screen.getByTestId('d').textContent).toBe('88')
    expect(screen.getByTestId('e').textContent).toBe('3')
    expect(screen.getByTestId('val-x').textContent).toBe('300')
    expect(screen.getByTestId('val-y').textContent).toBe('600')
  })

  // ─── 包含 React 元素的配置 ────────────────────────
  const ElementComponent = useCoverable.component(function ElementContent(props: {}, ref: any) {
    const config = useCoverable({
      icon: React.createElement('span', { 'data-testid': 'icon' }, 'A'),
      label: 'default-label',
    })

    return useCoverable.props({ config }).render(() => {
      const cfg = config.getConfig()
      return (
        <div>
          {cfg.icon}
          <span data-testid="el-label">{cfg.label}</span>
        </div>
      )
    })
  })

  it('React 元素配置正常渲染', () => {
    render(<ElementComponent />)

    expect(screen.getByTestId('icon').textContent).toBe('A')
    expect(screen.getByTestId('el-label').textContent).toBe('default-label')
  })

  it('可覆盖非 React 元素字段而不影响元素字段', () => {
    render(
      <ElementComponent
        coverable={{
          config: {
            label: 'new-label',
          },
        }}
      />,
    )

    expect(screen.getByTestId('icon').textContent).toBe('A')
    expect(screen.getByTestId('el-label').textContent).toBe('new-label')
  })

  // ─── 包含函数配置的组件 ───────────────────────────
  const FnConfigComponent = useCoverable.component(function FnContent(props: {}, ref: any) {
    const config = useCoverable({
      formatter: (v: number) => `$${v}`,
      prefix: 'Price',
    })

    return useCoverable.props({ config }).render(() => {
      const cfg = config.getConfig()
      return (
        <div>
          <span data-testid="fn-result">{cfg.formatter(42)}</span>
          <span data-testid="fn-prefix">{cfg.prefix}</span>
        </div>
      )
    })
  })

  it('函数配置可被覆盖', () => {
    render(
      <FnConfigComponent
        coverable={{
          config: {
            formatter: (v: number) => `￥${v}`,
          },
        }}
      />,
    )

    expect(screen.getByTestId('fn-result').textContent).toBe('￥42')
    expect(screen.getByTestId('fn-prefix').textContent).toBe('Price')
  })

  it('不覆盖函数配置时保持默认', () => {
    render(<FnConfigComponent />)

    expect(screen.getByTestId('fn-result').textContent).toBe('$42')
  })

  // ─── 深层嵌套覆盖（4+层） ────────────────────────
  const DeepNestComponent = useCoverable.component(function DeepContent(props: {}, ref: any) {
    const config = useCoverable({
      l1: {
        l2: {
          l3: {
            l4: { value: 'deep-default', flag: true },
          },
        },
      },
    })

    return useCoverable.props({ config }).render(() => {
      const cfg = config.getConfig()
      return (
        <div>
          <span data-testid="deep-value">{cfg.l1.l2.l3.l4.value}</span>
          <span data-testid="deep-flag">{String(cfg.l1.l2.l3.l4.flag)}</span>
        </div>
      )
    })
  })

  it('4 层以上嵌套精确覆盖', () => {
    render(
      <DeepNestComponent
        coverable={{
          config: {
            l1: { l2: { l3: { l4: { value: 'overridden' } } } },
          },
        }}
      />,
    )

    expect(screen.getByTestId('deep-value').textContent).toBe('overridden')
    expect(screen.getByTestId('deep-flag').textContent).toBe('true')
  })

  // ─── 数组索引覆盖（对象形式） ─────────────────────
  it('通过对象形式按索引覆盖数组项', () => {
    render(
      <TestComponent
        label="arr-idx"
        coverable={{
          config: {
            arr: { 1: 99 } as any,
          },
        }}
      />,
    )

    const arr = JSON.parse(screen.getByTestId('arr').textContent!)
    expect(arr[0]).toBe(10)
    expect(arr[1]).toBe(99)
    expect(arr[2]).toBe(30)
  })

  // ─── 多个 CoverableValue 的独立覆盖 ──────────────
  const MultiValueComponent = useCoverable.component(function MultiValContent(props: {}, ref: any) {
    const config = useCoverable({
      size: useCoverable.value({
        default: { width: 100, height: 50 },
        config: {} as { scale: number },
        onCovered: (current, config) => ({
          width: current.width * config.scale,
          height: current.height * config.scale,
        }),
      }),
      color: useCoverable.value({
        default: { bg: '#fff', fg: '#000' },
        config: {} as { theme: 'light' | 'dark' },
        onCovered: (current, config) => (config.theme === 'dark' ? { bg: '#000', fg: '#fff' } : current),
      }),
    })

    return useCoverable.props({ config }).render(() => {
      const cfg = config.getConfig()
      return (
        <div>
          <span data-testid="mv-width">{cfg.size.width}</span>
          <span data-testid="mv-height">{cfg.size.height}</span>
          <span data-testid="mv-bg">{cfg.color.bg}</span>
          <span data-testid="mv-fg">{cfg.color.fg}</span>
        </div>
      )
    })
  })

  it('多个 CoverableValue 可独立覆盖', () => {
    render(
      <MultiValueComponent
        coverable={{
          config: {
            size: { scale: 2 },
          },
        }}
      />,
    )

    expect(screen.getByTestId('mv-width').textContent).toBe('200')
    expect(screen.getByTestId('mv-height').textContent).toBe('100')
    expect(screen.getByTestId('mv-bg').textContent).toBe('#fff')
    expect(screen.getByTestId('mv-fg').textContent).toBe('#000')
  })

  it('多个 CoverableValue 同时覆盖', () => {
    render(
      <MultiValueComponent
        coverable={{
          config: {
            size: { scale: 3 },
            color: { theme: 'dark' },
          },
        }}
      />,
    )

    expect(screen.getByTestId('mv-width').textContent).toBe('300')
    expect(screen.getByTestId('mv-height').textContent).toBe('150')
    expect(screen.getByTestId('mv-bg').textContent).toBe('#000')
    expect(screen.getByTestId('mv-fg').textContent).toBe('#fff')
  })
})

// ═══════════════════════════════════════════════════════
//  方案 1：isReactRef — 自动识别 React Ref
// ═══════════════════════════════════════════════════════

describe('isReactRef', () => {
  it('识别 useRef 产物', () => {
    const ref = React.createRef()
    expect(isReactRef(ref)).toBe(true)
  })

  it('识别手动构造的 { current: ... } 对象', () => {
    expect(isReactRef({ current: null })).toBe(true)
    expect(isReactRef({ current: document.createElement('div') })).toBe(true)
  })

  it('多于一个 key 时返回 false', () => {
    expect(isReactRef({ current: null, extra: 1 })).toBe(false)
  })

  it('非对象返回 false', () => {
    expect(isReactRef(null)).toBe(false)
    expect(isReactRef(undefined)).toBe(false)
    expect(isReactRef(42)).toBe(false)
    expect(isReactRef('str')).toBe(false)
    expect(isReactRef([])).toBe(false)
  })

  it('React 元素返回 false', () => {
    expect(isReactRef(React.createElement('div'))).toBe(false)
  })
})

describe('方案 1 — ref 在 cloneDeep 和 deepMap 中不被处理', () => {
  it('cloneDeep 保持 ref 对象引用不变', () => {
    const ref = { current: null } as React.MutableRefObject<any>
    const config = { title: 'test', ref, nested: { a: 1 } }
    const cloned = cloneDeep(config)

    expect(cloned.ref).toBe(ref)
    expect(cloned).not.toBe(config)
    expect(cloned.nested).not.toBe(config.nested)
  })

  it('cloneDeep 保持深层嵌套的 ref 引用', () => {
    const innerRef = { current: 'hello' }
    const config = { deep: { deeper: { ref: innerRef } } }
    const cloned = cloneDeep(config)

    expect(cloned.deep.deeper.ref).toBe(innerRef)
    expect(cloned.deep).not.toBe(config.deep)
  })

  it('deepItemFilter 对 ref 返回 false', () => {
    expect(deepItemFilter({ current: null })).toBe(false)
    expect(deepItemFilter(React.createRef())).toBe(false)
  })

  it('deepMap 不深入 ref 内部', () => {
    const ref = { current: { secret: 42 } }
    const visited: string[] = []
    deepMap({ myRef: ref, normal: { a: 1 } }, (item, key, keyPath) => {
      if (typeof key === 'string') visited.push(keyPath.join('.'))
      return [deepItemFilter(item), item]
    })

    expect(visited).toContain('myRef')
    expect(visited).toContain('normal')
    expect(visited).toContain('normal.a')
    expect(visited).not.toContain('myRef.current')
    expect(visited).not.toContain('myRef.current.secret')
  })

  it('deepMerge 不合并 ref 内部，而是整体替换', () => {
    const refA = { current: 'a' }
    const refB = { current: 'b' }
    const result = deepMerge({ ref: refA, x: 1 }, { ref: refB, x: 2 })

    expect(result.ref).toBe(refB)
    expect(result.x).toBe(2)
  })

  it('shallowMerge 保持 ref 引用', () => {
    const ref = { current: null }
    const result = shallowMerge({ ref, a: 1 }, { b: 2 })

    expect(result.ref).toBe(ref)
  })

  it('useCoverable 配置中的 ref 在 getConfig 后保持同一引用', () => {
    const ref = { current: null } as React.MutableRefObject<any>
    const { result } = renderHook(() =>
      useCoverable({
        title: '测试',
        tableRef: ref,
        data: { count: 0 },
      }),
    )

    const config = result.current.getConfig()
    expect(config.tableRef).toBe(ref)
  })
})

// ═══════════════════════════════════════════════════════
//  方案 2：useCoverable.raw() — 显式标记不可处理值
// ═══════════════════════════════════════════════════════

describe('markRaw / isRaw / isOpaqueValue', () => {
  it('markRaw 返回原始值', () => {
    const obj = { a: 1, b: 2 }
    expect(markRaw(obj)).toBe(obj)
  })

  it('markRaw 后 isRaw 返回 true', () => {
    const obj = { a: 1 }
    markRaw(obj)
    expect(isRaw(obj)).toBe(true)
  })

  it('未 markRaw 的对象 isRaw 返回 false', () => {
    expect(isRaw({ a: 1 })).toBe(false)
  })

  it('对原始类型 markRaw 不报错、isRaw 返回 false', () => {
    expect(markRaw(42 as any)).toBe(42)
    expect(markRaw(null as any)).toBe(null)
    expect(markRaw('str' as any)).toBe('str')
    expect(isRaw(42)).toBe(false)
    expect(isRaw(null)).toBe(false)
  })

  it('isOpaqueValue 检测 raw 和 ref', () => {
    const rawObj = markRaw({ x: 1 })
    const ref = { current: null }

    expect(isOpaqueValue(rawObj)).toBe(true)
    expect(isOpaqueValue(ref)).toBe(true)
    expect(isOpaqueValue({ a: 1, b: 2 })).toBe(false)
  })
})

describe('方案 2 — useCoverable.raw() 完整流程', () => {
  it('raw 标记的对象不被 cloneDeep 克隆', () => {
    const special = markRaw({ secret: 'data', nested: { deep: true } })
    const config = { normal: { a: 1 }, special }
    const cloned = cloneDeep(config)

    expect(cloned.special).toBe(special)
    expect(cloned.normal).not.toBe(config.normal)
  })

  it('raw 标记的对象不被 deepItemFilter 允许遍历', () => {
    const raw = markRaw({ a: 1 })
    expect(deepItemFilter(raw)).toBe(false)
  })

  it('raw 标记的对象不被 deepMap 深入', () => {
    const raw = markRaw({ inner: { deep: 999 } })
    const visited: string[] = []
    deepMap({ myRaw: raw, normal: { a: 1 } }, (item, key, keyPath) => {
      if (typeof key === 'string') visited.push(keyPath.join('.'))
      return [deepItemFilter(item), item]
    })

    expect(visited).toContain('myRaw')
    expect(visited).not.toContain('myRaw.inner')
    expect(visited).toContain('normal')
    expect(visited).toContain('normal.a')
  })

  it('raw 标记的对象在 deepMerge 中整体替换', () => {
    const rawA = markRaw({ x: 1, y: 2 })
    const rawB = markRaw({ x: 99 })
    const result = deepMerge({ obj: rawA }, { obj: rawB })

    expect(result.obj).toBe(rawB)
  })

  it('useCoverable 中 raw 值在 getConfig 后保持引用', () => {
    const controller = markRaw({ reload: () => {}, reset: () => {} })
    const { result } = renderHook(() =>
      useCoverable({
        title: '表格',
        controller,
        columns: [{ title: '名称' }],
      }),
    )

    const config = result.current.getConfig()
    expect(config.controller).toBe(controller)
  })

  it('useCoverable.raw 等同于 markRaw', () => {
    expect(useCoverable.raw).toBeDefined()
    const obj = { a: 1 }
    const marked = useCoverable.raw(obj)
    expect(marked).toBe(obj)
    expect(isRaw(marked)).toBe(true)
  })

  it('raw 值修改后外部可见', () => {
    const store = markRaw({ count: 0 })
    const { result } = renderHook(() => useCoverable({ store, label: 'test' }))

    store.count = 42
    const config = result.current.getConfig()
    expect(config.store.count).toBe(42)
  })
})

// ═══════════════════════════════════════════════════════
//  方案 1+2 综合 — coverable 组件中的 ref/raw 覆盖场景
// ═══════════════════════════════════════════════════════

describe('coverable 组件中 ref/raw 的覆盖行为', () => {
  const RefTestComponent = useCoverable.component(function RefTestContent(props: { label?: string }, ref: any) {
    const internalRef = React.useRef<string>('internal')
    const config = useCoverable({
      tableRef: internalRef,
      title: 'default',
    })

    return useCoverable.props({ config }).render(() => {
      const cfg = config.getConfig()
      return (
        <div>
          <span data-testid="ref-title">{cfg.title}</span>
          <span data-testid="ref-value">{cfg.tableRef?.current}</span>
        </div>
      )
    })
  })

  it('默认 ref 保持引用', () => {
    render(<RefTestComponent />)
    expect(screen.getByTestId('ref-value').textContent).toBe('internal')
  })

  it('通过 coverable 覆盖 ref', () => {
    const externalRef = { current: 'external' }
    render(
      <RefTestComponent
        coverable={{
          config: {
            tableRef: externalRef,
          },
        }}
      />,
    )
    expect(screen.getByTestId('ref-value').textContent).toBe('external')
  })

  it('通过 coverable 覆盖 ref 后外部修改可感知', () => {
    const externalRef = { current: 'v1' }
    const { rerender } = render(
      <RefTestComponent
        coverable={{
          config: {
            tableRef: externalRef,
          },
        }}
      />,
    )

    expect(screen.getByTestId('ref-value').textContent).toBe('v1')
    externalRef.current = 'v2'
    rerender(
      <RefTestComponent
        coverable={{
          config: {
            tableRef: externalRef,
          },
        }}
      />,
    )
    expect(screen.getByTestId('ref-value').textContent).toBe('v2')
  })

  const RawTestComponent = useCoverable.component(function RawTestContent(props: {}, ref: any) {
    const store = React.useMemo(() => markRaw({ items: [1, 2, 3], meta: { loaded: true } }), [])
    const config = useCoverable({
      store,
      label: 'raw-test',
    })

    return useCoverable.props({ config }).render(() => {
      const cfg = config.getConfig()
      return (
        <div>
          <span data-testid="raw-len">{cfg.store.items.length}</span>
          <span data-testid="raw-loaded">{String(cfg.store.meta.loaded)}</span>
          <span data-testid="raw-label">{cfg.label}</span>
        </div>
      )
    })
  })

  it('raw 标记的复杂对象在 coverable 组件中保持完整', () => {
    render(<RawTestComponent />)
    expect(screen.getByTestId('raw-len').textContent).toBe('3')
    expect(screen.getByTestId('raw-loaded').textContent).toBe('true')
    expect(screen.getByTestId('raw-label').textContent).toBe('raw-test')
  })
})

// ═══════════════════════════════════════════════════════
//  集成测试 — 模拟 useCoverableProps + defineCoverableProps
//  验证 ref 在完整 coverable 链路（含 CoverableValue）中的安全性
// ═══════════════════════════════════════════════════════

describe('useCoverableProps 模拟集成 — ref 安全性', () => {
  /**
   * 模拟 ProTable.defineCoverableProps + useCoverableProps 的完整流程：
   * value → CoverableValue → useCoverable → getConfig → getProps
   * 同时模拟 coverable prop 覆盖路径。
   */
  function mockDefineCoverableProps(value: Record<string, any>) {
    return useCoverable.value({
      default: {
        ...value,
        getProps: () => ({ ...value }),
      },
      onCovered(current: any, config: any) {
        const nextConfig = useCoverable.merge(current, config)
        return {
          ...nextConfig,
          getProps: () => ({ ...nextConfig }),
        }
      },
    })
  }

  function useMockCoverableProps(value: Record<string, any>) {
    const REF_KEYS = ['ref', 'tableRef', 'formRef'] as const
    const extractedRefs: Record<string, any> = {}
    const safeValue = { ...value }
    for (const key of REF_KEYS) {
      if (key in safeValue) {
        extractedRefs[key] = safeValue[key]
        delete safeValue[key]
      }
    }

    const config = mockDefineCoverableProps(safeValue)
    const coverableConfig = useCoverable(config) as any
    const rawGetConfig = coverableConfig.getConfig.bind(coverableConfig)

    const getProps = () => {
      const finalConfig = rawGetConfig()
      const props = finalConfig?.getProps?.() ?? {}
      for (const key of REF_KEYS) {
        if (key in extractedRefs && !(key in props)) {
          props[key] = extractedRefs[key]
        }
      }
      return props
    }

    return Object.assign(coverableConfig, { getProps })
  }

  // ─── 方案 3 safe key 测试 ─────────────────────────

  it('safe key 提取：ref 在 getProps 中保持同一引用', () => {
    const tableRef = React.createRef<any>()
    const { result } = renderHook(() =>
      useMockCoverableProps({
        ref: tableRef,
        title: '用户列表',
        bordered: true,
      }),
    )

    const props = result.current.getProps()
    expect(props.ref).toBe(tableRef)
    expect(props.title).toBe('用户列表')
  })

  it('safe key 提取：tableRef 在 getProps 中保持同一引用', () => {
    const tableRef = { current: null } as React.MutableRefObject<any>
    const { result } = renderHook(() =>
      useMockCoverableProps({
        tableRef,
        columns: [{ title: '名称' }],
      }),
    )

    const props = result.current.getProps()
    expect(props.tableRef).toBe(tableRef)
  })

  it('safe key 提取：formRef 在 getProps 中保持同一引用', () => {
    const formRef = { current: null } as React.MutableRefObject<any>
    const { result } = renderHook(() =>
      useMockCoverableProps({
        formRef,
        fields: [{ name: '名称' }],
      }),
    )

    const props = result.current.getProps()
    expect(props.formRef).toBe(formRef)
  })

  it('safe key 提取：ref 不在 coverable config 内部（不影响其他属性合并）', () => {
    const ref = { current: null }
    const { result } = renderHook(() =>
      useMockCoverableProps({
        ref,
        title: '表格',
        nested: { a: 1, b: 2 },
      }),
    )

    const config = result.current.getConfig()
    expect(config.ref).toBeUndefined()
    expect(config.title).toBe('表格')

    const props = result.current.getProps()
    expect(props.ref).toBe(ref)
  })

  // ─── 方案 1 自动检测：不走 safe key，直接放 coverable ────

  it('无 safe key 保护时：方案 1 自动检测 ref 仍然有效', () => {
    const ref = { current: null } as React.MutableRefObject<any>
    const { result } = renderHook(() => {
      const config = mockDefineCoverableProps({
        ref,
        title: '直接传入',
      })
      return useCoverable(config as any) as any
    })

    const finalConfig = result.current.getConfig()
    const props = finalConfig?.getProps?.() ?? {}
    expect(props.ref).toBe(ref)
  })

  // ─── coverable 组件覆盖路径中的 ref ───────────────

  const CoverableProTable = useCoverable.component(function MockProTable(props: { label?: string }, ref: any) {
    const internalRef = React.useRef<string>('internal-table')
    const tableProps = useMockCoverableProps({
      ref: internalRef,
      title: 'default-title',
      size: 'middle',
    })

    return useCoverable.props({ tableProps: tableProps as any }).render(() => {
      const p = tableProps.getProps()
      return (
        <div>
          <span data-testid="cpt-ref">{p.ref?.current}</span>
          <span data-testid="cpt-title">{p.title}</span>
          <span data-testid="cpt-size">{p.size}</span>
        </div>
      )
    })
  })

  it('coverable 组件：默认 ref 保持内部引用', () => {
    render(<CoverableProTable />)
    expect(screen.getByTestId('cpt-ref').textContent).toBe('internal-table')
    expect(screen.getByTestId('cpt-title').textContent).toBe('default-title')
  })

  it('coverable 组件：通过 coverable prop 覆盖 title 不影响 ref', () => {
    render(
      <CoverableProTable
        coverable={{
          tableProps: {
            title: 'override-title',
          },
        }}
      />,
    )
    expect(screen.getByTestId('cpt-ref').textContent).toBe('internal-table')
    expect(screen.getByTestId('cpt-title').textContent).toBe('override-title')
  })

  it('coverable 组件：通过 coverable prop 覆盖 ref', () => {
    const externalRef = { current: 'external-table' }
    render(
      <CoverableProTable
        coverable={{
          tableProps: {
            ref: externalRef,
          },
        }}
      />,
    )
    expect(screen.getByTestId('cpt-ref').textContent).toBe('external-table')
  })

  // ─── 方案 2 raw：非 ref 的特殊对象也需要保护 ────────

  it('coverable 中使用 raw 保护非 ref 的复杂对象', () => {
    const controller = markRaw({
      reload: () => 'reloaded',
      reset: () => 'reset',
      getState: () => ({ loading: false }),
    })

    const { result } = renderHook(() =>
      useCoverable({
        controller,
        title: '控制器测试',
      }),
    )

    const config = result.current.getConfig()
    expect(config.controller).toBe(controller)
    expect(config.controller.reload()).toBe('reloaded')
    expect(config.controller.getState()).toEqual({ loading: false })
  })

  it('coverable 组件中 raw 对象在覆盖路径上保持稳定', () => {
    const sdk = markRaw({
      version: '2.0',
      request: () => Promise.resolve({ data: [] }),
      interceptors: { request: [], response: [] },
    })

    const SdkComponent = useCoverable.component(function SdkContent(props: {}, ref: any) {
      const config = useCoverable({
        sdk,
        label: 'default',
      })

      return useCoverable.props({ config }).render(() => {
        const cfg = config.getConfig()
        return (
          <div>
            <span data-testid="sdk-version">{cfg.sdk.version}</span>
            <span data-testid="sdk-label">{cfg.label}</span>
            <span data-testid="sdk-same">{String(cfg.sdk === sdk)}</span>
          </div>
        )
      })
    })

    render(
      <SdkComponent
        coverable={{
          config: {
            label: 'overridden',
          },
        }}
      />,
    )

    expect(screen.getByTestId('sdk-version').textContent).toBe('2.0')
    expect(screen.getByTestId('sdk-label').textContent).toBe('overridden')
    expect(screen.getByTestId('sdk-same').textContent).toBe('true')
  })

  // ─── 边界场景 ────────────────────────────────────

  it('同时传 ref + tableRef + raw 对象，互不干扰', () => {
    const ref = { current: 'ref-val' }
    const tableRef = { current: 'tref-val' }
    const store = markRaw({ cached: true })

    const { result } = renderHook(() =>
      useMockCoverableProps({
        ref,
        tableRef,
        store,
        title: '全量测试',
      }),
    )

    const props = result.current.getProps()
    expect(props.ref).toBe(ref)
    expect(props.tableRef).toBe(tableRef)
    expect(props.store).toBe(store)
    expect(props.title).toBe('全量测试')
  })

  it('外部修改 ref.current 后重新 getProps 可感知', () => {
    const tableRef = { current: null } as React.MutableRefObject<any>
    const { result } = renderHook(() => useMockCoverableProps({ tableRef, title: '感知测试' }))

    expect(result.current.getProps().tableRef.current).toBe(null)
    tableRef.current = { reload: () => {} }
    expect(result.current.getProps().tableRef.current).toHaveProperty('reload')
  })

  it('ref 为 null/undefined 时不注入到 getProps', () => {
    const { result } = renderHook(() => useMockCoverableProps({ title: '无 ref' }))

    const props = result.current.getProps()
    expect('ref' in props).toBe(false)
    expect('tableRef' in props).toBe(false)
    expect('formRef' in props).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════
//  新增 key 场景测试 — 验证 __cover 能否给配置添加原本不存在的字段
// ═══════════════════════════════════════════════════════

describe('useCoverable 新增配置项（config.c 场景）', () => {
  it('扁平对象：__cover 无法添加原本不存在的顶层 key', () => {
    const { result } = renderHook(() => useCoverable({ a: 1, b: 2 }))
    const coverable = result.current as any

    act(() => {
      coverable.__cover({ c: 3 })
    })

    const config = coverable.getConfig()
    expect(config).toEqual({ a: 1, b: 2 })
    expect(config.c).toBeUndefined()
  })

  it('嵌套对象：__cover 可以在子对象中添加原本不存在的 key', () => {
    const { result } = renderHook(() => useCoverable({ data: { a: 1, b: 2 } }))
    const coverable = result.current as any

    act(() => {
      coverable.__cover({ data: { c: 3 } })
    })

    const config = coverable.getConfig()
    expect(config.data).toEqual({ a: 1, b: 2, c: 3 })
    expect(config.data.c).toBe(3)
  })

  it('扁平对象：通过 coverable.component 也无法添加新的顶层 key', () => {
    const TestComp = useCoverable.component(function TestContent(props: {}, ref: any) {
      const config = useCoverable({ a: 1, b: 2 })

      return useCoverable.props({ config }).render(() => {
        const cfg = config.getConfig() as any
        return (
          <div>
            <span data-testid="a">{cfg.a}</span>
            <span data-testid="b">{cfg.b}</span>
            <span data-testid="c">{cfg.c ?? 'undefined'}</span>
          </div>
        )
      })
    })

    render(
      <TestComp
        coverable={{
          config: { c: 3 },
        }}
      />,
    )

    expect(screen.getByTestId('c').textContent).toBe('undefined')
  })

  it('嵌套对象：通过 coverable.component 可以在子对象中添加新 key', () => {
    const TestComp = useCoverable.component(function TestContent(props: {}, ref: any) {
      const config = useCoverable({ data: { a: 1, b: 2 } })

      return useCoverable.props({ config }).render(() => {
        const cfg = config.getConfig() as any
        return (
          <div>
            <span data-testid="a">{cfg.data.a}</span>
            <span data-testid="b">{cfg.data.b}</span>
            <span data-testid="c">{cfg.data.c ?? 'undefined'}</span>
          </div>
        )
      })
    })

    render(
      <TestComp
        coverable={{
          config: { data: { c: 3 } },
        }}
      />,
    )

    expect(screen.getByTestId('c').textContent).toBe('3')
  })
})
