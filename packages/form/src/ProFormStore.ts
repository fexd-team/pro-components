// @ts-nocheck
import { FormStore } from 'rc-field-form/es/useForm'
import { InternalHooks, NamePath } from 'rc-field-form/es/interface'
import { HOOK_MARK } from 'rc-field-form/es/FieldContext'
import { isFunction } from '@fexd/tools'

// // 为确保 jest 正常执行，调整该类的导出方式
// const { FormStore } = require('rc-field-form/lib/useForm')

export default class ProFormStore extends FormStore {
  constructor(props) {
    super(props)

    if (isFunction(this.setFieldValue)) {
      const raw_setFieldValue = this.setFieldValue.bind(this)
      this.setFieldValue = (name: NamePath, value: any) => {
        const prevStore = this.store
        const rawResult = raw_setFieldValue(name, value)

        // --- 修复 setFieldValue 不触发 dependencies 或 shouldUpdate 更新的问题
        // setTimeout(() => {
        this?.triggerDependenciesUpdate?.(prevStore, [name])
        // this.notifyWatch([name])
        // })

        return rawResult
      }
    }

    if (isFunction(this.resetFields)) {
      const raw_resetFields = this.resetFields.bind(this)
      this.resetFields = (nameList?: NamePath[]) => {
        const prevStore = this.store
        const rawResult = raw_resetFields(nameList)

        // --- 修复 resetFields 不触发 dependencies 或 shouldUpdate 更新的问题
        // --- resetFields 中需要 nextTick 触发 deps 订阅更新
        if ((nameList?.length ?? 0) > 0) {
          setTimeout(() => {
            this?.triggerDependenciesUpdate?.(prevStore, nameList)
            // this.notifyWatch(nameList)
          })
        }

        return rawResult
      }
    }

    // if (isFunction(this.updateStore)) {
    //   const raw_updateStore = this.updateStore.bind(this)
    //   this.updateStore = (...args) => {
    //     const prevStore = this.store
    //     console.log('updateStore', ...args)
    //     const rawResult = raw_updateStore(...args)

    //     return rawResult
    //   }
    // }
  }

  private getInternalHooks = (key: string): InternalHooks | null => {
    if (key === HOOK_MARK) {
      this.formHooked = true
    }
    return this
  }
}
