/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

describe('type="fromNow" 编辑模式', () => {
  // 能够正确渲染
  it('date type can render correctly', async () => {
    const { container } = render(<ProField className="test-picker" type="fromNow" />)
    expect(container.querySelector('.test-picker .ant-picker .anticon-calendar')).toBeInTheDocument()
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe('')
  })

  // 初始值能正确赋值
  it('initialValue can be set correctly', async () => {
    const value = Date.now()
    const { container } = render(<ProField className="test-picker" initialValue={value} type="fromNow" />)
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(
      run(dayjs(value), 'format', 'YYYY-MM-DD HH:mm:ss'),
    )
  })

  // 能够正确选择日期
  it('can select date correctly', async () => {
    const value = Date.now()
    const selectFormat = run(dayjs(value), 'format', 'YYYY-MM-DD')
    const { container } = render(<ProField className="test-picker" type="fromNow" props={{ open: true }} />)
    const valueFormat = run(dayjs(Date.now()), 'format', 'YYYY-MM-DD HH:mm:ss')
    fireEvent.click(document.querySelector(`.ant-picker-cell[title="${selectFormat}"]`)!)
    await delay(300)
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(valueFormat)
  })

  // 能够通过上下文配置正确的语言
  it('can set locale correctly', async () => {
    const { container: container1 } = render(<ProField className="test-picker1" type="fromNow" />)
    expect(container1.querySelector('.test-picker1 .ant-picker-input > input')!.getAttribute('placeholder')).toBe(
      'Select time',
    )

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-picker2" type="fromNow" />
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
    const valueFormat = run(dayjs(value), 'format', 'YYYY~MM~DD HH:mm:ss')
    const { container } = render(
      <ProField className="test-picker" initialValue={value} type="fromNow" format="YYYY~MM~DD HH:mm:ss" />,
    )
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe(valueFormat)
  })
})

describe('type="fromNow" 浏览模式', () => {
  // 能够正确渲染
  it('date type can render correctly', async () => {
    const node = render(<ProField mode="view" type="fromNow" />)
    expect(node.getByText('--')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('initialValue can be set correctly', async () => {
    const value = Date.now()
    const valueFormat = run(dayjs(value), 'fromNow')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={value} type="fromNow" />
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
        <ProField mode="view" initialValue={valueDayjs.valueOf()} type="fromNow" />
      </div>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(valueFromNowFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(valueFormat)
    })
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const valueDayjs = dayjs('2023-04-23 00:00:00')
    const valueFormat = run(valueDayjs, 'format', 'YYYY~MM~DD HH/mm/ss')
    const valueFromNowFormat = run(valueDayjs, 'fromNow')
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={valueDayjs.valueOf()} type="fromNow" format="YYYY~MM~DD HH/mm/ss" />
      </div>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(valueFromNowFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(valueFormat)
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
          <ProField mode="view" initialValue={valueDayjs.valueOf()} type="fromNow" />
        </div>
      </ConfigProvider>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(valueFromNowFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(valueFormat)
    })

    expect(/前$/.test(node.getByText(valueFromNowFormat)!.textContent as string)).toBeTruthy()
  })
})