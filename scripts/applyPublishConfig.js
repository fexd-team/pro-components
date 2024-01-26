const fs = require('fs')
const path = require('path')
const glob = require('glob')

glob.sync(path.resolve(__dirname, '../packages/*/package.json')).map((filepath) => {
  const content = require(filepath)

  fs.writeFileSync(
    filepath,
    `${JSON.stringify(
      {
        ...content,
        ...(content.publishConfig || {}),
      },
      null,
      2,
    )}
`,
  )
})
