import fs from 'fs/promises'
import path from 'path'
import { EXTRACTED_DATA_DIR } from '../constants/path'

interface FeatureConfig {
  name: string
  description: string
  docs: string
  examples: string
  keywords: string[]
}

interface ComponentFeatures {
  name: string
  description: string
  features: Record<string, FeatureConfig>
}

type ComponentsFeaturesData = Record<string, ComponentFeatures>

let componentsFeaturesCache: ComponentsFeaturesData | null = null

/** 获取组件功能配置数据 */
export async function getComponentsFeatures(): Promise<ComponentsFeaturesData> {
  if (componentsFeaturesCache) {
    return componentsFeaturesCache
  }

  try {
    const featuresPath = path.join(EXTRACTED_DATA_DIR, 'components-features.json')
    const content = await fs.readFile(featuresPath, 'utf-8')
    componentsFeaturesCache = JSON.parse(content)
    return componentsFeaturesCache!
  } catch (error) {
    console.error('Failed to load components features data:', error)
    return {}
  }
}

/** 获取指定组件的所有功能 */
export async function getComponentFeatures(componentName: string): Promise<ComponentFeatures | null> {
  const featuresData = await getComponentsFeatures()
  return featuresData[componentName] || null
}

/** 获取指定组件功能的文档 */
export async function getComponentFeatureDocs(componentName: string, featureName: string): Promise<string> {
  try {
    const componentFeatures = await getComponentFeatures(componentName)
    if (!componentFeatures) {
      return `组件 ${componentName} 不存在`
    }

    const feature = componentFeatures.features[featureName]
    if (!feature) {
      const availableFeatures = Object.keys(componentFeatures.features).join(', ')
      return `组件 ${componentName} 不存在功能 ${featureName}。可用功能：${availableFeatures}`
    }

    const docsPath = path.join(EXTRACTED_DATA_DIR, 'components', componentName, 'features', feature.docs)

    const content = await fs.readFile(docsPath, 'utf-8')
    return content
  } catch (error) {
    console.error(`Failed to load feature docs for ${componentName}.${featureName}:`, error)
    return `无法加载 ${componentName} 组件的 ${featureName} 功能文档`
  }
}

/** 获取指定组件功能的示例 */
export async function getComponentFeatureExamples(componentName: string, featureName: string): Promise<string> {
  try {
    const componentFeatures = await getComponentFeatures(componentName)
    if (!componentFeatures) {
      return `组件 ${componentName} 不存在`
    }

    const feature = componentFeatures.features[featureName]
    if (!feature) {
      const availableFeatures = Object.keys(componentFeatures.features).join(', ')
      return `组件 ${componentName} 不存在功能 ${featureName}。可用功能：${availableFeatures}`
    }

    const examplesPath = path.join(EXTRACTED_DATA_DIR, 'components', componentName, 'features', feature.examples)

    const content = await fs.readFile(examplesPath, 'utf-8')
    return content
  } catch (error) {
    console.error(`Failed to load feature examples for ${componentName}.${featureName}:`, error)
    return `无法加载 ${componentName} 组件的 ${featureName} 功能示例`
  }
}

/** 搜索功能 */
export async function searchFeatures(query: string): Promise<
  {
    componentName: string
    featureName: string
    featureDisplayName: string
    description: string
    keywords: string[]
  }[]
> {
  const featuresData = await getComponentsFeatures()
  const results = []

  const normalizedQuery = query.toLowerCase()

  for (const [componentName, component] of Object.entries(featuresData)) {
    for (const [featureName, feature] of Object.entries(component.features)) {
      // 匹配功能名称
      if (feature.name.toLowerCase().includes(normalizedQuery) || featureName.toLowerCase().includes(normalizedQuery)) {
        results.push({
          componentName,
          featureName,
          featureDisplayName: feature.name,
          description: feature.description,
          keywords: feature.keywords,
        })
        continue
      }

      // 匹配描述
      if (feature.description.toLowerCase().includes(normalizedQuery)) {
        results.push({
          componentName,
          featureName,
          featureDisplayName: feature.name,
          description: feature.description,
          keywords: feature.keywords,
        })
        continue
      }

      // 匹配关键词
      if (feature.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedQuery))) {
        results.push({
          componentName,
          featureName,
          featureDisplayName: feature.name,
          description: feature.description,
          keywords: feature.keywords,
        })
      }
    }
  }

  return results
}

/** 获取相关功能推荐 */
export async function getRelatedFeatures(
  componentName: string,
  featureName: string,
): Promise<
  {
    componentName: string
    featureName: string
    featureDisplayName: string
    description: string
    relevanceReason: string
  }[]
> {
  const componentFeatures = await getComponentFeatures(componentName)
  if (!componentFeatures) {
    return []
  }

  const currentFeature = componentFeatures.features[featureName]
  if (!currentFeature) {
    return []
  }

  const relatedFeatures = []
  const currentKeywords = currentFeature.keywords

  // 同组件内的其他功能
  for (const [otherFeatureName, otherFeature] of Object.entries(componentFeatures.features)) {
    if (otherFeatureName === featureName) continue

    // 检查关键词重叠
    const commonKeywords = currentKeywords.filter((keyword) => otherFeature.keywords.includes(keyword))

    if (commonKeywords.length > 0) {
      relatedFeatures.push({
        componentName,
        featureName: otherFeatureName,
        featureDisplayName: otherFeature.name,
        description: otherFeature.description,
        relevanceReason: `共同关键词：${commonKeywords.join(', ')}`,
      })
    }
  }

  // 其他组件的相关功能（基于关键词匹配）
  const allFeatures = await getComponentsFeatures()
  for (const [otherComponentName, otherComponent] of Object.entries(allFeatures)) {
    if (otherComponentName === componentName) continue

    for (const [otherFeatureName, otherFeature] of Object.entries(otherComponent.features)) {
      const commonKeywords = currentKeywords.filter((keyword) => otherFeature.keywords.includes(keyword))

      if (commonKeywords.length >= 2) {
        // 至少2个共同关键词才推荐跨组件功能
        relatedFeatures.push({
          componentName: otherComponentName,
          featureName: otherFeatureName,
          featureDisplayName: otherFeature.name,
          description: otherFeature.description,
          relevanceReason: `跨组件相关：${commonKeywords.join(', ')}`,
        })
      }
    }
  }

  return relatedFeatures.slice(0, 5) // 限制返回数量
}

/** 清除缓存 */
export function clearFeaturesCache(): void {
  componentsFeaturesCache = null
}
