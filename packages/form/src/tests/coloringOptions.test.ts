import { coloringOptions, randomRGB, darkenColor, getBrightness } from '../coloringOptions'

describe('coloringOptions', () => {
  describe('数组输入', () => {
    it('为每个选项分配 tag 颜色', () => {
      const options = coloringOptions([
        { label: '待处理', value: 0 },
        { label: '处理中', value: 1 },
        { label: '已完成', value: 2 },
      ])

      expect(options).toHaveLength(3)
      options.forEach((opt: any) => {
        expect(opt).toHaveProperty('tag')
      })
    })

    it('保留已有 tag 不覆盖', () => {
      const options = coloringOptions([
        { label: '成功', value: 1, tag: 'success' },
        { label: '失败', value: 0 },
      ])

      expect(options[0].tag).toBe('success')
      expect(options[1].tag).toBeDefined()
      expect(options[1].tag).not.toBe('success')
    })

    it('前 11 个使用预设色板', () => {
      const options = coloringOptions(Array.from({ length: 11 }, (_, i) => ({ label: `选项${i}`, value: i })))
      const presetColors = [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple',
      ]

      options.forEach((opt: any) => {
        expect(presetColors).toContain(opt.tag)
      })
    })

    it('超出 11 个时使用随机 RGB 色', () => {
      const options = coloringOptions(Array.from({ length: 15 }, (_, i) => ({ label: `选项${i}`, value: i })))

      const randomStyleOptions = options.filter((opt: any) => typeof opt.tag === 'object')
      expect(randomStyleOptions.length).toBeGreaterThan(0)
      randomStyleOptions.forEach((opt: any) => {
        expect(opt.tag).toHaveProperty('style')
        expect(opt.tag.style).toHaveProperty('backgroundColor')
        expect(opt.tag.style).toHaveProperty('color')
        expect(opt.tag.style).toHaveProperty('borderColor')
      })
    })

    it('每个预设色只使用一次', () => {
      const options = coloringOptions(Array.from({ length: 11 }, (_, i) => ({ label: `选项${i}`, value: i })))
      const tags = options.map((opt: any) => opt.tag)
      const uniqueTags = new Set(tags)
      expect(uniqueTags.size).toBe(11)
    })
  })

  describe('对象输入', () => {
    it('对象格式 { value: label } 转为数组', () => {
      const options = coloringOptions({ 1: '选项A', 2: '选项B', 3: '选项C' })

      expect(options).toHaveLength(3)
      expect(options[0]).toHaveProperty('value', '1')
      expect(options[0]).toHaveProperty('label', '选项A')
      expect(options[0]).toHaveProperty('tag')
    })

    it('对象格式值为对象时 spread 合并', () => {
      const options = coloringOptions({
        active: { label: '激活', extra: 'info' },
        inactive: { label: '停用' },
      })

      expect(options[0]).toHaveProperty('value', 'active')
      expect(options[0]).toHaveProperty('label', '激活')
      expect(options[0]).toHaveProperty('extra', 'info')
    })
  })

  describe('空/异常输入', () => {
    it('空数组返回空数组', () => {
      const options = coloringOptions([])
      expect(options).toEqual([])
    })
  })
})

describe('randomRGB', () => {
  it('返回 #xxxxxx 格式的颜色字符串', () => {
    const color = randomRGB()
    expect(color).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('min 参数控制最小亮度', () => {
    for (let i = 0; i < 20; i++) {
      const color = randomRGB(200)
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      expect(r).toBeGreaterThanOrEqual(200)
      expect(g).toBeGreaterThanOrEqual(200)
      expect(b).toBeGreaterThanOrEqual(200)
    }
  })
})

describe('darkenColor', () => {
  it('将颜色变暗指定百分比', () => {
    const result = darkenColor('#ffffff', 50)
    expect(result).toBe('#7f7f7f')
  })

  it('0% 不变', () => {
    const result = darkenColor('#ff8800', 0)
    expect(result).toBe('#ff8800')
  })

  it('100% 变为黑色', () => {
    const result = darkenColor('#ff8800', 100)
    expect(result).toBe('#000000')
  })

  it('返回有效的十六进制颜色', () => {
    const result = darkenColor('#abcdef', 30)
    expect(result).toMatch(/^#[0-9a-f]{6}$/)
  })
})

describe('getBrightness', () => {
  it('白色亮度为 255', () => {
    expect(getBrightness('#ffffff')).toBeCloseTo(255, 0)
  })

  it('黑色亮度为 0', () => {
    expect(getBrightness('#000000')).toBe(0)
  })

  it('纯红亮度约 76.245', () => {
    expect(getBrightness('#ff0000')).toBeCloseTo(76.245, 1)
  })

  it('纯绿亮度约 149.685', () => {
    expect(getBrightness('#00ff00')).toBeCloseTo(149.685, 1)
  })

  it('返回 0-255 范围的数值', () => {
    const brightness = getBrightness('#8899aa')
    expect(brightness).toBeGreaterThanOrEqual(0)
    expect(brightness).toBeLessThanOrEqual(255)
  })
})
