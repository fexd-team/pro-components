import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { getComponentFeatureExamples, getRelatedFeatures } from '../utils/features'

/** 获取组件特定功能的代码示例 */
const registryTool = (server: McpServer) => {
  server.tool(
    'get-component-feature-examples',
    `获取指定组件特定功能的代码示例
适用场景：
1. 用户需要某个具体功能的实际代码示例
2. 想要快速上手某个功能的实现
3. 查看功能的最佳实践和使用模式`,
    {
      componentName: z.string(),
      featureName: z.string(),
    },
    async ({ componentName, featureName }) => {
      const [examples, relatedFeatures] = await Promise.all([
        getComponentFeatureExamples(componentName, featureName),
        getRelatedFeatures(componentName, featureName),
      ])

      let relatedInfo = ''
      if (relatedFeatures.length > 0) {
        const relatedList = relatedFeatures
          .map((feature) => `- **${feature.componentName}.${feature.featureDisplayName}** - ${feature.description}`)
          .join('\n')

        relatedInfo = `

---

## 🔗 相关功能示例

${relatedList}

💡 使用 \`get-component-feature-examples ${relatedFeatures[0].componentName} ${relatedFeatures[0].featureName}\` 查看相关示例`
      }

      return {
        content: [
          {
            type: 'text',
            text: `${examples}${relatedInfo}

---

💡 **更多操作**：
- 使用 \`get-component-feature-docs\` 获取此功能的详细文档
- 使用 \`list-component-features\` 查看 ${componentName} 的所有功能
- 使用 \`search-features\` 搜索相关功能`,
          },
        ],
      }
    },
  )
}

export default registryTool
