import { ChainableTablePlugins } from '../utils'
import useQueryFieldPlugin from '../plugins/queryField'
import useActionsPlugin from '../plugins/actions'
import useTablePlugin from '../plugins/table'
import useEditFieldPlugin from '../plugins/editField'
import useValueTypePlugin from '../plugins/valueType'
import useModalPlugin from '../plugins/modal'
import useConfigPlugin from '../plugins/config'

export const builtInPluginList = [
  useConfigPlugin,
  useValueTypePlugin,
  useQueryFieldPlugin,
  useActionsPlugin,
  useTablePlugin,
  useModalPlugin,
  useEditFieldPlugin,
]

// export type ProTableProps = MergeMultiple<
//   [
//     MergeMultiple<[typeof useConfigPlugin.props, typeof useValueTypePlugin.props, typeof useQueryFieldPlugin.props]>,

//     MergeMultiple<[typeof useActionsPlugin.props, typeof useTablePlugin.props, typeof useModalPlugin.props]>,

//     typeof useEditFieldPlugin.props,
//   ]
// >

export const pluginChain = new ChainableTablePlugins()
export const builtInPlugins = pluginChain
// .add(useConfigPlugin)
// .add(useValueTypePlugin)
// .add(useQueryFieldPlugin)
// .add(useActionsPlugin)
// .add(useTablePlugin)
// .add(useModalPlugin)
// .add(useEditFieldPlugin)

// const builtInPluginPropsType = builtInPlugins.getPropsType()
