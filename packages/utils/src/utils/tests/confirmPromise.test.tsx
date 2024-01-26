import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Modal, ModalFuncProps } from 'antd'
import { delay, run, random, classnames } from '@fexd/tools'

import confirmPromise from '../confirmPromise'

async function testConfirmPromise(confirm = true, props: ModalFuncProps = {}) {
  const randomId = random(0, 99999)
  const className = `test-confirmPromise-${randomId}`
  const [result] = await Promise.all([
    confirmPromise('test', {
      ...props,
      className: classnames(className, props?.className),
      // 为节约用例耗时，不开启动画
      transitionName: '',
      maskTransitionName: '',
    }),
    run(async () => {
      await delay(60)
      fireEvent.click(
        document.querySelector(
          `.${className} .ant-modal-confirm-btns .${confirm ? 'ant-btn-primary' : 'ant-btn-default'}`,
        )!,
      )
    }),
  ])

  return result
}

describe('confirmPromise', () => {
  test('正常工作', async () => {
    await act(async () => {
      const [ok1, cancel1] = await Promise.all([testConfirmPromise(true), testConfirmPromise(false)])

      expect(ok1).toBe(true)
      expect(cancel1).toBe(false)

      const [ok2, cancel2] = await Promise.all([
        testConfirmPromise(true, {
          okButtonProps: {},
          onOk: async () => true,
        }),
        testConfirmPromise(false, {
          cancelButtonProps: {},
          onCancel: async () => true,
        }),
      ])

      expect(ok2).toBe(true)
      expect(cancel2).toBe(false)
    })
  })

  // TODO: onOk 与 onCancel 方法的异步互斥，如：onOk 异步进行时，onCancel 需要禁用

  test('覆盖率补全', async () => {
    await act(async () => {
      confirmPromise({
        content: 'test',
        transitionName: '',
      })
      const rawConsoleError = console.error.bind(console)
      console.error = () => {}
      try {
        await Promise.race([
          testConfirmPromise(true, { onOk: async () => false }),
          testConfirmPromise(false, { onCancel: async () => false }),

          testConfirmPromise(true, {
            onOk: async () => {
              throw new Error('test')
            },
          }),
          testConfirmPromise(false, {
            onCancel: async () => {
              throw new Error('test')
            },
          }),
          delay(500),
        ])
      } catch (err) {}
      console.error = rawConsoleError
    })
  })
})
