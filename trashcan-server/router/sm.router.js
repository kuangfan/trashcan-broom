const Router = require('koa-router')
const router = new Router({ prefix: '/sm' })
const SmController = require('../controller/sm.controller')

router.get('/list', SmController.getSms)
router.get('/', SmController.getSm)
router.post('/', SmController.addSm)

module.exports = router
