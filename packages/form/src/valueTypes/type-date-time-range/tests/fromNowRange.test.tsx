/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

describe('type="fromNowRange" 编辑模式', () => {
  // date 类型能够正确的渲染
  it('date type can render correctly', async () => {
    const { container } = render(<ProField className="test-picker" type="fromNowRange" />)
    expect(container.querySelector('.test-picker .ant-picker .ant-picker-separator')).toBeInTheDocument()
    expect(container.querySelector('.test-picker .ant-picker .anticon-calendar')).toBeInTheDocument()
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe('')
  })

  // 初始值能正确赋值
  it('initialValue can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'month')
    const { container } = render(
      <ProField
        className="test-picker"
        initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
        type="fromNowRange"
      />,
    )
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[0]!.getAttribute('value')).toBe(
      startDayjsValue.format('YYYY-MM-DD HH:mm:ss'),
    )
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[1]!.getAttribute('value')).toBe(
      endDayjsValue.format('YYYY-MM-DD HH:mm:ss'),
    )
  })

  // 能够正确选择日期
  it('can select date correctly', async () => {
    const { container } = render(<ProField className="test-picker" type="dateTimeRange" props={{ open: true }} />)

    const startDayjsValue = dayjs().set('date', 1)
    const startDayjsValueFormat = startDayjsValue.format('YYYY-MM-DD HH:mm:ss')
    const startDayjsSelectorFormat = startDayjsValue.format('YYYY-MM-DD')
    fireEvent.click(document.querySelector(`.ant-picker-cell[title="${startDayjsSelectorFormat}"]`)!)
    await delay(100)
    fireEvent.click(document.querySelector('.ant-picker-ok .ant-btn-primary')!)
    await delay(200)

    const inputNodes = container.querySelectorAll('.test-picker .ant-picker-input > input')
    expect(dayjs(inputNodes?.[0]!.getAttribute('value')).diff(dayjs(startDayjsValueFormat), 'second')).toBeLessThan(2)

    await delay(300)

    const endDayjsValue = dayjs().set('date', 10)

    const endDayjsValueFormat = endDayjsValue.format('YYYY-MM-DD HH:mm:ss')
    const endDayjsSelectorFormat = endDayjsValue.format('YYYY-MM-DD')

    fireEvent.click(document.querySelector(`.ant-picker-cell[title="${endDayjsSelectorFormat}"]`)!)
    fireEvent.click(document.querySelector('.ant-picker-ok .ant-btn-primary')!)
    await delay(300)

    expect(dayjs(inputNodes?.[1]!.getAttribute('value')).diff(dayjs(endDayjsValueFormat), 'second')).toBeLessThan(2)
  })

  // 能够通过上下文配置正确的语言
  it('can set locale correctly', async () => {
    const { container: container1 } = render(<ProField className="test-picker1" type="fromNowRange" />)
    expect(
      container1.querySelectorAll('.test-picker1 .ant-picker-input > input')?.[0]!.getAttribute('placeholder'),
    ).toBe('Start time')
    expect(
      container1.querySelectorAll('.test-picker1 .ant-picker-input > input')?.[1]!.getAttribute('placeholder'),
    ).toBe('End time')

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-picker2" type="fromNowRange" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(
      container2.querySelectorAll('.test-picker2 .ant-picker-input > input')?.[0]!.getAttribute('placeholder'),
    ).toBe('开始时间')
    expect(
      container2.querySelectorAll('.test-picker2 .ant-picker-input > input')?.[1]!.getAttribute('placeholder'),
    ).toBe('结束时间')
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'month')
    const startDayjsValueFormat = startDayjsValue.format('YYYY~MM~DD HH/mm/ss')
    const endDayjsValueFormat = endDayjsValue.format('YYYY~MM~DD HH/mm/ss')
    const { container } = render(
      <ProField
        className="test-picker"
        initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
        type="fromNowRange"
        format="YYYY~MM~DD HH/mm/ss"
      />,
    )
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[0]!.getAttribute('value')).toBe(
      startDayjsValueFormat,
    )
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[1]!.getAttribute('value')).toBe(
      endDayjsValueFormat,
    )
  })
})

describe('type="fromNowRange" 浏览模式', () => {
  // date 类型能够正确的渲染
  it('date type can render correctly', async () => {
    const node = render(<ProField mode="view" type="fromNowRange" />)
    expect(node.getByText('--')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('initialValue can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'month')
    const startDayjsValueFormat = startDayjsValue.fromNow()
    const endDayjsValueFormat = endDayjsValue.fromNow()
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]} type="fromNowRange" />
      </div>,
    )
    await delay(100)
    expect(node.getByText(startDayjsValueFormat)).toBeInTheDocument()
    expect(node.getByText(endDayjsValueFormat)).toBeInTheDocument()
  })

  // 鼠标移入会显示 tooltip
  it('tooltip will show when mouse enter', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'month')
    const startDayjsValueFormat = startDayjsValue.format('YYYY-MM-DD HH:mm:ss')
    const endDayjsValueFormat = endDayjsValue.format('YYYY-MM-DD HH:mm:ss')
    const startDayjsValueFormatFromNow = startDayjsValue.fromNow()
    const endDayjsValueFormatFromNow = endDayjsValue.fromNow()
    const node = render(
      <div className="test-picker">
        <ProField mode="view" initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]} type="fromNowRange" />
      </div>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(startDayjsValueFormatFromNow))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(startDayjsValueFormat)
    })
    fireEvent.mouseLeave(node.getByText(startDayjsValueFormatFromNow))
    await delay(100)
    fireEvent.mouseEnter(node.getByText(endDayjsValueFormatFromNow))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(endDayjsValueFormat)
    })
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'month')
    const startDayjsValueFormat = startDayjsValue.format('YYYY~MM~DD HH/mm/ss')
    const endDayjsValueFormat = endDayjsValue.format('YYYY~MM~DD HH/mm/ss')
    const startDayjsValueFormatFromNow = startDayjsValue.fromNow()
    const endDayjsValueFormatFromNow = endDayjsValue.fromNow()
    const node = render(
      <div className="test-picker">
        <ProField
          mode="view"
          initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
          type="fromNowRange"
          format="YYYY~MM~DD HH/mm/ss"
        />
      </div>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(startDayjsValueFormatFromNow))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(startDayjsValueFormat)
    })
    fireEvent.mouseLeave(node.getByText(startDayjsValueFormatFromNow))
    await delay(100)
    fireEvent.mouseEnter(node.getByText(endDayjsValueFormatFromNow))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(endDayjsValueFormat)
    })
  })

  // tooltip 会受上下文语言控制
  it('tooltip will be affected by localeKey', async () => {
    const startDayjsValue = dayjs().locale('zh-cn')
    const endDayjsValue = dayjs().locale('zh-cn').add(1, 'month')
    const startDayjsValueFormat = startDayjsValue.format('YYYY-MM-DD HH:mm:ss')
    const endDayjsValueFormat = endDayjsValue.format('YYYY-MM-DD HH:mm:ss')
    const startDayjsValueFormatFromNow = startDayjsValue.fromNow()
    const endDayjsValueFormatFromNow = endDayjsValue.fromNow()
    const node = render(
      <ConfigProvider localeKey="zh_CN">
        <div className="test-picker">
          <ProField
            mode="view"
            initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
            type="fromNowRange"
          />
        </div>
      </ConfigProvider>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(startDayjsValueFormatFromNow))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(startDayjsValueFormat)
    })
    expect(/前$/.test(node.getByText(startDayjsValueFormatFromNow)!.textContent as string)).toBeTruthy()
    fireEvent.mouseLeave(node.getByText(startDayjsValueFormatFromNow))
    await delay(100)
    fireEvent.mouseEnter(node.getByText(endDayjsValueFormatFromNow))

    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(endDayjsValueFormat)
    })
  })
})
