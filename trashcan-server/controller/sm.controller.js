const path = require('path')

// 错误暂时存放在内存中
const db = []

module.exports = {
  async getSms (ctx, next) {
  },
  async getSm (ctx, next) {
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
