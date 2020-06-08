const router = require('koa-router')();
const AccesslogController = require('../controllers/accesslog');
/**
 * 访问日志
 */
//创建
router.post('/accesslog/create',AccesslogController.create);


module.exports = router
