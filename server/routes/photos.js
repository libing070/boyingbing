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

//获取分页数据
router.get('/photos/getPhotosPageList/:pageNo',PhotosController.getPhotosPageList);

module.exports = router
