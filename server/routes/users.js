const router = require('koa-router')()
const UsersController = require('../controllers/users');

//创建用户
router.post('/users/create',UsersController.create);

//获取用户详情
router.get('/users/:id',UsersController.detail);

//根据账号密码登录
router.post('/users/login',UsersController.login);

module.exports = router
