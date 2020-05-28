const router = require('koa-router')();
const PhotosController = require('../controllers/photos');
/**
 * 文章接口
 */
//创建文章
router.post('/photos/create',PhotosController.create);

//获取文章详情
router.get('/photos/:id',PhotosController.detail)

//获取所有文章
router.get('/photos',PhotosController.alllist);



module.exports = router
