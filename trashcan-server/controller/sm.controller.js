const path = require('path')
const fs = require('fs')
const sourceMap = require('source-map')

// 错误暂时存放在内存中
const db = []
const smPathDir = path.resolve(__dirname, '../sm')

module.exports = {
  async getSms (ctx, next) {
    ctx.result = {
      msg: 'success',
      code: 200,
      data: db
    }
    await next()
  },
  async getSm (ctx, next) {
    const report = ctx.request.body
    const { stack } = report
    let result = ''
    if (stack.length > 0) {
      const smFiles = fs.readdirSync(smPathDir)
      const source = stack[0].url
      const row = stack[0].line
      const col = stack[0].column
      const sourceFile = source.split('/')[source.split('/').length - 1]
      const smFile = smFiles.filter(file => file.indexOf(sourceFile) > -1)
      if (smFile.length > 0) {
        const smFilePath = path.resolve(__dirname, '../sm', smFile[0])
        const smFileDataBuffer = fs.readFileSync(smFilePath)
        const smFileDataStr = smFileDataBuffer.toString()
        const smFileDataObj = JSON.parse(smFileDataStr)
        const sources = smFileDataObj.sources.map(source => source.replace(/\.[\.\/]+/g, ''))
        const consumer = await new sourceMap.SourceMapConsumer(smFileDataStr)
        result = consumer.originalPositionFor({
          line: Number(row),
          column: Number(col)
        })
        const index = sources.indexOf(result.source)
        result.content = smFileDataObj.sourcesContent[index]
      }
    }
    ctx.result = {
      msg: 'success',
      code: 200,
      data: result
    }
    await next()
  },
  async addSm (ctx, next) {
    const report = ctx.request.body
    db.push(report)
    ctx.result = {
      msg: 'success',
      code: 200
    }
    await next()
  }
}
