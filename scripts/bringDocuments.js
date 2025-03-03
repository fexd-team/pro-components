// 将根目录 /documents 拷贝到 /packages/components/documents
const fs = require('fs-extra');
const path = require('path');

// 获取项目根目录路径
const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'documents');
const targetDir = path.join(rootDir, 'packages', 'components', 'documents');

// 解析命令行参数
const args = process.argv.slice(2);
const shouldDelete = args.includes('--delete') || args.includes('-d');

async function main() {
  try {
    if (shouldDelete) {
      // 删除目标目录
      console.log(`正在删除目录: ${targetDir}`);
      await fs.remove(targetDir);
      console.log(`已成功删除目录: ${targetDir}`);
    } else {
      // 确保目标目录存在
      await fs.ensureDir(path.dirname(targetDir));
      
      // 复制目录
      console.log(`正在复制目录: ${sourceDir} -> ${targetDir}`);
      await fs.copy(sourceDir, targetDir, {
        overwrite: true,
        errorOnExist: false,
      });
      console.log(`已成功复制目录: ${sourceDir} -> ${targetDir}`);
    }
  } catch (error) {
    console.error('操作失败:', error);
    process.exit(1);
  }
}

main();
