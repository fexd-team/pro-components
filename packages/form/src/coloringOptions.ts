import { isObject, randomRGB, darkenColor, getBrightness } from '@fexd/tools'

export { randomRGB, darkenColor, getBrightness } from '@fexd/tools'

function shuffle<T>(arr: T[]): T[] {
  const result = arr.slice()
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const ANTD_PRESETS = [
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

const EXTENDED_PRESETS = [
  { backgroundColor: '#fff0f6', color: '#c41d7f', borderColor: '#ffadd2' },
  { backgroundColor: '#f9f0ff', color: '#531dab', borderColor: '#d3adf7' },
  { backgroundColor: '#e6fffb', color: '#08979c', borderColor: '#87e8de' },
  { backgroundColor: '#fcffe6', color: '#7cb305', borderColor: '#eaff8f' },
  { backgroundColor: '#fff7e6', color: '#d46b08', borderColor: '#ffd591' },
  { backgroundColor: '#f0f5ff', color: '#2f54eb', borderColor: '#adc6ff' },
  { backgroundColor: '#fff1f0', color: '#cf1322', borderColor: '#ffa39e' },
  { backgroundColor: '#f6ffed', color: '#389e0d', borderColor: '#b7eb8f' },
  { backgroundColor: '#e6f7ff', color: '#096dd9', borderColor: '#91d5ff' },
  { backgroundColor: '#fffbe6', color: '#d4b106', borderColor: '#ffe58f' },
  { backgroundColor: '#fff2e8', color: '#d4380d', borderColor: '#ffbb96' },
].map((style) => ({ style }))

export function coloringOptions<T extends any>(rawOptions: T): T {
  const presets: any[] = shuffle([...ANTD_PRESETS, ...EXTENDED_PRESETS])

  let options: any = rawOptions

  if (isObject(options)) {
    options = Object.entries(options)?.map(([key, value]: any) => {
      if (isObject(value)) {
        return {
          value: key,
          ...value,
        }
      }

      return {
        value: key,
        label: value,
      }
    })
  }

  return (
    (options as any).map?.((opt: any) => {
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
    }) ?? (options as any as T)
  )
}
export default coloringOptions
