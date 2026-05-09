import { defineColumns, defineFields, defineColumn, defineField, extendColumn, extendField } from '../enhanceConfigs'

describe('defineColumns', () => {
  const columns = defineColumns({
    name: { label: '姓名', name: 'name', queryField: true, editField: { required: true } },
    age: { label: '年龄', name: 'age', type: 'digit', editField: true },
    dept: {
      label: '部门',
      name: 'dept',
      type: 'select',
      options: [{ label: 'A', value: 1 }],
      queryField: true,
      expandViewField: true,
    },
  })

  it('getConfigs returns array of column configs', () => {
    const configs = columns.getConfigs()
    expect(configs).toHaveLength(3)
    expect(configs[0]).toHaveProperty('label', '姓名')
    expect(configs[1]).toHaveProperty('type', 'digit')
  })

  it('getRawConfig returns original object', () => {
    const raw = columns.getRawConfig()
    expect(raw).toHaveProperty('name')
    expect(raw).toHaveProperty('age')
    expect(raw).toHaveProperty('dept')
  })

  it('allows direct key access', () => {
    expect(columns.name.label).toBe('姓名')
    expect(columns.age.type).toBe('digit')
  })

  it('getQueryFieldKeys extracts keys with queryField', () => {
    const keys = columns.getQueryFieldKeys()
    expect(keys).toContain('name')
    expect(keys).toContain('dept')
    expect(keys).not.toContain('age')
  })

  it('getEditFieldKeys extracts keys with editField', () => {
    const keys = columns.getEditFieldKeys()
    expect(keys).toContain('name')
    expect(keys).toContain('age')
  })

  it('getAddFieldKeys inherits from editField unless addField: false', () => {
    const cols = defineColumns({
      a: { label: 'A', name: 'a', editField: true },
      b: { label: 'B', name: 'b', editField: true, addField: false as any },
    })
    const keys = cols.getAddFieldKeys()
    expect(keys).toContain('a')
    expect(keys).not.toContain('b')
  })

  it('getExpandViewFieldKeys extracts expandView columns', () => {
    expect(columns.getExpandViewFieldKeys()).toContain('dept')
    expect(columns.getExpandViewFieldKeys()).not.toContain('name')
  })

  it('supports function values via defineColumn', () => {
    const cols = defineColumns({
      status: defineColumn(() => ({
        label: '状态',
        name: 'status',
        type: 'select',
        options: [{ label: '启用', value: 1 }],
      })),
    })
    expect(cols.status.label).toBe('状态')
    expect(cols.getConfigs()[0].options).toHaveLength(1)
  })
})

describe('defineFields', () => {
  const fields = defineFields({
    name: { label: '姓名', name: 'name', required: true },
    email: { label: '邮箱', name: 'email' },
    bio: { label: '简介', name: 'bio', type: 'textarea' },
  })

  it('getConfigs returns array of field configs', () => {
    const configs = fields.getConfigs()
    expect(configs).toHaveLength(3)
    expect(configs[0]).toHaveProperty('required', true)
  })

  it('allows direct key access for name referencing', () => {
    expect(fields.name.name).toBe('name')
    expect(fields.email.name).toBe('email')
    expect(fields.bio.type).toBe('textarea')
  })

  it('getRawConfig returns original object', () => {
    const raw = fields.getRawConfig()
    expect(Object.keys(raw)).toEqual(['name', 'email', 'bio'])
  })
})

describe('defineFields.from', () => {
  const columns = defineColumns({
    status: { label: '状态', name: 'status', type: 'select', options: [{ label: '启用', value: 1 }] },
    amount: { label: '金额', name: 'amount', type: 'money', width: 120 },
    time: { label: '时间', name: 'createTime', type: 'dateTime' },
  })

  it('inherits base column properties with overrides', () => {
    const queryFields = defineFields.from(columns, {
      status: { placeholder: '全部' },
      time: { type: 'dateTimeRange' as any },
    })

    expect(queryFields.status.label).toBe('状态')
    expect(queryFields.status.name).toBe('status')
    expect(queryFields.status.type).toBe('select')
    expect((queryFields.status as any).placeholder).toBe('全部')

    expect(queryFields.time.label).toBe('时间')
    expect(queryFields.time.type).toBe('dateTimeRange')
  })

  it('inherits from defineFields source (extendField path)', () => {
    const viewFields = defineFields({
      status: { label: '状态', name: 'status', type: 'select', options: [{ label: 'A', value: 1 }] },
      note: { label: '备注', name: 'note', type: 'textarea' },
    })

    const addFields = defineFields.from(viewFields, {
      status: { required: true },
      note: { required: true, placeholder: '请输入备注' },
    })

    expect(addFields.status.label).toBe('状态')
    expect(addFields.status.required).toBe(true)
    expect(addFields.note.type).toBe('textarea')
    expect(addFields.note.required).toBe(true)
    expect((addFields.note as any).placeholder).toBe('请输入备注')
  })

  it('getConfigs returns merged array', () => {
    const derived = defineFields.from(columns, {
      status: { required: true },
      amount: { required: true },
    })
    const configs = derived.getConfigs()
    expect(configs).toHaveLength(2)
    expect(configs[0]).toHaveProperty('required', true)
    expect(configs[0]).toHaveProperty('label', '状态')
  })

  it('allows key-based name referencing in layout', () => {
    const fields = defineFields.from(columns, {
      status: {},
      amount: { name: 'order_amount' },
    })
    expect(fields.status.name).toBe('status')
    expect(fields.amount.name).toBe('order_amount')
  })
})

describe('extendColumn', () => {
  it('extracts display-level properties from column config', () => {
    const column = { label: '状态', name: 'status', type: 'select', options: [1], width: 100, hidden: true }
    const extended = extendColumn(column)

    expect(extended.label).toBe('状态')
    expect(extended.name).toBe('status')
    expect(extended.type).toBe('select')
    expect(extended.options).toEqual([1])
    expect((extended as any).width).toBeUndefined()
    expect((extended as any).hidden).toBeUndefined()
  })

  it('maps antd aliases (title → label, dataIndex → name)', () => {
    const column = { title: '标题', dataIndex: 'title_field' } as any
    const extended = extendColumn(column)
    expect(extended.label).toBe('标题')
    expect(extended.name).toBe('title_field')
  })

  it('handles function value', () => {
    const getColumn = () => ({ label: '动态', name: 'dynamic', type: 'text' })
    const extended = extendColumn(getColumn)
    expect(extended.label).toBe('动态')
  })
})

describe('extendField', () => {
  it('returns a clean copy stripping undefined values', () => {
    const field = { label: '名称', name: 'name', type: undefined, required: true }
    const extended = extendField(field as any)
    expect(extended).toHaveProperty('label', '名称')
    expect(extended).toHaveProperty('required', true)
    expect(extended).not.toHaveProperty('type')
  })

  it('handles function value', () => {
    const getField = () => ({ label: '函数', name: 'fn_field' })
    const extended = extendField(getField as any)
    expect(extended.label).toBe('函数')
  })
})

describe('defineColumn / defineField', () => {
  it('defineColumn evaluates function and returns config', () => {
    const col = defineColumn(() => ({ label: '测试', name: 'test', type: 'text' }))
    expect(col.label).toBe('测试')
  })

  it('defineField evaluates function and returns config', () => {
    const field = defineField(() => ({ label: '字段', name: 'f1', required: true }))
    expect(field.required).toBe(true)
  })

  it('defineColumn passes through plain objects', () => {
    const col = defineColumn({ label: '直接', name: 'direct' })
    expect(col.name).toBe('direct')
  })
})

describe('defineColumns getter 方法', () => {
  const columns = defineColumns({
    name: {
      label: '姓名',
      name: 'name',
      queryField: true,
      editField: { required: true },
      viewField: true,
    },
    age: {
      label: '年龄',
      name: 'age',
      type: 'digit',
      editField: true,
      addField: false as any,
    },
    dept: {
      label: '部门',
      name: 'dept',
      type: 'select',
      options: [{ label: 'IT', value: 1 }],
      queryField: { placeholder: '全部' },
      editField: true,
      expandViewField: true,
    },
    status: {
      label: '状态',
      name: 'status',
      type: 'select',
      options: [{ label: '启用', value: 1 }],
    },
  })

  it('getQueryFields 返回有 queryField 的字段映射', () => {
    const fields = columns.getQueryFields()
    expect(Object.keys(fields)).toContain('name')
    expect(Object.keys(fields)).toContain('dept')
    expect(Object.keys(fields)).not.toContain('age')
    expect(Object.keys(fields)).not.toContain('status')
    expect(fields.dept).toHaveProperty('placeholder', '全部')
  })

  it('getEditFields 返回有 editField 的字段映射', () => {
    const fields = columns.getEditFields()
    expect(Object.keys(fields)).toContain('name')
    expect(Object.keys(fields)).toContain('age')
    expect(Object.keys(fields)).toContain('dept')
    expect(Object.keys(fields)).not.toContain('status')
    expect(fields.name).toHaveProperty('required', true)
  })

  it('getViewFields 返回所有列的 viewField（默认始终存在）', () => {
    const fields = columns.getViewFields()
    expect(Object.keys(fields)).toContain('name')
    expect(Object.keys(fields)).toContain('age')
    expect(Object.keys(fields)).toContain('dept')
    expect(Object.keys(fields)).toContain('status')
  })

  it('getAddFields 继承 editField（除非 addField: false）', () => {
    const fields = columns.getAddFields()
    expect(Object.keys(fields)).toContain('name')
    expect(Object.keys(fields)).toContain('dept')
    expect(Object.keys(fields)).not.toContain('age')
  })

  it('getExpandViewFields 返回有 expandViewField 的字段映射', () => {
    const fields = columns.getExpandViewFields()
    expect(Object.keys(fields)).toContain('dept')
    expect(Object.keys(fields)).not.toContain('name')
    expect(Object.keys(fields)).not.toContain('age')
  })

  it('getViewFieldKeys/getQueryFieldKeys/getEditFieldKeys 返回字符串数组', () => {
    expect(columns.getViewFieldKeys()).toEqual(expect.arrayContaining(['name', 'age', 'dept', 'status']))
    expect(columns.getQueryFieldKeys()).toEqual(expect.arrayContaining(['name', 'dept']))
    expect(columns.getEditFieldKeys()).toEqual(expect.arrayContaining(['name', 'age', 'dept']))
    expect(columns.getAddFieldKeys()).toEqual(expect.arrayContaining(['name', 'dept']))
    expect(columns.getExpandViewFieldKeys()).toEqual(['dept'])
  })

  it('字段配置继承列的公共属性', () => {
    const queryFields = columns.getQueryFields()
    expect(queryFields.dept).toHaveProperty('label', '部门')
    expect(queryFields.dept).toHaveProperty('name', 'dept')
    expect(queryFields.dept).toHaveProperty('type', 'select')
    expect(queryFields.dept).toHaveProperty('options')
  })
})

describe('defineColumns 函数形式', () => {
  it('构造时立即执行函数以支持 key 直接访问', () => {
    let count = 0
    const columns = defineColumns(() => {
      count++
      return {
        id: { label: 'ID', name: 'id' },
      }
    })
    expect(count).toBe(1)
    expect(columns.id.label).toBe('ID')
  })

  it('memoize 确保 getter 方法不重复计算', () => {
    let count = 0
    const columns = defineColumns(() => {
      count++
      return {
        id: { label: 'ID', name: 'id', queryField: true },
      }
    })
    const countAfterConstruct = count
    columns.getConfigs()
    columns.getConfigs()
    columns.getQueryFieldKeys()
    columns.getQueryFields()
    expect(count).toBe(countAfterConstruct + 1)
  })
})

describe('defineFields getter 方法', () => {
  it('getConfigs 返回所有字段配置数组', () => {
    const fields = defineFields({
      name: { label: '姓名', name: 'name', required: true },
      email: { label: '邮箱', name: 'email' },
    })
    const configs = fields.getConfigs()
    expect(configs).toHaveLength(2)
    expect(configs[0]).toHaveProperty('label', '姓名')
    expect(configs[0]).toHaveProperty('required', true)
    expect(configs[1]).toHaveProperty('label', '邮箱')
  })

  it('支持函数形式字段值', () => {
    const fields = defineFields({
      dynamic: () => ({ label: '动态', name: 'dynamic_field', type: 'text' }),
      static: { label: '静态', name: 'static_field' },
    })
    const configs = fields.getConfigs()
    expect(configs[0]).toHaveProperty('label', '动态')
    expect(configs[0]).toHaveProperty('name', 'dynamic_field')
  })
})

describe('flattenChildren', () => {
  const { flatten } = require('@fexd/tools')
  function flattenChildren(array: any[]): any {
    return flatten([...array, ...array.map((item: any) => flattenChildren(item?.children ?? []))])
  }

  it('拍平无 children 的数组', () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = flattenChildren(input)
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveProperty('id', 1)
  })

  it('拍平单层 children', () => {
    const input = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }, { id: 2 }]
    const result = flattenChildren(input)
    expect(result).toHaveLength(4)
    expect(result.map((i: any) => i.id)).toEqual(expect.arrayContaining([1, 2, 11, 12]))
  })

  it('递归拍平多层 children', () => {
    const input = [
      {
        id: 1,
        children: [{ id: 11, children: [{ id: 111 }] }, { id: 12 }],
      },
    ]
    const result = flattenChildren(input)
    expect(result.map((i: any) => i.id)).toEqual(expect.arrayContaining([1, 11, 12, 111]))
  })

  it('空数组返回空数组', () => {
    expect(flattenChildren([])).toEqual([])
  })

  it('无 children 属性时安全处理', () => {
    const input = [{ id: 1 }, { id: 2, children: undefined }]
    const result = flattenChildren(input as any)
    expect(result).toHaveLength(2)
  })
})
