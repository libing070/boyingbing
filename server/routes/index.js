const Router = require('koa-router')
global.$fs = require('fs');
global.$path = require('path');
global._ = require('lodash');
const router = new Router({
    prefix: '/api/v1'
});

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string hah '
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

//轮询当前目录下的子模块，并挨个加载其路由配置
$fs.readdir(__dirname, function (err, files) {
    files.forEach(function (file) {
        if (!_.startsWith(file, '.') && file !== 'index.js') {
            try {
               router.use( require('./' + file).routes(), require('./' + file).allowedMethods());
            } catch (ex) {
                console.error('路由加载错误[' + $path.join(__dirname, file) + ']：' + ex.stack);
            }
        }
    });
});

module.exports = router
