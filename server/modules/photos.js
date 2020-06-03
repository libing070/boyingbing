// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const Photos = Sequelize.import('../schema/photos');
Photos.sync({force: false}); //自动创建表

class PhotosModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createPhotos(data){
        console.log(data)
        console.log("----------------------------------------------");
        return await Photos.create({
            ids: data.ids,
            type: data.type,
            width: data.width,
            height: data.height,
            color: data.color,
             description: data.description,
            altDescription: data.altDescription,
            urlRaw: data.urlRaw,
            urlFull: data.urlFull,
            urlRegular: data.urlRegular,
            urlSmall: data.urlSmall,
            urlThumb: data.urlThumb,
            linkSelf: data.linkSelf,
            linkHtml: data.linkHtml,
            linkDownload: data.linkDownload,
            linkDownloadLocation: data.linkDownloadLocation,
            likes: data.likes,
            likedByUser: data.likedByUser,
            userId: data.userId,
            userUpdateAt: data.userUpdateAt,
            userName: data.userName,
            userRealName: data.userRealName,
            userAppType: data.userAppType,
            userAppAccount: data.userAppAccount,
            userBio: data.userBio,
            userLocation: data.userLocation,
            userHeadPortrait: data.userHeadPortrait,
        });
    }

    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async getPhotosDetail(id){
        return await Photos.findOne({
            where:{
                id
            }
        });
    }
    /**
     * 查询所有文章列表
     * @param
     * @returns {Promise<Model>}
     */
    static async getPhotosAllList(){
        return await Photos.findAll();
    }

    /**
     * 分页查询
     * @param
     * @returns {Promise<Model>}
     */
    static async getPhotosPageList (pageNo){
        return await Photos.findAll(
            {
                limit: 20,
                offset: (pageNo-1)*20
            }
        );
    }

}

module.exports = PhotosModel;
