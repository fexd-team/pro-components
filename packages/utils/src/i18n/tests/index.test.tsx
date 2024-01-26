import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { delay } from '@fexd/tools'

import { globalI18n, numberTranslate, jsxTranslate, I18n, reactI18nshell } from '../'

describe('utils.reactI18nshell', () => {
  const i18n = new I18n(globalI18n.config)
  const { FormattedMessage, useI18n, useTranslation, withI18n } = reactI18nshell(i18n)

  test('withI18n 正常工作', async () => {
    function Comp({ t }: any) {
      return t('utils.confirm')
    }

    Comp.test = () => null
    const FallbackWithI18nComp: any = withI18n({ fallback: 'WithI18nComp Loading...' })(Comp)
    const WithI18nComp: any = withI18n()(Comp)
    expect(WithI18nComp.test).toBe(Comp.test)

    const fallbackNode = render(<FallbackWithI18nComp />)
    expect(screen.getByText(/WithI18nComp Loading\.\.\./i)).toBeInTheDocument()
    fallbackNode.unmount()

    const node = render(<WithI18nComp />)
    await act(async () => {
      await I18n.applyLanguage('ms-MY')
    })
    expect(screen.getByText(/Sahkan/i)).toBeInTheDocument()
    await act(async () => {
      await I18n.applyLanguage('zh-CN')
    })
    expect(screen.getByText(/确认/i)).toBeInTheDocument()
    node.unmount()
  })

  test('useTranslation 正常工作', async () => {
    expect(useTranslation).toBe(useI18n)
    function Comp() {
      const { t, jsxT } = useTranslation()

      // 此处仅提升覆盖率
      jsxT('utils.confirm@jsx')

      return t('utils.confirm')
    }

    const node = render(<Comp />)
    await act(async () => {
      await I18n.applyLanguage('ms-MY')
    })

    expect(screen.getByText(/Sahkan/i)).toBeInTheDocument()
    await act(async () => {
      await I18n.applyLanguage('zh-CN')
    })

    expect(screen.getByText(/确认/i)).toBeInTheDocument()
    node.unmount()
  })

  test('FormattedMessage 正常工作', async () => {
    const node = render(<FormattedMessage value="utils.confirm" />)

    await act(async () => {
      await I18n.applyLanguage('ms-MY')
    })
    expect(screen.getByText(/Sahkan/i)).toBeInTheDocument()

    await act(async () => {
      await I18n.applyLanguage('zh-CN')
    })
    expect(screen.getByText(/确认/i)).toBeInTheDocument()
    node.unmount()
  })
})

describe('utils.i18n', () => {
  test('numberTranslate 普通数字正常工作', () => {
    expect(numberTranslate('1000000.0001')).toBe('1,000,000.0001')
    expect(numberTranslate('1000000.0001', { locale: 'id' })).toBe('1.000.000,0001')
  })
  test('numberTranslate 大数字正常工作', () => {
    expect(numberTranslate('12345678987654321.0001')).toBe('12,345,678,987,654,321.0001')
    expect(numberTranslate('12345678987654321.0001', { locale: 'id' })).toBe('12.345.678.987.654.321,0001')
    expect(numberTranslate('9007199254740995.0001')).toBe('9,007,199,254,740,995.0001')
    expect(numberTranslate('9007199254740995.0001', { locale: 'id' })).toBe('9.007.199.254.740.995,0001')
  })
  test('numberTranslate 非数字正常工作', () => {
    expect(numberTranslate('abcd')).toBe('abcd')
  })

  test('t 函数翻译普通数字正常工作', () => {
    expect(globalI18n.t('1000000.0001@number')).toBe('1,000,000.0001')
    expect(globalI18n.t('1000000.0001@number', { locale: 'id' })).toBe('1.000.000,0001')
  })
  test('t 函数翻译大数字正常工作', () => {
    expect(globalI18n.t('12345678987654321.0001@number')).toBe('12,345,678,987,654,321.0001')
    expect(globalI18n.t('12345678987654321.0001@number', { locale: 'id' })).toBe('12.345.678.987.654.321,0001')
    expect(globalI18n.t('9007199254740995.0001@number')).toBe('9,007,199,254,740,995.0001')
    expect(globalI18n.t('9007199254740995.0001@number', { locale: 'id' })).toBe('9.007.199.254.740.995,0001')
  })

  test('jsxTranslate 正常工作', () => {
    // render()
    expect(jsxTranslate(undefined)).toBe(null)
    const node = render(
      <>{jsxTranslate('Hello, {{name}}', { name: <div className="test-jsxTranslate-node1">test</div> })}</>,
    )
    expect(document.querySelector('.test-jsxTranslate-node1')).toBeInTheDocument()
    node.unmount()
  })

  test('t 函数翻译 jsx 正常工作', async () => {
    globalI18n.applyConfig({
      types: {
        jsx: {
          resources: {
            en_US: {
              '你好，{{name}}': 'Hello, {{name}}',
            },
          },
        },
      },
    })
    await I18n.applyLanguage('en_US')
    const node = render(
      <>{globalI18n.t('你好，{{name}}@jsx', { name: <div className="test-jsxTranslate-node2">test</div> })}</>,
    )
    expect(document.querySelector('.test-jsxTranslate-node2')).toBeInTheDocument()
    node.unmount()
  })
})
