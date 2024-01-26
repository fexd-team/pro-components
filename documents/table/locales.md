---
title: 国际化
order: 7
---

# 国际化

## 快捷国际化

通过 `localeKey` 配置可实现快捷国际化，覆盖了 ProTable 内部的所有文案

目前仅支持 `中文`、`英文`、`印尼文`、`马来语`、`泰语`，取值为 `zh-CN`、`zh_CN`、`en-US`、`en_US`、`id-ID`、`id_ID`、`ms-MY`、`ms_MY`、`th-TH`、`th_TH`

```jsx | pure
import { ProTable } from '@fexd/pro-components'
export default () => <ProTable localeKey="en-US" />
```

```tsx
import React from 'react'
import {
  ProTable,
  useTranslation,
  globalI18n,
  I18n,
  useProTableRef,
  showModal,
  showDrawer,
  confirmPromise,
} from '@fexd/pro-components'
import { TranslationOutlined } from '@ant-design/icons'
import { Random } from 'mockjs'
import { delay, sample, run, random } from '@fexd/tools'

window.I18n = I18n

const builtInLocaleMap = {
  'zh-CN': {
    选项1: '选项1',
    选项2: '选项2',
    选项3: '选项3',
    选项4: '选项4',
    选项5: '选项5',
  },
  'en-US': {
    选项1: 'Options 1',
    选项2: 'Options 2',
    选项3: 'Options 3',
    选项4: 'Options 4',
    选项5: 'Options 5',
  },
}

globalI18n.applyConfig({
  types: {
    default: {
      resources: builtInLocaleMap,
    },
    jsx: {
      resources: builtInLocaleMap,
    },
  },
})

globalI18n.applyLanguage('en-US')

const Demo = () => {
  const tableRef = useProTableRef()
  const [locale, setLocale] = React.useState('en-US')
  const { t } = useTranslation()
  // console.log(t('选项1'))

  const mockOptions = [
    { label: t('选项1'), value: 1 },
    { label: t('选项2'), value: 2 },
    { label: t('选项3'), value: 3 },
    { label: t('选项4'), value: 4 },
    { label: t('选项5'), value: 5 },
  ]

  const dataSource = [
    {
      id: Random.id(),
      text: Random.name(),
      select: sample<any>(mockOptions)?.value,
      multipleSelect: [...new Set([sample<any>(mockOptions)?.value, sample<any>(mockOptions)?.value])],
    },
    {
      id: Random.id(),
      text: Random.name(),
      select: sample<any>(mockOptions)?.value,
      multipleSelect: [...new Set([sample<any>(mockOptions)?.value, sample<any>(mockOptions)?.value])],
    },
  ]

  return (
    <ProTable
      ref={tableRef}
      localeKey={locale}
      actions={[
        'add', // 新增
        {
          content: 'Modal',
          onClick() {
            showModal({
              content: 'test',
              // actions: null
              // footer: null
            })
          },
        },
        {
          content: 'Drawer',
          onClick() {
            showDrawer({
              content: 'test',
              // actions: null,
              // footer: null,
              okButtonProps: {
                confirm: '???!',
              },
              async onOk() {
                await delay(1000)
              },
            })
          },
        },
        {
          content: 'Confirm',
          onClick() {
            confirmPromise('confirm')
          },
        },
      ]}
      iconActions={[
        'refresh', // 刷新
        'table-size', // 表格密度
        'fullscreen', // 全屏
        {
          icon: <TranslationOutlined />,
          menuProps: {
            selectedKeys: [locale],
          },
          menu: [
            {
              label: '中文',
              key: 'zh-CN',
            },
            {
              label: 'English',
              key: 'en-US',
            },
            {
              label: 'Indonesia',
              key: 'id-ID',
            },
            {
              label: 'Malaysia',
              key: 'ms-MY',
            },
          ],
          onMenuClick(item) {
            I18n.applyLanguage(item?.key)
            // window.globalI18n = globalI18n
            setLocale(item?.key)
          },
        },
      ]}
      columnActions={[
        'view', // 查看详情
        'edit', // 编辑（弹窗）
        {
          builtIn: 'table-edit',
          content: 'Table Edit',
        }, // 编辑（表格内）
        'delete', // 删除
      ]}
      selectable // 批量动作需要配合 selectable 使用，仅在有选中了内容的情况下出现
      batchActions={[
        'delete', // 批量删除
      ]}
      rowSelection={{
        defaultSelectedRowKeys: dataSource?.map((item) => item.id),
      }}
      columns={[
        {
          title: 'Text',
          dataIndex: 'text',
          width: '35%',
          editField: true,
          queryField: true,
        },
        {
          title: 'Select',
          dataIndex: 'select',
          width: '20%',
          valueType: 'select',
          valueEnum: mockOptions,
          editField: true,
          queryField: true,
        },
        {
          title: 'Multiple Select',
          dataIndex: 'multipleSelect',
          width: '45%',
          valueType: 'multipleSelect',
          valueEnum: mockOptions,
          editField: true,
          queryField: true,
        },
      ]}
      onQuery={async (params) => {
        console.log(params)
        await delay(500)

        return {
          data: dataSource,
          total: dataSource?.length,
        }
      }}
      onAdd={async () => {
        await delay(500)
      }}
      onView={async () => {
        await delay(500)
      }}
      onEdit={async () => {
        await delay(500)
      }}
      onDelete={async () => {
        await delay(500)
      }}
    />
  )
}

export default () => <Demo />
```

## 指定修改对应值

```jsx | pure
import { ProTable } from '@fexd/pro-components'

export default () => (
  <ProTable
    locale={{
      actions: {
        multipleDeleteConfirm: (count: any = 0) => `确定删除已选中的 ${count} 条数据吗？`,
        multipleDelete: '批量删除',
        deleteConfirm: '确定删除吗？',
        delete: '删除',
        refreshTip: '刷新表格',
      },
      editField: {
        add: '新增',
        details: '详情',
        edit: '编辑',
        saveTips: '未保存的数据将会丢失，确定吗？',
      },
      queryField: {
        query: '查询',
        reset: '重置',
        fold: '收起',
        more: '更多',
      },
      modal: {
        confirm: '确认',
        okText: '好的',
        cancelText: '取消',
      },
      table: {
        selectionTips: (count: any = 0) => `已选择 ${count} 项`,
        deselect: '取消选择',
        inverse: '反向选择',
        action: '操作',
        totalDataCount: (total: any = 0) => `总共 ${total} 条数据`,
        edit: '编辑',
        save: '保存',
        cancel: '取消',
        cancelConfirm: '确认取消吗？',
        density: '表格密度',
        densityLarger: '宽松',
        densityMiddle: '正常',
        densitySmall: '紧凑',
        index: '序号',
      },
      valueType: {
        inputPassword: '输入密码',
        inputContent: '输入内容',
        chooseContent: '选择内容',
        startTime: '开始时间',
        endTime: '结束时间',
      },
    }}
  />
)
```

## ConfigProvider

可通过上下文配置的 `localeKey` 或者 `locale` 来修改文案，参考[全局配置](/pro-provider/docs)

```jsx | pure
import { ConfigProvider, ProTable } from '@fexd/pro-components'

export default () => (
  <ConfigProvider localeKey="en-US">
    <ProTable />
  </ConfigProvider>
)
```
