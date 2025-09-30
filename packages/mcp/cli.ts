#!/usr/bin/env node

import antDesignServer from './src/server'

// 获取命令行参数
const [command, ...restArgs] = process.argv.slice(2)

// 根据命令选择要执行的脚本
async function run() {
  try {
    if (!command) {
      antDesignServer()
      return
    } else if (command === 'version' || command === '-v') {
      const packageJson = require('./package.json')
      console.log(packageJson.version)
      return
    }

    console.log('可用命令:')
    console.log('  npx @jzone-mcp/antd-components-mcp         - 启动 MCP 服务器')
    console.log('  npx @jzone-mcp/antd-components-mcp version - 显示版本信息')
    process.exit(1)
  } catch (error) {
    console.error('执行出错:', error)
    process.exit(1)
  }
}

run()
