/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider, dayjsTZ } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

describe('type="dateTime" 编辑模式', () => {
  // dateTime 类型能够正确的渲染
  it('dateTime type can render correctly', async () => {
    const { container } = render(<ProField className="test-picker" type="dateTime" />)
    expect(container.querySelector('.test-picker .ant-picker .anticon-calendar')).toBeInTheDocument()
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe('')
  })

  // 初始值能正确赋值
  it('initialValue can be set correctly', async () => {
    const value = dayjs('2025-01-16 11:43:00').valueOf()
    const { container } = render(<ProField className="test-picker" initialValue={value} type="dateTime" />)
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(
      run(dayjs(value), 'format', 'YYYY-MM-DD HH:mm:ss'),
    )
  })

  // 能够正确选择日期
  it('can select date correctly', async () => {
    const testDate = dayjs('2025-01-16 11:43:00') // 使用固定的测试日期
    const { container } = render(<ProField className="test-picker" type="dateTime" props={{ open: true }} />)

    // 等待日期选择器打开
    await delay(100)

    // 点击日期
    const dateCell = document.querySelector(`.ant-picker-cell[title="${testDate.format('YYYY-MM-DD')}"]`)
    expect(dateCell).toBeInTheDocument()
    fireEvent.click(dateCell!)
    await delay(100)

    // 点击确定按钮
    const okButton = document.querySelector('.ant-picker-ok button')
    expect(okButton).toBeInTheDocument()
    fireEvent.click(okButton!)
    await delay(100)

    // 验证结果
    // 由于时间部分可能会使用当前时间，我们只验证日期部分
    const input = container.querySelector('.test-picker .ant-picker-input > input')
    expect(input).toBeInTheDocument()
    const inputValue = input!.getAttribute('value')
    expect(inputValue?.startsWith(testDate.format('YYYY-MM-DD'))).toBe(true)
  })

  // 能够通过上下文配置正确的语言
  it('can set locale correctly', async () => {
    const { container: container1 } = render(<ProField className="test-picker1" type="dateTime" />)
    expect(container1.querySelector('.test-picker1 .ant-picker-input > input')!.getAttribute('placeholder')).toBe(
      'Select date',
    )

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-picker2" type="dateTime" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(container2.querySelector('.test-picker2 .ant-picker-input > input')!.getAttribute('placeholder')).toBe(
      '选择日期',
    )
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const value = dayjs('2025-01-16 11:43:00').valueOf()
    const valueFormat = run(dayjs(value), 'format', 'YYYY~MM~DD HH/mm/ss')
    const { container } = render(
      <ProField className="test-picker" initialValue={value} type="dateTime" format="YYYY~MM~DD HH/mm/ss" />,
    )
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(valueFormat)
  })

  // value 能够正确随时区变化
  it('value can be set correctly with timezone', async () => {
    const value = dayjs('2025-01-16 11:43:00').valueOf()
    dayjsTZ.setDefault('Etc/GMT-7')
    await delay(100)
    const valueFormat = run(dayjs(value), 'format', 'YYYY-MM-DD HH:mm:ss')
    const valueTZFormat = run(dayjsTZ(value), 'format', 'YYYY-MM-DD HH:mm:ss')
    const { container } = render(<ProField className="test-picker" initialValue={value} type="dateTime" />)
    // expect(valueFormat).not.toEqual(valueTZFormat)
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(valueTZFormat)
    dayjsTZ.setDefault()
  })
})

describe('type="dateTime" 浏览模式', () => {
  // 能够正确渲染
  it('date type can render correctly', async () => {
    const node = render(<ProField mode="view" type="dateTime" />)
    expect(node.getByText('--')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('initialValue can be set correctly', async () => {
    const value = dayjs('2025-01-16 11:43:00').valueOf()
    const valueFormat = run(dayjs(value), 'format', 'YYYY-MM-DD HH:mm:ss')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={value} type="dateTime" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(valueFormat)).toBeInTheDocument()
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const value = dayjs('2025-01-16 11:43:00').valueOf()
    const valueFormat = run(dayjs(value), 'format', 'YYYY~MM~DD HH/mm/ss')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={value} type="dateTime" format="YYYY~MM~DD HH/mm/ss" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(valueFormat)).toBeInTheDocument()
  })

  // 鼠标移入会显示 tooltip
  it('tooltip will show when mouse enter', async () => {
    const valueDayjs = dayjs('2023-04-23 00:00:00')
    const valueFormat = run(valueDayjs, 'format', 'YYYY-MM-DD HH:mm:ss')
    const valueFromNowFormat = run(valueDayjs, 'fromNow')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={valueDayjs.valueOf()} type="dateTime" />
      </div>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(valueFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(valueFromNowFormat)
    })
  })

  // tooltip 会受上下文语言控制
  it('tooltip will be affected by localeKey', async () => {
    const valueDayjs = dayjs('2023-04-23 00:00:00').locale('zh-cn')
    const valueFormat = run(valueDayjs, 'format', 'YYYY-MM-DD HH:mm:ss')
    const valueFromNowFormat = run(valueDayjs, 'fromNow')
    const node = render(
      <ConfigProvider localeKey="zh_CN">
        <div className="test-picker">
          <ProField mode="view" initialValue={valueDayjs.valueOf()} type="dateTime" />
        </div>
      </ConfigProvider>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(valueFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(valueFromNowFormat)
    })

    expect(/前$/.test(document.querySelector('.ant-tooltip-inner')!.textContent as string)).toBeTruthy()
  })

  it('value can be set correctly with timezone', async () => {
    const value = dayjs('2025-01-16 11:43:00').valueOf()

    dayjsTZ.setDefault('Etc/GMT-7')
    await delay(100)
    const valueFormat = run(dayjs(value), 'format', 'YYYY-MM-DD HH:mm:ss')
    const valueTZFormat = run(dayjsTZ(value), 'format', 'YYYY-MM-DD HH:mm:ss')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={value} type="dateTime" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(valueTZFormat)).toBeInTheDocument()
    dayjsTZ.setDefault()
  })
})
