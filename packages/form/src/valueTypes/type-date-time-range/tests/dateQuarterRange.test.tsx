/* eslint-disable prefer-const */
import React from 'react'
import { fireEvent, render, waitFor, act, screen } from '@testing-library/react'
import { Random } from 'mockjs'
// import { message } from 'antd'
import { delay, sample, run, random } from '@fexd/tools'
import dayjs from 'dayjs'
import { ConfigProvider } from '@fexd/pro-components'

import ProField from '../../../components/ProField'

describe('type="dateQuarterRange" 编辑模式', () => {
  // date 类型能够正确的渲染
  it('date type can render correctly', async () => {
    const { container } = render(<ProField className="test-picker" type="dateQuarterRange" />)
    expect(container.querySelector('.test-picker .ant-picker .ant-picker-separator')).toBeInTheDocument()
    expect(container.querySelector('.test-picker .ant-picker .anticon-calendar')).toBeInTheDocument()
    expect(container.querySelector('.test-picker .ant-picker-input > input')!.getAttribute('value')).toBe('')
  })

  // 初始值能正确赋值
  it('initialValue can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'year')
    const { container } = render(
      <ProField
        className="test-picker"
        initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
        type="dateQuarterRange"
      />,
    )
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[0]!.getAttribute('value')).toBe(
      startDayjsValue.format('YYYY-[Q]Q'),
    )
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[1]!.getAttribute('value')).toBe(
      endDayjsValue.format('YYYY-[Q]Q'),
    )
  })

  // 能够正确选择日期
  it('can select date correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'year')
    const { container } = render(<ProField className="test-picker" type="dateQuarterRange" props={{ open: true }} />)
    const startDayjsValueFormat = startDayjsValue.format('YYYY-[Q]Q')
    fireEvent.click(document.querySelector(`.ant-picker-cell[title="${startDayjsValueFormat}"]`)!)
    const endDayjsValueFormat = endDayjsValue.format('YYYY-[Q]Q')
    fireEvent.click(document.querySelector(`.ant-picker-cell[title="${endDayjsValueFormat}"]`)!)
    await delay(300)
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[0]!.getAttribute('value')).toBe(
      startDayjsValueFormat,
    )
    expect(container.querySelectorAll('.test-picker .ant-picker-input > input')?.[1]!.getAttribute('value')).toBe(
      endDayjsValueFormat,
    )
  })

  // 能够通过上下文配置正确的语言
  it('can set locale correctly', async () => {
    const { container: container1 } = render(<ProField className="test-picker1" type="dateQuarterRange" />)
    expect(
      container1.querySelectorAll('.test-picker1 .ant-picker-input > input')?.[0]!.getAttribute('placeholder'),
    ).toBe('Start quarter')
    expect(
      container1.querySelectorAll('.test-picker1 .ant-picker-input > input')?.[1]!.getAttribute('placeholder'),
    ).toBe('End quarter')

    const { container: container2 } = render(
      <ConfigProvider localeKey="zh_CN">
        <ProField className="test-picker2" type="dateQuarterRange" />
      </ConfigProvider>,
    )
    await delay(100)
    expect(
      container2.querySelectorAll('.test-picker2 .ant-picker-input > input')?.[0]!.getAttribute('placeholder'),
    ).toBe('开始季度')
    expect(
      container2.querySelectorAll('.test-picker2 .ant-picker-input > input')?.[1]!.getAttribute('placeholder'),
    ).toBe('结束季度')
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'year')
    const startDayjsValueFormat = startDayjsValue.format('YYYY~[Q]Q')
    const endDayjsValueFormat = endDayjsValue.format('YYYY~[Q]Q')
    const { container } = render(
      <ProField
        className="test-picker"
        initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
        type="dateQuarterRange"
        format="YYYY~[Q]Q"
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

describe('type="dateQuarterRange" 浏览模式', () => {
  // date 类型能够正确的渲染
  it('date type can render correctly', async () => {
    const node = render(<ProField mode="view" type="dateQuarterRange" />)
    expect(node.getByText('--')).toBeInTheDocument()
  })

  // 初始值能正确显示
  it('initialValue can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'year')
    const startDayjsValueFormat = startDayjsValue.format('YYYY-[Q]Q')
    const endDayjsValueFormat = endDayjsValue.format('YYYY-[Q]Q')
    const node = render(
      <div className="test-picker">
        <ProField
          mode="view"
          initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
          type="dateQuarterRange"
        />
      </div>,
    )
    await delay(100)
    expect(node.getByText(startDayjsValueFormat)).toBeInTheDocument()
    expect(node.getByText(endDayjsValueFormat)).toBeInTheDocument()
  })

  // format 属性能够正确的渲染
  it('format can be set correctly', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'year')
    const startDayjsValueFormat = startDayjsValue.format('YYYY~[Q]Q')
    const endDayjsValueFormat = endDayjsValue.format('YYYY~[Q]Q')
    const node = render(
      <div className="test-picker">
        <ProField
          mode="view"
          initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
          type="dateQuarterRange"
          format="YYYY~[Q]Q"
        />
      </div>,
    )
    await delay(100)
    expect(node.getByText(startDayjsValueFormat)).toBeInTheDocument()
    expect(node.getByText(endDayjsValueFormat)).toBeInTheDocument()
  })

  // 鼠标移入会显示 tooltip
  it('tooltip will show when mouse enter', async () => {
    const startDayjsValue = dayjs()
    const endDayjsValue = dayjs().add(1, 'year')
    const startDayjsValueFormat = startDayjsValue.format('YYYY-[Q]Q')
    const endDayjsValueFormat = endDayjsValue.format('YYYY-[Q]Q')
    const startDayjsValueFormatFromNow = startDayjsValue.fromNow()
    const endDayjsValueFormatFromNow = endDayjsValue.fromNow()
    const node = render(
      <div className="test-picker">
        <ProField
          mode="view"
          initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
          type="dateQuarterRange"
        />
      </div>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(startDayjsValueFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(startDayjsValueFormatFromNow)
    })
    fireEvent.mouseLeave(node.getByText(startDayjsValueFormat))
    await delay(100)
    fireEvent.mouseEnter(node.getByText(endDayjsValueFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(endDayjsValueFormatFromNow)
    })
  })

  // tooltip 会受上下文语言控制
  it('tooltip will be affected by localeKey', async () => {
    const startDayjsValue = dayjs().locale('zh-cn')
    const endDayjsValue = dayjs().locale('zh-cn').add(1, 'year')
    const startDayjsValueFormat = startDayjsValue.format('YYYY-[Q]Q')
    const endDayjsValueFormat = endDayjsValue.format('YYYY-[Q]Q')
    const startDayjsValueFormatFromNow = startDayjsValue.fromNow()
    const endDayjsValueFormatFromNow = endDayjsValue.fromNow()
    const node = render(
      <ConfigProvider localeKey="zh_CN">
        <div className="test-picker">
          <ProField
            mode="view"
            initialValue={[startDayjsValue.valueOf(), endDayjsValue.valueOf()]}
            type="dateQuarterRange"
          />
        </div>
      </ConfigProvider>,
    )
    await delay(100)
    fireEvent.mouseEnter(node.getByText(startDayjsValueFormat))
    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(startDayjsValueFormatFromNow)
    })
    expect(/前$/.test(document.querySelector('.ant-tooltip-inner')!.textContent as string)).toBeTruthy()
    fireEvent.mouseLeave(node.getByText(startDayjsValueFormat))
    await delay(100)
    fireEvent.mouseEnter(node.getByText(endDayjsValueFormat))

    await waitFor(() => {
      expect(document.querySelector('.ant-tooltip-inner')!.textContent).toBe(endDayjsValueFormatFromNow)
    })
  })
})
