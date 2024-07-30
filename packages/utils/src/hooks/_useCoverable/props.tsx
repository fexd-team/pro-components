import { run, set } from '@fexd/tools'

import { deepItemFilter, deepMap } from './helpers'

export default function createPropsRender<T>(coverableConfig: T) {
  return {
    render: (content) => ({
      coverableConfig,
      content,
      getDefaultCoverableConfig: () => {
        let defaultProps = {} as any

        if ((coverableConfig as any)?.__isCoverableProps) {
          defaultProps = run((coverableConfig as any)?.__getRawConfig)
        }

        deepMap(coverableConfig as any, (item, key, keyPath) => {
          if (key && item?.__isCoverableProps) {
            defaultProps = set(defaultProps, keyPath, run(item?.__getRawConfig))
          }

          return [true, item]
        })

        // return defaultProps

        const handledMark = new Map()

        return deepMap(defaultProps as any, (item, key, keyPath) => {
          // 过滤已处理的项
          if (handledMark.has(item)) {
            return [false, item]
          }

          if (key && item?.__isCoverableValue) {
            handledMark.set(item?.default, true)
            return [false, item?.default]
          }

          const canMerge = deepItemFilter(item)
          return [canMerge, item]
        })
      },
    }),
  }
}
