/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
import React, { useRef, memo, useMemo } from 'react'
import { Space } from 'antd'
import { run, delay, isArray } from '@fexd/tools'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SyncOutlined,
  SearchOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useThrottleFn, useMemoizedFn } from 'ahooks'

import { useProState } from '@fexd/pro-utils'
import { ProForm, FormItem } from '@fexd/pro-form'

import Action from '../actions/Action'
import useConfigPlugin, { I18nText } from '../config'
import { useProps } from '../../utils'
import useQueryFieldsConfig from './useFieldsConfig'
import useQueryFieldPlugin from './index'
import useItem from '../table/useItem'
import useFieldParams from '../editField/useFieldParams'

function simpleCeil(num: number, base: number) {
  return base * Math.ceil(num / base)
}

const QueryButton = memo(function QueryButton(props) {
  const { form, getPaginationParams, setPaginationParams, setSelectedItems, search } = useQueryFieldPlugin(() => [])

  const query = useThrottleFn(
    async () => {
      const values = await form.validateFields()
      setPaginationParams({ page: 1 })
      setSelectedItems([])
      await delay(100)
      await search({
        ...values,
        ...getPaginationParams(),
        page: 1,
      })
    },
    {
      wait: 300,
    },
  )

  return (
    <FormItem shouldUpdate noStyle>
      {() => {
        const { service, getQueryParams, getQueryingParams } = useQueryFieldPlugin(({ loading }) => [loading])
        const { params: values } = getQueryParams()
        const currentQueryValueString = JSON.stringify(values)
        const isNewValues = currentQueryValueString !== JSON.stringify(getQueryingParams())

        return (
          <Action
            icon={<SearchOutlined />}
            loading={service.loading}
            type="primary"
            onClick={query.run}
            tooltip={
              !isNewValues
                ? {
                    title: <I18nText text="queryField.sameParamsWithLastTime" />,
                    mouseEnterDelay: 1,
                    placement: 'bottom',
                  }
                : undefined
            }
            children={<I18nText text="queryField.query" />}
            {...props}
          />
        )
      }}
    </FormItem>
  )
})

const QueryField = memo(function QueryField({ form, onEnterDown, proFormRef }: any) {
  const {
    queryFieldRefreshAfterReset,
    queryFieldGutter,
    queryFieldColumns,
    queryFieldDefaultLength: propsQueryFieldDefaultLength,
    queryFieldDefaultLines,
    queryFieldLayout,
    queryFieldOrder,
    renderQueryFields,
    normalizeFieldValue,
    queryFieldPersistKey,
    queryFieldPersistType,
    queryFieldPersistForm,
    onQueryFieldReset,
    queryFieldActionSortList,
    queryFieldFoldActionProps,
    queryFieldTextFoldActionProps,
    queryFieldQueryActionProps,
    queryFieldResetActionProps,
  } = useProps()
  const formStatusRef = useRef({
    focused: false,
  })
  const showMoreQueryFormProState = useProState(false, {
    key: queryFieldPersistForm && queryFieldPersistKey ? `qf@${queryFieldPersistKey}:showMore` : undefined,
    persist: queryFieldPersistType,
    sync: false,
  })
  const { state: showMoreQueryForm } = showMoreQueryFormProState
  const toggleShowMoreQueryForm = () => showMoreQueryFormProState.setState((prevState: any) => !prevState as any)
  // const [showMoreQueryForm, { toggle: toggleShowMoreQueryForm }] = useToggle()
  const { rawQueryFields, queryFieldsMap: fieldsMap } = useQueryFieldsConfig()
  const { refresh, setPaginationParams, getService: getQueryService } = useQueryFieldPlugin(() => [])
  const { t } = useConfigPlugin(() => [])

  const foldAction = (
    <Action
      key="fold"
      // type="link"
      // size="small"
      icon={showMoreQueryForm ? <CaretUpOutlined /> : <CaretDownOutlined />}
      onClick={() => toggleShowMoreQueryForm()}
      tooltip={t(showMoreQueryForm ? 'queryField.fold' : 'queryField.more')}
      extraTooltipProps={{
        placement: 'bottom',
      }}
      {...(queryFieldFoldActionProps ?? {})}
    />
  )
  const textFoldAction = (
    <Action
      key="text-fold"
      type="link"
      size="small"
      icon={showMoreQueryForm ? <UpOutlined /> : <DownOutlined />}
      onClick={() => toggleShowMoreQueryForm()}
      extraTooltipProps={{
        placement: 'bottom',
      }}
      children={t(showMoreQueryForm ? 'queryField.fold' : 'queryField.more')}
      {...(queryFieldTextFoldActionProps ?? {})}
    />
  )
  const queryAction = <QueryButton key="query" {...(queryFieldQueryActionProps ?? {})} />
  const resetAction = (
    <Action
      key="reset"
      icon={<SyncOutlined />}
      onClick={async () => {
        run(onQueryFieldReset)
        form.resetFields()
        if (queryFieldRefreshAfterReset && !getQueryService()?.loading) {
          setPaginationParams({
            page: 1,
          })
          await delay(60)
          refresh()
        }
      }}
      children={<I18nText text="queryField.reset" />}
      {...(queryFieldResetActionProps ?? {})}
    />
  )
  const rawActions = (
    <Space className="f-pro-table-query-form-actions">
      {queryAction}
      {resetAction}
    </Space>
  )
  const actions = (
    <FormItem key="actions" label={queryFieldLayout === 'vertical' ? ' ' : null}>
      <Space className="f-pro-table-query-form-actions">{rawActions}</Space>
    </FormItem>
  )

  const defaultRenderQueryFields: typeof renderQueryFields = useMemoizedFn(({ renderField, renderFields }) => {
    if (isArray(rawQueryFields?.[0])) {
      const defaultShowQueryFields = rawQueryFields.slice(0, queryFieldDefaultLines)
      const showingFields = showMoreQueryForm ? rawQueryFields : defaultShowQueryFields

      return renderFields(
        [
          ...showingFields,
          [
            <FormItem key="actions" label={null}>
              <Space className="f-pro-table-query-form-actions">
                {queryAction}
                {resetAction}
                {defaultShowQueryFields?.length < rawQueryFields?.length && foldAction}
              </Space>
            </FormItem>,
          ],
        ],
        {
          gridDynamicRender: false, // 不使用动态控制，避免造成问题
        },
      )
    }

    const unsortedKeys = Object.keys(fieldsMap).filter((key) => !queryFieldOrder.includes(key))

    const queryFields = [
      ...queryFieldOrder.map((key: string) => fieldsMap?.[key]),
      ...unsortedKeys.map((key: string) => fieldsMap?.[key]),
    ]

    const queryFieldDefaultLength = propsQueryFieldDefaultLength ?? queryFieldColumns * queryFieldDefaultLines - 1
    const defaultShowQueryFields = queryFields.slice(0, queryFieldDefaultLength)
    const showingFields = showMoreQueryForm ? queryFields : defaultShowQueryFields

    // console.log('showingFields', showingFields)

    // console.log(simpleCeil(showingFields?.length + 1, queryFieldColumns) - showingFields?.length - 1)

    const computedFoldAction = defaultShowQueryFields?.length < queryFields?.length ? foldAction : null
    const computedTextFoldAction = defaultShowQueryFields?.length < queryFields?.length ? textFoldAction : null
    return renderFields(
      [
        ...showingFields,
        // ...Array(simpleCeil(showingFields?.length + 1, queryFieldColumns) - showingFields?.length - 1)
        //   .fill('')
        //   .map((_, idx) => <div key={idx} />),
        {
          content: (
            <FormItem
              key="action"
              label={queryFieldLayout === 'vertical' && showingFields?.length % queryFieldColumns !== 0 ? ' ' : null}
            >
              <Space className="f-pro-table-query-form-actions" wrap>
                {queryFieldActionSortList
                  .map(
                    (actionName) =>
                      ({
                        query: queryAction,
                        reset: resetAction,
                        fold: computedFoldAction,
                        'text-fold': computedTextFoldAction,
                      })[actionName],
                  )
                  .filter(Boolean)}
              </Space>
            </FormItem>
          ),
          colSpan:
            ((1 + simpleCeil(showingFields?.length + 1, queryFieldColumns) - showingFields?.length - 1) * 24) /
            queryFieldColumns,
        },
      ],
      {
        gridDynamicRender: false,
      },
    )
  })

  return (
    <useFieldParams.Provider value={useMemo(() => ({ mode: 'query', viewType: 'field', form }), [])}>
      <ProForm
        ref={proFormRef}
        form={form}
        fields={rawQueryFields}
        layout={queryFieldLayout}
        gridColumns={queryFieldColumns}
        gridGutter={queryFieldGutter}
        normalizeFieldValue={normalizeFieldValue}
        className="f-pro-table-grid-field"
        gridDynamicRender={false}
        onFocus={() => {
          formStatusRef.current.focused = true
        }}
        onBlur={() => {
          formStatusRef.current.focused = false
        }}
        onKeyDown={(e) => {
          if (formStatusRef.current.focused && e.nativeEvent.keyCode === 13) {
            run(onEnterDown)
            return
          }
        }}
        render={({ renderField, renderFields }) =>
          run(renderQueryFields ?? defaultRenderQueryFields, undefined, {
            renderField,
            renderFields,
            rawActions,
            actions,
            fold: foldAction,
            query: queryAction,
            reset: resetAction,
            form,
            showMore: showMoreQueryForm,
          })
        }
      />
    </useFieldParams.Provider>
  )
})

export default QueryField
