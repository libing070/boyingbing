const router = require('koa-router')()

router.get('/users/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/users/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})
module.exports = router
