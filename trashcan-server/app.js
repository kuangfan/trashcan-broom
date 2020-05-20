const Koa = require('koa')
const app = new Koa()

const json = require('koa-json')
const bodyparser = require('koa-bodyparser')

const config = require('./config')

app.use(bodyparser())
app.use(json())

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
