import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

/** 项目根目录 */
const ROOT_DIR = process.env.IS_BUILD
  ? resolve(dirname(fileURLToPath(import.meta.url)), '..')
  : resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')

/** 提取的组件数据存储目录 */
const EXTRACTED_DATA_DIR = resolve(ROOT_DIR, 'documents')

/** 提取的组件列表路径 */
const EXTRACTED_COMPONENTS_LIST_PATH = join(EXTRACTED_DATA_DIR, 'components-index.json')

/** 提取的组件数据目录 */
const EXTRACTED_COMPONENTS_DATA_PATH = join(EXTRACTED_DATA_DIR, 'components')

const DOC_FILE_NAME = 'docs.md'
const EXAMPLE_FILE_NAME = 'examples.md'

export {
  ROOT_DIR,
  EXTRACTED_DATA_DIR,
  EXTRACTED_COMPONENTS_LIST_PATH,
  EXTRACTED_COMPONENTS_DATA_PATH,
  DOC_FILE_NAME,
  EXAMPLE_FILE_NAME,
}
