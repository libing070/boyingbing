const PhotosleModel = require("../modules/photos");
const request = require('request');
class photosController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        console.info(req);
        if(req){
            try{
                var data={};
                //创建文章模型
                const detchingdata = await photosController.fetchingData(req.url);
                if(detchingdata!=="[]"){
                    const d=JSON.parse(detchingdata)[0];
                    const res={
                        type: req.type,
                        ids: d.id,
                        width: d.width,
                        height: d.height,
                        color: d.color,
                        description: d.description,
                        altDescription: d.alt_description,
                        urlRaw: d.urls.raw,
                        urlFull: d.urls.full,
                        urlRegular: d.urls.regular,
                        urlSmall: d.urls.small,
                        urlThumb: d.urls.thumb,
                        linkSelf: d.links.self,
                        linkHtml: d.links.html,
                        linkDownload: d.links.download,
                        linkDownloadLocation: d.links.download_location,
                        likes: d.likes,
                        likedByUser: d.liked_by_user,
                        userId: d.user.id,
                        userUpdateAt: d.user.updated_at,
                        userName: d.user.username,
                        userRealName: d.user.name,
                        userAppType: '',
                        userAppAccount: '',
                        userBio: d.user.bio,
                        userLocation: d.user.location,
                        userHeadPortrait: d.user.profile_image.large,

                    }
                    const ret = await PhotosleModel.createPhotos(res);
                     data = await PhotosleModel.getPhotosDetail(ret.id);
                }


                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询文章详情模型
                let data = await PhotosleModel.getPhotosDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }

    /**
     * 获取所有文章列表
     * @param
     * @returns {Promise.<void>}
     */
    static async alllist(ctx){
        try{
            // 查询文章详情模型
            let data = await PhotosleModel.getPhotosAllList();
            console.log(data);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        }catch(err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败',
                data
            }
        }
    }

    /**
     * 获取分页列表
     * @param
     * @returns {Promise.<void>}
     */
    static async getPhotosPageList(ctx){
        let pageNo = ctx.params.pageNo;
        console.log(pageNo+"====");
        if(pageNo){
            try{
                // 查询文章详情模型
                let data = await PhotosleModel.getPhotosPageList(Number(pageNo));
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: 'pageNo必须传'
            }
        }

    }

    static async  fetchingData(url){
        let options = {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*'
            },
            url:url , // 此url可以自己构造
        }
        return  new Promise((resolve, reject) => {
            request(options, (error, response) => {
                if(!error ){
                    resolve(response.body);
                }else{
                    reject(error);
                }
            })
        }).catch(new Function());

    }
}
// let res= photosController.fetchingData('https://unsplash.com/napi/topics/travel/photos?page=1&per_page=10');
// console.log(res);
module.exports = photosController;
