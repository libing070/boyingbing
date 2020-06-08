// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op

// 引入数据表模型
const Accesslog = Sequelize.import('../schema/accesslog');
Accesslog.sync({force: false}); //自动创建表

class AccesslogModel {
    /**
     * 访问日志
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await Accesslog.create({
            ip: data.ip,
            country: data.country,
            countryCode: data.countryCode,
            region: data.region,
            regionName: data.regionName,
            city: data.city,
            zip: data.zip,
            lat: data.lat,
            lon: data.lon,
            timezone: data.timezone,
            isp: data.isp,
            org: data.org,
            as: data.as,
            systemVersion: data.systemVersion,
            browserVersion: data.browserVersion,
            resolution: data.resolution
        });
    }

    /**
     * 查询
     * @param id ID
     * @returns {Promise<Model>}
     */
    static async getDetailById(id){
        return await Accesslog.findOne({
            where:{
                id
            }
        });
    }

}

module.exports = AccesslogModel;
