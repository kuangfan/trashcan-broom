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
    const { source, row, col } = report
    const sourceFile = source.split('/')[source.split('/').length - 1]
    const smFiles = fs.readdirSync(smPathDir)
    const smFile = smFiles.filter(file => new RegExp(file).test(sourceFile))
    const smFilePath = path.resolve(__dirname, '../sm', smFile)
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
