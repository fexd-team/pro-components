import { getFieldFromColumn, getAllFieldFromColumn } from '../helpers'

describe('getFieldFromColumn', () => {
  const baseColumn = {
    label: '状态',
    name: 'status',
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
    tooltip: '当前状态',
    width: 100,
    hidden: false,
  }

  describe('基础行为', () => {
    it('propKey 不存在时返回 undefined（viewField 除外）', () => {
      expect(getFieldFromColumn(baseColumn as any, 'queryField')).toBeUndefined()
      expect(getFieldFromColumn(baseColumn as any, 'editField')).toBeUndefined()
      expect(getFieldFromColumn(baseColumn as any, 'addField')).toBeUndefined()
    })

    it('viewField 始终有返回值（即使未显式配置）', () => {
      const result = getFieldFromColumn(baseColumn as any, 'viewField')
      expect(result).toBeDefined()
      expect(result).toHaveProperty('label', '状态')
      expect(result).toHaveProperty('name', 'status')
      expect(result).toHaveProperty('type', 'select')
    })

    it('propConfig 为 false 时返回 undefined（被首个 guard 拦截）', () => {
      const column = { ...baseColumn, editField: false }
      expect(getFieldFromColumn(column as any, 'editField')).toBeUndefined()
    })
  })

  describe('propConfig 为 true 时', () => {
    it('继承列的公共属性 (label/name/type/options/tooltip)', () => {
      const column = { ...baseColumn, queryField: true }
      const result = getFieldFromColumn(column as any, 'queryField')

      expect(result).toHaveProperty('label', '状态')
      expect(result).toHaveProperty('name', 'status')
      expect(result).toHaveProperty('type', 'select')
      expect(result).toHaveProperty('options', baseColumn.options)
      expect(result).toHaveProperty('tooltip', '当前状态')
    })

    it('不继承表格专属属性 (width/hidden)', () => {
      const column = { ...baseColumn, queryField: true }
      const result = getFieldFromColumn(column as any, 'queryField')

      expect(result).not.toHaveProperty('width')
      expect(result).not.toHaveProperty('hidden')
    })
  })

  describe('propConfig 为对象时', () => {
    it('合并列属性与自定义配置', () => {
      const column = {
        ...baseColumn,
        editField: { required: true, placeholder: '请选择' },
      }
      const result = getFieldFromColumn(column as any, 'editField')

      expect(result).toHaveProperty('label', '状态')
      expect(result).toHaveProperty('name', 'status')
      expect(result).toHaveProperty('required', true)
      expect(result).toHaveProperty('placeholder', '请选择')
    })

    it('自定义配置可覆盖列属性', () => {
      const column = {
        ...baseColumn,
        queryField: { type: 'text', name: 'status_query' },
      }
      const result = getFieldFromColumn(column as any, 'queryField')

      expect(result).toHaveProperty('type', 'text')
      expect(result).toHaveProperty('name', 'status_query')
      expect(result).toHaveProperty('label', '状态')
    })
  })

  describe('propConfig 为函数时', () => {
    it('返回带 hook 字段的配置', () => {
      const column = {
        ...baseColumn,
        queryField: () => ({ placeholder: '动态字段' }),
      }
      const result = getFieldFromColumn(column as any, 'queryField')

      expect(result).toHaveProperty('hook')
      expect(result).toHaveProperty('shouldUpdate', true)
      expect(result).toHaveProperty('label', '状态')
      expect(result).toHaveProperty('name', 'status')
      expect(typeof result!.hook).toBe('function')
    })

    it('hook 执行后合并列属性与返回值', () => {
      const column = {
        ...baseColumn,
        editField: () => ({ required: true, placeholder: '请选择状态' }),
      }
      const result = getFieldFromColumn(column as any, 'editField')
      const hookResult = (result as any).hook()

      expect(hookResult).toHaveProperty('label', '状态')
      expect(hookResult).toHaveProperty('required', true)
      expect(hookResult).toHaveProperty('placeholder', '请选择状态')
      expect(hookResult).toHaveProperty('name', 'status')
    })

    it('hook 返回 true 时使用空对象合并', () => {
      const column = {
        ...baseColumn,
        editField: () => true,
      }
      const result = getFieldFromColumn(column as any, 'editField')
      const hookResult = (result as any).hook()

      expect(hookResult).toHaveProperty('label', '状态')
      expect(hookResult).toHaveProperty('name', 'status')
    })

    it('hook 返回非对象值时直接透传', () => {
      const column = {
        ...baseColumn,
        queryField: () => false,
      }
      const result = getFieldFromColumn(column as any, 'queryField')
      const hookResult = (result as any).hook()

      expect(hookResult).toBe(false)
    })
  })

  describe('antd 别名兼容', () => {
    it('title → label, dataIndex → name, valueType → type, valueEnum → options', () => {
      const antdColumn = {
        title: '标题列',
        dataIndex: 'title_field',
        valueType: 'textarea',
        valueEnum: [{ label: 'A', value: 'a' }],
        queryField: true,
      }
      const result = getFieldFromColumn(antdColumn as any, 'queryField')

      expect(result).toHaveProperty('label', '标题列')
      expect(result).toHaveProperty('name', 'title_field')
      expect(result).toHaveProperty('type', 'textarea')
      expect(result).toHaveProperty('options', antdColumn.valueEnum)
    })

    it('优先使用 label/name/type/options（非别名）', () => {
      const mixedColumn = {
        label: '优先标签',
        title: '次要标签',
        name: 'priority_name',
        dataIndex: 'fallback_name',
        type: 'select',
        valueType: 'text',
        options: [1, 2],
        valueEnum: [3, 4],
        queryField: true,
      }
      const result = getFieldFromColumn(mixedColumn as any, 'queryField')

      expect(result).toHaveProperty('label', '优先标签')
      expect(result).toHaveProperty('name', 'priority_name')
      expect(result).toHaveProperty('type', 'select')
      expect(result).toHaveProperty('options', [1, 2])
    })
  })

  describe('扩展属性继承', () => {
    it('继承 format/unit/digits/copyable/lazyRender/builtInRule', () => {
      const column = {
        label: '金额',
        name: 'amount',
        type: 'money',
        format: 'YYYY-MM-DD',
        unit: '元',
        digits: 2,
        copyable: true,
        lazyRender: true,
        builtInRule: 'days-span',
        viewField: true,
      }
      const result = getFieldFromColumn(column as any, 'viewField')

      expect(result).toHaveProperty('format', 'YYYY-MM-DD')
      expect(result).toHaveProperty('unit', '元')
      expect(result).toHaveProperty('digits', 2)
      expect(result).toHaveProperty('copyable', true)
      expect(result).toHaveProperty('lazyRender', true)
      expect(result).toHaveProperty('builtInRule', 'days-span')
    })

    it('undefined 属性不会出现在结果中', () => {
      const column = {
        label: '简单列',
        name: 'simple',
        queryField: true,
      }
      const result = getFieldFromColumn(column as any, 'queryField')

      expect(result).not.toHaveProperty('type')
      expect(result).not.toHaveProperty('options')
      expect(result).not.toHaveProperty('tooltip')
      expect(result).not.toHaveProperty('format')
    })
  })
})

describe('getAllFieldFromColumn', () => {
  it('完整提取所有字段类型', () => {
    const column = {
      label: '部门',
      name: 'dept',
      type: 'select',
      options: [{ label: 'IT', value: 1 }],
      queryField: true,
      editField: { required: true },
      expandViewField: true,
    }
    const result = getAllFieldFromColumn(column as any)

    expect(result).toHaveProperty('queryField')
    expect(result).toHaveProperty('viewField')
    expect(result).toHaveProperty('editField')
    expect(result).toHaveProperty('addField')
    expect(result).toHaveProperty('expandViewField')
    expect(result).toHaveProperty('column', column)

    expect(result.queryField).toHaveProperty('label', '部门')
    expect(result.viewField).toHaveProperty('type', 'select')
    expect(result.editField).toHaveProperty('required', true)
    expect(result.expandViewField).toHaveProperty('name', 'dept')
  })

  it('未配置的字段类型返回 undefined（viewField 除外）', () => {
    const column = { label: '只读列', name: 'readonly_col' }
    const result = getAllFieldFromColumn(column as any)

    expect(result.queryField).toBeUndefined()
    expect(result.editField).toBeUndefined()
    expect(result.addField).toBeUndefined()
    expect(result.expandViewField).toBeUndefined()
    expect(result.viewField).toBeDefined()
  })

  it('显式 false 的字段返回 undefined（falsy 值被首个 guard 拦截）', () => {
    const column = {
      label: '限制列',
      name: 'restricted',
      editField: true,
      addField: false,
    }
    const result = getAllFieldFromColumn(column as any)

    expect(result.editField).toBeDefined()
    expect(result.addField).toBeUndefined()
  })
})
