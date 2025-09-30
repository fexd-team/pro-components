import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { getComponentFeatures } from '../utils/features'

/** 列出组件的所有功能维度 */
const registryTool = (server: McpServer) => {
  server.tool(
    'list-component-features',
    `列出指定组件的所有功能维度
适用场景：
1. 用户想了解某个组件包含哪些功能
2. 用户需要细化查询特定功能时先获取功能列表
3. 探索组件的完整功能体系`,
    { componentName: z.string() },
    async ({ componentName }) => {
      const componentFeatures = await getComponentFeatures(componentName)

      if (!componentFeatures) {
        return {
          content: [
            {
              type: 'text',
              text: `组件 ${componentName} 不存在或暂不支持功能级查询。

请使用 list-components 工具查看所有可用组件。`,
            },
          ],
        }
      }

      const featuresInfo = Object.entries(componentFeatures.features)
        .map(([featureName, feature]) => {
          const keywords = feature.keywords.length > 0 ? `\n  🏷️ 关键词：${feature.keywords.join(', ')}` : ''

          return `## ${feature.name} (${featureName})
📝 **描述**：${feature.description}${keywords}`
        })
        .join('\n\n')

      return {
        content: [
          {
            type: 'text',
            text: `# ${componentFeatures.name} - 功能列表

${componentFeatures.description}

---

${featuresInfo}

---

💡 **使用提示**：
- 使用 \`get-component-feature-docs\` 查看具体功能的详细文档
- 使用 \`get-component-feature-examples\` 查看具体功能的代码示例
- 使用 \`search-features\` 跨组件搜索相关功能`,
          },
        ],
      }
    },
  )
}

export default registryTool
