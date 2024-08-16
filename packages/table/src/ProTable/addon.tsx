import {
  extendColumn,
  extendField,
  defineColumns,
  defineFields,
  defineColumn,
  defineField,
  defineCoverableProps,
  useCoverableProps,
} from '../utils/enhanceConfigs'
import useQueryFieldPlugin from '../plugins/queryField'
import useActionsPlugin from '../plugins/actions'
import useTablePlugin from '../plugins/table'
import useEditFieldPlugin from '../plugins/editField'
import useValueTypePlugin from '../plugins/valueType'
import useModalPlugin from '../plugins/modal'
import useConfigPlugin from '../plugins/config'
import useProps, { setDefaultProps } from '../useProps'
import useFieldParams from '../plugins/editField/useFieldParams'
import useItem from '../plugins/table/useItem'
import useColumnConfig from '../plugins/table/useColumnConfig'

import useProTableController from './useProTableController'
import useProTableRef from './useProTableRef'
import createProTableRef from './createProTableRef'

export const proTableAddon = {
  useController: useProTableController,
  useRef: useProTableRef,
  createRef: createProTableRef,
  setDefaultProps,
  useQueryFieldPlugin,
  useActionsPlugin,
  useTablePlugin,
  useEditFieldPlugin,
  useValueTypePlugin,
  useModalPlugin,
  useConfigPlugin,
  extendColumn,
  extendField,
  defineColumns,
  defineFields,
  useItem,
  useFieldParams,
  useColumnConfig,
  defineColumn,
  defineField,
  defineCoverableProps,
  useProps,
  useCoverableProps,
}

export default proTableAddon
