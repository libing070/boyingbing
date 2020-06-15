const AccesslogModel = require("../modules/accesslog");
const request = require('request');
class accesslogController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
      //  console.info(req);
        if(req){
            try{
               const res= {
                   ip: req.ip,
                   country: req.country,
                   countryCode: req.countryCode,
                   region: req.region,
                   regionName: req.regionName,
                   city: req.city,
                   zip: req.zip,
                   lat: req.lat,
                   lon: req.lon,
                   timezone: req.timezone,
                   isp: req.isp,
                   org: req.org,
                   as: req.as,
                   systemVersion: req.systemVersion,
                   browserVersion: req.browserVersion,
                   resolution: req.resolution
               }
               const ret = await AccesslogModel.create(res);
               var  data = await AccesslogModel.getDetailById(ret.id);
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

}
module.exports = accesslogController;
