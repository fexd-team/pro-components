/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { request, ProTable, createBC, useConfigurable } from '@fexd/pro-components'

const OldDemo = createBC({
  defaultProps: {} as { test?: string },
  configurable: (props, { createApi, defineProTableColumns, getFinalConfig }) => {
    console.log('getFinalConfig', getFinalConfig())
    return {
      apis: {
        test: createApi({
          url: '/test',
        }),
      },
      tableBorder: false,
      columns: defineProTableColumns({
        id: {
          label: 'ID',
          name: 'id',
          width: 100,
        },
        name: {
          label: 'Name',
          name: 'name',
          width: 100,
        },
      }),
    }
  },
  render: ({ config }) => {
    React.useEffect(() => {
      config.apis.test()
    }, [])

    return <ProTable bordered={config.tableBorder} columns={config.columns.getConfigs()} />
  },
})

const NewDemo = createBC((props: { test?: string }) => {
  const apis = {
    test: request.define({
      url: '/test',
    }),
  }
  const columns = ProTable.defineColumns({
    id: {
      label: 'ID',
      name: 'id',
      width: 100,
    },
    name: {
      label: 'Name',
      name: 'name',
      width: 100,
    },
  })
  const config = useConfigurable({
    apis,
    tableBorder: false,
    columns,
  })

  React.useEffect(() => {
    config.apis.test()
  }, [])

  return config.render(<ProTable bordered={config.tableBorder} columns={config.columns.getConfigs()} />)
})

export default () => {
  return (
    <>
      <OldDemo
        // test={1}
        configurable={{
          apis: {
            test: {
              url: '/test_old',
            },
          },
          columns: {
            id: {
              tooltip: 'ID_old',
            },
            name: {
              label: 'Name_old',
            },
          },
        }}
      />
      <NewDemo
        // test={1}
        configurable={{
          apis: {
            test: {
              url: '/test_new',
            },
          },
          tableBorder: true,
          columns: {
            id: {
              tooltip: 'ID_new',
            },
            name: {
              label: 'Name_new',
            },
          },
        }}
      />
    </>
  )
}
