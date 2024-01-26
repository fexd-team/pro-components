/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider, dayjsTZ } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

describe('type="time" 编辑模式', () => {
  // dateTime 类型能够正确的渲染
  it('dateTime type can render correctly', async () => {
    const { container } = render(<ProField className="test-picker" type="time" />)
    expect(container.querySelector('.test-picker .ant-picker .anticon-clock-circle')).toBeInTheDocument()
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe('')
  })

  // 初始值能正确赋值
  it('initialValue can be set correctly', async () => {
    const value = Date.now()
    const { container } = render(<ProField className="test-picker" initialValue={value} type="time" />)
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(
      run(dayjs(value), 'format', 'HH:mm:ss'),
    )
  })

  // 能够正确选择日期
  it('can select date correctly', async () => {
    const { container } = render(<ProField className="test-picker" type="time" props={{ open: true }} />)
    const value = Date.now()
    fireEvent.click(document.querySelector(`.ant-picker-now-btn`)!)
    const valueFormat = run(dayjs(value), 'format', 'HH:mm:ss')
    await delay(100)
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(valueFormat)
  })

  // 能够通过上下文配置正确的语言
  it('can set locale correctly', async () => {
    const { container: container1 } = render(<ProField className="test-picker1" type="time" />)
    expect(container1.querySelector('.test-picker1 .ant-picker-input > input')!.getAttribute('placeholder')).toBe(
      'Select time',
    )

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-picker2" type="time" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(container2.querySelector('.test-picker2 .ant-picker-input > input')!.getAttribute('placeholder')).toBe(
      '选择时间',
    )
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const value = Date.now()
    const valueFormat = run(dayjs(value), 'format', 'YYYY~MM~DD HH/mm/ss')
    const { container } = render(
      <ProField className="test-picker" initialValue={value} type="time" format="YYYY~MM~DD HH/mm/ss" />,
    )
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(valueFormat)
  })

  // value 能够正确随时区变化
  it('value can be set correctly with timezone', async () => {
    const value = Date.now()
    dayjsTZ.setDefault('Etc/GMT-7')
    await delay(100)
    const valueFormat = run(dayjs(value), 'format', 'HH:mm:ss')
    const valueTZFormat = run(dayjsTZ(value), 'format', 'HH:mm:ss')
    const { container } = render(<ProField className="test-picker" initialValue={value} type="time" />)
    // expect(valueFormat).not.toEqual(valueTZFormat)
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(valueTZFormat)
    dayjsTZ.setDefault()
  })
})

describe('type="time" 浏览模式', () => {
  // 能够正确渲染
  it('date type can render correctly', async () => {
    const node = render(<ProField mode="view" type="time" />)
    expect(node.getByText('--')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('initialValue can be set correctly', async () => {
    const value = Date.now()
    const valueFormat = run(dayjs(value), 'format', 'HH:mm:ss')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={value} type="time" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(valueFormat)).toBeInTheDocument()
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const value = Date.now()
    const valueFormat = run(dayjs(value), 'format', 'YYYY~MM~DD HH/mm/ss')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={value} type="time" format="YYYY~MM~DD HH/mm/ss" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(valueFormat)).toBeInTheDocument()
  })

  // 鼠标移入会显示 tooltip
  it('tooltip will show when mouse enter', async () => {
    const valueDayjs = dayjs('2023-04-23 00:00:00')
    const valueFormat = run(valueDayjs, 'format', 'HH:mm:ss')
    const valueFromNowFormat = run(valueDayjs, 'fromNow')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={valueDayjs.valueOf()} type="time" />
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
    const valueFormat = run(valueDayjs, 'format', 'HH:mm:ss')
    const valueFromNowFormat = run(valueDayjs, 'fromNow')
    const node = render(
      <ConfigProvider localeKey="zh_CN">
        <div className="test-picker">
          <ProField mode="view" initialValue={valueDayjs.valueOf()} type="time" />
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
    const value = Date.now()

    dayjsTZ.setDefault('Etc/GMT-7')
    await delay(100)
    const valueFormat = run(dayjs(value), 'format', 'HH:mm:ss')
    const valueTZFormat = run(dayjsTZ(value), 'format', 'HH:mm:ss')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={value} type="time" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(valueTZFormat)).toBeInTheDocument()
    dayjsTZ.setDefault()
  })
})
