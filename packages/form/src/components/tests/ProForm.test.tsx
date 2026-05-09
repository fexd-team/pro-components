import React, { useRef } from 'react'
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react'
import { delay } from '@fexd/tools'

import ProForm from '../ProForm'

describe('ProForm 基础渲染', () => {
  it('渲染 Form 容器', () => {
    const { container } = render(<ProForm fields={[{ label: '姓名', name: 'name', type: 'input' }]} />)
    expect(container.querySelector('.ant-form')).toBeInTheDocument()
    expect(container.querySelector('.f-pro-form-grid-field')).toBeInTheDocument()
  })

  it('渲染多个字段', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProForm
        fields={[
          { label: '姓名', name: 'name', type: 'input' },
          { label: '年龄', name: 'age', type: 'digit' },
          { label: '邮箱', name: 'email', type: 'input' },
        ]}
      />,
    )

    await delay(200)
    const formItems = container.querySelectorAll('.ant-form-item')
    expect(formItems.length).toBeGreaterThanOrEqual(3)
  })

  it('空 fields 不会崩溃', () => {
    const { container } = render(<ProForm fields={[]} />)
    expect(container.querySelector('.ant-form')).toBeInTheDocument()
  })
})

describe('ProForm 布局', () => {
  it('默认 layout 为 vertical', () => {
    const { container } = render(<ProForm fields={[{ label: '姓名', name: 'name', type: 'input' }]} />)
    expect(container.querySelector('.ant-form-vertical')).toBeInTheDocument()
  })

  it('layout=horizontal 渲染水平布局', () => {
    const { container } = render(
      <ProForm layout="horizontal" fields={[{ label: '姓名', name: 'name', type: 'input' }]} />,
    )
    expect(container.querySelector('.ant-form-horizontal')).toBeInTheDocument()
  })

  it('layout=inline 渲染内联布局', () => {
    const { container } = render(<ProForm layout="inline" fields={[{ label: '姓名', name: 'name', type: 'input' }]} />)
    expect(container.querySelector('.ant-form-inline')).toBeInTheDocument()
  })

  it('gridColumns 控制栅格列数', async () => {
    jest.useRealTimers()
    const { container } = render(
      <ProForm
        gridColumns={2}
        fields={[
          { label: '字段1', name: 'f1', type: 'input' },
          { label: '字段2', name: 'f2', type: 'input' },
          { label: '字段3', name: 'f3', type: 'input' },
          { label: '字段4', name: 'f4', type: 'input' },
        ]}
      />,
    )

    await delay(200)
    const grid = container.querySelector('.ant-row')
    expect(grid).toBeInTheDocument()
  })
})

describe('ProForm 模式切换', () => {
  it('mode=edit 渲染可编辑控件', () => {
    const { container } = render(
      <ProForm mode="edit" fields={[{ label: '姓名', name: 'name', type: 'input', initialValue: 'test' }]} />,
    )
    expect(container.querySelector('.ant-input')).toBeInTheDocument()
  })

  it('mode=view 渲染只读展示', () => {
    const { container } = render(
      <ProForm mode="view" fields={[{ label: '姓名', name: 'name', type: 'input', initialValue: 'test' }]} />,
    )
    expect(container.querySelector('.ant-input')).not.toBeInTheDocument()
    expect(container.textContent).toContain('test')
  })
})

describe('ProForm 值处理', () => {
  it('initialValues 正确设置初始值', () => {
    const { container } = render(
      <ProForm initialValues={{ name: '初始值' }} fields={[{ label: '姓名', name: 'name', type: 'input' }]} />,
    )
    const input = container.querySelector('.ant-input')
    expect(input?.getAttribute('value')).toBe('初始值')
  })

  it('field 级别 initialValue 正确设置', () => {
    const { container } = render(
      <ProForm fields={[{ label: '姓名', name: 'name', type: 'input', initialValue: '字段初始值' }]} />,
    )
    const input = container.querySelector('.ant-input')
    expect(input?.getAttribute('value')).toBe('字段初始值')
  })
})

describe('ProForm children 渲染', () => {
  it('children 为 ReactNode 时直接渲染', () => {
    const { container } = render(
      <ProForm>
        <div className="custom-child">自定义内容</div>
      </ProForm>,
    )
    expect(container.querySelector('.custom-child')).toBeInTheDocument()
    expect(container.querySelector('.custom-child')!.textContent).toBe('自定义内容')
  })

  it('children 为函数时接收 render 参数', async () => {
    jest.useRealTimers()
    const renderFn = jest.fn(({ renderField }) => (
      <div className="fn-result">{renderField({ name: 'name', type: 'input', label: '姓名' })}</div>
    ))

    const { container } = render(
      <ProForm fields={[{ label: '姓名', name: 'name', type: 'input' }]}>{renderFn}</ProForm>,
    )

    await delay(200)
    expect(renderFn).toHaveBeenCalled()
    expect(container.querySelector('.fn-result')).toBeInTheDocument()
  })
})

describe('ProForm ref API', () => {
  it('formRef 暴露 form/renderField/renderFields 方法', async () => {
    jest.useRealTimers()
    let refValue: any = null

    const TestComponent = () => {
      const ref = ProForm.useRef()
      React.useEffect(() => {
        refValue = ref.current
      })
      return (
        <ProForm
          formRef={ref}
          fields={[
            { label: '姓名', name: 'name', type: 'input' },
            { label: '年龄', name: 'age', type: 'digit' },
          ]}
        />
      )
    }

    render(<TestComponent />)
    await delay(200)

    expect(refValue).toBeTruthy()
    expect(typeof refValue.form).toBeDefined()
    expect(typeof refValue.renderField).toBe('function')
    expect(typeof refValue.renderFields).toBe('function')
    expect(typeof refValue.renderDescriptions).toBe('function')
    expect(typeof refValue.getValues).toBe('function')
    expect(typeof refValue.getFieldsValue).toBe('function')
  })
})

describe('ProForm 静态方法', () => {
  it('ProForm.useForm 存在', () => {
    expect(typeof ProForm.useForm).toBe('function')
  })

  it('ProForm.createForm 存在', () => {
    expect(typeof ProForm.createForm).toBe('function')
  })

  it('ProForm.useRef 存在', () => {
    expect(typeof ProForm.useRef).toBe('function')
  })

  it('ProForm.createRef 存在', () => {
    expect(typeof ProForm.createRef).toBe('function')
  })

  it('ProForm.defineCoverableProps 存在', () => {
    expect(typeof ProForm.defineCoverableProps).toBe('function')
  })

  it('ProForm.useCoverableProps 存在', () => {
    expect(typeof ProForm.useCoverableProps).toBe('function')
  })

  it('ProForm.coloringOptions 存在', () => {
    expect(typeof ProForm.coloringOptions).toBe('function')
  })

  it('ProForm.useValues 存在', () => {
    expect(typeof ProForm.useValues).toBe('function')
  })
})
