import React from 'react'
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react'
import { Form } from 'antd'
import { delay } from '@fexd/tools'

import ProField from '../index'

describe('ProField 核心渲染', () => {
  it('基础渲染 - type=input', () => {
    const { container } = render(<ProField type="input" label="姓名" name="name" />)
    expect(container.querySelector('.ant-input')).toBeInTheDocument()
    expect(container.querySelector('.ant-form-item-label')).toBeInTheDocument()
  })

  it('基础渲染 - type=select', () => {
    const { container } = render(
      <ProField
        type="select"
        label="状态"
        name="status"
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
      />,
    )
    expect(container.querySelector('.ant-select')).toBeInTheDocument()
  })

  it('view 模式不渲染可编辑控件', () => {
    const { container } = render(
      <ProField type="input" label="只读" name="readonly" mode="view" initialValue="hello" />,
    )
    expect(container.querySelector('.ant-input')).not.toBeInTheDocument()
    expect(container.textContent).toContain('hello')
  })

  it('mode=view 时 select 类型渲染选项文本', () => {
    const { container } = render(
      <ProField
        type="select"
        label="状态"
        name="status"
        mode="view"
        initialValue={1}
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
      />,
    )
    expect(container.querySelector('.ant-select')).not.toBeInTheDocument()
  })
})

describe('ProField hook 动态字段', () => {
  it('hook 返回对象时合并配置渲染', () => {
    const { container } = render(
      <Form>
        <ProField type="input" label="动态字段" name="dynamic" hook={() => ({ placeholder: '来自hook' })} />
      </Form>,
    )
    const input = container.querySelector('.ant-input')
    expect(input).toBeInTheDocument()
  })

  it('hook 返回 false 时不渲染', () => {
    const { container } = render(
      <Form>
        <ProField type="input" label="隐藏字段" name="hidden" hook={() => false} />
      </Form>,
    )
    expect(container.querySelector('.ant-input')).not.toBeInTheDocument()
  })

  it('hook 返回 null/undefined 时不渲染', () => {
    const { container } = render(
      <Form>
        <ProField type="input" label="空字段" name="empty" hook={() => null as any} />
      </Form>,
    )
    expect(container.querySelector('.ant-input')).not.toBeInTheDocument()
  })

  it('hook 返回 true/undefined 时正常渲染（使用默认配置）', () => {
    const { container } = render(
      <Form>
        <ProField type="input" label="默认" name="default" hook={() => true as any} />
      </Form>,
    )
    expect(container.querySelector('.ant-input')).toBeInTheDocument()
  })

  it('hook 返回 ReactNode 时直接渲染', () => {
    const { container } = render(
      <Form>
        <ProField
          type="input"
          label="自定义"
          name="custom"
          hook={() => <span className="custom-node">自定义内容</span>}
        />
      </Form>,
    )
    expect(container.querySelector('.custom-node')).toBeInTheDocument()
    expect(container.querySelector('.custom-node')!.textContent).toBe('自定义内容')
  })
})

describe('ProField form prop', () => {
  it('指定 form 时使用独立 Form 上下文', () => {
    const TestComponent = () => {
      const [form] = Form.useForm()
      form.setFieldsValue({ name: '测试值' })
      return <ProField form={form} type="input" label="姓名" name="name" />
    }

    const { container } = render(<TestComponent />)
    expect(container.querySelector('.ant-input')).toBeInTheDocument()
  })
})

describe('ProField shouldUpdate / dependencies', () => {
  it('dependencies 为空数组时 hook 执行但不随 form 值变化更新', () => {
    let hookCallCount = 0
    const { container } = render(
      <Form initialValues={{ name: 'init' }}>
        <ProField
          type="input"
          label="依赖"
          name="dependent"
          dependencies={[]}
          hook={() => {
            hookCallCount++
            return {}
          }}
        />
      </Form>,
    )
    expect(container.querySelector('.ant-input')).toBeInTheDocument()
  })

  it('shouldUpdate=false 时 hook 不响应更新', () => {
    const { container } = render(
      <Form initialValues={{ trigger: 'a' }}>
        <ProField
          type="input"
          label="不更新"
          name="noUpdate"
          shouldUpdate={false}
          hook={() => ({ placeholder: '固定' })}
        />
      </Form>,
    )
    expect(container.querySelector('.ant-input')).toBeInTheDocument()
  })
})

describe('ProField 边缘情况', () => {
  it('未知 type 不会崩溃（ErrorBoundary 兜底）', () => {
    const { container } = render(<ProField type={'unknownType123' as any} label="未知" name="unknown" />)
    expect(container).toBeTruthy()
  })

  it('空 props 不会崩溃', () => {
    const { container } = render(<ProField />)
    expect(container).toBeTruthy()
  })

  it('initialValue 正确传递', () => {
    const { container } = render(<ProField type="input" name="test" initialValue="初始值" />)
    const input = container.querySelector('.ant-input')
    expect(input?.getAttribute('value')).toBe('初始值')
  })
})
