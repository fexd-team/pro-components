import { shuffle } from 'lodash'

// 对选项染色
export function coloringOptions<T extends any[]>(options: T): T {
  const presets = shuffle([
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
  ])

  return (options as any).map((opt: any) => {
    const randomColor = randomRGB(220)
    return {
      ...opt,
      tag: opt?.tag ??
        presets.pop() ?? {
          style: {
            backgroundColor: randomColor,
            color: darkenColor(randomColor, 60),
            borderColor: darkenColor(randomColor, (20 * 255) / getBrightness(randomColor)),
          },
        },
    } as any
  }) as any as T
}
export default coloringOptions

// 生成随机色值 #xxxxxx
export function randomRGB(min = 0) {
  // 生成一个随机色值
  function getValue() {
    return Math.floor(Math.random() * (255 - min) + min)
  }

  const r = getValue()
  const g = getValue()
  const b = getValue()

  // 将颜色分量转换为十六进制，并确保是两位数
  const rHex = r.toString(16).padStart(2, '0')
  const gHex = g.toString(16).padStart(2, '0')
  const bHex = b.toString(16).padStart(2, '0')

  // 拼接成#xxxxxx格式的字符串
  return `#${rHex}${gHex}${bHex}`
}

// 将颜色变暗
export function darkenColor(hexColor, percentage) {
  // 将十六进制颜色转换为RGB
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  // 将RGB转换为十六进制颜色
  function rgbToHex(r, g, b) {
    const rHex = r.toString(16).padStart(2, '0')
    const gHex = g.toString(16).padStart(2, '0')
    const bHex = b.toString(16).padStart(2, '0')
    return `#${rHex}${gHex}${bHex}`
  }

  // 计算加深后的RGB分量
  function darkenValue(value, percentage) {
    return Math.max(0, Math.min(255, Math.floor(value * (1 - percentage / 100))))
  }

  // 解析输入颜色
  let { r, g, b } = hexToRgb(hexColor)

  // 加深每个颜色分量
  r = darkenValue(r, percentage)
  g = darkenValue(g, percentage)
  b = darkenValue(b, percentage)

  // 转换回十六进制格式
  return rgbToHex(r, g, b)
}

// 获取颜色的明亮程度 0 ~ 255
export function getBrightness(hexColor) {
  // 将十六进制颜色转换为RGB
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  // 计算感知亮度
  function calculateBrightness(r, g, b) {
    // 使用感知亮度公式
    return 0.299 * r + 0.587 * g + 0.114 * b
  }

  // 解析输入颜色
  const { r, g, b } = hexToRgb(hexColor)

  // 计算亮度
  return calculateBrightness(r, g, b)
}
