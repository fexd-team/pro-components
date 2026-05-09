import React from 'react'
import { render, waitFor, fireEvent, act } from '@testing-library/react'
import { Form, Input } from 'antd'

import useValues from '../useValues'

function TestComponent({ form }: { form?: any }) {
  const values = useValues(form)

  return (
    <div>
      <span data-testid="values">{JSON.stringify(values)}</span>
    </div>
  )
}

function TestForm() {
  const [form] = Form.useForm()

  return (
    <Form form={form} initialValues={{ name: 'hello', age: 20 }}>
      <Form.Item name="name">
        <Input data-testid="name-input" />
      </Form.Item>
      <Form.Item name="age">
        <Input data-testid="age-input" />
      </Form.Item>
      <TestComponent form={form} />
    </Form>
  )
}

function TestFormWithContext() {
  return (
    <Form initialValues={{ city: 'Beijing' }}>
      <Form.Item name="city">
        <Input data-testid="city-input" />
      </Form.Item>
      <TestComponent />
    </Form>
  )
}

describe('useValues hook', () => {
  it('获取表单初始值', async () => {
    const { getByTestId } = render(<TestForm />)

    await waitFor(() => {
      const values = JSON.parse(getByTestId('values').textContent!)
      expect(values.name).toBe('hello')
      expect(values.age).toBe(20)
    })
  })

  it('表单值变化时自动更新', async () => {
    const { getByTestId } = render(<TestForm />)

    await waitFor(() => {
      const values = JSON.parse(getByTestId('values').textContent!)
      expect(values.name).toBe('hello')
    })

    const input = getByTestId('name-input')
    fireEvent.change(input, { target: { value: 'world' } })

    await waitFor(() => {
      const values = JSON.parse(getByTestId('values').textContent!)
      expect(values.name).toBe('world')
    })
  })

  it('通过 Form context 自动获取 form instance', async () => {
    const { getByTestId } = render(<TestFormWithContext />)

    await waitFor(() => {
      const values = JSON.parse(getByTestId('values').textContent!)
      expect(values.city).toBe('Beijing')
    })
  })

  it('无 form 时返回空对象', () => {
    function Standalone() {
      const values = useValues(undefined as any)
      return <span data-testid="val">{JSON.stringify(values)}</span>
    }

    const { getByTestId } = render(
      <Form>
        <Standalone />
      </Form>,
    )

    const val = getByTestId('val').textContent!
    expect(val).toBeDefined()
  })
})
