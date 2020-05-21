const router = require('koa-router')()
//
// router.get('/users/', function (ctx, next) {
//     ctx.body = 'this is a users response!'
// })
//
// router.get('/users/bar', function (ctx, next) {
//     ctx.body = 'this is a users/bar response'
// })

const UsersController = require('../controllers/users');
/**
 * 文章接口
 */
//创建用户
router.post('/users/create',UsersController.create);

//获取用户详情
router.get('/users/:id',UsersController.detail)

module.exports = router
