import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { getComponentFeatureDocs, getRelatedFeatures } from '../utils/features'

/** 获取组件特定功能的文档 */
const registryTool = (server: McpServer) => {
  server.tool(
    'get-component-feature-docs',
    `获取指定组件特定功能的详细文档
适用场景：
1. 用户想了解组件某个具体功能的API和使用方法
2. 用户需要某个功能维度的专业文档，如"ProTable的查询功能"
3. 获取功能相关的配置参数和使用说明`,
    {
      componentName: z.string(),
      featureName: z.string(),
    },
    async ({ componentName, featureName }) => {
      const [docs, relatedFeatures] = await Promise.all([
        getComponentFeatureDocs(componentName, featureName),
        getRelatedFeatures(componentName, featureName),
      ])

      let relatedInfo = ''
      if (relatedFeatures.length > 0) {
        const relatedList = relatedFeatures
          .map(
            (feature) =>
              `- **${feature.componentName}.${feature.featureDisplayName}** - ${feature.description} (${feature.relevanceReason})`,
          )
          .join('\n')

        relatedInfo = `

---

## 🔗 相关功能推荐

${relatedList}`
      }

      return {
        content: [
          {
            type: 'text',
            text: `${docs}${relatedInfo}

---

💡 **更多操作**：
- 使用 \`get-component-feature-examples\` 获取此功能的代码示例
- 使用 \`list-component-features\` 查看 ${componentName} 的所有功能
- 使用 \`search-features\` 搜索相关功能`,
          },
        ],
      }
    },
  )
}

export default registryTool
