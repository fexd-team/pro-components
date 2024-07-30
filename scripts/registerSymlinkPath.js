const fs = require('fs')
const path = require('path')
const os = require('os')

const rootPath = path.resolve(__dirname, '../')

// 往用户目录缓存写入一个.fexdSymlinkPath.json 静态文件，在内容中新增一条记录，key 为 mmf，value 为 rootPath

const filePath = path.resolve(os.homedir(), '.fexdSymlinkPath.json')

// 检查文件是否存在，如果不存在则创建一个新的文件
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '{}', 'utf8')
}

fs.readFile(filePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error(err)
    return
  }

  let jsonData = {}
  try {
    jsonData = JSON.parse(fileData)
  } catch (error) {
    console.error(error)
    return
  }

  jsonData.pro = rootPath

  fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Symlink path registered successfully.')
  })
})
