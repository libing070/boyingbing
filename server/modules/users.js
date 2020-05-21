// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const Users = Sequelize.import('../schema/users');
Users.sync({force: false}); //自动创建表

class UsersModel {
    /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
    static async createUsers(data){
        return await Users.create({
            userName: data.userName, //账号
            password: data.password,  //密码
            mobile:data.mobile,
            cardNo:data.cardNo,
            realName:data.realName,
            sex:data.sex,
            lastIp:data.lastIp,
            loginStatus:data.loginStatus
        });
    }

    /**
     * 查询用户
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async getUsersDetail(id){
        return await Users.findOne({
            where:{
                id
            }
        });
    }

    /**
     * 查询所有用户
     * @param
     * @returns {Promise<Model>}
     */
    static async getUsersAllList(){
        return await Users.findAll();
    }
}

module.exports = UsersModel;
