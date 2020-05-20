const router = require('koa-router')();
const ArtileController = require('../controllers/article');
/**
 * 文章接口
 */
//创建文章
router.post('/article/create',ArtileController.create);

//获取文章详情
router.get('/article/:id',ArtileController.detail)

//获取所有文章
router.get('/article',ArtileController.alllist)
module.exports = router
