import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import useCoverableProps from '../useCoverableProps'

describe('useCoverableProps', () => {
  it('基本配置返回 getProps 方法', () => {
    const { result } = renderHook(() =>
      useCoverableProps({
        fields: [
          { name: 'name', type: 'input', label: '姓名' },
          { name: 'age', type: 'number', label: '年龄' },
        ],
      }),
    )

    expect(result.current.getProps).toBeDefined()
    expect(typeof result.current.getProps).toBe('function')
  })

  it('getProps() 返回包含 fields 的 props', () => {
    const { result } = renderHook(() =>
      useCoverableProps({
        fields: [
          { name: 'name', type: 'input', label: '姓名' },
          { name: 'age', type: 'number', label: '年龄' },
        ],
      }),
    )

    const props = result.current.getProps()
    expect(props.fields).toBeDefined()
    expect(props.fields.length).toBe(2)
  })

  it('ref 属性被正确提取和还原', () => {
    const mockRef = { current: null }

    const { result } = renderHook(() =>
      useCoverableProps({
        ref: mockRef as any,
        fields: [{ name: 'name', type: 'input', label: '姓名' }],
      }),
    )

    const props = result.current.getProps()
    expect(props.ref).toBe(mockRef)
  })

  it('formRef 属性被正确提取和还原', () => {
    const mockFormRef = { current: null }

    const { result } = renderHook(() =>
      useCoverableProps({
        formRef: mockFormRef as any,
        fields: [{ name: 'name', type: 'input', label: '姓名' }],
      }),
    )

    const props = result.current.getProps()
    expect(props.formRef).toBe(mockFormRef)
  })

  it('layout 属性透传', () => {
    const { result } = renderHook(() =>
      useCoverableProps({
        layout: 'vertical',
        fields: [{ name: 'name', type: 'input', label: '姓名' }],
      }),
    )

    const props = result.current.getProps()
    expect(props.layout).toBe('vertical')
  })

  it('gridColumns 属性透传', () => {
    const { result } = renderHook(() =>
      useCoverableProps({
        gridColumns: 3,
        fields: [{ name: 'name', type: 'input', label: '姓名' }],
      }),
    )

    const props = result.current.getProps()
    expect(props.gridColumns).toBe(3)
  })

  it('mode 属性透传', () => {
    const { result } = renderHook(() =>
      useCoverableProps({
        mode: 'view',
        fields: [{ name: 'name', type: 'input', label: '姓名' }],
      }),
    )

    const props = result.current.getProps()
    expect(props.mode).toBe('view')
  })

  it('__cover 可以覆盖配置', () => {
    const { result } = renderHook(() =>
      useCoverableProps({
        fields: [
          { name: 'name', type: 'input', label: '姓名' },
          { name: 'age', type: 'number', label: '年龄' },
        ],
      }),
    )

    expect(result.current.__cover).toBeDefined()
    expect(typeof result.current.__cover).toBe('function')
  })

  it('getConfig 可以获取当前配置', () => {
    const { result } = renderHook(() =>
      useCoverableProps({
        fields: [{ name: 'name', type: 'input', label: '姓名' }],
      }),
    )

    expect(result.current.getConfig).toBeDefined()
    expect(typeof result.current.getConfig).toBe('function')
  })
})
