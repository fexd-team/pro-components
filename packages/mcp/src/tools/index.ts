import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

// 原有工具
import getComponentDocs from './get-component-docs'
import listComponentExamples from './list-component-examples'
import listComponents from './list-components'

// 新的功能级工具
import listComponentFeatures from './list-component-features'
import getComponentFeatureDocs from './get-component-feature-docs'
import getComponentFeatureExamples from './get-component-feature-examples'
import searchFeatures from './search-features'

export default function registryTools(server: McpServer) {
  ;[
    // 原有工具（保持向后兼容）
    getComponentDocs,
    listComponentExamples,
    listComponents,

    // 新的功能级工具
    listComponentFeatures,
    getComponentFeatureDocs,
    getComponentFeatureExamples,
    searchFeatures,
  ].forEach((registryFn) => {
    registryFn(server)
  })
}
