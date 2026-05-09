import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { delay } from '@fexd/tools'

import createBC, { useConfigurable } from '../index'

describe('createBC - createNextBC 模式', () => {
  it('函数参数形式创建 BC 组件', () => {
    const TestBC = createBC(function useTestComponent(props: { title: string }) {
      const config = useConfigurable({
        message: 'hello',
      })

      return {
        render: (
          <div data-testid="bc">
            {props.title} - {config.message}
          </div>
        ),
      }
    })

    const { getByTestId } = render(<TestBC title="测试" />)
    expect(getByTestId('bc').textContent).toContain('测试')
    expect(getByTestId('bc').textContent).toContain('hello')
  })

  it('支持 defaultProps', () => {
    const TestBC = createBC(
      function useTestComponent(props: { name?: string }) {
        return {
          render: <span data-testid="name">{props.name}</span>,
        }
      },
      { defaultProps: { name: '默认名' } },
    )

    const { getByTestId } = render(<TestBC />)
    expect(getByTestId('name').textContent).toBe('默认名')
  })

  it('props 可以覆盖 defaultProps', () => {
    const TestBC = createBC(
      function useTestComponent(props: { name?: string }) {
        return {
          render: <span data-testid="name">{props.name}</span>,
        }
      },
      { defaultProps: { name: '默认名' } },
    )

    const { getByTestId } = render(<TestBC name="自定义" />)
    expect(getByTestId('name').textContent).toBe('自定义')
  })

  it('render 可以返回 null', () => {
    const TestBC = createBC(function useTestComponent() {
      return {
        render: null,
      }
    })

    const { container } = render(<TestBC />)
    expect(container.innerHTML).toBe('')
  })

  it('content 属性优先于 render', () => {
    const TestBC = createBC(function useTestComponent() {
      return {
        content: <div data-testid="content">content优先</div>,
        render: <div data-testid="render">不应渲染</div>,
      }
    })

    const { getByTestId, queryByTestId } = render(<TestBC />)
    expect(getByTestId('content')).toBeInTheDocument()
    expect(queryByTestId('render')).toBeNull()
  })
})

describe('useConfigurable', () => {
  it('返回传入的配置对象', () => {
    const TestBC = createBC(function useTestComponent() {
      const config = useConfigurable({
        apiUrl: '/api/test',
        pageSize: 10,
      })

      return {
        render: (
          <div>
            <span data-testid="url">{config.apiUrl}</span>
            <span data-testid="size">{config.pageSize}</span>
          </div>
        ),
      }
    })

    const { getByTestId } = render(<TestBC />)
    expect(getByTestId('url').textContent).toBe('/api/test')
    expect(getByTestId('size').textContent).toBe('10')
  })

  it('支持函数形式的配置（带 getConfig）', () => {
    const TestBC = createBC(function useTestComponent() {
      const config = useConfigurable(({ getConfig }) => ({
        baseUrl: '/api',
        fullUrl: '/api/users',
      }))

      return {
        render: (
          <div>
            <span data-testid="base">{config.baseUrl}</span>
            <span data-testid="full">{config.fullUrl}</span>
          </div>
        ),
      }
    })

    const { getByTestId } = render(<TestBC />)
    expect(getByTestId('base').textContent).toBe('/api')
    expect(getByTestId('full').textContent).toBe('/api/users')
  })

  it('render 方法存在于返回的 config 中', () => {
    let configResult: any

    const TestBC = createBC(function useTestComponent() {
      const config = useConfigurable({ key: 'val' })
      configResult = config

      return {
        render: <div>test</div>,
      }
    })

    render(<TestBC />)
    expect(configResult.render).toBeDefined()
    expect(typeof configResult.render).toBe('function')
  })
})

describe('createBC.createApi', () => {
  it('createApi 是 request.define 的别名', () => {
    expect(createBC.createApi).toBeDefined()
    expect(typeof createBC.createApi).toBe('function')
  })
})
