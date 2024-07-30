import React from 'react'
import { ProTable } from '@fexd/pro-components'

import CoverableTable from './CoverableTable'

export default () => {
  const controller = ProTable.useController()

  // @ts-ignore
  window.controller = controller

  return (
    <CoverableTable
      coverable={{
        proTableProps: {
          ref: controller.ref,
          selectable: false,
          // queryFieldOrder: ['Test'],
          // render: () => ()
          // hideQueryFields: true,
          iconActions: {
            search: 'search',
          },
          actions: {
            新增: {
              builtIn: 'add',
              icon: null,
              onClick: () => {
                alert(1)
              },
            },
            导出: {
              content: '??',
            },
          },
          queryFields: {
            文本框: {},
            选择框: {
              label: '文本框',
            },
            Test: {
              label: 'Test',
              name: 'Test',
            },
            // 0: {
            //   required: true,
            // },
          },
          // iconActions: {
          //   3: 'search',
          // },
          // addFields: [
          //   {
          //     label: '测试',
          //     name: 'test',
          //     type: 'select',
          //     // req
          //     // options: [],
          //   },
          // ],
          // addFields: {
          //   1: {
          //     label: '???',
          //     type: 'date'
          //   }
          // },

          // columns: {
          //   Test: {
          //     title: '图片',
          //     name: 'image',
          //     align: 'center',
          //     render: () => ({
          //       builtIn: 'avatar',
          //     }),
          //   },
          //   百分比: {
          //     render: (value) => ({
          //       builtIn: 'link',
          //     }),
          //     // viewField: false,
          //     // type: 'select',
          //     // editField
          //     // viewField: false
          //   },
          //   // 百分比: {
          //   //   addField: {
          //   //     dependencies: [],
          //   //     hook: undefined
          //   //   }
          //   // }
          // },
        },
      }}
    />
  )
}
