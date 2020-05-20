const glob = require('glob')

module.exports = function (app) {
  const paths = glob.sync(path.resolve('./router/*.router.js'))
  paths.forEach(path => {
    const route = require(path)
    app.use(route.routes(), route.allowedMethods())
  })
}
