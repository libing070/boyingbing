const UsersModel = require("../modules/users");
const moment = require("moment");
//moment(new Date()).utcOffset("00:00").format('YYYY-MM-DD HH:mm:ss');
class usersController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        console.info("=================");
        console.info(req);
        if(req.userName && req.password &&req.mobile && req.cardNo &&req.realName && req.sex &&req.lastIp && req.loginStatus){
            try{
                //创建文章模型
                const ret = await UsersModel.createUsers(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await UsersModel.getUsersDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建用户成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建用户失败',
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
     * 获取用户详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询用户详情模型
                let data = await UsersModel.getUsersDetail(id);
              console.log("----"+data.createdAt);
                console.log("==========="+ JSON.stringify(data));
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
                msg: '用户ID必须传'
            }
        }
    }

    /**
     * 获取所有用户
     * @param
     * @returns {Promise.<void>}
     */
    static async alllist(ctx){
        try{
            // 查询文章详情模型
            let data = await UsersModel.getUsersAllList();
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
}

module.exports = usersController;
