import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { searchFeatures } from '../utils/features'

/** 跨组件搜索功能 */
const registryTool = (server: McpServer) => {
  server.tool(
    'search-features',
    `跨组件搜索功能，支持按功能名称、描述或关键词搜索
适用场景：
1. 用户需要实现某种功能但不确定哪个组件提供
2. 查找包含特定关键词的所有相关功能  
3. 探索功能相关的组件和实现方式`,
    { searchQuery: z.string() },
    async ({ searchQuery }) => {
      const results = await searchFeatures(searchQuery)

      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `🔍 搜索 "${searchQuery}" 没有找到相关功能。

💡 **搜索建议**：
- 尝试使用更通用的关键词，如 "表格"、"表单"、"编辑" 等
- 使用 \`list-components\` 查看所有可用组件
- 使用 \`list-component-features\` 查看特定组件的功能列表`,
            },
          ],
        }
      }

      const resultsByComponent = new Map<string, typeof results>()

      // 按组件分组
      for (const result of results) {
        if (!resultsByComponent.has(result.componentName)) {
          resultsByComponent.set(result.componentName, [])
        }
        resultsByComponent.get(result.componentName)!.push(result)
      }

      const searchResults = Array.from(resultsByComponent.entries())
        .map(([componentName, features]) => {
          const featuresList = features
            .map((feature) => {
              const keywords = feature.keywords.length > 0 ? `\n    🏷️ ${feature.keywords.join(', ')}` : ''
              return `  ### ${feature.featureDisplayName} (\`${feature.featureName}\`)
  📝 ${feature.description}${keywords}`
            })
            .join('\n\n')

          return `## 📦 ${componentName}

${featuresList}`
        })
        .join('\n\n')

      const totalResults = results.length
      const componentCount = resultsByComponent.size

      return {
        content: [
          {
            type: 'text',
            text: `# 🔍 搜索结果："${searchQuery}"

找到 **${totalResults}** 个相关功能，分布在 **${componentCount}** 个组件中：

${searchResults}

---

💡 **后续操作**：
- 使用 \`get-component-feature-docs <组件名> <功能名>\` 查看详细文档
- 使用 \`get-component-feature-examples <组件名> <功能名>\` 查看代码示例
- 使用 \`list-component-features <组件名>\` 查看组件的完整功能列表`,
          },
        ],
      }
    },
  )
}

export default registryTool
