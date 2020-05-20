const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const cors = require('@koa/cors')
const config = require('./config')
const router = require('./router')

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With', 'x-access-token']
}))
app.use(bodyparser())
app.use(json())
router(app)

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
