const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const smPath = path.resolve(__dirname, '../dist')
const targetPath = path.resolve(__dirname, '../../trashcan-server/sm')

const moveSourceMapFile = () => {
  const files = fs.readdirSync(smPath)
  const smFiles = files.filter(file => /\.js\.map/.test(file))
  smFiles.forEach(file => {
    const smFilePath = path.resolve(__dirname, '../dist', file)
    shell.exec(`cp ${smFilePath} ${targetPath}`)
    shell.exec(`rm ${smFilePath}`)
  })
}

moveSourceMapFile()
