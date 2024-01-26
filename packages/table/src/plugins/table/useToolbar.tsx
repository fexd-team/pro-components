/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, forwardRef, useEffect } from 'react'
import { Space, Dropdown, Menu } from 'antd'
import { ColumnHeightOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { useMount, useUpdate } from 'ahooks'
import { Action } from '@fexd/pro-utils'
import { run } from '@fexd/tools'

import { useProps } from '../../utils'
import useActionsPlugin from '../actions'
import useConfigPlugin, { I18nText } from '../config'

const SizeIcon = memo(function SizeIcon() {
  const { setSize, size } = useConfigPlugin(({ size }) => [size])

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu
          selectable
          selectedKeys={[size as string]}
          onSelect={({ key }) => {
            setSize(key as 'small')
          }}
        >
          {[
            {
              key: 'large',
              label: <I18nText text="table.densityLarger" />,
            },
            {
              key: 'middle',
              label: <I18nText text="table.densityMiddle" />,
            },
            {
              key: 'small',
              label: <I18nText text="table.densitySmall" />,
            },
          ].map((item) => (
            <Menu.Item key={item?.key}>{item?.label}</Menu.Item>
          ))}
        </Menu>
      }
    >
      <ColumnHeightOutlined />
    </Dropdown>
  )
})

const FullscreenIcon = memo(function FullscreenIcon(props) {
  const { wrapperDomRef } = useProps()
  const update = useUpdate()
  const isFullscreen = !!document.fullscreenElement

  useEffect(() => {
    if (!wrapperDomRef.current) {
      return
    }
    document.addEventListener('fullscreenchange', update)

    return () => {
      document.removeEventListener('fullscreenchange', update)
      if (!!document.fullscreenElement) {
        document.exitFullscreen()
        run(wrapperDomRef!.current, 'classList.remove', 'f-pro-table-wrapper-fullscreen')
        document.body.classList.remove('f-pro-table-scroll-block')
      }
    }
  }, [])

  useEffect(() => {
    if (isFullscreen) {
      run(wrapperDomRef.current, 'classList.add', 'f-pro-table-wrapper-fullscreen')
      document.body.classList.add('f-pro-table-scroll-block')
    } else {
      run(wrapperDomRef.current, 'classList.remove', 'f-pro-table-wrapper-fullscreen')
      document.body.classList.remove('f-pro-table-scroll-block')
    }

    return () => {
      run(wrapperDomRef.current, 'classList.remove', 'f-pro-table-wrapper-fullscreen')
      document.body.classList.remove('f-pro-table-scroll-block')
    }
  }, [isFullscreen])

  return (
    <Action
      type="text"
      size="small"
      icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      onClick={() => {
        if (isFullscreen) {
          document.exitFullscreen()
          return
        }

        run(document.documentElement, 'requestFullscreen')
      }}
      {...props}
    />
  )
})

const TableToolbar = memo(
  forwardRef(function TableToolbar(_, ref: any) {
    const { title, toolbarStyle } = useProps()

    const {
      builtInActions: { tableActionConfigs, iconActionConfigs },
      setIconActions: registerIconActions,
      renderTableActions,
      renderIconActions,
    } = useActionsPlugin(({ builtInActions }) => [builtInActions.tableActionConfigs, builtInActions.iconActionConfigs])

    useMount(() => {
      registerIconActions({
        fullscreen: <FullscreenIcon />,
        'table-size': { icon: <SizeIcon /> },
        size: { icon: <SizeIcon /> },
      })
    })

    return (
      <div className="f-pro-table-toolbar" ref={ref} style={toolbarStyle}>
        <div className="f-pro-table-toolbar-left">
          <div className="f-pro-table-title">{title}</div>
        </div>
        <Space className="f-pro-table-toolbar-right" size="middle">
          {tableActionConfigs?.length > 0 && <div className="f-pro-table-actions">{renderTableActions()}</div>}
          {iconActionConfigs?.length > 0 && (
            <div className="f-pro-table-settings f-pro-table-icon-actions">{renderIconActions()}</div>
          )}
        </Space>
      </div>
    )
  }),
)

export default function useTableToolbar({ ref }: any) {
  const { title } = useProps()

  const {
    builtInActions: { tableActionConfigs, iconActionConfigs },
  } = useActionsPlugin(({ builtInActions }) => [builtInActions.tableActionConfigs, builtInActions.iconActionConfigs])

  const hasToolbar = !!title || tableActionConfigs?.length > 0 || iconActionConfigs?.length > 0

  return {
    hasToolbar,
    renderToolbar: () => (hasToolbar ? <TableToolbar ref={ref} /> : null),
  }
}
